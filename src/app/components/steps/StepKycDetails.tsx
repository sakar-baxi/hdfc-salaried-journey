"use client";

import React, { useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, ClipboardCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import AgentMessage from "@/app/components/chat/AgentMessage";
import UserResponse from "@/app/components/chat/UserResponse";

export default function StepKycDetails() {
    const { nextStep, currentStepIndex, journeySteps } = useJourney();

    const myIndex = journeySteps.findIndex(s => s.id === "kycDetails");
    const isHistory = myIndex !== -1 && myIndex < currentStepIndex;
    const isActive = myIndex === currentStepIndex;

    useEffect(() => {
        if (isActive) trackEvent('page_viewed', { page: 'kyc_details_consent' });
    }, [isActive]);

    const handleAgree = () => {
        trackEvent('kyc_consent_agreed');
        nextStep();
    };

    if (isHistory) {
        return (
            <div className="space-y-6">
                <AgentMessage isNew={false}>
                    Great! I've recorded your consent for the Video KYC process.
                </AgentMessage>
                <UserResponse isNew={false}>
                    Consent given for VCIP and Aadhaar e-KYC.
                    <span className="ml-2 inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">Agreed</span>
                </UserResponse>
            </div>
        );
    }

    if (!isActive) return null;

    return (
        <div className="space-y-6 w-full animate-in slide-in-from-bottom-8 duration-700">
            <AgentMessage>
                We're almost there! 🚀 I just need your consent to initiate the Video KYC process. Please review the terms below.
            </AgentMessage>

            <div className="pl-14 space-y-6">
                <div className="bg-white rounded-[40px] shadow-premium-lg border border-slate-50 overflow-hidden">
                    <div className="p-8 lg:p-10 space-y-8">
                        <div className="bg-slate-50/80 p-6 lg:p-8 rounded-3xl border border-slate-100 text-slate-600 text-[13px] leading-relaxed font-bold space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                            <p>
                                I hereby give my consent to complete my KYC through VCIP (Video Customer Identification Process) as prescribed by RBI and processing of personal data (Name, PAN #, DoB, Photograph, Lat Long, Signature, Economic and Financial Profile data) for KYC and agree to abide by the Terms and Conditions laid down by the Bank for Savings/Salary Account.
                            </p>
                            <p>
                                I hereby declare that I have completed the application myself and on my device.
                            </p>
                            <p>
                                I confirm that I am present in India while doing this Video KYC I hereby authorise the bank to open Savings/Salary Account using Aadhaar OTP based e-KYC, in non face-to face mode, in case my Video KYC process in unsuccessful due to any reason, which would be subject to restrictions/guidelines prescribed by RBI.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <Button
                                onClick={handleAgree}
                                className="h-16 px-20 rounded-2xl bg-slate-900 hover:bg-black text-white text-xl font-black shadow-xl shadow-slate-900/20 gap-3 transition-all hover:scale-105 active:scale-95"
                            >
                                I Agree <ArrowRight className="w-5 h-5" />
                            </Button>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">RBI Compliant</span>
                                </div>
                                <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                <div className="flex items-center gap-2">
                                    <ClipboardCheck className="w-4 h-4 text-blue-500" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Consent</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
