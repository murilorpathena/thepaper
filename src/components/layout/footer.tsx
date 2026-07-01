import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-paper-200 bg-paper-50 dark:border-paper-800 dark:bg-paper-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-paper-900 dark:text-paper-50">
              The<span className="text-accent-600">Paper</span>
            </h3>
            <p className="mt-2 text-sm text-paper-500 dark:text-paper-400">
              Onde IA descobre, você decide, o mundo lê.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-paper-700 dark:text-paper-300">
              Categorias
            </h4>
            <ul className="space-y-2 text-sm text-paper-500 dark:text-paper-400">
              {["Política", "Tecnologia", "Economia", "Esportes", "Entretenimento", "Saúde", "Ciência"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categoria/${cat.toLowerCase()}`}
                    className="transition-colors hover:text-paper-700 dark:hover:text-paper-200"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-paper-700 dark:text-paper-300">
              ThePaper
            </h4>
            <ul className="space-y-2 text-sm text-paper-500 dark:text-paper-400">
              <li>
                <Link href="/ranking" className="transition-colors hover:text-paper-700 dark:hover:text-paper-200">
                  Ranking
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="transition-colors hover:text-paper-700 dark:hover:text-paper-200">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-paper-700 dark:text-paper-300">
              Anuncie Conosco
            </h4>
            <p className="text-sm text-paper-500 dark:text-paper-400">
              Banners patrocinados e notícias publi.
              <br />
              <a
                href="mailto:comercial@thepaper.com"
                className="text-accent-600 hover:underline"
              >
                comercial@thepaper.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-paper-200 pt-6 text-center text-xs text-paper-400 dark:border-paper-800 dark:text-paper-500">
          &copy; {new Date().getFullYear()} ThePaper. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}