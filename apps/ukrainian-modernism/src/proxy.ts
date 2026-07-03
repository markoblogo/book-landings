import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'uk'] as const;
const defaultLocale = 'fr';

type Locale = (typeof locales)[number];

function getLocaleFromPathname(pathname: string): Locale {
  const first = pathname.split('/')[1];
  return (locales as readonly string[]).includes(first) ? (first as Locale) : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Preserve the old request header behavior for localized page requests.
  const lang = getLocaleFromPathname(pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-lang', lang);

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Only run on page URLs:
    // - skip Next internals
    // - skip API
    // - skip any path that looks like a file (has a dot), e.g. /robots.txt, /og/og-fr.jpg
    '/((?!_next|api|.*\\..*).*)',
  ],
};
