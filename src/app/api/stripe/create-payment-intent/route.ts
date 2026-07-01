import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/appwrite/admin";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/client";
import { AD_FORMATS } from "@/types/advertiser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { campaignId } = body;

    if (!campaignId) {
      return NextResponse.json({ error: "ID da campanha é obrigatório." }, { status: 400 });
    }

    const { databases } = createAdminClient();
    const campaign = await databases.getDocument(DATABASE_ID, COLLECTIONS.AD_CAMPAIGNS, campaignId);

    if (campaign.status !== "approved") {
      return NextResponse.json({ error: "Campanha precisa ser aprovada antes do pagamento." }, { status: 400 });
    }

    const priceCents = campaign.priceCents as number;
    const formatData = AD_FORMATS.find((f) => f.id === campaign.format);
    const description = `Anúncio: ${formatData?.name ?? campaign.format} - ${campaign.title}`;

    const stripe = getStripeClient();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceCents,
      currency: "brl",
      description,
      metadata: {
        campaignId,
        advertiserId: campaign.advertiserId as string,
        format: campaign.format as string,
      },
    });

    await databases.updateDocument(DATABASE_ID, COLLECTIONS.AD_CAMPAIGNS, campaignId, {
      stripePaymentIntentId: paymentIntent.id,
      stripePaymentStatus: paymentIntent.status,
      status: "payment_pending",
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: priceCents,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
