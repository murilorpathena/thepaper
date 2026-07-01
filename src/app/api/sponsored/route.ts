import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { company, briefing, price } = await req.json();

    // TODO: Save sponsored content request to Appwrite
    return NextResponse.json({ success: true, sponsoredId: "new-id" });
  } catch {
    return NextResponse.json({ error: "Erro ao criar publi" }, { status: 500 });
  }
}