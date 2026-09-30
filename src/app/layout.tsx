import type { Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Ifeanyi Onyekwelu — Full-Stack Engineer · AI Integration",
  description:
    "Full-stack engineer with 5+ years building production web platforms, scalable backend systems, and AI-integrated products for fintech, SaaS, and education teams.",
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#f3ede3" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-paper font-sans text-ink antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
