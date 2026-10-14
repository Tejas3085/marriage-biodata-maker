import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service — Pricing, Payments & Refunds",
  description: "Terms for Online Free Biodata Maker: free templates, ₹49 premium designs, Razorpay payments, refund policy and acceptable use.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-4"><Link href="/" className="hover:text-slate-900">Home</Link> / <span className="text-slate-900 font-medium">Terms</span></nav>
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-[13.5px] text-slate-500">Last updated: October 2026</p>
        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-slate-700">
          <p><strong className="text-slate-900">The service.</strong> Online Free Biodata Maker (“we”, “us”) provides a free online tool to create marriage biodatas. Most templates, all languages and HD PNG downloads are free. Selected premium designs unlock with a one-time payment. The service is provided as-is, without warranties. We do not guarantee matches or responses.</p>
          <p><strong className="text-slate-900">Pricing.</strong> Premium templates cost ₹49 each (one-time, inclusive of all taxes). Prices are shown in Indian Rupees (INR) before you pay and are also listed on our <Link href="/pricing" className="text-rose-800 font-medium hover:underline">pricing page</Link>. We may change prices for future purchases; completed purchases are never affected.</p>
          <p><strong className="text-slate-900">Payments.</strong> Payments are processed securely by our payment partner <strong className="text-slate-900">Razorpay</strong> (UPI, cards, netbanking). We never see or store your card numbers, UPI IDs or bank details — those go directly to Razorpay under their terms and privacy policy. A payment is complete only after Razorpay confirms it and our server verifies the payment signature.</p>
          <p><strong className="text-slate-900">Delivery.</strong> Premium templates are digital goods delivered instantly: the design unlocks in your browser immediately after verified payment, and you can download PNG and A4 PDF files right away. Unlocks are stored on your device (browser localStorage), so clearing browser data or switching devices will remove access — keep your downloaded files safe.</p>
          <p><strong className="text-slate-900">Refunds.</strong> Because delivery is instant, please preview carefully before paying. If a payment succeeds but the template does not unlock, or a charge fails and money is still deducted, contact us within 7 days and we will verify and refund eligible amounts to the original payment method within 5–7 business days. See our full <Link href="/refunds" className="text-rose-800 font-medium hover:underline">Refund &amp; Cancellation Policy</Link>.</p>
          <p><strong className="text-slate-900">Your content.</strong> You are responsible for the accuracy of details you enter and for having rights to photos you upload. Do not upload someone else&apos;s photos or false information.</p>
          <p><strong className="text-slate-900">Acceptable use.</strong> Do not misuse the service for spam, fraud, harassment, impersonation, or attempts to bypass payment for premium designs.</p>
          <p><strong className="text-slate-900">Liability.</strong> To the maximum extent permitted by law, our liability for any claim is limited to the amount you paid us (if any). We are not liable for decisions made based on biodatas created with this tool.</p>
          <p><strong className="text-slate-900">Contact.</strong> Questions about these terms, payments or refunds? Reach us via our <Link href="/contact" className="text-rose-800 font-medium hover:underline">Contact Us page</Link>.</p>
        </div>
      </article>
      <FooterPage />
    </main>
  );
}
