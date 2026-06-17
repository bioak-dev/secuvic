import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace Client | SecuVIC",
  description: "Suivez en temps réel la géolocalisation de vos invités VIC.",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
