import { Pin } from "lucide-react";
import { getPinnedItems } from "@/lib/db/items";
import { ItemRow } from "@/components/dashboard/item-row";

export async function PinnedItems() {
  const pinnedItems = await getPinnedItems();
  if (pinnedItems.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Pin className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Pinned</h2>
      </div>
      <div className="space-y-2">
        {pinnedItems.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
