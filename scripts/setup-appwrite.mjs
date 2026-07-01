/**
 * Script de setup do Appwrite para o ThePaper.
 * Cria o banco de dados e todas as coleções.
 *
 * Uso:
 *   set APPWRITE_API_KEY=seu-api-key
 *   node scripts/setup-appwrite.mjs
 */

import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://nyc.cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID || "6a456e150023315a6358")
  .setDevKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const COLLECTIONS = {
  articles: [
    { key: "title", type: "string", size: 255, required: true },
    { key: "slug", type: "string", size: 255, required: true },
    { key: "summary", type: "string", size: 500, required: true },
    { key: "content", type: "string", size: 50000, required: true },
    { key: "bulletPoints", type: "string", array: true },
    { key: "audioUrl", type: "string", size: 500 },
    { key: "coverImage", type: "string", size: 500 },
    { key: "category", type: "string", size: 100, required: true },
    { key: "tags", type: "string", array: true },
    { key: "source", type: "string", size: 100, required: true },
    { key: "sourceUrl", type: "string", size: 500, required: true },
    { key: "viralScore", type: "integer" },
    { key: "status", type: "string", size: 50, required: true },
    { key: "isSponsored", type: "boolean" },
    { key: "publishedAt", type: "datetime" },
    { key: "viewCount", type: "integer" },
    { key: "readTimeMinutes", type: "integer" },
  ],
  comments: [
    { key: "articleId", type: "string", size: 255, required: true },
    { key: "userId", type: "string", size: 255, required: true },
    { key: "text", type: "string", size: 2000, required: true },
    { key: "createdAt", type: "datetime" },
  ],
  gamification: [
    { key: "userId", type: "string", size: 255, required: true },
    { key: "xp", type: "integer" },
    { key: "level", type: "integer" },
    { key: "streak", type: "integer" },
    { key: "lastActiveDate", type: "datetime" },
    { key: "badgeIds", type: "string", array: true },
    { key: "totalReadTime", type: "integer" },
    { key: "totalComments", type: "integer" },
    { key: "totalShares", type: "integer" },
  ],
  badges: [
    { key: "name", type: "string", size: 100, required: true },
    { key: "description", type: "string", size: 255 },
    { key: "icon", type: "string", size: 10 },
    { key: "requiredXp", type: "integer" },
    { key: "category", type: "string", size: 50 },
  ],
  newsletter: [
    { key: "email", type: "string", size: 255, required: true },
    { key: "isActive", type: "boolean" },
    { key: "subscribedAt", type: "datetime" },
  ],
  banners: [
    { key: "advertiser", type: "string", size: 255, required: true },
    { key: "imageUrl", type: "string", size: 500, required: true },
    { key: "targetUrl", type: "string", size: 500, required: true },
    { key: "position", type: "string", size: 50, required: true },
    { key: "startDate", type: "datetime", required: true },
    { key: "endDate", type: "datetime", required: true },
    { key: "price", type: "integer" },
    { key: "isActive", type: "boolean" },
    { key: "impressions", type: "integer" },
    { key: "clicks", type: "integer" },
  ],
  sponsored: [
    { key: "company", type: "string", size: 255, required: true },
    { key: "briefing", type: "string", size: 5000, required: true },
    { key: "articleId", type: "string", size: 255 },
    { key: "status", type: "string", size: 50, required: true },
    { key: "price", type: "integer" },
    { key: "publishedAt", type: "datetime" },
  ],
  ad_campaigns: [
    { key: "advertiserId", type: "string", size: 255, required: true },
    { key: "format", type: "string", size: 50, required: true },
    { key: "title", type: "string", size: 255, required: true },
    { key: "description", type: "string", size: 5000, required: true },
    { key: "targetUrl", type: "string", size: 500 },
    { key: "imageUrl", type: "string", size: 500 },
    { key: "documentUrl", type: "string", size: 500 },
    { key: "status", type: "string", size: 50, required: true },
    { key: "priceCents", type: "integer", required: true },
    { key: "stripePaymentIntentId", type: "string", size: 255 },
    { key: "stripePaymentStatus", type: "string", size: 50 },
    { key: "startDate", type: "datetime" },
    { key: "endDate", type: "datetime" },
    { key: "rejectionReason", type: "string", size: 500 },
    { key: "adminNotes", type: "string", size: 500 },
  ],
  ad_profiles: [
    { key: "userId", type: "string", size: 255, required: true },
    { key: "role", type: "string", size: 20, required: true },
    { key: "documentType", type: "string", size: 10, required: true },
    { key: "document", type: "string", size: 20, required: true },
    { key: "companyName", type: "string", size: 255 },
    { key: "phone", type: "string", size: 20 },
    { key: "stripeCustomerId", type: "string", size: 255 },
    { key: "totalSpentCents", type: "integer" },
    { key: "isActive", type: "boolean" },
  ],
};

async function setup() {
  try {
    // Create database
    console.log("Criando banco de dados...");
    const db = await databases.create(ID.unique(), "ThePaper");
    const dbId = db.$id;
    console.log(`✓ Database criado: ${dbId}`);

    // Create collections
    for (const [name, attrs] of Object.entries(COLLECTIONS)) {
      console.log(`\nCriando coleção: ${name}...`);
      const collection = await databases.createCollection(dbId, ID.unique(), name);
      const colId = collection.$id;

      for (const attr of attrs) {
        try {
          if (attr.type === "string") {
            await databases.createStringAttribute(dbId, colId, attr.key, attr.size ?? 255, attr.required ?? false);
          } else if (attr.type === "integer") {
            await databases.createIntegerAttribute(dbId, colId, attr.key, attr.required ?? false);
          } else if (attr.type === "boolean") {
            await databases.createBooleanAttribute(dbId, colId, attr.key, attr.required ?? false);
          } else if (attr.type === "datetime") {
            await databases.createDatetimeAttribute(dbId, colId, attr.key, attr.required ?? false);
          }
          console.log(`  ✓ ${attr.key} (${attr.type})`);
        } catch (err) {
          console.log(`  ✗ ${attr.key}: ${err.message}`);
        }
      }
    }

    console.log("\n✅ Setup completo!");
    console.log(`Database ID: ${dbId}`);
    console.log("Adicione este ID ao .env.local como NEXT_PUBLIC_APPWRITE_DATABASE_ID");
  } catch (err) {
    console.error("Erro:", err.message);
    process.exit(1);
  }
}

setup();