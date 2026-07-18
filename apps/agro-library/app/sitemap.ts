import type { MetadataRoute } from "next";
import { canonicalUrl } from "@book-landings/landing-seo";
import { allBooks } from "../data/catalog";
import { agroLibrarySiteConfig } from "../site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: canonicalUrl(agroLibrarySiteConfig, "/"),
      lastModified: new Date("2026-07-18"),
      changeFrequency: "monthly",
      priority: 0.3
    },
    ...allBooks.map((book) => ({
      url: canonicalUrl(agroLibrarySiteConfig, `/books/${book.slug}`),
      lastModified: new Date("2026-07-18"),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
