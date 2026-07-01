export type UserRole = "reader" | "advertiser" | "admin";

export type DocumentType = "cpf" | "cnpj";

export type AdCampaignStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "rejected"
  | "payment_pending"
  | "paid"
  | "published"
  | "expired";

export type AdFormatType =
  | "artigo_patrocinado"
  | "banner_header"
  | "banner_sidebar"
  | "banner_entre_artigos"
  | "banner_footer"
  | "native"
  | "newsletter_patrocinio";

export interface AdFormat {
  id: AdFormatType;
  name: string;
  description: string;
  priceCents: number;
  available: boolean;
}

export const AD_FORMATS: AdFormat[] = [
  { id: "artigo_patrocinado", name: "Artigo Patrocinado", description: "Notícia publi redigida pela IA com seu briefing", priceCents: 50000, available: true },
  { id: "banner_header", name: "Banner Topo", description: "Banner de 728x90px no topo do site", priceCents: 15000, available: true },
  { id: "banner_sidebar", name: "Banner Sidebar", description: "Banner de 300x250px na barra lateral", priceCents: 10000, available: true },
  { id: "banner_entre_artigos", name: "Banner Entre Artigos", description: "Banner entre blocos de notícias", priceCents: 8000, available: true },
  { id: "banner_footer", name: "Banner Rodapé", description: "Banner de 728x90px no rodapé", priceCents: 12000, available: true },
  { id: "native", name: "Anúncio Nativo", description: "Conteúdo promocional no feed de notícias", priceCents: 25000, available: true },
  { id: "newsletter_patrocinio", name: "Patrocínio Newsletter", description: "Destaque na newsletter semanal", priceCents: 20000, available: true },
];

export interface AdCampaign {
  $id: string;
  advertiserId: string;
  format: AdFormatType;
  title: string;
  description: string;
  targetUrl: string;
  imageUrl?: string;
  documentUrl?: string;
  status: AdCampaignStatus;
  priceCents: number;
  stripePaymentIntentId?: string;
  stripePaymentStatus?: string;
  startDate?: string;
  endDate?: string;
  rejectionReason?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdvertiserProfile {
  $id: string;
  userId: string;
  role: UserRole;
  documentType: DocumentType;
  document: string;
  companyName?: string;
  phone?: string;
  stripeCustomerId?: string;
  totalSpentCents: number;
  isActive: boolean;
  createdAt: string;
}
