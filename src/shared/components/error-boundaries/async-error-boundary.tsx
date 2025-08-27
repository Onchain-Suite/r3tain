"use client";

import { motion } from "framer-motion";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface AsyncErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
  onError?: (error: Error) => void;
  retryDelay?: number;
  maxRetries?: number;
}

export function AsyncErrorBoundary({
  children,
  fallback,
  loadingFallback,
  onError,
  retryDelay = 1000,
  maxRetries = 3,
}: AsyncErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = new Error(
        event.reason?.message ?? "Async operation failed"
      );
      setError(error);
      if (onError) {
        onError(error);
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () =>
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
  }, [onError]);

  const handleRetry = async () => {
    if (retryCount >= maxRetries) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      setRetryCount((prev) => prev + 1);
      // Force re-render
      window.location.reload();
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      loadingFallback ?? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center p-8"
        >
          <Loader2 className="text-primary mr-2 h-6 w-6 animate-spin" />
          <span className="text-muted-foreground">Retrying...</span>
        </motion.div>
      )
    );
  }

  if (error) {
    return (
      fallback ?? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-destructive/20 bg-destructive/5 rounded-lg border p-6 text-center"
        >
          <AlertCircle className="text-destructive mx-auto mb-3 h-8 w-8" />
          <h3 className="mb-2 font-medium">Async Operation Failed</h3>
          <p className="text-muted-foreground mb-4 text-sm">{error.message}</p>
          {retryCount < maxRetries && (
            <Button
              onClick={() => {
                handleRetry().catch(() => {});
              }}
              size="sm"
              className="group"
            >
              <RefreshCw className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              Retry ({retryCount + 1}/{maxRetries})
            </Button>
          )}
        </motion.div>
      )
    );
  }

  return <>{children}</>;
}
