import type { Viewport } from "next";
import { Archivo, Fraunces, Geist_Mono, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationJsonLd, personJsonLd, rootMetadata } from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = rootMetadata;

export const viewport: Viewport = { themeColor: "#0d0b0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${fraunces.variable} ${inter.variable} ${geistMono.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <JsonLd data={personJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body className="bg-bg font-sans text-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-text focus:px-5 focus:py-3 focus:text-bg"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
