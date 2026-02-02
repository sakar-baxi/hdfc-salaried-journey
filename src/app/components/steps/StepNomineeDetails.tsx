"use client";

import React, { useState } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { useBranding } from "@/app/context/BrandingContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, UserPlus, Heart } from "lucide-react";

import StepCard from "@/app/components/layout/StepCard";

export default function StepNomineeDetails() {
    const { nextStep, updateFormData, formData } = useJourney();
    const { config } = useBranding();
    const [nomineeName, setNomineeName] = useState(formData.nomineeName || "");
    const [nomineeRelation, setNomineeRelation] = useState(formData.nomineeRelation || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = () => {
        setIsLoading(true);
        updateFormData({ nomineeName, nomineeRelation });
        setTimeout(() => {
            setIsLoading(false);
            nextStep();
        }, 800);
    };

    return (
        <StepCard step="Step 4 of 5" maxWidth="2xl">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2 text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add a Nominee</h1>
                    <p className="text-slate-500 font-medium">Nomination is mandatory for your account security</p>
                </div>

                <div className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <UserPlus className="w-3.5 h-3.5" />
                                Nominee's Full Name
                            </label>
                            <Input
                                type="text"
                                value={nomineeName}
                                onChange={(e) => setNomineeName(e.target.value)}
                                className="h-12 border-slate-200/60 rounded-xl bg-white/50 focus:ring-4 focus:ring-blue-100 transition-all font-bold text-lg"
                                placeholder="Enter full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Heart className="w-3.5 h-3.5" />
                                Relationship
                            </label>
                            <Select value={nomineeRelation} onValueChange={setNomineeRelation}>
                                <SelectTrigger className="h-12 border-slate-200/60 rounded-xl bg-white/50 focus:ring-4 focus:ring-blue-100 transition-all font-medium">
                                    <SelectValue placeholder="Select relationship" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                                    <SelectItem value="spouse" className="py-3">Spouse</SelectItem>
                                    <SelectItem value="father" className="py-3">Father</SelectItem>
                                    <SelectItem value="mother" className="py-3">Mother</SelectItem>
                                    <SelectItem value="son" className="py-3">Son</SelectItem>
                                    <SelectItem value="daughter" className="py-3">Daughter</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                        <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                            <span className="font-bold">Pro Tip:</span> Providing a nominee ensures that the balance in your account can be easily transferred to your loved ones in case of any unforeseen event.
                        </p>
                    </div>

                    <Button
                        onClick={handleContinue}
                        disabled={isLoading || !nomineeName || !nomineeRelation}
                        className="w-full h-14 text-white font-bold transition-all shadow-xl active:scale-[0.98] rounded-2xl"
                        style={{ backgroundColor: config.primary }}
                    >
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Confirm Nominee"}
                    </Button>
                </div>
            </div>
        </StepCard>
    );
}
