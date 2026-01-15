"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle, Smartphone, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import ConsentCheckbox from "@/app/components/ConsentCheckbox";

export default function StepWelcome() {
  const { nextStep, addNotification, setJourneyType, journeyType, formData, updateFormData, isResumeFlow } = useJourney();
  const [mobileNumber, setMobileNumber] = useState(formData.mobileNumber || "9876543210");
  const [dob, setDob] = useState(formData.dob || "1990-01-15");
  const [pan, setPan] = useState(formData.pan || "EXSIT1234P");

  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [timer, setTimer] = useState(30);

  const [isTerminalError, setIsTerminalError] = useState(false);

  useEffect(() => {
    trackEvent('page_viewed', { page: 'welcome' });
  }, []);

  useEffect(() => {
    if (formData.pan && formData.pan !== pan) {
      setPan(formData.pan);
    }
    if (formData.mobileNumber && formData.mobileNumber !== mobileNumber) {
      setMobileNumber(formData.mobileNumber);
    }
  }, [formData.pan, formData.mobileNumber]);

  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isResumeFlow) {
      if (!mobileNumber) {
        setValidationError("Please enter your registered mobile number.");
        return;
      }
    } else {
      if (!mobileNumber || !dob || !pan) {
        setValidationError("Please fill in all required fields.");
        return;
      }
    }

    if (mobileNumber.length !== 10) {
      setValidationError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!isResumeFlow && (!consent1 || !consent2)) {
      setValidationError("Please provide your consent by reviewing the terms.");
      return;
    }

    setValidationError("");
    setIsLoading(true);
    updateFormData({ mobileNumber, dob, pan });

    // Only determine journey type if we are starting fresh (not in resume mode)
    if (!isResumeFlow) {
      if (pan === "EXSIT1234P") {
        setJourneyType("journey3"); // Express Flow
      } else {
        setJourneyType("journey2"); // Default/Full Flow for any other PAN
      }
    }

    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      addNotification("HDFC Bank", `Your OTP for verification is 481230. (Enter 555555 to see Error Page)`);
    }, 1500);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    trackEvent('otp_verified');

    // Simulation of Terminal Error
    if (otp === "555555") {
      setTimeout(() => {
        setIsLoading(false);
        setIsTerminalError(true);
        trackEvent('otp_error_terminal');
      }, 1500);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      addNotification("HDFC Bank", isResumeFlow ? "Welcome back! Resuming your journey." : "Verification successful.");
      nextStep();
    }, 1500);
  };

  if (isTerminalError) {
    return (
      <Card className="w-full max-w-2xl border-none shadow-premium-lg bg-white rounded-[40px] overflow-hidden mx-auto animate-in zoom-in-95 duration-500">
        <div className="p-12 text-center space-y-8">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Verification Failed</h2>
            <p className="text-lg text-slate-500 font-medium">Multiple invalid OTP attempts detected. For security reasons, your application session has been locked.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Error Code</p>
            <p className="font-mono text-sm text-slate-700">SEC_OTP_LOCKED_005</p>
          </div>
          <div className="flex flex-col gap-4">
            <Button onClick={() => { setIsTerminalError(false); setOtpSent(false); }} className="h-16 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-lg">
              Try Another Mobile Number
            </Button>
            <button onClick={() => window.location.reload()} className="text-primary font-bold hover:underline">Contact Support</button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl border-none md:border md:shadow-premium-lg md:rounded-[32px] mx-auto bg-card/60 backdrop-blur-xl overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#0047CC] via-blue-400 to-[#0047CC]/50" />
      <form onSubmit={otpSent ? handleVerifyOtp : handleSubmit} autoComplete="off" className="flex flex-col h-full">
        <CardHeader className="space-y-4 pb-8 pt-12 px-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center ring-1 ring-primary/20">
              <Smartphone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl font-black tracking-tight text-gradient">
                {isResumeFlow ? (otpSent ? "Verification" : "Resume Application") : (otpSent ? "Mobile Verification" : "Identify Yourself")}
              </CardTitle>
              <CardDescription className="text-lg font-medium text-slate-500">
                {otpSent ? `Enter the 6-digit code sent to +91 ${mobileNumber}` : (isResumeFlow ? "Enter your mobile number to pick up where you left off" : "Start your journey for a premium Salary Account")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-10 pb-8 space-y-8 flex-1">
          {!otpSent ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6", isResumeFlow && "md:grid-cols-1 max-w-md mx-auto")}>
                {/* Mobile Box */}
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mobile Number</Label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">+91</span>
                    <Input
                      id="mobile"
                      type="tel"
                      required
                      autoFocus
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="h-14 bg-white/50 border-slate-200 focus:border-primary shadow-sm rounded-2xl pl-14 text-lg font-bold"
                    />
                  </div>
                </div>

                {!isResumeFlow && (
                  <>
                    {/* DOB Box */}
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="h-14 bg-white/50 border-slate-200 focus:border-primary shadow-sm rounded-2xl px-5 text-lg font-bold"
                      />
                    </div>

                    {/* PAN Box */}
                    <div className="space-y-2">
                      <Label htmlFor="pan" className="text-xs font-bold text-slate-500 uppercase tracking-widest">Permanent Account Number (PAN)</Label>
                      <Input
                        id="pan"
                        required
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))}
                        placeholder="ABCDE1234F"
                        className="h-14 bg-white/50 border-slate-200 focus:border-primary shadow-sm rounded-2xl px-5 font-mono tracking-widest text-lg font-bold"
                      />
                    </div>
                  </>
                )}
              </div>

              {!isResumeFlow && (
                <div className="space-y-5 border-t border-slate-100 pt-8">
                  <ConsentCheckbox
                    id="consent1"
                    label="I hereby consent to collection and processing of my data for availing this account."
                    title="Aadhaar and Data Consent"
                    description="Required for instant account opening via E-KYC."
                    content={[
                      "I authorize HDFC Bank to use my Aadhaar details for E-KYC.",
                      "I confirm that the mobile number provided is linked to my Aadhaar.",
                      "I agree to the bank's digital account terms and conditions."
                    ]}
                    checked={consent1}
                    onCheckedChange={setConsent1}
                  />
                  <ConsentCheckbox
                    id="consent2"
                    label="I hereby consent to personalized offers and communication from HDFC Bank."
                    title="Marketing and Communication"
                    description="Stay updated with our latest premium offerings."
                    content={[
                      "Consent for Call, SMS, Email and WhatsApp communication.",
                      "Personalized credit card and loan offers based on profile.",
                      "Exclusive lifestyle rewards and partner benefits."
                    ]}
                    checked={consent2}
                    onCheckedChange={setConsent2}
                  />
                </div>
              )}

              {validationError && (
                <div className="flex items-center gap-3 p-4 bg-destructive/5 border border-destructive/20 rounded-2xl text-sm text-destructive animate-in zoom-in-95 duration-200">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-bold">{validationError}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-sm mx-auto py-10">
              <div className="space-y-8 text-center">
                <div className="space-y-3">
                  <Label htmlFor="otp" className="text-xs font-black uppercase tracking-widest text-slate-400">One Time Password</Label>
                  <Input
                    id="otp"
                    maxLength={6}
                    type="tel"
                    inputMode="numeric"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="0 0 0 0 0 0"
                    className="h-20 bg-slate-50 border-slate-200 focus:border-primary transition-all rounded-3xl px-4 text-center text-4xl font-black tracking-[0.4em]"
                    autoFocus
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    className={cn(
                      "text-sm font-bold tracking-tight rounded-full px-8 h-10 transition-all",
                      timer > 0 ? "text-slate-400 bg-slate-100" : "text-primary bg-blue-50 hover:bg-blue-100"
                    )}
                    disabled={timer > 0 || isLoading}
                    onClick={() => {
                      setTimer(30);
                      handleSubmit(new Event('submit') as any);
                    }}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="px-10 pb-10 pt-0 flex flex-col gap-10">
          <Button
            type="submit"
            className="w-full md:w-72 mx-auto h-16 text-2xl font-black shadow-xl shadow-primary/20 rounded-[2rem] bg-[#0047CC] hover:bg-[#0037AA] text-white hover:scale-[1.02] active:scale-[0.98] transition-all gap-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>{otpSent ? "Verify & Proceed" : (isResumeFlow ? "Resume Journey" : "Identify Myself")} <ArrowRight className="w-6 h-6 stroke-[3px]" /></>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
