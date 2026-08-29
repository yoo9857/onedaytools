"use client";

import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, FilePlus2, FileText, GripVertical, LockKeyhole, Trash2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";

type PdfItem = {
  id: string;
  file: File;
  pages: number | null;
};

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function PdfMergeTool() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<PdfItem[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isOver, setIsOver] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState("");

  async function addFiles(files: File[]) {
    const pdfFiles = files.filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
    if (!pdfFiles.length) {
      setError("PDF 파일만 선택할 수 있습니다.");
      return;
    }
    setError("");
    const nextItems = await Promise.all(pdfFiles.map(async (file) => {
      let pages: number | null = null;
      try {
        const document = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
        pages = document.getPageCount();
      } catch {
        // The merge step will show a useful error for damaged or protected PDFs.
      }
      return { id: crypto.randomUUID(), file, pages };
    }));
    setItems((current) => [...current, ...nextItems]);
  }

  function moveItem(index: number, direction: -1 | 1) {
    setItems((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function dropOn(targetId: string) {
    if (!draggingId || draggingId === targetId) return;
    setItems((current) => {
      const from = current.findIndex((item) => item.id === draggingId);
      const to = current.findIndex((item) => item.id === targetId);
      if (from < 0 || to < 0) return current;
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setDraggingId(null);
  }

  async function mergeFiles() {
    if (items.length < 2) {
      setError("합칠 PDF 파일을 2개 이상 추가해 주세요.");
      return;
    }
    setIsMerging(true);
    setError("");
    try {
      const merged = await PDFDocument.create();
      for (const item of items) {
        const source = await PDFDocument.load(await item.file.arrayBuffer());
        const pages = await merged.copyPages(source, source.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const bytes = await merged.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "onedaytools-merged.pdf";
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError("PDF를 합치지 못했습니다. 암호가 설정됐거나 손상된 파일인지 확인해 주세요.");
    } finally {
      setIsMerging(false);
    }
  }

  return (
    <div className="pdf-merge-workspace">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        hidden
        onChange={(event) => {
          void addFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
      />

      {items.length === 0 ? (
        <button
          className={`pdf-drop-zone${isOver ? " is-over" : ""}`}
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragEnter={(event) => { event.preventDefault(); setIsOver(true); }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setIsOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsOver(false);
            void addFiles(Array.from(event.dataTransfer.files));
          }}
        >
          <span className="pdf-upload-icon"><FilePlus2 size={34} /></span>
          <strong>PDF 파일 선택</strong>
          <small>여러 파일을 여기로 끌어다 놓아도 됩니다</small>
        </button>
      ) : (
        <>
          <div className="pdf-file-toolbar">
            <div><strong>{items.length}개 파일</strong><span>위에서 아래 순서로 합쳐집니다</span></div>
            <button type="button" onClick={() => inputRef.current?.click()}><FilePlus2 size={17} /> 파일 추가</button>
          </div>
          <div className="pdf-file-list">
            {items.map((item, index) => (
              <article
                className={`pdf-file-card${draggingId === item.id ? " is-dragging" : ""}`}
                draggable
                key={item.id}
                onDragStart={() => setDraggingId(item.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => dropOn(item.id)}
              >
                <GripVertical className="pdf-drag-handle" size={20} />
                <span className="pdf-file-icon"><FileText size={25} /></span>
                <div className="pdf-file-copy">
                  <strong>{item.file.name}</strong>
                  <span>{formatBytes(item.file.size)}{item.pages ? ` · ${item.pages}페이지` : ""}</span>
                </div>
                <div className="pdf-order-buttons">
                  <button type="button" aria-label="위로 이동" disabled={index === 0} onClick={() => moveItem(index, -1)}><ArrowUp size={16} /></button>
                  <button type="button" aria-label="아래로 이동" disabled={index === items.length - 1} onClick={() => moveItem(index, 1)}><ArrowDown size={16} /></button>
                  <button type="button" aria-label="파일 삭제" onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}><Trash2 size={16} /></button>
                </div>
              </article>
            ))}
          </div>
          <button className="pdf-merge-button" type="button" disabled={isMerging || items.length < 2} onClick={() => void mergeFiles()}>
            {isMerging ? "PDF 합치는 중…" : "PDF 합치기"}
          </button>
        </>
      )}
      {error && <p className="pdf-error" role="alert">{error}</p>}
      <p className="pdf-local-note"><LockKeyhole size={15} /> 파일은 서버로 전송되지 않고 브라우저에서만 처리됩니다.</p>
    </div>
  );
}
