"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  FileText,
  LayoutTemplate,
  Download,
  Star,
  BadgeCheck,
  Zap,
  Globe,
  Plus,
} from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Header from "./SiteHeader";
import FooterPage from "./SiteFooter";
import { useLanguageContext } from "../hooks/useLanguage";

export interface LandingData {
  slug: string;
  lang: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  points: string[];
  faq: { q: string; a: string }[];
}

const BiodataForm = dynamic(() => import("../Biodata-Form/page"), {
  ssr: false,
  loading: () => (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200 p-10 text-center" aria-hidden>
      <div className="w-10 h-10 mx-auto rounded-full border-[3px] border-slate-200 border-t-rose-900 animate-spin mb-3" />
      <p className="text-[14px] text-slate-500 font-medium">Loading form...</p>
    </div>
  ),
});

const TEMPLATES = [
  { id: 1, name: "Classic Maroon", img: "/templates/t1.jpg" },
  { id: 2, name: "Royal Blue", img: "/templates/t2.jpg" },
  { id: 3, name: "Elegant Gold", img: "/templates/t3.jpg" },
  { id: 4, name: "Traditional", img: "/templates/t4.jpg" },
  { id: 5, name: "Minimal Ivory", img: "/templates/t5.jpg" },
  { id: 6, name: "Royal Frame", img: "/templates/t6.jpg" },
  { id: 7, name: "Floral Grace", img: "/templates/t7.jpg" },
  { id: 10, name: "Heritage", img: "/templates/t10.jpg" },
  { id: 11, name: "Sophisticated", img: "/templates/t11.jpg" },
  { id: 12, name: "Classic Red", img: "/templates/t12.jpg" },
  { id: 13, name: "Temple Gold", img: "/templates/t13.jpg" },
  { id: 14, name: "Pastel Blessing", img: "/templates/t14.jpg" },
  { id: 15, name: "Regal", img: "/templates/t15.jpg" },
  { id: 16, name: "Serene", img: "/templates/t16.jpg" },
  { id: 17, name: "Festive", img: "/templates/t17.jpg" },
  { id: 18, name: "Grace", img: "/templates/t18.jpg" },
  { id: 19, name: "Divine", img: "/templates/t19.jpg" },
  { id: 20, name: "Classic Cream", img: "/templates/t20.jpg" },
  { id: 21, name: "Modern Border", img: "/templates/t21.jpg" },
  { id: 22, name: "Auspicious", img: "/templates/t22.jpg" },
  { id: 36, name: "Royal Maroon", img: "/templates/t36.svg" },
  { id: 37, name: "Golden Mandala", img: "/templates/t37.svg" },
];

const HOW_IT_WORKS_STEPS = [
  {
    icon: FileText,
    title: "Fill your details",
    desc: "Add personal, family, education and contact information with our guided form in your preferred language.",
  },
  {
    icon: LayoutTemplate,
    title: "Choose a template",
    desc: "Pick from 20+ traditional, modern and minimal designs crafted especially for matrimony.",
  },
  {
    icon: Download,
    title: "Download & share",
    desc: "Export instantly in high-resolution PNG or A4 PDF with no watermark, ready for WhatsApp and printing.",
  },
];

