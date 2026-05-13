# Sreedev Krishna — Cinema Portfolio

Single-page Next.js portfolio with Lenis smooth scrolling, a fixed 3D “spatial stage,” and Framer Motion–driven sections.

## Scripts

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
npm run lint
```

## Content and assets

- Scene list and scroll height live in [`src/lib/scenes.ts`](src/lib/scenes.ts).
- CV download in the status bar serves [`public/resume.pdf`](public/resume.pdf). Replace that file to update the downloadable CV.

## Stack

Next.js 16, React 19, Tailwind CSS 4, Framer Motion, Lenis, GSAP (ScrollTrigger).
