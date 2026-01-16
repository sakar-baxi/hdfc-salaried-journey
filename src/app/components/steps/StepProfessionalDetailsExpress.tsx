"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader2, Info } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import StepBanner from "./StepBanner";
import { cn } from "@/lib/utils";

export default function StepProfessionalDetailsExpress() {
    const { nextStep, formData, updateFormData } = useJourney();

    // Form States - Only Annual Income required
    const [annualIncome, setAnnualIncome] = useState(formData.annualIncome || "2000000");

    // Checkbox States
    const [enableTransfer, setEnableTransfer] = useState(true);
    const [emailStatement, setEmailStatement] = useState(true);
    const [isPep, setIsPep] = useState(false);

    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        trackEvent('page_viewed', { page: 'professional_details_express' });
    }, []);

    const handleContinue = () => {
        setIsRedirecting(true);
        updateFormData({
            annualIncome,
            enableTransfer,
            emailStatement,
            isPep
        });

        setTimeout(() => {
            setIsRedirecting(false);
            nextStep();
        }, 1500);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <StepBanner
                title="Your Profile"
                subTitle="Some information about your financial profile"
            />

            <Card className="border-none shadow-premium-lg bg-card/60 backdrop-blur-xl rounded-[32px] overflow-hidden">
                <CardContent className="p-8 md:p-12 space-y-8">

                    {/* Only Annual Income Input */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Your Annual Income</Label>
                            <Input
                                type="text"
                                inputMode="numeric"
                                value={annualIncome}
                                onChange={(e) => setAnnualIncome(e.target.value.replace(/\D/g, ''))}
                                className="h-14 font-semibold text-lg bg-white border-slate-200 focus:border-primary px-4 rounded-xl"
                                placeholder="Enter Amount"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="transfer"
                                checked={enableTransfer}
                                onCheckedChange={(c) => setEnableTransfer(c === true)}
                                className="w-5 h-5 border-2 border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label htmlFor="transfer" className="text-sm font-medium text-slate-700 cursor-pointer">
                                Enable money transfer to Non-HDFC bank account holder
                            </Label>
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="statement"
                                checked={emailStatement}
                                onCheckedChange={(c) => setEmailStatement(c === true)}
                                className="w-5 h-5 border-2 border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label htmlFor="statement" className="text-sm font-medium text-slate-700 cursor-pointer">
                                Mail me my Bank account statement
                            </Label>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <Label className="text-sm font-medium text-slate-700">
                                Are you a Politician or a Politically Exposed person (PEP)
                                <Info className="w-4 h-4 inline ml-1 text-slate-400" />
                            </Label>
                            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                                <button type="button" onClick={() => setIsPep(true)} className={cn("px-4 py-1.5 rounded-md text-sm font-bold transition-all", isPep ? "bg-white shadow-sm text-primary" : "text-slate-400")}>Yes</button>
                                <button type="button" onClick={() => setIsPep(false)} className={cn("px-4 py-1.5 rounded-md text-sm font-bold transition-all", !isPep ? "bg-white shadow-sm text-primary" : "text-slate-400")}>No</button>
                            </div>
                        </div>
                    </div>

                </CardContent>

                <CardFooter className="p-10 pt-0 flex justify-center">
                    <Button
                        onClick={handleContinue}
                        disabled={isRedirecting}
                        className="h-14 px-16 rounded-full bg-[#00871E] hover:bg-[#007018] text-white text-xl font-bold shadow-xl shadow-green-900/20 gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isRedirecting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit"} <ArrowRight className="w-6 h-6" />
                    </Button>
                </CardFooter>
            </Card>

            {isRedirecting && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100]">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <p className="font-bold text-slate-700">Updating your profile...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
