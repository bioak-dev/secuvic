import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "SecuVIC | Chauffeur Privé Mercedes Classe V | Cannes, Monaco, Paris",
  description: "SecuVIC — Réservation de chauffeur privé en Mercedes Classe V noir. Sécurité, discrétion et mise à disposition spécialisée pour invités VIC (Very Important Client) à Cannes, Monaco et Paris.",
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
        {children}
      </body>
    </html>
  );
}
