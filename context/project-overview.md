# 🚀 DevStash — Project Overview

> **Store Smarter. Build Faster.**
>
> A centralized, AI-enhanced developer knowledge hub for code snippets, AI prompts, docs, commands, and more.

---

## 📌 Problem Statement

Developers keep their essentials scattered across too many places: code snippets in VS Code or Notion, AI prompts buried in chat histories, context files lost in project folders, useful links in browser bookmarks, docs in random directories, commands in `.txt` files, templates in GitHub Gists, and terminal commands in bash history.

This leads to **context switching**, **lost knowledge**, and **inconsistent workflows**.

**DevStash solves this** by providing a single, searchable, AI-enhanced hub for all developer knowledge and resources.

---

## 🧑‍💻 Target Users

| Persona | Key Needs |
|---|---|
| 🧑‍💻 **Everyday Developer** | Quick access to snippets, commands, and links |
| 🤖 **AI-First Developer** | Store and manage prompts, workflows, and context files |
| 🎓 **Content Creator / Educator** | Save course notes and reusable code examples |
| 🏗️ **Full-Stack Builder** | Patterns, boilerplates, and API references |

---

## ✨ Core Features

### A) Items & System Item Types

Every piece of knowledge is an **Item**. Items belong to one of these built-in types:

| Type | Icon | Description |
|---|---|---|
| Snippet | `</>` | Reusable code blocks with syntax highlighting |
| Prompt | 🤖 | AI prompts for LLMs |
| Note | 📝 | Freeform markdown notes |
| Command | ⌨️ | CLI / terminal commands |
| File | 📄 | Uploaded documents and templates |
| Image | 🖼️ | Screenshots, diagrams, assets |
| URL | 🔗 | Bookmarked links and references |

> **Pro users** can create custom item types with their own icons and colors.

### B) Collections

Organize items into named groups. Mixed item types are allowed within a single collection.

**Example collections:** _React Patterns_, _Context Files_, _Python Snippets_, _Interview Prep_, _API References_

### C) Search

Full-text search across content, tags, titles, and types — instant results.

### D) Authentication

