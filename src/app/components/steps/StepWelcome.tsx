"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function StepWelcome() {
  const { nextStep } = useJourney();
  // Prefilled demo data
  const [mobileNumber, setMobileNumber] = useState("9876543210");
  const [dob, setDob] = useState("1990-01-15");
  const [pan, setPan] = useState("ABCDE1234F");
  const [otp, setOtp] = useState("123456");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [timer, setTimer] = useState(30);
  const [isResumedJourney, setIsResumedJourney] = useState(false);

  useEffect(() => {
    // Check if this is a resumed journey from URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const isResumed = urlParams.get('resume') === 'true' || urlParams.get('journey');
      setIsResumedJourney(!!isResumed);
      
      if (isResumed) {
        trackEvent('resumed_journey_detected');
      }
    }
    trackEvent('page_viewed', { page: 'welcome', isResumed: isResumedJourney });
  }, []);

  // Timer effect for "Resend"
  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For resumed journey, only validate mobile number
    if (isResumedJourney) {
      if (mobileNumber.length !== 10) {
        setValidationError("Please enter a valid 10-digit mobile number.");
        return;
      }
      handleGenerateOtp();
      return;
    }

    // Validate all fields for new journey
    if (!mobileNumber || !dob || !pan) {
      setValidationError("Please fill in all required fields.");
      return;
    }

    if (mobileNumber.length !== 10) {
      setValidationError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (pan.length !== 10) {
      setValidationError("Please enter a valid 10-character PAN number.");
      return;
    }

    setValidationError("");
    trackEvent('input_submitted', { mobile: mobileNumber, hasDOB: !!dob, hasPAN: !!pan });
    handleGenerateOtp();
  };

  const handleGenerateOtp = () => {
    setIsLoading(true);
    setTimer(30);
    trackEvent('form_submitted_generate_otp');
    
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1000);
  };
  
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    trackEvent('otp_verified');
    
    setTimeout(() => {
      setIsLoading(false);
      nextStep();
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl border-none md:border md:shadow-professional md:rounded-xl mx-auto bg-card min-h-[500px] flex flex-col">
      <form onSubmit={otpSent ? handleVerifyOtp : handleSubmit} autoComplete="off">
      <CardHeader>
        <CardTitle className="text-text-darkest text-2xl font-bold">
          {otpSent 
            ? "Verify Mobile Number" 
            : isResumedJourney 
            ? "Resume Your Journey" 
            : "Welcome"}
        </CardTitle>
          <CardDescription className="text-base">
            {otpSent 
              ? `We've sent a 6-digit OTP to +91 ${mobileNumber}. Please enter the OTP to continue.` 
              : isResumedJourney
              ? "Enter your mobile number to resume your journey. OTP will be sent by the bank."
              : "Enter your Aadhaar-linked mobile number, date of birth, and PAN number to begin."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-1">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="mobile">Aadhaar-linked Mobile Number</Label>
                <Input 
                  id="mobile" 
                  type="tel" 
                  required 
                  value={mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setMobileNumber(value);
                    setValidationError("");
                  }}
                  placeholder="Enter 10-digit mobile number"
                  autoComplete="tel"
                />
              </div>
              {!isResumedJourney && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input 
                      id="dob" 
                      type="date" 
                      required
                      value={dob}
                      onChange={(e) => {
                        setDob(e.target.value);
                        setValidationError("");
                      }}
                      max={new Date().toISOString().split('T')[0]}
                      autoComplete="bday"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number</Label>
                    <Input 
                      id="pan" 
                      type="text"
                      required
                      value={pan}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
                        setPan(value);
                        setValidationError("");
                      }}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      autoComplete="off"
                    />
                  </div>
                </>
              )}
              {validationError && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{validationError}</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter 6-digit OTP</Label>
                <Input 
                  id="otp" 
                  maxLength={6} 
                  type="tel" 
                  inputMode="numeric" 
                  required 
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                  }}
                  placeholder="000000"
                  autoComplete="one-time-code"
                />
              </div>
              <div className="text-center">
                <Button 
                  variant="link" 
                  size="sm" 
                  type="button"
                  className="text-text-gray-1" 
                  disabled={timer > 0 || isLoading}
                  onClick={() => {
                    setTimer(30);
                    handleGenerateOtp();
                  }}
                >
                  {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="primary-cta" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {otpSent ? "Verify OTP" : isResumedJourney ? "Get OTP" : "Continue"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
