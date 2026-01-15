"use client";

import React, { useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Building2, CreditCard, ArrowRight, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function StepAccountConversion() {
    const { nextStep } = useJourney();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConvert = () => {
        setIsProcessing(true);
        trackEvent('account_conversion_started');

        // Premium simulation
        setTimeout(() => {
            setIsProcessing(false);
            nextStep();
        }, 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <Card className="border-none shadow-premium-lg bg-white/80 backdrop-blur-xl rounded-[40px] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

                <CardHeader className="p-12 pb-6 text-center space-y-4">
                    <div className="mx-auto w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-4 ring-1 ring-blue-100">
                        <Building2 className="w-10 h-10 text-blue-600" />
                    </div>
                    <CardTitle className="text-4xl font-black text-slate-900 tracking-tight">
                        Upgrade your Experience
                    </CardTitle>
                    <CardDescription className="text-xl font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        We've found an existing HDFC Bank Savings account. Would you like to convert it into a <span className="text-blue-600 font-bold">Premium Salary Account</span>?
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-12 pb-12 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
                            <div className="flex items-center gap-3 text-blue-600">
                                <CheckCircle2 className="w-5 h-5 font-bold" />
                                <span className="font-black uppercase text-xs tracking-widest">Enhanced Benefits</span>
                            </div>
                            <p className="text-slate-600 font-bold">Zero Balance requirement with premium debit card access.</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
                            <div className="flex items-center gap-3 text-blue-600">
                                <CheckCircle2 className="w-5 h-5 font-bold" />
                                <span className="font-black uppercase text-xs tracking-widest">Instant Approval</span>
                            </div>
                            <p className="text-slate-600 font-bold">Priority processing for credit cards and personal loans.</p>
                        </div>
                    </div>

                    <div className="p-8 rounded-[32px] bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-between shadow-lg shadow-blue-900/20">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                <CreditCard className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-black opacity-60 uppercase tracking-widest">Current Account</p>
                                <p className="text-2xl font-black italic">XXXX XXXX 1234</p>
                            </div>
                        </div>
                        <div className="hidden md:block text-right">
                            <p className="text-xs font-black opacity-40 uppercase tracking-[0.2em] mb-1 text-white">Status</p>
                            <span className="px-4 py-1.5 bg-emerald-400 text-emerald-900 text-[10px] font-black rounded-full uppercase">Verified</span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="p-12 pt-0 flex flex-col items-center gap-6">
                    <Button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        className="h-20 px-12 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white text-2xl font-black shadow-xl shadow-emerald-900/20 gap-4 transition-all hover:scale-[1.05] active:scale-[0.95]"
                    >
                        {isProcessing ? <Loader2 className="w-8 h-8 animate-spin" /> : (
                            <>Convert to Salary Account <ArrowRight className="w-6 h-6 stroke-[3px]" /></>
                        )}
                    </Button>
                    <button className="text-slate-400 font-bold hover:text-slate-600 transition-colors">I'll do this later</button>
                </CardFooter>
            </Card>

            <p className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                HDFC Bank • Secure Node • Internal Migration
            </p>
        </div>
    );
}
