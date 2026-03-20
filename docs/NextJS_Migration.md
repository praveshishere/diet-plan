# Vite → Next.js Migration

## Overview

Migrated the diet-plan app from Vite + React to Next.js 15 (App Router) while preserving all existing functionality, styling, and theme behavior.

## Changes

### Added
| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with metadata and `suppressHydrationWarning` for theme |
| `app/page.tsx` | Home page — renders `DietPlan` component |
| `app/globals.css` | Global styles (moved from `src/index.css`) |
| `components/DietPlan.tsx` | Main component (moved from `src/components/`) |
| `next.config.ts` | Next.js configuration |
| `postcss.config.mjs` | Tailwind CSS 4 via `@tailwindcss/postcss` |

### Removed
- `vite.config.ts`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `eslint.config.js`

### Modified
| File | Change |
|------|--------|
| `package.json` | Replaced Vite/plugin deps with `next`, `eslint-config-next`, `@tailwindcss/postcss` |
| `tsconfig.json` | Replaced split config with standard Next.js tsconfig |

## Key Notes

- **`"use client"`** added to `components/DietPlan.tsx` — required because it uses `useState`, `useEffect`, and `localStorage`.
- **`suppressHydrationWarning`** on `<html>` in `layout.tsx` — prevents React hydration mismatch caused by the theme toggle applying a `dark` class to `<html>` on the client after SSR.
- **CSS import order fixed** in `globals.css` — Google Fonts `@import` moved before `@import "tailwindcss"` to satisfy PostCSS ordering rules.
- **Tailwind CSS 4** integration changed from `@tailwindcss/vite` plugin to `@tailwindcss/postcss` (the correct adapter for Next.js).

## Dependency diff

```
+ next@15.3.3
+ eslint-config-next@15.3.3
+ @tailwindcss/postcss@4.2.1

- vite@8.0.0
- @vitejs/plugin-react@6.0.0
- @tailwindcss/vite@4.2.1
- eslint-plugin-react-hooks@7.0.1
- eslint-plugin-react-refresh@0.5.2
- @eslint/js@9.39.4
- globals@17.4.0
- typescript-eslint@8.56.1
```

## Scripts

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server (`next dev`) |
| `pnpm build` | Production build (`next build`) |
| `pnpm start` | Serve production build (`next start`) |
| `pnpm lint` | Lint via `next lint` |
