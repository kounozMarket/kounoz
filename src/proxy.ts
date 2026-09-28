import { NextResponse, type NextRequest } from "next/server";

/**
 * Maintenance mode (D-26). Runs on the Node.js runtime, so env vars are read at
 * request time: switch on Hostinger without a code change (restart the app).
 *
 * - MAINTENANCE_MODE: "off" → site live. Anything else / unset → maintenance ON
 *   (default until launch).
 * - MAINTENANCE_BYPASS_TOKEN: secret (≥ 12 chars). Opening any URL with
 *   `?preview=<token>` sets a cookie and shows the real site to that browser.
 *
 * Visitors get the /maintenance page with HTTP 503 + Retry-After (temporary, SEO-safe).
 */
const COOKIE = "km-preview";
const MAINTENANCE_PATH = "/maintenance";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const on = process.env.MAINTENANCE_MODE !== "off";
  const token = process.env.MAINTENANCE_BYPASS_TOKEN ?? "";
  const tokenValid = token.length >= 12;

  if (!on) {
    // Site live: the maintenance page itself is not reachable.
    return pathname === MAINTENANCE_PATH ? NextResponse.redirect(new URL("/", request.url)) : NextResponse.next();
  }

  // Preview link: ?preview=<token> → set cookie, then redirect to the clean URL.
  if (tokenValid && searchParams.get("preview") === token) {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete("preview");
    const res = NextResponse.redirect(clean);
    res.cookies.set(COOKIE, token, {
      httpOnly: true,
      secure: request.nextUrl.protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  if (tokenValid && request.cookies.get(COOKIE)?.value === token) return NextResponse.next();

  if (pathname === MAINTENANCE_PATH) return NextResponse.next();

  const res = NextResponse.rewrite(new URL(MAINTENANCE_PATH, request.url), { status: 503 });
  res.headers.set("Retry-After", "86400");
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = {
  // Everything except Next assets, image optimisation and files with an extension (icon.png, fonts…).
  matcher: ["/((?!_next/static|_next/image|.*\\.[a-zA-Z0-9]+$).*)"],
};
