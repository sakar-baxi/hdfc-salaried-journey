"use client";

import { useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, CreditCard, Smartphone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function StepKycChoice() {
  const { goToStep } = useJourney();

  useEffect(() => {
    trackEvent('page_viewed', { page: 'kycChoice' });
  }, []);

  const handleEkyc = () => {
    trackEvent('kyc_choice_made', { choice: 'ekyc' });
    goToStep("ekycHandler");
  };

  const handlePhysicalKyc = () => {
    trackEvent('kyc_choice_made', { choice: 'physical' });
    goToStep("physicalKyc");
  };

  const handleCkyc = () => {
    trackEvent('kyc_choice_made', { choice: 'ckyc' });
    // CKYC journey begins from HDFC's side after user selects this option
    // Journey continues from HDFC's side
    trackEvent('ckyc_journey_started_from_hdfc');
    goToStep("combinedDetails"); // Skip to next step as HDFC handles CKYC
  };

  return (
    <Card className="w-full max-w-2xl border-none md:border md:shadow-professional md:rounded-xl mx-auto bg-card min-h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-text-darkest text-2xl font-bold">KYC Verification</CardTitle>
        <CardDescription className="text-base">
          Please choose your preferred method to complete KYC verification via HDFC APIs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <Button 
          variant="outline" 
          className="w-full h-20 text-lg flex justify-start items-center p-6" 
          onClick={handleEkyc}
        >
          <Smartphone className="w-6 h-6 mr-4" />
          <div className="text-left">
            <p>E-KYC via Aadhaar</p>
            <p className="text-sm font-normal text-text-gray-1">Complete KYC using Aadhaar authentication</p>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-20 text-lg flex justify-start items-center p-6" 
          onClick={handleCkyc}
        >
          <CreditCard className="w-6 h-6 mr-4" />
          <div className="text-left">
            <p>Complete via CKYC</p>
            <p className="text-sm font-normal text-text-gray-1">Use existing CKYC data (Journey continues from HDFC's side)</p>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-20 text-lg flex justify-start items-center p-6" 
          onClick={handlePhysicalKyc}
        >
          <Building className="w-6 h-6 mr-4" />
          <div className="text-left">
            <p>Visit a Branch (Physical KYC)</p>
            <p className="text-sm font-normal text-text-gray-1">Save application and visit branch for verification</p>
          </div>
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-text-gray-1 text-center w-full">
          Your application progress is saved. After selecting CKYC, the journey will continue from HDFC's side.
        </p>
      </CardFooter>
    </Card>
  );
}
