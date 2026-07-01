import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/appwrite/admin";
import { COLLECTIONS, DATABASE_ID } from "@/lib/appwrite/client";
import type Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") ?? "";
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

    if (!webhookSecret) {
      return NextResponse.json({ error: "Webhook não configurado." }, { status: 500 });
    }

    const stripe = getStripeClient();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch {
      return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const campaignId = paymentIntent.metadata?.campaignId;

      if (campaignId) {
        const { databases } = createAdminClient();
        await databases.updateDocument(DATABASE_ID, COLLECTIONS.AD_CAMPAIGNS, campaignId, {
          stripePaymentStatus: "succeeded",
          status: "paid",
        });
      }
    }

    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const campaignId = paymentIntent.metadata?.campaignId;

      if (campaignId) {
        const { databases } = createAdminClient();
        await databases.updateDocument(DATABASE_ID, COLLECTIONS.AD_CAMPAIGNS, campaignId, {
          stripePaymentStatus: "failed",
          status: "approved",
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
