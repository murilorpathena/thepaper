import Link from "next/link";
import { AD_FORMATS } from "@/types/advertiser";
import { formatPriceCents } from "@/lib/stripe/client";

const stats = [
  { label: "Anúncios Ativos", value: "0", change: "Crie seu primeiro" },
  { label: "Total Gasto", value: "R$ 0,00", change: "Nenhum pagamento" },
  { label: "Impressões (mês)", value: "0", change: "Aguardando campanhas" },
  { label: "Cliques (mês)", value: "0", change: "Aguardando campanhas" },
];

export default function AdvertiserDashboard() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
            Painel do Anunciante
          </h1>
          <p className="mt-1 text-sm text-paper-500">
            Gerencie seus anúncios e campanhas
          </p>
        </div>
        <Link
          href="/advertiser/dashboard/ads/new"
          className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-700"
        >
          + Novo Anúncio
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-paper-200 bg-white p-5 dark:border-paper-800 dark:bg-paper-900"
          >
            <p className="text-sm text-paper-500 dark:text-paper-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-paper-900 dark:text-paper-50">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-paper-400">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold text-paper-900 dark:text-paper-50">
          Formatos de Anúncio
        </h2>
        <p className="mt-1 text-sm text-paper-500">
          Escolha o formato ideal para sua campanha
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AD_FORMATS.map((fmt) => (
            <div
              key={fmt.id}
              className="rounded-xl border border-paper-200 bg-white p-5 dark:border-paper-800 dark:bg-paper-900"
            >
              <h3 className="font-semibold text-paper-900 dark:text-paper-50">
                {fmt.name}
              </h3>
              <p className="mt-1 text-xs text-paper-400">{fmt.description}</p>
              <p className="mt-3 text-lg font-bold text-accent-600">
                {formatPriceCents(fmt.priceCents)}
              </p>
              <Link
                href={`/advertiser/dashboard/ads/new?format=${fmt.id}`}
                className="mt-3 inline-block rounded-lg border border-accent-300 px-3 py-1.5 text-xs font-medium text-accent-700 transition-colors hover:bg-accent-50 dark:border-accent-800 dark:text-accent-300"
              >
                Anunciar neste formato
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
