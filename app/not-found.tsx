import Link from "next/link";
import { ArrowRight, Home, LayoutTemplate } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "This page doesn't exist. Create a free marriage biodata instead.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fbf7f2] text-slate-900 flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <p className="font-display italic text-7xl text-rose-900/20 select-none">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">This page flew away</h1>
        <p className="mt-3 text-slate-600 text-[15px] leading-relaxed">
          The link may be old or mistyped. Let&apos;s get you back to creating a beautiful biodata.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-slate-900 text-white text-[14.5px] font-semibold hover:bg-rose-900 transition"
          >
            <Home className="w-4 h-4" /> Go home
          </Link>
          <Link
            href="/templates"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white border border-slate-300 text-[14.5px] font-semibold hover:border-slate-900 transition"
          >
            <LayoutTemplate className="w-4 h-4" /> Browse templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
