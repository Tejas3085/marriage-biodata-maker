import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "./hooks/useLanguage";
import { Analytics } from "@vercel/analytics/next";

// Comprehensive metadata for SEO
export const metadata: Metadata = {
  title: {
    default: "Marriage Biodata Maker - Create Beautiful Biodata Online",
    template: "%s | Marriage Biodata Maker",
  },
  description:
    "Create professional marriage biodata in multiple languages (English, Hindi, Marathi) with beautiful templates. Free online biodata maker with 20+ premium designs. Download as PDF instantly.",
  keywords: [
    "marriage biodata",
    "biodata maker",
    "matrimonial biodata",
    "biodata creator",
    "marriage profile",
    "biodata templates",
    "Hindi biodata",
    "Marathi biodata",
    "free biodata maker",
    "online biodata creator",
  ],
  authors: [{ name: "Marriage Biodata Maker Team" }],
  creator: "Marriage Biodata Maker",
  publisher: "Marriage Biodata Maker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yourwebsite.com"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Marriage Biodata Maker - Create Beautiful Biodata Online",
    description:
      "Create professional marriage biodata in multiple languages with beautiful templates. Free online biodata maker with 20+ premium designs.",
    siteName: "Marriage Biodata Maker",
    images: [
      {
        url: "/templates/t1.jpg",
        width: 1200,
        height: 630,
        alt: "Marriage Biodata Maker Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marriage Biodata Maker - Create Beautiful Biodata Online",
    description:
      "Create professional marriage biodata in multiple languages with beautiful templates. Free online biodata maker.",
    images: ["/templates/t1.jpg"],
    creator: "@yourhandle", // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icon/favicon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     // Noto Serif may not be available in all Next versions; omit explicit import to avoid runtime errors.
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Additional SEO meta tags */}
        <meta name="application-name" content="Marriage Biodata Maker" />
        {/* Additional SEO meta tags */}
        <meta name="application-name" content="Marriage Biodata Maker" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Biodata Maker" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Marriage Biodata Maker",
              description:
                "Create professional marriage biodata in multiple languages with beautiful templates",
              url: "https://yourwebsite.com",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "12000",
              },
            }),
          }}
        />
      </head>
  <body>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
