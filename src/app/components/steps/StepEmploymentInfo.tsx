"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Info, Heart, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import StepBanner from "./StepBanner";
import { cn } from "@/lib/utils";

export default function StepEmploymentInfo() {
  const { nextStep } = useJourney();
  const [maritalStatus, setMaritalStatus] = useState<"Single" | "Married">("Married");
  const [fatherName, setFatherName] = useState("Ramesh Ameta");
  const [motherName, setMotherName] = useState("Maina Ameta");
  const [nomineeName, setNomineeName] = useState("Maina Ameta");
  const [nomineeDob, setNomineeDob] = useState({ day: "19", month: "07", year: "1971" });
  const [nomineeAddressType, setNomineeAddressType] = useState("Others");
  const [addressSame, setAddressSame] = useState(true);

  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    trackEvent('page_viewed', { page: 'yourInfo' });
  }, []);

  const handleContinue = () => {
    setIsRedirecting(true);
    trackEvent('form_submitted_your_info', { maritalStatus });

    // Simulate redirection delay for premium feel
    setTimeout(() => {
      setIsRedirecting(false);
      nextStep();
    }, 2500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <StepBanner
        title="Please update your Personal Info"
        name="Chirag Ameta"
        subTitle="S S PLAZA"
      />

      <Card className="border-none shadow-premium-lg bg-card/60 backdrop-blur-xl rounded-[32px] overflow-hidden">
        <CardContent className="p-10 space-y-10">
          {/* Marital Status */}
          <div className="space-y-4">
            <Label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Your Marital Status is</Label>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full max-w-md border border-slate-200">
              <button
                onClick={() => setMaritalStatus("Single")}
                className={cn(
                  "flex-1 py-3 px-6 rounded-xl font-bold transition-all text-lg",
                  maritalStatus === "Single" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                Single
              </button>
              <button
                onClick={() => setMaritalStatus("Married")}
                className={cn(
                  "flex-1 py-3 px-6 rounded-xl font-bold transition-all text-lg",
                  maritalStatus === "Married" ? "bg-[#002D72] text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                )}
              >
                Married
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <Heart className="w-5 h-5" /> We will need details of your family
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Father's Name</Label>
                <Input
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="h-14 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 text-lg font-semibold"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Mother's Name</Label>
                <Input
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  className="h-14 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 text-lg font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
              <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Relation with you</Label>
                <Select defaultValue="Mother">
                  <SelectTrigger className="h-14 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 text-lg font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-premium">
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Nominee's Name</Label>
                <Input
                  value={nomineeName}
                  onChange={(e) => setNomineeName(e.target.value)}
                  className="h-14 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 text-lg font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Nominee's Date of Birth</Label>
                <div className="flex gap-2">
                  <Input value={nomineeDob.day} className="h-14 w-16 text-center text-lg font-bold rounded-xl" />
                  <Input value={nomineeDob.month} className="h-14 w-16 text-center text-lg font-bold rounded-xl" />
                  <Input value={nomineeDob.year} className="h-14 w-24 text-center text-lg font-bold rounded-xl" />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-slate-100">
              <div className="space-y-4">
                <Label className="text-sm font-bold text-slate-700">Is your current address the same as on Aadhaar?</Label>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="addr-same"
                      name="addressSame"
                      checked={addressSame}
                      onChange={() => setAddressSame(true)}
                      className="w-4 h-4 text-primary"
                    />
                    <label htmlFor="addr-same" className="text-sm font-bold text-slate-700">Yes</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="addr-diff"
                      name="addressSame"
                      checked={!addressSame}
                      onChange={() => setAddressSame(false)}
                      className="w-4 h-4 text-primary"
                    />
                    <label htmlFor="addr-diff" className="text-sm font-bold text-slate-700">No, I want to edit</label>
                  </div>
                </div>
              </div>

              {!addressSame && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Update Your Current Address</Label>
                  <Input
                    placeholder="House No, Building, Street"
                    className="h-14 bg-white border border-slate-200 rounded-2xl px-6 font-semibold"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="City" className="h-14 bg-white border border-slate-200 rounded-2xl px-6 font-semibold" />
                    <Input placeholder="PIN Code" className="h-14 bg-white border border-slate-200 rounded-2xl px-6 font-semibold" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-10 pt-0 flex justify-center flex-col gap-4">
          <Button
            onClick={handleContinue}
            disabled={isRedirecting}
            className="h-16 px-16 rounded-full bg-[#00871E] hover:bg-[#007018] text-white text-2xl font-bold shadow-xl shadow-green-900/20 gap-3 transition-all hover:scale-[1.05] active:scale-[0.95]"
          >
            {isRedirecting ? <Loader2 className="w-8 h-8 animate-spin" /> : "Continue"} <ArrowRight className="w-6 h-6 stroke-[3px]" />
          </Button>
          <button className="text-primary font-bold hover:underline text-lg">Save For later</button>
        </CardFooter>
      </Card>

      {/* Redirecting Modal */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] animate-in fade-in duration-300">
          <Card className="w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden border-none p-12 text-center space-y-8 animate-in zoom-in-95">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-[#111111]">Stand by! While we redirect you to the next page</h3>
              <p className="text-[#666666] font-bold">This may take some time to load Please hold on until the page fully loads</p>
              <p className="text-primary font-black uppercase text-xs tracking-widest mt-4">Kindly do not close this window in order to proceed with the authentication</p>
            </div>

            <div className="flex justify-center py-6">
              <Loader2 className="w-16 h-16 text-primary animate-spin opacity-20" />
              <div className="absolute flex gap-1 items-center mt-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
