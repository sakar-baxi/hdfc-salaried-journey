"use client";

import React, { useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { useBranding } from "@/app/context/BrandingContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Mail, Users, MapPin, Award, Wallet, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StepCombinedDetails() {
  const { nextStep, formData, updateFormData } = useJourney();
  const { config } = useBranding();

  const [email, setEmail] = useState(formData.email || "");
  const [fatherName, setFatherName] = useState(formData.fatherName || "");
  const [motherName, setMotherName] = useState(formData.motherName || "");
  const [maritalStatus, setMaritalStatus] = useState(formData.maritalStatus || "");
  const [currentAddress, setCurrentAddress] = useState(formData.currentAddress || "");
  const [income, setIncome] = useState(formData.income || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    if (!isFormValid) return;
    setIsLoading(true);
    updateFormData({ email, fatherName, motherName, maritalStatus, currentAddress, income });
    setTimeout(() => {
      setIsLoading(false);
      nextStep();
    }, 1000);
  };

  const isFormValid = email && fatherName && motherName && maritalStatus && currentAddress && income;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col max-w-7xl mx-auto w-full">
      <div className="bg-white rounded-[24px] shadow-lg border border-slate-200/80 overflow-hidden transition-all duration-500 flex-1 flex flex-col min-h-0 hover:shadow-xl hover:border-blue-100/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch flex-1 min-h-0">

          {/* Main Space */}
          <div className={cn(
            "p-6 md:p-8 lg:p-10 space-y-8 flex flex-col transition-all duration-700 overflow-y-auto custom-scrollbar",
            config.modules.showBenefits ? "lg:col-span-9" : "lg:col-span-12"
          )}>

            {/* Header Context */}
            <div className="space-y-1 border-b border-slate-50 pb-6 mb-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 tracking-tighter uppercase font-sans">Personal Details</h2>
              <p className="text-slate-400 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] opacity-60">Identity & Demographic Information</p>
            </div>

            {/* Section: Identity */}
            <div className="space-y-6">
              <header className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100/60 flex items-center justify-center text-slate-300">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 tracking-tighter">Identity Information</h3>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Regulatory Details</p>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2.5">
                    <Mail className="w-3.5 h-3.5" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    readOnly
                    className="h-12 border-slate-100 rounded-xl bg-slate-50/20 font-semibold text-slate-400 cursor-not-allowed border-dashed text-sm px-4"
                  />
                </div>

                <div className="space-y-2 lg:col-span-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2.5">
                    <Award className="w-3.5 h-3.5" />
                    Marital Status
                  </label>
                  <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                    <SelectTrigger className="h-12 border-slate-100 rounded-xl bg-white focus:ring-4 focus:ring-blue-50/60 transition-all font-semibold text-slate-800 text-sm px-4 shadow-sm">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 shadow-xl p-2 bg-white/98 backdrop-blur-3xl">
                      <SelectItem value="single" className="rounded-lg focus:bg-slate-50 text-sm font-semibold py-2 px-4 shadow-sm">Single</SelectItem>
                      <SelectItem value="married" className="rounded-lg focus:bg-slate-50 text-sm font-semibold py-2 px-4 shadow-sm">Married</SelectItem>
                      <SelectItem value="other" className="rounded-lg focus:bg-slate-50 text-sm font-semibold py-2 px-4 shadow-sm">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2.5">
                    <Users className="w-3.5 h-3.5" />
                    Father's Name
                  </label>
                  <Input
                    value={fatherName}
                    readOnly
                    className="h-12 border-slate-100 rounded-xl bg-slate-50/20 font-semibold text-slate-400 cursor-not-allowed border-dashed text-sm px-4"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2.5">
                    <Users className="w-3.5 h-3.5" />
                    Mother's Name
                  </label>
                  <Input
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    className="h-12 border-slate-100 rounded-xl bg-white focus:ring-4 focus:ring-blue-50/60 transition-all font-semibold text-slate-800 text-sm px-4 shadow-sm"
                    placeholder="Full name"
                  />
                </div>
              </div>
            </div>

            {/* Section: Residence */}
            <div className="space-y-6">
              <header className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100/60 flex items-center justify-center text-slate-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 tracking-tighter">Residential Address</h3>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Address Details</p>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <textarea
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                  className="w-full min-h-[100px] p-6 text-base border border-slate-100 rounded-2xl bg-slate-50/10 focus:ring-4 focus:ring-blue-50/60 focus:bg-white transition-all font-semibold text-slate-800 shadow-inner resize-none font-sans"
                  placeholder="Official street address and postal code"
                />

                <div className="space-y-6">
                  {!config.modules.showBenefits && (
                    <>
                      <div className="space-y-3">
                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-3">
                          <Wallet className="w-4 h-4 text-slate-300" />
                          Annual Income
                        </label>
                        <div className="relative group">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-200 font-semibold text-2xl group-focus-within:text-slate-900 transition-colors">₹</span>
                          <Input
                            type="text"
                            inputMode="numeric"
                            value={income}
                            onChange={(e) => setIncome(e.target.value.replace(/\D/g, ''))}
                            className="h-14 pl-10 border border-slate-100 rounded-xl bg-slate-50/10 focus:ring-8 focus:ring-blue-50/60 focus:bg-white transition-all font-semibold text-2xl text-slate-900 shadow-inner px-12"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleContinue}
                        disabled={isLoading || !isFormValid}
                        className="w-full h-14 text-white font-semibold text-lg transition-all shadow-md active:scale-[0.98] rounded-xl flex items-center justify-center gap-4"
                        style={{ backgroundColor: config.primary }}
                      >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          {config.modules.showBenefits && (
            <div className="lg:col-span-3 bg-slate-50/10 p-6 md:p-8 lg:p-10 space-y-8 border-l border-slate-50 flex flex-col justify-center animate-in slide-in-from-right-8 duration-700 min-h-0">
              <header className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-lg border border-slate-50 flex items-center justify-center" style={{ color: config.primary }}>
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 tracking-tighter">Income Details</h3>
              </header>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-3">
                    <Wallet className="w-4 h-4" />
                    Annual Income
                  </label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-200 font-semibold text-2xl group-focus-within:text-slate-900 transition-colors">₹</span>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={income}
                      onChange={(e) => setIncome(e.target.value.replace(/\D/g, ''))}
                      className="h-14 pl-12 border border-slate-100 rounded-xl bg-white focus:ring-8 focus:ring-blue-50/60 transition-all font-semibold text-2xl text-slate-900 shadow-lg px-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {config.modules.showSecurity && (
                  <div className="p-6 bg-white/80 backdrop-blur-3xl rounded-2xl border border-slate-50 shadow-md space-y-4">
                    <div className="flex items-center gap-3 text-slate-900">
                      <ShieldCheck className="w-5 h-5 opacity-70" style={{ color: config.primary }} />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Institutional</span>
                    </div>
                    <p className="text-[13px] text-slate-500 font-semibold leading-relaxed">
                      Accurate income declarations significantly accelerate limit approvals.
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleContinue}
                  disabled={isLoading || !isFormValid}
                  className="w-full h-14 text-white font-semibold text-lg transition-all shadow-md active:scale-[0.98] rounded-xl flex items-center justify-center gap-4"
                  style={{ backgroundColor: config.primary }}
                >
                  <span className="relative z-10">{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
