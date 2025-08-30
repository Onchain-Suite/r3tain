import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";

export async function POST() {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update user profile to mark onboarding as completed
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        onboardingCompleted: true,
        name: user.displayName ?? user.primaryEmail?.split("@")[0] ?? "User",
        email: user.primaryEmail ?? "",
        image: user.profileImageUrl,
      },
      create: {
        id: user.id,
        name: user.displayName ?? user.primaryEmail?.split("@")[0] ?? "User",
        email: user.primaryEmail ?? "",
        image: user.profileImageUrl,
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Complete onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 }
    );
  }
}
