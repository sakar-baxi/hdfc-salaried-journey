"use client";

import React, { useEffect, useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { useBranding } from "@/app/context/BrandingContext";
import {
  CheckCircle2,
  Download,
  CreditCard,
  Gift,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Home
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

export default function StepComplete() {
  const { formData } = useJourney();
  const { config } = useBranding();
  const [isApiLoading, setIsApiLoading] = useState(true);

  useEffect(() => {
    trackEvent('journey_completed');
    // Simulate final API call to fetch account details
    const timer = setTimeout(() => {
      setIsApiLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const offers = [
    { icon: CreditCard, title: "Millennia Credit Card", desc: "Pre-approved with ₹2.5L limit", color: "bg-blue-50 text-blue-600" },
    { icon: TrendingUp, title: "Personal Loan", desc: "Instant disbursal up to ₹15L", color: "bg-purple-50 text-purple-600" },
    { icon: Home, title: "Home Loan Refinancing", desc: "Rates starting at 8.45% p.a.", color: "bg-orange-50 text-orange-600" },
    { icon: ShieldCheck, title: "Secure Life Insurance", desc: "Cover up to ₹1 Crore", color: "bg-green-50 text-green-600" },
    { icon: Gift, title: "Demat Account", desc: "Zero AMC for first year", color: "bg-pink-50 text-pink-600" },
  ];

  if (isApiLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-slate-100 border-t-transparent animate-spin" style={{ borderTopColor: config.primary }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-slate-200" />
          </div>
        </div>
        <h2 className="mt-8 text-xl font-bold text-slate-800">Finalizing Your Account</h2>
        <p className="mt-2 text-slate-500 font-medium">Communicating with {config.name} Core Systems...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700 pb-20">
      <div className="space-y-2 text-center mb-8">
        <div className="w-24 h-24 bg-green-100/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200 shadow-sm animate-bounce-subtle">
          <CheckCircle2 className="w-14 h-14 text-green-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Active!</h1>
        <p className="text-slate-500 font-medium max-w-sm mx-auto">Welcome aboard, {formData.name || 'valued customer'}. Your banking journey starts now.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 lg:p-10 space-y-8 relative overflow-hidden">
        {/* Account Details Glass Card */}
        <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center gap-6 group hover:scale-[1.01] transition-transform duration-500">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Customer ID (CIF)</p>
            <p className="text-2xl font-bold text-slate-800 tabular-nums">192837465</p>
          </div>
          <div className="w-full h-px bg-slate-200/40" />
          <div className="grid grid-cols-2 gap-8 w-full">
            <div className="text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Number</p>
              <p className="text-lg font-bold text-slate-800 tabular-nums">XXXX XXXX 1234</p>
            </div>
            <div className="text-center border-l border-slate-200/40">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Branch Name</p>
              <p className="text-lg font-bold text-slate-900 capitalize">Mumbai Main</p>
            </div>
          </div>
        </div>

        {/* Pre-approved Offers Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 tracking-widest uppercase">Exclusive for You</h3>
            <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-black uppercase">Pre-Approved</span>
          </div>

          <div className="space-y-3">
            {offers.map((offer, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer group"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110", offer.color)}>
                  <offer.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{offer.title}</p>
                  <p className="text-xs text-slate-500 font-medium">{offer.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 h-14 text-white font-bold shadow-xl transition-all active:scale-[0.98] rounded-2xl" style={{ backgroundColor: config.primary }}>
            Setup Mobile Banking
          </Button>
          <Button variant="outline" className="flex-1 h-14 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-2xl active:scale-[0.98]">
            View Passbook
          </Button>
        </div>
      </div>

      <p className="text-center text-slate-400 text-xs font-bold tracking-wider uppercase">
        © 2026 {config.name}. All Rights Reserved.
      </p>
    </div>
  );
}
