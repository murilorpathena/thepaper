export default function AdvertiserBillingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
        Faturamento
      </h1>
      <p className="mt-1 text-sm text-paper-500">
        Histórico de pagamentos e faturas
      </p>

      <div className="mt-6 rounded-xl border border-paper-200 bg-white p-8 text-center dark:border-paper-800 dark:bg-paper-900">
        <p className="text-sm text-paper-400">
          Nenhum pagamento realizado ainda.
        </p>
        <p className="mt-2 text-xs text-paper-400">
          Os pagamentos aparecerão aqui após a aprovação dos seus anúncios.
        </p>
      </div>
    </div>
  );
}
