import { Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { items, itemTypes } from "@/lib/mock-data";

const recentItems = [...items]
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 10);

export function RecentItems() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Recent Items</h2>
      </div>
      <div className="space-y-2">
        {recentItems.map((item) => {
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
                  {item.isPinned && (
                    <Badge variant="outline" className="text-[10px]">
                      pinned
                    </Badge>
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
