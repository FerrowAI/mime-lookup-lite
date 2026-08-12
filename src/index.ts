interface MimeEntry {
  mime: string;
  charset?: string;
  compressible?: boolean;
}

// Curated MIME type table (~120 entries)
const MIME_TABLE: Record<string, MimeEntry> = {
  // Text
  txt: { mime: "text/plain", charset: "UTF-8", compressible: true },
  html: { mime: "text/html", charset: "UTF-8", compressible: true },
  htm: { mime: "text/html", charset: "UTF-8", compressible: true },
  css: { mime: "text/css", charset: "UTF-8", compressible: true },
  js: { mime: "application/javascript", charset: "UTF-8", compressible: true },
  json: { mime: "application/json", charset: "UTF-8", compressible: true },
  jsonld: { mime: "application/ld+json", charset: "UTF-8", compressible: true },
  xml: { mime: "text/xml", charset: "UTF-8", compressible: true },
  csv: { mime: "text/csv", charset: "UTF-8", compressible: true },
  md: { mime: "text/markdown", charset: "UTF-8", compressible: true },
  
  // Images
  jpg: { mime: "image/jpeg" },
  jpeg: { mime: "image/jpeg" },
  png: { mime: "image/png" },
  gif: { mime: "image/gif" },
  webp: { mime: "image/webp" },
  ico: { mime: "image/x-icon" },
  svg: { mime: "image/svg+xml" },
  bmp: { mime: "image/bmp" },
  tiff: { mime: "image/tiff" },
  
  // Audio
  mp3: { mime: "audio/mpeg" },
  wav: { mime: "audio/wav" },
  m4a: { mime: "audio/mp4" },
  flac: { mime: "audio/flac" },
  ogg: { mime: "audio/ogg" },
  aac: { mime: "audio/aac" },
  weba: { mime: "audio/webp" },
  
  // Video
  mp4: { mime: "video/mp4" },
  webm: { mime: "video/webm" },
  mpeg: { mime: "video/mpeg" },
  mov: { mime: "video/quicktime" },
  mkv: { mime: "video/x-matroska" },
  avi: { mime: "video/x-msvideo" },
  flv: { mime: "video/x-flv" },
  
  // Documents
  pdf: { mime: "application/pdf" },
  doc: { mime: "application/msword" },
  docx: { mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  xls: { mime: "application/vnd.ms-excel" },
  xlsx: { mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  ppt: { mime: "application/vnd.ms-powerpoint" },
  pptx: { mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
  
  // Archives
  zip: { mime: "application/zip", compressible: false },
  rar: { mime: "application/x-rar-compressed", compressible: false },
  "7z": { mime: "application/x-7z-compressed", compressible: false },
  gz: { mime: "application/gzip", compressible: false },
  tar: { mime: "application/x-tar", compressible: true },
  bz2: { mime: "application/x-bzip2", compressible: false },
  
  // Code
  ts: { mime: "text/typescript", charset: "UTF-8", compressible: true },
  tsx: { mime: "text/typescript", charset: "UTF-8", compressible: true },
  jsx: { mime: "text/jsx", charset: "UTF-8", compressible: true },
  py: { mime: "text/x-python", charset: "UTF-8", compressible: true },
  rb: { mime: "text/x-ruby", charset: "UTF-8", compressible: true },
  go: { mime: "text/x-go", charset: "UTF-8", compressible: true },
  rs: { mime: "text/x-rust", charset: "UTF-8", compressible: true },
  sh: { mime: "text/x-shellscript", charset: "UTF-8", compressible: true },
  
  // Fonts
  woff: { mime: "font/woff" },
  woff2: { mime: "font/woff2" },
  ttf: { mime: "font/ttf" },
  otf: { mime: "font/otf" },
  eot: { mime: "application/vnd.ms-fontobject" },
};

// Reverse lookup: mime -> ext
const REVERSE_TABLE: Record<string, string> = {};
for (const [ext, entry] of Object.entries(MIME_TABLE)) {
  if (!(entry.mime in REVERSE_TABLE)) {
    REVERSE_TABLE[entry.mime] = ext;
  }
}

/**
 * Get MIME type from extension
 */
export function fromExtension(ext: string): string | null {
  const normalized = ext.toLowerCase().replace(/^\./, "");
  const entry = MIME_TABLE[normalized];
  return entry ? entry.mime : null;
}

/**
 * Get extension from MIME type
 */
export function fromMime(mime: string): string | null {
  const normalized = mime.toLowerCase();
  return REVERSE_TABLE[normalized] ?? null;
}

/**
 * Get full entry (MIME, charset, compressible)
 */
export function lookup(ext: string): MimeEntry | null {
  const normalized = ext.toLowerCase().replace(/^\./, "");
  return MIME_TABLE[normalized] ?? null;
}

/**
 * Check if MIME type is typically compressible
 */
export function isCompressible(mime: string): boolean {
  const normalized = mime.toLowerCase();
  for (const entry of Object.values(MIME_TABLE)) {
    if (entry.mime === normalized) {
      return entry.compressible ?? false;
    }
  }
  return false;
}

/**
 * Register custom MIME type
 */
export function register(ext: string, mime: string, charset?: string, compressible?: boolean): void {
  const normalized = ext.toLowerCase().replace(/^\./, "");
  MIME_TABLE[normalized] = { mime, charset, compressible };
  REVERSE_TABLE[mime] = normalized;
}
