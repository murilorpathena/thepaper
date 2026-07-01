import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { action, userId } = await req.json();

    // TODO: Calculate XP, check badges, update streak
    return NextResponse.json({ xpGained: 10, newBadges: [] });
  } catch {
    return NextResponse.json({ error: "Erro ao registrar ação" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId é obrigatório" }, { status: 400 });
  }

  // TODO: Fetch user gamification data from Appwrite
  return NextResponse.json({
    xp: 0,
    level: 1,
    streak: 0,
    badges: [],
  });
}