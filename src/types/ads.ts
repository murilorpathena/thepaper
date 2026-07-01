export interface BannerAd {
  $id: string;
  advertiser: string;
  imageUrl: string;
  targetUrl: string;
  position: "header" | "sidebar" | "between-articles" | "footer";
  startDate: string;
  endDate: string;
  price: number;
  isActive: boolean;
  impressions: number;
  clicks: number;
}

export interface SponsoredArticle {
  $id: string;
  company: string;
  briefing: string;
  articleId?: string;
  status: "draft" | "pending_approval" | "published" | "rejected";
  price: number;
  publishedAt?: string;
}

export interface AdPlacement {
  position: string;
  format: "push" | "popunder" | "native" | "display";
  provider: "evadav" | "adsense";
  enabled: boolean;
}