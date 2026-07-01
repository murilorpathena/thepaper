const revenueSources = [
  { name: "EVADAV Push", thisMonth: 1240, lastMonth: 980, change: "+26%" },
  { name: "EVADAV Popunder", thisMonth: 680, lastMonth: 720, change: "-6%" },
  { name: "EVADAV Native", thisMonth: 890, lastMonth: 710, change: "+25%" },
  { name: "Google AdSense", thisMonth: 610, lastMonth: 550, change: "+11%" },
];

export default function ReceitaPage() {
  const totalThisMonth = revenueSources.reduce((s, r) => s + r.thisMonth, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
        Receita
      </h1>
      <p className="mt-1 text-sm text-paper-500">
        Relatório de ganhos do ThePaper.
      </p>

      <div className="mt-6 rounded-xl border border-paper-200 bg-white p-6 dark:border-paper-800 dark:bg-paper-900">
        <p className="text-sm text-paper-500">Receita total este mês</p>
        <p className="text-3xl font-bold text-paper-900 dark:text-paper-50">
          R$ {totalThisMonth.toFixed(2)}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {revenueSources.map((source) => (
          <div
            key={source.name}
            className="flex items-center justify-between rounded-xl border border-paper-200 bg-white p-4 dark:border-paper-800 dark:bg-paper-900"
          >
            <div>
              <p className="font-medium text-paper-900 dark:text-paper-50">{source.name}</p>
              <p className="text-xs text-paper-400">
                Mês passado: R$ {source.lastMonth.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-paper-900 dark:text-paper-50">
                R$ {source.thisMonth.toFixed(2)}
              </p>
              <p
                className={`text-xs ${
                  source.change.startsWith("+")
                    ? "text-accent-600"
                    : "text-red-500"
                }`}
              >
                {source.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}