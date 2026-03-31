export type ItemType = {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
  itemCount: number;
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Item = {
  id: string;
  title: string;
  description: string;
  contentType: "text" | "file";
  content: string;
  language?: string;
  url?: string;
  isFavorite: boolean;
  isPinned: boolean;
  typeId: string;
  collectionId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  isPro: boolean;
};

// Current logged-in user
export const currentUser: User = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  isPro: true,
};

// System item types
export const itemTypes: ItemType[] = [
  { id: "type_1", name: "Snippets", icon: "</>", color: "#3b82f6", isSystem: true, itemCount: 24 },
  { id: "type_2", name: "Prompts", icon: "🤖", color: "#a855f7", isSystem: true, itemCount: 18 },
  { id: "type_3", name: "Commands", icon: "⌨️", color: "#f97316", isSystem: true, itemCount: 15 },
  { id: "type_4", name: "Notes", icon: "📝", color: "#22c55e", isSystem: true, itemCount: 12 },
  { id: "type_5", name: "Files", icon: "📄", color: "#eab308", isSystem: true, itemCount: 5 },
  { id: "type_6", name: "Images", icon: "🖼️", color: "#ec4899", isSystem: true, itemCount: 3 },
  { id: "type_7", name: "Links", icon: "🔗", color: "#06b6d4", isSystem: true, itemCount: 8 },
];

// Collections
export const collections: Collection[] = [
  {
    id: "col_1",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-03-20T14:30:00Z",
  },
  {
    id: "col_2",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    createdAt: "2026-02-01T09:00:00Z",
    updatedAt: "2026-03-18T11:00:00Z",
  },
  {
    id: "col_3",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    createdAt: "2026-01-20T08:00:00Z",
    updatedAt: "2026-03-22T16:00:00Z",
  },
  {
    id: "col_4",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: true,
    itemCount: 24,
    createdAt: "2026-02-10T12:00:00Z",
    updatedAt: "2026-03-25T09:00:00Z",
  },
  {
    id: "col_5",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    createdAt: "2026-01-05T07:00:00Z",
    updatedAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "col_6",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    createdAt: "2026-02-20T14:00:00Z",
    updatedAt: "2026-03-28T08:00:00Z",
  },
];

// Items (representative set for dashboard display)
export const items: Item[] = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "text",
    content: `import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth().then(setUser).finally(() => setLoading(false));
  }, []);

  return { user, loading };
}`,
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    typeId: "type_1",
    collectionId: "col_1",
    tags: ["react", "auth", "hooks"],
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-03-16T14:00:00Z",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "text",
    content: `async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 2 ** i * 1000));
    }
  }
}`,
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    typeId: "type_1",
    collectionId: "col_1",
    tags: ["api", "error-handling", "fetch"],
    createdAt: "2026-02-15T09:00:00Z",
    updatedAt: "2026-03-18T11:00:00Z",
  },
  {
    id: "item_3",
    title: "Git Rebase Workflow",
    description: "Step-by-step interactive rebase commands",
    contentType: "text",
    content: `git fetch origin
git rebase -i origin/main
# squash, reword, or reorder commits
git push --force-with-lease`,
    language: "bash",
    isFavorite: false,
    isPinned: false,
    typeId: "type_3",
    collectionId: "col_5",
    tags: ["git", "rebase", "workflow"],
    createdAt: "2026-01-20T08:00:00Z",
    updatedAt: "2026-03-10T15:00:00Z",
  },
  {
    id: "item_4",
    title: "Code Review Prompt",
    description: "AI prompt for thorough code reviews",
    contentType: "text",
    content: `Review this code for bugs, security issues, and performance problems. Suggest improvements with explanations. Focus on edge cases and error handling.`,
    isFavorite: true,
    isPinned: false,
    typeId: "type_2",
    collectionId: "col_6",
    tags: ["ai", "code-review", "prompt"],
    createdAt: "2026-02-25T13:00:00Z",
    updatedAt: "2026-03-20T10:00:00Z",
  },
  {
    id: "item_5",
    title: "Python List Comprehension Cheatsheet",
    description: "Common list comprehension patterns in Python",
    contentType: "text",
    content: `# Filter and transform
result = [x * 2 for x in numbers if x > 0]

# Nested comprehension
flat = [x for row in matrix for x in row]

# Dictionary comprehension
counts = {word: len(word) for word in words}`,
    language: "python",
    isFavorite: false,
    isPinned: false,
    typeId: "type_1",
    collectionId: "col_2",
    tags: ["python", "list-comprehension", "cheatsheet"],
    createdAt: "2026-02-05T11:00:00Z",
    updatedAt: "2026-03-12T09:00:00Z",
  },
  {
    id: "item_6",
    title: "Docker Compose Basics",
    description: "Common docker compose commands for development",
    contentType: "text",
    content: `docker compose up -d
docker compose logs -f
docker compose down -v
docker compose exec app sh`,
    language: "bash",
    isFavorite: false,
    isPinned: false,
    typeId: "type_3",
    tags: ["docker", "devops", "commands"],
    createdAt: "2026-01-30T14:00:00Z",
    updatedAt: "2026-03-05T16:00:00Z",
  },
  {
    id: "item_7",
    title: "Zustand Store Pattern",
    description: "Minimal Zustand store with TypeScript",
    contentType: "text",
    content: `import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounter = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
}));`,
    language: "typescript",
    isFavorite: true,
    isPinned: false,
    typeId: "type_1",
    collectionId: "col_1",
    tags: ["zustand", "state-management", "react"],
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-22T12:00:00Z",
  },
  {
    id: "item_8",
    title: "System Design Interview Notes",
    description: "Key concepts for system design interviews",
    contentType: "text",
    content: `## Load Balancing
- Round robin, least connections, IP hash

## Caching
- Cache-aside, write-through, write-back

## Database
- Sharding, replication, CAP theorem`,
    isFavorite: false,
    isPinned: false,
    typeId: "type_4",
    collectionId: "col_4",
    tags: ["interview", "system-design", "notes"],
    createdAt: "2026-02-18T09:00:00Z",
    updatedAt: "2026-03-25T08:00:00Z",
  },
  {
    id: "item_9",
    title: "Next.js API Route Template",
    description: "Boilerplate for Next.js App Router API routes",
    contentType: "text",
    content: `import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const data = { message: 'Hello' };
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json(body, { status: 201 });
}`,
    language: "typescript",
    isFavorite: false,
    isPinned: false,
    typeId: "type_1",
    tags: ["nextjs", "api", "template"],
    createdAt: "2026-03-05T15:00:00Z",
    updatedAt: "2026-03-28T11:00:00Z",
  },
  {
    id: "item_10",
    title: "Tailwind CSS Cheatsheet",
    description: "Quick reference for common Tailwind utility classes",
    contentType: "text",
    content: `https://tailwindcss.com/docs`,
    url: "https://tailwindcss.com/docs",
    isFavorite: true,
    isPinned: false,
    typeId: "type_7",
    tags: ["tailwind", "css", "reference"],
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z",
  },
];
