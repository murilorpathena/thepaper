export default function AdminAnunciantesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
        Anunciantes
      </h1>
      <p className="mt-1 text-sm text-paper-500">
        Gerencie os anunciantes cadastrados na plataforma
      </p>

      <div className="mt-6 rounded-xl border border-paper-200 bg-white p-6 dark:border-paper-800 dark:bg-paper-900">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-paper-200 dark:border-paper-800">
              <th className="pb-3 font-medium text-paper-500">Nome</th>
              <th className="pb-3 font-medium text-paper-500">CPF/CNPJ</th>
              <th className="pb-3 font-medium text-paper-500">Empresa</th>
              <th className="pb-3 font-medium text-paper-500">Total Gasto</th>
              <th className="pb-3 font-medium text-paper-500">Status</th>
            </tr>
          </thead>
          <tbody className="text-paper-600 dark:text-paper-400">
            <tr>
              <td colSpan={5} className="pt-8 text-center text-sm text-paper-400">
                Nenhum anunciante cadastrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
