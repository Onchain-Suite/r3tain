"use client";

import { AnimatePresence, motion } from "framer-motion";

import { StatusIndicator } from "@/components/ui";
import { Alert, AlertDescription } from "@/components/ui/alert";

import type { ValidationResult } from "@/community/services";

interface ValidationMessagesProps {
  validation: ValidationResult | null;
}

export function ValidationMessages({ validation }: ValidationMessagesProps) {
  if (!validation) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-2"
      >
        {validation.isValid &&
          validation.data &&
          validation.data.length > 0 && (
            <Alert>
              <StatusIndicator status="success" size="sm" />
              <AlertDescription>
                Successfully parsed {validation.data.length} subscriber
                {validation.data.length !== 1 ? "s" : ""}
              </AlertDescription>
            </Alert>
          )}

        {validation.errors.map((error, index) => (
          <Alert key={`error-${index}`} variant="destructive">
            <StatusIndicator status="error" size="sm" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ))}

        {validation.warnings.map((warning, index) => (
          <Alert key={`warning-${index}`}>
            <StatusIndicator status="warning" size="sm" />
            <AlertDescription>{warning}</AlertDescription>
          </Alert>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
