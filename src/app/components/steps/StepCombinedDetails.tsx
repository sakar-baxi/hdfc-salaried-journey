"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { ArrowRight, CheckCircle, User, MapPin, Heart } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import StepBanner from "./StepBanner";

// Mock data based on FSD Master API
const MASTER_DATA = {
  maritalStatus: [{ code: 1, value: "Single" }, { code: 2, value: "Married" }],
};

// Mock HRMS Data
const MOCK_HRMS_DATA = {
  fullName: "Sakar Baxi",
  dob: "1990-01-15",
  pan: "ABCDE1234F",
  mobile: "9876543210",
  currentAddress: "123, Tech Park, Gurugram, Haryana - 122001",
  fatherName: "John Doe",
  motherName: "Jane Doe",
  maritalStatus: "Single",
};

export default function StepCombinedDetails() {
  const { nextStep } = useJourney();
  const [maritalStatus, setMaritalStatus] = useState<string>(MOCK_HRMS_DATA.maritalStatus === "Single" ? "1" : "2");
  const [useCommunicationAddress, setUseCommunicationAddress] = useState(false);
  const [communicationAddress, setCommunicationAddress] = useState(MOCK_HRMS_DATA.currentAddress);
  const [motherName, setMotherName] = useState(MOCK_HRMS_DATA.motherName);
  const [fatherName, setFatherName] = useState(MOCK_HRMS_DATA.fatherName);

  useEffect(() => {
    trackEvent('page_viewed', { page: 'combinedDetails' });
  }, []);

  const handleConfirm = () => {
    trackEvent('form_submitted_combined_details', {
      maritalStatus,
      useCommunicationAddress,
    });
    nextStep();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <StepBanner
        title="Confirm your details to finalize your account opening"
        name="Chirag Ameta"
        subTitle="S S PLAZA"
      />

      <Card className="border-none shadow-premium-lg bg-card/60 backdrop-blur-xl rounded-[32px] overflow-hidden flex flex-col">
        <CardHeader className="space-y-4 pb-8 pt-10 px-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center ring-1 ring-primary/20">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold tracking-tight text-gradient">Your Profile</CardTitle>
              <CardDescription className="text-lg">
                Please verify the information below is correct.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-10 pb-10 space-y-10 flex-1">
          {/* Family Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
              <Heart className="w-4 h-4" /> Family Details
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="fatherName" className="text-sm font-semibold text-muted-foreground">Father's Full Name</Label>
                <Input
                  id="fatherName"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="Enter father's name"
                  required
                  className="h-14 bg-blue-50/30 border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 rounded-2xl px-5 text-lg font-medium"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="motherName" className="text-sm font-semibold text-muted-foreground">Mother's Full Name</Label>
                <Input
                  id="motherName"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  placeholder="Enter mother's name"
                  required
                  className="h-14 bg-blue-50/30 border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 rounded-2xl px-5 text-lg font-medium"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="maritalStatus" className="text-sm font-semibold text-muted-foreground">Marital Status</Label>
                <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                  <SelectTrigger id="maritalStatus" className="h-14 bg-blue-50/30 border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 rounded-2xl px-5 text-lg font-medium">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-premium">
                    {MASTER_DATA.maritalStatus.map(item => (
                      <SelectItem key={item.code} value={String(item.code)} className="rounded-xl">
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Address Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
              <MapPin className="w-4 h-4" /> Communication Address
            </div>
            <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-100/50 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="useCommAddress" className="text-lg font-bold text-slate-800">
                    Use same address as current?
                  </Label>
                  <p className="text-sm text-muted-foreground">Toggle this if you want to provide a different address for communication.</p>
                </div>
                <Toggle
                  id="useCommAddress"
                  pressed={useCommunicationAddress}
                  onPressedChange={(pressed) => {
                    setUseCommunicationAddress(pressed);
                    if (!pressed) {
                      setCommunicationAddress(MOCK_HRMS_DATA.currentAddress);
                    }
                  }}
                  className="h-10 px-6 rounded-full data-[state=on]:bg-primary data-[state=on]:text-white transition-all font-bold shadow-md shadow-primary/10"
                >
                  {useCommunicationAddress ? "Changed" : "Same"}
                </Toggle>
              </div>
              {useCommunicationAddress && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label htmlFor="communicationAddress" className="text-sm font-semibold text-muted-foreground">Custom Communication Address</Label>
                  <Input
                    id="communicationAddress"
                    value={communicationAddress}
                    onChange={(e) => setCommunicationAddress(e.target.value)}
                    placeholder="Enter detailed address"
                    className="h-14 bg-white border-none shadow-sm focus:ring-2 focus:ring-primary/20 rounded-2xl px-5 text-lg font-medium line-clamp-1"
                  />
                </div>
              )}
              {!useCommunicationAddress && (
                <div className="p-4 bg-white/60 rounded-2xl text-slate-700 font-medium border border-white/50 shadow-sm italic">
                  {communicationAddress}
                </div>
              )}
            </div>
          </section>

        </CardContent>

        <CardFooter className="px-10 pb-12 pt-0">
          <Button
            variant="primary-cta"
            className="w-full md:w-64 mx-auto h-14 text-lg font-bold shadow-xl shadow-primary/20 rounded-full hover:scale-[1.02] transition-all active:scale-[0.98] gap-3"
            onClick={handleConfirm}
            disabled={!fatherName || !motherName}
          >
            Proceed to Nominee <ArrowRight className="w-5 h-5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
