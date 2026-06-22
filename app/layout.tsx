import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jacky Xue · WeChat Pay for Vancouver Merchants — 1% Fees",
  description:
    "Accept WeChat Pay in Vancouver at a flat 1% transaction fee, powered by IOTPay in Canada. Plus a rebate on your first $2,000 in fees. Estimate your savings and get started.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "WeChat Pay for Vancouver Merchants — 1% Fees",
    description:
      "Flat 1% WeChat Pay acceptance in Vancouver, powered by IOTPay. Rebate on your first $2,000 in fees.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
