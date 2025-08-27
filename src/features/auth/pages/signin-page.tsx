"use client";

import { AuthLayout } from "../components/shared/auth-layout";
import { SignInForm } from "../components/signin-form";

interface SignInPageProps {
  onSwitchToSignUp: () => void;
  onSwitchToForgotPassword: () => void;
}

export default function SignInPage({
  onSwitchToSignUp,
  onSwitchToForgotPassword,
}: SignInPageProps) {
  return (
    <AuthLayout>
      <SignInForm
        onSwitchToSignUp={onSwitchToSignUp}
        onSwitchToForgotPassword={onSwitchToForgotPassword}
      />
    </AuthLayout>
  );
}
