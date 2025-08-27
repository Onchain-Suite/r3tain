"use client";

import { ResetPasswordForm } from "../components/reset-password-form";
import { AuthLayout } from "../components/shared/auth-layout";

interface ResetPasswordPageProps {
  token?: string;
  onPasswordReset?: () => void;
}

export default function ResetPasswordPage({
  token,
  onPasswordReset,
}: ResetPasswordPageProps) {
  return (
    <AuthLayout>
      <ResetPasswordForm token={token} onPasswordReset={onPasswordReset} />
    </AuthLayout>
  );
}
