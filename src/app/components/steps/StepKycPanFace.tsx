/* src/app/components/steps/StepKycPanFace.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, CreditCard, User } from "lucide-react";

export default function StepKycPanFace() {
  const { goToStep } = useJourney();

  return (
    <Card className="w-full border-none md:border md:shadow-lg md:rounded-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-text-darkest">3. Final Proof</CardTitle>
        <CardDescription>
          Hold your PAN card next to your face and capture.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* This is a simulated camera view */}
        <div className="w-full aspect-square md:aspect-video bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden relative p-4">
          <div className="flex flex-col md:flex-row w-full h-full items-center justify-center gap-4">
             {/* Face Oval */}
            <div className="w-1/2 h-1/2 rounded-[50%] border-4 border-dashed border-white/50 flex items-center justify-center">
              <User className="w-1/2 h-1/2 text-gray-700" />
            </div>
            {/* PAN Rectangle */}
            <div className="w-1/2 h-1/2 rounded-lg border-4 border-dashed border-white/50 flex items-center justify-center">
              <CreditCard className="w-1/2 h-1/2 text-gray-700" />
            </div>
          </div>
          <p className="absolute bottom-4 text-white text-sm">Simulated Camera View</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="primary-cta" className="w-full" onClick={() => goToStep("kycLoading")}>
          <Camera className="w-4 h-4 mr-2" />
          Capture Final Proof
        </Button>
      </CardFooter>
    </Card>
  );
}