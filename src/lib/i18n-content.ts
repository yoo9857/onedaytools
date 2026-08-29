import type { Locale } from "./i18n";

export type ConverterCopy = { choose: string; addMore: string; converting: string; prompt: string; limit: string; processing: string; privacy: string; converted: string; download: string; remove: string; reset: string; zip: string; zipBuilding: string; tooMany: (max: number) => string; truncated: string; invalid: (count: number) => string; oversized: (count: number) => string; failed: (count: number) => string; pixels: string };

export const converterCopy: Record<Locale, ConverterCopy> = {
  ko: { choose: "JPG 파일 선택", addMore: "파일 더 추가", converting: "변환 중…", prompt: "JPG 이미지를 여기에 놓거나 선택하세요", limit: "JPG · JPEG · 파일당 최대 30MB", processing: "브라우저에서 안전하게 처리 중", privacy: "파일은 서버로 전송되지 않고 브라우저 안에서 처리됩니다.", converted: "개 변환 완료", download: "다운로드", remove: "삭제", reset: "전체 지우기", zip: "전체 ZIP", zipBuilding: "ZIP 생성 중…", tooMany: (max) => `한 번에 최대 ${max}개까지 변환할 수 있습니다.`, truncated: "최대 10개까지만 선택했습니다.", invalid: (count) => `JPG가 아닌 파일 ${count}개를 제외했습니다.`, oversized: (count) => `30MB를 넘는 파일 ${count}개를 제외했습니다.`, failed: (count) => `${count}개 파일을 변환하지 못했습니다. 다른 JPG 파일로 다시 시도해 주세요.`, pixels: "px" },
  en: { choose: "Choose JPG files", addMore: "Add more files", converting: "Converting…", prompt: "Drop JPG images here or choose files", limit: "JPG · JPEG · up to 30MB per file", processing: "Processing securely in your browser", privacy: "Your files are processed in your browser and never sent to our server.", converted: " converted", download: "Download", remove: "Remove", reset: "Clear all", zip: "Download ZIP", zipBuilding: "Creating ZIP…", tooMany: (max) => `You can convert up to ${max} files at a time.`, truncated: "Only the first 10 files were selected.", invalid: (count) => `${count} non-JPG file(s) were excluded.`, oversized: (count) => `${count} file(s) over 30MB were excluded.`, failed: (count) => `${count} file(s) could not be converted. Please try another JPG file.`, pixels: "px" },
  ja: { choose: "JPGファイルを選択", addMore: "ファイルを追加", converting: "変換中…", prompt: "JPG画像をドロップするか選択してください", limit: "JPG · JPEG · 1ファイル最大30MB", processing: "ブラウザで安全に処理しています", privacy: "ファイルはサーバーに送信されず、ブラウザ内で処理されます。", converted: "件変換完了", download: "ダウンロード", remove: "削除", reset: "すべてクリア", zip: "ZIPをダウンロード", zipBuilding: "ZIP作成中…", tooMany: (max) => `一度に${max}ファイルまで変換できます。`, truncated: "最初の10ファイルのみ選択しました。", invalid: (count) => `JPG以外のファイル${count}件を除外しました。`, oversized: (count) => `30MBを超えるファイル${count}件を除外しました。`, failed: (count) => `${count}件の変換に失敗しました。別のJPGでお試しください。`, pixels: "px" },
  zh: { choose: "选择 JPG 文件", addMore: "添加更多文件", converting: "转换中…", prompt: "将 JPG 图片拖到此处或选择文件", limit: "JPG · JPEG · 每个文件最大 30MB", processing: "正在浏览器中安全处理", privacy: "文件仅在浏览器中处理，不会上传到服务器。", converted: " 个已转换", download: "下载", remove: "移除", reset: "全部清除", zip: "下载 ZIP", zipBuilding: "正在创建 ZIP…", tooMany: (max) => `一次最多可转换 ${max} 个文件。`, truncated: "仅选择了前 10 个文件。", invalid: (count) => `已排除 ${count} 个非 JPG 文件。`, oversized: (count) => `已排除 ${count} 个超过 30MB 的文件。`, failed: (count) => `${count} 个文件转换失败，请尝试其他 JPG 文件。`, pixels: "像素" },
  "zh-tw": { choose: "選擇 JPG 檔案", addMore: "新增更多檔案", converting: "轉換中…", prompt: "將 JPG 圖片拖曳至此處或選擇檔案", limit: "JPG · JPEG · 每個檔案最大 30MB", processing: "正在瀏覽器中安全處理", privacy: "檔案只在瀏覽器中處理，不會上傳至伺服器。", converted: " 個已轉換", download: "下載", remove: "移除", reset: "全部清除", zip: "下載 ZIP", zipBuilding: "正在建立 ZIP…", tooMany: (max) => `一次最多可轉換 ${max} 個檔案。`, truncated: "僅選擇了前 10 個檔案。", invalid: (count) => `已排除 ${count} 個非 JPG 檔案。`, oversized: (count) => `已排除 ${count} 個超過 30MB 的檔案。`, failed: (count) => `${count} 個檔案轉換失敗，請嘗試其他 JPG 檔案。`, pixels: "像素" },
  de: { choose: "JPG-Dateien auswählen", addMore: "Weitere Dateien", converting: "Wird konvertiert…", prompt: "JPG-Bilder hier ablegen oder Dateien auswählen", limit: "JPG · JPEG · max. 30 MB pro Datei", processing: "Sicher in Ihrem Browser verarbeitet", privacy: "Ihre Dateien werden im Browser verarbeitet und nie an unseren Server gesendet.", converted: " konvertiert", download: "Herunterladen", remove: "Entfernen", reset: "Alle löschen", zip: "ZIP herunterladen", zipBuilding: "ZIP wird erstellt…", tooMany: (max) => `Sie können bis zu ${max} Dateien gleichzeitig konvertieren.`, truncated: "Nur die ersten 10 Dateien wurden ausgewählt.", invalid: (count) => `${count} Nicht-JPG-Datei(en) wurden ausgeschlossen.`, oversized: (count) => `${count} Datei(en) über 30 MB wurden ausgeschlossen.`, failed: (count) => `${count} Datei(en) konnten nicht konvertiert werden.`, pixels: "px" },
  fr: { choose: "Choisir des fichiers JPG", addMore: "Ajouter des fichiers", converting: "Conversion…", prompt: "Déposez vos images JPG ou choisissez des fichiers", limit: "JPG · JPEG · 30 Mo maximum par fichier", processing: "Traitement sécurisé dans votre navigateur", privacy: "Vos fichiers sont traités dans votre navigateur et ne sont jamais envoyés à notre serveur.", converted: " converti(s)", download: "Télécharger", remove: "Supprimer", reset: "Tout effacer", zip: "Télécharger le ZIP", zipBuilding: "Création du ZIP…", tooMany: (max) => `Vous pouvez convertir jusqu’à ${max} fichiers à la fois.`, truncated: "Seuls les 10 premiers fichiers ont été sélectionnés.", invalid: (count) => `${count} fichier(s) non JPG exclu(s).`, oversized: (count) => `${count} fichier(s) de plus de 30 Mo exclu(s).`, failed: (count) => `${count} fichier(s) n’ont pas pu être converti(s).`, pixels: "px" },
  es: { choose: "Elegir archivos JPG", addMore: "Añadir más archivos", converting: "Convirtiendo…", prompt: "Suelta imágenes JPG aquí o elige archivos", limit: "JPG · JPEG · máximo 30 MB por archivo", processing: "Procesando de forma segura en tu navegador", privacy: "Tus archivos se procesan en el navegador y nunca se envían a nuestro servidor.", converted: " convertido(s)", download: "Descargar", remove: "Eliminar", reset: "Borrar todo", zip: "Descargar ZIP", zipBuilding: "Creando ZIP…", tooMany: (max) => `Puedes convertir hasta ${max} archivos a la vez.`, truncated: "Solo se seleccionaron los 10 primeros archivos.", invalid: (count) => `Se excluyeron ${count} archivo(s) que no son JPG.`, oversized: (count) => `Se excluyeron ${count} archivo(s) de más de 30 MB.`, failed: (count) => `No se pudieron convertir ${count} archivo(s).`, pixels: "px" },
};

