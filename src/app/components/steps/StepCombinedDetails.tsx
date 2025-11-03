/* src/app/components/steps/StepCombinedDetails.tsx */

"use client";

import React, { useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Edit2 } from "lucide-react";

// PM: Mock data for dropdowns, based on FSD Master API
const MASTER_DATA = {
  maritalStatus: [
    { code: 1, value: "Single" },
    { code: 2, value: "Married" },
  ],
  employmentType: [
    { code: 1, value: "Salaried" },
    { code: 2, value: "Self-Employed" },
    { code: 3, value: "Other" },
  ],
  sourceOfIncome: [
    { code: 1, value: "Salary" },
    { code: 2, value: "Business" },
    { code: 3, value: "Investments" },
  ],
  residenceType: [
    { code: 1, value: "Owned" },
    { code: 2, value: "Rented" },
    { code: 3, value: "Company Provided" },
  ],
};

export default function StepCombinedDetails() {
  const { nextStep } = useJourney();
  const [isAddressEditable, setIsAddressEditable] = useState(false);

  return (
    <Card className="w-full border-none md:border md:shadow-lg md:rounded-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-text-darkest">Verify & Complete Your Details</CardTitle>
        <CardDescription>
          {/* --- TEXT MODIFIED --- */}
          Please review your pre-filled details and provide the remaining information.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="w-full">
          
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-text-darkest">
              Review Personal Details
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="relative space-y-2">
                {/* --- TEXT MODIFIED --- */}
                <Label htmlFor="name">Full Name (from verified records)</Label>
                <Input id="name" defaultValue="Sakar Baxi" disabled />
                <Lock className="absolute right-3 top-[2.2rem] h-4 w-4 text-text-gray-3" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  {/* --- TEXT MODIFIED --- */}
                  <Label htmlFor="address">Address (from verified records)</Label>
                  {!isAddressEditable && (
                    <Button variant="link" size="sm" className="h-auto p-0 text-sm" onClick={() => setIsAddressEditable(true)}>
                      <Edit2 className="w-3 h-3 mr-1" /> Change
                    </Button>
                  )}
                </div>
                <div className="relative">
                  <Input id="address" defaultValue="123, Tech Park, Gurugram" disabled={!isAddressEditable} />
                  {!isAddressEditable && <Lock className="absolute right-3 top-[0.7rem] h-4 w-4 text-text-gray-3" />}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" defaultValue="1995-10-20" disabled />
                  <Lock className="absolute right-3 top-[2.2rem] h-4 w-4 text-text-gray-3" />
                </div>
                <div className="relative space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input id="gender" defaultValue="Male" disabled />
                  <Lock className="absolute right-3 top-[2.2rem] h-4 w-4 text-text-gray-3" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-text-darkest">
              Complete Personal Details
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marital_status">Marital Status</Label>
                  <Select>
                    <SelectTrigger id="marital_status"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {MASTER_DATA.maritalStatus.map(item => (
                        <SelectItem key={item.code} value={String(item.code)}>{item.value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city_of_birth">City of Birth</Label>
                  <Input id="city_of_birth" placeholder="Enter your city of birth" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="father_name">Father's Name</Label>
                  <Input id="father_name" placeholder="Enter father's full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mother_name">Mother's Name</Label>
                  <Input id="mother_name" placeholder="Enter mother's full name" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold text-text-darkest">
              Complete Occupation Details
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employment_type">Employment Type</Label>
                  <Select>
                    <SelectTrigger id="employment_type"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {MASTER_DATA.employmentType.map(item => (
                        <SelectItem key={item.code} value={String(item.code)}>{item.value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source_of_income">Source of Income</Label>
                  <Select>
                    <SelectTrigger id="source_of_income"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {MASTER_DATA.sourceOfIncome.map(item => (
                        <SelectItem key={item.code} value={String(item.code)}>{item.value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annual_income">Annual Income (INR)</Label>
                  <Input id="annual_income" placeholder="Enter your annual income" type="number" inputMode="numeric" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residence_type">Residence Type</Label>
                  <Select>
                    <SelectTrigger id="residence_type"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      {MASTER_DATA.residenceType.map(item => (
                        <SelectItem key={item.code} value={String(item.code)}>{item.value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="relative space-y-2 pt-4">
                {/* --- TEXT MODIFIED --- */}
                <Label htmlFor="company">Company Name (pre-filled)</Label>
                <Input id="company" defaultValue="Building B&IYA" disabled />
                <Lock className="absolute right-3 top-[2.2rem] h-4 w-4 text-text-gray-3" />
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
      
      <CardFooter>
        <Button variant="primary-cta" className="w-full" onClick={nextStep}>
          Confirm & Continue
        </Button>
      </CardFooter>
    </Card>
  );
}