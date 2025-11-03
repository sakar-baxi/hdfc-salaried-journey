/* src/app/components/steps/StepComplete.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function StepComplete() {
  const { userType, setUserType } = useJourney();

  const isConverted = userType === 'etb-with-acct';
  
  const title = isConverted ? "Account Updated!" : "Account Created!";
  const description = isConverted 
    ? "Your account XXXX-1234 has been successfully converted." 
    : "Welcome to HDFC Bank! Your salaried account is ready.";

  return (
    // MODIFIED: Added responsive classes
    <Card className="w-full border-none md:border md:shadow-lg md:rounded-lg mx-auto">
      <CardHeader className="items-center text-center">
        <CheckCircle2 className="w-16 h-16 text-success mb-4" />
        <CardTitle className="text-text-darkest text-2xl">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="p-4 bg-muted rounded-md space-y-2">
          {/* MODIFIED: Fixed logic as requested */}
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
          onClick={() => setUserType('ntb')} // Reset to start
        >
          Start New Application
        </Button>
      </CardContent>
    </Card>
  );
}