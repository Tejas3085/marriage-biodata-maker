import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Marriage Biodata — Fill Details Online (Free)",
  description:
    "Fill your personal, family, education & contact details to generate a professional marriage biodata. Supports Hindi, Marathi & English. Free, private — data stays in your browser.",
  alternates: { canonical: "/Biodata-Form" },
  openGraph: {
    title: "Create Marriage Biodata Online — Free Form",
    description: "Guided biodata form with photo upload, custom fields & god images. Hindi, Marathi & English.",
    url: "https://onlinefreebiodata.com/Biodata-Form",
    type: "website",
  },
};

export default function BiodataFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
