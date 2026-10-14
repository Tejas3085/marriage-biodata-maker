import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Header from "../../components/SiteHeader";
import FooterPage from "../../components/SiteFooter";
import { POSTS } from "../posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", url: `https://onlinefreebiodata.com/blog/${post.slug}` },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900">Home</Link> / <Link href="/blog" className="hover:text-slate-900">Blog</Link> / <span className="text-slate-900 font-medium">{post.title.slice(0, 30)}…</span>
        </nav>
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-rose-800">{post.category} • {post.readTime} • {post.date}</p>
        <h1 className="mt-2 text-3xl md:text-[38px] font-semibold tracking-tight leading-tight">{post.title}</h1>
        <p className="mt-3 text-slate-600 text-[16px]">{post.excerpt}</p>
        {post.body.map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="text-xl font-semibold tracking-tight">{s.h}</h2>
            {s.p.map((para) => <p key={para.slice(0, 20)} className="mt-2.5 text-[15px] text-slate-700 leading-relaxed">{para}</p>)}
          </section>
        ))}
        <div className="mt-10 rounded-2xl bg-slate-950 text-white p-7">
          <h2 className="font-semibold text-lg">Make your biodata now — free</h2>
          <p className="text-white/70 text-[14px] mt-1">Apply these tips in our maker with 20+ templates.</p>
          <Link href="/#create" className="mt-4 inline-flex h-11 px-6 items-center gap-2 rounded-full bg-white text-slate-900 font-semibold text-[14px]">Create free <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <p className="mt-8 text-[14px]"><Link href="/blog" className="inline-flex items-center gap-1.5 text-rose-800 font-semibold hover:underline"><ArrowLeft className="w-4 h-4" /> All articles</Link></p>
      </article>
      <FooterPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, datePublished: post.date, author: { "@type": "Organization", name: "Online Free Biodata Maker" } }) }} />
    </main>
  );
}
