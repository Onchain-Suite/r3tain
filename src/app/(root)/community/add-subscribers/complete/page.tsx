"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

import {
  ActionButtons,
  SummarySection,
} from "@/community/components/import/complete";
import { ImportLayout } from "@/community/components/import/import-layout";
import { PageHeader } from "@/community/components/shared";
import { useImport } from "@/community/context";
import { useImportNavigation } from "@/community/hooks";
import { ImportService } from "@/community/services";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function CompletePage() {
  const { state } = useImport();
  const { navigateToStep, goBack, exitImport } = useImportNavigation();
  const [isImporting, setIsImporting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Generate import summary from actual state
  const importSummary = ImportService.generateSummary(state);

  // Validate import readiness
  useEffect(() => {
    const { isReady, missingSteps } = ImportService.validateReadiness(state);
    if (!isReady) {
      setValidationErrors(missingSteps);
    } else {
      setValidationErrors([]);
    }
  }, [state]);

  const handleCompleteImport = async () => {
    if (validationErrors.length > 0) return;

    setIsImporting(true);

    try {
      // Simulate import process with actual data
      console.log("Starting import with data:", {
        method: state.selectedMethod,
        subscriberCount: importSummary.subscriberCount,
        community: state.selectedCommunity?.name,
        tags: state.tagSettings.selectedTags.map((t) => t.name),
        status: state.subscriptionSettings?.selectedStatus.name,
        updateExisting: state.organizeSettings?.updateExistingSubscribers,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigateToStep("confirmation");
    } catch (error) {
      console.error("Import failed:", error);
      setIsImporting(false);
    }
  };

  // Show error if import is not ready
  if (validationErrors.length > 0) {
    return (
      <ImportLayout currentStep={6} showBreadcrumb={false}>
        <div className="space-y-6 text-center">
          <h2 className="text-foreground text-2xl font-bold">
            Import Not Ready
          </h2>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <p className="mb-2 font-medium">
                Please complete the following steps:
              </p>
              <ul className="list-inside list-disc space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
          <Button onClick={() => goBack("subscribe")} variant="outline">
            Go Back
          </Button>
        </div>
      </ImportLayout>
    );
  }

  return (
    <ImportLayout currentStep={6}>
      <PageHeader
        title="Review and Complete Your Import"
        subtitle="Please review the details below before completing your import. Once confirmed, your subscribers will be added to your community."
      />

      <SummarySection summary={importSummary} />

      <ActionButtons
        onCancel={exitImport}
        onComplete={handleCompleteImport}
        isImporting={isImporting}
        disabled={validationErrors.length > 0}
      />
    </ImportLayout>
  );
}
