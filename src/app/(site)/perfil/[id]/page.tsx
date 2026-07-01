import { Metadata } from "next";
import { XPBar } from "@/components/gamification/xp-bar";
import { StreakBadge } from "@/components/gamification/streak-badge";
import { BadgeDisplay } from "@/components/gamification/badge";

export const metadata: Metadata = {
  title: "Perfil",
};

const MOCK_USER = {
  nickname: "LeitorVoraz_99",
  xp: 15240,
  level: 12,
  streak: 45,
  totalReadTime: 3420,
  totalComments: 89,
  totalShares: 234,
  badges: [
    { name: "Leitor Bronze", icon: "🥉", description: "100 XP", unlocked: true },
    { name: "Leitor Prata", icon: "🥈", description: "500 XP", unlocked: true },
    { name: "Leitor Ouro", icon: "🥇", description: "2.000 XP", unlocked: true },
    { name: "Leitor Platina", icon: "💎", description: "10.000 XP", unlocked: true },
    { name: "Fogo Semanal", icon: "🔥", description: "7 dias de streak", unlocked: true },
    { name: "Veterano", icon: "🏆", description: "30 dias de streak", unlocked: true },
    { name: "Viralizador", icon: "📢", description: "100 compartilhamentos", unlocked: false },
  ],
};

export default function PerfilPage({ params }: { params: Promise<{ id: string }> }) {
  const xpForNext = Math.pow(MOCK_USER.level, 2) * 100;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent-100 text-3xl dark:bg-accent-900">
          {MOCK_USER.nickname[0]}
        </div>
        <h1 className="text-2xl font-bold text-paper-900 dark:text-paper-50">
          {MOCK_USER.nickname}
        </h1>
        <p className="text-sm text-paper-500">Nível {MOCK_USER.level}</p>
      </div>

      <div className="mb-8 space-y-4">
        <XPBar current={MOCK_USER.xp - (MOCK_USER.level - 1) * 100} max={xpForNext} />
        <StreakBadge streak={MOCK_USER.streak} />
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "Leitura", value: `${Math.round(MOCK_USER.totalReadTime / 60)}h` },
          { label: "Comentários", value: MOCK_USER.totalComments },
          { label: "Compartilhamentos", value: MOCK_USER.totalShares },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-paper-200 bg-white p-4 text-center dark:border-paper-800 dark:bg-paper-900"
          >
            <p className="text-xl font-bold text-paper-900 dark:text-paper-50">
              {stat.value}
            </p>
            <p className="text-xs text-paper-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-bold text-paper-900 dark:text-paper-50">
        Badges
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {MOCK_USER.badges.map((badge) => (
          <BadgeDisplay key={badge.name} {...badge} />
        ))}
      </div>
    </div>
  );
}