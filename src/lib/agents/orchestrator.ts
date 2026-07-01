export interface CrawlerConfig {
  rss: boolean;
  reddit: boolean;
  twitter: boolean;
  googleNews: boolean;
}

export const DEFAULT_CRAWLER_CONFIG: CrawlerConfig = {
  rss: true,
  reddit: true,
  twitter: false,
  googleNews: true,
};

export async function runCrawlers(config: CrawlerConfig = DEFAULT_CRAWLER_CONFIG) {
  const results: { source: string; items: number }[] = [];

  if (config.rss) {
    const { crawlAllRss } = await import("./crawler/rss");
    const items = await crawlAllRss();
    results.push({ source: "RSS", items: items.length });
  }

  if (config.reddit) {
    const { crawlAllReddit } = await import("./crawler/reddit");
    const items = await crawlAllReddit();
    results.push({ source: "Reddit", items: items.length });
  }

  if (config.googleNews) {
    const { crawlAllGoogleNews } = await import("./crawler/google-news");
    const items = await crawlAllGoogleNews();
    results.push({ source: "Google News", items: items.length });
  }

  return results;
}