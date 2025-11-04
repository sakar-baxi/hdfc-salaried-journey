"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Edit2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics"; // <-- IMPORT THE TRACKER

// Mock data based on FSD Master API
const MASTER_DATA = {
  maritalStatus: [ { code: 1, value: "Single" }, { code: 2, value: "Married" } ],
  residenceType: [ { code: 1, value: "Owned" }, { code: 2, value: "Rented" } ],
};

export default function StepCombinedDetails() {
  const { nextStep } = useJourney();
  const [isAddressEditable, setIsAddressEditable] = useState(false);

  // --- Track this screen view ---
  useEffect(() => {
    trackEvent('page_viewed', { page: 'combinedDetails' });
  }, []);

  const handleConfirm = () => {
    trackEvent('form_submitted_combined_details', { skipped: false });
    nextStep();
  };

  const handleSkip = () => {
    trackEvent('form_skipped_combined_details', { skipped: true });
    nextStep();
  };

  const handleAddressEdit = () => {
    setIsAddressEditable(true);
    trackEvent('form_field_edited', { field: 'address' });
  };

  return (
    <Card className="w-full border-none md:border md:shadow-xl md:rounded-lg mx-auto bg-card">
      <CardHeader>
        <CardTitle className="text-text-darkest">Verify & Complete Your Details</CardTitle>
        <CardDescription>
          All details are pre-filled for this demo. You can review, edit, or skip.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full">
          
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-text-darkest">
              Review Personal Details
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              {/* EKYC Details */}
              <div className="relative space-y-2">
                <Label htmlFor="name">Full Name (from EKYC)</Label>
                <Input id="name" defaultValue="Sakar Baxi" disabled />
                <Lock className="absolute right-3 top-[2.2rem] h-4 w-4 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="address">Address (from EKYC)</Label>
                  {!isAddressEditable && (
                    <Button variant="link" size="sm" className="h-auto p-0 text-sm" onClick={handleAddressEdit}>
                      <Edit2 className="w-3 h-3 mr-1" /> Change
                    </Button>
                  )}
                </div>
                <div className="relative">
                  <Input id="address" defaultValue="123, Tech Park, Gurugram" disabled={!isAddressEditable} />
                  {!isAddressEditable && <Lock className="absolute right-3 top-[0.7rem] h-4 w-4 text-muted-foreground" />}
                </div>
              </div>
              
              {/* FSD/HRMS Details (pre-filled) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select defaultValue="2">
                    <SelectTrigger id="maritalStatus"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {MASTER_DATA.maritalStatus.map(item => (
                        <SelectItem key={item.code} value={String(item.code)}>{item.value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherName">Mother's Name</Label>
                  <Input id="motherName" defaultValue="Jane Doe" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-text-darkest">
              Review Occupation Details
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative space-y-2">
                  <Label htmlFor="employment_type">Employment Type</Label>
                  <Input id="employment_type" defaultValue="Salaried" disabled />
                  <Lock className="absolute right-3 top-[2.2rem] h-4 w-4 text-muted-foreground" />
                </div>
                <div className="relative space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Building B&IYA" disabled />
                  <Lock className="absolute right-3 top-[2.2rem] h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income (INR)</Label>
                  <Input 
                    id="annualIncome" 
                    type="number" 
                    inputMode="numeric"
                    defaultValue="1200000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residenceType">Residence Type</Label>
                  <Select defaultValue="1">
                    <SelectTrigger id="residenceType"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {MASTER_DATA.residenceType.map(item => (
                        <SelectItem key={item.code} value={String(item.code)}>{item.value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
      
      <CardFooter className="flex flex-col md:flex-row gap-2">
        <Button variant="outline" className="w-full" onClick={handleSkip}>
          Skip
        </Button>
        <Button variant="primary-cta" className="w-full" onClick={handleConfirm}>
          Confirm & Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