/**
 *  로케일 홈 카피.
 *
 *  ⚠️ badge·trust는 예전에 컴포넌트에 영어로 하드코딩돼 있었다(독일어·일본어 페이지에도 "Free /
 *  Private / Mobile ready"가 그대로 나갔다). 새 문구를 추가할 때 컴포넌트에 직접 쓰지 말 것.
 *  ⚠️ 전부 무료라고 약속하지 않는다 — "가입 없이 지금 바로 무료" 톤으로만 쓴다(한국어판과 동일 기준).
 */
export type HomeCopy = {
  language: string;
  eyebrow: string;
  badge: string;
  title: string;
  accent: string;
  description: string;
  cta: string;
  tools: string;
  privacy: string;
  trust: [string, string, string, string];
};

export const homeCopy: Record<Locale, HomeCopy> = {
  ko: { language: "한국어", eyebrow: "OneDay Tools · All in One Tool", badge: "회원가입 없이 지금 바로", title: "파일 작업을 한곳에서", accent: "더 간단하게.", description: "이미지·PDF·오디오 도구를 설치 없이 브라우저에서 바로 처리하세요.", cta: "JPG PNG 변환 시작", tools: "인기 이미지 도구", privacy: "파일은 브라우저 안에서 안전하게 처리됩니다.", trust: ["무료", "회원가입 없음", "워터마크 없음", "파일 업로드 없음"] },
  en: { language: "English", eyebrow: "OneDay Tools · All in One Tool", badge: "Start now, no sign-up", title: "Handle files in one place", accent: "Keep it simple.", description: "Convert and manage images, PDFs, and audio right in your browser—no install required.", cta: "Start JPG to PNG", tools: "Popular image tools", privacy: "Your files are processed securely in your browser.", trust: ["Free", "No sign-up", "No watermark", "No upload"] },
  ja: { language: "日本語", eyebrow: "OneDay Tools · All in One Tool", badge: "登録不要ですぐに使える", title: "ファイル作業をひとつに", accent: "もっとシンプルに。", description: "画像・PDF・音声をインストールなしでブラウザ上ですぐに処理できます。", cta: "JPG PNG変換を開始", tools: "人気の画像ツール", privacy: "ファイルはブラウザ内で安全に処理されます。", trust: ["無料", "登録不要", "透かしなし", "アップロード不要"] },
  zh: { language: "简体中文", eyebrow: "OneDay Tools · All in One Tool", badge: "无需注册，立即使用", title: "文件处理，一站完成", accent: "简单又快速。", description: "无需安装，在浏览器中直接处理图片、PDF和音频文件。", cta: "开始 JPG 转 PNG", tools: "热门图片工具", privacy: "文件仅在浏览器中安全处理。", trust: ["免费", "无需注册", "无水印", "无需上传"] },
  "zh-tw": { language: "繁體中文", eyebrow: "OneDay Tools · All in One Tool", badge: "免註冊，立即使用", title: "檔案處理，一站完成", accent: "簡單又快速。", description: "無需安裝，直接在瀏覽器處理圖片、PDF 與音訊檔案。", cta: "開始 JPG 轉 PNG", tools: "熱門圖片工具", privacy: "檔案只會在瀏覽器中安全處理。", trust: ["免費", "免註冊", "無浮水印", "免上傳"] },
  de: { language: "Deutsch", eyebrow: "OneDay Tools · All in One Tool", badge: "Sofort loslegen, ohne Anmeldung", title: "Dateien an einem Ort", accent: "Einfach erledigt.", description: "Bilder, PDFs und Audiodateien direkt im Browser bearbeiten – ohne Installation.", cta: "JPG in PNG umwandeln", tools: "Beliebte Bildwerkzeuge", privacy: "Ihre Dateien werden sicher im Browser verarbeitet.", trust: ["Kostenlos", "Ohne Anmeldung", "Ohne Wasserzeichen", "Kein Upload"] },
  fr: { language: "Français", eyebrow: "OneDay Tools · All in One Tool", badge: "Commencez sans inscription", title: "Vos fichiers, au même endroit", accent: "Tout simplement.", description: "Traitez vos images, PDF et fichiers audio directement dans le navigateur, sans installation.", cta: "Commencer JPG vers PNG", tools: "Outils d’image populaires", privacy: "Vos fichiers sont traités en toute sécurité dans votre navigateur.", trust: ["Gratuit", "Sans inscription", "Sans filigrane", "Sans téléversement"] },
  es: { language: "Español", eyebrow: "OneDay Tools · All in One Tool", badge: "Empieza sin registrarte", title: "Tus archivos en un solo lugar", accent: "Así de fácil.", description: "Procesa imágenes, PDF y audio directamente en el navegador, sin instalar nada.", cta: "Empezar JPG a PNG", tools: "Herramientas de imagen populares", privacy: "Tus archivos se procesan de forma segura en tu navegador.", trust: ["Gratis", "Sin registro", "Sin marca de agua", "Sin subida"] },
};

