"use client";

import { useRef, useState } from "react";
import { FileDown, LockKeyhole } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export function PdfCompressTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState("balanced");
  const [working, setWorking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function compress() {
    if (!file) return;
    setWorking(true); setError(""); setProgress(0);
    try {
      const settings = quality === "small" ? { scale: 1.15, jpeg: .62 } : quality === "quality" ? { scale: 1.8, jpeg: .86 } : { scale: 1.45, jpeg: .74 };
      const task = getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
      const source = await task.promise;
      const output = await PDFDocument.create();
      for (let pageNumber = 1; pageNumber <= source.numPages; pageNumber++) {
        const sourcePage = await source.getPage(pageNumber);
        const original = sourcePage.getViewport({ scale: 1 });
        const viewport = sourcePage.getViewport({ scale: settings.scale });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) throw new Error("Canvas is unavailable");
        context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height);
        await sourcePage.render({ canvas, canvasContext: context, viewport }).promise;
        const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Encoding failed")), "image/jpeg", settings.jpeg));
        const image = await output.embedJpg(new Uint8Array(await blob.arrayBuffer()));
        const page = output.addPage([original.width, original.height]);
        page.drawImage(image, { x: 0, y: 0, width: original.width, height: original.height });
        sourcePage.cleanup();
        setProgress(Math.round(pageNumber / source.numPages * 100));
      }
      await task.destroy();
      const bytes = await output.save({ useObjectStreams: true });
      const url = URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: "application/pdf" }));
      const anchor = document.createElement("a"); anchor.href = url; anchor.download = file.name.replace(/\.pdf$/i, "-compressed.pdf"); anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError("PDF를 압축하지 못했습니다. 암호 설정 또는 파일 손상 여부를 확인해 주세요.");
    } finally { setWorking(false); }
  }

  return <div className="simple-tool-card">
    <input ref={inputRef} hidden type="file" accept="application/pdf,.pdf" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
    <button className="simple-file-picker" type="button" onClick={() => inputRef.current?.click()}><span><FileDown size={30} /></span><strong>{file ? file.name : "PDF 파일 선택"}</strong><small>페이지를 이미지 기반으로 최적화해 용량을 줄입니다</small></button>
    <div className="compression-options" role="group" aria-label="압축 수준">{[["small","작은 용량"],["balanced","균형"],["quality","높은 품질"]].map(([value,label]) => <button className={quality === value ? "is-active" : ""} type="button" key={value} onClick={() => setQuality(value)}>{label}</button>)}</div>
    {working && <div className="simple-progress"><span style={{ width: `${progress}%` }} /></div>}
    <button className="simple-run-button" type="button" disabled={!file || working} onClick={() => void compress()}>{working ? `${progress}% 압축 중…` : "PDF 압축"}</button>
    <p className="simple-caution">압축 과정에서 페이지가 이미지화되어 텍스트 선택 기능이 사라질 수 있습니다.</p>
    {error && <p className="pdf-error" role="alert">{error}</p>}
    <p className="pdf-local-note"><LockKeyhole size={15} /> 파일은 서버로 전송되지 않습니다.</p>
  </div>;
}
