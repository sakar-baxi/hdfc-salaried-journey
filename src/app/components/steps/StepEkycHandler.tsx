"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ShieldCheck, ChevronRight, Eye } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function StepEkycHandler() {
  const { nextStep, addNotification } = useJourney();
  const [aadhaarNumber, setAadhaarNumber] = useState("4813 8765 2046");
  const [otpSent, setOtpSent] = useState(true); // Default to true to show the modal as per user request for prefill
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(52);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    trackEvent('page_viewed', { page: 'ekycHandler' });

    if (otpSent) {
      addNotification("Aadhaar", "Your Aadhaar OTP 592831 is sent to mobile ending in 3210.");
    }

    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [otpSent]);

  const handleVerify = () => {
    setIsLoading(true);
    trackEvent('ekyc_otp_submitted');
    setTimeout(() => {
      setIsLoading(false);
      addNotification("HDFC Bank", "Aadhaar e-KYC verified. Profile auto-populated.");
      nextStep();
    }, 1500);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto min-h-[600px] flex items-center justify-center">
      {/* Background UI (Image 0 Left) */}
      <Card className="w-full h-full border-none shadow-premium-lg bg-white/80 backdrop-blur-md rounded-[40px] overflow-hidden p-16 flex flex-col md:flex-row gap-20">
        <div className="flex-1 space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-[#111111]">Hey,</h1>
            <p className="text-2xl text-[#666666]">Verify identity using Aadhaar e-KYC</p>
          </div>

          <div className="w-full h-[1px] bg-slate-200 border-dashed border" />

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#111111]">Aadhaar e-KYC</h2>

            <div className="space-y-4 max-w-md">
              <div className="relative">
                <Input
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  className="h-16 text-2xl font-medium tracking-[0.2em] px-6 border-slate-300 rounded-xl"
                />
                <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-xs font-bold text-slate-500 uppercase">
                  12 Digit Aadhaar Number *
                </div>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Eye className="w-6 h-6" />
                </button>
              </div>
            </div>

            <Button className="h-16 px-12 rounded-xl bg-[#002D72] hover:bg-[#001D4D] text-white text-xl font-bold gap-3">
              Continue <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center gap-4 text-slate-400 font-bold text-2xl">
          Or
        </div>

        <div className="flex-1" />
      </Card>

      {/* Gray Overlay and Modal (Image 0 Center) */}
      {otpSent && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 rounded-[40px] animate-in fade-in duration-500">
          <Card className="w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden border-none p-12 space-y-10 animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Aadhaar Logo Placeholder */}
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png"
                  alt="Aadhaar"
                  className="w-16 h-16 object-contain"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-black text-[#111111]">Aadhaar OTP</h3>
                <p className="text-lg text-[#444444] font-medium leading-relaxed">
                  Enter the OTP sent to your mobile number registered with <br /> Aadhaar
                </p>
              </div>

              <div className="w-full relative py-4">
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="h-20 text-4xl text-center font-bold tracking-[0.5em] border-primary rounded-xl focus:ring-4 focus:ring-primary/10"
                  placeholder="      "
                  autoFocus
                />
                <div className="absolute top-4 left-6 -translate-y-1/2 bg-white px-2 text-sm font-bold text-primary">
                  Enter OTP*
                </div>
              </div>

              <div className="text-sm font-bold text-slate-400">
                Resend OTP in <span className="text-slate-900">00:{timer < 10 ? `0${timer}` : timer} secs.</span>
              </div>

              <Button
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full h-16 bg-[#0047CC] hover:bg-[#0037AA] text-white text-xl font-bold rounded-xl shadow-lg shadow-blue-900/20 gap-3"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit OTP & Verify"} <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Header/Footer Elements for Realism */}
      <div className="absolute top-8 left-8">
        <div className="bg-[#004A99] p-2 rounded">
          <img src="https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/297c88c7-24a3-41c1-9257-268e3981881a?" alt="HDFC" className="h-6" />
        </div>
      </div>
      <div className="absolute top-8 right-8">
        <div className="bg-[#D1FADF] px-4 py-2 rounded-full flex items-center gap-2 border border-green-200">
          <span className="text-green-800 font-bold text-xs">100% SAFE & SECURE</span>
          <ShieldCheck className="w-4 h-4 text-green-700" />
        </div>
      </div>
    </div>
  );
}
