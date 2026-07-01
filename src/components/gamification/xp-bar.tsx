export function XPBar({ current, max }: { current: number; max: number }) {
  const pct = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs text-paper-500">
        <span>{current.toLocaleString()} XP</span>
        <span>{max.toLocaleString()} XP</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-paper-200 dark:bg-paper-800">
        <div
          className="h-full rounded-full bg-accent-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}