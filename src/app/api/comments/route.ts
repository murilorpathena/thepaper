import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { articleId, text } = await req.json();

    // TODO: Post comment to Appwrite
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao postar comentário" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const articleId = searchParams.get("articleId");

  if (!articleId) {
    return NextResponse.json({ error: "articleId é obrigatório" }, { status: 400 });
  }

  // TODO: Fetch comments from Appwrite
  return NextResponse.json({ comments: [] });
}