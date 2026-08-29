"use client";

import {
  Archive,
  Download,
  FileImage,
  ImagePlus,
  LockKeyhole,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import {
  convertJpgToPng,
  formatBytes,
  isJpeg,
  JPG_TO_PNG_LIMITS,
} from "./converter";
import type { ConvertedPng } from "./types";

function saveBlob(blob: Blob, filename: string, temporaryUrl?: string) {
  const url = temporaryUrl ?? URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  if (!temporaryUrl) URL.revokeObjectURL(url);
}

export function JpgToPngConverter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<ConvertedPng[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState("");
  const [results, setResults] = useState<ConvertedPng[]>([]);

  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  useEffect(() => () => {
    resultsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
  }, []);

  async function processFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList);
    if (!incoming.length) return;
    setError("");

    const remainingSlots = JPG_TO_PNG_LIMITS.maxFiles - results.length;
    if (remainingSlots <= 0) {
      setError(`한 번에 최대 ${JPG_TO_PNG_LIMITS.maxFiles}개까지 변환할 수 있습니다.`);
      return;
    }

    const selected = incoming.slice(0, remainingSlots);
    const invalidType = selected.filter((file) => !isJpeg(file));
    const oversized = selected.filter((file) => file.size > JPG_TO_PNG_LIMITS.maxFileSize);
    const valid = selected.filter(
      (file) => isJpeg(file) && file.size <= JPG_TO_PNG_LIMITS.maxFileSize,
    );

    const warnings: string[] = [];
    if (incoming.length > remainingSlots) warnings.push(`최대 ${JPG_TO_PNG_LIMITS.maxFiles}개까지만 선택했습니다.`);
    if (invalidType.length) warnings.push(`JPG가 아닌 파일 ${invalidType.length}개를 제외했습니다.`);
    if (oversized.length) warnings.push(`30MB를 넘는 파일 ${oversized.length}개를 제외했습니다.`);
    if (warnings.length) setError(warnings.join(" "));
    if (!valid.length) return;

    setIsConverting(true);
    setProgress({ current: 0, total: valid.length });
    const converted: ConvertedPng[] = [];
    let failed = 0;

    for (let index = 0; index < valid.length; index += 1) {
      try {
        converted.push(await convertJpgToPng(valid[index]));
      } catch {
        failed += 1;
      }
      setProgress({ current: index + 1, total: valid.length });
    }

    setResults((previous) => [...previous, ...converted]);
    if (failed) setError(`${failed}개 파일을 변환하지 못했습니다. 다른 JPG 파일로 다시 시도해 주세요.`);
    setIsConverting(false);
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) void processFiles(event.target.files);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    void processFiles(event.dataTransfer.files);
  }

  function removeResult(id: string) {
    setResults((previous) => previous.filter((item) => {
      if (item.id === id) URL.revokeObjectURL(item.previewUrl);
      return item.id !== id;
    }));
  }

  function reset() {
    results.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setResults([]);
    setError("");
    setProgress({ current: 0, total: 0 });
  }

  async function downloadZip() {
    if (!results.length) return;
    setIsZipping(true);
    try {
      const { zipSync } = await import("fflate");
      const entries: Record<string, Uint8Array> = {};
      for (const result of results) {
        entries[result.outputName] = new Uint8Array(await result.blob.arrayBuffer());
      }
      const archive = zipSync(entries, { level: 0 });
      const archiveBuffer = new ArrayBuffer(archive.byteLength);
      new Uint8Array(archiveBuffer).set(archive);
      saveBlob(new Blob([archiveBuffer], { type: "application/zip" }), "onedaytools-png.zip");
    } finally {
      setIsZipping(false);
    }
  }

  return (
    <section className="converter-card">
      <div
        className={`drop-zone${isDragging ? " drop-zone--active" : ""}`}
        onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsDragging(false);
        }}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          multiple
          accept="image/jpeg,.jpg,.jpeg"
          onChange={onInputChange}
        />
        <span className="upload-icon"><ImagePlus size={30} strokeWidth={1.7} /></span>
        <h2>{isConverting ? `${progress.current} / ${progress.total} 변환 중…` : "JPG 이미지를 여기에 놓으세요"}</h2>
        <p>최대 10개 이미지를 한 번에 선택할 수 있습니다.</p>
        <button className="primary-button" type="button" disabled={isConverting} onClick={() => inputRef.current?.click()}>
          <FileImage size={18} /> {isConverting ? "변환 중…" : results.length ? "파일 더 추가" : "JPG 파일 선택"}
        </button>
        <span className="file-limit">JPG·JPEG · 파일당 최대 30MB</span>
        {isConverting ? <div className="progress-track" aria-label={`변환 진행률 ${progress.current}/${progress.total}`}><span style={{ width: `${(progress.current / progress.total) * 100}%` }} /></div> : null}
      </div>

      {error ? <p className="error-message" role="alert">{error}</p> : null}

      {results.length ? (
        <div className="conversion-results" aria-live="polite">
          <div className="results-header">
            <div><span className="success-dot" /> <strong>{results.length}개 변환 완료</strong></div>
            <div className="results-actions">
              {results.length > 1 ? (
                <button type="button" onClick={() => void downloadZip()} disabled={isZipping}>
                  <Archive size={16} /> {isZipping ? "ZIP 생성 중" : "전체 ZIP"}
                </button>
              ) : null}
              <button type="button" onClick={reset}><RotateCcw size={15} /> 전체 지우기</button>
            </div>
          </div>
          <ul className="result-list">
            {results.map((result) => (
              <li key={result.id}>
                <div className="result-thumbnail">
                  {/* blob URL is generated locally in this browser. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result.previewUrl} alt="" />
                </div>
                <div className="result-info">
                  <strong title={result.outputName}>{result.outputName}</strong>
                  <span>{result.width.toLocaleString()} × {result.height.toLocaleString()}px · {formatBytes(result.outputSize)}</span>
                </div>
                <button className="result-download" type="button" onClick={() => saveBlob(result.blob, result.outputName, result.previewUrl)} aria-label={`${result.outputName} 다운로드`}>
                  <Download size={17} /> <span>다운로드</span>
                </button>
                <button className="result-remove" type="button" onClick={() => removeResult(result.id)} aria-label={`${result.outputName} 삭제`}><Trash2 size={16} /></button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="privacy-note">
        <LockKeyhole size={17} />
        <span><strong>파일은 외부로 전송되지 않습니다.</strong> 모든 변환은 브라우저 안에서 처리됩니다.</span>
      </div>
    </section>
  );
}
