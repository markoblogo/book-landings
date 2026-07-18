import type { MetadataRoute } from "next";
import { canonicalUrl } from "@book-landings/landing-seo";
import { agroLibrarySiteConfig } from "../site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: canonicalUrl(agroLibrarySiteConfig, "/"),
      lastModified: new Date("2026-07-18"),
      changeFrequency: "monthly",
      priority: 0.3
    }
  ];
}
