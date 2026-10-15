import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari, Noto_Sans_Tamil, Noto_Sans_Telugu, Noto_Sans_Bengali, Noto_Sans_Gujarati, Noto_Sans_Kannada, Noto_Sans_Gurmukhi, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./hooks/useLanguage";
import { Analytics } from "@vercel/analytics/next";

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
});
// One Noto family per supported Indic script. Browsers download each file
// lazily (unicode-range), so unused scripts cost ~0 bytes until selected.
const notoTamil = Noto_Sans_Tamil({ subsets: ["tamil"], weight: ["400", "500", "600", "700"], variable: "--font-noto-tamil", display: "swap" });
const notoTelugu = Noto_Sans_Telugu({ subsets: ["telugu"], weight: ["400", "500", "600", "700"], variable: "--font-noto-telugu", display: "swap" });
const notoBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"], variable: "--font-noto-bengali", display: "swap" });
const notoGujarati = Noto_Sans_Gujarati({ subsets: ["gujarati"], weight: ["400", "500", "600", "700"], variable: "--font-noto-gujarati", display: "swap" });
const notoKannada = Noto_Sans_Kannada({ subsets: ["kannada"], weight: ["400", "500", "600", "700"], variable: "--font-noto-kannada", display: "swap" });
const notoGurmukhi = Noto_Sans_Gurmukhi({ subsets: ["gurmukhi"], weight: ["400", "500", "600", "700"], variable: "--font-noto-gurmukhi", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
// Only weights actually used (400 numerals, 500 hero italic, 600 headings) —
// the default would download all 6 Playfair weights.
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-playfair", display: "swap" });

const SITE_URL = "https://onlinefreebiodata.com";
const SITE_NAME = "Online Free Biodata Maker";
const OG_IMAGE = `${SITE_URL}/Images/m1.png`;

// Comprehensive metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free Marriage Biodata Maker — 20+ Hindi, Marathi & English Templates",
    template: "%s | Online Free Biodata Maker",
  },
  description:
    "Create a beautiful marriage biodata in 5 minutes. 20+ traditional & modern templates in English, Hindi & Marathi. Free, no signup, HD download.",
  keywords: [
    "marriage biodata maker",
    "free biodata maker",
    "marriage biodata online",
    "biodata maker online free",
    "matrimonial biodata",
    "marriage biodata format",
    "hindi biodata maker",
    "marathi biodata maker",
    "marriage biodata templates",
    "biodata for marriage",
    "hindu marriage biodata",
    "muslim marriage biodata",
    "online free biodata",
  ],
  authors: [{ name: "Online Free Biodata Maker Team", url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Matrimonial",
  classification: "Marriage biodata creator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN", "mr_IN"],
    url: "/",
    title: "Free Marriage Biodata Maker — 20+ Templates",
    description:
      "Create professional marriage biodata in multiple languages with beautiful templates. Free online biodata maker with 20+ premium designs.",
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 1900,
        alt: "Marriage biodata templates preview — free online maker",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marriage Biodata Maker — 20+ Templates",
    description:
      "Create a beautiful marriage biodata in 5 minutes. Hindi, Marathi & English. Free, no signup, HD download.",
    images: [OG_IMAGE],
    creator: "@biodatamaker",
    site: "@biodatamaker",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icon/favicon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Biodata Maker",
  },
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#4c0519" },
  ],
};

function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon/favicon.png`,
        },
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["en", "hi", "mr"],
      },
      {
        "@type": "WebApplication",
        name: SITE_NAME,
        description:
          "Free online tool to create professional marriage biodatas in English, Hindi and Marathi with 20+ templates.",
        url: SITE_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        // NOTE: aggregateRating removed deliberately — Google penalizes
        // ratings that don't come from real on-site reviews. Re-add only
        // after collecting genuine user reviews with a visible review section.
      },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </head>
      <body className={`${notoDevanagari.variable} ${notoTamil.variable} ${notoTelugu.variable} ${notoBengali.variable} ${notoGujarati.variable} ${notoKannada.variable} ${notoGurmukhi.variable} ${outfit.variable} ${playfair.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
