"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, ExternalLink } from "lucide-react";

interface ConsentCheckboxProps {
  id: string;
  label: string;
  termsUrl?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  required?: boolean;
}

export default function ConsentCheckbox({
  id,
  label,
  termsUrl,
  checked,
  onCheckedChange,
  required = false,
}: ConsentCheckboxProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleCheckboxClick = (newChecked: boolean) => {
    if (newChecked && termsUrl) {
      setIsDialogOpen(true);
      setHasScrolledToBottom(false);
    } else {
      onCheckedChange(newChecked);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isAtBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 10;
    setHasScrolledToBottom(isAtBottom);
  };

  const handleConfirm = () => {
    if (hasScrolledToBottom) {
      onCheckedChange(true);
      setIsDialogOpen(false);
      setHasScrolledToBottom(false);
    }
  };

  return (
    <>
      <div className="flex items-start space-x-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={handleCheckboxClick}
          required={required}
          className="mt-1"
        />
        <Label
          htmlFor={id}
          className="text-sm leading-relaxed cursor-pointer"
        >
          {label}
          {termsUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsDialogOpen(true);
              }}
              className="text-primary-cta hover:underline ml-1 inline-flex items-center gap-1"
            >
              <FileText className="h-3 w-3" />
              View Terms
            </button>
          )}
        </Label>
      </div>

      {termsUrl && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Terms and Conditions
              </DialogTitle>
              <DialogDescription>
                Please read the terms and conditions carefully before proceeding.
              </DialogDescription>
            </DialogHeader>
            <div
              className="flex-1 overflow-y-auto border rounded-lg p-6 bg-muted/30 min-h-[400px] max-h-[60vh]"
              onScroll={handleScroll}
            >
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-4">Terms and Conditions</h3>
                <p className="mb-4">
                  By proceeding with this account opening application, you agree to the following terms and conditions:
                </p>
                <ol className="list-decimal list-inside space-y-3 mb-4">
                  <li>You confirm that all information provided is accurate and complete.</li>
                  <li>You authorize HDFC Bank to verify the information provided through various sources including HRMS, KYC agencies, and credit bureaus.</li>
                  <li>You understand that the bank reserves the right to reject the application at its sole discretion.</li>
                  <li>You agree to maintain a minimum balance as per the account type requirements.</li>
                  <li>You consent to receive communications via SMS, email, and phone regarding your account.</li>
                  <li>You understand that the bank may share your information with third parties as per regulatory requirements.</li>
                  <li>You agree to comply with all banking regulations and terms of service.</li>
                  <li>You confirm that you are eligible to open a salary account as per the bank's policies.</li>
                  <li>You understand that any false information may lead to account closure and legal action.</li>
                  <li>You agree to notify the bank immediately of any changes to your employment status or personal information.</li>
                </ol>
                <p className="mb-4">
                  For complete terms and conditions, please visit: <a href={termsUrl} target="_blank" rel="noopener noreferrer" className="text-primary-cta hover:underline">HDFC Bank Terms & Conditions</a>
                </p>
                <div className="h-20"></div>
              </div>
            </div>
            <DialogFooter className="flex items-center justify-between">
              <p className="text-xs text-text-gray-1">
                {hasScrolledToBottom
                  ? "✓ You have read all the content"
                  : "Please scroll to the bottom to continue"}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setHasScrolledToBottom(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary-cta"
                  onClick={handleConfirm}
                  disabled={!hasScrolledToBottom}
                >
                  Confirm & Continue
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
