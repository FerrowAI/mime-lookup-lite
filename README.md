# mime-lookup-lite

```sh
npm install @ferrow/mime-lookup-lite
```
![CI](https://github.com/FerrowAI/mime-lookup-lite/actions/workflows/ci.yml/badge.svg)

Extension <-> MIME lookup from curated table (~120 types), charset defaults, compressibility heuristic.

## Quick Start

```typescript
import { fromExtension, fromMime, lookup, isCompressible } from "mime-lookup-lite";

fromExtension("pdf");            // "application/pdf"
fromMime("image/png");           // "png"
lookup("json");                  // { mime: "application/json", charset: "UTF-8", compressible: true }
isCompressible("text/plain");    // true
```

## API

### `fromExtension(ext: string): string | null`

Get MIME type from extension (e.g., "pdf" → "application/pdf").

### `fromMime(mime: string): string | null`

Get canonical extension from MIME type. Returns first matching extension or null.

### `lookup(ext: string): MimeEntry | null`

Get full MIME entry: `{mime: string, charset?: string, compressible?: boolean}`.

Charset is set for text types (text/*, application/json, etc.). Compressible defaults to false if not specified.

### `isCompressible(mime: string): boolean`

Check if a MIME type is typically compressible (text/*, application/json, application/xml, etc.). Useful for HTTP Content-Encoding decisions.

### `register(ext: string, mime: string, charset?: string, compressible?: boolean): void`

Register a custom MIME type for runtime use. Overrides built-in entry if exists.

## Limitations

- **Curated subset, not authoritative:** ~120 entries covering web assets, documents, images, audio/video, fonts, archives, and code. Not full IANA registry.
- **Extension ambiguity:** Some MIME types map to multiple extensions (reverse lookup returns first match only).
- No locale-specific or app-specific MIME types.

---

Part of the [ferrow-toolkit](https://github.com/Ruzylo-cloud/ferrow-toolkit) collection · Sponsored by [Ferrow](https://ferrow.ai)
