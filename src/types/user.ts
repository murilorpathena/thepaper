import type { UserRole, DocumentType } from "./advertiser";

export interface UserProfile {
  $id: string;
  userId: string;
  role: UserRole;
  nickname: string;
  avatarUrl?: string;
  preferredCategories: string[];
  documentType?: DocumentType;
  document?: string;
  companyName?: string;
  phone?: string;
  stripeCustomerId?: string;
  createdAt: string;
}

export interface ReaderStats {
  totalReadTime: number;
  totalComments: number;
  totalShares: number;
  articlesRead: number;
  streak: number;
}