"use client";

import React, { useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { CheckCircle2, Download, CreditCard, Gift } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import AgentMessage from "@/app/components/chat/AgentMessage";
import UserResponse from "@/app/components/chat/UserResponse";

export default function StepComplete() {
  const { formData, currentStepIndex, journeySteps } = useJourney();

  const myIndex = journeySteps.findIndex(s => s.id === "complete");
  const isHistory = myIndex !== -1 && myIndex < currentStepIndex;
  const isActive = myIndex === currentStepIndex;

  useEffect(() => {
    if (isActive) {
      trackEvent('journey_completed');
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="space-y-3 w-full animate-in slide-in-from-bottom-4 duration-500">
      <AgentMessage>
        🎉 Congratulations {formData.name}! Your account has been successfully created.
      </AgentMessage>

      <div className="pl-8 space-y-4">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-900">Account Created Successfully</p>
              <p className="text-xs text-green-700">Your account is now active</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-green-700">Account Number:</span>
              <span className="font-semibold text-green-900">XXXX XXXX 1234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">IFSC Code:</span>
              <span className="font-semibold text-green-900">HDFC0001234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Branch:</span>
              <span className="font-semibold text-green-900">Mumbai Main</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-700">What's Next?</p>

          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-900">Debit Card</p>
                <p className="text-xs text-slate-500">Arriving in 5-7 business days</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <Download className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-900">Mobile Banking</p>
                <p className="text-xs text-slate-500">Download HDFC Bank app</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
              <Gift className="w-5 h-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-900">Welcome Benefits</p>
                <p className="text-xs text-slate-500">Check your exclusive offers</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 text-center pt-4">
          Thank you for choosing HDFC Bank. We're here to help you grow! 🌟
        </p>
      </div>
    </div>
  );
}