/**
 *  셸(헤더·푸터) 카피.
 *
 *  ⚠️ 예전에는 헤더 카테고리명·"도구 검색"·푸터가 한국어로 하드코딩돼 있어서 /en·/de·/ja 페이지에
 *  한국어 UI가 그대로 노출됐다(실측: /en 한 페이지에서 "이미지 도구" 8회, "도구 검색" 4회).
 *  셸에 새 문구를 넣을 때는 반드시 여기에 추가한다.
 */
export type ChromeCopy = {
  searchTools: string;
  guides: string;
  viewAll: string;
  tagline: string;
  about: string;
  privacy: string;
  categories: { image: string; media: string; document: string; finance: string };
};

export const chromeCopy: Record<Locale, ChromeCopy> = {
  ko: { searchTools: "도구 검색", guides: "가이드", viewAll: "전체 보기", tagline: "일상에 필요한 파일 작업을 더 간단하게.", about: "서비스 소개", privacy: "개인정보처리방침", categories: { image: "이미지 도구", media: "오디오·영상", document: "문서·PDF", finance: "금융 계산기" } },
  en: { searchTools: "Search tools", guides: "Guides", viewAll: "View all", tagline: "Everyday file tasks, made simple.", about: "About", privacy: "Privacy policy", categories: { image: "Image tools", media: "Audio & video", document: "Documents & PDF", finance: "Finance calculators" } },
  ja: { searchTools: "ツールを検索", guides: "ガイド", viewAll: "すべて見る", tagline: "日常のファイル作業をもっと簡単に。", about: "サービス紹介", privacy: "プライバシーポリシー", categories: { image: "画像ツール", media: "音声・動画", document: "書類・PDF", finance: "金融計算" } },
  zh: { searchTools: "搜索工具", guides: "指南", viewAll: "查看全部", tagline: "让日常文件处理更简单。", about: "关于我们", privacy: "隐私政策", categories: { image: "图片工具", media: "音频与视频", document: "文档与 PDF", finance: "金融计算器" } },
  "zh-tw": { searchTools: "搜尋工具", guides: "指南", viewAll: "檢視全部", tagline: "讓日常檔案處理更簡單。", about: "關於我們", privacy: "隱私權政策", categories: { image: "圖片工具", media: "音訊與影片", document: "文件與 PDF", finance: "金融計算機" } },
  de: { searchTools: "Tools suchen", guides: "Ratgeber", viewAll: "Alle ansehen", tagline: "Alltägliche Dateiaufgaben, einfach gemacht.", about: "Über uns", privacy: "Datenschutz", categories: { image: "Bildwerkzeuge", media: "Audio & Video", document: "Dokumente & PDF", finance: "Finanzrechner" } },
  fr: { searchTools: "Rechercher des outils", guides: "Guides", viewAll: "Tout voir", tagline: "Les tâches de fichiers du quotidien, simplifiées.", about: "À propos", privacy: "Confidentialité", categories: { image: "Outils d'image", media: "Audio et vidéo", document: "Documents et PDF", finance: "Calculatrices financières" } },
  es: { searchTools: "Buscar herramientas", guides: "Guías", viewAll: "Ver todo", tagline: "Tareas de archivos del día a día, más simples.", about: "Acerca de", privacy: "Privacidad", categories: { image: "Herramientas de imagen", media: "Audio y vídeo", document: "Documentos y PDF", finance: "Calculadoras financieras" } },
};

