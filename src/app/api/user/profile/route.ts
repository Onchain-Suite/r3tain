import { type NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";

export async function GET(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { id: user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "Failed to get profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { name, phone, companyName } = data;

    const updatedProfile = await prisma.userProfile.upsert({
      where: { id: user.id },
      update: {
        name,
        phone,
        companyName,

        // Keep existing fields that might be set during sync
        email: user.primaryEmail ?? data.email,
        profilePicture: user.profileImageUrl,
        emailVerified: user.primaryEmailVerified ?? false,
      },
      create: {
        id: user.id,
        email: user.primaryEmail ?? data.email ?? "",
        name,
        phone,
        companyName,

        profilePicture: user.profileImageUrl,
        emailVerified: user.primaryEmailVerified ?? false,
        onboardingCompleted: true, // If they're editing profile, assume onboarding is done
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
