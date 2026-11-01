"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Check, Download, FileText, Globe, LayoutTemplate, Plus, ShieldCheck, Flower2 } from "lucide-react";
import Header from "./SiteHeader";
import FooterPage from "./SiteFooter";
import { getTemplatePrice, isPremiumTemplate, PREMIUM_PRICE_INR } from "../preview/premium";
import "./homepage.css";

const BiodataForm = dynamic(() => import("../Biodata-Form/page"), {
  ssr: false,
  loading: () => <p className="p-12 text-center text-slate-600" role="status">Loading your biodata editor…</p>,
});
const designs = [
  { id: 1, name: "Classic Maroon", category: "Traditional", img: "/templates/t1.jpg" },
  { id: 2, name: "Royal Blue", category: "Classic", img: "/templates/t2.jpg" },
  { id: 3, name: "Elegant Gold", category: "Traditional", img: "/templates/t3.jpg" },
  { id: 5, name: "Minimal Ivory", category: "Minimal", img: "/templates/t5.jpg" },
];
const steps = [
  { icon: FileText, title: "Tell your story", desc: "Add your personal, family and education details. Include a photo and the information you want to share." },
  { icon: LayoutTemplate, title: "Make it your own", desc: "Choose your language and a design you love. Preview your biodata before you download." },
  { icon: Download, title: "Download & share", desc: "Save a high-resolution PNG or A4 PDF, ready to print or send to your family on WhatsApp." },
];
const faqs = [
  { q: "Can I create my marriage biodata for free?", a: `Yes. Choose a free template to create and download your biodata without signing up. Selected premium designs cost ₹${PREMIUM_PRICE_INR} each as a one-time payment.` },
  { q: "Which languages can I use?", a: "You can create your biodata in English, Hindi, Marathi, Tamil, Telugu, Bengali, Gujarati, Kannada and Punjabi. Choose a language from the menu at the top of the page." },
  { q: "What details should I include?", a: "Start with your name, date of birth, education and profession. You can add family details, preferences and contact information. Include only the information you are comfortable sharing." },
  { q: "Can I edit my details before downloading?", a: "Yes. You can edit your information, add custom fields and change your photo before creating the final download." },
  { q: "Can I print or share my biodata on WhatsApp?", a: "Yes. Download an A4 PDF for printing or a high-resolution PNG for easy sharing on WhatsApp and other messaging apps." },
];

