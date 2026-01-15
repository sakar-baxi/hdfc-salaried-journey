"use client";

import React, { useEffect, useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, ArrowRight, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function StepLoanOffer() {
  const { nextStep, journeyType } = useJourney();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only show for Journey 2 (SAJ) ETB customers
    if (journeyType === "journey2") {
      trackEvent('page_viewed', { page: 'loanOffer' });
      trackEvent('pre_approved_loan_shown');
    }
  }, [journeyType]);

  // Don't render if not Journey 2
  if (journeyType !== "journey2") {
    return null;
  }

  const handleAccept = () => {
    trackEvent('pre_approved_loan_clicked', { action: 'accept' });
    // Redirect to loan application (would use API to share intent with HDFC)
    window.open('https://hdfc-loan-application.com', '_blank');
    nextStep();
  };

  const handleDecline = () => {
    trackEvent('pre_approved_loan_clicked', { action: 'decline' });
    setIsVisible(false);
    setTimeout(() => {
      nextStep();
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl border-none md:border md:shadow-professional md:rounded-xl mx-auto bg-card border-primary-cta/20 min-h-[500px] flex flex-col">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-8 w-8 p-0"
          onClick={handleDecline}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-cta/10 rounded-full">
            <Gift className="h-6 w-6 text-primary-cta" />
          </div>
          <div>
            <CardTitle className="text-text-darkest">Pre-approved Loan Offer</CardTitle>
            <CardDescription>Exclusive offer for you</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-text-gray-2 mb-2">Pre-approved Amount</p>
            <p className="text-3xl font-bold text-text-darkest">₹5,00,000</p>
            <p className="text-xs text-text-gray-1 mt-1">Interest Rate: 10.5% p.a.</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-cta rounded-full" />
              <span>Quick approval process</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-cta rounded-full" />
              <span>No documentation required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-cta rounded-full" />
              <span>Flexible repayment options</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="primary-cta"
          className="w-full h-12 text-base font-semibold"
          onClick={handleAccept}
        >
          View Offer Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className="w-full h-12"
          onClick={handleDecline}
        >
          Not Now
        </Button>
        <p className="text-xs text-text-gray-1 text-center mt-2">
          This offer is valid for 30 days. You can apply later from your account dashboard.
        </p>
      </CardFooter>
    </Card>
  );
}
