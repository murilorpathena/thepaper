import { RssItem } from "./rss";

export interface TwitterSource {
  username: string;
  category: string;
}

export async function crawlTwitter(username: string): Promise<RssItem[]> {
  // TODO: Implementar via Twitter API v2
  // const tweets = await twitterClient.getUserTimeline(username);
  return [];
}

export async function crawlTrending(): Promise<RssItem[]> {
  // TODO: Twitter trending topics
  return [];
}