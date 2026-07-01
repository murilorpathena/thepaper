import Link from "next/link";

const categories = [
  { slug: "politica", label: "Política" },
  { slug: "tecnologia", label: "Tecnologia" },
  { slug: "economia", label: "Economia" },
  { slug: "esportes", label: "Esportes" },
  { slug: "entretenimento", label: "Entretenimento" },
  { slug: "saude", label: "Saúde" },
  { slug: "ciencia", label: "Ciência" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-paper-200 bg-white/90 backdrop-blur dark:border-paper-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-paper-900 dark:text-paper-50"
        >
          The<span className="text-accent-600">Paper</span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="text-sm font-medium text-paper-600 transition-colors hover:text-paper-900 dark:text-paper-400 dark:hover:text-paper-50"
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/ranking"
            className="text-sm text-paper-500 transition-colors hover:text-paper-700 dark:text-paper-400 dark:hover:text-paper-200"
          >
            Ranking
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-paper-300 px-4 py-1.5 text-sm font-medium transition-colors hover:border-paper-400 hover:bg-paper-50 dark:border-paper-700 dark:hover:border-paper-600 dark:hover:bg-paper-900"
          >
            Anuncie
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-accent-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-700"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}