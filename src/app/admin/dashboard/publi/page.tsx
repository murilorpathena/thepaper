export default function PubliPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
        Notícias Publi
      </h1>
      <p className="mt-1 text-sm text-paper-500">
        Conteúdo patrocinado por empresas. A IA redige, você aprova.
      </p>

      <div className="mt-6 space-y-4">
        <div className="rounded-xl border border-dashed border-paper-300 p-8 text-center dark:border-paper-700">
          <p className="text-sm text-paper-400">
            Nenhuma publi ativa. Crie uma nova publi para um cliente.
          </p>
          <button className="mt-4 rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-700">
            + Nova Publi
          </button>
        </div>

        <details className="rounded-xl border border-paper-200 bg-white p-4 dark:border-paper-800 dark:bg-paper-900">
          <summary className="cursor-pointer text-sm font-medium text-paper-700 dark:text-paper-300">
            Como funciona?
          </summary>
          <div className="mt-3 space-y-2 text-sm text-paper-500">
            <p>1. Cliente envia briefing com tema e links de referência</p>
            <p>2. IA redige a notícia publi com tom editorial do ThePaper</p>
            <p>3. Você revisa e aprova (ou pede ajustes)</p>
            <p>4. Publicado com tag &quot;Patrocinado&quot; visível</p>
          </div>
        </details>
      </div>
    </div>
  );
}