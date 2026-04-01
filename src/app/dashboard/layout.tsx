import { Search, Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      {/* Top Bar */}
      <header className="flex h-14 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">DevStash</span>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9"
          />
        </div>

        <Button size="sm">
          <Plus className="mr-1 h-4 w-4" />
          New Item
        </Button>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
