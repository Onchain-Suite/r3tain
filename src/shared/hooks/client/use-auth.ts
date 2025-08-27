"use client";

import {
  type CurrentInternalUser,
  type CurrentUser,
  useUser,
} from "@stackframe/stack";
import { useEffect, useState } from "react";

import { getUserOnboardingCompletionTime } from "@/lib/onboarding";

interface UseAuthReturn {
  user: CurrentUser | CurrentInternalUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (user?.id) {
        try {
          const onboardingData = await getUserOnboardingCompletionTime(user.id);
          setOnboardingCompleted(onboardingData?.isCompleted ?? false);
        } catch (error) {
          console.error("Failed to check onboarding status:", error);
          setOnboardingCompleted(false);
        }
      } else {
        setOnboardingCompleted(false);
      }
      setLoading(false);
    };

    checkOnboardingStatus();
  }, [user]);

  const signOut = async () => {
    try {
      if (user) {
        await user.signOut();
      }
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    onboardingCompleted,
    signOut,
  };
}
