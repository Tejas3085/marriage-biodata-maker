import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { isPremiumTemplate } from "@/app/preview/premium";
import { rateLimit } from "../rate-limit";

// POST { orderId, paymentId, signature, templateId? } -> { ok: true, success: true }
// Verifies the Razorpay signature server-side using the secret key.
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, { limit: 30, windowMs: 60_000, keyPrefix: "verify" });
  if (limited) return limited;

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const orderId = body?.razorpay_order_id ?? body?.order_id ?? body?.orderId;
  const paymentId = body?.razorpay_payment_id ?? body?.payment_id ?? body?.paymentId;
  const signature = body?.razorpay_signature ?? body?.signature;
  const templateId = body?.templateId;

  if (
    typeof orderId !== "string" ||
    typeof paymentId !== "string" ||
    typeof signature !== "string" ||
    !orderId ||
    !paymentId ||
    !signature
  ) {
    return NextResponse.json({ error: "Invalid payment details. Missing required fields." }, { status: 400 });
  }

  if (templateId !== undefined) {
    const id = Number(templateId);
    if (!Number.isFinite(id) || !isPremiumTemplate(id)) {
      return NextResponse.json({ error: "Invalid template ID." }, { status: 400 });
    }
  }

  const expected = createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  const valid = a.length === b.length && timingSafeEqual(a, b);

  if (!valid) {
    return NextResponse.json({ success: false, ok: false, error: "Payment verification failed. Signature mismatch." }, { status: 400 });
  }

  return NextResponse.json({ ok: true, success: true, message: "Payment verified successfully." });
}
