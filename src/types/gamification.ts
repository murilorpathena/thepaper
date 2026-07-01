export interface UserGamification {
  $id: string;
  userId: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  badgeIds: string[];
  totalReadTime: number;
  totalComments: number;
  totalShares: number;
}

export interface Badge {
  $id: string;
  name: string;
  description: string;
  icon: string;
  requiredXp: number;
  category: "reader" | "social" | "streak" | "special";
}

export interface XpEvent {
  action: XpAction;
  points: number;
  cooldownHours?: number;
}

export type XpAction =
  | "article_read"
  | "article_shared"
  | "comment_posted"
  | "daily_visit"
  | "streak_day"
  | "streak_7_days"
  | "streak_30_days";