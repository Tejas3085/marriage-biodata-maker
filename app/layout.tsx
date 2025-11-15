import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./hooks/useLanguage";

export const metadata: Metadata = {
  title: "Marriage Biodata Maker",
  description: "Create beautiful marriage biodata in multiple languages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
