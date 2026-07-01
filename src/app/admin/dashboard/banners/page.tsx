export default function BannersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
        Banners Patrocinados
      </h1>
      <p className="mt-1 text-sm text-paper-500">
        Gerencie banners de anunciantes diretos.
      </p>

      <div className="mt-6 rounded-xl border border-paper-200 bg-white p-6 dark:border-paper-800 dark:bg-paper-900">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-paper-200 dark:border-paper-800">
              <th className="pb-3 font-medium text-paper-500">Anunciante</th>
              <th className="pb-3 font-medium text-paper-500">Período</th>
              <th className="pb-3 font-medium text-paper-500">Valor</th>
              <th className="pb-3 font-medium text-paper-500">Status</th>
              <th className="pb-3 font-medium text-paper-500">Impressões</th>
            </tr>
          </thead>
          <tbody className="text-paper-600 dark:text-paper-400">
            <tr>
              <td colSpan={5} className="pt-8 text-center text-sm text-paper-400">
                Nenhum banner ativo no momento.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="mt-4 rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-700">
        + Novo Banner
      </button>
    </div>
  );
}