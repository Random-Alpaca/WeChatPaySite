import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

export const metadata: Metadata = {
  title: "Jacky Xue · WeChat Pay & Alipay for Vancouver Merchants — 1% Fees",
  description:
    "Accept WeChat Pay and Alipay in Vancouver at a flat 1% transaction fee, powered by IOTPay in Canada. Plus your first $2,000 in volume processed fee-free. Estimate your savings and get started.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "WeChat Pay & Alipay for Vancouver Merchants — 1% Fees",
    description:
      "Flat 1% WeChat Pay and Alipay acceptance in Vancouver, powered by IOTPay. First $2,000 in volume fee-free.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
