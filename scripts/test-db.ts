import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
  console.log("Testing database connection...");
  await prisma.$connect();
  console.log("✓ Connected\n");

  const [userCount, itemCount, collectionCount, typeCount] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.itemType.count(),
  ]);
  console.log("Counts");
  console.log(`  Users:        ${userCount}`);
  console.log(`  Item types:   ${typeCount}`);
  console.log(`  Collections:  ${collectionCount}`);
  console.log(`  Items:        ${itemCount}\n`);

  const demo = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
    include: {
      collections: {
        orderBy: { name: "asc" },
        include: {
          items: {
            orderBy: { title: "asc" },
            include: { type: true },
          },
        },
      },
    },
  });

  if (!demo) {
    console.warn("⚠ demo@devstash.io not found — run `npm run db:seed`.");
    return;
  }

  console.log(`Demo user: ${demo.name} <${demo.email}>`);
  console.log(`  isPro:         ${demo.isPro}`);
  console.log(`  emailVerified: ${demo.emailVerified?.toISOString() ?? "—"}`);
  console.log(`  passwordHash:  ${demo.password ? "✓ set" : "✗ missing"}\n`);

  const systemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });
  console.log(`System item types (${systemTypes.length}):`);
  for (const t of systemTypes) {
    console.log(`  - ${t.name.padEnd(8)} ${t.icon?.padEnd(11) ?? ""} ${t.color ?? ""}`);
  }
  console.log();

  console.log(`Collections (${demo.collections.length}):`);
  for (const c of demo.collections) {
    console.log(`  ▸ ${c.name} — ${c.items.length} items`);
    for (const it of c.items) {
      const tag = it.type.name;
      const detail = it.url ?? (it.content ? `${it.content.slice(0, 50).replace(/\n/g, " ")}…` : "");
      console.log(`      [${tag}] ${it.title}${detail ? ` — ${detail}` : ""}`);
    }
  }

  const expectedTypes = 7;
  const expectedCollections = 5;
  const expectedItems = 18;
  const ok =
    systemTypes.length === expectedTypes &&
    demo.collections.length === expectedCollections &&
    demo.collections.reduce((n, c) => n + c.items.length, 0) === expectedItems;

  console.log(`\n${ok ? "✓ All seed data present." : "✗ Seed data does not match expected counts."}`);
  if (!ok) process.exitCode = 1;
}

main()
  .catch((err) => {
    console.error("✗ Database test failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
