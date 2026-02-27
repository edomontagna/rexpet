import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-12-18.acacia" });

const PRINT_PRICE_CENTS = 7900; // €79.00

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { generated_image_id } = await req.json();
    if (!generated_image_id) return new Response(JSON.stringify({ error: "Missing generated_image_id" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Verify the generated image belongs to the user and is completed
    const { data: image, error: imageError } = await supabase
      .from("generated_images")
      .select("id, status")
      .eq("id", generated_image_id)
      .eq("user_id", user.id)
      .eq("status", "completed")
      .single();

    if (imageError || !image) {
      return new Response(JSON.stringify({ error: "Image not found or not completed" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: { name: "RexPet Canvas Print — Museum Quality" },
          unit_amount: PRINT_PRICE_CENTS,
        },
        quantity: 1,
      }],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["AT", "BE", "DE", "DK", "ES", "FI", "FR", "IE", "IT", "LU", "NL", "PT", "SE"] },
      success_url: `${req.headers.get("origin")}/dashboard?print=success`,
      cancel_url: `${req.headers.get("origin")}/dashboard?print=cancelled`,
      metadata: {
        user_id: user.id,
        generated_image_id,
        order_type: "print",
      },
    });

    // Create print order record
    const serviceSupabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    await serviceSupabase.from("print_orders").insert({
      user_id: user.id,
      generated_image_id,
      status: "pending",
      price_cents: PRINT_PRICE_CENTS,
      currency: "eur",
      stripe_session_id: session.id,
    });

    await serviceSupabase.from("audit_log").insert({
      user_id: user.id,
      event_type: "print_order_created",
      metadata: { generated_image_id, stripe_session_id: session.id },
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
