import { Clock } from "lucide-react";
import { getRecentItems } from "@/lib/db/items";
import { ItemRow } from "@/components/dashboard/item-row";

export async function RecentItems() {
  const recentItems = await getRecentItems(10);

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Recent Items</h2>
      </div>
      {recentItems.length === 0 ? (
        <p className="text-sm text-muted-foreground">No items yet.</p>
      ) : (
        <div className="space-y-2">
          {recentItems.map((item) => (
            <ItemRow key={item.id} item={item} showPinnedBadge />
          ))}
        </div>
      )}
    </section>
  );
}
