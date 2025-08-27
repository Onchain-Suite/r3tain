"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

interface BaseErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
  showErrorDetails?: boolean;
  allowRetry?: boolean;
  level?: "page" | "section" | "component";
  context?: string;
}

export class BaseErrorBoundary extends Component<
  BaseErrorBoundaryProps,
  ErrorBoundaryState
> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: BaseErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: "",
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const errorId = `err_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, context } = this.props;
    const { errorId } = this.state;

    // Enhanced error logging
    const enhancedError = {
      ...error,
      context: context ?? "unknown",
      timestamp: new Date().toISOString(),
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : "server",
      url: typeof window !== "undefined" ? window.location.href : "server",
      errorId,
    };

    console.error("Error Boundary Caught Error:", enhancedError, errorInfo);

    this.setState({ errorInfo });

    if (onError) {
      onError(error, errorInfo, errorId);
    }

    // Report to error tracking service (e.g., Sentry, LogRocket)
    if (typeof window !== "undefined") {
      // Example: Sentry.captureException(error, { extra: errorInfo, tags: { errorId, context } })
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: "",
    });

    // Add a small delay to prevent immediate re-error
    this.retryTimeoutId = setTimeout(() => {
      // Force a re-render
      this.forceUpdate();
    }, 100);
  };

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  render() {
    const { hasError, error, errorId } = this.state;
    const {
      children,
      fallback,
      showErrorDetails = false,
      allowRetry = true,
      level = "component",
    } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={` ${
            level === "page"
              ? "flex min-h-screen items-center justify-center"
              : ""
          } ${
            level === "section"
              ? "flex min-h-[400px] items-center justify-center"
              : ""
          } ${
            level === "component" ? "flex items-center justify-center p-8" : ""
          } from-background to-destructive/5 border-destructive/20 rounded-lg border bg-gradient-to-br`}
        >
          <div className="mx-auto max-w-md text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            >
              <AlertTriangle className="text-destructive h-8 w-8" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-2 text-lg font-semibold"
            >
              Something went wrong
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-muted-foreground mb-6 text-sm"
            >
              {level === "page"
                ? "We encountered an error loading this page."
                : level === "section"
                  ? "This section failed to load properly."
                  : "This component encountered an error."}
            </motion.p>

            {showErrorDetails && error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-destructive/5 border-destructive/20 mb-6 rounded-lg border p-3 text-left"
              >
                <p className="text-muted-foreground mb-1 text-xs">
                  Error Details:
                </p>
                <code className="text-destructive font-mono text-xs break-all">
                  {error.message}
                </code>
                <p className="text-muted-foreground mt-2 text-xs">
                  ID: {errorId}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex flex-col justify-center gap-3 sm:flex-row"
            >
              {allowRetry && (
                <Button onClick={this.handleRetry} size="sm" className="group">
                  <RefreshCw className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  Try Again
                </Button>
              )}
              {level === "page" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      );
    }

    return children;
  }
}
