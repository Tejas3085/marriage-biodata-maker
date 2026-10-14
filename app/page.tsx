import type { Metadata } from "next";
import HomePage from "./components/HomePage";

const SITE_URL = "https://onlinefreebiodata.com";

export const metadata: Metadata = {
  title: "Free Marriage Biodata Maker Online — 20+ Templates (Hindi, Marathi, English)",
  description:
    "Create a beautiful marriage biodata in 5 minutes. Choose from 20+ traditional & modern templates in English, Hindi & Marathi. 100% free, no signup, HD PNG download.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Free Marriage Biodata Maker Online — 20+ Templates",
    description:
      "Traditional & modern marriage biodata templates in Hindi, Marathi & English. Free, private, print-ready.",
    url: SITE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/Images/m1.png`, width: 1200, height: 630, alt: "Marriage biodata maker templates" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marriage Biodata Maker Online",
    description: "20+ biodata templates in Hindi, Marathi & English. Free, no signup.",
    images: [`${SITE_URL}/Images/m1.png`],
  },
};

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
