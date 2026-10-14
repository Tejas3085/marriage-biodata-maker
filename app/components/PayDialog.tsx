"use client";

import { useEffect, useState } from "react";
import { Check, Crown, Loader2, ShieldCheck, X } from "lucide-react";

function loadRazorpayScript(): Promise<void> {
  if (typeof window !== "undefined" && (window as any).Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load payment window."));
    document.body.appendChild(script);
  });
}

export default function PayDialog({
  open,
  templateId,
  templateName,
  priceInr,
  onClose,
  onPaid,
}: {
  open: boolean;
  templateId: number;
  templateName: string;
  priceInr: number;
  onClose: () => void;
  onPaid: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setBusy(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const startPayment = async () => {
    setBusy(true);
    setError(null);
    try {
      await loadRazorpayScript();

      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(order.error || "Could not start payment.");
      }

      const rz = new (window as any).Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Online Free Biodata Maker",
        description: `Premium template — Design ${templateId}`,
        order_id: order.orderId,
        theme: { color: "#0f172a" },
        modal: {
          ondismiss: () => setBusy(false),
        },
        handler: async (resp: any) => {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: resp.razorpay_order_id,
                paymentId: resp.razorpay_payment_id,
                signature: resp.razorpay_signature,
                templateId,
              }),
            });
            const data = await verifyRes.json();
            if (!verifyRes.ok || !data.ok) {
              throw new Error(data.error || "Payment verification failed.");
            }
            onPaid();
          } catch (e: any) {
            setError(e?.message || "Payment verification failed.");
            setBusy(false);
          }
        },
      });
      rz.on("payment.failed", () => {
        setError("Payment failed. No money was charged — please try again.");
        setBusy(false);
      });
      rz.open();
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Unlock premium template"
    >
      <button
        type="button"
        aria-label="Close payment dialog"
        onClick={() => { if (!busy) onClose(); }}
        className="absolute inset-0 bg-slate-950/50 cursor-default"
      />
      <div className="relative w-full sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-slate-950 text-white px-6 pt-6 pb-5">
          <div className="flex items-start justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-300/15 border border-amber-200/30 text-amber-200 text-[11px] font-semibold uppercase tracking-[0.14em]">
              <Crown className="w-3.5 h-3.5" /> Premium design
            </span>
            <button
              type="button"
              onClick={() => { if (!busy) onClose(); }}
              aria-label="Close"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h2 className="mt-3 text-[22px] font-semibold tracking-tight">
            Design {templateId} — {templateName}
          </h2>
          <p className="mt-1 text-[13.5px] text-white/65">
            One-time payment • yours forever on this device
          </p>
          <p className="mt-3 font-display text-4xl">₹{priceInr}</p>
        </div>

        <div className="px-6 py-5">
          <ul className="space-y-2 text-[13.5px] text-slate-600">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} /> HD PNG + A4 PDF downloads, no watermark</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} /> All your current details applied instantly</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} /> UPI, cards &amp; netbanking accepted</li>
          </ul>

          {error && (
            <p role="alert" className="mt-4 text-[13px] font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={startPayment}
            disabled={busy}
            className="mt-5 w-full h-12 rounded-full bg-slate-900 text-white text-[15px] font-semibold hover:bg-rose-900 transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            {busy ? "Opening secure payment…" : `Pay ₹${priceInr} securely`}
          </button>
          <p className="mt-3 text-center text-[12px] text-slate-500">
            Secured by Razorpay • test mode accepts test UPI &amp; cards
          </p>
        </div>
      </div>
    </div>
  );
}
