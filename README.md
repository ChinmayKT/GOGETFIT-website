# GOGETFIT

India's health transformation company — dedicated coaches, personalized nutrition, real accountability. Marketing site for the GOGETFIT app, built with Next.js 15 (App Router) + React 19.

## Synopsis

Single-page marketing site (`app/page.tsx`) with section-snap scrolling, wrapped in a smooth-scroll container (Lenis via `SmoothScroll`) and a 3D ambient background (`AmbientBackground`, react-three-fiber). Section order:

1. **Hero** — headline, CTA, floating phone mockup
2. **About** — brand story
3. **Features** — product feature grid
4. **Coaches** — coach roster
5. **Leadership** — executive team (deck-deal card entrance animation)
6. **Transformations** — client before/after showcase, marquee reel
7. **Contact** — `ConsultationForm` (react-hook-form + zod validation)
8. **DownloadCta** — app store / play store download

`Navbar` and `Footer` frame the page. `FloatingPhone` (desktop-only, lazy-loaded) renders an interactive phone mockup cycling through app screens (`components/phone/screens.tsx`) synced to scroll position.

Other routes: `/privacy-policy`, `/terms-of-service`, `/refund-policy` (shared `LegalPageLayout`), plus `robots.ts` / `sitemap.ts` for SEO. Site metadata, OpenGraph/Twitter cards, and JSON-LD Organization schema are set in `app/layout.tsx`.

## Design System

**Fonts** — Manrope (`--font-manrope`, body/sans) and Space Grotesk (`--font-display`, headlines), loaded via `next/font/google`.

**Color tokens** (`app/globals.css`):

| Token | Value | Use |
|---|---|---|
| `--bg` | `#080808` | page background |
| `--bg-elevated` | `#0e0e10` | raised surfaces |
| `--primary` | `#ff6a00` | brand orange |
| `--primary-soft` | `#ff8a3d` | orange, lighter |
| `--primary-deep` | `#cc4d00` | orange, darker |
| `--white` / `--silver` / `--silver-dim` | `#fff` / `#c8ccd4` / `#8a8f99` | text hierarchy |

Dark theme only. Tailwind v4 `@theme inline` maps these CSS vars to `color-*` / `font-*` utilities.

**Signature visual language**
- **Liquid glass** — `.glass` / `.glass-strong` utility classes: translucent background, heavy backdrop-blur + saturate, inset highlight border, soft drop shadow. Used for cards, nav, buttons.
- **Glass sheen** — `.glass-sheen` adds a diagonal light sweep on hover.
- **Noise overlay** — fixed full-viewport SVG fractal-noise texture (`.noise`, applied on `<body>`) for a grainy, non-flat dark background.
- **Gradient text** — `.text-gradient-orange` (white → orange) and `.text-gradient-silver` (white → silver) for headline emphasis.
- **Headline style** — `.headline`: Space Grotesk, tight tracking (`-0.04em`), tight leading (`0.95`), weight 600.
- **Motion** — custom easings `--ease-out-expo` / `--ease-spring`; drifting mesh-gradient blobs (`.blob-a`/`.blob-b`, GPU transform-only), phone "breathing" float, scroll-dot indicator, marquee reel, restrained hover lifts on leadership/app cards. All animation is disabled under `prefers-reduced-motion`.

**Stack**
- Next.js 15 (Turbopack build) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion + GSAP — component and scroll-driven animation
- Lenis — smooth scroll
- react-three-fiber / drei / three — 3D ambient background
- react-hook-form + zod (`@hookform/resolvers`) — form validation
- `clsx` + `tailwind-merge` via `cn()` in `lib/utils.ts` — the most-used utility in the codebase, composing conditional class names everywhere
- lucide-react — icons
- Vercel Analytics

**Component map**
- `components/shared/` — `GlassButton`, `Reveal` (scroll-in animation wrapper), `SmartLink`, `SocialIcon`, `StoreButton`
- `components/cards/TiltCard` — pointer-tilt hover card
- `components/brand/GoGetFitLogo` — logo component
- `components/layout/` — `Navbar`, `Footer`
- `components/legal/` — shared legal-page shell + content renderer
- `components/phone/` — `DeviceFrame`, `FloatingPhone`, app screen catalog
- `components/animations/` — `SmoothScroll`, `SnapScroll`
- `components/3d/AmbientBackground`

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `app/page.tsx` or any section under `components/sections/` — hot reloads on save.

```bash
npm run build   # production build (Turbopack)
npm run lint
```

## Deploy

Deployed on [Vercel](https://vercel.com). Push to the connected branch or run `vercel deploy`.
