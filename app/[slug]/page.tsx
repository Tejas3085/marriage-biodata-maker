import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageClient, { LandingData } from "../components/LandingPageClient";

const LANDINGS: LandingData[] = [
  {
    slug: "marathi-biodata-maker",
    lang: "mr",
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
    lang: "hi",
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
    lang: "en",
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
    lang: "en",
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
  {
    slug: "gujarati-biodata-maker",
    lang: "gu",
    h1: "Gujarati Biodata Maker — ગુજરાતી લગ્ન બાયોડેટા",
    title: "Gujarati Biodata Maker — Free લગ્ન બાયોડેટા ફોર્મેટ",
    description: "ગુજરાતીમાં સુંદર લગ્ન બાયોડેટા બનાવો. 20+ પરંપરાગત નમૂના, શુદ્ધ ગુજરાતી ફોન્ટ્સ, HD ડાઉનલોડ. 100% મફત, સાઇનઅપ વિના.",
    intro: "વ્યક્તિગત માહિતી, કૌટુંબિક માહિતી, અપેક્ષાઓ અને સંપર્ક — સાચા ગુજરાતી શબ્દો સાથે એક જ પાનામાં. ફોટો ઉમેરો, ડિઝાઇન પસંદ કરો અને WhatsApp પર શેર કરો.",
    points: ["શુદ્ધ ગુજરાતી લેબલ: વ્યક્તિગત માહિતી, પારિવારિક વિગત", "॥ શ્રી ગણેશાય નમઃ ॥ સાથે પરંપરાગત શીર્ષક", "A4 પ્રિન્ટ અને WhatsApp માટે HD ડાઉનલોડ", "મોબાઇલ પર 5 મિનિટમાં તૈયાર"],
    faq: [
      { q: "ગુજરાતી બાયોડેટામાં શું લખવું?", a: "નામ, જન્મ તારીખ, સમય, ઊંચાઈ, શિક્ષણ, વ્યવસાય, મોસાળ પક્ષ, કૌટુંબિક વિગત અને સંપર્ક." },
      { q: "શું આ સેવા મફત છે?", a: "હા — તમામ ટેમ્પ્લેટ્સ અને ડાઉનલોડ 100% મફત છે, કોઈ વૉટરમાર્ક નથી." },
    ],
  },
  {
    slug: "bengali-biodata-maker",
    lang: "bn",
    h1: "Bengali Biodata Maker — বাংলা বিবাহ বায়োডাটা",
    title: "Bengali Biodata Maker — Free বিবাহের বায়োডাটা ফরম্যাট",
    description: "বাংলায় সুন্দর বিবাহের বায়োডাটা তৈরি করুন। ২০+ ঐতিহ্যবাহী টেমপ্লেট, সঠিক বাংলা ফন্ট, HD ডাউনলোড। ১০০% বিনামূল্যে।",
    intro: "ব্যক্তিগত তথ্য, পারিবারিক বিবরণ এবং যোগাযোগের ঠিকানা — সঠিক বাংলা শব্দে এক পৃষ্ঠায়। ছবি আপলোড করুন এবং সহজেই ডাউনলোড করুন।",
    points: ["সঠিক বাংলা লেবেল: ব্যক্তিগত ও পারিবারিক বিবরণ", "শ্রী শ্রী প্রজাপতয়ে নমঃ সহ ঐতিহ্যবাহী শিরোনাম", "A4 প্রিন্ট এবং WhatsApp শেয়ারিংয়ের জন্য উপযুক্ত", "মোবাইলে ৫ মিনিটে তৈরি"],
    faq: [
      { q: "বাংলা বায়োডাটাতে কী কী তথ্য দিতে হয়?", a: "নাম, জন্মতারিখ, সময়, উচ্চতা, শিক্ষাগত যোগ্যতা, চাকরি, পরিবারের বিবরণ ও মোবাইল নম্বর।" },
      { q: "এটি কি সম্পূর্ণ বিনামূল্যে?", a: "হ্যাঁ — সমস্ত ডিজাইন ও ডাউনলোড ১০০% বিনামূল্যে, কোনো জলছাপ নেই।" },
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
  return <LandingPageClient landing={l} />;
}
