# Current Feature

Prisma + Neon PostgreSQL Setup - Set up Prisma 7 ORM with Neon serverless PostgreSQL, including initial schema and NextAuth models.

## Status

Completed

## Goals

- Use Neon PostgreSQL (serverless)
- Set up Prisma 7 (note breaking changes from prior versions)
- Create initial schema based on data models in project-overview.md
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Use development branch via DATABASE_URL; always create migrations rather than pushing directly

## Notes

See @context/features/database-spec.md for full spec.

Prisma 7 upgrade guide: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
Prisma Postgres quickstart: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-03-29: Initial Next.js 16 project setup with App Router, React 19, Tailwind CSS v4, TypeScript strict mode, and ESLint 9
- 2026-03-31: Dashboard Phase 1 - ShadCN UI init, dark mode default, /dashboard route with top bar (search + new item button), sidebar and main area placeholders
- 2026-04-10: Dashboard Phase 3 - Main content area with 4 stats cards, collections grid, pinned items list, and recent items list using mock data
- 2026-04-24: Prisma 7 + Neon Postgres setup - new `prisma-client` generator outputting to `src/generated/prisma`, `prisma.config.ts` with PrismaPg adapter, schema with app models + NextAuth (Account/Session/VerificationToken), cascade deletes and indexes, ESM enabled (`type: module`), `db:*` npm scripts, `src/lib/prisma.ts` singleton