/** 헤더 드롭다운의 도구 상태 라벨. 카탈로그의 status를 사람 말로 옮긴 것. */
export const toolStatusCopy: Record<Locale, { live: string; soon: string }> = {
  ko: { live: "사용하기", soon: "준비 중" },
  en: { live: "Open", soon: "Coming soon" },
  ja: { live: "使う", soon: "準備中" },
  zh: { live: "使用", soon: "即将推出" },
  "zh-tw": { live: "使用", soon: "即將推出" },
  de: { live: "Öffnen", soon: "Demnächst" },
  fr: { live: "Ouvrir", soon: "Bientôt" },
  es: { live: "Abrir", soon: "Próximamente" },
};

/** 카테고리 한 줄 설명(헤더 드롭다운). 카탈로그의 shortDescription은 한국어 고정이라 여기서 덮는다. */
export const categoryTagline: Record<Locale, { image: string; media: string; document: string; finance: string }> = {
  ko: { image: "변환·압축·크기 조절", media: "음원·영상 변환과 편집", document: "PDF 변환·병합·분할", finance: "수익률·평균단가 계산" },
  en: { image: "Convert, compress, resize", media: "Audio and video tools", document: "Convert, merge, split PDFs", finance: "Returns and average price" },
  ja: { image: "変換・圧縮・サイズ変更", media: "音声・動画の変換と編集", document: "PDFの変換・結合・分割", finance: "利回り・平均単価の計算" },
  zh: { image: "转换、压缩、调整尺寸", media: "音频与视频转换编辑", document: "PDF 转换、合并、拆分", finance: "收益率与平均成本计算" },
  "zh-tw": { image: "轉換、壓縮、調整尺寸", media: "音訊與影片轉換編輯", document: "PDF 轉換、合併、分割", finance: "報酬率與平均成本計算" },
  de: { image: "Konvertieren, komprimieren, skalieren", media: "Audio- und Videowerkzeuge", document: "PDFs umwandeln, zusammenfügen, teilen", finance: "Rendite und Durchschnittspreis" },
  fr: { image: "Convertir, compresser, redimensionner", media: "Outils audio et vidéo", document: "Convertir, fusionner, diviser des PDF", finance: "Rendement et prix moyen" },
  es: { image: "Convertir, comprimir, redimensionar", media: "Herramientas de audio y vídeo", document: "Convertir, unir y dividir PDF", finance: "Rentabilidad y precio medio" },
};

