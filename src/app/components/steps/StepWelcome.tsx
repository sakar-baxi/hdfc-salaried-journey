"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics"; // <-- IMPORT THE TRACKER

export default function StepWelcome() {
  const { nextStep } = useJourney();
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = React.useState(30);

  // --- Track the initial page view ---
  useEffect(() => {
    trackEvent('page_viewed', { page: 'welcome' });
  }, []);

  const handleGenerateOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimer(30); 
    setTimeout(() => {
      // --- Track the OTP generation ---
      trackEvent('form_submitted_generate_otp');
      setIsLoading(false);
      setOtpSent(true); 
    }, 1000);
  };
  
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // --- Track the OTP verification ---
      trackEvent('otp_verified');
      setIsLoading(false);
      nextStep(); // Move to EkycHandler
    }, 1000);
  };

  // Timer effect for "Resend"
  React.useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  return (
    <Card className="w-full border-none md:border md:shadow-xl md:rounded-lg mx-auto bg-card">
      <form onSubmit={otpSent ? handleVerifyOtp : handleGenerateOtp} autoComplete="off">
        <CardHeader>
          <CardTitle className="text-text-darkest">
            {otpSent ? "Verify Mobile Number" : "Let's begin your journey"}
          </CardTitle>
          <CardDescription>
            {otpSent 
              ? `We've sent a 6-digit OTP to +91 9876543210.` 
              : "Details are pre-filled for this demo. Click 'Get OTP' to continue."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!otpSent ? (
            <>
              {/* All fields now use defaultValue to pre-fill and avoid errors */}
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input 
                  id="mobile" 
                  type="tel" 
                  required 
                  defaultValue="9876543210"
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN</Label>
                <Input 
                  id="pan" 
                  required 
                  defaultValue="ABCDE1234F"
                  autoComplete="off" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input 
                  id="dob" 
                  type="date" 
                  required 
                  defaultValue="1990-01-01"
                  autoComplete="bday" 
                />
              </div>
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
                  defaultValue="134561"
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
                  onClick={() => handleGenerateOtp(new Event('submit') as any)}
                >
                  {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="primary-cta" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {otpSent ? "Verify OTP" : "Get OTP"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
