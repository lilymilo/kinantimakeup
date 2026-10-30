# AGENTS.md

Small single-app Next.js 16 project (no monorepo). App Router lives in `src/app/`; the only entrypoints are `src/app/layout.tsx` and `src/app/page.tsx`. Path alias: `@/*` → `./src/*`.

## Commands

- Dev server: `npm run dev` (Turbopack)
- Lint: `npm run lint` (eslint flat config, no explicit file args — passes with zero output on success)
- Typecheck: `npx tsc --noEmit` (no dedicated script; `tsconfig.json` is strict)
- Build: `npm run build`
- No test suite or test runner exists. Don't add tests unless asked.

## Toolchain quirks

- **This is NOT the Next.js you know.** The pinned version (16.4.3) has breaking changes vs. training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code; heed deprecation notices.
- `next.config.ts` enables `cacheComponents: true` and `partialPrefetching: true`. Caching defaults differ from classic Next.js: pages are uncached-by-default with explicit caching via Suspense/`use cache`. Read the caching docs in `node_modules/next/dist/docs/` before adding data fetching.
- Tailwind CSS v4 — configured via `@import "tailwindcss"` in `src/app/globals.css` and the `@tailwindcss/turbopack` loader in `next.config.ts`. There is no `tailwind.config.js` and no PostCSS config; use Tailwind v4 `@theme` syntax for design tokens.
- The `<!-- BEGIN:nextjs-agent-rules -->` block below is written and re-added automatically by `next dev` (see `node_modules/next/dist/server/lib/generate-agent-files.js`). Keep it committed; don't delete it from diffs.
- The repo is not fully committed yet (mostly untracked files from scaffold) — check `git status` before assuming tracked state.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
