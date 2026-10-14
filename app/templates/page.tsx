import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TemplateCard from "./TemplateCard";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "20+ Marriage Biodata Templates — Traditional, Modern & Minimal",
  description:
    "Browse 20+ free marriage biodata templates: Maroon classic, Royal blue, Floral, Minimal ivory & more. A4 print-ready, Hindi Marathi English support. Preview and use any design free.",
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Marriage Biodata Templates — 20+ Free Designs",
    description: "Traditional, modern & minimal biodata designs. A4 print-ready, free download.",
    url: "https://onlinefreebiodata.com/templates",
    type: "website",
  },
};

const TEMPLATES = [
  { id: 36, name: "Royal Maroon", img: "/templates/t36.svg", tag: "New" },
  { id: 37, name: "Golden Mandala", img: "/templates/t37.svg", tag: "New" },
  { id: 1, name: "Classic Maroon", img: "/templates/t1.jpg", tag: "Most popular" },
  { id: 2, name: "Royal Blue", img: "/templates/t2.jpg", tag: "Traditional" },
  { id: 3, name: "Elegant Gold", img: "/templates/t3.jpg", tag: "Premium look" },
  { id: 4, name: "Traditional Frame", img: "/templates/t4.jpg", tag: "Hindu" },
  { id: 5, name: "Minimal Ivory", img: "/templates/t5.jpg", tag: "Modern" },
  { id: 6, name: "Royal Border", img: "/templates/t6.jpg", tag: "Classic" },
  { id: 7, name: "Floral Grace", img: "/templates/t7.jpg", tag: "Elegant" },
  { id: 10, name: "Heritage", img: "/templates/t10.jpg", tag: "Traditional" },
  { id: 11, name: "Sophisticated", img: "/templates/t11.jpg", tag: "Modern" },
  { id: 12, name: "Classic Red", img: "/templates/t12.jpg", tag: "Auspicious" },
  { id: 13, name: "Temple Gold", img: "/templates/t13.jpg", tag: "Traditional" },
  { id: 14, name: "Pastel Blessing", img: "/templates/t14.jpg", tag: "Soft" },
];

export default function TemplatesPage() {
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900">Home</Link> <span aria-hidden> / </span> <span className="text-slate-900 font-medium">Templates</span>
        </nav>
        <h1 className="text-3xl md:text-[40px] font-semibold tracking-tight">Marriage biodata templates</h1>
        <p className="mt-3 max-w-2xl text-slate-600 text-[15.5px] leading-relaxed">
          Every template is free, watermark-free and formatted for A4 printing and WhatsApp sharing.
          Pick a design below — you&apos;ll be taken to the form where the template is applied to your details.
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {TEMPLATES.map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-slate-50 border border-slate-200 p-6 md:p-8 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight">How to choose the right template</h2>
          <ul className="mt-3 space-y-2 text-[14.5px] text-slate-600 leading-relaxed list-disc pl-5">
            <li><strong className="text-slate-900">Traditional families:</strong> Classic Maroon, Temple Gold or Royal Border — familiar, respectful layouts.</li>
            <li><strong className="text-slate-900">Modern profiles:</strong> Minimal Ivory or Sophisticated — clean type, generous whitespace.</li>
            <li><strong className="text-slate-900">Printing:</strong> all designs export at high resolution for A4; darker borders use more ink — choose Ivory to save ink.</li>
          </ul>
          <Link href="/guide" className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-rose-800 hover:underline">Read the full biodata guide <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
      <FooterPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Marriage Biodata Templates",
            description: "20+ free marriage biodata templates in Hindi, Marathi and English.",
            url: "https://onlinefreebiodata.com/templates",
          }),
        }}
      />
    </main>
  );
}
