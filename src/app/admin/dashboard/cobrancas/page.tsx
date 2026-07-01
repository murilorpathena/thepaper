export default function AdminCobrancasPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
        Cobranças
      </h1>
      <p className="mt-1 text-sm text-paper-500">
        Histórico de pagamentos de anúncios
      </p>

      <div className="mt-6 rounded-xl border border-paper-200 bg-white p-6 dark:border-paper-800 dark:bg-paper-900">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-paper-200 dark:border-paper-800">
              <th className="pb-3 font-medium text-paper-500">Anunciante</th>
              <th className="pb-3 font-medium text-paper-500">Anúncio</th>
              <th className="pb-3 font-medium text-paper-500">Valor</th>
              <th className="pb-3 font-medium text-paper-500">Status</th>
              <th className="pb-3 font-medium text-paper-500">Data</th>
            </tr>
          </thead>
          <tbody className="text-paper-600 dark:text-paper-400">
            <tr>
              <td colSpan={5} className="pt-8 text-center text-sm text-paper-400">
                Nenhuma cobrança registrada.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
