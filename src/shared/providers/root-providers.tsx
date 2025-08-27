"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { ReCaptchaStatus } from "@/components/common";
import { BackToTop, Toaster } from "@/components/ui";

import { ReCaptchaProvider } from "./recaptcha-provider";
import { StackProviderClient } from "./stack-provider";
import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient();

export const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <StackProviderClient>
      <QueryClientProvider client={queryClient}>
        <ReCaptchaProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <BackToTop />
            <ReCaptchaStatus />
          </ThemeProvider>
        </ReCaptchaProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{ duration: 3000 }}
          richColors
        />
      </QueryClientProvider>
    </StackProviderClient>
  );
};
