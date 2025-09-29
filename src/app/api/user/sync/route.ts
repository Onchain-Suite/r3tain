import { type NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await request.json();

    // Sync user data with our database
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name:
          userData.name ??
          user.displayName ??
          user.primaryEmail?.split("@")[0] ??
          "User",
        email: userData.email ?? user.primaryEmail ?? "",
        image: userData.profilePicture ?? user.profileImageUrl,
        emailVerified:
          userData.emailVerified ?? user.primaryEmailVerified ?? false,
      },
      create: {
        id: user.id,
        name:
          userData.name ??
          user.displayName ??
          user.primaryEmail?.split("@")[0] ??
          "User",
        email: userData.email ?? user.primaryEmail ?? "",
        image: userData.profilePicture ?? user.profileImageUrl,
        emailVerified:
          userData.emailVerified ?? user.primaryEmailVerified ?? false,
        onboardingCompleted: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("User sync error:", error);
    return NextResponse.json(
      { error: "Failed to sync user data" },
      { status: 500 }
    );
  }
}
