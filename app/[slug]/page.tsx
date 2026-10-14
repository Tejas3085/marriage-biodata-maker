import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

interface Landing {
  slug: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  points: string[];
  faq: { q: string; a: string }[];
}

const LANDINGS: Landing[] = [
  {
    slug: "marathi-biodata-maker",
    h1: "Marathi Biodata Maker — लग्नाचा बायोडाटा ५ मिनिटांत",
    title: "Marathi Biodata Maker — Free मराठी लग्न बायोडाटा",
    description: "मराठीत सुंदर लग्न बायोडाटा तयार करा. 20+ पारंपरिक टेम्पलेट, योग्य Devanagari फॉन्ट, HD डाउनलोड. 100% मोफत, नोंदणी नको.",
    intro: "वैयक्तिक माहिती, कौटुंबिक माहिती, अपेक्षा आणि संपर्क — योग्य मराठी शब्दांसह एका पानात. फोटो अपलोड करा, टेम्पलेट निवडा आणि WhatsApp वर शेअर करा.",
    points: ["योग्य मराठी लेबल्स: वैयक्तिक माहिती, कौटुंबिक माहिती, अपेक्षा", "॥ श्री गणेशाय नमः ॥ सह पारंपरिक शीर्षक", "A4 प्रिंटसाठी HD PNG डाउनलोड", "मोबाइलवर ५ मिनिटांत तयार"],
    faq: [
      { q: "मराठी बायोडाट्यात काय लिहावे?", a: "नाव, जन्मतारीख, वय, उंची, शिक्षण, नोकरी, कुटुंब (वडील, आई, भाऊ-बहीण), अपेक्षा आणि संपर्क — प्रत्येकी एक ओळ." },
      { q: "हे मोफत आहे का?", a: "हो — सर्व टेम्पलेट आणि डाउनलोड 100% मोफत, वॉटरमार्क नाही, नोंदणी नाही." },
    ],
  },
  {
    slug: "hindi-biodata-maker",
    h1: "Hindi Biodata Maker — 5 मिनट में शादी का बायोडाटा",
    title: "Hindi Biodata Maker — Free हिन्दी विवाह बायोडाटा",
    description: "हिन्दी में सुंदर विवाह बायोडाटा बनाएँ. 20+ पारंपरिक टेम्पलेट, सही Devanagari फॉन्ट, HD डाउनलोड. 100% मुफ़्त, कोई साइनअप नहीं.",
    intro: "व्यक्तिगत विवरण, पारिवारिक विवरण, अपेक्षाएँ और संपर्क — सही हिन्दी शब्दों के साथ एक पेज में. फोटो लगाएँ, टेम्पलेट चुनें, WhatsApp पर भेजें.",
    points: ["सही हिन्दी लेबल: व्यक्तिगत विवरण, पारिवारिक विवरण", "॥ श्री गणेशाय नमः ॥ सहित पारंपरिक शीर्षक", "A4 प्रिंट के लिए HD PNG", "मोबाइल पर 5 मिनट में तैयार"],
    faq: [
      { q: "हिन्दी बायोडाटा में क्या लिखें?", a: "नाम, जन्मतिथि, आयु, ऊंचाई, शिक्षा, व्यवसाय, परिवार, अपेक्षाएँ और संपर्क — हर बिंदु एक पंक्ति में।" },
      { q: "क्या यह मुफ़्त है?", a: "हाँ — सभी टेम्पलेट और डाउनलोड 100% मुफ़्त, कोई वॉटरमार्क नहीं।" },
    ],
  },
  {
    slug: "biodata-for-marriage-girl",
    h1: "Marriage Biodata for Girls — Elegant & Respectful Format",
    title: "Biodata for Marriage (Girl) — Free Templates & Samples",
    description: "Create a graceful biodata for girls with the right format: personal, education, family & expectations. 20+ free templates, HD download.",
    intro: "A one-page profile families love: clear photo, education & occupation, family background, and 2–3 lines of partner expectations. Choose a soft, elegant design.",
    points: ["Samples for Hindu, Muslim & Christian formats", "Photo + family sections done right", "Expectations wording that sounds respectful", "Print-ready A4 + WhatsApp sharing"],
    faq: [
      { q: "What photo suits a girl's biodata?", a: "Recent, well-lit, front-facing photo in traditional or neat formal wear with a plain background. Avoid filters." },
      { q: "How long should expectations be?", a: "Two to three lines — age range, education, location. Keep it warm and open." },
    ],
  },
  {
    slug: "biodata-for-marriage-boy",
    h1: "Marriage Biodata for Boys — Professional Format",
    title: "Biodata for Marriage (Boy) — Free Templates & Samples",
    description: "Create a sharp biodata for boys: education, job, income, family & expectations in one page. 20+ free templates, HD download.",
    intro: "Highlight education, occupation and family clearly. One page, verified phone number, and a confident recent photo build instant trust.",
    points: ["Job/income shown tastefully in one line", "Family background with native place", "Partner expectations in 2–3 lines", "Dark classic or minimal modern designs"],
    faq: [
      { q: "Should income be mentioned?", a: "One line is enough (e.g. Software Engineer, ₹12 LPA, Pune). Avoid payslips or exact breakup." },
      { q: "Which template for boys?", a: "Classic Maroon or Minimal Ivory — both look professional in print and on mobile." },
    ],
  },
];

export function generateStaticParams() {
  return LANDINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = LANDINGS.find((x) => x.slug === slug);
  if (!l) return { title: "Not found", robots: { index: false, follow: false } };
  return {
    title: l.title,
    description: l.description,
    alternates: { canonical: `/${l.slug}` },
    openGraph: { title: l.title, description: l.description, url: `https://onlinefreebiodata.com/${l.slug}`, type: "website" },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = LANDINGS.find((x) => x.slug === slug);
  if (!l) notFound();
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900">Home</Link> / <span className="text-slate-900 font-medium">{l.slug}</span>
        </nav>
        <h1 className="text-3xl md:text-[40px] font-semibold tracking-tight leading-tight">{l.h1}</h1>
        <p className="mt-4 text-slate-600 text-[16px] leading-relaxed">{l.intro}</p>
        <ul className="mt-6 space-y-2.5">
          {l.points.map((p) => (
            <li key={p} className="flex gap-2.5 text-[15px] text-slate-700"><span className="mt-0.5 w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0"><Check className="w-3 h-3" strokeWidth={3} /></span>{p}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/#create" className="inline-flex h-12 items-center justify-center gap-2 px-8 rounded-full bg-slate-900 text-white font-semibold hover:bg-rose-900 transition">Create free now <ArrowRight className="w-4 h-4" /></Link>
          <Link href="/templates" className="inline-flex h-12 items-center justify-center px-8 rounded-full border border-slate-300 font-semibold hover:border-slate-900 transition">Browse templates</Link>
        </div>
        <h2 className="mt-12 text-2xl font-semibold tracking-tight">Questions</h2>
        <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
          {l.faq.map((f) => (
            <div key={f.q} className="py-5">
              <h3 className="font-semibold text-[15.5px]">{f.q}</h3>
              <p className="mt-1.5 text-[14.5px] text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      <FooterPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: l.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />
    </main>
  );
}
