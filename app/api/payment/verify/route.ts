import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { isPremiumTemplate } from "@/app/preview/premium";
import { rateLimit } from "../rate-limit";

// POST { orderId, paymentId, signature, templateId } -> { ok: true }
// Verifies the Razorpay signature server-side using the secret key.
// Only after this succeeds should the client unlock the template.
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, { limit: 30, windowMs: 60_000, keyPrefix: "verify" });
  if (limited) return limited;

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  let body: { orderId?: unknown; paymentId?: unknown; signature?: unknown; templateId?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { orderId, paymentId, signature, templateId } = body;
  const id = Number(templateId);

  if (
    typeof orderId !== "string" ||
    typeof paymentId !== "string" ||
    typeof signature !== "string" ||
    !orderId ||
    !paymentId ||
    !signature ||
    !Number.isFinite(id) ||
    !isPremiumTemplate(id)
  ) {
    return NextResponse.json({ error: "Invalid payment details." }, { status: 400 });
  }

  const expected = createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  const valid = a.length === b.length && timingSafeEqual(a, b);

  if (!valid) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
