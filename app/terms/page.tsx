import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the free Online Biodata Maker: acceptable use, no guarantees on matches, and your responsibility for shared content.",
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
          <p><strong className="text-slate-900">Free tool.</strong> The biodata maker is provided free, as-is, without warranties. We do not guarantee matches or responses.</p>
          <p><strong className="text-slate-900">Your content.</strong> You are responsible for the accuracy of details and for having rights to photos you upload.</p>
          <p><strong className="text-slate-900">Acceptable use.</strong> Do not misuse the service for spam, fraud, harassment or impersonation.</p>
          <p><strong className="text-slate-900">Liability.</strong> To the maximum extent permitted by law, we are not liable for decisions made based on biodatas created with this tool.</p>
        </div>
      </article>
      <FooterPage />
    </main>
  );
}
