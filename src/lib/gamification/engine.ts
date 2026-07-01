import type { XpAction, XpEvent } from "@/types/gamification";

const XP_RULES: Record<XpAction, XpEvent> = {
  article_read: { action: "article_read", points: 10, cooldownHours: 0 },
  article_shared: { action: "article_shared", points: 25, cooldownHours: 1 },
  comment_posted: { action: "comment_posted", points: 15, cooldownHours: 0 },
  daily_visit: { action: "daily_visit", points: 5, cooldownHours: 24 },
  streak_day: { action: "streak_day", points: 10, cooldownHours: 0 },
  streak_7_days: { action: "streak_7_days", points: 100, cooldownHours: 0 },
  streak_30_days: { action: "streak_30_days", points: 500, cooldownHours: 0 },
};

export function getXpForAction(action: XpAction): number {
  return XP_RULES[action]?.points ?? 0;
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function getXpForNextLevel(currentLevel: number): number {
  return Math.pow(currentLevel, 2) * 100;
}

export function checkStreakBonus(streak: number): XpEvent | null {
  if (streak > 0 && streak % 30 === 0) {
    return XP_RULES.streak_30_days;
  }
  if (streak > 0 && streak % 7 === 0) {
    return XP_RULES.streak_7_days;
  }
  return null;
}

const BADGE_THRESHOLDS = [
  { name: "Leitor Bronze", xp: 100, icon: "🥉", category: "reader" as const },
  { name: "Leitor Prata", xp: 500, icon: "🥈", category: "reader" as const },
  { name: "Leitor Ouro", xp: 2000, icon: "🥇", category: "reader" as const },
  { name: "Leitor Platina", xp: 10000, icon: "💎", category: "reader" as const },
  { name: "Fogo Semanal", xp: 0, icon: "🔥", category: "streak" as const },
  { name: "Viralizador", xp: 0, icon: "📢", category: "social" as const },
];

export function checkNewBadges(
  currentXp: number,
  currentBadgeIds: string[]
): string[] {
  const newBadges: string[] = [];

  for (const badge of BADGE_THRESHOLDS) {
    if (badge.xp > 0 && currentXp >= badge.xp) {
      const badgeId = badge.name.toLowerCase().replace(/\s+/g, "-");
      if (!currentBadgeIds.includes(badgeId)) {
        newBadges.push(badgeId);
      }
    }
  }

  return newBadges;
}