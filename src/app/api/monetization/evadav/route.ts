import { NextRequest, NextResponse } from "next/server";

const EVADAV_API_BASE = "https://api.evadav.com/v2";

export async function GET() {
  try {
    // TODO: Fetch real stats from EVADAV API
    const stats = {
      push: { impressions: 125000, clicks: 3800, revenue: 1240 },
      popunder: { impressions: 89000, clicks: 1200, revenue: 680 },
      native: { impressions: 45000, clicks: 2100, revenue: 890 },
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar stats" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { format, type, targeting } = await req.json();

    // TODO: Create campaign via EVADAV API
    const response = await fetch(`${EVADAV_API_BASE}/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EVADAV_API_KEY}`,
      },
      body: JSON.stringify({ format, type, targeting }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Erro ao criar campanha" }, { status: 500 });
  }
}