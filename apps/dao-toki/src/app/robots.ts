import type { MetadataRoute } from 'next';
import { canonicalUrl } from '@book-landings/landing-seo';
import { daoTokiSiteConfig } from '@/site.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/', '/api/'],
    },
    sitemap: canonicalUrl(daoTokiSiteConfig, '/sitemap.xml'),
  };
}
