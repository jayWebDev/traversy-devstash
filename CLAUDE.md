# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Architecture

**DevStash** is a Next.js 16 app using the App Router (`src/app/`). Key tech:

- **React 19** with the React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- **Tailwind CSS v4** — uses the single `@import "tailwindcss"` directive; no `tailwind.config.js`
- **TypeScript** in strict mode; path alias `@/*` → `src/*`
- **ESLint 9** flat config format (`eslint.config.mjs`)

The app is in early development — only a root layout and home page exist. The root layout (`src/app/layout.tsx`) sets up Geist fonts and a flex-column full-height shell. All new routes go under `src/app/`.
