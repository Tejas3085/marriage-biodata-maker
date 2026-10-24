import React from 'react'
import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="bg-rose-950 text-slate-400" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-8 md:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center">
                <span className="font-display text-lg leading-none pt-[2px]">श्री</span>
              </div>
              <div className="leading-tight">
                <p className="text-white font-semibold text-[16px] tracking-tight">Marriage Biodata Maker</p>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500 mt-0.5">Free • Private • Premium</p>
              </div>
            </div>
            <p className="mt-4 text-[13.5px] leading-relaxed max-w-xs text-slate-400">
              Create elegant, print-ready marriage biodatas in 9 Indian languages. No signup, no watermark.
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">9 languages</p>
            <div className="mt-2 flex flex-wrap gap-1.5 max-w-xs">
              {["English", "हिन्दी", "मराठी", "தமிழ்", "తెలుగు", "বাংলা", "ગુજરાતી", "ಕನ್ನಡ", "ਪੰਜਾਬੀ"].map((l) => (
                <span key={l} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300">{l}</span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-white text-[13px] font-semibold uppercase tracking-[0.12em]">Popular Formats</h2>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li><Link href="/marathi-biodata-maker" className="hover:text-white transition">Marathi Biodata (मराठी)</Link></li>
              <li><Link href="/hindi-biodata-maker" className="hover:text-white transition">Hindi Biodata (हिन्दी)</Link></li>
              <li><Link href="/gujarati-biodata-maker" className="hover:text-white transition">Gujarati Biodata (ગુજરાતી)</Link></li>
              <li><Link href="/bengali-biodata-maker" className="hover:text-white transition">Bengali Biodata (বাংলা)</Link></li>
              <li><Link href="/biodata-for-marriage-girl" className="hover:text-white transition">Biodata for Girls</Link></li>
              <li><Link href="/biodata-for-marriage-boy" className="hover:text-white transition">Biodata for Boys</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-[13px] font-semibold uppercase tracking-[0.12em]">Product</h2>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/#templates" className="hover:text-white transition">Templates</Link></li>
              <li><Link href="/Biodata-Form" className="hover:text-white transition">Create biodata</Link></li>
              <li><Link href="/preview" className="hover:text-white transition">Preview & download</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-[13px] font-semibold uppercase tracking-[0.12em]">Resources</h2>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li><Link href="/guide" className="hover:text-white transition">How-to guide</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/examples" className="hover:text-white transition">Examples</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact us</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-[13px] font-semibold uppercase tracking-[0.12em]">Trust</h2>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li>Private — data stays in browser</li>
              <li>High-resolution PNG export</li>
              <li>20+ designs for every tradition</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12.5px]">
          <p className="text-slate-500">© {new Date().getFullYear()} Marriage Biodata Maker. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/refunds" className="hover:text-white transition">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
