import Link from "next/link";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Visão Geral", icon: "📊" },
  { href: "/admin/dashboard/aprovacao", label: "Aprovação", icon: "✅" },
  { href: "/admin/dashboard/artigos", label: "Artigos", icon: "📝" },
  { href: "/admin/dashboard/banners", label: "Banners", icon: "🖼️" },
  { href: "/admin/dashboard/publi", label: "Publi", icon: "📰" },
  { href: "/admin/dashboard/receita", label: "Receita", icon: "💰" },
];

export default function AdminDashboardLayout({
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
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}