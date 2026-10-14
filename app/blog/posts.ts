export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  body: { h: string; p: string[] }[];
}

export const POSTS: Post[] = [
  {
    slug: "marriage-biodata-format",
    title: "Marriage Biodata Format: Exact Sections That Work in 2026",
    excerpt: "The one-page structure families expect — personal, family, expectations & contact — with copy-paste wording.",
    category: "Format",
    readTime: "5 min",
    date: "2026-09-20",
    body: [
      { h: "The proven one-page order", p: ["Auspicious header → personal details → education & occupation → family → expectations → contact. Keep each row to one line.", "Use the same label widths throughout so the page scans fast. Our templates handle this automatically."] },
      { h: "What to leave out", p: ["Salary slips, Aadhaar numbers, and long kundli paragraphs. Keep horoscope to rashi/nakshatra/gotra in one line unless the family asks for more.", "Avoid photos with filters — they reduce trust."] },
    ],
  },
  {
    slug: "marathi-biodata-tips",
    title: "Marathi Biodata: Correct Wordings (वैयक्तिक, कौटुंबिक माहिती)",
    excerpt: "Proper Marathi labels, auspicious lines and a sample mulga/mulgi layout that feels respectful.",
    category: "Marathi",
    readTime: "4 min",
    date: "2026-09-28",
    body: [
      { h: "Key Marathi labels", p: ["वैयक्तिक माहिती (personal), कौटुंबिक माहिती (family), अपेक्षा (expectations), संपर्क (contact). Start with ॥ श्री गणेशाय नमः ॥.", "Use Devanagari numerals consistently — don't mix २४ and 24."] },
      { h: "Sample opening", p: ["नाव, जन्मतारीख, वय, उंची, शिक्षण, नोकरी, कुटुंब, अपेक्षा, संपर्क — one line each. Try our Marathi maker for correct fonts."] },
    ],
  },
  {
    slug: "hindi-biodata-tips",
    title: "Hindi Biodata: सही प्रारूप और शब्दावली",
    excerpt: "व्यक्तिगत विवरण, पारिवारिक विवरण और अपेक्षाएँ — सही हिंदी शब्दों के साथ sample format.",
    category: "Hindi",
    readTime: "4 min",
    date: "2026-10-02",
    body: [
      { h: "सही शीर्षक", p: ["॥ श्री गणेशाय नमः ॥ से शुरुआत करें। फिर व्यक्तिगत विवरण, शिक्षा एवं व्यवसाय, पारिवारिक विवरण, अपेक्षाएँ, संपर्क।", "फोटो साफ, हाल की और सादी पृष्ठभूमि वाली रखें।"] },
      { h: "छोटी गलतियाँ", p: ["नाम और फोन नंबर दो बार जाँचें। एक पेज से ज़्यादा न लिखें।"] },
    ],
  },
  {
    slug: "biodata-photo-mistakes",
    title: "7 Biodata Photo Mistakes That Get You Rejected",
    excerpt: "Blurry selfies to sunglasses — fix these in 2 minutes and look trustworthy instantly.",
    category: "Photo",
    readTime: "3 min",
    date: "2026-10-08",
    body: [
      { h: "The 7 mistakes", p: ["1) Old photos 2) Sunglasses 3) Group crops 4) Heavy filters 5) Dark rooms 6) Casual beachwear 7) Blurry WhatsApp forwards.", "Fix: daylight, plain wall, front-facing, shoulders-up, gentle smile — then export fresh HD PNG."] },
    ],
  },
];
