"use client";

import { useCallback, useState } from "react";

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const captureError = useCallback((error: Error | string) => {
    const errorObj = typeof error === "string" ? new Error(error) : error;
    setError(errorObj);

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error captured by useErrorBoundary:", errorObj);
    }

    // In production, you might want to send to error tracking service
    // Example: Sentry.captureException(errorObj)
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  // Throw error to be caught by error boundary
  if (error) {
    throw error;
  }

  return { captureError, resetError };
}
