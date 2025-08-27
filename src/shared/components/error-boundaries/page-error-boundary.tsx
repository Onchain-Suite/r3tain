"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Home, Mail, RefreshCw } from "lucide-react";
import type { ErrorInfo, ReactNode } from "react";

import { Button } from "@/components/ui";

import { BaseErrorBoundary } from "./base-error-boundary";

interface PageErrorBoundaryProps {
  children: ReactNode;
  pageName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
}

export function PageErrorBoundary({
  children,
  pageName = "Page",
  onError,
}: PageErrorBoundaryProps) {
  const customFallback = (
    <div className="from-background via-background to-destructive/5 relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, var(--color-destructive) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, var(--color-primary) 0%, transparent 50%)
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-destructive/10 border-destructive/20 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border-2"
          >
            <AlertTriangle className="text-destructive h-12 w-12" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-3xl font-bold sm:text-4xl"
          >
            {pageName} Error
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground mb-8 text-lg"
          >
            We encountered an unexpected error while loading this page. Our team
            has been notified and is working on a fix.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button
              onClick={() => window.location.reload()}
              size="lg"
              className="group"
            >
              <RefreshCw className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
              Reload Page
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                window.location.href = "mailto:support@r3tain.com";
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              Report Issue
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return (
    <BaseErrorBoundary
      level="page"
      context={`page-${pageName.toLowerCase()}`}
      onError={onError}
      fallback={customFallback}
      showErrorDetails={process.env.NODE_ENV === "development"}
    >
      {children}
    </BaseErrorBoundary>
  );
}