export default function LandingPageClient({ landing }: { landing: LandingData }) {
  const formRef = useRef<HTMLDivElement | null>(null);
  const { setLanguage, setFolder } = useLanguageContext();

  // Auto-switch language on landing page visit
  useEffect(() => {
    if (landing.lang) {
      setLanguage(landing.lang);
      setFolder("formLang");
    }
  }, [landing.lang, setLanguage, setFolder]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTemplates = () => {
    document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-white text-slate-900 antialiased">
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf7f2] via-rose-50/20 to-white py-12 md:py-16 border-b border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-6">
            <Link href="/" className="hover:text-slate-900 transition">Home</Link>
            {" "}/{" "}
            <span className="text-slate-900 font-medium">{landing.slug}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" /> 100% Free • No Signup • HD Download
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-slate-900 leading-tight">
                {landing.h1}
              </h1>

              <p className="mt-4 text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-2xl">
                {landing.intro}
              </p>

              {/* Bullet Points */}
              <ul className="mt-6 space-y-3">
                {landing.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[15px] text-slate-700">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-900 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={scrollToForm}
                  className="inline-flex h-12 items-center justify-center gap-2 px-8 rounded-full bg-rose-900 text-white font-semibold hover:bg-rose-800 transition shadow-sm hover:shadow"
                >
                  Create free now <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollToTemplates}
                  className="inline-flex h-12 items-center justify-center px-8 rounded-full border border-slate-300 font-semibold text-slate-700 hover:border-rose-900 hover:text-slate-900 transition"
                >
                  Browse templates
                </button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Private</span>
                <span className="flex items-center gap-1.5"><HeartHandshake className="w-4 h-4 text-rose-700" /> Traditional & Modern</span>
              </div>
            </div>

            {/* Right Biodata Sample Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group cursor-pointer" onClick={scrollToForm}>
                <div className="absolute -inset-2 bg-gradient-to-r from-rose-600 to-amber-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition" />
                <div className="relative bg-white p-3 rounded-2xl shadow-xl border border-slate-200/80 max-w-[280px] sm:max-w-[320px]">
                  <Image
                    src="/Images/m1.png"
                    alt="Sample Marriage Biodata"
                    width={320}
                    height={460}
                    className="rounded-xl object-cover shadow-sm w-full h-auto"
                    priority
                  />
                  <div className="mt-3 text-center">
                    <span className="text-xs font-semibold text-rose-900">Sample Biodata Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATES CAROUSEL SECTION */}
      <section id="templates" className="py-16 md:py-24 scroll-mt-20 border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">Templates</p>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight text-slate-900">
                Choose a design that feels right
              </h2>
              <p className="mt-2.5 text-[15px] text-slate-600 leading-relaxed">
                Traditional, modern and minimal layouts — all formatted for A4 printing and mobile sharing.
              </p>
              <Link href="/templates" className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-rose-800 hover:underline">
                View all designs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="swiper-button-prev-custom w-12 h-12 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:border-rose-900 hover:bg-rose-800 hover:text-white transition"
                aria-label="Previous template"
              >
                <FaChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                className="swiper-button-next-custom w-12 h-12 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:border-rose-900 hover:bg-rose-800 hover:text-white transition"
                aria-label="Next template"
              >
                <FaChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1.15}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {TEMPLATES.map((template) => (
                <SwiperSlide key={template.id}>
                  <div
                    onClick={() => {
                      try {
                        localStorage.setItem("selected-template", String(template.id));
                      } catch {
                        /* ignore */
                      }
                      scrollToForm();
                    }}
                    className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_16px_40px_-16px_rgba(15,23,42,0.25)] transition-all"
                  >
                    <div className="relative aspect-[3/4] bg-[#f8f6f3]">
                      <Image
                        src={template.img}
                        alt={`${template.name} marriage biodata template`}
                        fill
                        sizes="(max-width: 768px) 70vw, 300px"
                        className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
                      <div>
                        <p className="text-[13.5px] font-semibold text-slate-900 leading-none">{template.name}</p>
                        <p className="text-[12px] text-slate-500 mt-1">A4 • HD</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-slate-900 group-hover:text-rose-800">
                        Use <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200/80 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">How it works</p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight text-slate-900">
              Three simple steps
            </h2>
            <p className="mt-2.5 text-slate-600 text-[15px]">
              No design skills needed. Most people finish in under 5 minutes.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-rose-900 text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-display text-[40px] leading-none text-slate-200 select-none">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EMBEDDED FORM SECTION */}
      <section ref={formRef} id="create" className="py-16 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">Create now</p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight text-slate-900">
              Fill in your details
            </h2>
            <p className="mt-2.5 text-slate-600 text-[15px]">
              Your information stays on your device. Edit anything, add custom fields, upload a photo.
            </p>
          </div>

          {/* Live Biodata Form */}
          <BiodataForm />
        </div>
      </section>

      {/* WHY US SECTION */}
      <section id="why-us" className="py-16 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-rose-950 text-white overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0">
              <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Why families choose us</p>
                <h2 className="mt-3 font-display text-3xl md:text-[38px] leading-[1.15]">
                  Traditional warmth,
                  <br /> modern craft.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  We designed every template with real marriage biodatas in mind — respectful typography, balanced spacing, and print-perfect output.
                </p>

                <div className="mt-8 bg-white/[0.06] border border-white/10 rounded-2xl p-6">
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                    ))}
                  </div>
                  <p className="font-display italic text-[18px] leading-relaxed text-white/90">
                    “Clean, respectful and so easy. Our family shared it on WhatsApp and printed copies the same day.”
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-200/20 border border-white/20 flex items-center justify-center font-semibold">A</div>
                    <div>
                      <p className="text-[14px] font-semibold">Ananya Sharma</p>
                      <p className="text-[12px] text-white/60">Verified user • Pune</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Free essentials",
                    desc: "27+ templates, HD downloads and all languages are free forever with no watermark.",
                    icon: <BadgeCheck className="w-5 h-5" />,
                  },
                  {
                    title: "Private by default",
                    desc: "Everything is processed locally in your browser. Nothing is uploaded to any server.",
                    icon: <ShieldCheck className="w-5 h-5" />,
                  },
                  {
                    title: "Print & WhatsApp ready",
                    desc: "High-resolution PNG and A4 PDF, sized for crisp printing and instant mobile sharing.",
                    icon: <Zap className="w-5 h-5" />,
                  },
                  {
                    title: "9 Indian languages",
                    desc: "English, Hindi, Marathi, Tamil, Telugu, Bengali, Gujarati, Kannada & Punjabi with native fonts.",
                    icon: <Globe className="w-5 h-5" />,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl bg-white/[0.06] border border-white/10 p-6 hover:bg-white/[0.09] transition">
                    <div className="w-10 h-10 rounded-lg bg-white text-slate-900 flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-[15px] font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">{item.desc}</p>
                  </div>
                ))}
                <div className="sm:col-span-2 mt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={scrollToForm}
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 h-[46px] px-7 rounded-full bg-white text-slate-900 font-semibold text-[14.5px] hover:bg-amber-100 transition"
                  >
                    Start creating — it’s free <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-[12.5px] text-white/50">Takes ~5 minutes • No account needed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">FAQ</p>
            <h2 id="faq-heading" className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {landing.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-[15.5px] hover:text-rose-900 transition-colors [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="w-8 h-8 shrink-0 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 transition-all group-open:bg-rose-900 group-open:text-white group-open:border-rose-900 group-open:rotate-45">
                    <Plus className="w-4 h-4" />
                  </span>
                </summary>
                <p className="mt-3 pr-12 text-[14.5px] text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FooterPage />

      {/* Schema.org FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: landing.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
