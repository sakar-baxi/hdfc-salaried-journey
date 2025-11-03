/* src/app/components/steps/StepConvertAccount.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function StepConvertAccount() {
  const { nextStep } = useJourney();

  return (
    <Card className="w-full border-none md:border md:shadow-lg md:rounded-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-text-darkest">Welcome Back!</CardTitle>
        <CardDescription>
          We see you already have a savings account with us:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-muted rounded-md">
          <p className="text-text-gray-2">Existing Savings Account</p>
          <p className="text-2xl font-semibold text-text-darkest">XXXX-XXXX-1234</p>
        </div>
        <p className="text-sm text-text-gray-2 text-center">
          Would you like to convert this to your new Salaried Account?
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button variant="primary-cta" className="w-full" onClick={nextStep}>
          Yes, Convert to Salaried Account
        </Button>
        <Button variant="outline" className="w-full" onClick={nextStep}>
          No, Create a New Account
        </Button>
      </CardFooter>
    </Card>
  );
}