"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Eye, Home, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ErrorDetailsModal } from "@/community/components/import/error-details-modal";
import { ImportHeader } from "@/community/components/import/import-header";
import { ImportResultSummary } from "@/community/components/import/import-result-summary";
import { ProgressBreadcrumb } from "@/community/components/import/progress-breadcrumb";
import { useImport } from "@/community/context";
import { mockImportResult } from "@/community/data";
import type { ImportResult } from "@/community/types";
import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/config/routes";

const breadcrumbSteps = [
  { label: "Choose Method", isActive: false, isCompleted: true },
  { label: "Upload", isActive: false, isCompleted: true },
  { label: "Match", isActive: false, isCompleted: true },
  { label: "Organize", isActive: false, isCompleted: true },
  { label: "Tag", isActive: false, isCompleted: true },
  { label: "Subscribe", isActive: false, isCompleted: true },
  { label: "Complete", isActive: false, isCompleted: true },
  { label: "Confirmation", isActive: true, isCompleted: false },
];

export default function ConfirmationPage() {
  const router = useRouter();
  const { resetImport } = useImport();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [importResult] = useState<ImportResult>(mockImportResult);

  const handleBack = () => {
    router.push(`${dashboardRoutes.addSubscribers}/complete`);
  };

  const handleExit = () => {
    resetImport();
    router.push(dashboardRoutes.community);
  };

  const handleViewErrors = () => {
    setIsErrorModalOpen(true);
  };

  const handleStartCampaign = () => {
    // Navigate to campaign creation
    console.log("Starting campaign...");
    router.push(dashboardRoutes.campaigns);
  };

  const handleGoToDashboard = () => {
    resetImport();
    router.push(dashboardRoutes.community);
  };

  const handleViewCommunity = () => {
    resetImport();
    router.push(dashboardRoutes.subscribers);
  };

  return (
    <div className="bg-background min-h-screen">
      <ImportHeader onBack={handleBack} onExit={handleExit} />

      <div className="mx-auto max-w-4xl px-4 py-6 lg:px-8 lg:py-8">
        {/* Progress Breadcrumb */}
        <div className="mb-8">
          <ProgressBreadcrumb steps={breadcrumbSteps} />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Import Result Summary */}
          <ImportResultSummary result={importResult} />

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            {/* Error/Warning Actions */}
            {(importResult.errors.length > 0 ||
              importResult.warnings.length > 0) && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleViewErrors}
                className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2 bg-transparent"
              >
                <Eye className="h-4 w-4" />
                View {importResult.errors.length > 0 ? "Error" : "Details"}
              </Button>
            )}

            {/* Success Actions */}
            {importResult.status === "success" ||
            importResult.successfullyAdded > 0 ? (
              <>
                <Button
                  size="lg"
                  onClick={handleStartCampaign}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Start a Campaign
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleViewCommunity}
                  className="flex items-center gap-2 bg-transparent"
                >
                  View Community
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                onClick={handleGoToDashboard}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Back to Dashboard
              </Button>
            )}
          </motion.div>

          {/* Additional Actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <Button
              variant="link"
              onClick={handleGoToDashboard}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </motion.div>

          {/* Debug Info (development only) */}
          {process.env.NODE_ENV === "development" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-muted/30 border-border rounded-lg border p-4"
            >
              <details>
                <summary className="cursor-pointer text-sm font-medium">
                  Debug: Import Result
                </summary>
                <pre className="mt-2 overflow-auto text-xs">
                  {JSON.stringify(importResult, null, 2)}
                </pre>
              </details>
            </motion.div>
          )}
        </div>
      </div>

      {/* Error Details Modal */}
      <ErrorDetailsModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        errors={importResult.errors}
        warnings={importResult.warnings}
      />
    </div>
  );
}
