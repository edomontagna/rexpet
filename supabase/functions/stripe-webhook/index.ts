import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-12-18.acacia" });
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    return new Response(`Invalid signature: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const credits = parseInt(session.metadata?.credits || "0", 10);
    const packageId = session.metadata?.package_id;

    if (!userId || !credits) {
      return new Response("Missing metadata", { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Idempotency: check if this session was already processed
    const { data: existing } = await supabase
      .from("credit_transactions")
      .select("id")
      .eq("stripe_session_id", session.id)
      .single();

    if (existing) {
      return new Response(JSON.stringify({ received: true, note: "already processed" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get current balance
    const { data: profile } = await supabase
      .from("profiles")
      .select("credit_balance")
      .eq("user_id", userId)
      .single();

    const currentBalance = profile?.credit_balance || 0;
    const newBalance = currentBalance + credits;

    // Update balance
    await supabase
      .from("profiles")
      .update({ credit_balance: newBalance, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    // Insert transaction record
    await supabase.from("credit_transactions").insert({
      user_id: userId,
      type: "purchase",
      amount: credits,
      balance_after: newBalance,
      stripe_session_id: session.id,
      idempotency_key: `stripe-${session.id}`,
      description: `Purchased ${credits} credits (${packageId})`,
    });

    // Audit log
    await supabase.from("audit_log").insert({
      user_id: userId,
      event_type: "credit_purchase",
      metadata: { package_id: packageId, credits, stripe_session_id: session.id },
    });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
