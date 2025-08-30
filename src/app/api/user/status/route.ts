import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";

export async function GET() {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has completed onboarding
    const userProfile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        onboardingCompleted: true,
        createdAt: true,
      },
    });

    // If no profile exists, create one
    if (!userProfile) {
      await prisma.user.create({
        data: {
          id: user.id,
          name: user.displayName ?? user.primaryEmail?.split("@")[0] ?? "User",
          email: user.primaryEmail ?? "",
          image: user.profileImageUrl,
          onboardingCompleted: false,
        },
      });

      return NextResponse.json({
        isNewUser: true,
        onboardingCompleted: false,
        shouldRedirect: "/onboarding",
      });
    }

    // Check if user signed up recently (within last 24 hours) and hasn't completed onboarding
    const isRecentSignup =
      Date.now() - userProfile.createdAt.getTime() < 24 * 60 * 60 * 1000;
    const isNewUser = isRecentSignup && !userProfile.onboardingCompleted;

    return NextResponse.json({
      isNewUser,
      onboardingCompleted: userProfile.onboardingCompleted,
      shouldRedirect: isNewUser ? "/onboarding" : "/dashboard",
    });
  } catch (error) {
    console.error("User status check error:", error);
    return NextResponse.json(
      { error: "Failed to check user status" },
      { status: 500 }
    );
  }
}
