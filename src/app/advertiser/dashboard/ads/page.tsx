import Link from "next/link";

export default function AdvertiserAdsPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
            Meus Anúncios
          </h1>
          <p className="mt-1 text-sm text-paper-500">
            Acompanhe o status das suas campanhas
          </p>
        </div>
        <Link
          href="/advertiser/dashboard/ads/new"
          className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-700"
        >
          + Novo Anúncio
        </Link>
      </div>

      <div className="rounded-xl border border-paper-200 bg-white p-8 text-center dark:border-paper-800 dark:bg-paper-900">
        <p className="text-sm text-paper-400">
          Nenhum anúncio criado ainda.
        </p>
        <Link
          href="/advertiser/dashboard/ads/new"
          className="mt-4 inline-block rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-700"
        >
          Criar primeiro anúncio
        </Link>
      </div>
    </div>
  );
}
