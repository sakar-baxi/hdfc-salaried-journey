"use client";

import { useEffect, useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Building, ChevronRight, FileText } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export default function StepKycChoice() {
  const { goToStep } = useJourney();
  const [selected, setSelected] = useState<"aadhaar" | "other" | null>("aadhaar");

  useEffect(() => {
    trackEvent('page_viewed', { page: 'kycChoice' });
  }, []);

  const handleContinue = () => {
    if (selected === "aadhaar") {
      trackEvent('kyc_choice_made', { choice: 'ekyc' });
      goToStep("ekycHandler");
    } else {
      trackEvent('kyc_choice_made', { choice: 'physical' });
      goToStep("physicalKyc");
    }
  };

  return (
    <Card className="w-full max-w-4xl border-none md:border md:shadow-premium md:rounded-3xl mx-auto bg-card/60 backdrop-blur-xl overflow-hidden min-h-[500px] flex flex-col">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-blue-400 to-primary/50" />
      <CardHeader className="text-center pt-12 pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight text-primary">
          Select KYC Method for your verification
        </CardTitle>
      </CardHeader>

      <CardContent className="px-10 pb-8 flex-1 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row gap-0 rounded-3xl overflow-hidden border border-primary/20 shadow-premium-sm transition-all duration-500">
          {/* Aadhaar Card */}
          <button
            onClick={() => setSelected("aadhaar")}
            className={cn(
              "flex-1 p-10 flex flex-col items-center justify-center gap-4 transition-all duration-500 relative group",
              selected === "aadhaar"
                ? "bg-primary text-white"
                : "bg-white text-primary hover:bg-blue-50"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
              selected === "aadhaar" ? "bg-white/20" : "bg-primary/5 group-hover:bg-primary/10"
            )}>
              <Smartphone className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">Use Aadhaar</h3>
              <p className={cn(
                "text-xs mt-2 font-medium opacity-80 uppercase tracking-widest",
                selected === "aadhaar" ? "text-blue-100" : "text-slate-500"
              )}>
                (Create Instant Account)
              </p>
            </div>
            {selected === "aadhaar" && (
              <div className="absolute inset-0 border-4 border-white opacity-20 pointer-events-none" />
            )}
          </button>

          <div className="w-[1px] bg-primary/10 hidden md:block" />

          {/* Other Card */}
          <button
            onClick={() => setSelected("other")}
            className={cn(
              "flex-1 p-10 flex flex-col items-center justify-center gap-4 transition-all duration-500 relative group",
              selected === "other"
                ? "bg-primary text-white"
                : "bg-white text-primary hover:bg-blue-50"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
              selected === "other" ? "bg-white/20" : "bg-primary/5 group-hover:bg-primary/10"
            )}>
              <Building className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">Use Other Document for KYC</h3>
              <p className={cn(
                "text-xs mt-2 font-medium opacity-80 uppercase tracking-widest",
                selected === "other" ? "text-blue-100" : "text-slate-500"
              )}>
                (Requires Branch Visit)
              </p>
            </div>
            {selected === "other" && (
              <div className="absolute inset-0 border-4 border-white opacity-20 pointer-events-none" />
            )}
          </button>
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleContinue}
            className="h-16 px-16 rounded-full bg-[#00871E] hover:bg-[#007018] text-white text-2xl font-bold shadow-xl shadow-green-900/20 gap-3 transition-all hover:scale-[1.05] active:scale-[0.95]"
          >
            Continue <ChevronRight className="w-6 h-6 stroke-[3px]" />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="pb-10 pt-0 flex justify-center">
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <FileText className="w-3 h-3" /> All data is encrypted and secure with HDFC Bank
        </p>
      </CardFooter>
    </Card>
  );
}
