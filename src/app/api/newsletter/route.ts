import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 });
    }

    // TODO: Save subscriber to Appwrite + send to Resend
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao inscrever" }, { status: 500 });
  }
}