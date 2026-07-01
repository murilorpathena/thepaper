import { Client, Account, Databases, Storage, Functions } from "appwrite";

export function createClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "");

  return {
    account: new Account(client),
    databases: new Databases(client),
    storage: new Storage(client),
    functions: new Functions(client),
  };
}

export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "";

export const COLLECTIONS = {
  ARTICLES: "articles",
  USERS: "users",
  COMMENTS: "comments",
  GAMIFICATION: "gamification",
  BADGES: "badges",
  NEWSLETTER: "newsletter",
  BANNERS: "banners",
  SPONSORED: "sponsored",
  ADS: "ads",
} as const;