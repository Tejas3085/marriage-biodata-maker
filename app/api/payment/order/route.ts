import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getTemplatePrice, isPremiumTemplate } from "@/app/preview/premium";
import { rateLimit } from "../rate-limit";

// POST { templateId } or { amount, currency, receipt }
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, { limit: 10, windowMs: 60_000, keyPrefix: "order" });
  if (limited) return limited;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payments are not configured yet. Add RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET to your environment." },
      { status: 401 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  let amount = body?.amount;
  if (amount === undefined && body?.templateId !== undefined) {
    const id = Number(body.templateId);
    if (!Number.isFinite(id) || !isPremiumTemplate(id)) {
      return NextResponse.json({ error: "This template is free or does not exist." }, { status: 400 });
    }
    amount = getTemplatePrice(id) * 100;
  }

  const numAmount = Number(amount);
  if (!Number.isFinite(numAmount) || numAmount < 100) {
    return NextResponse.json({ error: "Amount must be at least 100 paise (₹1.00)." }, { status: 400 });
  }

  const currency = typeof body?.currency === "string" && body.currency.trim() ? body.currency.trim().toUpperCase() : "INR";
  const receipt = typeof body?.receipt === "string" && body.receipt.trim()
    ? body.receipt.trim()
    : (body?.templateId ? `tpl_${body.templateId}_${Date.now()}` : `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);

  try {
    const rz = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await rz.orders.create({
      amount: Math.round(numAmount),
      currency,
      receipt,
      notes: body?.templateId ? { templateId: String(body.templateId) } : (body?.notes || undefined),
    });
    return NextResponse.json({
      orderId: order.id,
      order_id: order.id,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      keyId,
      key_id: keyId,
    });
  } catch (error: any) {
    const isAuth =
      error?.statusCode === 401 ||
      (error?.error?.code === "BAD_REQUEST_ERROR" && /auth/i.test(error?.error?.description || "")) ||
      /auth/i.test(error?.message || "");

    if (isAuth) {
      return NextResponse.json({ error: "Razorpay authentication failed." }, { status: 401 });
    }
    return NextResponse.json({ error: error?.error?.description || error?.message || "Could not start payment. Please try again." }, { status: 500 });
  }
}
