/* src/app/components/steps/StepWelcome.tsx */

"use client";

import React, { useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function StepWelcome() {
  const { nextStep } = useJourney();
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = React.useState(30);
  
  const [mobileNumber, setMobileNumber] = useState("");

  const handleGenerateOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimer(30); 
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1000);
  };
  
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      nextStep();
    }, 1000);
  };

  React.useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  return (
    <Card className="w-full border-none md:border md:shadow-lg md:rounded-lg mx-auto">
      {/* Add autoComplete="off" to the form for good measure */}
      <form onSubmit={otpSent ? handleVerifyOtp : handleGenerateOtp} autoComplete="off">
        <CardHeader>
          <CardTitle className="text-text-darkest">
            {otpSent ? "Verify Mobile Number" : "Let's begin your journey"}
          </CardTitle>
          <CardDescription>
            {otpSent 
              ? `We've sent a 6-digit OTP to +91 ${mobileNumber || "your number"}.` 
              : "Please provide your details to start your application."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input 
                  id="mobile" 
                  placeholder="98XXXXXX00" 
                  type="tel" 
                  inputMode="numeric" 
                  pattern="[0-9]*" 
                  maxLength={10} 
                  required 
                  value={mobileNumber || ""} 
                  onChange={(e) => setMobileNumber(e.target.value)}
                  // --- FIX: Tell the browser this is a phone number ---
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN</Label>
                <Input 
                  id="pan" 
                  placeholder="ABCDE1234F" 
                  autoCapitalize="characters" 
                  maxLength={10} 
                  required 
                  autoComplete="pan" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" required autoComplete="bday" />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter 6-digit OTP</Label>
                <Input 
                  id="otp" 
                  placeholder="XXXXXX" 
                  maxLength={6} 
                  type="tel" 
                  inputMode="numeric" 
                  pattern="[0-9]*" 
                  required 
                  // --- FIX: Tell the browser this is an SMS one-time-code ---
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