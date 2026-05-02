# Current Feature

Dashboard Collections - Replace dummy collection data in the dashboard main area with real data from the Neon database via Prisma. Keep the existing 6-card recent collections layout, but source from the DB instead of `src/lib/mock-data.ts`. Items underneath are out of scope for this pass.

## Status

In Progress

## Goals

- Create `src/lib/db/collections.ts` with data fetching functions
- Fetch collections directly in the server component (no client fetching)
- Derive collection card border color from the most-used content type in that collection
- Show small icons of all item types present in each collection
- Preserve current design (reference `context/screenshots/dashboard-ui-main.png` if needed)
- Update collection stats display

## Notes

See @context/features/dashboard-collections-spec.md for full spec.

Do not add per-collection items underneath the cards yet — that's a later phase.

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-03-29: Initial Next.js 16 project setup with App Router, React 19, Tailwind CSS v4, TypeScript strict mode, and ESLint 9
- 2026-03-31: Dashboard Phase 1 - ShadCN UI init, dark mode default, /dashboard route with top bar (search + new item button), sidebar and main area placeholders
- 2026-04-10: Dashboard Phase 3 - Main content area with 4 stats cards, collections grid, pinned items list, and recent items list using mock data
- 2026-04-24: Prisma 7 + Neon Postgres setup - new `prisma-client` generator outputting to `src/generated/prisma`, `prisma.config.ts` with PrismaPg adapter, schema with app models + NextAuth (Account/Session/VerificationToken), cascade deletes and indexes, ESM enabled (`type: module`), `db:*` npm scripts, `src/lib/prisma.ts` singleton
- 2026-04-30: Database seed - `prisma/seed.ts` with bcryptjs-hashed demo user, 7 system item types, and 5 collections totaling 18 items; idempotent via upsert; wired through `prisma.config.ts` `migrations.seed` and `npm run db:seed`
