import { Pin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { items, itemTypes } from "@/lib/mock-data";

const pinnedItems = items.filter((i) => i.isPinned);

export function PinnedItems() {
  if (pinnedItems.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Pin className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Pinned</h2>
      </div>
      <div className="space-y-2">
        {pinnedItems.map((item) => {
          const type = itemTypes.find((t) => t.id === item.typeId);
          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-medium">{item.title}</h3>
                  {type && (
                    <span className="text-sm">{type.icon}</span>
                  )}
                  {item.isFavorite && (
                    <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-500 text-yellow-500" />
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {item.description}
                </p>
                {item.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <span className="ml-4 shrink-0 text-xs text-muted-foreground">
                {new Date(item.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
