"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trackEvent } from "@/lib/analytics";

const RELATIONSHIPS = [
  { code: 1, value: "Mother" },
  { code: 2, value: "Father" },
  { code: 3, value: "Spouse" },
  { code: 4, value: "Son" },
  { code: 5, value: "Daughter" },
  { code: 6, value: "Other" },
];

export default function StepNomineeInfo() {
  const { nextStep } = useJourney();
  const [maritalStatus] = useState<string>("1"); // From previous step - Single
  // Prefilled demo data based on marital status
  const [nomineeName, setNomineeName] = useState(maritalStatus === "1" ? "Jane Doe" : "Spouse Name");
  const [nomineeRelationship, setNomineeRelationship] = useState<string>(maritalStatus === "1" ? "1" : "3");

  useEffect(() => {
    trackEvent('page_viewed', { page: 'nomineeInfo' });
  }, []);

  const handleContinue = () => {
    trackEvent('form_submitted_nominee_info', { 
      hasNominee: true,
      relationship: nomineeRelationship 
    });
    nextStep();
  };

  return (
    <Card className="w-full max-w-2xl border-none md:border md:shadow-professional md:rounded-xl mx-auto bg-card min-h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-text-darkest text-2xl font-bold">Nominee Information</CardTitle>
        <CardDescription className="text-base">
          Please provide nominee details. This section is mandatory and cannot be removed.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> Based on your marital status ({maritalStatus === "1" ? "Single" : "Married"}), 
            we've pre-filled the nominee as {maritalStatus === "1" ? "Mother" : "Spouse"}. You can update if needed.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nomineeName">Nominee Name *</Label>
          <Input
            id="nomineeName"
            value={nomineeName}
            onChange={(e) => setNomineeName(e.target.value)}
            placeholder="Enter nominee name"
            required
            className="h-11"
          />
          <p className="text-xs text-text-gray-1">
            Pre-filled based on your marital status. You can edit if needed.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nomineeRelationship">Relationship *</Label>
          <Select 
            value={nomineeRelationship} 
            onValueChange={setNomineeRelationship}
          >
            <SelectTrigger id="nomineeRelationship" className="h-11">
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              {RELATIONSHIPS.map(item => (
                <SelectItem key={item.code} value={String(item.code)}>
                  {item.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-text-gray-1 italic">
          Note: Nominee section is mandatory and cannot be removed.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="primary-cta" 
          className="w-full h-12 text-base font-semibold" 
          onClick={handleContinue}
          disabled={!nomineeName || !nomineeRelationship}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
