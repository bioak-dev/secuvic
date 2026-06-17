import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace Client",
  description: "Suivez en temps réel la géolocalisation de vos invités VIC à Cannes, Monaco et Paris.",
  robots: { index: false, follow: false },
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
