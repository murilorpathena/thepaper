export interface UserProfile {
  $id: string;
  userId: string;
  nickname: string;
  avatarUrl?: string;
  preferredCategories: string[];
  isAdmin: boolean;
  createdAt: string;
}

export interface ReaderStats {
  totalReadTime: number;
  totalComments: number;
  totalShares: number;
  articlesRead: number;
  streak: number;
}