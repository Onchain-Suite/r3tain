import { useState } from "react";

import { TagInputSection } from "@/community/components/import/tag/tag-input-section";
import { mockAvailableTags, mockPopularTags } from "@/community/data";
import { type Tag } from "@/community/types";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBulkTagForm } from "@/tag/hooks";

import {
  ActionSelector,
  AudienceDisplay,
  BulkTagDescription,
  BulkTagModalActions,
  BulkTagModalHeader,
  EmailPasteSection,
  FileUploadSection,
  SubmitMethodSelector,
} from "./bulk-tag-comps";
import { EmailValidation } from "./email-validation";

interface BulkTagModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkTagModal({ open, onOpenChange }: BulkTagModalProps) {
  const {
    submitMethod,
    setSubmitMethod,
    action,
    setAction,
    uploadedFile,
    pastedEmails,
    validationErrors,
    setValidationErrors,
    validEmails,
    isProcessing,
    handleFileUpload,
    handlePastedEmailsChange,
    handleRemoveFile,
    resetForm,
  } = useBulkTagForm();
  const [tags, setTags] = useState<Tag[]>([]);

  const handleApplyTag = () => {
    if (validEmails.length === 0) {
      setValidationErrors(["Please provide valid email addresses"]);
      return;
    }

    console.log("Applying tags:", tags, "to emails:", validEmails);
    onOpenChange(false);
    resetForm();
  };

  const handleTagsChange = (tags: Tag[]) => {
    setTags(tags);
  };

  const handleCancel = () => {
    onOpenChange(false);
    resetForm();
  };
  const allAvailableTags = [...mockAvailableTags, ...mockPopularTags];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <BulkTagModalHeader />

        <div className="space-y-6 py-4">
          <BulkTagDescription />
          <AudienceDisplay />

          <TagInputSection
            selectedTags={tags}
            availableTags={allAvailableTags}
            onTagsChange={handleTagsChange}
          />

          <SubmitMethodSelector
            submitMethod={submitMethod}
            onSubmitMethodChange={setSubmitMethod}
          />

          {submitMethod === "upload" && (
            <FileUploadSection
              onFileSelect={handleFileUpload}
              uploadedFile={uploadedFile}
              onRemoveFile={handleRemoveFile}
              isProcessing={isProcessing}
              validEmailCount={validEmails.length}
            />
          )}

          {submitMethod === "paste" && (
            <EmailPasteSection
              pastedEmails={pastedEmails}
              onPastedEmailsChange={handlePastedEmailsChange}
            />
          )}

          <EmailValidation
            validEmails={validEmails}
            errors={validationErrors}
          />

          <ActionSelector action={action} onActionChange={setAction} />
        </div>

        <BulkTagModalActions
          onCancel={handleCancel}
          onApply={handleApplyTag}
          isDisabled={validEmails.length === 0}
          isProcessing={isProcessing}
        />
      </DialogContent>
    </Dialog>
  );
}
