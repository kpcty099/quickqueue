import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Remote AI Jobs",
    template: "%s | Remote AI Jobs"
  },
  description:
    "Curated remote AI training, expert evaluation, annotation, and data work opportunities.",
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4721017051634152"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
        <div className="flex justify-center my-8">
          <ins className="adsbygoogle"
            style={{ display: "block", minWidth: "300px", minHeight: "100px" }}
            data-ad-client="ca-pub-4721017051634152"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
        <Script id="adsense-init" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </body>
    </html>
  );
}
