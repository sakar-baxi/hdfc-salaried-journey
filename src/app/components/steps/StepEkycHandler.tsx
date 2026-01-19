"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, Shield } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import AgentMessage from "@/app/components/chat/AgentMessage";
import UserResponse from "@/app/components/chat/UserResponse";
import HelpIcon from "@/app/components/shared/HelpIcon";

export default function StepEkycHandler() {
  const { nextStep, formData, updateFormData, currentStepIndex, journeySteps } = useJourney();
  const [aadhaarNumber, setAadhaarNumber] = useState(formData.aadhaarNumber || "");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [timer, setTimer] = useState(30);

  const myIndex = journeySteps.findIndex(s => s.id === "ekycHandler");
  const isHistory = myIndex !== -1 && myIndex < currentStepIndex;
  const isActive = myIndex === currentStepIndex;

  useEffect(() => {
    if (isActive) {
      trackEvent('page_viewed', { page: 'ekyc_handler' });
    }
  }, [isActive]);

  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaarNumber.length !== 12) {
      setValidationError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    setValidationError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      updateFormData({ aadhaarNumber });
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setValidationError("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    trackEvent('ekyc_otp_verified');

    setTimeout(() => {
      setIsLoading(false);
      nextStep();
    }, 1000);
  };

  if (isHistory) {
    return (
      <div className="space-y-3">
        <AgentMessage isNew={false}>
          I've successfully verified your identity using Aadhaar e-KYC.
        </AgentMessage>
        <UserResponse isNew={false}>
          <div className="flex items-center gap-2">
            <span>Aadhaar ending in {aadhaarNumber.slice(-4)}</span>
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
        Let's verify your identity. Please enter your 12-digit Aadhaar number for instant validation.
      </AgentMessage>

      {!otpSent ? (
        <div className="pl-8 space-y-3">
          <form onSubmit={handleSendOtp} className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-4 h-4" />
              <span>Your data is encrypted and secure</span>
              <HelpIcon tooltip="We use UIDAI's secure API to verify your Aadhaar. Your data is never stored." />
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                inputMode="numeric"
                maxLength={12}
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                className="h-10 text-sm border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter 12-digit Aadhaar"
                autoFocus
              />
              <Button
                type="submit"
                disabled={isLoading || aadhaarNumber.length !== 12}
                className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send OTP"}
              </Button>
            </div>

            {validationError && (
              <p className="text-xs text-red-600">{validationError}</p>
            )}
          </form>
        </div>
      ) : (
        <>
          <AgentMessage>
            I've sent a 6-digit OTP to your Aadhaar-linked mobile number. Please enter it below.
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

              {validationError && (
                <p className="text-xs text-red-600">{validationError}</p>
              )}

              <button
                type="button"
                className={cn(
                  "text-xs transition-colors",
                  timer > 0 ? "text-slate-400 cursor-not-allowed" : "text-blue-600 hover:text-blue-700"
                )}
                disabled={timer > 0 || isLoading}
                onClick={() => setTimer(30)}
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
