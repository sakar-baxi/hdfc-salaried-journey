/* src/app/components/steps/StepKycChoice.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Building } from "lucide-react";

export default function StepKycChoice() {
  // MODIFIED: Use the new goToStep. This will NOT change the sidebar.
  const { goToStep } = useJourney();

  return (
    <Card className="w-full border-none md:border md:shadow-lg md:rounded-lg mx-auto">
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
          // MODIFIED: Go to Video KYC branch
          onClick={() => goToStep("kycInstructions")}
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
          // MODIFIED: Go to Physical KYC branch
          onClick={() => goToStep("physicalKyc")}
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