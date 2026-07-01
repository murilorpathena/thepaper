import { RssItem } from "./rss";

export interface RedditSource {
  subreddit: string;
  category: string;
}

const REDDIT_SOURCES: RedditSource[] = [
  { subreddit: "worldnews", category: "Internacional" },
  { subreddit: "technology", category: "Tecnologia" },
  { subreddit: "science", category: "Ciência" },
  { subreddit: "brasil", category: "Brasil" },
];

export async function crawlSubreddit(source: RedditSource): Promise<RssItem[]> {
  try {
    const url = `https://www.reddit.com/r/${source.subreddit}/hot.json?limit=25`;
    const res = await fetch(url, {
      headers: { "User-Agent": "ThePaper/1.0" },
    });
    const json = await res.json();

    return (json.data?.children ?? []).map((child: any) => ({
      title: child.data.title,
      link: `https://reddit.com${child.data.permalink}`,
      description: child.data.selftext || child.data.title,
      pubDate: new Date(child.data.created_utc * 1000).toISOString(),
      source: `r/${source.subreddit}`,
      category: source.category,
    }));
  } catch {
    return [];
  }
}

export async function crawlAllReddit(): Promise<RssItem[]> {
  const results = await Promise.allSettled(
    REDDIT_SOURCES.map((s) => crawlSubreddit(s))
  );
  return results
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);
}