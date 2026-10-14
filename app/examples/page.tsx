import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Marriage Biodata Examples & Samples (Free)",
  description:
    "See sample marriage biodatas for boys & girls in English, Hindi and Marathi. Copy the format you like and create your own free biodata in minutes.",
  alternates: { canonical: "/examples" },
};

const SAMPLES = [
  { title: "Hindu Boy Biodata — English", lines: ["Name: Aarav Sharma, 27 yrs, 5'9\"", "Education: B.Tech, Software Engineer, Pune", "Family: Father — Bank Manager; Mother — Teacher; 1 sister (married)", "Expectation: Educated bride, 23–26, Pune/Mumbai"] },
  { title: "Marathi Mulgi Biodata — मराठी", lines: ["नाव: स्नेहा पाटील, वय २४, उंची ५'४\"", "शिक्षण: M.Com, पुणे येथे अकाउंटंट", "कुटुंब: वडील — शेतकरी; आई — गृहिणी; १ भाऊ", "अपेक्षा: सुशिक्षित स्थळ, पुणे परिसर"] },
  { title: "Hindi Biodata — हिन्दी", lines: ["नाम: Priya Verma, आयु 25, ऊंचाई 5'5\"", "शिक्षा: B.Ed, लखनऊ में शिक्षिका", "परिवार: पिता — व्यापारी; माता — गृहिणी", "अपेक्षा: सुशिक्षित वर, उत्तर प्रदेश"] },
];

export default function ExamplesPage() {
  return (
    <main className="bg-white text-slate-900">
      <Header />
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500 mb-4">
          <Link href="/" className="hover:text-slate-900">Home</Link> <span aria-hidden> / </span> <span className="text-slate-900 font-medium">Examples</span>
        </nav>
        <h1 className="text-3xl md:text-[40px] font-semibold tracking-tight">Marriage biodata samples</h1>
        <p className="mt-3 text-slate-600 text-[15.5px]">Copy the structure you like, then generate your own with photos and proper formatting. Need a dedicated format? See our <Link href="/biodata-for-marriage-girl" className="text-rose-800 font-medium hover:underline">biodata for girls</Link> and <Link href="/biodata-for-marriage-boy" className="text-rose-800 font-medium hover:underline">biodata for boys</Link> guides.</p>
        <div className="mt-8 grid md:grid-cols-1 gap-5">
          {SAMPLES.map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-200 p-6 md:p-7">
              <h2 className="font-semibold text-[17px]">{s.title}</h2>
              <ul className="mt-3 space-y-1.5 text-[14.5px] text-slate-600">
                {s.lines.map((l) => <li key={l} className="flex gap-2"><span className="text-slate-300">•</span>{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/#create" className="inline-flex h-12 items-center gap-2 px-8 rounded-full bg-slate-900 text-white font-semibold hover:bg-rose-900 transition">Create mine free <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
      <FooterPage />
    </main>
  );
}
