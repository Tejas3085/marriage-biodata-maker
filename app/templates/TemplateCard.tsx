"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function TemplateCard({ t }: { t: { id: number; name: string; img: string; tag: string } }) {
  return (
    <Link
      href="/#create"
      onClick={() => {
        try { localStorage.setItem("selected-template", String(t.id)); } catch { /* private mode — ignore */ }
      }}
      className="group rounded-2xl border border-slate-200 overflow-hidden bg-white hover:shadow-lg hover:border-slate-300 transition"
    >
      <div className="relative aspect-[3/4] bg-[#f8f6f3]">
        <Image src={t.img} alt={`${t.name} marriage biodata template`} fill sizes="(max-width:768px) 45vw, 280px" className="object-contain p-4 group-hover:scale-[1.02] transition" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-900 text-white text-[11px] font-semibold">{t.tag}</span>
      </div>
      <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[14px] font-semibold">{t.name}</span>
        <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-rose-800">Use free <ArrowRight className="w-3.5 h-3.5" /></span>
      </div>
    </Link>
  );
}
