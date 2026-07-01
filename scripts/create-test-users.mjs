/**
 * Script para criar usuários de teste no Appwrite.
 * Cria um admin e um anunciante para testar os dashboards.
 *
 * Uso:
 *   set APPWRITE_API_KEY=seu-api-key
 *   set APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
 *   set APPWRITE_PROJECT_ID=6a456e150023315a6358
 *   npm run tsx scripts/create-test-users.mjs
 *
 * Ou com variáveis inline (PowerShell):
 *   $env:APPWRITE_API_KEY="..."; node scripts/create-test-users.mjs
 */

import { Client, Account, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://nyc.cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID || "6a456e150023315a6358")
  .setDevKey(process.env.APPWRITE_API_KEY);

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "6a4574a2002037d9a4ec";

const USERS = [
  {
    name: "Admin ThePaper",
    email: "admin@thepaper.com",
    password: "admin123",
    role: "admin",
    prefs: { role: "admin" },
  },
  {
    name: "Anunciante Teste",
    email: "anunciante@teste.com",
    password: "anunciante123",
    role: "advertiser",
    prefs: { role: "advertiser", documentType: "cpf", document: "52998224725", companyName: "" },
    adProfile: {
      role: "advertiser",
      documentType: "cpf",
      document: "52998224725",
      companyName: "",
      phone: "(11) 99999-8888",
      totalSpentCents: 0,
      isActive: true,
    },
  },
];

async function createUser(userData) {
  const { name, email, password, role, prefs, adProfile } = userData;

  try {
    const newUser = await account.create(ID.unique(), email, password, name);
    console.log(`✓ Conta criada: ${email} (${newUser.$id})`);

    await account.updatePrefs(newUser.$id, prefs);
    console.log(`  → Prefs atualizadas: role=${role}`);

    if (adProfile) {
      await databases.createDocument(DATABASE_ID, "ad_profiles", ID.unique(), {
        userId: newUser.$id,
        ...adProfile,
      });
      console.log(`  → Perfil de anunciante criado`);
    }

    console.log(`  ✅ ${email} pronto!\n`);
    return { email, password, role };
  } catch (err) {
    if (err.message?.includes("already exists")) {
      console.log(`  ⚠ ${email} já existe. Atualizando...`);
      return { email, password, role };
    }
    console.error(`  ✗ ${email}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log("=== Criando usuários de teste ===\n");

  const created = [];
  for (const u of USERS) {
    const result = await createUser(u);
    if (result) created.push(result);
  }

  console.log("\n=== Resumo ===\n");
  for (const u of created) {
    console.log(`  ${u.role.padEnd(12)} → ${u.email.padEnd(30)} senha: ${u.password}`);
  }

  if (created.length > 0) {
    console.log("\nAcesse os dashboards:");
    console.log("  Admin:      /login  (redirect automático para /admin/dashboard)");
    console.log("  Anunciante: /login  (redirect automático para /advertiser/dashboard)");
  }
}

main().catch(console.error);
