"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import AgentMessage from "@/app/components/chat/AgentMessage";
import UserResponse from "@/app/components/chat/UserResponse";
import HelpIcon from "@/app/components/shared/HelpIcon";

export default function StepWelcome() {
  const {
    nextStep,
    addNotification,
    setJourneyType,
    formData,
    updateFormData,
    isResumeFlow,
    currentStepIndex,
    journeySteps
  } = useJourney();

  const myIndex = journeySteps.findIndex(s => s.id === "welcome");
  const isHistory = myIndex !== -1 && myIndex < currentStepIndex;
  const isActive = myIndex === currentStepIndex;

  const [mobileNumber, setMobileNumber] = useState(formData.mobileNumber || "");
  const [dob, setDob] = useState(formData.dob || "");
  const [pan, setPan] = useState(formData.pan || "");
  const [consent, setConsent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (isActive) {
      trackEvent('page_viewed', { page: 'welcome' });
    }
  }, [isActive]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length !== 10) {
      setValidationError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!isResumeFlow && !consent) {
      setValidationError("Please provide your consent to proceed.");
      return;
    }

    setValidationError("");
    setIsLoading(true);
    updateFormData({ mobileNumber, dob, pan });

    if (!isResumeFlow) {
      setJourneyType(pan === "EXSIT1234P" ? "journey3" : "journey2");
    }

    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      addNotification("HDFC Bank", `OTP for verification: 481230`);
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      nextStep();
    }, 1000);
  };

  if (isHistory) {
    return (
      <div className="space-y-3">
        <AgentMessage isNew={false}>
          Welcome! I've verified your mobile number.
        </AgentMessage>
        <UserResponse isNew={false}>
          <div className="flex items-center gap-2">
            <span>{mobileNumber}</span>
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
        Welcome! Let's get started with your banking journey. I'll need your mobile number to send you a verification code.
      </AgentMessage>

      {!otpSent ? (
        <div className="pl-8 space-y-3">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="h-10 text-sm border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter 10-digit mobile number"
                autoFocus
              />
              <Button
                type="submit"
                disabled={isLoading || mobileNumber.length !== 10 || (!isResumeFlow && !consent)}
                className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send OTP"}
              </Button>
            </div>

            {!isResumeFlow && (
              <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  I consent to HDFC Bank processing my data for account opening
                  <HelpIcon
                    tooltip="We'll use your information to verify your identity and create your bank account as per RBI guidelines."
                    className="ml-1 inline-block"
                  />
                </span>
              </label>
            )}

            {validationError && (
              <p className="text-xs text-red-600">{validationError}</p>
            )}
          </form>
        </div>
      ) : (
        <>
          <AgentMessage>
            I've sent a 6-digit OTP to {mobileNumber}. Please enter it below to verify.
          </AgentMessage>

          <div className="pl-8 space-y-3">
            <form onSubmit={handleVerifyOtp} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-10 text-sm border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter 6-digit OTP"
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
