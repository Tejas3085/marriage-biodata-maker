import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "How to Make a Marriage Biodata — Complete Guide (2026)",
  description:
    "Step-by-step guide to creating a perfect marriage biodata: what to include, photo tips, Hindi/Marathi wording, common mistakes & free template. Make yours in 5 minutes.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "Marriage Biodata Guide — Format, Samples & Tips",
    description: "Everything to include in your biodata + free maker with 20+ templates.",
    url: "https://onlinefreebiodata.com/guide",
    type: "article",
  },
};

const FAQS = [
  { q: "What should a marriage biodata include?", a: "Personal details (name, age, height, education, occupation, income), family details (parents, siblings), partner expectations, and contact info. A clear photo and horoscope details (optional) complete it." },
  { q: "Which photo is best for a marriage biodata?", a: "A recent, well-lit, front-facing photo with a simple background and modest traditional or formal attire. Avoid selfies, sunglasses and group photos." },
  { q: "Should I make my biodata in Hindi or Marathi?", a: "Use the language your family and prospects are most comfortable with. Our maker supports English, Hindi (हिन्दी) and Marathi (मराठी) with proper Devanagari fonts." },
  { q: "Is this biodata maker really free?", a: "Yes — all 20+ templates, HD download and sharing are 100% free with no signup and no watermark. Your data never leaves your browser." },
  { q: "What size should I print?", a: "A4 is standard. Our PNG export is high-resolution and looks crisp in both colour and black-and-white prints." },
];

export default function GuidePage() {
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900">Home</Link> <span aria-hidden> / </span> <span className="text-slate-900 font-medium">Guide</span>
        </nav>
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-rose-800">Complete guide • 2026</p>
        <h1 className="mt-2 text-3xl md:text-[40px] font-semibold tracking-tight leading-tight">How to make a perfect marriage biodata</h1>
        <p className="mt-4 text-slate-600 text-[16px] leading-relaxed">
          A marriage biodata is a one-page profile shared with prospective matches and their families.
          This guide covers the exact format, what to write in each section, photo rules, and language tips —
          then you can <Link href="/#create" className="font-semibold text-rose-800 hover:underline">create yours free in 5 minutes</Link>.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">1. The standard format</h2>
        <div className="mt-3 space-y-3 text-[15px] text-slate-700 leading-relaxed">
          <p><strong>Header:</strong> auspicious line (e.g. ॥ श्री गणेशाय नमः ॥) + optional deity photo.</p>
          <p><strong>Personal details:</strong> name, date of birth, age, height, weight, complexion, education, occupation, income, gotra, rashi/nakshatra (optional).</p>
          <p><strong>Family details:</strong> father&apos;s and mother&apos;s name &amp; occupation, siblings with marital status, native place.</p>
          <p><strong>Partner expectations:</strong> age range, education, location — keep it respectful and brief (2–3 lines).</p>
          <p><strong>Contact:</strong> phone number and address. Avoid sharing sensitive IDs publicly.</p>
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">2. Photo rules that matter</h2>
        <ul className="mt-3 list-disc pl-5 space-y-2 text-[15px] text-slate-700 leading-relaxed">
          <li>Recent (within 6 months), sharp, front-facing, shoulders-up or half-body.</li>
          <li>Plain light background, natural daylight, gentle smile.</li>
          <li>Traditional or neat formal wear; avoid filters and heavy editing.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">3. Language: English, Hindi or Marathi?</h2>
        <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">
          Match the language to the receiving family. Maharashtrian alliances often prefer Marathi wordings
          (वैयक्तिक माहिती, कौटुंबिक माहिती); North Indian families may prefer Hindi (व्यक्तिगत विवरण).
          English works universally for urban matches. Our maker lets you switch languages instantly —
          see the <Link href="/marathi-biodata-maker" className="font-semibold text-rose-800 hover:underline">Marathi biodata maker</Link> and{" "}
          <Link href="/hindi-biodata-maker" className="font-semibold text-rose-800 hover:underline">Hindi biodata maker</Link>.
        </p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">4. Common mistakes to avoid</h2>
        <ul className="mt-3 list-disc pl-5 space-y-2 text-[15px] text-slate-700 leading-relaxed">
          <li>Typos in names, dates and phone numbers — double-check everything.</li>
          <li>Too much text — one page is ideal; keep expectations short.</li>
          <li>Low-resolution or casual photos.</li>
          <li>Sharing biodata as a blurry forwarded image — always export fresh HD PNG.</li>
        </ul>

        <div className="mt-10 rounded-2xl bg-rose-950 text-white p-7 md:p-8">
          <h2 className="text-xl font-semibold">Ready? Make yours free now.</h2>
          <p className="mt-2 text-white/70 text-[14.5px]">20+ templates • Hindi, Marathi, English • No signup • HD download.</p>
          <Link href="/#create" className="mt-4 inline-flex h-11 items-center gap-2 px-6 rounded-full bg-white text-slate-900 font-semibold text-[14.5px] hover:bg-amber-100 transition">Create my biodata <ArrowRight className="w-4 h-4" /></Link>
        </div>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
        <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((f) => (
            <div key={f.q} className="py-5">
              <h3 className="font-semibold text-[15.5px]">{f.q}</h3>
              <p className="mt-1.5 text-[14.5px] text-slate-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[14px] text-slate-500">Related: <Link href="/templates" className="text-rose-800 font-medium hover:underline">biodata templates</Link> • <Link href="/examples" className="text-rose-800 font-medium hover:underline">sample biodatas</Link> • <Link href="/blog" className="text-rose-800 font-medium hover:underline">blog</Link> • <Link href="/biodata-for-marriage-girl" className="text-rose-800 font-medium hover:underline">biodata for girls</Link> • <Link href="/biodata-for-marriage-boy" className="text-rose-800 font-medium hover:underline">biodata for boys</Link></p>
      </article>
      <FooterPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
    </main>
  );
}
