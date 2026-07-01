import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite/admin";
import { ID } from "appwrite";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/client";
import { AD_FORMATS } from "@/types/advertiser";
import type { AdFormatType } from "@/types/advertiser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { format, title, description, targetUrl, userId } = body;

    if (!format || !title || !description || !userId) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    const formatData = AD_FORMATS.find((f) => f.id === format);
    if (!formatData) {
      return NextResponse.json({ error: "Formato de anúncio inválido." }, { status: 400 });
    }

    const { databases } = createAdminClient();
    const campaign = await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.AD_CAMPAIGNS,
      ID.unique(),
      {
        advertiserId: userId,
        format: format as AdFormatType,
        title,
        description,
        targetUrl: targetUrl ?? "",
        status: "pending_review",
        priceCents: formatData.priceCents,
      }
    );

    return NextResponse.json({ success: true, campaign }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
