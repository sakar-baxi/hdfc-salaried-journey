"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import StepBanner from "./StepBanner";
import { cn } from "@/lib/utils";

export default function StepEkycHandler() {
  const { nextStep, formData, updateFormData } = useJourney();
  const [aadhaarNumber, setAadhaarNumber] = useState(formData.aadhaarNumber || "987654321012");
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

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      updateFormData({ aadhaarNumber });
    }, 1500);
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
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <StepBanner
        title="E-KYC Verification"
        subTitle="Secure Aadhaar Validation"
      />

      <Card className="border-none shadow-premium-lg bg-card/60 backdrop-blur-xl rounded-[32px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500" />

        <CardHeader className="space-y-4 pb-8 pt-12 px-10 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-green-50/50">
            <ShieldCheck className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-slate-900">
            {otpSent ? "Enter Mobile OTP" : "Aadhaar Verification"}
          </CardTitle>
          <CardDescription className="text-lg font-medium text-slate-500 max-w-md mx-auto">
            {otpSent
              ? `Enter the 6-digit code sent to the mobile number linked with Aadhaar ending in ${aadhaarNumber.slice(-4)}`
              : "Enter your 12-digit Aadhaar number to verify your identity securely."}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10 pb-10 max-w-md mx-auto space-y-8">
          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-8">
            {!otpSent ? (
              <div className="space-y-4">
                <Label htmlFor="aadhaar" className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  type="text"
                  inputMode="numeric"
                  maxLength={12}
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  className="h-16 bg-white border-slate-200 focus-visible:ring-green-500/20 text-center text-2xl font-black tracking-widest rounded-2xl shadow-sm"
                  placeholder="0000 0000 0000"
                  autoFocus
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="otp" className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 text-center block">One Time Password</Label>
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="h-16 bg-white border-slate-200 focus-visible:ring-green-500/20 text-center text-3xl font-black tracking-[0.5em] rounded-2xl shadow-sm"
                    placeholder="000000"
                    autoFocus
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    className={cn(
                      "text-xs font-bold tracking-tight rounded-full px-6 h-9 transition-all",
                      timer > 0 ? "text-slate-400 bg-slate-100" : "text-green-600 bg-green-50 hover:bg-green-100"
                    )}
                    disabled={timer > 0 || isLoading}
                    onClick={() => {
                      setTimer(30);
                      // Ideally call resend API
                    }}
                  >
                    {timer > 0 ? `Resend Code in ${timer}s` : "Resend Code"}
                  </Button>
                </div>
              </div>
            )}

            {validationError && (
              <p className="text-sm font-bold text-red-500 text-center animate-in slide-in-from-top-1">
                {validationError}
              </p>
            )}

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold shadow-xl shadow-slate-900/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  {otpSent ? "Verify & Continue" : "Send OTP"} <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
