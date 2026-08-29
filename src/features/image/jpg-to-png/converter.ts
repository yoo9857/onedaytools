import type { ConvertedPng } from "./types";

export const JPG_TO_PNG_LIMITS = {
  maxFiles: 10,
  maxFileSize: 30 * 1024 * 1024,
} as const;

export function isJpeg(file: File) {
  return /^image\/jpeg$/.test(file.type) || /\.jpe?g$/i.test(file.name);
}

export async function convertJpgToPng(file: File): Promise<ConvertedPng> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("브라우저에서 이미지 변환 기능을 사용할 수 없습니다.");
  }

  context.drawImage(bitmap, 0, 0);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => result ? resolve(result) : reject(new Error("PNG 파일을 만들지 못했습니다.")),
      "image/png",
    );
  });

  const baseName = file.name.replace(/\.(jpe?g)$/i, "") || "converted-image";
  return {
    id: crypto.randomUUID(),
    sourceName: file.name,
    outputName: `${baseName}.png`,
    sourceSize: file.size,
    outputSize: blob.size,
    width: canvas.width,
    height: canvas.height,
    previewUrl: URL.createObjectURL(blob),
    blob,
  };
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
