import { LayoutGrid, FolderOpen, Star, FolderHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/db/stats";

export async function StatsCards() {
  const stats = await getDashboardStats();
  const cards = [
    {
      label: "Total Items",
      value: stats.totalItems,
      icon: LayoutGrid,
      color: "text-blue-500",
    },
    {
      label: "Collections",
      value: stats.totalCollections,
      icon: FolderOpen,
      color: "text-emerald-500",
    },
    {
      label: "Favorite Items",
      value: stats.favoriteItems,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      label: "Favorite Collections",
      value: stats.favoriteCollections,
      icon: FolderHeart,
      color: "text-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardContent className="flex items-center gap-3">
            <div className={stat.color}>
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
