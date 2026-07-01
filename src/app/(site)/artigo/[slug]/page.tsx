import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

const MOCK_ARTICLE = {
  $id: "1",
  title: "Nova descoberta científica promete revolucionar o tratamento de doenças crônicas",
  slug: "nova-descoberta-cientifica",
  summary: "Pesquisadores brasileiros desenvolvem técnica inovadora que pode reduzir custos de tratamento em até 60%.",
  content: `Pesquisadores da Universidade de São Paulo (USP) anunciaram hoje uma descoberta que pode transformar o tratamento de doenças crônicas no Brasil e no mundo.

A técnica, baseada em células-tronco modificadas geneticamente, mostrou eficácia de 94% em testes laboratoriais para o tratamento de diabetes tipo 1 e artrite reumatoide.

"É um avanço significativo. Conseguimos reprogramar células do próprio paciente para combater a doença sem os efeitos colaterais dos tratamentos tradicionais", explica a Dra. Ana Silva, líder da pesquisa.

O estudo, publicado na revista Nature Medicine, detalha como as células modificadas são capazes de identificar e reparar tecidos danificados, reduzindo a necessidade de medicamentos contínuos.

A estimativa é que os primeiros testes em humanos comecem em 2027, após aprovação da Anvisa e do comitê de ética da universidade.

Para o Ministério da Saúde, a tecnologia pode gerar uma economia de até R$ 2 bilhões por ano no sistema público, além de melhorar a qualidade de vida de milhões de brasileiros.`,
  bulletPoints: [
    "Pesquisa da USP usa células-tronco modificadas",
    "Eficácia de 94% em testes laboratoriais",
    "Pode beneficiar diabetes tipo 1 e artrite reumatoide",
    "Testes em humanos começam em 2027",
    "Economia estimada de R$ 2 bilhões/ano para o SUS",
  ],
  category: "Ciência",
  tags: ["ciência", "saúde", "tecnologia", "usp"],
  source: "Science Daily",
  sourceUrl: "#",
  viralScore: 87,
  status: "published" as const,
  isSponsored: false,
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  viewCount: 1234,
  readTimeMinutes: 4,
  audioUrl: undefined,
  coverImage: undefined,
  headlineAlternatives: [],
  seoMetaDescription: "",
  seoKeywords: [],
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: MOCK_ARTICLE.title,
    description: MOCK_ARTICLE.summary,
    openGraph: {
      title: MOCK_ARTICLE.title,
      description: MOCK_ARTICLE.summary,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <Link
            href={`/categoria/${MOCK_ARTICLE.category.toLowerCase()}`}
            className="rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-800 dark:bg-accent-900 dark:text-accent-200"
          >
            {MOCK_ARTICLE.category}
          </Link>
          <span className="text-xs text-paper-400">
            {MOCK_ARTICLE.readTimeMinutes} min de leitura
          </span>
          {MOCK_ARTICLE.audioUrl && (
            <span className="text-xs text-paper-400">Com áudio</span>
          )}
        </div>

        <h1 className="text-3xl font-bold leading-tight tracking-tight text-paper-900 dark:text-paper-50 sm:text-4xl">
          {MOCK_ARTICLE.title}
        </h1>

        <p className="mt-4 text-lg text-paper-500 dark:text-paper-400">
          {MOCK_ARTICLE.summary}
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm text-paper-400">
          <span>Fonte: {MOCK_ARTICLE.source}</span>
          <span>&middot;</span>
          <span>{new Date(MOCK_ARTICLE.publishedAt!).toLocaleDateString("pt-BR")}</span>
        </div>
      </header>

      <section className="mb-8 rounded-lg bg-accent-50 p-4 dark:bg-accent-950">
        <h2 className="mb-2 text-sm font-semibold text-accent-800 dark:text-accent-200">
          Resumo rápido
        </h2>
        <ul className="space-y-1.5">
          {MOCK_ARTICLE.bulletPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-accent-700 dark:text-accent-300">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              {point}
            </li>
          ))}
        </ul>
      </section>

      <div className="prose prose-paper max-w-none dark:prose-invert">
        {MOCK_ARTICLE.content.split("\n").map((paragraph, i) => (
          <p key={i} className="mb-4 leading-relaxed text-paper-700 dark:text-paper-300">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {MOCK_ARTICLE.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-paper-100 px-3 py-1 text-xs text-paper-600 dark:bg-paper-800 dark:text-paper-400"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}