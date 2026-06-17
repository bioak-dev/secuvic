import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/client/login`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/mentions-legales`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/politique-confidentialite`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
