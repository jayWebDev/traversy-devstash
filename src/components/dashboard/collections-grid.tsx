import { Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { collections, items, itemTypes } from "@/lib/mock-data";

function getCollectionTypeIcons(collectionId: string) {
  const collectionItems = items.filter((i) => i.collectionId === collectionId);
  const typeIds = [...new Set(collectionItems.map((i) => i.typeId))];
  return typeIds.map((tid) => {
    const type = itemTypes.find((t) => t.id === tid);
    return type ? { icon: type.icon, color: type.color } : null;
  }).filter(Boolean) as { icon: string; color: string }[];
}

export function CollectionsGrid() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Collections</h2>
        <button className="text-sm text-muted-foreground hover:text-foreground">
          View all
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => {
          const typeIcons = getCollectionTypeIcons(col.id);
          return (
            <Card
              key={col.id}
              size="sm"
              className="cursor-pointer border-teal-900/30 bg-teal-950/30 transition-colors hover:bg-teal-950/50"
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
                  {col.itemCount} items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-1">
                  {col.description}
                </p>
                {typeIcons.length > 0 && (
                  <div className="flex items-center gap-2">
                    {typeIcons.map((t, i) => (
                      <span key={i} className="text-sm" title={t.icon}>
                        {t.icon}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
