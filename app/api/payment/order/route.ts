import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getTemplatePrice, isPremiumTemplate } from "@/app/preview/premium";

// POST { templateId } -> { orderId, amount, currency, keyId }
// Amount is ALWAYS looked up server-side from premium.ts — the client
// only sends the template id, so the price can't be tampered with.
export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payments are not configured yet. Add RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET to your environment." },
      { status: 503 }
    );
  }

  let templateId: unknown;
  try {
    templateId = (await req.json()).templateId;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const id = Number(templateId);
  if (!Number.isFinite(id) || !isPremiumTemplate(id)) {
    return NextResponse.json({ error: "This template is free or does not exist." }, { status: 400 });
  }

  try {
    const rz = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await rz.orders.create({
      amount: getTemplatePrice(id) * 100, // paise
      currency: "INR",
      receipt: `tpl_${id}_${Date.now()}`,
      notes: { templateId: String(id) },
    });
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch {
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }
}
