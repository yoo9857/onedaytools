param(
  [string]$SourcePath = (Join-Path $PSScriptRoot "..\logo_h.png")
)

Add-Type -AssemblyName System.Drawing
function Get-VisibleBounds([System.Drawing.Bitmap]$Bitmap, [byte]$AlphaThreshold = 8) {
  $rectangle = [System.Drawing.Rectangle]::new(0, 0, $Bitmap.Width, $Bitmap.Height)
  $bitmapData = $Bitmap.LockBits(
    $rectangle,
    [System.Drawing.Imaging.ImageLockMode]::ReadOnly,
    [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
  )

  try {
    $bytes = [byte[]]::new([Math]::Abs($bitmapData.Stride) * $Bitmap.Height)
    [Runtime.InteropServices.Marshal]::Copy($bitmapData.Scan0, $bytes, 0, $bytes.Length)
    $minimumX = $Bitmap.Width
    $minimumY = $Bitmap.Height
    $maximumX = -1
    $maximumY = -1

    for ($y = 0; $y -lt $Bitmap.Height; $y++) {
      for ($x = 0; $x -lt $Bitmap.Width; $x++) {
        $alphaIndex = ($y * $bitmapData.Stride) + ($x * 4) + 3
        if ($bytes[$alphaIndex] -gt $AlphaThreshold) {
          if ($x -lt $minimumX) { $minimumX = $x }
          if ($x -gt $maximumX) { $maximumX = $x }
          if ($y -lt $minimumY) { $minimumY = $y }
          if ($y -gt $maximumY) { $maximumY = $y }
        }
      }
    }

    if ($maximumX -lt 0) { throw "The source image has no visible pixels." }
    return [System.Drawing.Rectangle]::new(
      $minimumX,
      $minimumY,
      $maximumX - $minimumX + 1,
      $maximumY - $minimumY + 1
    )
  }
  finally {
    $Bitmap.UnlockBits($bitmapData)
  }
}

function Write-PngIco([string[]]$PngPaths, [string]$OutputPath) {
  $images = [System.Collections.Generic.List[byte[]]]::new()
  foreach ($pngPath in $PngPaths) {
    $images.Add([System.IO.File]::ReadAllBytes($pngPath))
  }
  $stream = [System.IO.File]::Create($OutputPath)
  $writer = [System.IO.BinaryWriter]::new($stream)

  try {
    $writer.Write([uint16]0)
    $writer.Write([uint16]1)
    $writer.Write([uint16]$images.Count)
    $offset = 6 + (16 * $images.Count)
    $dimensions = @(16, 32)

    for ($index = 0; $index -lt $images.Count; $index++) {
      $writer.Write([byte]$dimensions[$index])
      $writer.Write([byte]$dimensions[$index])
      $writer.Write([byte]0)
      $writer.Write([byte]0)
      $writer.Write([uint16]1)
      $writer.Write([uint16]32)
      $writer.Write([uint32]$images[$index].Length)
      $writer.Write([uint32]$offset)
      $offset += $images[$index].Length
    }

    foreach ($image in $images) { $writer.Write($image) }
  }
  finally {
    $writer.Dispose()
  }
}

function New-SquareLogo(
  [System.Drawing.Bitmap]$Source,
  [System.Drawing.Rectangle]$VisibleBounds,
  [int]$Size,
  [double]$ContentRatio = 0.84
) {
  $canvas = [System.Drawing.Bitmap]::new($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $canvas.SetResolution(96, 96)
  $graphics = [System.Drawing.Graphics]::FromImage($canvas)

  try {
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    $maximumContentSize = $Size * $ContentRatio
    $scale = [Math]::Min(
      $maximumContentSize / $VisibleBounds.Width,
      $maximumContentSize / $VisibleBounds.Height
    )
    $width = [Math]::Round($VisibleBounds.Width * $scale)
    $height = [Math]::Round($VisibleBounds.Height * $scale)
    $left = [Math]::Round(($Size - $width) / 2)
    $top = [Math]::Round(($Size - $height) / 2)
    $destination = [System.Drawing.Rectangle]::new($left, $top, $width, $height)
    $graphics.DrawImage($Source, $destination, $VisibleBounds, [System.Drawing.GraphicsUnit]::Pixel)
  }
  finally {
    $graphics.Dispose()
  }

  return $canvas
}

$resolvedSource = (Resolve-Path $SourcePath).Path
$projectRoot = Split-Path $PSScriptRoot -Parent
$publicDirectory = Join-Path $projectRoot "public"
$faviconDirectory = Join-Path $publicDirectory "favicons"
[System.IO.Directory]::CreateDirectory($faviconDirectory) | Out-Null

$source = [System.Drawing.Bitmap]::FromFile($resolvedSource)
try {
  $visibleBounds = Get-VisibleBounds $source
  $sizes = @(
    @{ Path = (Join-Path $publicDirectory "logo.png"); Size = 512; ContentRatio = 0.94 }
    @{ Path = (Join-Path $faviconDirectory "favicon-16x16.png"); Size = 16; ContentRatio = 0.98 }
    @{ Path = (Join-Path $faviconDirectory "favicon-32x32.png"); Size = 32; ContentRatio = 0.98 }
    @{ Path = (Join-Path $faviconDirectory "apple-touch-icon.png"); Size = 180; ContentRatio = 0.84 }
    @{ Path = (Join-Path $faviconDirectory "icon-192x192.png"); Size = 192; ContentRatio = 0.84 }
    @{ Path = (Join-Path $faviconDirectory "icon-512x512.png"); Size = 512; ContentRatio = 0.84 }
  )

  foreach ($entry in $sizes) {
    $logo = New-SquareLogo $source $visibleBounds $entry.Size $entry.ContentRatio
    try {
      $logo.Save($entry.Path, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
      $logo.Dispose()
    }
  }

  Copy-Item (Join-Path $faviconDirectory "apple-touch-icon.png") (Join-Path $publicDirectory "apple-touch-icon.png") -Force

  $favicon16Path = Join-Path $faviconDirectory "favicon-16x16.png"
  $favicon32Path = Join-Path $faviconDirectory "favicon-32x32.png"
  $faviconIcoPath = Join-Path $faviconDirectory "favicon.ico"
  Write-PngIco -PngPaths @($favicon16Path, $favicon32Path) -OutputPath $faviconIcoPath
  Copy-Item $faviconIcoPath (Join-Path $publicDirectory "favicon.ico") -Force

  [PSCustomObject]@{
    Source = $resolvedSource
    VisibleBounds = $visibleBounds
    OutputCount = $sizes.Count + 3
  }
}
finally {
  $source.Dispose()
}
