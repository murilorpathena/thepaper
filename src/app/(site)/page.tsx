import { ArticleCard } from "@/components/article/article-card";
import { NewsletterSignup } from "@/components/newsletter/signup";

const MOCK_ARTICLES = [
  {
    $id: "1",
    title: "Nova descoberta científica promete revolucionar o tratamento de doenças crônicas",
    slug: "nova-descoberta-cientifica",
    summary: "Pesquisadores brasileiros desenvolvem técnica inovadora que pode reduzir custos de tratamento em até 60%.",
    content: "",
    bulletPoints: ["Técnica usa células-tronco modificadas", "Redução de 60% nos custos", "Testes em humanos começam em 2027"],
    category: "Ciência",
    tags: ["ciência", "saúde", "tecnologia"],
    source: "Science Daily",
    sourceUrl: "#",
    viralScore: 87,
    headlineAlternatives: [],
    status: "published" as const,
    isSponsored: false,
    seoMetaDescription: "",
    seoKeywords: [],
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 1234,
    readTimeMinutes: 4,
  },
  {
    $id: "2",
    title: "Mercado de tecnologia no Brasil: as tendências que vão dominar 2026",
    slug: "mercado-tech-brasil-2026",
    summary: "IA generativa, fintechs e cibersegurança lideram as contratações e investimentos no setor.",
    content: "",
    bulletPoints: ["IA generativa cresce 300% no país", "Fintechs captam R$ 5 bi no ano", "Salários sobem 25% em cibersegurança"],
    category: "Tecnologia",
    tags: ["tecnologia", "mercado", "carreira"],
    source: "TechCrunch",
    sourceUrl: "#",
    viralScore: 92,
    headlineAlternatives: [],
    status: "published" as const,
    isSponsored: false,
    seoMetaDescription: "",
    seoKeywords: [],
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 2891,
    readTimeMinutes: 6,
  },
  {
    $id: "3",
    title: "Como a reforma tributária impacta pequenos empreendedores",
    slug: "reforma-tributaria-pequenos-empreendedores",
    summary: "Entenda as principais mudanças e como se preparar para o novo sistema tributário brasileiro.",
    content: "",
    bulletPoints: ["Simplificação de 5 tributos em 1", "Alíquota única de 26.5%", "Simples Nacional permanece"],
    category: "Economia",
    tags: ["economia", "reforma tributária", "empreendedorismo"],
    source: "Valor Econômico",
    sourceUrl: "#",
    viralScore: 78,
    headlineAlternatives: [],
    status: "published" as const,
    isSponsored: false,
    seoMetaDescription: "",
    seoKeywords: [],
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 3456,
    readTimeMinutes: 5,
  },
  {
    $id: "4",
    title: "Seleção brasileira: novas convocações surpreendem torcida",
    slug: "selecao-brasileira-convocacoes",
    summary: "Técnico aposta em jovens promessas para os próximos amistosos internacionais.",
    content: "",
    bulletPoints: ["3 estreantes na lista", "Média de idade cai para 23 anos", "Amistosos na Europa em agosto"],
    category: "Esportes",
    tags: ["esportes", "futebol", "seleção"],
    source: "Globo Esporte",
    sourceUrl: "#",
    viralScore: 95,
    headlineAlternatives: [],
    status: "published" as const,
    isSponsored: false,
    seoMetaDescription: "",
    seoKeywords: [],
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 5678,
    readTimeMinutes: 3,
  },
  {
    $id: "5",
    title: "IA na medicina: diagnóstico por imagem atinge 99% de precisão",
    slug: "ia-medicina-diagnostico-imagem",
    summary: "Novo modelo de IA supera médicos radiologistas em detecção precoce de tumores.",
    content: "",
    bulletPoints: ["Precisão de 99.2% em testes", "Aprovação da Anvisa prevista para 2027", "Parceria com SUS em discussão"],
    category: "Saúde",
    tags: ["saúde", "IA", "medicina"],
    source: "Nature Medicine",
    sourceUrl: "#",
    viralScore: 91,
    headlineAlternatives: [],
    status: "published" as const,
    isSponsored: false,
    seoMetaDescription: "",
    seoKeywords: [],
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    viewCount: 2109,
    readTimeMinutes: 5,
  },
];

export default function HomePage() {
  const [featured, ...rest] = MOCK_ARTICLES;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-10">
        <ArticleCard article={featured} variant="featured" />
      </section>

      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-xl font-bold text-paper-900 dark:text-paper-50">
          Últimas Notícias
        </h2>
        <div className="flex gap-2 text-sm text-paper-400">
          <span className="text-accent-600 font-medium">Todas</span>
        </div>
      </div>

      <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.slice(0, 3).map((article) => (
          <ArticleCard key={article.$id} article={article} />
        ))}
      </div>

      <div className="mb-10 border-t border-paper-200 pt-10 dark:border-paper-800">
        <h2 className="mb-6 text-xl font-bold text-paper-900 dark:text-paper-50">
          Mais Lidas
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {rest.map((article) => (
            <ArticleCard key={article.$id} article={article} variant="compact" />
          ))}
        </div>
      </div>

      <NewsletterSignup />
    </div>
  );
}