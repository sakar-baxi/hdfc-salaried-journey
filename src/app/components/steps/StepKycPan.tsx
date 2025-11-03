/* src/app/components/steps/StepKycPan.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, CreditCard } from "lucide-react";

export default function StepKycPan() {
  const { goToStep } = useJourney();

  return (
    <Card className="w-full border-none md:border md:shadow-lg md:rounded-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-text-darkest">2. Capture Your PAN Card</CardTitle>
        <CardDescription>
          Position your original PAN card inside the rectangle.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* This is a simulated camera view */}
        <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden relative">
          <CreditCard className="w-1/2 h-1/2 text-gray-700" />
          {/* PAN Rectangle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-1/2 rounded-lg border-4 border-dashed border-white/50" />
          </div>
          <p className="absolute bottom-4 text-white text-sm">Simulated Camera View</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="primary-cta" className="w-full" onClick={() => goToStep("kycPanFace")}>
          <Camera className="w-4 h-4 mr-2" />
          Capture PAN
        </Button>
      </CardFooter>
    </Card>
  );
}