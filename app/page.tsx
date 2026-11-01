import type { Metadata } from "next";
import HomePage from "./components/HomePage";

const SITE_URL = "https://onlinefreebiodata.com";

export const metadata: Metadata = {
  title: "Free Marriage Biodata Maker | PDF & PNG, No Signup",
  description:
    "Create a marriage biodata online with free templates. Add your details, choose from 9 languages, and download a print-ready PDF or PNG—no signup required.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Free Marriage Biodata Maker | PDF & PNG, No Signup",
    description:
      "Make a marriage biodata with traditional and modern templates. Choose from 9 languages and download a print-ready PDF or PNG, free with no signup.",
    url: SITE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/Images/m1.png`, width: 1200, height: 1900, alt: "Online Free Marriage Biodata Maker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Marriage Biodata Maker | PDF & PNG, No Signup",
    description: "Free marriage biodata templates in 9 languages. Create online and download a print-ready PDF or PNG with no signup.",
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
