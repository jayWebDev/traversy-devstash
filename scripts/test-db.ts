import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
  console.log("Testing database connection...");

  await prisma.$connect();
  console.log("✓ Connected");

  const userCount = await prisma.user.count();
  const itemCount = await prisma.item.count();
  const collectionCount = await prisma.collection.count();

  console.log(`Users: ${userCount}`);
  console.log(`Items: ${itemCount}`);
  console.log(`Collections: ${collectionCount}`);
}

main()
  .catch((err) => {
    console.error("✗ Database test failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
