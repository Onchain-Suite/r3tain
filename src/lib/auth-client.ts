import { createAuthClient } from "better-auth/react";

import { dashboardRoutes } from "@/config/routes";

export const authClient = createAuthClient();

export const signInWithGoogle = async () => {
  try {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: dashboardRoutes.home,
    });
    return data;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};
