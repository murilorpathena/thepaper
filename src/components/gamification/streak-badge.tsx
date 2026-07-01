export function StreakBadge({ streak }: { streak: number }) {
  const levels = [
    { min: 0, emoji: "🌱", label: "Iniciando" },
    { min: 3, emoji: "🔥", label: "Aquecendo" },
    { min: 7, emoji: "⚡", label: "Comprometido" },
    { min: 30, emoji: "💪", label: "Veterano" },
    { min: 90, emoji: "🏆", label: "Lendário" },
  ];

  const current = [...levels].reverse().find((l) => streak >= l.min);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-800 dark:bg-amber-950">
      <span className="text-lg">{current?.emoji ?? "🌱"}</span>
      <div>
        <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
          {streak} dias seguidos
        </p>
        <p className="text-xs text-amber-600 dark:text-amber-400">
          {current?.label ?? "Iniciando"}
        </p>
      </div>
    </div>
  );
}