import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Refund policy for premium biodata templates: 7-day window for failed unlocks and duplicate charges, refunded to the original payment method.",
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-4"><Link href="/" className="hover:text-slate-900">Home</Link> / <span className="text-slate-900 font-medium">Refunds</span></nav>
        <h1 className="text-3xl font-semibold tracking-tight">Refund &amp; Cancellation Policy</h1>
        <p className="mt-2 text-[13.5px] text-slate-500">Last updated: October 2026</p>
        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-slate-700">
          <p><strong className="text-slate-900">Digital delivery.</strong> Premium templates (₹49 each, one-time) are digital goods delivered instantly — the design unlocks in your browser the moment payment is verified. Because of this instant delivery, please preview the design carefully before paying.</p>
          <p><strong className="text-slate-900">When we refund.</strong> Contact us within 7 days of payment and we will refund eligible cases to the original payment method (UPI / card / netbanking) within 5–7 business days:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Payment succeeded but the template did not unlock (verified technical failure on our side).</li>
            <li>You were charged twice for the same template (duplicate charge — the extra charge is refunded in full).</li>
            <li>Money was deducted but the payment shows as failed.</li>
          </ul>
          <p><strong className="text-slate-900">When we cannot refund.</strong> Change of mind after a successful unlock and download, or loss of access because you cleared browser data, switched devices or browsers (unlocks live only on your device — please keep your downloaded PNG/PDF files safe).</p>
          <p><strong className="text-slate-900">Cancellations.</strong> Free templates need no cancellation. A premium purchase cannot be cancelled after the design has unlocked; if payment is still in progress, simply close the Razorpay window — no charge is made until you authorise it.</p>
          <p><strong className="text-slate-900">How to claim.</strong> Write to us from our <Link href="/contact" className="text-rose-800 font-medium hover:underline">Contact Us page</Link> with the payment id (starts with <code>pay_</code>, shown by Razorpay after payment), the template design number, and what went wrong. We respond within 2 business days.</p>
          <p>Chargebacks raised without contacting us first slow down resolution for everyone — please talk to us first.</p>
        </div>
      </article>
      <FooterPage />
    </main>
  );
}
