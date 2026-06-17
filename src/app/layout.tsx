import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { COMPANY_NAME } from "@/lib/company";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://secuvic.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SecuVIC | Chauffeur Privé Mercedes Classe V | Cannes, Monaco, Paris",
  description:
    `SecuVIC — service premium de ${COMPANY_NAME}. Chauffeur privé Mercedes Classe V. Sécurité, discrétion et mise à disposition pour invités VIC à Cannes, Monaco et Paris.`,
  openGraph: {
    title: "SecuVIC | Chauffeur Privé Mercedes Classe V",
    description: "Sécurité & Prestige — Cannes, Monaco, Paris",
    url: siteUrl,
    siteName: "SecuVIC",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/logo-secuvic.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: "SecuVIC | Chauffeur Privé",
    description: "Mercedes Classe V — Cannes, Monaco, Paris",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/logo-secuvic.png",
    apple: "/images/logo-secuvic.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-black text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold-500 focus:text-black"
        >
          Aller au contenu
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
