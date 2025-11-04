"use client";

import { useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics"; // <-- IMPORT THE TRACKER

export default function StepComplete() {
  const { userType, resetJourney } = useJourney();

  // --- Track this screen view ---
  useEffect(() => {
    trackEvent('page_viewed', { page: 'complete' });
    trackEvent('account_creation_success', { user_type: userType });
  }, [userType]);

  const isConverted = userType === 'etb-with-acct';
  
  const title = isConverted ? "Account Updated!" : "Account Created!";
  const description = isConverted 
    ? "Your account XXXX-1234 has been successfully converted." 
    : "Welcome to HDFC Bank! Your salaried account is ready.";

  const handleRestart = () => {
    trackEvent('journey_restarted');
    resetJourney();
  };

  return (
    <Card className="w-full border-none md:border md:shadow-xl md:rounded-lg mx-auto bg-card">
      <CardHeader className="items-center text-center">
        <CheckCircle2 className="w-16 h-16 text-success mb-4" />
        <CardTitle className="text-text-darkest text-2xl">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="p-4 bg-muted rounded-md space-y-2">
          {isConverted ? (
            <>
              <p className="text-sm text-text-gray-2">Converted Account Number</p>
              <p className="text-xl font-semibold text-text-darkest">XXXX-XXXX-1234</p>
              <p className="text-sm text-text-gray-2">Customer ID: 778899</p>
            </>
          ) : (
            <>
              <p className="text-sm text-text-gray-2">New Account Number</p>
              <p className="text-xl font-semibold text-text-darkest">1234-5678-9012</p>
              <p className="text-sm text-text-gray-2">Customer ID: 778899</p>
            </>
          )}
        </div>
        <Button 
          variant="primary-cta" 
          className="w-full mt-6" 
          onClick={handleRestart}
        >
          Start New Application
        </Button>
      </CardContent>
    </Card>
  );
}
