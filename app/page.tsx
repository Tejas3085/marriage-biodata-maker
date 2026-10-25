import type { Metadata } from "next";
import HomePage from "./components/HomePage";

const SITE_URL = "https://onlinefreebiodata.com";

export const metadata: Metadata = {
  title: "Online Free Biodata Maker — Marriage Biodata PDF (No Signup)",
  description:
    "Create a beautiful marriage biodata in 5 minutes with 20+ templates. English, Hindi & Marathi. Instant HD PDF & PNG download. 100% free, no signup required.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Online Free Biodata Maker — Marriage Biodata PDF (No Signup)",
    description:
      "Create your marriage biodata in 5 minutes with 20+ traditional & modern templates. Instant PDF & HD download. Free, no signup required.",
    url: SITE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/Images/m1.png`, width: 1200, height: 1900, alt: "Online Free Marriage Biodata Maker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Free Biodata Maker — Marriage Biodata PDF (No Signup)",
    description: "20+ biodata templates in English, Hindi & Marathi. Free, no signup, instant PDF download.",
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
