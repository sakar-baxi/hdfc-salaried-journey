/* src/app/components/steps/StepKycLoading.tsx */

"use client";

import React, { useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function StepKycLoading() {
  const { goToStep } = useJourney();

  useEffect(() => {
    // This simulates the 3-second API call to the EKYC guy
    const timer = setTimeout(() => {
      // Simulate a random success or failure
      const isSuccess = Math.random() > 0.3; // 70% success rate

      if (isSuccess) {
        // On success, go to the "complete" step (which is in the main flow)
        goToStep("complete");
      } else {
        // On failure, go *back* to the "kycInstructions" step
        // We would also pass a failure flag here in a real app
        goToStep("kycInstructions"); 
      }
    }, 3000); // 3-second delay

    return () => clearTimeout(timer);
  }, [goToStep]);

  return (
    <Card className="w-full border-none md:border md:shadow-lg md:rounded-lg mx-auto">
      <CardHeader className="text-center items-center">
        <Loader2 className="w-16 h-16 text-primary-cta animate-spin mb-4" />
        <CardTitle className="text-text-darkest">Verifying Your Details</CardTitle>
        <CardDescription>
          This will just take a moment. Please do not close this window.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-40 flex items-center justify-center">
        <p className="text-sm text-text-gray-2 animate-pulse">
          Connecting to our KYC agent...
        </p>
      </CardContent>
    </Card>
  );
}