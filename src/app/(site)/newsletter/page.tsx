import { Metadata } from "next";
import { NewsletterSignup } from "@/components/newsletter/signup";

export const metadata: Metadata = {
  title: "Newsletter",
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-paper-900 dark:text-paper-50">
          ThePaper Weekly
        </h1>
        <p className="mt-2 text-paper-500">
          Toda semana, as notícias mais importantes selecionadas por IA e curadas por humanos.
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-xl border border-paper-200 bg-white p-6 dark:border-paper-800 dark:bg-paper-900">
          <h2 className="font-semibold text-paper-900 dark:text-paper-50">
            O que você recebe
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-paper-500">
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              Resumo semanal com as 10 notícias mais importantes
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              Análise editorial exclusiva (escrita por humanos)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              Dica de leitura: 1 artigo em destaque comentado
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              Seção &quot;O que vem por aí&quot; com tendências da semana
            </li>
          </ul>
        </section>

        <NewsletterSignup />
      </div>
    </div>
  );
}