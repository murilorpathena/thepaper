import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite/admin";
import { Query } from "appwrite";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ role: "reader" });
    }

    const { databases } = createAdminClient();

    const profiles = await databases.listDocuments(DATABASE_ID, COLLECTIONS.AD_PROFILES, [
      Query.equal("userId", userId),
      Query.limit(1),
    ]);

    if (profiles.documents.length > 0) {
      const profile = profiles.documents[0];
      return NextResponse.json({ role: profile.role });
    }

    return NextResponse.json({ role: "reader" });
  } catch {
    return NextResponse.json({ role: "reader" });
  }
}
