"use client";

import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AnimatedLoading } from "@/components/loading";

export default function AuthCallbackPage() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      // Check user status and redirect accordingly
      const checkUserStatus = async () => {
        try {
          const response = await fetch("/api/user/status");
          if (response.ok) {
            const status = await response.json();
            router.push(status.shouldRedirect);
          } else {
            // Fallback to dashboard if API fails
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Failed to check user status:", error);
          router.push("/dashboard");
        }
      };

      checkUserStatus();
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <AnimatedLoading />
        <p className="mt-4 text-muted-foreground">Setting up your account...</p>
      </div>
    </div>
  );
}
