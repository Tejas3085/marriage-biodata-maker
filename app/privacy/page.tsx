import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Online Free Biodata Maker handles your data: everything is processed locally in your browser. We store nothing on servers.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16 prose-slate">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-4"><Link href="/" className="hover:text-slate-900">Home</Link> / <span className="text-slate-900 font-medium">Privacy</span></nav>
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-[13.5px] text-slate-500">Last updated: October 2026</p>
        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-slate-700">
          <p><strong className="text-slate-900">Local-first.</strong> Your biodata details and photos are processed entirely in your browser (localStorage + canvas). We do not upload, store or sell your personal information on any server.</p>
          <p><strong className="text-slate-900">Payments (Razorpay).</strong> If you buy a premium template, our payment partner Razorpay processes your payment (UPI, cards, netbanking). Payment details go directly to Razorpay — we never receive your card numbers, UPI IDs or bank credentials. To prevent fraud and verify purchases, our server receives only the Razorpay order id, payment id and payment signature, which we check cryptographically. Razorpay&apos;s own privacy policy applies to data you share with them. Premium unlocks are stored only in your browser (localStorage).</p>
          <p><strong className="text-slate-900">Analytics.</strong> We use privacy-friendly, aggregated analytics (Vercel Analytics) to understand usage. No personal biodata content is sent to analytics.</p>
          <p><strong className="text-slate-900">Your control.</strong> Clearing your browser storage or using the in-app Reset button permanently deletes your data from your device.</p>
          <p><strong className="text-slate-900">Sharing.</strong> When you download a PNG or PDF, only you decide whom to share it with. Be careful about posting phone numbers publicly.</p>
          <p>Questions? Reach us via our <Link href="/contact" className="text-rose-800 font-medium hover:underline">Contact Us page</Link>. This policy may be updated; material changes will be noted here.</p>
        </div>
      </article>
      <FooterPage />
    </main>
  );
}
