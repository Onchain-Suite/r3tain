"use client";

import { StackClientApp, StackProvider } from "@stackframe/stack";
import React from "react";

export function StackProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const appId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
  const publishableKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

  // If Stack Auth is not configured, render children without the provider
  if (!appId || !publishableKey) {
    console.warn(
      "Stack Auth environment variables are missing. Authentication features will be disabled."
    );
    return <div data-stack-auth="disabled">{children}</div>;
  }

  try {
    const stackApp = new StackClientApp({
      projectId: appId,
      publishableClientKey: publishableKey,
      tokenStore: "nextjs-cookie",
      urls: {
        signIn: "/auth/signin",
        signUp: "/auth/signup",
        afterSignIn: "/auth/callback",
        afterSignUp: "/auth/callback",
        handler: "/handler",
      },
    });

    return <StackProvider app={stackApp}>{children}</StackProvider>;
  } catch (error) {
    console.error("Error initializing Stack Auth provider:", error);
    return <div data-stack-auth="error">{children}</div>;
  }
}
