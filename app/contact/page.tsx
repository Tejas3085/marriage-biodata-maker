import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Online Free Biodata Maker for help with premium templates, payments and refunds.",
  alternates: { canonical: "/contact" },
};

const BUSINESS = {
  name: "Online Free Biodata",
  email: "onlinefreebiodata@gmail.com",
  phone: "+91-8390028497",
  phoneHref: "tel:+918390028497",
  hours: "Monday–Saturday, 10am–7pm IST",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-4"><Link href="/" className="hover:text-slate-900">Home</Link> / <span className="text-slate-900 font-medium">Contact</span></nav>
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-rose-800">We reply within 2 business days</p>
        <h1 className="mt-2 text-3xl md:text-[40px] font-semibold tracking-tight">Contact us</h1>
        <p className="mt-3 text-slate-600 text-[15.5px]">Premium template not unlocking? Payment deducted? Write to us with your payment id (starts with <code>pay_</code>) and design number.</p>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 p-5 flex gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Email</span>
              <a href={`mailto:${BUSINESS.email}`} className="block mt-1 text-[14.5px] font-medium text-slate-900 hover:text-rose-800 hover:underline break-all">{BUSINESS.email}</a>
            </span>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5 flex gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Phone</span>
              <a href={BUSINESS.phoneHref} className="block mt-1 text-[14.5px] font-medium text-slate-900 hover:text-rose-800 hover:underline">{BUSINESS.phone}</a>
            </span>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5 flex gap-3.5 sm:col-span-2">
            <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Support hours</span>
              <span className="block mt-1 text-[14.5px] font-medium text-slate-900">{BUSINESS.hours}</span>
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-6">
          <h2 className="font-semibold text-[16px]">{BUSINESS.name}</h2>
          <p className="mt-2 text-[14px] text-slate-600 leading-relaxed">
            Operator of onlinefreebiodata.com — free marriage biodata maker with optional premium templates (₹49 each, one-time).
            See our <Link href="/terms" className="text-rose-800 font-medium hover:underline">Terms</Link>,{" "}
            <Link href="/refunds" className="text-rose-800 font-medium hover:underline">Refund Policy</Link> and{" "}
            <Link href="/privacy" className="text-rose-800 font-medium hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </section>
      <FooterPage />
    </main>
  );
}
