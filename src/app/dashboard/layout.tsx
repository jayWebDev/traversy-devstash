"use client";

import { useState } from "react";
import { Search, Plus, PanelLeft, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div
        className={`hidden border-r border-border transition-[width] duration-200 md:block ${
          sidebarOpen ? "w-56" : "w-0"
        } overflow-hidden`}
      >
        <DashboardSidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(false)}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DashboardSidebar
          open
          mobile
          onToggle={() => setMobileOpen(false)}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-14 items-center gap-3 border-b border-border px-4">
          {/* Sidebar toggle: show on mobile always, on desktop only when sidebar is closed */}
          <Button
            variant="ghost"
            size="icon-sm"
            className={sidebarOpen ? "md:hidden" : ""}
            onClick={() => {
              if (window.innerWidth < 768) {
                setMobileOpen(true);
              } else {
                setSidebarOpen(true);
              }
            }}
            aria-label="Open sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>

          <div className="relative ml-auto w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search items..." className="pl-9" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <FolderPlus className="mr-1 h-4 w-4" />
              New Collection
            </Button>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              New Item
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
