import { prisma } from "@/lib/prisma";

const DEMO_USER_EMAIL = "demo@devstash.io";

export type CollectionTypeSummary = {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  count: number;
};

export type CollectionCard = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  types: CollectionTypeSummary[];
  primaryType: CollectionTypeSummary | null;
};

export async function getRecentCollections(limit = 6): Promise<CollectionCard[]> {
  const user = await prisma.user.findUnique({ where: { email: DEMO_USER_EMAIL } });
  if (!user) return [];

  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: {
      items: {
        select: {
          type: { select: { id: true, name: true, icon: true, color: true } },
        },
      },
    },
  });

  return collections.map((c) => {
    const counts = new Map<string, CollectionTypeSummary>();
    for (const item of c.items) {
      const existing = counts.get(item.type.id);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(item.type.id, { ...item.type, count: 1 });
      }
    }
    const types = [...counts.values()].sort((a, b) => b.count - a.count);
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      isFavorite: c.isFavorite,
      itemCount: c.items.length,
      types,
      primaryType: types[0] ?? null,
    };
  });
}
