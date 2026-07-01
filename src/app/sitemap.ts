import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepaper.vercel.app";

  const categories = [
    "politica", "tecnologia", "economia", "esportes",
    "entretenimento", "saude", "ciencia",
  ];

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/categoria/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ranking`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    ...categoryUrls,
  ];
}