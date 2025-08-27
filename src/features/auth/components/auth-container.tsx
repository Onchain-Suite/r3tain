"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import ForgotPasswordPage from "../pages/forgot-password-page";
import ResetPasswordPage from "../pages/reset-password-page";
import SignInPage from "../pages/signin-page";
import SignUpPage from "../pages/signup-page";

type AuthView = "signin" | "signup" | "forgot-password" | "reset-password";

interface AuthContainerProps {
  initialView?: AuthView;
  resetToken?: string;
}

export default function AuthContainer({
  initialView = "signin",
  resetToken,
}: AuthContainerProps) {
  const [currentView, setCurrentView] = useState<AuthView>(
    resetToken ? "reset-password" : initialView
  );

  const handleViewChange = (view: AuthView) => {
    setCurrentView(view);
  };

  const handlePasswordReset = () => {
    setCurrentView("signin");
  };

  return (
    <AnimatePresence mode="wait">
      {currentView === "signin" && (
        <SignInPage
          key="signin"
          onSwitchToSignUp={() => handleViewChange("signup")}
          onSwitchToForgotPassword={() => handleViewChange("forgot-password")}
        />
      )}
      {currentView === "signup" && (
        <SignUpPage
          key="signup"
          onSwitchToSignIn={() => handleViewChange("signin")}
        />
      )}
      {currentView === "forgot-password" && (
        <ForgotPasswordPage
          key="forgot-password"
          onSwitchToSignIn={() => handleViewChange("signin")}
        />
      )}
      {currentView === "reset-password" && (
        <ResetPasswordPage
          key="reset-password"
          token={resetToken}
          onPasswordReset={handlePasswordReset}
        />
      )}
    </AnimatePresence>
  );
}
