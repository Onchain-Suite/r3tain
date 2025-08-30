import { type NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";

export async function PUT(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferences = await request.json();

    // Update user profile with notification preferences
    await prisma.user.update({
      where: { id: user.id },
      data: {
        notificationPreferences: JSON.stringify(preferences),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update notifications error:", error);
    return NextResponse.json(
      { error: "Failed to update notification preferences" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { notificationPreferences: true },
    });

    const preferences = profile?.notificationPreferences
      ? JSON.parse(profile.notificationPreferences as string)
      : {
          email_campaigns: true,
          email_reports: true,
          email_security: true,
          push_campaigns: true,
          push_reports: false,
          push_security: true,
          marketing_emails: false,
          product_updates: true,
        };

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Get notifications error:", error);
    return NextResponse.json(
      { error: "Failed to get notification preferences" },
      { status: 500 }
    );
  }
}