- Email + Password
- GitHub OAuth
- Powered by [NextAuth.js v5](https://authjs.dev/)

### E) Additional Features

- ⭐ Favorites and 📌 pinned items
- 🕐 Recently used items
- 📥 Import from files
- ✍️ Markdown editor for text-based items
- 📎 File uploads (images, docs, templates)
- 📤 Export (JSON / ZIP)
- 🌙 Dark mode (default)

### F) AI Superpowers

| Feature | Description |
|---|---|
| 🏷️ Auto-tagging | Automatically suggests tags based on content |
| 📋 AI Summaries | Generates concise summaries of long items |
| 💡 Explain Code | Explains what a code snippet does in plain English |
| ✨ Prompt Optimization | Rewrites and improves AI prompts for better results |

> AI powered by **OpenAI `gpt-5-nano`**

---

## 🗄️ Data Model (Rough Prisma Draft)

> ⚠️ This schema is a starting point and **will evolve** as the project develops.

```prisma
model User {
  id                   String       @id @default(cuid())
  email                String       @unique
  password             String?
  isPro                Boolean      @default(false)
  stripeCustomerId     String?
  stripeSubscriptionId String?

  items                Item[]
  itemTypes            ItemType[]
  collections          Collection[]
  tags                 Tag[]

  createdAt            DateTime     @default(now())
  updatedAt            DateTime     @updatedAt
}

model Item {
  id           String       @id @default(cuid())
  title        String
  contentType  String       // "text" | "file"
  content      String?      // used for text-based types
  fileUrl      String?
  fileName     String?
  fileSize     Int?
  url          String?
  description  String?
  isFavorite   Boolean      @default(false)
  isPinned     Boolean      @default(false)
  language     String?      // programming language for syntax highlighting

  userId       String
  user         User         @relation(fields: [userId], references: [id])

  typeId       String
  type         ItemType     @relation(fields: [typeId], references: [id])

  collectionId String?
  collection   Collection?  @relation(fields: [collectionId], references: [id])

  tags         ItemTag[]

  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
}

model ItemType {
  id       String   @id @default(cuid())
  name     String
  icon     String?
  color    String?
  isSystem Boolean  @default(false) // true for built-in types

  userId   String?
  user     User?    @relation(fields: [userId], references: [id])

  items    Item[]
}

model Collection {
  id          String   @id @default(cuid())
  name        String
  description String?
  isFavorite  Boolean  @default(false)

  userId      String
  user        User     @relation(fields: [userId], references: [id])

  items       Item[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Tag {
  id     String    @id @default(cuid())
  name   String
  userId String
  user   User      @relation(fields: [userId], references: [id])

  items  ItemTag[]
}

model ItemTag {
  itemId String
  tagId  String

  item   Item @relation(fields: [itemId], references: [id])
  tag    Tag  @relation(fields: [tagId], references: [id])

  @@id([itemId, tagId])
}
```

### Entity Relationship Overview

```
User ──┬── 1:N ──→ Item
       ├── 1:N ──→ ItemType (custom types only; system types have no user)
       ├── 1:N ──→ Collection
       └── 1:N ──→ Tag

Item ──┬── N:1 ──→ ItemType
       ├── N:1 ──→ Collection (optional)
       └── M:N ──→ Tag (via ItemTag join table)
```

---

## 🧱 Tech Stack

| Category | Choice | Notes |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (React 19) | App Router, Server Components |
| **Language** | TypeScript | End-to-end type safety |
| **Database** | [Neon](https://neon.tech/) PostgreSQL + [Prisma](https://www.prisma.io/) ORM | Serverless Postgres |
| **Caching** | Redis | Optional, for search / session optimization |
| **File Storage** | [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) | S3-compatible, zero egress fees |
| **CSS / UI** | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Utility-first + accessible components |
| **Auth** | [NextAuth v5](https://authjs.dev/) | Email + GitHub providers |
| **AI** | [OpenAI](https://platform.openai.com/) `gpt-5-nano` | Auto-tag, summarize, explain, optimize |
| **Deployment** | [Vercel](https://vercel.com/) | Edge-optimized hosting |
| **Monitoring** | [Sentry](https://sentry.io/) | Runtime error tracking (later phase) |

---

## 🔌 Architecture

### API Flow

```
┌──────────┐       ┌──────────────┐       ┌──────────────┐
│  Client  │◄─────►│  Next.js API │──────►│   Neon DB     │
│ (React)  │       │   Routes     │──────►│  (Postgres)   │
└──────────┘       └──────┬───────┘       └──────────────┘
                          │
                ┌─────────┼──────────┐
                ▼         ▼          ▼
         ┌──────────┐ ┌────────┐ ┌────────┐
         │   R2     │ │ OpenAI │ │ Redis  │
         │ (Files)  │ │  (AI)  │ │(Cache) │
         └──────────┘ └────────┘ └────────┘
```

### Auth Flow

```
User → Login Page → NextAuth → Provider (Email / GitHub) → Session → App Access
```

### AI Feature Flow

```
Item Content → API Route → OpenAI gpt-5-nano → Suggestions (Tags / Summary / Explain) → UI Update
```

---

## 🔐 Authentication Details

- **Providers:** Email + Password, GitHub OAuth
- **Session strategy:** JWT (stateless, edge-compatible)
- **Library:** NextAuth v5 with Prisma adapter
- **Protected routes:** All `/dashboard/*` routes require authentication

---

## 💰 Monetization

| Plan | Price | Limits | Features |
|---|---|---|---|
| **Free** | $0 | 50 items, 3 collections | Basic search, image uploads, no AI |
| **Pro** | $8/mo or $72/yr | Unlimited | File uploads, custom types, AI features, export |

**Payment infrastructure:**
- [Stripe](https://stripe.com/) for subscriptions
- Webhooks for syncing subscription status
- `isPro`, `stripeCustomerId`, and `stripeSubscriptionId` fields on the `User` model

---

## 🎨 UI / UX

### Design Principles

- 🌙 **Dark mode first** — light mode secondary
- 🧹 **Minimal, developer-friendly** — inspired by Notion, Linear, and Raycast
- 🎨 **Syntax highlighting** for all code items
- ♿ **Accessible** — leveraging shadcn/ui component patterns

### Layout

- **Sidebar** — Collapsible, with filters, collections, and item type navigation
- **Main workspace** — Grid or list view for browsing items
- **Item editor** — Full-screen modal with markdown support

### Responsive

- 📱 Mobile drawer for the sidebar
- Touch-optimized icons and buttons
- Adaptive grid columns based on viewport width

---

## 🗂️ Development Workflow

### Branching Strategy

One branch per lesson (designed for a course format):

```bash
git switch -c lesson-01-setup
git switch -c lesson-02-auth
git switch -c lesson-03-items-crud
# ...
```

### Dev Tools

- **Cursor / Claude Code / ChatGPT** for AI-assisted development
- **Sentry** for runtime monitoring and error tracking
- **GitHub Actions** for CI (optional)

---

## 🧭 Roadmap

### Phase 1 — MVP

- [ ] Items CRUD (create, read, update, delete)
- [ ] Collections
- [ ] Full-text search
- [ ] Basic tag system
- [ ] Free tier with usage limits

### Phase 2 — Pro Features

- [ ] AI features (auto-tag, summarize, explain, optimize)
- [ ] Custom item types
- [ ] File uploads to Cloudflare R2
- [ ] Export (JSON / ZIP)
- [ ] Stripe billing and upgrade flow

### Phase 3 — Future Enhancements

- [ ] Shared collections (public links)
- [ ] Team / Org plans
- [ ] VS Code extension
- [ ] Browser extension
- [ ] Public API + CLI tool

---

## 📌 Current Status

> 🟡 **In Planning** — Ready for environment setup and UI scaffolding.

---

🏗️ **DevStash — Store Smarter. Build Faster.**
