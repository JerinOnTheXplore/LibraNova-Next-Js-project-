import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export async function POST(req) {
  const { amount } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // dollars → cents
    currency: "usd",
  });

  return new Response(JSON.stringify({ client_secret: paymentIntent.client_secret }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
