import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  createDoorpassToken,
  verifyDoorpassToken,
  DOORPASS_COOKIE_NAME,
  DOORPASS_PENDING_COOKIE_NAME,
  DOORPASS_PENDING_COOKIE_OPTIONS,
  DOORPASS_PENDING_USER_ID,
} from "@/lib/doorpass";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/login") {
    const doorpassInput = request.nextUrl.searchParams.get("doorpass");
    if (doorpassInput === null) {
      return NextResponse.next();
    }

    const configuredDoorpass = process.env.ADMIN_DOORPASS?.trim();
    if (!configuredDoorpass || doorpassInput !== configuredDoorpass) {
      const invalidUrl = new URL("/login?error=invalid", request.url);
      const response = NextResponse.redirect(invalidUrl);
      response.cookies.delete(DOORPASS_PENDING_COOKIE_NAME);
      response.headers.set("Referrer-Policy", "no-referrer");
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    const token = await createDoorpassToken(DOORPASS_PENDING_USER_ID, 60 * 5);
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.set(
      DOORPASS_PENDING_COOKIE_NAME,
      token,
      DOORPASS_PENDING_COOKIE_OPTIONS
    );
    response.headers.set("Referrer-Policy", "no-referrer");
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  const isAdminLogin = pathname === "/admin/login";
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isDashboardRoute =
    pathname === "/dashboard/admin" || pathname.startsWith("/dashboard/admin/");
  const isProtectedRoute = isAdminRoute || isDashboardRoute;

  const pendingDoorpass = request.cookies.get(
    DOORPASS_PENDING_COOKIE_NAME
  )?.value;
  const hasPassedDoorpass = await verifyDoorpassToken(
    pendingDoorpass,
    DOORPASS_PENDING_USER_ID
  );

  if (isAdminLogin && !hasPassedDoorpass) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (isAdminLogin) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  let supabaseResponse = NextResponse.next({ request });
  const normalizedUrl = supabaseUrl
    .replace(/\/$/, "")
    .replace(/\/rest\/v1$/, "")
    .trim();

  const supabase = createServerClient(normalizedUrl, supabaseKey.trim(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const doorpassToken = request.cookies.get(DOORPASS_COOKIE_NAME)?.value;
  const hasAdminDoorpass = user
    ? await verifyDoorpassToken(doorpassToken, user.id)
    : false;

  if (isAdminLogin) {
    if (user && hasAdminDoorpass) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
    return supabaseResponse;
  }

  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (!hasAdminDoorpass) {
    return NextResponse.redirect(
      new URL(hasPassedDoorpass ? "/admin/login" : "/login", request.url)
    );
  }

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/login",
    "/admin",
    "/admin/:path*",
    "/dashboard/admin",
    "/dashboard/admin/:path*",
  ],
};