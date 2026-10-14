import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview & Download Biodata",
  description: "Preview your marriage biodata and download it in high quality.",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
