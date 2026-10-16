"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  Check,
  Star,
  ShieldCheck,
  Zap,
  Globe,
  BadgeCheck,
  ArrowRight,
  FileText,
  LayoutTemplate,
  Download,
  Plus,
} from "lucide-react";
import Header from "./SiteHeader";
import FooterPage from "./SiteFooter";

// The form is a large client bundle below the fold — load it only when needed
// so the hero paints fast (better LCP / Total Blocking Time).
const BiodataForm = dynamic(() => import("../Biodata-Form/page"), {
  ssr: false,
  loading: () => (
    <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200 p-10 text-center" aria-hidden>
      <div className="w-10 h-10 mx-auto rounded-full border-[3px] border-slate-200 border-t-rose-900 animate-spin mb-3" />
      <p className="text-[14px] text-slate-500 font-medium">Loading the form…</p>
    </div>
  ),
});

export default function HomePage() {
  const formRef = useRef<HTMLDivElement | null>(null);

  const en = {
    headerTitleA: "Create a beautiful",
    headerTitleAccent: "marriage biodata",
    headerTitleB: "in minutes",
    headerDesc:
      "Choose from 20+ elegant templates, fill in your details, and download a print-ready biodata — free, private, and no signup needed.",
    features: [
      "30+ elegant templates",
      "HD PNG + A4 PDF download",
      "9 Indian languages",
      "100% free, no signup",
    ],
    createBiodataBtn: "Create My Biodata",
    viewTemplatesBtn: "View templates",
    howItWorksheading: "Three simple steps",
    howItWorksEyebrow: "How it works",
    howItWorks: [
      {
        title: "Fill your details",
        desc: "Add personal, family, education and contact information with a guided form.",
      },
      {
        title: "Choose a template",
        desc: "Pick from traditional, modern and minimal designs crafted for print.",
      },
      {
        title: "Download & share",
        desc: "Export in high resolution and share instantly on WhatsApp or print.",
      },
    ],
  };

  useEffect(() => {
    if (localStorage.getItem("page")) {
      setTimeout(() => {
        const scrollToForm = () => {
          if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
            localStorage.removeItem("page");
          } else {
            requestAnimationFrame(scrollToForm);
          }
        };
        scrollToForm();
      }, 100);
    }
  }, []);

  const templates = [
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

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Hero shows a filled sample biodata (template files are blank frames —
  // content is rendered at preview time).
  const HERO_SAMPLE = { name: "Marathi Traditional", img: "/Images/m1.png" };

  const scrollToTemplates = () => {
    document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });
  };

  const stepsIcons = [FileText, LayoutTemplate, Download];

  return (
    <main className="text-slate-900 bg-white antialiased">
      <Header />

      {/* HERO — fits one viewport on desktop */}
      <section id="main-content" className="relative overflow-hidden border-b border-slate-200/70 bg-[#fbf7f2] lg:min-h-[calc(100svh-70px)] flex flex-col">
        {/* top ticker */}
        <div className="relative bg-rose-900 text-white/95 overflow-hidden marquee-hover">
          <div className="flex w-max animate-marquee py-2">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                {[
                  "Free Forever", "No Signup Needed", "30+ Designer Templates",
                  "9 Languages", "HD PNG + A4 PDF", "Private by Design",
                ].map((item) => (
                  <span key={`${copy}-${item}`} className="flex items-center text-xs font-semibold uppercase tracking-[0.12em] whitespace-nowrap">
                    <span className="px-5">{item}</span>
                    <span className="text-amber-300 text-[9px]">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* warm mesh backdrop */}
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-rose-200/40 blur-[120px]" />
          <div className="absolute top-20 right-[-120px] w-[520px] h-[520px] rounded-full bg-amber-200/50 blur-[130px]" />
          <div className="absolute bottom-[-160px] left-1/3 w-[560px] h-[380px] rounded-full bg-rose-100/60 blur-[120px]" />
        </div>
        <div className="absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(75%_65%_at_50%_15%,black,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-10 md:pb-12 flex-1 w-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center w-full">
            {/* LEFT */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm">
                <span className="flex -space-x-2">
                  {[
                    ["A", "bg-rose-800"],
                    ["S", "bg-amber-600"],
                    ["P", "bg-rose-950"],
                    ["R", "bg-emerald-700"],
                  ].map(([ch, bg]) => (
                    <span key={ch} className={`w-6 h-6 rounded-full ${bg} text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white`}>
                      {ch}
                    </span>
                  ))}
                </span>
                <span className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </span>
                <span className="text-[12.5px] font-medium text-slate-700">
                  <span className="font-semibold text-slate-900">50,000+</span> happy families
                </span>
              </div>

              <h1 className="mt-4 text-[32px] leading-[1.06] sm:text-5xl lg:text-[50px] font-semibold tracking-[-0.025em] text-slate-900">
                {en.headerTitleA}{" "}
                <span className="font-display italic font-medium text-rose-900">
                  {en.headerTitleAccent}
                </span>{" "}
                {en.headerTitleB}
              </h1>

              <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 max-w-xl mx-auto lg:mx-0">
                {en.headerDesc}
              </p>

              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-xl mx-auto lg:mx-0 text-left">
                {en.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[14px] font-medium text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-rose-900 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <button
                  onClick={handleScrollToForm}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full pl-7 pr-2.5 py-2.5 bg-rose-900 text-white text-[15px] font-semibold hover:bg-rose-800 transition-colors shadow-[0_16px_32px_-12px_rgba(15,23,42,0.5)]"
                >
                  {en.createBiodataBtn}
                  <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 group-hover:translate-x-0.5 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
                <button
                  onClick={scrollToTemplates}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-7 h-[52px] bg-white/80 backdrop-blur border border-slate-300 text-slate-900 text-[15px] font-semibold hover:border-rose-900 transition"
                >
                  {en.viewTemplatesBtn}
                </button>
              </div>

              <dl className="mt-7 grid grid-cols-2 gap-y-6 sm:flex sm:items-stretch sm:gap-0 sm:divide-x sm:divide-slate-300/70 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
                {[
                  ["50K+", "biodatas monthly"],
                  ["30+", "designer templates"],
                  ["4.8", "average rating"],
                  ["9", "languages"],
                ].map(([v, l], i) => (
                  <div key={l} className={`px-2 text-center sm:text-left sm:px-6 ${i % 2 === 1 ? "max-sm:border-l max-sm:border-slate-300/70" : ""}`}>
                    <dt className="sr-only">{l}</dt>
                    <dd className="text-[22px] sm:text-2xl font-semibold tracking-tight text-slate-900 leading-none">{v}</dd>
                    <dd className="mt-1.5 text-xs font-medium uppercase tracking-[0.1em] text-slate-500">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* RIGHT — interactive template switcher */}
            <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[360px] mt-4 lg:mt-0">
              {/* ambient glow */}
              <div aria-hidden className="absolute -inset-10 bg-[radial-gradient(closest-side,rgba(136,19,55,0.12),transparent)] blur-2xl" />

              {/* preview card */}
              <div className="relative bg-white rounded-[1.75rem] border border-slate-200 shadow-[0_32px_64px_-24px_rgba(15,23,42,0.30)] overflow-hidden">
                <div className="relative aspect-[3/4] bg-[#faf8f5]">
                  <Image
                    src={HERO_SAMPLE.img}
                    alt={`${HERO_SAMPLE.name} marriage biodata sample`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 360px"
                    className="object-contain p-5"
                    priority
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-100">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-slate-900 truncate">{HERO_SAMPLE.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                      A4 • HD • <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-semibold text-emerald-700">Verified</span>
                    </p>
                  </div>
                  <button
                    onClick={handleScrollToForm}
                    className="shrink-0 inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-rose-900 text-white text-[12.5px] font-semibold hover:bg-rose-800 transition"
                  >
                    Make mine <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "HowTo",
                    name: "How to Create a Marriage Biodata Online",
                    description: "Follow these 3 simple steps to create a professional marriage biodata for free.",
                    url: "https://onlinefreebiodata.com",
                    totalTime: "PT5M",
                    estimatedCost: { "@type": "MonetaryAmount", currency: "INR", value: "0" },
                    step: en.howItWorks.map((step, i) => ({
                      "@type": "HowToStep",
                      position: i + 1,
                      name: step.title,
                      text: `${step.title}: ${step.desc}`,
                    })),
                  }),
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" className="py-16 md:py-24 scroll-mt-20">
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
              <a href="/templates" className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-rose-800 hover:underline">
                View all designs <ArrowRight className="w-4 h-4" />
              </a>
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
              {templates.map((template) => (
                <SwiperSlide key={template.id}>
                  <div
                    onClick={() => {
                      try { localStorage.setItem("selected-template", String(template.id)); } catch { /* ignore */ }
                      handleScrollToForm();
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

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200/80 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">{en.howItWorksEyebrow}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight">{en.howItWorksheading}</h2>
            <p className="mt-2.5 text-slate-600 text-[15px]">No design skills needed. Most people finish in under 5 minutes.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {en.howItWorks.map((step, i) => {
              const Icon = stepsIcons[i];
              return (
                <div key={i} className="relative bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-rose-900 text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-display text-[40px] leading-none text-slate-200 select-none">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section ref={formRef} id="create" className="py-16 md:py-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">Create now</p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight">Fill in your details</h2>
            <p className="mt-2.5 text-slate-600 text-[15px]">Your information stays on your device. Edit anything, add custom fields, upload a photo.</p>
          </div>
          <BiodataForm />
        </div>
      </section>

      {/* WHY US */}
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
                    desc: "27+ templates, HD downloads and all languages are free forever. Premium designs coming soon.",
                    icon: <BadgeCheck className="w-5 h-5" />,
                  },
                  {
                    title: "Private by default",
                    desc: "Everything is processed locally in your browser. Nothing is uploaded.",
                    icon: <ShieldCheck className="w-5 h-5" />,
                  },
                  {
                    title: "Print & WhatsApp ready",
                    desc: "High-resolution PNG and A4 PDF, sized for crisp printing and mobile sharing.",
                    icon: <Zap className="w-5 h-5" />,
                  },
                  {
                    title: "9 Indian languages",
                    desc: "English, Hindi, Marathi, Tamil, Telugu, Bengali, Gujarati, Kannada & Punjabi with full native script support.",
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
                    onClick={handleScrollToForm}
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

      {/* FAQ — SEO content */}
      <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-800">FAQ</p>
            <h2 id="faq-heading" className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">Common questions</h2>
          </div>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {[
              { q: "Is this marriage biodata maker really free?", a: "Yes. 27+ templates, all languages, HD PNG and A4 PDF downloads are free forever with no signup and no watermark." },
              { q: "Can I make a biodata in Hindi or Marathi?", a: "Yes. Switch language anytime — full Devanagari support with traditional wordings like ॥ श्री गणेशाय नमः ॥, वैयक्तिक माहिती and व्यक्तिगत विवरण." },
              { q: "Is my data safe?", a: "Your details and photos are processed locally in your browser. Nothing is uploaded to a server. Use Reset to wipe everything." },
              { q: "Can I print the biodata?", a: "Yes. Every template exports as a high-resolution PNG and an A4-ready PDF for crisp colour or black-and-white printing." },
              { q: "How do premium templates work?", a: "Premium designs are coming soon — a small one-time payment will unlock extra designs with PNG + PDF downloads included. Everything available today is 100% free." },
              { q: "Do I need to sign up?", a: "No account needed. Fill the form, pick a template, download — most people finish in under 5 minutes." },
            ].map((f) => (
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  { "@type": "Question", name: "Is this marriage biodata maker really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. 27+ templates, HD PNG and A4 PDF downloads are free forever with no signup." } },
                  { "@type": "Question", name: "Can I make a biodata in Hindi or Marathi?", acceptedAnswer: { "@type": "Answer", text: "Yes. Full Devanagari support with traditional wordings in Hindi and Marathi." } },
                  { "@type": "Question", name: "Is my data safe?", acceptedAnswer: { "@type": "Answer", text: "Your details and photos are processed locally in your browser. Nothing is uploaded." } },
                  { "@type": "Question", name: "Can I print the biodata?", acceptedAnswer: { "@type": "Answer", text: "Yes. High-resolution PNG and A4-ready PDF for crisp printing." } },
                ],
              }),
            }}
          />
        </div>
      </section>

      <FooterPage />
    </main>
  );
}
