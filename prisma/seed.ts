import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SYSTEM_TYPES = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
] as const;

async function main() {
  console.log("🌱 Seeding database...");

  const passwordHash = await bcrypt.hash("12345678", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: {
      email: "demo@devstash.io",
      name: "Demo User",
      password: passwordHash,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`✓ User: ${user.email}`);

  const types: Record<string, string> = {};
  for (const t of SYSTEM_TYPES) {
    const existing = await prisma.itemType.findFirst({
      where: { userId: null, name: t.name, isSystem: true },
    });
    const type = existing
      ? await prisma.itemType.update({
          where: { id: existing.id },
          data: { icon: t.icon, color: t.color },
        })
      : await prisma.itemType.create({
          data: { ...t, isSystem: true },
        });
    types[t.name] = type.id;
  }
  console.log(`✓ System item types: ${Object.keys(types).length}`);

  type ItemSeed = {
    title: string;
    type: keyof typeof types;
    content?: string;
    url?: string;
    description?: string;
    language?: string;
  };

  const collections: Array<{
    name: string;
    description: string;
    items: ItemSeed[];
  }> = [
    {
      name: "React Patterns",
      description: "Reusable React patterns and hooks",
      items: [
        {
          title: "useDebounce hook",
          type: "snippet",
          language: "typescript",
          description: "Debounce a rapidly-changing value",
          content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}`,
        },
        {
          title: "Theme context provider",
          type: "snippet",
          language: "typescript",
          description: "Compound context provider with typed hook",
          content: `import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}`,
        },
        {
          title: "cn() classname utility",
          type: "snippet",
          language: "typescript",
          description: "Merge Tailwind classes with clsx + tailwind-merge",
          content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
        },
      ],
    },
    {
      name: "AI Workflows",
      description: "AI prompts and workflow automations",
      items: [
        {
          title: "Code review prompt",
          type: "prompt",
          description: "Thorough PR review covering correctness, style, and tests",
          content: `You are a senior engineer reviewing a pull request. For each file, identify:
1. Correctness bugs and edge cases
2. Performance and security concerns
3. Style and naming consistency with the surrounding codebase
4. Missing tests

Return findings as a markdown checklist grouped by severity.`,
        },
        {
          title: "Documentation generator",
          type: "prompt",
          description: "Generate JSDoc/TSDoc from a function signature",
          content: `Given the following TypeScript function, write a TSDoc comment that describes:
- A one-line summary
- Each parameter (@param) with type and meaning
- The return value (@returns)
- Any thrown errors (@throws)
- One usage @example

Function:
{{function}}`,
        },
        {
          title: "Refactoring assistant",
          type: "prompt",
          description: "Suggest refactors without changing behavior",
          content: `Refactor the code below for readability and maintainability without changing observable behavior. Prefer:
- Smaller, named functions over deep nesting
- Early returns over else branches
- Descriptive names over comments

Output only the refactored code plus a short bullet list of what changed and why.

Code:
{{code}}`,
        },
      ],
    },
    {
      name: "DevOps",
      description: "Infrastructure and deployment resources",
      items: [
        {
          title: "Multi-stage Node Dockerfile",
          type: "snippet",
          language: "dockerfile",
          description: "Production-ready Node.js image with build/runtime split",
          content: `# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]`,
        },
        {
          title: "Deploy to Vercel (CLI)",
          type: "command",
          description: "Production deploy from a clean working tree",
          content: "vercel deploy --prod --yes",
        },
        {
          title: "GitHub Actions docs",
          type: "link",
          url: "https://docs.github.com/en/actions",
          description: "Official GitHub Actions documentation",
        },
        {
          title: "Vercel deployment docs",
          type: "link",
          url: "https://vercel.com/docs/deployments/overview",
          description: "Vercel deployment reference",
        },
      ],
    },
    {
      name: "Terminal Commands",
      description: "Useful shell commands for everyday development",
      items: [
        {
          title: "Undo last commit, keep changes",
          type: "command",
          description: "Soft reset to HEAD~1",
          content: "git reset --soft HEAD~1",
        },
        {
          title: "Stop and remove all Docker containers",
          type: "command",
          description: "Useful for cleaning up a dev environment",
          content: "docker ps -aq | xargs -r docker rm -f",
        },
        {
          title: "Kill process on port",
          type: "command",
          description: "Free up a port held by a stuck dev server (macOS/Linux)",
          content: "lsof -ti:3000 | xargs -r kill -9",
        },
        {
          title: "Update all npm dependencies",
          type: "command",
          description: "Interactively upgrade with npm-check-updates",
          content: "npx npm-check-updates -i && npm install",
        },
      ],
    },
    {
      name: "Design Resources",
      description: "UI/UX resources and references",
      items: [
        {
          title: "Tailwind CSS docs",
          type: "link",
          url: "https://tailwindcss.com/docs",
          description: "Utility-first CSS framework reference",
        },
        {
          title: "shadcn/ui",
          type: "link",
          url: "https://ui.shadcn.com",
          description: "Copy-paste component library built on Radix",
        },
        {
          title: "Refactoring UI",
          type: "link",
          url: "https://www.refactoringui.com",
          description: "Practical UI design tips for developers",
        },
        {
          title: "Lucide icons",
          type: "link",
          url: "https://lucide.dev",
          description: "Open-source icon library used in the app",
        },
      ],
    },
  ];

  let itemTotal = 0;
  for (const c of collections) {
    const collection = await prisma.collection.upsert({
      where: { userId_name: { userId: user.id, name: c.name } },
      update: { description: c.description },
      create: { userId: user.id, name: c.name, description: c.description },
    });

    for (const it of c.items) {
      const existing = await prisma.item.findFirst({
        where: { userId: user.id, collectionId: collection.id, title: it.title },
      });
      const data = {
        title: it.title,
        contentType: it.url ? "link" : "text",
        content: it.content ?? null,
        url: it.url ?? null,
        description: it.description ?? null,
        language: it.language ?? null,
        userId: user.id,
        typeId: types[it.type],
        collectionId: collection.id,
      };
      if (existing) {
        await prisma.item.update({ where: { id: existing.id }, data });
      } else {
        await prisma.item.create({ data });
      }
      itemTotal++;
    }
    console.log(`✓ Collection: ${c.name} (${c.items.length} items)`);
  }

  console.log(`\n🌱 Done. ${collections.length} collections, ${itemTotal} items.`);
}

main()
  .catch((err) => {
    console.error("✗ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
