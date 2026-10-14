import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Pricing — 100% Free Forever",
  description: "Every template, every language and HD download is free forever. No signup, no watermark, no hidden charges.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-20 text-center">
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-rose-800">Pricing</p>
        <h1 className="mt-2 text-3xl md:text-[44px] font-semibold tracking-tight">Free. Forever. No catch.</h1>
        <p className="mt-4 text-slate-600 text-[16px]">All 20+ templates, Hindi/Marathi/English support and HD downloads cost ₹0.</p>
        <div className="mt-8 rounded-3xl border border-slate-200 p-8 text-left grid sm:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold">Everything included</h2>
            <ul className="mt-3 space-y-2 text-[14.5px] text-slate-600">
              {["20+ premium templates", "HD PNG download", "Hindi, Marathi & English", "Photo + god images", "Custom fields & sections", "WhatsApp-ready sharing"].map((f) => <li key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={3} />{f}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl bg-slate-950 text-white p-6 flex flex-col justify-center">
            <p className="font-display text-4xl">₹0</p>
            <p className="text-white/60 text-[13.5px] mt-1">No signup • No watermark</p>
            <Link href="/#create" className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white text-slate-900 font-semibold text-[14px]">Start creating <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
      <FooterPage />
    </main>
  );
}
