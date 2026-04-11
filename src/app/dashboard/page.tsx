import { StatsCards } from "@/components/dashboard/stats-cards";
import { CollectionsGrid } from "@/components/dashboard/collections-grid";
import { PinnedItems } from "@/components/dashboard/pinned-items";
import { RecentItems } from "@/components/dashboard/recent-items";

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Your developer knowledge hub
        </p>
      </div>

      <div className="space-y-8">
        <StatsCards />
        <CollectionsGrid />
        <PinnedItems />
        <RecentItems />
      </div>
    </main>
  );
}
