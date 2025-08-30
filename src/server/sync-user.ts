"use server";

import { prisma } from "@/lib/prisma";
import { getFullName } from "@/lib/utils";

import { type SignUpFormData } from "@/auth/validation";
import { requireAuth } from "@/guard/auth.guard";

interface UserSyncResult {
  success: boolean;
  error?: string;
}

export async function syncUserDataWithGuard(
  userData: SignUpFormData
): Promise<UserSyncResult> {
  try {
    // Use the auth guard - will redirect if not authenticated
    const session = await requireAuth();
    const { user } = session;

    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: getFullName(userData.firstName, userData.lastName),
        email: userData.email ?? user.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
      create: {
        name: getFullName(userData.firstName, userData.lastName),
        email: userData.email ?? user.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        onboardingCompleted: false,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("User sync error:", error);
    return {
      success: false,
      error: "Failed to sync user data",
    };
  }
}
