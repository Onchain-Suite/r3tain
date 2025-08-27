"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, X } from "lucide-react";
import type { ErrorInfo, ReactNode } from "react";

import { Button } from "@/components/ui/button";

import { BaseErrorBoundary } from "./base-error-boundary";

interface ComponentErrorBoundaryProps {
  children: ReactNode;
  componentName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
  showRetry?: boolean;
  inline?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function ComponentErrorBoundary({
  children,
  componentName = "Component",
  onError,
  showRetry = true,
  inline = false,
  dismissible = false,
  onDismiss,
}: ComponentErrorBoundaryProps) {
  const customFallback = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`border-destructive/20 bg-destructive/5 relative rounded-lg border ${inline ? "inline-flex items-center p-3" : "p-6"} `}
    >
      {dismissible && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="absolute top-2 right-2 h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      <div className={`${inline ? "flex items-center gap-3" : "text-center"}`}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={` ${inline ? "h-8 w-8" : "mx-auto mb-4 h-12 w-12"} bg-destructive/10 flex flex-shrink-0 items-center justify-center rounded-full`}
        >
          <AlertTriangle
            className={`${inline ? "h-4 w-4" : "h-6 w-6"} text-destructive`}
          />
        </motion.div>

        <div className={inline ? "flex-1" : ""}>
          <motion.h4
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`${inline ? "text-sm" : "text-base"} mb-1 font-medium`}
          >
            {componentName} Error
          </motion.h4>

          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className={`text-muted-foreground ${inline ? "text-xs" : "mb-4 text-sm"}`}
          >
            Failed to render component
          </motion.p>

          {!inline && showRetry && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Button
                onClick={() => window.location.reload()}
                size="sm"
                variant="outline"
                className="group"
              >
                <RefreshCw className="mr-2 h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                Retry
              </Button>
            </motion.div>
          )}
        </div>

        {inline && showRetry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Button
              onClick={() => window.location.reload()}
              size="sm"
              variant="outline"
              className="group"
            >
              <RefreshCw className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <BaseErrorBoundary
      level="component"
      context={`component-${componentName.toLowerCase()}`}
      onError={onError}
      fallback={customFallback}
      allowRetry={showRetry}
      showErrorDetails={process.env.NODE_ENV === "development"}
    >
      {children}
    </BaseErrorBoundary>
  );
}
