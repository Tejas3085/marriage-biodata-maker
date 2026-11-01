import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getTemplatePrice, isPremiumTemplate } from "@/app/preview/premium";
import { rateLimit } from "../payment/rate-limit";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, { limit: 10, windowMs: 60_000, keyPrefix: "order" });
  if (limited) return limited;
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Authentication failed. Razorpay credentials are not configured in environment." },
      { status: 401 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  let numAmount: number;
  let templateId: number | undefined;

  if (body?.templateId !== undefined) {
    templateId = Number(body.templateId);
    if (!Number.isSafeInteger(templateId) || !isPremiumTemplate(templateId)) {
      return NextResponse.json({ error: "Invalid or free template ID specified." }, { status: 400 });
    }
    numAmount = getTemplatePrice(templateId) * 100;
  } else if (body?.amount !== undefined) {
    numAmount = Number(body.amount);
    if (!Number.isFinite(numAmount) || numAmount < 100) {
      return NextResponse.json({ error: "Invalid amount. Minimum amount is 100 paise (₹1.00)." }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "Missing templateId or amount." }, { status: 400 });
  }

  const currency = "INR";
  const receipt = typeof body?.receipt === "string" && body.receipt.trim()
    ? body.receipt.trim()
    : (templateId ? `tpl_${templateId}_${Date.now()}` : `rcpt_${Date.now()}`);

  const notes = templateId ? { templateId: String(templateId) } : (body?.notes || undefined);

  try {
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(numAmount),
      currency,
      receipt,
      ...(notes ? { notes } : {}),
    });

    return NextResponse.json({
      order_id: order.id,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      key_id: keyId,
      keyId,
    });
  } catch (error: any) {
    const statusCode = error?.statusCode || error?.status;
    const isAuthFailure =
      statusCode === 401 ||
      (error?.error?.code === "BAD_REQUEST_ERROR" && /auth/i.test(error?.error?.description || "")) ||
      /auth/i.test(error?.message || "");

    if (isAuthFailure) {
      return NextResponse.json(
        { error: error?.error?.description || "Razorpay authentication failed." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error?.error?.description || error?.message || "Failed to create order with Razorpay." },
      { status: 500 }
    );
  }
}
