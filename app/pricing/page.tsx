import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Pricing — Free Templates + ₹15 Premium Designs",
  description: "27+ free templates, languages and HD downloads cost ₹0 forever. Featured premium designs unlock for a one-time ₹15 via secure Razorpay payment.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-20 text-center">
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-rose-800">Pricing</p>
        <h1 className="mt-2 text-3xl md:text-[44px] font-semibold tracking-tight">Free for essentials, ₹15 for premium.</h1>
        <p className="mt-4 text-slate-600 text-[16px]">27+ templates, Hindi/Marathi/English support and HD downloads are free forever. Featured premium designs unlock with a one-time payment.</p>
        <div className="mt-8 rounded-3xl border border-slate-200 p-8 text-left grid sm:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold">Free forever</h2>
            <ul className="mt-3 space-y-2 text-[14.5px] text-slate-600">
              {["27+ free templates", "HD PNG download", "Hindi, Marathi & English", "Photo + god images", "Custom fields & sections", "WhatsApp-ready sharing"].map((f) => <li key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} />{f}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl bg-rose-950 text-white p-6 flex flex-col justify-center">
            <p className="font-display text-4xl">₹0</p>
            <p className="text-white/60 text-[13.5px] mt-1">No signup • No watermark</p>
            <Link href="/#create" className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white text-slate-900 font-semibold text-[14px]">Start creating <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
        <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50/60 p-6 sm:p-7 text-left flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="font-semibold text-[16px]">Razorpay Standard Web Checkout</h2>
            <p className="mt-1.5 text-[13.5px] text-slate-600 leading-relaxed">Experience our integrated Razorpay payment gateway with instant order creation, payment modal, and cryptographic signature verification.</p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <Link href="/checkout" className="inline-flex h-11 items-center justify-center gap-2 px-5 rounded-full bg-rose-900 text-white font-semibold text-[14px] hover:bg-rose-800 transition">Test Checkout <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/preview" className="inline-flex h-11 items-center justify-center gap-2 px-5 rounded-full border border-slate-300 bg-white text-slate-800 font-semibold text-[14px] hover:bg-slate-50 transition">Preview Gallery</Link>
          </div>
        </div>
      </section>
      <FooterPage />
    </main>
  );
}
