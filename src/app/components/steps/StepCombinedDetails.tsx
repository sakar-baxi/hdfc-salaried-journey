"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import ConsentCheckbox from "@/app/components/ConsentCheckbox";
import { trackEvent } from "@/lib/analytics";

// Mock data based on FSD Master API
const MASTER_DATA = {
  maritalStatus: [ { code: 1, value: "Single" }, { code: 2, value: "Married" } ],
};

// Mock HRMS Data - In real scenario, this comes from API after OTP verification
const MOCK_HRMS_DATA = {
  fullName: "Sakar Baxi",
  dob: "1990-01-15",
  pan: "ABCDE1234F",
  mobile: "9876543210",
  email: "sakar.baxi@company.com",
  employeeId: "EMP12345",
  designation: "Software Engineer",
  department: "Engineering",
  companyName: "Building B&IYA",
  companyAddress: "123, Tech Park, Sector 18, Gurugram",
  permanentAddress: "456, Residential Complex, Sector 45, Gurugram, Haryana - 122001",
  currentAddress: "123, Tech Park, Gurugram, Haryana - 122001",
  pincode: "122001",
  state: "Haryana",
  city: "Gurugram",
  fatherName: "John Doe",
  motherName: "Jane Doe",
  maritalStatus: "Single",
};

export default function StepCombinedDetails() {
  const { nextStep } = useJourney();
  // Prefilled demo data
  const [maritalStatus, setMaritalStatus] = useState<string>(MOCK_HRMS_DATA.maritalStatus === "Single" ? "1" : "2");
  const [useCommunicationAddress, setUseCommunicationAddress] = useState(false);
  const [communicationAddress, setCommunicationAddress] = useState(MOCK_HRMS_DATA.currentAddress);
  const [motherName, setMotherName] = useState(MOCK_HRMS_DATA.motherName);
  const [fatherName, setFatherName] = useState(MOCK_HRMS_DATA.fatherName);
  const [consentTerms, setConsentTerms] = useState(true); // Pre-checked for demo
  const [consentPrivacy, setConsentPrivacy] = useState(true); // Pre-checked for demo

  useEffect(() => {
    trackEvent('page_viewed', { page: 'combinedDetails' });
  }, []);

  const handleConfirm = () => {
    if (!consentTerms || !consentPrivacy) {
      return;
    }
    trackEvent('form_submitted_combined_details', { 
      maritalStatus,
      useCommunicationAddress,
      consentTerms,
      consentPrivacy
    });
    nextStep();
  };

  return (
    <Card className="w-full max-w-2xl border-none md:border md:shadow-professional md:rounded-xl mx-auto bg-card min-h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-text-darkest text-2xl font-bold">Personal Information</CardTitle>
        <CardDescription className="text-base">
          Please provide the following details to complete your account opening.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 flex-1">

        {/* Communication Address Toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="useCommAddress" className="text-base font-medium">
              Use different communication address?
            </Label>
            <Toggle
              id="useCommAddress"
              pressed={useCommunicationAddress}
              onPressedChange={(pressed) => {
                setUseCommunicationAddress(pressed);
                if (!pressed) {
                  setCommunicationAddress(MOCK_HRMS_DATA.currentAddress);
                }
              }}
            >
              {useCommunicationAddress ? "Yes" : "No"}
            </Toggle>
          </div>
          {useCommunicationAddress && (
            <div className="space-y-2">
              <Label htmlFor="communicationAddress">Communication Address</Label>
              <Input
                id="communicationAddress"
                value={communicationAddress}
                onChange={(e) => setCommunicationAddress(e.target.value)}
                placeholder="Enter communication address"
                className="h-11"
              />
            </div>
          )}
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maritalStatus" className="text-base font-medium">
              Marital Status *
            </Label>
            <Select value={maritalStatus} onValueChange={setMaritalStatus}>
              <SelectTrigger id="maritalStatus" className="h-11">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {MASTER_DATA.maritalStatus.map(item => (
                  <SelectItem key={item.code} value={String(item.code)}>
                    {item.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fatherName" className="text-base font-medium">
              Father's Name *
            </Label>
            <Input 
              id="fatherName" 
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              placeholder="Enter father's name"
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="motherName" className="text-base font-medium">
              Mother's Name *
            </Label>
            <Input 
              id="motherName" 
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              placeholder="Enter mother's name"
              required
              className="h-11"
            />
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-4 pt-6 border-t">
          <p className="text-sm font-semibold text-text-darkest mb-3">
            Terms and Conditions
          </p>
          <div className="space-y-3">
            <ConsentCheckbox
              id="consentTerms"
              label="I agree to the Terms and Conditions"
              termsUrl="https://www.hdfcbank.com/personal/terms-and-conditions"
              checked={consentTerms}
              onCheckedChange={setConsentTerms}
              required
            />
            <ConsentCheckbox
              id="consentPrivacy"
              label="I agree to the Privacy Policy"
              termsUrl="https://www.hdfcbank.com/personal/privacy-policy"
              checked={consentPrivacy}
              onCheckedChange={setConsentPrivacy}
              required
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="primary-cta" 
          className="w-full h-12 text-base font-semibold" 
          onClick={handleConfirm}
          disabled={!consentTerms || !consentPrivacy || !fatherName || !motherName}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
