import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json(
      { error: "Razorpay key secret is not configured in environment." },
      { status: 500 }
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

  // Accept razorpay standard fields (razorpay_order_id, etc.) or snake_case / camelCase aliases
  const orderId = body?.razorpay_order_id ?? body?.order_id ?? body?.orderId;
  const paymentId = body?.razorpay_payment_id ?? body?.payment_id ?? body?.paymentId;
  const signature = body?.razorpay_signature ?? body?.signature;

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json(
      {
        error: "Missing required payment verification fields.",
        required: ["order_id", "payment_id", "signature"],
      },
      { status: 400 }
    );
  }

  if (
    typeof orderId !== "string" ||
    typeof paymentId !== "string" ||
    typeof signature !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid field format. order_id, payment_id, and signature must be strings." },
      { status: 400 }
    );
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const providedBuffer = Buffer.from(signature, "utf8");

  const isValid =
    expectedBuffer.length === providedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, providedBuffer);

  if (!isValid) {
    return NextResponse.json(
      {
        success: false,
        ok: false,
        error: "Payment verification failed. Signature mismatch.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    ok: true,
    message: "Payment verified successfully.",
    order_id: orderId,
    payment_id: paymentId,
  });
}
