import { NextRequest, NextResponse } from "next/server";

// Tiny in-memory fixed-window rate limiter for the payment APIs.
// Why: order creation hits Razorpay's API (and can be abused to spam orders),
// so each IP gets a small budget per minute. Per-instance memory is enough at
// this scale; move to Redis/Upstash if you outgrow a single region.
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function rateLimit(
  req: NextRequest,
  opts: { limit: number; windowMs: number; keyPrefix: string }
): NextResponse | null {
  const now = Date.now();
  const key = `${opts.keyPrefix}:${clientIp(req)}`;
  const entry = buckets.get(key);

  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
    return null;
  }

  entry.count += 1;
  if (entry.count > opts.limit) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }
  return null;
}
