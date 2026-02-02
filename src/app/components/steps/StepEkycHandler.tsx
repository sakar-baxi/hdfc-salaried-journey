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

  useEffect(() => {
    trackEvent('page_viewed', { page: 'ekyc_handler' });
  }, []);

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
    }, 800);
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
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Aadhaar e-KYC</h1>
        <p className="text-slate-500">Instant identity verification using UIDAI ecosystem</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
          <Shield className="w-5 h-5 text-blue-600" />
          <p className="text-sm text-blue-900 leading-tight">
            <span className="font-bold">Secure Verification.</span> Your Aadhaar data is encrypted and used only for identity validation as per RBI guidelines.
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Aadhaar Number</label>
              <Input
                type="text"
                inputMode="numeric"
                maxLength={12}
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                className="h-12 text-base text-center tracking-[0.2em] font-medium border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                placeholder="0000 0000 0000"
                autoFocus
              />
              {validationError && (
                <p className="text-sm text-red-600 animate-in fade-in slide-in-from-top-1">{validationError}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || aadhaarNumber.length !== 12}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md active:scale-[0.98]"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Identity"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-slate-700">Aadhaar OTP</label>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Edit Aadhaar
                </button>
              </div>
              <Input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="h-12 text-center text-xl tracking-[0.5em] font-bold border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                placeholder="000000"
                autoFocus
              />
              <p className="text-xs text-center text-slate-500 mt-2">
                We've sent a code to the mobile number registered with Aadhaar ending in <span className="font-semibold text-slate-900">xxxx {aadhaarNumber.slice(-4)}</span>
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md active:scale-[0.98]"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Verification"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                className={cn(
                  "text-sm transition-colors",
                  timer > 0 ? "text-slate-400 cursor-not-allowed" : "text-blue-600 font-medium hover:underline"
                )}
                disabled={timer > 0 || isLoading}
                onClick={() => setTimer(30)}
              >
                {timer > 0 ? `Resend code in ${timer}s` : "Resend OTP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
