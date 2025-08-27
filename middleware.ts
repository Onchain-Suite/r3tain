import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prismaEdge } from "@/lib/prisma-edge";
import { stackServerApp } from "@/lib/stack";

// Define route patterns
const publicRoutes = ["/"];
const authRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/callback",
];
const protectedRoutes = [
  "/dashboard",
  "/campaigns",
  "/automation",
  "/analytics",
  "/community",
  "/notifications",
  "/billing",
  "/profile",
  "/settings",
  "/onboarding",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and static files
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/")
  ) {
    return NextResponse.next();
  }

  try {
    // Get user from Stack Auth
    const user = await stackServerApp.getUser();

    // Handle auth routes
    if (authRoutes.includes(pathname)) {
      if (user) {
        // Check if user needs onboarding
        try {
          const userProfile = await prismaEdge.userProfile.findUnique({
            where: { id: user.id },
            select: { onboardingCompleted: true, createdAt: true },
          });

          // If no profile exists or user is new and hasn't completed onboarding
          if (!userProfile) {
            return NextResponse.redirect(new URL("/onboarding", req.url));
          }

          const isRecentSignup =
            Date.now() - userProfile.createdAt.getTime() < 24 * 60 * 60 * 1000;
          if (isRecentSignup && !userProfile.onboardingCompleted) {
            return NextResponse.redirect(new URL("/onboarding", req.url));
          }

          // Existing user, redirect to dashboard
          return NextResponse.redirect(new URL("/dashboard", req.url));
        } catch (dbError) {
          // If database error, default to dashboard
          console.error("Database error in middleware:", dbError);
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
      // User is not authenticated, allow access to auth routes
      return NextResponse.next();
    }

    // Handle protected routes
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      if (!user) {
        // User is not authenticated, redirect to sign in
        const redirectUrl = new URL("/auth/signin", req.url);
        redirectUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(redirectUrl);
      }

      // Special handling for onboarding route
      if (pathname === "/onboarding") {
        try {
          const userProfile = await prismaEdge.userProfile.findUnique({
            where: { id: user.id },
            select: { onboardingCompleted: true },
          });

          // If user has completed onboarding, redirect to dashboard
          if (userProfile?.onboardingCompleted) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
          }
        } catch (dbError) {
          console.error("Database error checking onboarding status:", dbError);
        }
      }

      // User is authenticated, allow access
      return NextResponse.next();
    }

    // Default: allow access
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, redirect to sign in for protected routes
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
