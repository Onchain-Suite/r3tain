"use client";
import { ForgotPasswordForm } from "../components/forgot-password-form";
import { AuthLayout } from "../components/shared/auth-layout";

interface ForgotPasswordPageProps {
  onSwitchToSignIn: () => void;
}

export default function ForgotPasswordPage({
  onSwitchToSignIn,
}: ForgotPasswordPageProps) {
  return (
    <AuthLayout>
      <ForgotPasswordForm onSwitchToSignIn={onSwitchToSignIn} />
    </AuthLayout>
  );
}
