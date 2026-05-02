import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { hexWithAlpha } from "@/lib/item-type-icons";
import { TypeIcon } from "@/components/dashboard/type-icon";
import type { ItemCard } from "@/lib/db/items";

export function ItemRow({
  item,
  showPinnedBadge = false,
}: {
  item: ItemCard;
  showPinnedBadge?: boolean;
}) {
  const accent = item.type.color;

  return (
    <div
      className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted/50"
      style={{
        borderLeftColor: accent ?? undefined,
        borderLeftWidth: accent ? 3 : undefined,
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
            style={{
              backgroundColor: hexWithAlpha(accent, 0.15),
              color: accent ?? undefined,
            }}
            title={item.type.name}
          >
            <TypeIcon name={item.type.icon} className="h-3 w-3" />
          </span>
          <h3 className="truncate text-sm font-medium">{item.title}</h3>
          <Badge variant="outline" className="text-[10px] capitalize">
            {item.type.name}
          </Badge>
          {item.isFavorite && (
            <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-500 text-yellow-500" />
          )}
          {showPinnedBadge && item.isPinned && (
            <Badge variant="outline" className="text-[10px]">
              pinned
            </Badge>
          )}
        </div>
        {item.description && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {item.description}
          </p>
        )}
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
        {item.updatedAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </span>
    </div>
  );
}
