const stats = [
  { label: "Artigos Publicados", value: "1,234", change: "+12%" },
  { label: "Pendentes Aprovação", value: "7", change: "-3" },
  { label: "Anúncios Pendentes", value: "0", change: "Nenhum" },
  { label: "Anunciantes Ativos", value: "0", change: "Novo" },
  { label: "Visitantes (mês)", value: "45.2k", change: "+8.1%" },
  { label: "Receita (mês)", value: "R$ 3.420", change: "+22%" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-paper-500">
        Visão geral do ThePaper
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-paper-200 bg-white p-5 dark:border-paper-800 dark:bg-paper-900"
          >
            <p className="text-sm text-paper-500 dark:text-paper-400">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-paper-900 dark:text-paper-50">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-accent-600">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}