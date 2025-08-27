import { type NextRequest, NextResponse } from "next/server";

import { stackServerApp } from "@/lib/stack";

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    // Stack Auth doesn't have a direct password change API
    // This would typically require the user to go through password reset flow
    // For now, we'll return a message directing users to use forgot password
    return NextResponse.json(
      {
        error:
          "Password changes require verification. Please use the forgot password feature to reset your password.",
        redirectToForgotPassword: true,
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
