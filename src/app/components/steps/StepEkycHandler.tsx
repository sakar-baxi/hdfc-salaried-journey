"use client";

import React, { useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics"; // <-- IMPORT THE TRACKER

export default function StepEkycHandler() {
  const { nextStep } = useJourney();

  useEffect(() => {
    // --- Track this screen view ---
    trackEvent('page_viewed', { page: 'ekycHandler' });

    // This simulates the entire FSD V2 EKYC flow
    trackEvent('ekyc_redirect_initiated');
    console.log("Calling EKYC Redirection API V2...");
    console.log("Redirecting to HDFC Bank's secure portal...");

    const timer = setTimeout(() => {
      console.log("User has returned. Calling EKYC Status Inquire API V2...");
      // --- Track the user's return ---
      trackEvent('ekyc_redirect_returned');
      nextStep();
    }, 2500);

    return () => clearTimeout(timer);
  }, [nextStep]);

  return (
    <Card className="w-full max-w-2xl border-none md:border md:shadow-professional md:rounded-xl mx-auto bg-card min-h-[500px] flex flex-col">
      <CardContent className="flex-1 flex flex-col items-center justify-center text-center">
        <Loader2 className="w-16 h-16 text-primary-cta animate-spin mb-4" />
        <p className="text-lg font-semibold text-text-darkest">
          Connecting to EKYC...
        </p>
        <p className="text-muted-foreground">
          You are being securely redirected to the HDFC Bank portal.
        </p>
      </CardContent>
    </Card>
  );
}
