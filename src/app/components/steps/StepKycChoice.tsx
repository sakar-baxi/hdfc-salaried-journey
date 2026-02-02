"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { CheckCircle2, MapPin, FileText } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function StepKycChoice() {
  const { nextStep, goToStep, formData, updateFormData } = useJourney();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(formData.kycMethod || null);

  useEffect(() => {
    trackEvent('page_viewed', { page: 'kyc_choice' });
  }, []);

  const handleChoice = (method: "ekyc" | "physicalKyc") => {
    setSelectedMethod(method);
    updateFormData({ kycMethod: method });
    trackEvent('kyc_method_selected', { method });

    if (method === "physicalKyc") {
      goToStep("physicalKyc");
    } else {
      nextStep();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">KYC Verification</h1>
        <p className="text-slate-500">Choose your preferred method to verify your identity</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8 space-y-4">
        <div
          onClick={() => handleChoice("ekyc")}
          className="w-full flex items-center gap-4 p-5 rounded-xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 transition-colors">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-slate-900">e-KYC via Aadhaar</p>
            <p className="text-sm text-slate-500">Fastest way. Requires Aadhaar registered mobile.</p>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-blue-600 flex items-center justify-center transition-colors">
            <div className="w-3 h-3 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div
          onClick={() => handleChoice("physicalKyc")}
          className="w-full flex items-center gap-4 p-5 rounded-xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center flex-shrink-0 transition-colors">
            <MapPin className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-slate-900">Physical KYC</p>
            <p className="text-sm text-slate-500">Visit nearest branch or schedule a visit.</p>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-blue-600 flex items-center justify-center transition-colors">
            <div className="w-3 h-3 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 max-w-sm mx-auto">
        Verification is mandatory as per RBI guidelines. Your data is encrypted and secure.
      </p>
    </div>
  );
}
