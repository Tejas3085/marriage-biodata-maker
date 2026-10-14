import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";
import { POSTS } from "./posts";

export const metadata: Metadata = {
  title: "Blog — Marriage Biodata Tips & Formats",
  description: "Practical guides: biodata formats, photo tips, Hindi/Marathi wording, and samples for a perfect marriage profile.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-4"><Link href="/" className="hover:text-slate-900">Home</Link> / <span className="text-slate-900 font-medium">Blog</span></nav>
        <h1 className="text-3xl md:text-[40px] font-semibold tracking-tight">Biodata blog</h1>
        <p className="mt-3 text-slate-600">Short, practical guides to get your biodata right the first time.</p>
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition group">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-800">{p.category} • {p.readTime}</p>
              <h2 className="mt-2 font-semibold text-[17px] leading-snug group-hover:text-rose-900">{p.title}</h2>
              <p className="mt-2 text-[14px] text-slate-600 leading-relaxed">{p.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-900">Read <ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </section>
      <FooterPage />
    </main>
  );
}
