"use client";

import { motion } from "framer-motion";
import { AlertCircle, Eye, EyeOff, RefreshCw } from "lucide-react";
import { type ErrorInfo, type ReactNode, useState } from "react";

import { BaseErrorBoundary } from "@/components/error-boundaries";
import { Button } from "@/components/ui";

interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
  fallbackHeight?: string;
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
  showRetry?: boolean;
}

export function SectionErrorBoundary({
  children,
  sectionName = "Section",
  fallbackHeight = "400px",
  onError,
  showRetry = true,
}: SectionErrorBoundaryProps) {
  const [showDetails, setShowDetails] = useState(false);

  const customFallback = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-destructive/20 from-background to-destructive/5 relative overflow-hidden rounded-xl border bg-gradient-to-br"
      style={{ minHeight: fallbackHeight }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(45deg, var(--color-destructive) 25%, transparent 25%),
              linear-gradient(-45deg, var(--color-destructive) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, var(--color-destructive) 75%),
              linear-gradient(-45deg, transparent 75%, var(--color-destructive) 75%)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-destructive/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        >
          <AlertCircle className="text-destructive h-8 w-8" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-2 text-xl font-semibold"
        >
          {sectionName} Unavailable
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-muted-foreground mb-6 max-w-md"
        >
          This section encountered an error and couldn&apos;t load properly. You
          can try refreshing or continue browsing other parts of the page.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          {showRetry && (
            <Button
              onClick={() => window.location.reload()}
              size="sm"
              className="group"
            >
              <RefreshCw className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              Retry Section
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="group"
          >
            {showDetails ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Hide Details
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Show Details
              </>
            )}
          </Button>
        </motion.div>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-destructive/5 border-destructive/20 mt-6 w-full max-w-md rounded-lg border p-4 text-left"
          >
            <p className="text-muted-foreground mb-2 text-xs">
              Section: {sectionName}
            </p>
            <p className="text-muted-foreground text-xs">
              Time: {new Date().toLocaleString()}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  return (
    <BaseErrorBoundary
      level="section"
      context={`section-${sectionName.toLowerCase()}`}
      onError={onError}
      fallback={customFallback}
      allowRetry={showRetry}
      showErrorDetails={process.env.NODE_ENV === "development"}
    >
      {children}
    </BaseErrorBoundary>
  );
}
