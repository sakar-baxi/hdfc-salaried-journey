"use client";

import React, { useEffect, useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Building2, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { JourneyType } from "@/app/context/stepDefinitions";

export default function StepJourneySelection() {
  const { setJourneyType } = useJourney();
  const [name, setName] = useState("Sakar Baxi");
  const [accountNumber, setAccountNumber] = useState("");
  const [pan, setPan] = useState("ABCDE1234F");
  const [isMatching, setIsMatching] = useState(false);
  const [matchedJourney, setMatchedJourney] = useState<JourneyType | null>(null);

  useEffect(() => {
    trackEvent('page_viewed', { page: 'journeySelection' });
  }, []);

  const handleNameMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);
    trackEvent('name_match_initiated', { name, accountNumber, pan });

    setTimeout(() => {
      let journey: JourneyType;
      if (accountNumber && accountNumber.length > 0) {
        journey = "journey3";
      } else {
        journey = "journey2";
      }

      setMatchedJourney(journey);
      setIsMatching(false);
      trackEvent('name_match_completed', { journey });

      setTimeout(() => {
        setJourneyType(journey);
        trackEvent('journey_selected', { journey });
      }, 1500);
    }, 1500);
  };

  if (matchedJourney) {
    return (
      <Card className="w-full max-w-2xl border-none md:border md:shadow-premium md:rounded-3xl mx-auto bg-card/60 backdrop-blur-xl">
        <CardContent className="h-[600px] flex flex-col items-center justify-center text-center p-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <Loader2 className="w-20 h-20 text-primary animate-spin relative z-10" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {matchedJourney === "journey3"
              ? "Converting your existing account..."
              : matchedJourney === "journey2"
                ? "Personalizing your journey..."
                : "Starting eKYC Journey..."}
          </p>
          <p className="text-muted-foreground mt-4 max-w-sm">
            We're setting up the best experience for you based on your background.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl border-none md:border md:shadow-premium md:rounded-3xl mx-auto bg-card/60 backdrop-blur-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-blue-400 to-primary/50" />
      <CardHeader className="space-y-4 pb-8 pt-10 px-8">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 ring-1 ring-primary/20">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight text-gradient">Select Journey</CardTitle>
            <CardDescription className="text-lg mt-2">
              Start your premium HDFC Bank experience.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-10">
        <form onSubmit={handleNameMatch} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="As per Aadhaar"
                className="h-14 bg-blue-50/50 border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 transition-all rounded-xl px-4 text-lg font-medium"
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pan" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">PAN Number</Label>
              <Input
                id="pan"
                required
                value={pan}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                  setPan(value);
                }}
                placeholder="ABCDE1234F"
                maxLength={10}
                className="h-14 bg-blue-50/50 border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 transition-all rounded-xl px-4 font-mono tracking-widest text-lg"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber" className="text-sm font-bold uppercase tracking-wider text-primary/70">
              HDFC Account Number (Optional)
            </Label>
            <Input
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter if you have an existing account"
              className="h-14 bg-blue-50/50 border-none shadow-premium-sm focus:ring-2 focus:ring-primary/20 transition-all rounded-xl px-4"
              type="text"
            />
            <p className="text-xs text-muted-foreground px-1 italic">
              Provides direct conversion benefits for existing customers.
            </p>
          </div>

          <Button
            type="submit"
            variant="primary-cta"
            className="w-full h-16 text-xl font-bold shadow-xl shadow-primary/20 rounded-full hover:scale-[1.02] transition-all active:scale-[0.98] mt-4"
            disabled={isMatching || !name || !pan}
          >
            {isMatching ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                Start Journey <ArrowRight className="ml-3 h-6 w-6" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="bg-primary/5 px-8 py-8 border-t border-primary/10">
        <div className="w-full">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-center text-primary/60 mb-6">
            Optimized Paths
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Salary Account", icon: CreditCard, desc: "Premium" },
              { label: "Savings Max", icon: Building2, desc: "Classic" },
              { label: "Instant Digital", icon: ArrowRight, desc: "Lite" }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white/60 rounded-2xl border border-white/40 flex flex-col items-center text-center group hover:bg-white transition-all shadow-sm">
                <item.icon className="h-6 w-6 mb-2 text-primary/70 group-hover:text-primary transition-colors" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800">{item.label}</p>
                <p className="text-[9px] text-muted-foreground font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
