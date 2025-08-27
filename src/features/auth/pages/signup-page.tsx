"use client";

import { AuthLayout } from "../components/shared/auth-layout";
import { SignUpForm } from "../components/signup-form";

interface SignUpPageProps {
  onSwitchToSignIn: () => void;
}

export default function SignUpPage({ onSwitchToSignIn }: SignUpPageProps) {
  return (
    <AuthLayout>
      <SignUpForm onSwitchToSignIn={onSwitchToSignIn} />
    </AuthLayout>
  );
}
