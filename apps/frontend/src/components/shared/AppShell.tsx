import Link from "next/link";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", enabled: true },
  { label: "Campaigns", href: "/campaign", enabled: false },
  { label: "Generator", href: "/generator", enabled: false },
  { label: "Analytics", href: "/analytics", enabled: false },
  { label: "Settings", href: "/settings", enabled: false },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <aside className="hidden w-56 shrink-0 border-r border-zinc-200 bg-white sm:block">
        <div className="px-5 py-5 text-lg font-semibold tracking-tight text-zinc-900">
          MarketCraftAI
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) =>
            item.enabled ? (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-900 bg-zinc-100"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.href}
                className="cursor-not-allowed rounded-lg px-3 py-2 text-sm font-medium text-zinc-400"
                title="Coming soon"
              >
                {item.label}
              </span>
            ),
          )}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="border-b border-zinc-200 bg-white px-6 py-4 sm:hidden">
          <span className="text-lg font-semibold tracking-tight text-zinc-900">MarketCraftAI</span>
        </header>
        <main className="flex-1 px-6 py-8 sm:px-10">{children}</main>
      </div>
    </div>
  );
}
