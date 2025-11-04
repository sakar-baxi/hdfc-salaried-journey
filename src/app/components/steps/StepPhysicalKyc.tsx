"use client";

import { useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin, Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics"; // <-- IMPORT THE TRACKER

export default function StepPhysicalKyc() {
  const { resetJourney } = useJourney();

  // --- Track this screen view ---
  useEffect(() => {
    trackEvent('page_viewed', { page: 'physicalKyc' });
  }, []);

  const handleDone = () => {
    trackEvent('physical_kyc_journey_ended');
    resetJourney();
  };

  return (
    <Card className="w-full border-none md:border md:shadow-xl md:rounded-lg mx-auto bg-card">
      <CardHeader className="text-center items-center">
        <Loader2 className="w-16 h-16 text-primary-cta animate-spin mb-4" />
        <CardTitle className="text-text-darkest">Your Application is Saved</CardTitle>
        <CardDescription>
          Please visit your nearest HDFC Bank branch to complete your KYC.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pincode" className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-text-gray-2"/>
            Find your nearest branch
          </Label>
          <div className="flex space-x-2">
            <Input id="pincode" placeholder="Enter your 6-digit Pincode" type="tel" maxLength={6} />
            <Button variant="outline" size="icon">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="p-4 bg-muted rounded-md text-center">
          <p className="font-semibold text-text-dark">Your Application ID</p>
          <p className="text-lg text-text-gray-2">SR10002345</p>
          <p className="text-xs text-text-gray-1 mt-2">
            Please show this ID at the branch. Your application details are saved with us for 7 days.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="primary-cta" className="w-full" onClick={handleDone}>
          Done
        </Button>
      </CardFooter>
    </Card>
  );
}
