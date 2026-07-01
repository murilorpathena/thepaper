import { RssItem } from "./rss";

const GOOGLE_NEWS_CATEGORIES = [
  { topic: "TOP_WORLD", category: "Internacional" },
  { topic: "TOP_TECHNOLOGY", category: "Tecnologia" },
  { topic: "TOP_SCIENCE", category: "Ciência" },
  { topic: "TOP_BUSINESS", category: "Economia" },
  { topic: "TOP_SPORTS", category: "Esportes" },
  { topic: "TOP_HEALTH", category: "Saúde" },
];

export async function crawlGoogleNews(
  topic: string,
  category: string,
  locale = "pt-BR"
): Promise<RssItem[]> {
  try {
    const url = `https://news.google.com/rss/topics/${topic}?hl=${locale}&gl=BR`;
    const res = await fetch(url);
    const xml = await res.text();

    const items: RssItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];
      const title = itemXml.match(/<title>([\s\S]*?)<\/title>/i);
      const link = itemXml.match(/<link>([\s\S]*?)<\/link>/i);
      const desc = itemXml.match(/<description>([\s\S]*?)<\/description>/i);
      const pubDate = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

      if (title && link) {
        items.push({
          title: title[1].trim(),
          link: link[1].trim(),
          description: desc?.[1]?.trim() ?? "",
          pubDate: pubDate?.[1]?.trim() ?? new Date().toISOString(),
          source: "Google News",
          category,
        });
      }
    }

    return items;
  } catch {
    return [];
  }
}

export async function crawlAllGoogleNews(): Promise<RssItem[]> {
  const results = await Promise.allSettled(
    GOOGLE_NEWS_CATEGORIES.map((c) => crawlGoogleNews(c.topic, c.category))
  );
  return results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);
}