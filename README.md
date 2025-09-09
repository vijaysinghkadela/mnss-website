## MNSS Website (NGO)

A modern, fast, and responsive website for the MNSS NGO built with Next.js 15 (App Router), React 19, and Tailwind CSS 4. It showcases programs, impact statistics, timelines, reports, and contact information with multilingual support.

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: lucide-react

### Key Features
- **Hero, Programs, Services, Statistics, Timeline, Reports, Contact** sections
- **Progress gallery** with curated images
- **Language context** for future i18n support
- **Accessible, responsive layout** with reusable UI primitives

---

## Project Structure

```
src/
  app/                # App Router pages (home, about, programs, contact)
  components/         # UI sections and reusable components
    ui/               # Button, Card, Container primitives
  context/            # Language context provider
  data/               # Static data (constants, progress)
  hooks/              # Custom hooks (counter, scroll animations)
  lib/                # Utilities and data helpers
  types/              # Type declarations
public/               # Static assets (images, icons, timelines)
```

Notable files:
- `src/app/page.tsx` – Home page composition
- `src/components/*` – Feature sections (e.g., `Hero`, `Timeline`, `Statistics`)
- `src/context/LanguageContext.tsx` – Language state
- `public/assets/*` – Timeline SVGs and other assets

---

## Getting Started

1) Install dependencies
```bash
npm install
```

2) Run the development server
```bash
npm run dev
```

3) Open the app
```
http://localhost:3000
```

Build and run production locally:
```bash
npm run build
npm start
```

Lint:
```bash
npm run lint
```

---

## Scripts (package.json)
- `dev`: next dev --turbopack
- `build`: next build --turbopack
- `start`: next start
- `lint`: eslint

---

## Assets & Images
- Place images in `public/` (served from the site root).
- See `PUBLIC_ASSETS.md` and `PUBLIC_IMAGE_INSTRUCTIONS.md` for conventions.
- Timeline SVGs live in `public/assets/` and are used by `Timeline.tsx`.

---

## Deployment
- Optimized for deployment on Vercel.
- After pushing to GitHub, connect the repo on Vercel and deploy.
- Alternatively, use any Node.js host that supports Next.js 15.

---

## Contributing
1. Create a feature branch from `new`.
2. Make changes and ensure `npm run lint` passes.
3. Submit a PR.

---

## License
Specify a license if applicable (e.g., MIT). If omitted, all rights reserved.
