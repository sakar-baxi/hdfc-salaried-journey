"use client";

import React from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import StepBanner from "./StepBanner";

export default function StepKycDetails() {
    const { nextStep } = useJourney();

    const handleAgree = () => {
        trackEvent('kyc_consent_agreed');
        nextStep();
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <StepBanner
                title=""
                name="Chirag Ameta"
                subTitle="S S PLAZA"
            />

            <Card className="border-none shadow-premium-lg bg-card/60 backdrop-blur-xl rounded-[32px] overflow-hidden">
                <CardContent className="p-10">
                    <div className="bg-white/80 p-8 rounded-2xl border-2 border-primary/20 space-y-6 text-slate-700 leading-relaxed font-medium">
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
                </CardContent>

                <CardFooter className="p-10 pt-0 flex flex-col items-center gap-6">
                    <Button
                        onClick={handleAgree}
                        className="h-16 px-24 rounded-full bg-[#00871E] hover:bg-[#007018] text-white text-3xl font-bold shadow-xl shadow-green-900/20 gap-3 transition-all hover:scale-[1.05] active:scale-[0.95]"
                    >
                        I Agree
                    </Button>

                    <button className="text-primary font-bold hover:underline text-lg">
                        Save For later
                    </button>
                </CardFooter>
            </Card>

            <p className="text-center text-xs text-muted-foreground pt-4">© Copyright HDFC Bank Ltd.</p>
        </div>
    );
}
