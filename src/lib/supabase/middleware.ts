import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Do NOT run code between createServerClient and supabase.auth.getUser()
  // A simple mistake could make it hard to debug authentication issues.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define public paths that don't require authentication
  const publicPaths = ["/auth/login", "/auth/callback"];
  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If user is not authenticated and trying to access a protected route
  if (!user && !isPublicPath && request.nextUrl.pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // If user is authenticated and trying to access login page, redirect to /plans
  if (user && request.nextUrl.pathname === "/auth/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/plans";
    return NextResponse.redirect(url);
  }

  // Handle root redirect based on auth status
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = user ? "/plans" : "/auth/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
