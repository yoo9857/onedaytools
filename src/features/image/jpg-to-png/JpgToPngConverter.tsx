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
import { converterCopy } from "@/lib/i18n-content";
import type { Locale } from "@/lib/i18n";

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

export function JpgToPngConverter({ locale = "ko" }: { locale?: Locale }) {
  const copy = converterCopy[locale];
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
      setError(copy.tooMany(JPG_TO_PNG_LIMITS.maxFiles));
      return;
    }

    const selected = incoming.slice(0, remainingSlots);
    const invalidType = selected.filter((file) => !isJpeg(file));
    const oversized = selected.filter((file) => file.size > JPG_TO_PNG_LIMITS.maxFileSize);
    const valid = selected.filter(
      (file) => isJpeg(file) && file.size <= JPG_TO_PNG_LIMITS.maxFileSize,
    );

    const warnings: string[] = [];
    if (incoming.length > remainingSlots) warnings.push(copy.truncated);
    if (invalidType.length) warnings.push(copy.invalid(invalidType.length));
    if (oversized.length) warnings.push(copy.oversized(oversized.length));
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
    if (failed) setError(copy.failed(failed));
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
        <h2>{isConverting ? `${progress.current} / ${progress.total} ${copy.converting}` : copy.prompt}</h2>
        <p>{copy.tooMany(JPG_TO_PNG_LIMITS.maxFiles)}</p>
        <button className="primary-button" type="button" disabled={isConverting} onClick={() => inputRef.current?.click()}>
          <FileImage size={18} /> {isConverting ? copy.converting : results.length ? copy.addMore : copy.choose}
        </button>
        <span className="file-limit">{copy.limit}</span>
        {isConverting ? <div className="progress-track" aria-label={`변환 진행률 ${progress.current}/${progress.total}`}><span style={{ width: `${(progress.current / progress.total) * 100}%` }} /></div> : null}
      </div>

      {error ? <p className="error-message" role="alert">{error}</p> : null}

      {results.length ? (
        <div className="conversion-results" aria-live="polite">
          <div className="results-header">
            <div><span className="success-dot" /> <strong>{results.length}{copy.converted}</strong></div>
            <div className="results-actions">
              {results.length > 1 ? (
                <button type="button" onClick={() => void downloadZip()} disabled={isZipping}>
                  <Archive size={16} /> {isZipping ? copy.zipBuilding : copy.zip}
                </button>
              ) : null}
              <button type="button" onClick={reset}><RotateCcw size={15} /> {copy.reset}</button>
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
                  <span>{result.width.toLocaleString()} × {result.height.toLocaleString()}{copy.pixels} · {formatBytes(result.outputSize)}</span>
                </div>
                <button className="result-download" type="button" onClick={() => saveBlob(result.blob, result.outputName, result.previewUrl)} aria-label={`${result.outputName} ${copy.download}`}>
                  <Download size={17} /> <span>{copy.download}</span>
                </button>
                <button className="result-remove" type="button" onClick={() => removeResult(result.id)} aria-label={`${result.outputName} ${copy.remove}`}><Trash2 size={16} /></button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="privacy-note">
        <LockKeyhole size={17} />
        <span>{copy.privacy}</span>
      </div>
    </section>
  );
}
