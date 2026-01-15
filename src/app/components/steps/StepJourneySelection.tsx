"use client";

import React, { useEffect, useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Building2, ArrowRight, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { JourneyType } from "@/app/context/stepDefinitions";

export default function StepJourneySelection() {
  const { setJourneyType } = useJourney();
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [pan, setPan] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [matchedJourney, setMatchedJourney] = useState<JourneyType | null>(null);

  useEffect(() => {
    trackEvent('page_viewed', { page: 'journeySelection' });
  }, []);

  const handleNameMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    trackEvent('name_match_initiated', { name, accountNumber, pan });

    // Simulate API call for name match
    setTimeout(() => {
      // Logic: If account number exists -> Journey 3, else Journey 2 or 1
      let journey: JourneyType;
      if (accountNumber && accountNumber.length > 0) {
        journey = "journey3"; // Direct conversion
      } else {
        // For demo, default to Journey 2 (SAJ)
        journey = "journey2";
      }
      
      setMatchedJourney(journey);
      setIsMatching(false);
      trackEvent('name_match_completed', { journey });
      
      // Auto-proceed after showing result
      setTimeout(() => {
        setJourneyType(journey);
        trackEvent('journey_selected', { journey });
      }, 1500);
    }, 1500);
  };

  if (matchedJourney) {
    return (
      <Card className="w-full border-none md:border md:shadow-xl md:rounded-lg mx-auto bg-card">
        <CardContent className="h-96 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-16 h-16 text-primary-cta animate-spin mb-4" />
          <p className="text-lg font-semibold text-text-darkest">
            {matchedJourney === "journey3" 
              ? "Converting your existing account..." 
              : matchedJourney === "journey2"
              ? "Starting Salary Account Journey..."
              : "Starting eKYC Journey..."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-none md:border md:shadow-xl md:rounded-lg mx-auto bg-card">
      <CardHeader>
        <CardTitle className="text-text-darkest">Let's Get Started</CardTitle>
        <CardDescription>
          We need to verify your details to determine the right journey for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleNameMatch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number (if applicable)</Label>
            <Input 
              id="accountNumber" 
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter existing HDFC account number (optional)"
              type="text"
            />
            <p className="text-xs text-text-gray-1">
              Leave blank if you don't have an existing account
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pan">PAN Number</Label>
            <Input 
              id="pan" 
              required 
              value={pan}
              onChange={(e) => {
                const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                setPan(value);
              }}
              placeholder="ABCDE1234F"
              maxLength={10}
              autoComplete="off"
            />
          </div>
          <Button 
            type="submit" 
            variant="primary-cta" 
            className="w-full" 
            disabled={isMatching || !name || !pan}
          >
            {isMatching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-4 border-t">
        <p className="text-xs text-text-gray-1 text-center w-full mb-2">
          Journey Types:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
          <div className="p-3 bg-muted rounded-md text-center">
            <Building2 className="h-4 w-4 mx-auto mb-1 text-primary-cta" />
            <p className="text-xs font-semibold">Journey 1</p>
            <p className="text-xs text-text-gray-1">eKYC Only</p>
          </div>
          <div className="p-3 bg-muted rounded-md text-center">
            <CreditCard className="h-4 w-4 mx-auto mb-1 text-primary-cta" />
            <p className="text-xs font-semibold">Journey 2</p>
            <p className="text-xs text-text-gray-1">SAJ</p>
          </div>
          <div className="p-3 bg-muted rounded-md text-center">
            <ArrowRight className="h-4 w-4 mx-auto mb-1 text-primary-cta" />
            <p className="text-xs font-semibold">Journey 3</p>
            <p className="text-xs text-text-gray-1">Direct</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