export default function HomePage() {
  const formRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("All designs");
  const start = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  useEffect(() => {
    try {
      if (localStorage.getItem("page")) {
        formRef.current?.scrollIntoView({ block: "start" });
        localStorage.removeItem("page");
      }
    } catch { /* The editor also works when browser storage is unavailable. */ }
  }, []);
  const selectDesign = (id: number) => {
    try { localStorage.setItem("selected-template", String(id)); } catch { /* Continue to editor. */ }
    start();
  };
  return (
    <div className="professional-home">
      <Header />
      <main id="main-content">
        <section className="home-hero">
          <div className="home-container home-hero-grid">
            <div className="home-hero-copy">
              <p className="home-eyebrow"><span /> A beautiful beginning starts here</p>
              <h1>Free marriage<br className="hidden lg:block" /> biodata maker.<br /><em>Made to feel like you.</em></h1>
              <p className="home-intro">Create your marriage biodata online with a design that feels like you. Add your details, choose from 9 languages, and download a print-ready PDF or PNG—free, with no signup.</p>
              <div className="home-actions">
                <button className="home-button" onClick={start}>Create my biodata <ArrowRight size={18} /></button>
                <a className="home-button home-button-secondary" href="#templates">Explore templates <LayoutTemplate size={17} /></a>
              </div>
              <p className="home-reassurance"><Check size={15} /> Free templates available <span>·</span> No signup needed</p>
              <div className="home-hero-bottom"><ShieldCheck size={22} /><p><strong>Your story. Your choice.</strong><br />You decide which details to include and share.</p></div>
            </div>
            <div className="home-preview-area">
              <div className="home-preview-orbit" aria-hidden="true" />
              <div className="home-preview-label"><Flower2 size={16} strokeWidth={1.7} /> Made for your next chapter</div>
              <div className="home-paper"><Image src="/Images/m1.png" alt="Example of a completed Marathi marriage biodata with a traditional decorative border" width={1200} height={1900} priority sizes="(max-width: 640px) 72vw, 345px" /></div>
              <p className="home-sample-caption">Sample biodata · Your details make it yours</p>
            </div>
          </div>
        </section>
        <div className="home-benefit-bar"><div className="home-container">{[{ icon: LayoutTemplate, text: "Traditional & modern designs" }, { icon: Globe, text: "9 supported languages" }, { icon: Download, text: "PDF & PNG downloads" }, { icon: Check, text: "No account required" }].map(({ icon: Icon, text }) => <div key={text}><Icon size={19} /><span>{text}</span></div>)}</div></div>

        <section id="how-it-works" className="home-section home-container">
          <div className="home-section-heading"><p className="home-eyebrow">Simple from start to finish</p><h2>Your biodata, in three easy steps</h2><p>No design experience needed. Just your story and a few details.</p></div>
          <div className="home-steps">{steps.map(({ icon: Icon, title, desc }, i) => <article key={title}><div className="home-step-top"><span className="home-icon"><Icon size={23} /></span><span className="home-step-number">0{i + 1}</span></div><h3>{title}</h3><p>{desc}</p></article>)}</div>
        </section>

        <section id="templates" className="home-template-section home-section">
          <div className="home-container">
            <div className="home-heading-row"><div><p className="home-eyebrow">Thoughtfully designed</p><h2>Find a style that feels like you</h2><p>From timeless traditions to simple elegance. Make it yours.</p></div><Link href="/templates" className="home-text-link">View all templates <ArrowRight size={17} /></Link></div>
            <div className="home-filters" role="group" aria-label="Filter templates">{["All designs", "Traditional", "Classic", "Minimal"].map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={filter === item ? "active" : ""}>{item}</button>)}</div>
            <div className="home-template-grid">{designs.filter(d => filter === "All designs" || filter === d.category).map(d => <button key={d.id} className="home-template-card" onClick={() => selectDesign(d.id)} aria-label={`Choose ${d.name}${isPremiumTemplate(d.id) ? `, ₹${getTemplatePrice(d.id)}` : ", free"}`}><div className="home-template-image"><span className={isPremiumTemplate(d.id) ? "home-price premium" : "home-price"}>{isPremiumTemplate(d.id) ? `₹${getTemplatePrice(d.id)} · Premium` : "Free"}</span><Image src={d.img} alt={`${d.name} decorative biodata frame`} fill sizes="(max-width: 640px) 44vw, (max-width: 1024px) 45vw, 280px" className="object-contain" /></div><div className="home-template-meta"><div><h3>{d.name}</h3><p>{d.category} · A4 format</p></div><ArrowRight size={18} /></div></button>)}</div>
            <p className="home-pricing-note">Start with a free design. Selected premium templates are ₹{PREMIUM_PRICE_INR} each, one time.</p>
          </div>
        </section>

        <section id="why-us" className="home-container home-section home-why"><div><p className="home-eyebrow">Made with care</p><h2>Rooted in tradition.<br /><em>Designed for today.</em></h2><p>A marriage biodata is more than a list of details. It’s an introduction to you, your family and the life you hope to build.</p><button className="home-text-link" onClick={start}>Let’s create yours <ArrowRight size={17} /></button></div><div className="home-why-list">{[{ icon: Globe, title: "In the language of your family", desc: "Choose from nine languages, including English, Hindi and Marathi, with native script support." }, { icon: FileText, title: "Space for what matters to you", desc: "Add your photo, personalise your details and include custom fields to tell your story." }, { icon: Download, title: "Ready for every introduction", desc: "Share a clear digital copy with family or print an A4 PDF for a personal meeting." }].map(({ icon: Icon, title, desc }) => <article key={title}><span className="home-icon"><Icon size={22} /></span><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></section>

        <section ref={formRef} id="create" className="home-editor-section home-section"><div className="home-container"><div className="home-section-heading"><p className="home-eyebrow">Your next chapter</p><h2>Let’s create your marriage biodata</h2><p>Fill in your details below. You can review your design before downloading.</p></div><BiodataForm /></div></section>

        <section className="home-container home-section home-faq" aria-labelledby="faq-heading"><div><p className="home-eyebrow">A little clarity</p><h2 id="faq-heading">Questions?<br />We’re here to help.</h2><p>Everything you need to get started.</p><Link href="/contact" className="home-text-link">Contact us <ArrowRight size={17} /></Link></div><div>{faqs.map(f => <details key={f.q}><summary>{f.q}<Plus size={18} /></summary><p>{f.a}</p></details>)}</div></section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />
      </main>
      <FooterPage />
    </div>
  );
}
