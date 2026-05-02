import { Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getRecentCollections } from "@/lib/db/collections";
import { getTypeIcon, hexWithAlpha } from "@/lib/item-type-icons";

export async function CollectionsGrid() {
  const collections = await getRecentCollections(6);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Collections</h2>
        <button className="text-sm text-muted-foreground hover:text-foreground">
          View all
        </button>
      </div>
      {collections.length === 0 ? (
        <p className="text-sm text-muted-foreground">No collections yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col) => {
            const accent = col.primaryType?.color ?? null;
            const ringColor = hexWithAlpha(accent, 0.35);
            const bgColor = hexWithAlpha(accent, 0.08);
            return (
              <Card
                key={col.id}
                size="sm"
                className="cursor-pointer ring-0 transition-colors hover:brightness-110"
                style={{
                  boxShadow: ringColor
                    ? `inset 0 0 0 1px ${ringColor}`
                    : undefined,
                  backgroundColor: bgColor,
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {col.name}
                      {col.isFavorite && (
                        <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                      )}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {col.itemCount} {col.itemCount === 1 ? "item" : "items"}
                    {col.types.length > 0 && (
                      <>
                        {" · "}
                        {col.types.length}{" "}
                        {col.types.length === 1 ? "type" : "types"}
                      </>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {col.description && (
                    <p className="mb-3 line-clamp-1 text-sm text-muted-foreground">
                      {col.description}
                    </p>
                  )}
                  {col.types.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      {col.types.map((t) => {
                        const Icon = getTypeIcon(t.icon);
                        return (
                          <span
                            key={t.id}
                            title={`${t.name} (${t.count})`}
                            className="inline-flex h-6 w-6 items-center justify-center rounded-md"
                            style={{
                              backgroundColor: hexWithAlpha(t.color, 0.15),
                              color: t.color ?? undefined,
                            }}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
