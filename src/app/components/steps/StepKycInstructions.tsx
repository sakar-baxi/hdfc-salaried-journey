/* src/app/components/steps/StepKycInstructions.tsx */

"use client";

import React from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, FileText, Lightbulb, AlertTriangle } from "lucide-react";

export default function StepKycInstructions() {
  // We get the new goToStep function to handle branching
  const { goToStep } = useJourney();

  // This state is simulated. In a real app, the StepKycLoading
  // would call `goToStep("kycInstructions", { failed: true })`
  // and we would read that state here.
  const [kycFailed, setKycFailed] = React.useState(false); 

  return (
    <Card className="w-full border-none md:border md:shadow-lg md:rounded-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-text-darkest">Video KYC Instructions</CardTitle>
        <CardDescription>
          Please get ready for your Video KYC. It will only take 3 minutes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* This is the failure message block */}
        {kycFailed && (
          <div className="p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <p className="font-semibold">KYC Verification Failed</p>
              <p className="text-sm">We couldn't verify your details. Please try again.</p>
            </div>
          </div>
        )}
        
        <p className="font-semibold text-text-darkest">Please ensure you have:</p>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-primary-cta" />
            <span className="text-text-gray-2">Your original PAN Card</span>
          </li>
          <li className="flex items-center space-x-3">
            <Lightbulb className="w-6 h-6 text-primary-cta" />
            <span className="text-text-gray-2">A well-lit room</span>
          </li>
          <li className="flex items-center space-x-3">
            <Camera className="w-6 h-6 text-primary-cta" />
            <span className="text-text-gray-2">A stable internet connection & access to your camera</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          variant="primary-cta" 
          className="w-full" 
          onClick={() => goToStep("kycFace")} // Use goToStep to move to the next branch step
        >
          {kycFailed ? "Try Again" : "I'm Ready, Start Video KYC"}
        </Button>
      </CardFooter>
    </Card>
  );
}