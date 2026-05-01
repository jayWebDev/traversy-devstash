# Current Feature

Database Seed Data - Create a Prisma seed script to populate the dev database with a demo user, system item types, and sample collections/items for development and demos.

## Status

Completed

## Goals

- Create `prisma/seed.ts` runnable via `prisma db seed`
- Seed a demo user (demo@devstash.io / "Demo User", password hashed with bcryptjs @ 12 rounds, `isPro: false`, `emailVerified: now`)
- Seed 7 system item types (snippet, prompt, command, note, file, image, link) with Lucide icon names and brand colors, all `isSystem: true`
- Seed 5 collections with associated items:
  - **React Patterns** — 3 TypeScript snippets (custom hooks, component patterns, utilities)
  - **AI Workflows** — 3 prompts (code review, doc generation, refactoring)
  - **DevOps** — 1 snippet, 1 command, 2 links (real URLs)
  - **Terminal Commands** — 4 commands (git, docker, process mgmt, package managers)
  - **Design Resources** — 4 links (real URLs: CSS/Tailwind, component libs, design systems, icon libs)
- Make the script idempotent (safe to re-run)

## Notes

See @context/features/seed-spec.md for full spec.

bcryptjs for password hashing. Use `upsert` / deterministic IDs where possible so re-running the seed doesn't duplicate data.

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-03-29: Initial Next.js 16 project setup with App Router, React 19, Tailwind CSS v4, TypeScript strict mode, and ESLint 9
- 2026-03-31: Dashboard Phase 1 - ShadCN UI init, dark mode default, /dashboard route with top bar (search + new item button), sidebar and main area placeholders
- 2026-04-10: Dashboard Phase 3 - Main content area with 4 stats cards, collections grid, pinned items list, and recent items list using mock data
- 2026-04-24: Prisma 7 + Neon Postgres setup - new `prisma-client` generator outputting to `src/generated/prisma`, `prisma.config.ts` with PrismaPg adapter, schema with app models + NextAuth (Account/Session/VerificationToken), cascade deletes and indexes, ESM enabled (`type: module`), `db:*` npm scripts, `src/lib/prisma.ts` singleton
- 2026-04-30: Database seed - `prisma/seed.ts` with bcryptjs-hashed demo user, 7 system item types, and 5 collections totaling 18 items; idempotent via upsert; wired through `prisma.config.ts` `migrations.seed` and `npm run db:seed`
