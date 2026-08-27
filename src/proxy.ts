import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "ar"] as const;
const DEFAULT_LOCALE = "en";

/**
 * Every route lives under `/{locale}`. Anything that arrives without one is
 * redirected, using the Accept-Language header as a hint.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header.toLowerCase().startsWith("ar") ? "ar" : DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /* Everything except Next internals, the API surface and static files. */
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};