/** 404 페이지. 예전엔 한국어 고정이라 /en에서 404를 만나면 한국어 안내가 나왔다. */
export const notFoundCopy: Record<Locale, { title: string; body: string; cta: string }> = {
  ko: { title: "페이지를 찾을 수 없습니다.", body: "주소가 변경되었거나 아직 준비 중인 도구입니다.", cta: "도구 홈으로 이동" },
  en: { title: "Page not found", body: "The address may have changed, or this tool is not ready yet.", cta: "Go to the tools home" },
  ja: { title: "ページが見つかりません", body: "アドレスが変更されたか、まだ準備中のツールです。", cta: "ツールのホームへ" },
  zh: { title: "找不到页面", body: "地址可能已更改，或该工具尚未上线。", cta: "前往工具首页" },
  "zh-tw": { title: "找不到頁面", body: "網址可能已變更，或該工具尚未上線。", cta: "前往工具首頁" },
  de: { title: "Seite nicht gefunden", body: "Die Adresse hat sich geändert oder das Tool ist noch nicht verfügbar.", cta: "Zur Tool-Startseite" },
  fr: { title: "Page introuvable", body: "L'adresse a peut-être changé ou cet outil n'est pas encore disponible.", cta: "Aller à l'accueil des outils" },
  es: { title: "Página no encontrada", body: "Es posible que la dirección haya cambiado o que la herramienta aún no esté lista.", cta: "Ir al inicio de herramientas" },
};

/**
 *  도구 이름(네비 드롭다운·카드).
 *
 *  ⚠️ 카탈로그(tool-catalog.ts)의 name은 한국어 고정이다. 네비가 그걸 그대로 쓰는 바람에
 *  /en·/de 드롭다운에 "PDF 합치기"·"이미지 → PDF"가 그대로 떴다. 도구를 추가하면 여기도 채운다.
 */
