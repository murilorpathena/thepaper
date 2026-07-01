export interface RssSource {
  name: string;
  url: string;
  category: string;
}

const RSS_SOURCES: RssSource[] = [
  { name: "G1", url: "https://g1.globo.com/rss/g1/", category: "Brasil" },
  { name: "TechCrunch", url: "https://techcrunch.com/feed/", category: "Tecnologia" },
  { name: "Science Daily", url: "https://www.sciencedaily.com/rss/all.xml", category: "Ciência" },
  { name: "BBC News", url: "https://feeds.bbci.co.uk/news/rss.xml", category: "Internacional" },
  { name: "Valor Econômico", url: "https://valor.globo.com/rss/valor/", category: "Economia" },
];

export async function crawlRss(source: RssSource): Promise<RssItem[]> {
  try {
    const response = await fetch(source.url);
    const xml = await response.text();
    const items = parseRssXml(xml, source);
    return items;
  } catch (error) {
    console.error(`Erro ao crawlear ${source.name}:`, error);
    return [];
  }
}

export async function crawlAllRss(): Promise<RssItem[]> {
  const results = await Promise.allSettled(
    RSS_SOURCES.map((source) => crawlRss(source))
  );

  return results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);
}

export interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  category: string;
}

function parseRssXml(xml: string, source: RssSource): RssItem[] {
  const items: RssItem[] = [];

  // Simple regex-based RSS parser
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let itemMatch;

  while ((itemMatch = itemRegex.exec(xml)) !== null) {
    const itemXml = itemMatch[1];

    const title = extractXmlValue(itemXml, "title");
    const link = extractXmlValue(itemXml, "link");
    const description = extractXmlValue(itemXml, "description");
    const pubDate = extractXmlValue(itemXml, "pubDate");

    if (title && link) {
      items.push({
        title: title.trim(),
        link: link.trim(),
        description: description?.trim() ?? "",
        pubDate: pubDate?.trim() ?? new Date().toISOString(),
        source: source.name,
        category: source.category,
      });
    }
  }

  return items;
}

function extractXmlValue(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = regex.exec(xml);
  return match ? match[1].trim() : null;
}