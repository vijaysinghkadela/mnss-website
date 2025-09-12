# Copilot instructions for MNSS Website

This repo is a Next.js 15 (App Router) + React 19 + Tailwind CSS 4 site for an NGO. Use these conventions to be productive fast.

## Stack and workflows
- Run dev: npm run dev (Turbopack). Build: npm run build. Start: npm start. Lint: npm run lint.
- VS Code task: “Build Next.js app” runs npm run build.
- No tests configured. Prefer quick manual checks via the dev server.

## Architecture (what goes where)
- Pages: src/app/* (App Router). Example: src/app/page.tsx (home), src/app/progress-reports/page.tsx.
- UI sections: src/components/* (Hero, Services, Timeline, Gallery, etc.). Interactive components are client components ("use client").
- Data-first content: src/data/* holds typed in-repo data (e.g., progress.ts, progressReports.ts). Prefer updating these over ad-hoc fetches.
- Types: src/types/index.ts defines shared shapes (MediaItem, Service, TimelineItem…). Use them in components and APIs.
- Server utilities: src/lib/mongodb.ts provides pooled MongoDB access and degrades gracefully when env vars are missing.
- Public assets: public/* served at site root. Timelines under public/assets/*. Uploads saved to public/uploads/{images|videos}.

## API routes and integration patterns
- /api/upload (src/app/api/upload/route.ts)
  - Accepts multipart/form-data: fields file (required), title, description, type (image|video optional).
  - Saves to public/uploads/images or public/uploads/videos and returns a MediaItem. Example client call:
    - const fd = new FormData(); fd.append('file', file); fetch('/api/upload', { method: 'POST', body: fd })
- /api/donations and /api/payments
  - Accept JSON, persist to MongoDB if MONGODB_URI and MONGODB_DB are set; otherwise return a valid response without persistence.
  - /api/donations returns a UPI deep link; /api/payments records generic payments. Use getDb() for DB ops.
- /api/reports, /api/report-files, /api/todos, /api/contact are stubs/placeholders. Implement real logic as needed.
- Middleware: src/middleware.ts is pass-through; matcher reserves /dashboard/* for future auth.

## i18n and theming
- Language/theme context: src/context/LanguageContext.tsx provides useLanguage().
  - Translate text via t('key'); add keys to translations map in the same file (en/hi).
  - Theme toggle handled here; toggles html.dark class.

## Images, PDFs, and galleries
- Progress gallery: src/components/ProgressGallery.tsx reads from src/data/progress.ts where each item is { src: '/images/progress/…', caption }.
  - Place images under public/images/progress/. See PROGRESS_IMAGES_SETUP.md for the pre-defined filenames.
- Timeline assets: put images in public/assets/ and reference in data/types.
- Annual report PDFs:
  - Current component src/components/Reports.tsx expects files under /documents/… but repo stores them under public/prograss_report/… (note the spelling “prograss”). Align by either moving/renaming files to public/documents or updating the component paths.

## Conventions and patterns
- Prefer typed data modules (src/data/*) + presentational components over fetching when content is static.
- Use next/image for local assets; handle onError fallbacks as in ProgressGallery components.
- Client components for interactivity ("use client"); otherwise keep components server-side by default.
- Keep Mongo optional: code should work without DB by using the existing “graceful no-DB mode” checks.

## Common edits with file pointers
- Add a new section to home: compose in src/app/page.tsx using components from src/components/*.
- Add translation: update translations in src/context/LanguageContext.tsx and replace strings in components with t('key').
- Add a new API: create src/app/api/<name>/route.ts using NextResponse and, if needed, getDb().

## Gotchas
- Path mismatch for reports PDFs (/documents vs /prograss_report). Fix before linking in UI.
- Some components note removed deps (framer-motion, lucide-react). If you reintroduce animations/icons, add dependencies to package.json.

References: README.md (stack/scripts), PUBLIC_ASSETS.md, PUBLIC_IMAGE_INSTRUCTIONS.md, PROGRESS_IMAGES_SETUP.md.
