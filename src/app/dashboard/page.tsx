export default function DashboardPage() {
  return (
    <>
      {/* Sidebar */}
      <aside className="flex w-56 flex-col border-r border-border p-4">
        <h2 className="text-lg font-semibold">Sidebar</h2>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-lg font-semibold">Main</h2>
      </main>
    </>
  );
}
