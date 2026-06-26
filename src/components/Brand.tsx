import { Fragment } from "react";
import { SERVICE_NAME } from "@/lib/company";

/**
 * Affiche le nom de marque « VICD » dans la police du logo (Playfair Display),
 * quelle que soit la typographie du texte environnant.
 */
export function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif tracking-[0.04em] ${className}`}>{SERVICE_NAME}</span>
  );
}

/**
 * Restitue une chaîne de texte en remplaçant chaque occurrence de « VICD »
 * par le composant <Brand /> (police du logo).
 */
export function withBrand(text: string) {
  const parts = text.split(SERVICE_NAME);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <Brand />}
    </Fragment>
  ));
}
