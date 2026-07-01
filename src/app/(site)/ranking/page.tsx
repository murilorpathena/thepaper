import type { Metadata } from "next";

const MOCK_RANKING = [
  { position: 1, name: "LeitorVoraz_99", xp: 15240, badges: 12, streak: 45 },
  { position: 2, name: "NoticiaTodoDia", xp: 13210, badges: 10, streak: 38 },
  { position: 3, name: "Curioso_Brasil", xp: 11890, badges: 9, streak: 30 },
  { position: 4, name: "LeitorAssiduo", xp: 10230, badges: 8, streak: 25 },
  { position: 5, name: "PaperLover", xp: 9870, badges: 7, streak: 22 },
];

export const metadata: Metadata = {
  title: "Ranking",
};

export default function RankingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-2xl font-bold text-paper-900 dark:text-paper-50">
        Ranking de Leitores
      </h1>
      <p className="mb-8 text-sm text-paper-500">
        Os leitores mais engajados da semana. Leia, comente e compartilhe para subir no ranking.
      </p>

      <div className="space-y-3">
        {MOCK_RANKING.map((reader) => (
          <div
            key={reader.position}
            className="flex items-center gap-4 rounded-xl border border-paper-200 bg-white p-4 dark:border-paper-800 dark:bg-paper-900"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                reader.position === 1
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                  : reader.position === 2
                    ? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                    : reader.position === 3
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                      : "bg-paper-100 text-paper-500 dark:bg-paper-800 dark:text-paper-400"
              }`}
            >
              {reader.position}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-paper-900 dark:text-paper-50">
                {reader.name}
              </p>
              <p className="text-xs text-paper-400">
                {reader.badges} badges &middot; {reader.streak} dias seguidos
              </p>
            </div>
            <span className="text-sm font-bold text-accent-600">
              {reader.xp.toLocaleString()} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}