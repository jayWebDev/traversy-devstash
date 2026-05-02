# Current Feature

Dashboard Items - Replace dummy item data in the dashboard main area (pinned and recent items lists) with real data from the Neon database via Prisma. Preserve the existing layout and design; only swap the data source from `src/lib/mock-data.ts` to the DB.

## Status

Completed

## Goals

- Create `src/lib/db/items.ts` with data fetching functions
- Fetch items directly in server components (no client fetching)
- Derive item card icon/border color from the item's type
- Display item type tags and the metadata currently shown on each card
- Hide the pinned items section entirely when there are no pinned items
- Update item stats display

## Notes

See @context/features/dashboard-items-spec.md for full spec.

Reference `context/screenshots/dashboard-ui-main.png` for layout if needed.

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-03-29: Initial Next.js 16 project setup with App Router, React 19, Tailwind CSS v4, TypeScript strict mode, and ESLint 9
- 2026-03-31: Dashboard Phase 1 - ShadCN UI init, dark mode default, /dashboard route with top bar (search + new item button), sidebar and main area placeholders
- 2026-04-10: Dashboard Phase 3 - Main content area with 4 stats cards, collections grid, pinned items list, and recent items list using mock data
- 2026-04-24: Prisma 7 + Neon Postgres setup - new `prisma-client` generator outputting to `src/generated/prisma`, `prisma.config.ts` with PrismaPg adapter, schema with app models + NextAuth (Account/Session/VerificationToken), cascade deletes and indexes, ESM enabled (`type: module`), `db:*` npm scripts, `src/lib/prisma.ts` singleton
- 2026-04-30: Database seed - `prisma/seed.ts` with bcryptjs-hashed demo user, 7 system item types, and 5 collections totaling 18 items; idempotent via upsert; wired through `prisma.config.ts` `migrations.seed` and `npm run db:seed`
- 2026-05-01: Dashboard Collections - `src/lib/db/collections.ts` with `getRecentCollections()`; `CollectionsGrid` converted to async server component; per-card accent color and icon row derived from most-used item type
- 2026-05-01: Dashboard Items - `src/lib/db/items.ts` (pinned + recent) and `src/lib/db/stats.ts`; `PinnedItems`, `RecentItems`, and `StatsCards` converted to async server components; shared `ItemRow` with type-colored accent and `TypeIcon` switch component; pinned section hides when empty
