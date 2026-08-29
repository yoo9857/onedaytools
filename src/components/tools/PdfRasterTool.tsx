"use client";

import { useRef, useState } from "react";
import { Download, FileImage, LockKeyhole } from "lucide-react";
import { zipSync } from "fflate";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

type OutputFormat = "png" | "jpg";

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function PdfRasterTool({ format }: { format: OutputFormat }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  async function convert() {
    if (!file) return;
    setWorking(true);
    setError("");
    setProgress(0);
    try {
      const task = getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
      const pdf = await task.promise;
      const outputs: Record<string, Uint8Array> = {};
      const baseName = file.name.replace(/\.pdf$/i, "");
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext("2d", { alpha: format === "png" });
        if (!context) throw new Error("Canvas is unavailable");
        if (format === "jpg") {
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        await page.render({ canvas, canvasContext: context, viewport }).promise;
        const mime = format === "png" ? "image/png" : "image/jpeg";
        const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("Image encoding failed")), mime, .92));
        outputs[`${baseName}-${String(pageNumber).padStart(2, "0")}.${format}`] = new Uint8Array(await blob.arrayBuffer());
        setProgress(Math.round((pageNumber / pdf.numPages) * 100));
        page.cleanup();
      }
      await task.destroy();
      const names = Object.keys(outputs);
      if (names.length === 1) {
        saveBlob(new Blob([Uint8Array.from(outputs[names[0]])], { type: format === "png" ? "image/png" : "image/jpeg" }), names[0]);
      } else {
        saveBlob(new Blob([Uint8Array.from(zipSync(outputs))], { type: "application/zip" }), `${baseName}-${format}-images.zip`);
      }
    } catch {
      setError("PDF를 이미지로 변환하지 못했습니다. 암호 설정 또는 파일 손상 여부를 확인해 주세요.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="simple-tool-card">
      <input ref={inputRef} hidden type="file" accept="application/pdf,.pdf" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
      <button className="simple-file-picker" type="button" onClick={() => inputRef.current?.click()}>
        <span><FileImage size={30} /></span>
        <strong>{file ? file.name : "PDF 파일 선택"}</strong>
        <small>{file ? "다른 파일을 선택하려면 클릭하세요" : "PDF의 모든 페이지를 변환합니다"}</small>
      </button>
      {working && <div className="simple-progress"><span style={{ width: `${progress}%` }} /></div>}
      <button className="simple-run-button" type="button" disabled={!file || working} onClick={() => void convert()}>
        <Download size={18} /> {working ? `${progress}% 변환 중…` : `${format.toUpperCase()}로 변환`}
      </button>
      {error && <p className="pdf-error" role="alert">{error}</p>}
      <p className="pdf-local-note"><LockKeyhole size={15} /> 파일은 서버로 전송되지 않습니다.</p>
    </div>
  );
}
