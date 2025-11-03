/* src/app/components/steps/StepEkycRedirect.tsx */

"use client";

import React, { useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ExternalLink } from "lucide-react";

export default function StepEkycRedirect() {
  const { nextStep } = useJourney();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // This simulates the entire FSD V2 EKYC flow
  const handleEkycRedirect = () => {
    setIsRedirecting(true);

    // 1. We call the EKYC Redirection API V2 
    console.log("Calling EKYC Redirection API V2...");
    
    // 2. We receive a dynamic URL [cite: 316]
    const kycEngineUrl = "https://pehchaan-uat2.hdfcbank.com:443/kycengine/ekyc?jid=...";
    console.log("Received KYC Engine URL:", kycEngineUrl);

    // 3. We simulate redirecting the user and them returning
    setTimeout(() => {
      console.log("User redirected to bank portal...");
      
      // 4. After 2 seconds, simulate user returning to our app
      setTimeout(() => {
        console.log("User has returned. Calling EKYC Status Inquire API V2...");
        // 5. We would now call `EKYC Status Inquire API V2` [cite: 343] to get their data.
        // 6. On success, we move to the next step to show them the data.
        nextStep();
      }, 2000);

    }, 1500);
  };

  return (
    <Card className="w-full border-none md:border md:shadow-lg md:rounded-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-text-darkest">Aadhaar EKYC</CardTitle>
        <CardDescription>
          To pre-fill your application, we need to verify your details via Aadhaar EKYC.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-text-gray-2">
            You will be securely redirected to the HDFC Bank EKYC portal to complete this step.
          </p>
        </div>
        {isRedirecting && (
          <div className="flex items-center justify-center text-primary-cta">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Redirecting to HDFC Bank's secure portal...</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="primary-cta" className="w-full" onClick={handleEkycRedirect} disabled={isRedirecting}>
          {!isRedirecting && <ExternalLink className="mr-2 h-4 w-4" />}
          Start EKYC
        </Button>
      </CardFooter>
    </Card>
  );
}