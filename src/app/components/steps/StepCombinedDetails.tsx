"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Edit2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import AgentMessage from "@/app/components/chat/AgentMessage";
import UserResponse from "@/app/components/chat/UserResponse";
import HelpIcon from "@/app/components/shared/HelpIcon";

export default function StepCombinedDetails() {
  const { nextStep, formData, updateFormData, currentStepIndex, journeySteps } = useJourney();

  // Prefilled data from our system (some fields editable)
  const [fatherName, setFatherName] = useState(formData.fatherName || "Rajesh Sharma");
  const [motherName, setMotherName] = useState(formData.motherName || "Sunita Sharma");
  const [maritalStatus, setMaritalStatus] = useState(formData.maritalStatus || "single");
  const [spouseName, setSpouseName] = useState(formData.spouseName || "");
  const [currentAddress, setCurrentAddress] = useState(formData.currentAddress || "123, Tech Park, Sector 14, Gurgaon, Haryana - 122001");

  const [isConfirmed, setIsConfirmed] = useState(false);

  const myIndex = journeySteps.findIndex(s => s.id === "combinedDetails");
  const isHistory = myIndex !== -1 && myIndex < currentStepIndex;
  const isActive = myIndex === currentStepIndex;

  useEffect(() => {
    if (isActive) trackEvent('page_viewed', { page: 'combinedDetails' });
  }, [isActive]);

  const handleConfirm = () => {
    setIsConfirmed(true);
    updateFormData({
      fatherName,
      motherName,
      maritalStatus,
      spouseName,
      currentAddress
    });

    setTimeout(() => {
      nextStep();
    }, 500);
  };

  if (isHistory) {
    return (
      <div className="space-y-3">
        <AgentMessage isNew={false}>
          I've updated your family details and address.
        </AgentMessage>
        <UserResponse isNew={false}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3 h-3" />
            <span>Family Details Confirmed</span>
          </div>
        </UserResponse>
      </div>
    );
  }

  if (!isActive) return null;

  return (
    <div className="space-y-3 w-full animate-in slide-in-from-bottom-4 duration-300">
      <AgentMessage>
        Please verify and update your family details. You can edit any field that needs correction.
      </AgentMessage>

      <div className="pl-8 space-y-3">
        <div className="bg-slate-50 rounded-lg p-4 space-y-3 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Family Details</span>
            <HelpIcon tooltip="Edit any field that needs correction" />
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-600">Father's Name</label>
              <Input
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="h-9 text-sm border-slate-200 focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-600">Mother's Name</label>
              <Input
                type="text"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
                className="h-9 text-sm border-slate-200 focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-600">Marital Status</label>
              <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {maritalStatus === "married" && (
              <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-200">
                <label className="text-xs text-slate-600">Spouse Name</label>
                <Input
                  type="text"
                  value={spouseName}
                  onChange={(e) => setSpouseName(e.target.value)}
                  className="h-9 text-sm border-slate-200 focus:border-blue-500"
                  placeholder="Enter spouse name"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs text-slate-600">Current Address</label>
              <Input
                type="text"
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
                className="h-9 text-sm border-slate-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleConfirm}
          disabled={isConfirmed || !fatherName || !motherName || !currentAddress}
          className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm"
        >
          {isConfirmed ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirmed
            </>
          ) : (
            "Confirm & Continue"
          )}
        </Button>
      </div>
    </div>
  );
}
