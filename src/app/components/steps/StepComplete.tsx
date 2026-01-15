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
    <Card className="w-full max-w-2xl border-none md:border md:shadow-professional md:rounded-xl mx-auto bg-card min-h-[500px] flex flex-col">
      <CardHeader className="items-center text-center pb-8">
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <CardTitle className="text-text-darkest text-3xl font-bold mb-2">{title}</CardTitle>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6 flex-1">
        <div className="p-6 bg-gradient-to-br from-primary-cta/5 to-primary-cta/10 rounded-xl border border-primary-cta/20 space-y-3">
          {isConverted ? (
            <>
              <p className="text-sm font-medium text-text-gray-2 uppercase tracking-wide">Converted Account Number</p>
              <p className="text-3xl font-bold text-text-darkest tracking-wider">XXXX-XXXX-1234</p>
              <p className="text-sm text-text-gray-2">Customer ID: 778899</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-text-gray-2 uppercase tracking-wide">New Account Number</p>
              <p className="text-3xl font-bold text-text-darkest tracking-wider">1234-5678-9012</p>
              <p className="text-sm text-text-gray-2">Customer ID: 778899</p>
            </>
          )}
        </div>
        <div className="space-y-3 pt-4">
          <p className="text-sm text-text-gray-1">
            Your account details have been sent to your registered email and mobile number.
          </p>
          <Button 
            variant="primary-cta" 
            className="w-full h-12 text-base font-semibold" 
            onClick={handleRestart}
          >
            Start New Application
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
