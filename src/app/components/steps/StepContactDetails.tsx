"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Info, Heart, Home, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import StepBanner from "./StepBanner";
import { cn } from "@/lib/utils";

export default function StepContactDetails() {
    const { nextStep, formData, updateFormData } = useJourney();
    const [residenceType, setResidenceType] = useState(formData.residenceType || "Owned");
    const [maritalStatus, setMaritalStatus] = useState<"Single" | "Married">(formData.maritalStatus || "Married");
    const [fatherName, setFatherName] = useState(formData.fatherName || "Ramesh Ameta");
    const [motherName, setMotherName] = useState(formData.motherName || "Maina Ameta");
    const [nomineeName, setNomineeName] = useState(formData.nomineeName || "Maina Ameta");
    const [nomineeDob, setNomineeDob] = useState(formData.nomineeDob || { day: "19", month: "07", year: "1971" });
    const [addressSame, setAddressSame] = useState(formData.addressSame !== undefined ? formData.addressSame : true);
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        trackEvent('page_viewed', { page: 'profileUpdate' });
    }, []);

    const handleContinue = () => {
        setIsRedirecting(true);
        trackEvent('form_submitted_profile_update', { maritalStatus, residenceType });
        updateFormData({
            residenceType,
            maritalStatus,
            fatherName,
            motherName,
            nomineeName,
            nomineeDob,
            addressSame
        });

        // Simulate redirection delay for premium feel
        setTimeout(() => {
            setIsRedirecting(false);
            nextStep();
        }, 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <StepBanner
                title="Verify & Update your Profile"
                name="Chirag Ameta"
                subTitle="S S PLAZA"
            />

            <Card className="border-none shadow-premium-lg bg-card/60 backdrop-blur-xl rounded-[32px] overflow-hidden">
                <CardContent className="p-10 space-y-12">

                    {/* Section 1: Aadhaar Verification */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                            <Info className="w-5 h-5" /> Details from Aadhaar
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gender</Label>
                                    <p className="text-lg font-bold text-slate-800">Male</p>
                                </div>
                                <div>
                                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aadhaar Address</Label>
                                    <p className="text-sm font-bold text-slate-600 leading-relaxed">
                                        h. no. 28 madhuban senthi <br /> Chittaur garh 312001 vikas nagar
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Label className="text-sm font-bold text-slate-700">Residence Type</Label>
                                <Select value={residenceType} onValueChange={setResidenceType}>
                                    <SelectTrigger className="h-14 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 text-lg font-semibold">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-premium">
                                        <SelectItem value="Owned">Owned</SelectItem>
                                        <SelectItem value="Rented">Rented</SelectItem>
                                        <SelectItem value="Company Provided">Company Provided</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Personal Stats */}
                    <div className="space-y-6 pt-6 border-t border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marital Status</Label>
                                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                                    <button
                                        onClick={() => setMaritalStatus("Single")}
                                        className={cn(
                                            "flex-1 py-2 px-4 rounded-lg font-bold transition-all text-sm",
                                            maritalStatus === "Single" ? "bg-white text-primary shadow-sm" : "text-slate-400"
                                        )}
                                    >Single</button>
                                    <button
                                        onClick={() => setMaritalStatus("Married")}
                                        className={cn(
                                            "flex-1 py-2 px-4 rounded-lg font-bold transition-all text-sm",
                                            maritalStatus === "Married" ? "bg-[#002D72] text-white shadow-lg" : "text-slate-400"
                                        )}
                                    >Married</button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-sm font-bold text-slate-700">Father's Name</Label>
                                <Input
                                    value={fatherName}
                                    onChange={(e) => setFatherName(e.target.value)}
                                    className="h-14 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 font-semibold"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Label className="text-sm font-bold text-slate-700">Mother's Name</Label>
                                <Input
                                    value={motherName}
                                    onChange={(e) => setMotherName(e.target.value)}
                                    className="h-14 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 font-semibold"
                                />
                            </div>
                            <div className="space-y-4">
                                <Label className="text-sm font-bold text-slate-700">Nominee's Name</Label>
                                <Input
                                    value={nomineeName}
                                    onChange={(e) => setNomineeName(e.target.value)}
                                    className="h-14 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 font-semibold"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Communication Address */}
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
                            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300 bg-blue-50/30 p-6 rounded-[2rem] border border-blue-100/50">
                                <Label className="text-xs font-black text-primary uppercase tracking-widest">Update Communication Address</Label>
                                <div className="grid grid-cols-1 gap-4">
                                    <Input placeholder="House No, Building, Street" className="h-14 bg-white border-slate-200 rounded-2xl px-6 font-semibold" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input placeholder="City" className="h-14 bg-white border-slate-200 rounded-2xl px-6 font-semibold" />
                                        <Input placeholder="PIN Code" className="h-14 bg-white border-slate-200 rounded-2xl px-6 font-semibold" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="p-10 pt-0 flex justify-center flex-col gap-4">
                    <Button
                        onClick={handleContinue}
                        disabled={isRedirecting}
                        className="h-16 px-16 rounded-full bg-[#00871E] hover:bg-[#007018] text-white text-2xl font-bold shadow-xl shadow-green-900/20 gap-3 transition-all hover:scale-[1.05] active:scale-[0.95]"
                    >
                        {isRedirecting ? <Loader2 className="w-8 h-8 animate-spin" /> : "Verify & Continue"} <ArrowRight className="w-6 h-6 stroke-[3px]" />
                    </Button>
                    <p className="text-slate-400 text-xs font-bold">By continuing, you agree to our Terms & Conditions for Digital Onboarding.</p>
                </CardFooter>
            </Card>

            {/* Redirecting Modal */}
            {isRedirecting && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100]">
                    <Card className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-12 text-center space-y-6">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto opacity-20" />
                        <h3 className="text-xl font-black text-slate-900 leading-tight">Syncing your details with our core banking system</h3>
                        <p className="text-slate-500 font-bold text-sm">Please do not close this window</p>
                    </Card>
                </div>
            )}
        </div>
    );
}
