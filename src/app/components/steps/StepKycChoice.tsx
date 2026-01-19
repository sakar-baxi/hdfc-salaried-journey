"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { CheckCircle2, Video, FileText } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import AgentMessage from "@/app/components/chat/AgentMessage";
import UserResponse from "@/app/components/chat/UserResponse";
import HelpIcon from "@/app/components/shared/HelpIcon";

export default function StepKycChoice() {
  const { nextStep, currentStepIndex, journeySteps, formData, updateFormData } = useJourney();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(formData.kycMethod || null);

  const myIndex = journeySteps.findIndex(s => s.id === "kycChoice");
  const isHistory = myIndex !== -1 && myIndex < currentStepIndex;
  const isActive = myIndex === currentStepIndex;

  useEffect(() => {
    if (isActive) {
      trackEvent('page_viewed', { page: 'kyc_choice' });
    }
  }, [isActive]);

  const handleChoice = (method: "ekyc" | "vkyc") => {
    setSelectedMethod(method);
    updateFormData({ kycMethod: method });
    trackEvent('kyc_method_selected', { method });

    // Just proceed to next step in the journey flow
    setTimeout(() => {
      nextStep();
    }, 300);
  };

  if (isHistory) {
    return (
      <div className="space-y-3">
        <AgentMessage isNew={false}>
          Great! Let's proceed with your chosen KYC method.
        </AgentMessage>
        <UserResponse isNew={false}>
          <div className="flex items-center gap-2">
            <span>{selectedMethod === "ekyc" ? "e-KYC via Aadhaar" : "Video KYC"}</span>
            <CheckCircle2 className="w-3 h-3" />
          </div>
        </UserResponse>
      </div>
    );
  }

  if (!isActive) return null;

  return (
    <div className="space-y-3 w-full animate-in slide-in-from-bottom-4 duration-300">
      <AgentMessage>
        How would you like to complete your KYC verification? Choose the option that works best for you.
      </AgentMessage>

      <div className="pl-8 space-y-2">
        <div
          onClick={() => handleChoice("ekyc")}
          className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 transition-colors">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">e-KYC via Aadhaar</p>
            <p className="text-xs text-slate-500">Instant verification using Aadhaar OTP</p>
          </div>
          <HelpIcon tooltip="Complete verification in 2 minutes using your Aadhaar number and OTP" />
        </div>

        <div
          onClick={() => handleChoice("vkyc")}
          className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-green-50 group-hover:bg-green-100 flex items-center justify-center flex-shrink-0 transition-colors">
            <Video className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Video KYC</p>
            <p className="text-xs text-slate-500">Live video call with our agent</p>
          </div>
          <HelpIcon tooltip="Schedule a video call with our KYC agent for verification" />
        </div>
      </div>
    </div>
  );
}
