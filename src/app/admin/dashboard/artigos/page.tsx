export default function ArtigosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
        Artigos
      </h1>
      <p className="mt-1 text-sm text-paper-500">
        Todos os artigos publicados, pendentes e rejeitados.
      </p>

      <div className="mt-6 space-y-3">
        <div className="rounded-xl border border-paper-200 bg-white p-4 text-center dark:border-paper-800 dark:bg-paper-900">
          <p className="text-sm text-paper-400">
            Nenhum artigo encontrado.
          </p>
        </div>
      </div>
    </div>
  );
}