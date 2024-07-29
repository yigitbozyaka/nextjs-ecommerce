import type { NextApiRequest, NextApiResponse } from "next";
import { applyRateLimit } from '../../../middlewares/rateLimit';
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);
const host = process.env.NEXT_PUBLIC_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { orderedRv } = req.body;

    if (!orderedRv) {
      return res.status(400).json({ error: "Missing required session" });
    }

    console.log(orderedRv)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: orderedRv.name,
            },
            unit_amount: orderedRv.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${host}/success`,
      cancel_url: `${host}/`,
    })    
    
    await applyRateLimit(req, res, () => {
      res.status(200).json({ success: true, message: "Order created successfully", checkout: session.url });
    });
  }
}
