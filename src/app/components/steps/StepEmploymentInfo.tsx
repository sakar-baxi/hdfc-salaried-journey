"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// Mock HRMS Employment Data
const MOCK_HRMS_EMPLOYMENT = {
  companyName: "Building B&IYA",
  employeeId: "EMP12345",
  designation: "Software Engineer",
  department: "Engineering",
  email: "sakar.baxi@company.com",
  joiningDate: "2023-01-15",
  workLocation: "Gurugram",
  hasEmail: true,
};

export default function StepEmploymentInfo() {
  const { nextStep } = useJourney();
  // Prefilled demo data
  const [annualIncome, setAnnualIncome] = useState("1200000");
  const [email, setEmail] = useState(MOCK_HRMS_EMPLOYMENT.email);
  const [needsEmailVerification, setNeedsEmailVerification] = useState(!MOCK_HRMS_EMPLOYMENT.hasEmail);
  const [emailVerified, setEmailVerified] = useState(MOCK_HRMS_EMPLOYMENT.hasEmail);

  useEffect(() => {
    trackEvent('page_viewed', { page: 'employmentInfo' });
  }, []);

  const handleContinue = () => {
    trackEvent('form_submitted_employment_info', { 
      hasAnnualIncome: !!annualIncome,
      emailVerified 
    });
    nextStep();
  };

  const handleVerifyEmail = () => {
    trackEvent('email_verification_initiated');
    // Simulate email verification
    setTimeout(() => {
      setEmailVerified(true);
      trackEvent('email_verification_completed');
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl border-none md:border md:shadow-professional md:rounded-xl mx-auto bg-card min-h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-text-darkest text-2xl font-bold">Employment Information</CardTitle>
        <CardDescription className="text-base">
          Please provide your annual income to complete the account opening process.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        <div className="space-y-2">
          <Label htmlFor="annualIncome" className="text-base font-medium">
            Annual Income (INR) *
          </Label>
          <Input 
            id="annualIncome" 
            type="number" 
            inputMode="numeric"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            placeholder="Enter your annual income"
            required
            className="h-11 text-base"
          />
        </div>

        {/* Email Verification - Only if not from HRMS */}
        {needsEmailVerification && (
          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="email" className="text-base font-medium">
              Corporate Email *
            </Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter corporate email"
                disabled={emailVerified}
                required
                className="h-11 text-base"
              />
              {!emailVerified && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleVerifyEmail}
                  disabled={!email || emailVerified}
                  className="h-11"
                >
                  Verify
                </Button>
              )}
            </div>
            {emailVerified && (
              <p className="text-sm text-green-600 font-medium">✓ Email verified successfully</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="primary-cta" 
          className="w-full h-12 text-base font-semibold" 
          onClick={handleContinue}
          disabled={!annualIncome || (needsEmailVerification && !emailVerified)}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
