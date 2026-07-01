interface BadgeDisplayProps {
  name: string;
  icon: string;
  description: string;
  unlocked?: boolean;
}

export function BadgeDisplay({ name, icon, description, unlocked = true }: BadgeDisplayProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 rounded-xl border p-4 text-center transition-all ${
        unlocked
          ? "border-paper-200 bg-white dark:border-paper-800 dark:bg-paper-900"
          : "border-dashed border-paper-300 bg-paper-50 opacity-50 dark:border-paper-700 dark:bg-paper-950"
      }`}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-sm font-medium text-paper-900 dark:text-paper-50">
        {name}
      </span>
      {description && (
        <span className="text-xs text-paper-400">{description}</span>
      )}
    </div>
  );
}