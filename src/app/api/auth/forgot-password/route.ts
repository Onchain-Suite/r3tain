import { type NextRequest, NextResponse } from "next/server";

import { stackServerApp } from "@/lib/stack";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Stack Auth handles password reset emails automatically
    // when you call the forgot password endpoint
    await stackServerApp.sendForgotPasswordEmail(email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to send reset email" },
      { status: 500 }
    );
  }
}
