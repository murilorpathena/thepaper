import Link from "next/link";

const sidebarLinks = [
  { href: "/advertiser/dashboard", label: "Visão Geral", icon: "📊" },
  { href: "/advertiser/dashboard/ads", label: "Meus Anúncios", icon: "📢" },
  { href: "/advertiser/dashboard/billing", label: "Faturamento", icon: "💰" },
];

export default function AdvertiserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <aside className="hidden w-56 shrink-0 md:block">
        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-paper-600 transition-colors hover:bg-paper-100 hover:text-paper-900 dark:text-paper-400 dark:hover:bg-paper-800 dark:hover:text-paper-50"
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-paper-200 pt-6 dark:border-paper-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-paper-500 hover:text-paper-700 dark:hover:text-paper-300"
          >
            ← Ver site
          </Link>
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
