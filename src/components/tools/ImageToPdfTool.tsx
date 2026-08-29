"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, FilePlus2, Images, LockKeyhole, RotateCcw, RotateCw, Trash2 } from "lucide-react";
import { zipSync } from "fflate";
import { degrees, PDFDocument, type PDFImage } from "pdf-lib";

type Orientation = "portrait" | "landscape";
type PageSize = "a3" | "a4" | "a5" | "b5" | "letter" | "legal" | "tabloid" | "executive" | "fit";
type MarginSize = "none" | "small" | "medium" | "big";

const pageSizes = {
  a3: { label: "A3", detail: "297 × 420 mm", portrait: [841.89, 1190.55] },
  a4: { label: "A4", detail: "210 × 297 mm", portrait: [595.28, 841.89] },
  a5: { label: "A5", detail: "148 × 210 mm", portrait: [419.53, 595.28] },
  b5: { label: "B5", detail: "176 × 250 mm", portrait: [498.9, 708.66] },
  letter: { label: "US Letter", detail: "8.5 × 11 in", portrait: [612, 792] },
  legal: { label: "US Legal", detail: "8.5 × 14 in", portrait: [612, 1008] },
  tabloid: { label: "Tabloid", detail: "11 × 17 in", portrait: [792, 1224] },
  executive: { label: "Executive", detail: "7.25 × 10.5 in", portrait: [522, 756] },
  fit: { label: "Fit image", detail: "이미지에 맞춤", portrait: [0, 0] },
} as const;

const marginOptions: Record<MarginSize, { label: string; detail: string; points: number; preview: string }> = {
  none: { label: "No margin", detail: "0 mm", points: 0, preview: "0" },
  small: { label: "Small", detail: "5 mm", points: 14.17, preview: "4%" },
  medium: { label: "Medium", detail: "10 mm", points: 28.35, preview: "8%" },
  big: { label: "Big", detail: "20 mm", points: 56.69, preview: "13%" },
};

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getPageDimensions(image: PDFImage, pageSize: PageSize, orientation: Orientation) {
  if (pageSize === "fit") {
    const width = Math.max(72, image.width * .75);
    const height = Math.max(72, image.height * .75);
    const imageIsLandscape = width > height;
    if ((orientation === "landscape") === imageIsLandscape) return [width, height] as const;
    return [height, width] as const;
  }
  const [portraitWidth, portraitHeight] = pageSizes[pageSize].portrait;
  return orientation === "portrait"
    ? [portraitWidth, portraitHeight] as const
    : [portraitHeight, portraitWidth] as const;
}

