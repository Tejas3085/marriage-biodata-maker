"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import BiodataForm from "../Biodata-Form/page";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
} from "lucide-react";
import Header from "./SiteHeader";
import FooterPage from "./SiteFooter";

export default function HomePage() {
  const formRef = useRef<HTMLDivElement | null>(null);

  const en = {
    headerTitleA: "Create a beautiful",
    headerTitleAccent: "marriage biodata",
    headerTitleB: "in minutes",
    headerDesc:
      "Choose from 20+ elegant templates, fill in your details, and download a print-ready biodata — free, private, and no signup needed.",
    features: [
      "20+ premium templates",
      "High-quality PNG download",
      "English, Hindi & Marathi",
      "100% free, no signup",
    ],
    createBiodataBtn: "Create My Biodata",
    viewTemplatesBtn: "View templates",
    biodatasCount: "50,000+ biodatas created last month",
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
  ];

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTemplates = () => {
    document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });
  };

  const stepsIcons = [FileText, LayoutTemplate, Download];

  return (
    <main className="text-slate-900 bg-white antialiased">
      <Header />

      {/* HERO */}
      <section id="main-content" className="relative overflow-hidden bg-soft-paper border-b border-slate-200/70">
        <div className="absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            {/* LEFT */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-[12.5px] font-medium text-slate-700">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold text-[11px] uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Free
                </span>
                Trusted by 50,000+ families every month
              </div>

              <h1 className="mt-5 text-[32px] leading-[1.08] sm:text-5xl lg:text-[56px] font-semibold tracking-[-0.02em] text-slate-900">
                {en.headerTitleA}{" "}
                <span className="font-display italic font-medium text-rose-900">
                  {en.headerTitleAccent}
                </span>{" "}
                {en.headerTitleB}
              </h1>

              <p className="mt-4 text-[15px] sm:text-[17px] leading-relaxed text-slate-600 max-w-xl mx-auto lg:mx-0">
                {en.headerDesc}
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-xl mx-auto lg:mx-0 text-left">
                {en.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[14px] font-medium text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <button
                  onClick={handleScrollToForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 h-[48px] bg-slate-900 text-white text-[15px] font-semibold hover:bg-rose-900 transition-colors shadow-sm"
                >
                  {en.createBiodataBtn}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={scrollToTemplates}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-7 h-[48px] bg-white border border-slate-300 text-slate-900 text-[15px] font-semibold hover:border-slate-400 hover:bg-slate-50 transition"
                >
                  {en.viewTemplatesBtn}
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[13px] text-slate-600">
                  <span className="font-semibold text-slate-900">4.8/5</span> · {en.biodatasCount}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-200" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Preview • HD</span>
                </div>
                <div className="relative aspect-[4/5] bg-slate-50">
                  <Image
                    src="/Images/m3.png"
                    alt="Marriage biodata template preview"
                    fill
                    className="object-contain p-4"
                    priority
                  />
                </div>
                <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50/60">
                  <span className="text-[13px] font-medium text-slate-600">Classic Maroon • A4 print-ready</span>
                  <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-700">
                    <BadgeCheck className="w-4 h-4" /> Verified design
                  </span>
                </div>
              </div>

              {/* floating cards */}
              <div className="hidden sm:block absolute -left-8 top-10 w-32 rounded-xl overflow-hidden border-4 border-white shadow-lg rotate-[-8deg] bg-white">
                <Image src="/Images/m1.png" alt="Classic maroon marriage biodata template" width={160} height={200} className="w-full h-36 object-cover" />
              </div>
              <div className="hidden sm:block absolute -right-6 top-24 w-32 rounded-xl overflow-hidden border-4 border-white shadow-lg rotate-[8deg] bg-white">
                <Image src="/Images/m2.png" alt="Royal blue marriage biodata template" width={160} height={200} className="w-full h-36 object-cover" />
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 sm:bottom-8 flex items-center gap-3 bg-slate-900 text-white pl-2 pr-4 py-2 rounded-full shadow-lg">
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div className="leading-tight text-left">
                  <p className="text-[12.5px] font-semibold">Private by design</p>
                  <p className="text-[11.5px] text-white/70">Data stays in your browser</p>
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

          {/* language strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-[12.5px] font-medium text-slate-600">
            <span className="uppercase tracking-[0.14em] text-[11px] font-semibold text-slate-500 mr-1">Available in</span>
            {["English", "हिन्दी", "मराठी"].map((l) => (
              <span key={l} className="px-3 py-1.5 rounded-full bg-white border border-slate-200">{l}</span>
            ))}
            <span className="hidden sm:inline text-slate-400 mx-1">•</span>
            <span className="hidden sm:inline">No watermark • No signup</span>
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" className="py-14 md:py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-rose-800">Templates</p>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight text-slate-900">
                Choose a design that feels right
              </h2>
              <p className="mt-2.5 text-[15px] text-slate-600 leading-relaxed">
                Traditional, modern and minimal layouts — all formatted for A4 printing and mobile sharing.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="swiper-button-prev-custom w-10 h-10 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition"
                aria-label="Previous template"
              >
                <FaChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                className="swiper-button-next-custom w-10 h-10 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition"
                aria-label="Next template"
              >
                <FaChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.15}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              autoplay={{ delay: 4000, disableOnInteraction: true }}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {templates.map((template) => (
                <SwiperSlide key={template.id}>
                  <div
                    onClick={handleScrollToForm}
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
      <section id="how-it-works" className="py-14 md:py-20 bg-slate-50 border-y border-slate-200/80 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-rose-800">{en.howItWorksEyebrow}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight">{en.howItWorksheading}</h2>
            <p className="mt-2.5 text-slate-600 text-[15px]">No design skills needed. Most people finish in under 5 minutes.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {en.howItWorks.map((step, i) => {
              const Icon = stepsIcons[i];
              return (
                <div key={i} className="relative bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center">
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
      <section ref={formRef} id="create" className="py-14 md:py-20 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-rose-800">Create now</p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-tight">Fill in your details</h2>
            <p className="mt-2.5 text-slate-600 text-[15px]">Your information stays on your device. Edit anything, add custom fields, upload a photo.</p>
          </div>
          <BiodataForm />
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="pb-16 md:pb-24 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-950 text-white overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0">
              <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-amber-300">Why families choose us</p>
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
                    title: "100% free, no watermark",
                    desc: "Create and download without signup, trial or hidden charges.",
                    icon: <BadgeCheck className="w-5 h-5" />,
                  },
                  {
                    title: "Private by default",
                    desc: "Everything is processed locally in your browser. Nothing is uploaded.",
                    icon: <ShieldCheck className="w-5 h-5" />,
                  },
                  {
                    title: "Print & WhatsApp ready",
                    desc: "High-resolution PNG sized for A4 printing and crisp mobile sharing.",
                    icon: <Zap className="w-5 h-5" />,
                  },
                  {
                    title: "Hindi, Marathi & English",
                    desc: "Full Devanagari support with respectful traditional wordings.",
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
      <section aria-labelledby="faq-heading" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-rose-800">FAQ</p>
            <h2 id="faq-heading" className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">Common questions</h2>
          </div>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {[
              { q: "Is this marriage biodata maker really free?", a: "Yes. All 20+ templates, HD PNG download and sharing are 100% free with no signup and no watermark." },
              { q: "Can I make a biodata in Hindi or Marathi?", a: "Yes. Switch language anytime — full Devanagari support with traditional wordings like ॥ श्री गणेशाय नमः ॥, वैयक्तिक माहिती and व्यक्तिगत विवरण." },
              { q: "Is my data safe?", a: "Your details and photos are processed locally in your browser. Nothing is uploaded to a server. Use Reset to wipe everything." },
              { q: "Can I print the biodata?", a: "Yes. Every template exports as a high-resolution PNG sized for crisp A4 colour or black-and-white printing." },
              { q: "Do I need to sign up?", a: "No account needed. Fill the form, pick a template, download — most people finish in under 5 minutes." },
            ].map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer font-semibold text-[15.5px] list-none flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-slate-400 group-open:rotate-45 transition text-xl leading-none">+</span>
                </summary>
                <p className="mt-2 text-[14.5px] text-slate-600 leading-relaxed">{f.a}</p>
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
                  { "@type": "Question", name: "Is this marriage biodata maker really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. All 20+ templates, HD PNG download and sharing are 100% free with no signup and no watermark." } },
                  { "@type": "Question", name: "Can I make a biodata in Hindi or Marathi?", acceptedAnswer: { "@type": "Answer", text: "Yes. Full Devanagari support with traditional wordings in Hindi and Marathi." } },
                  { "@type": "Question", name: "Is my data safe?", acceptedAnswer: { "@type": "Answer", text: "Your details and photos are processed locally in your browser. Nothing is uploaded." } },
                  { "@type": "Question", name: "Can I print the biodata?", acceptedAnswer: { "@type": "Answer", text: "Yes. High-resolution PNG sized for crisp A4 printing." } },
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
