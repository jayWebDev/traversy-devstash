import {
  LayoutGrid,
  FolderOpen,
  Star,
  FolderHeart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { items, collections } from "@/lib/mock-data";

const stats = [
  {
    label: "Total Items",
    value: items.length,
    icon: LayoutGrid,
    color: "text-blue-500",
  },
  {
    label: "Collections",
    value: collections.length,
    icon: FolderOpen,
    color: "text-emerald-500",
  },
  {
    label: "Favorite Items",
    value: items.filter((i) => i.isFavorite).length,
    icon: Star,
    color: "text-yellow-500",
  },
  {
    label: "Favorite Collections",
    value: collections.filter((c) => c.isFavorite).length,
    icon: FolderHeart,
    color: "text-pink-500",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardContent className="flex items-center gap-3">
            <div className={`${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
