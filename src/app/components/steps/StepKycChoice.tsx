"use client";

import { useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Building } from "lucide-react";
import { trackEvent } from "@/lib/analytics"; // <-- IMPORT THE TRACKER

export default function StepKycChoice() {
  const { goToStep } = useJourney();

  // --- Track this screen view ---
  useEffect(() => {
    trackEvent('page_viewed', { page: 'kycChoice' });
  }, []);

  const handleVideoKyc = () => {
    trackEvent('kyc_choice_made', { choice: 'video' });
    goToStep("kycInstructions");
  };

  const handlePhysicalKyc = () => {
    trackEvent('kyc_choice_made', { choice: 'physical' });
    goToStep("physicalKyc");
  };

  return (
    <Card className="w-full border-none md:border md:shadow-xl md:rounded-lg mx-auto bg-card">
      <CardHeader>
        <CardTitle className="text-text-darkest">Final Step: KYC</CardTitle>
        <CardDescription>
          Please complete your Know Your Customer (KYC) verification.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full h-20 text-lg flex justify-start items-center p-6" 
          onClick={handleVideoKyc}
        >
          <Video className="w-6 h-6 mr-4" />
          <div className="text-left">
            <p>Start Video KYC Now</p>
            <p className="text-sm font-normal text-text-gray-1">Recommended (Takes ~3 mins)</p>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="w-full h-20 text-lg flex justify-start items-center p-6" 
          onClick={handlePhysicalKyc}
        >
          <Building className="w-6 h-6 mr-4" />
           <div className="text-left">
            <p>Visit a Branch</p>
            <p className="text-sm font-normal text-text-gray-1">Save application and visit branch</p>
          </div>
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-text-gray-1 text-center w-full">
          Your application progress is saved.
        </p>
      </CardFooter>
    </Card>
  );
}
