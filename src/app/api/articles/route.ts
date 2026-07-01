import { NextRequest, NextResponse } from "next/server";

interface ArticleQuery {
  status?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query: ArticleQuery = {
    status: searchParams.get("status") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    limit: Number(searchParams.get("limit")) || 20,
    offset: Number(searchParams.get("offset")) || 0,
  };

  // TODO: Fetch from Appwrite database
  const articles: unknown[] = [];

  return NextResponse.json({ articles, query });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "ID do artigo é obrigatório" }, { status: 400 });
    }

    // TODO: Update article status in Appwrite database
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar artigo" }, { status: 500 });
  }
}