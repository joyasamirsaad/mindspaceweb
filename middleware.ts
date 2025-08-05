// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const languages = ['en', 'ar'];
const defaultLang = 'en';

function getLang(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language');
  if (!acceptLang) return defaultLang;

  const matched = acceptLang
    .split(',')
    .map(l => l.split(';')[0].trim())
    .find(lang => languages.includes(lang));

  return matched || defaultLang;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLangPrefix = languages.some(
    lang => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );

  if (hasLangPrefix) {
    return NextResponse.next();
  }

  const lang = getLang(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|robots.txt).*)',
  ],
};
