import { Client, Account, Databases, Storage, Functions } from "appwrite";

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT ?? "")
    .setProject(process.env.APPWRITE_PROJECT_ID ?? "")
    .setDevKey(process.env.APPWRITE_API_KEY ?? "");

  return {
    account: new Account(client),
    databases: new Databases(client),
    storage: new Storage(client),
    functions: new Functions(client),
  };
}