export const toolNameCopy: Record<Locale, Record<string, string>> = {
  ko: {},
  en: {
    "jpg-to-png": "JPG to PNG", "image-compress": "Compress image", "image-resize": "Resize image", "webp-to-jpg": "WebP to JPG",
    "mp3-to-mp4": "MP3 to MP4", "audio-trim": "Trim audio",
    "pdf-merge": "Merge PDF", "pdf-compress": "Compress PDF", "pdf-converter": "PDF converter", "pdf-ocr": "PDF OCR",
    "pdf-to-pdfa": "PDF to PDF/A", "pdf-to-image": "PDF to image", "pdf-to-jpg": "PDF to JPG",
    "image-to-pdf": "Image to PDF", "jpg-to-pdf": "JPG to PDF", "stock-average-calculator": "Average price calculator",
  },
  ja: {
    "jpg-to-png": "JPG → PNG 変換", "image-compress": "画像を圧縮", "image-resize": "画像サイズ変更", "webp-to-jpg": "WebP → JPG 変換",
    "mp3-to-mp4": "MP3 → MP4 変換", "audio-trim": "音声を分割",
    "pdf-merge": "PDF結合", "pdf-compress": "PDF圧縮", "pdf-converter": "PDF変換ツール", "pdf-ocr": "PDF OCR",
    "pdf-to-pdfa": "PDF → PDF/A", "pdf-to-image": "PDF → 画像", "pdf-to-jpg": "PDF → JPG",
    "image-to-pdf": "画像 → PDF", "jpg-to-pdf": "JPG → PDF", "stock-average-calculator": "平均取得単価の計算",
  },
  zh: {
    "jpg-to-png": "JPG 转 PNG", "image-compress": "压缩图片", "image-resize": "调整图片尺寸", "webp-to-jpg": "WebP 转 JPG",
    "mp3-to-mp4": "MP3 转 MP4", "audio-trim": "音频剪辑",
    "pdf-merge": "合并 PDF", "pdf-compress": "压缩 PDF", "pdf-converter": "PDF 转换器", "pdf-ocr": "PDF OCR",
    "pdf-to-pdfa": "PDF 转 PDF/A", "pdf-to-image": "PDF 转图片", "pdf-to-jpg": "PDF 转 JPG",
    "image-to-pdf": "图片转 PDF", "jpg-to-pdf": "JPG 转 PDF", "stock-average-calculator": "平均成本计算器",
  },
  "zh-tw": {
    "jpg-to-png": "JPG 轉 PNG", "image-compress": "壓縮圖片", "image-resize": "調整圖片尺寸", "webp-to-jpg": "WebP 轉 JPG",
    "mp3-to-mp4": "MP3 轉 MP4", "audio-trim": "音訊剪輯",
    "pdf-merge": "合併 PDF", "pdf-compress": "壓縮 PDF", "pdf-converter": "PDF 轉換器", "pdf-ocr": "PDF OCR",
    "pdf-to-pdfa": "PDF 轉 PDF/A", "pdf-to-image": "PDF 轉圖片", "pdf-to-jpg": "PDF 轉 JPG",
    "image-to-pdf": "圖片轉 PDF", "jpg-to-pdf": "JPG 轉 PDF", "stock-average-calculator": "平均成本計算機",
  },
  de: {
    "jpg-to-png": "JPG in PNG", "image-compress": "Bild komprimieren", "image-resize": "Bildgröße ändern", "webp-to-jpg": "WebP in JPG",
    "mp3-to-mp4": "MP3 in MP4", "audio-trim": "Audio zuschneiden",
    "pdf-merge": "PDF zusammenfügen", "pdf-compress": "PDF komprimieren", "pdf-converter": "PDF-Konverter", "pdf-ocr": "PDF-OCR",
    "pdf-to-pdfa": "PDF in PDF/A", "pdf-to-image": "PDF in Bild", "pdf-to-jpg": "PDF in JPG",
    "image-to-pdf": "Bild in PDF", "jpg-to-pdf": "JPG in PDF", "stock-average-calculator": "Durchschnittspreisrechner",
  },
  fr: {
    "jpg-to-png": "JPG en PNG", "image-compress": "Compresser une image", "image-resize": "Redimensionner une image", "webp-to-jpg": "WebP en JPG",
    "mp3-to-mp4": "MP3 en MP4", "audio-trim": "Découper un audio",
    "pdf-merge": "Fusionner des PDF", "pdf-compress": "Compresser un PDF", "pdf-converter": "Convertisseur PDF", "pdf-ocr": "OCR PDF",
    "pdf-to-pdfa": "PDF en PDF/A", "pdf-to-image": "PDF en image", "pdf-to-jpg": "PDF en JPG",
    "image-to-pdf": "Image en PDF", "jpg-to-pdf": "JPG en PDF", "stock-average-calculator": "Calculateur de prix moyen",
  },
  es: {
    "jpg-to-png": "JPG a PNG", "image-compress": "Comprimir imagen", "image-resize": "Redimensionar imagen", "webp-to-jpg": "WebP a JPG",
    "mp3-to-mp4": "MP3 a MP4", "audio-trim": "Recortar audio",
    "pdf-merge": "Unir PDF", "pdf-compress": "Comprimir PDF", "pdf-converter": "Conversor de PDF", "pdf-ocr": "OCR de PDF",
    "pdf-to-pdfa": "PDF a PDF/A", "pdf-to-image": "PDF a imagen", "pdf-to-jpg": "PDF a JPG",
    "image-to-pdf": "Imagen a PDF", "jpg-to-pdf": "JPG a PDF", "stock-average-calculator": "Calculadora de precio medio",
  },
};

/** ko는 카탈로그 이름을 그대로 쓰고, 나머지 언어는 사전을 우선한다(없으면 원본으로 폴백). */
export function toolLabel(locale: Locale, slug: string, fallback: string) {
  return toolNameCopy[locale]?.[slug] ?? fallback;
}