export function ImageToPdfTool({ jpgOnly = false }: { jpgOnly?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [rotations, setRotations] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [marginSize, setMarginSize] = useState<MarginSize>("small");
  const [mergeAll, setMergeAll] = useState(true);
  const [working, setWorking] = useState(false);
  const [estimating, setEstimating] = useState(false);
  const [estimate, setEstimate] = useState<{ bytes: number; key: string } | null>(null);
  const [error, setError] = useState("");
  const estimateKey = `${files.map((file, index) => `${file.name}:${file.size}:${file.lastModified}:${rotations[index] ?? 0}`).join("|")}:${orientation}:${pageSize}:${marginSize}:${mergeAll}`;

  function addFiles(incoming: File[]) {
    const validFiles = incoming.filter((file) => {
      const name = file.name.toLowerCase();
      if (jpgOnly) return file.type === "image/jpeg" || name.endsWith(".jpg") || name.endsWith(".jpeg");
      return file.type === "image/jpeg" || file.type === "image/png" || /\.(jpe?g|png)$/.test(name);
    });
    if (!validFiles.length) {
      setError(jpgOnly ? "JPG 파일만 선택할 수 있습니다." : "JPG 또는 PNG 파일만 선택할 수 있습니다.");
      return;
    }
    setError("");
    setFiles((current) => [...current, ...validFiles]);
    setRotations((current) => [...current, ...validFiles.map(() => 0)]);
  }

  function moveFile(index: number, direction: -1 | 1) {
    setFiles((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setRotations((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setSelectedIndex((current) => current === index ? index + direction : current === index + direction ? index : current);
  }

  function rotateFile(index: number, amount: -90 | 90) {
    setRotations((current) => current.map((rotation, itemIndex) => itemIndex === index ? (rotation + amount + 360) % 360 : rotation));
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setRotations((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setSelectedIndex((current) => Math.max(0, current > index ? current - 1 : Math.min(current, files.length - 2)));
  }

  async function createPdf(selectedFiles: File[], selectedRotations: number[]) {
    const pdf = await PDFDocument.create();
    for (let fileIndex = 0; fileIndex < selectedFiles.length; fileIndex++) {
      const file = selectedFiles[fileIndex];
      const bytes = new Uint8Array(await file.arrayBuffer());
      const isPng = file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
      const image = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
      const [pageWidth, pageHeight] = getPageDimensions(image, pageSize, orientation);
      const margin = Math.min(marginOptions[marginSize].points, pageWidth * .2, pageHeight * .2);
      const rotation = selectedRotations[fileIndex] ?? 0;
      const quarterTurn = rotation === 90 || rotation === 270;
      const rotatedWidth = quarterTurn ? image.height : image.width;
      const rotatedHeight = quarterTurn ? image.width : image.height;
      const scale = Math.min((pageWidth - margin * 2) / rotatedWidth, (pageHeight - margin * 2) / rotatedHeight);
      const width = image.width * scale;
      const height = image.height * scale;
      const visibleWidth = rotatedWidth * scale;
      const visibleHeight = rotatedHeight * scale;
      const left = (pageWidth - visibleWidth) / 2;
      const bottom = (pageHeight - visibleHeight) / 2;
      const page = pdf.addPage([pageWidth, pageHeight]);
      const positions = {
        0: { x: left, y: bottom },
        90: { x: left + height, y: bottom },
        180: { x: left + width, y: bottom + height },
        270: { x: left, y: bottom + width },
      } as const;
      page.drawImage(image, { ...positions[rotation as keyof typeof positions], width, height, rotate: degrees(rotation) });
    }
    return new Uint8Array(await pdf.save());
  }

  async function convert() {
    if (!files.length) return;
    setWorking(true);
    setError("");
    try {
      if (mergeAll || files.length === 1) {
        const bytes = await createPdf(files, rotations);
        setEstimate({ bytes: bytes.length, key: estimateKey });
        saveBlob(new Blob([bytes], { type: "application/pdf" }), "onedaytools-images.pdf");
      } else {
        const outputs: Record<string, Uint8Array> = {};
        for (let index = 0; index < files.length; index++) {
          const baseName = files[index].name.replace(/\.[^.]+$/, "");
          outputs[`${String(index + 1).padStart(2, "0")}-${baseName}.pdf`] = await createPdf([files[index]], [rotations[index] ?? 0]);
        }
        const zipBytes = Uint8Array.from(zipSync(outputs));
        setEstimate({ bytes: zipBytes.length, key: estimateKey });
        saveBlob(new Blob([zipBytes], { type: "application/zip" }), "onedaytools-image-pdfs.zip");
      }
    } catch {
      setError("이미지를 PDF로 변환하지 못했습니다. 지원되는 JPG·PNG 파일인지 확인해 주세요.");
    } finally {
      setWorking(false);
    }
  }

  async function estimateOutputSize() {
    if (!files.length) return;
    setEstimating(true);
    setError("");
    try {
      if (mergeAll || files.length === 1) {
        setEstimate({ bytes: (await createPdf(files, rotations)).length, key: estimateKey });
      } else {
        const outputs: Record<string, Uint8Array> = {};
        for (let index = 0; index < files.length; index++) {
          outputs[`${index + 1}.pdf`] = await createPdf([files[index]], [rotations[index] ?? 0]);
        }
        setEstimate({ bytes: zipSync(outputs).length, key: estimateKey });
      }
    } catch {
      setError("출력 용량을 계산하지 못했습니다. 이미지 파일을 확인해 주세요.");
    } finally {
      setEstimating(false);
    }
  }

  const accept = jpgOnly ? "image/jpeg,.jpg,.jpeg" : "image/jpeg,image/png,.jpg,.jpeg,.png";
  const previewUrl = useMemo(() => files[selectedIndex] ? URL.createObjectURL(files[selectedIndex]) : "", [files, selectedIndex]);
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  const selectedPaper = pageSizes[pageSize];
  const baseRatio = pageSize === "fit" ? [3, 4] : selectedPaper.portrait;
  const previewRatio = orientation === "portrait" ? baseRatio : [baseRatio[1], baseRatio[0]];
  const pageDetail = pageSize === "fit"
    ? selectedPaper.detail
    : orientation === "portrait" ? selectedPaper.detail : selectedPaper.detail.replace(/([^×]+) × ([^ ]+)/, "$2 × $1");
  const estimatedBytes = estimate?.key === estimateKey ? estimate.bytes : null;
  const sizeDifference = estimatedBytes === null ? null : estimatedBytes - totalBytes;
  const sizeDifferencePercent = sizeDifference === null || totalBytes === 0 ? 0 : Math.round(Math.abs(sizeDifference) / totalBytes * 100);
  return (
    <div className="image-pdf-workspace">
      <input ref={inputRef} hidden type="file" accept={accept} multiple onChange={(event) => { addFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} />
      {files.length === 0 ? (
        <button className="simple-file-picker" type="button" onClick={() => inputRef.current?.click()}>
          <span><FilePlus2 size={30} /></span><strong>{jpgOnly ? "JPG 파일 선택" : "이미지 파일 선택"}</strong><small>선택 후 페이지 방향·크기·여백을 설정할 수 있습니다</small>
        </button>
      ) : (
        <div className="image-pdf-options-view">
          <div className="image-options-header">
            <button type="button" onClick={() => { setFiles([]); setRotations([]); setSelectedIndex(0); }}><ArrowLeft size={17} /> 처음으로</button>
            <div><p>IMAGE TO PDF</p><h3>Image to PDF options</h3></div>
            <button type="button" onClick={() => inputRef.current?.click()}><FilePlus2 size={17} /> 이미지 추가</button>
          </div>
          <div className="image-options-layout">
            <div className="image-order-panel">
              <div className="image-order-heading"><Images size={17} /><strong>{files.length} images</strong><span>{formatBytes(totalBytes)}</span></div>
              <div className="image-order-list">{files.map((file, index) => <article className={selectedIndex === index ? "is-selected" : ""} key={`${file.name}-${file.lastModified}-${index}`} onClick={() => setSelectedIndex(index)}>
                <span>{index + 1}</span><div><strong>{file.name}</strong><small>{formatBytes(file.size)}</small></div><div>
                  <button type="button" aria-label="시계 방향 회전" onClick={(event) => { event.stopPropagation(); rotateFile(index, 90); }}><RotateCw size={14} /></button>
                  <button type="button" aria-label="위로 이동" disabled={index === 0} onClick={(event) => { event.stopPropagation(); moveFile(index, -1); }}><ArrowUp size={14} /></button>
                  <button type="button" aria-label="아래로 이동" disabled={index === files.length - 1} onClick={(event) => { event.stopPropagation(); moveFile(index, 1); }}><ArrowDown size={14} /></button>
                  <button type="button" aria-label="삭제" onClick={(event) => { event.stopPropagation(); removeFile(index); }}><Trash2 size={14} /></button>
                </div>
              </article>)}</div>
            </div>
            <div className="image-preview-panel">
              <div className="image-preview-heading"><div><strong>Preview</strong><span>{selectedIndex + 1}번째 이미지</span></div><small>{selectedPaper.label} · {pageDetail}</small></div>
              <div className="image-preview-stage">
                <div className="image-preview-paper" style={{ aspectRatio: `${previewRatio[0]} / ${previewRatio[1]}`, padding: marginOptions[marginSize].preview } as CSSProperties}>
                  {/* Local blob previews cannot use the Next.js image optimizer. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {previewUrl && <img src={previewUrl} alt="PDF 페이지 미리보기" style={{ transform: `rotate(${rotations[selectedIndex] ?? 0}deg) scale(${(rotations[selectedIndex] ?? 0) % 180 === 0 ? 1 : .82})` }} />}
                </div>
              </div>
              <div className="image-preview-meta"><span>{orientation === "portrait" ? "Portrait" : "Landscape"} · {rotations[selectedIndex] ?? 0}°</span><div><button type="button" aria-label="왼쪽으로 90도 회전" onClick={() => rotateFile(selectedIndex, -90)}><RotateCcw size={15} /></button><button type="button" aria-label="오른쪽으로 90도 회전" onClick={() => rotateFile(selectedIndex, 90)}><RotateCw size={15} /></button></div><span>{marginOptions[marginSize].label} · {marginOptions[marginSize].detail}</span></div>
            </div>
            <div className="image-options-panel">
              <div className="options-panel-heading"><p>PDF SETTINGS</p><h4>출력 옵션</h4><span>변경 내용이 미리보기에 반영됩니다.</span></div>
              <label className="option-dropdown"><span>Page orientation</span><select value={orientation} onChange={(event) => setOrientation(event.target.value as Orientation)}><option value="portrait">Portrait</option><option value="landscape">Landscape</option></select></label>
              <label className="option-dropdown"><span>Page size</span><select value={pageSize} onChange={(event) => setPageSize(event.target.value as PageSize)}>{(Object.keys(pageSizes) as PageSize[]).map((value) => <option value={value} key={value}>{pageSizes[value].label} — {pageSizes[value].detail}</option>)}</select></label>
              <label className="option-dropdown"><span>Margin</span><select value={marginSize} onChange={(event) => setMarginSize(event.target.value as MarginSize)}>{(Object.keys(marginOptions) as MarginSize[]).map((value) => <option value={value} key={value}>{marginOptions[value].label} — {marginOptions[value].detail}</option>)}</select></label>
              <label className="merge-option"><input type="checkbox" checked={mergeAll} onChange={(event) => setMergeAll(event.target.checked)} /><span aria-hidden="true" /><div><strong>Merge all images</strong><small>하나의 PDF 파일로 병합</small></div></label>
              <div className="options-size-summary">
                <span>선택 이미지</span><strong>{files.length}개 · {formatBytes(totalBytes)}</strong>
                <div className="estimated-size-row"><span>예상 출력</span><strong>{estimatedBytes === null ? "계산 전" : formatBytes(estimatedBytes)}</strong></div>
                {sizeDifference !== null && <small className={sizeDifference <= 0 ? "is-smaller" : "is-larger"}>{sizeDifference <= 0 ? `${formatBytes(Math.abs(sizeDifference))} 감소 (${sizeDifferencePercent}%)` : `${formatBytes(sizeDifference)} 증가 (${sizeDifferencePercent}%)`}</small>}
                <button type="button" disabled={estimating} onClick={() => void estimateOutputSize()}>{estimating ? "계산 중…" : "출력 용량 계산"}</button>
              </div>
            </div>
          </div>
          <button className="simple-run-button" type="button" disabled={working} onClick={() => void convert()}>{working ? "PDF 만드는 중…" : mergeAll ? "Create PDF" : "Create PDF files"}</button>
        </div>
      )}
      {error && <p className="pdf-error" role="alert">{error}</p>}
      <p className="pdf-local-note"><LockKeyhole size={15} /> 이미지가 브라우저 밖으로 전송되지 않습니다.</p>
    </div>
  );
}
