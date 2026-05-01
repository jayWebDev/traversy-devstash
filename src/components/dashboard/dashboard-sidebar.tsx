"use client";

import Link from "next/link";
import {
  Star,
  Settings,
  ChevronDown,
  ChevronRight,
  PanelLeft,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { itemTypes, collections, currentUser } from "@/lib/mock-data";

const favoriteCollections = collections.filter((c) => c.isFavorite);
const otherCollections = collections.filter((c) => !c.isFavorite);

export function DashboardSidebar({
  open,
  onToggle,
  onClose,
  mobile = false,
}: {
  open: boolean;
  onToggle: () => void;
  onClose?: () => void;
  mobile?: boolean;
}) {
  if (!open && !mobile) return null;

  return (
    <aside
      className={`flex h-full flex-col bg-sidebar text-sidebar-foreground ${
        mobile ? "w-64" : "w-56"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={mobile ? onClose : onToggle}
          aria-label={mobile ? "Close sidebar" : "Toggle sidebar"}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <LayoutGrid className="h-5 w-5 text-primary" />
        <span className="text-lg font-semibold">DevStash</span>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {/* Types */}
        <div className="mb-6">
          <h3 className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Types
          </h3>
          <nav className="space-y-0.5">
            {itemTypes.map((type) => (
              <Link
                key={type.id}
                href={`/items/${type.name.toLowerCase()}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent"
                onClick={onClose}
              >
                <span className="flex items-center gap-2">
                  <span className="w-5 text-center text-sm">{type.icon}</span>
                  <span>{type.name}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {type.itemCount}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Collections */}
        <div>
          <div className="mb-2 flex items-center justify-between px-2">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Collections
            </h3>
          </div>

          {/* Favorites */}
          <div className="mb-3">
            <h4 className="mb-1 flex items-center gap-1 px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              <Star className="h-3 w-3" />
              Favorites
            </h4>
            <nav className="space-y-0.5">
              {favoriteCollections.map((col) => (
                <Link
                  key={col.id}
                  href="#"
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent"
                  onClick={onClose}
                >
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  <span>{col.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* All Collections */}
          <div>
            <h4 className="mb-1 px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              All Collections
            </h4>
            <nav className="space-y-0.5">
              {otherCollections.map((col) => (
                <Link
                  key={col.id}
                  href="#"
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent"
                  onClick={onClose}
                >
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    <span>{col.name}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {col.itemCount}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* User Area */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {currentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{currentUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
