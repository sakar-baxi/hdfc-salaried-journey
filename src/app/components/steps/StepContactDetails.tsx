"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Info, Loader2, MapPin, Users, Heart } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import StepBanner from "./StepBanner";
import { cn } from "@/lib/utils";

export default function StepContactDetails() {
    const { nextStep, formData, updateFormData } = useJourney();

    // --- 1. Address & Core Details ---
    const [residenceType, setResidenceType] = useState(formData.residenceType || "Owned");
    const [aadhaarAddress, setAadhaarAddress] = useState("h. no. 28 madhuban senthi, Chittaur garh 312001, vikas nagar");
    const [addressSame, setAddressSame] = useState(formData.addressSame !== undefined ? formData.addressSame : true);

    // --- 2. Family Details ---
    const [maritalStatus, setMaritalStatus] = useState<"Single" | "Married">(formData.maritalStatus || "Single");
    const [fatherName, setFatherName] = useState(formData.fatherName || "Ramesh Ameta");
    const [motherName, setMotherName] = useState(formData.motherName || "Maina Ameta");
    const [annualIncome, setAnnualIncome] = useState(formData.annualIncome || "850000");

    // --- 3. Nominee Details ---
    const [nomineeName, setNomineeName] = useState(formData.nomineeName || "");
    const [nomineeRelation, setNomineeRelation] = useState(formData.nomineeRelation || "");
    const [nomineeGender, setNomineeGender] = useState(formData.nomineeGender || "");
    const [nomineeDob, setNomineeDob] = useState(formData.nomineeDob || "1980-01-01");
    // Default nominee address to same as user's communication address
    const [nomineeAddressSame, setNomineeAddressSame] = useState(true);
    const [customNomineeAddress, setCustomNomineeAddress] = useState("");

    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        trackEvent('page_viewed', { page: 'profileUpdate' });
    }, []);

    // Logic to Auto-fill Nominee Name
    useEffect(() => {
        // If user hasn't manually edited the nominee name yet (or we just want to suggest default)
        //Logic: Single & Male -> Mother's Name. Married -> Spouse (we don't have spouse field, assuming generic or maybe we should add spouse name if married)
        // Since we don't have a specific "Gender" state for the USER in this component (it's usually in formData or from Aadhaar), 
        // we'll assume Male for now as per the "Chirag Ameta" persona or check formData.gender if available.
        // Assuming user is Male for this specific persona request.

        if (!formData.nomineeName) {
            if (maritalStatus === "Single") {
                setNomineeName(motherName);
                setNomineeRelation("Mother");
            } else if (maritalStatus === "Married") {
                //Ideally we would have a Spouse Name field. For now, let's leave it blank or default.
                //But the prompt said: "spouse name if the user is married".
                //Let's assume we might need a spouse name field if married, or just placeholder.
                setNomineeName(""); // Reset or let user type spouse name
                setNomineeRelation("Spouse");
            }
        }
    }, [maritalStatus, motherName, formData.nomineeName]);


    const handleContinue = () => {
        setIsRedirecting(true);
        updateFormData({
            residenceType,
            addressSame,
            maritalStatus,
            fatherName,
            motherName,
            annualIncome,
            nomineeName,
            nomineeRelation,
            nomineeGender,
            nomineeDob,
            nomineeAddress: nomineeAddressSame ? "Same as Applicant" : customNomineeAddress
        });

        setTimeout(() => {
            setIsRedirecting(false);
            nextStep();
        }, 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 pb-20">
            <StepBanner
                title="Personal Information"
                name="Chirag Ameta"
                subTitle="S S PLAZA"
            />

            <Card className="border-none shadow-premium-lg bg-card/60 backdrop-blur-xl rounded-[32px] overflow-hidden">
                <CardContent className="p-8 md:p-12 space-y-12">

                    {/* --- SECTION 1: ADDRESS DETAILS --- */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Address Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Aadhaar Address Display */}
                            <div className="space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Permanent Address (from Aadhaar)</Label>
                                <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                                    {aadhaarAddress}
                                </p>
                            </div>

                            {/* Communication Address Toggle */}
                            <div className="space-y-4">
                                <Label className="text-sm font-bold text-slate-700">Communication Address</Label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer" onClick={() => setAddressSame(true)}>
                                        <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", addressSame ? "border-primary" : "border-slate-300")}>
                                            {addressSame && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700">Same as Permanent Address</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer" onClick={() => setAddressSame(false)}>
                                        <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", !addressSame ? "border-primary" : "border-slate-300")}>
                                            {!addressSame && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700">Enter New Address</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Custom Address Input (Conditional) */}
                        {!addressSame && (
                            <div className="animate-in slide-in-from-top-2 duration-300 p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-slate-500">Address Line 1</Label>
                                        <Input placeholder="House No, Building" className="h-12 bg-slate-50 border-slate-200" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500">City</Label>
                                            <Input placeholder="City" className="h-12 bg-slate-50 border-slate-200" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-slate-500">Pincode</Label>
                                            <Input placeholder="110001" className="h-12 bg-slate-50 border-slate-200" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold">
                                <Info className="w-4 h-4" />
                                Your Account will be opened at S S PLAZA.
                            </div>
                        </div>
                    </div>


                    {/* --- SECTION 2: FAMILY DETAILS --- */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                <Users className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Family & Financials</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Marital Status</Label>
                                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 h-14 items-center">
                                    <button onClick={() => setMaritalStatus("Single")} className={cn("flex-1 h-full rounded-lg font-bold text-sm transition-all", maritalStatus === "Single" ? "bg-white text-primary shadow-sm ring-1 ring-black/5" : "text-slate-400 hover:text-slate-600")}>Single</button>
                                    <button onClick={() => setMaritalStatus("Married")} className={cn("flex-1 h-full rounded-lg font-bold text-sm transition-all", maritalStatus === "Married" ? "bg-white text-primary shadow-sm ring-1 ring-black/5" : "text-slate-400 hover:text-slate-600")}>Married</button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Annual Income (₹)</Label>
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    value={annualIncome}
                                    onChange={(e) => setAnnualIncome(e.target.value.replace(/\D/g, ''))}
                                    className="h-14 font-semibold text-lg bg-white border-slate-200 focus:border-primary px-4"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Father's Name</Label>
                                <Input value={fatherName} onChange={(e) => setFatherName(e.target.value)} className="h-14 font-semibold bg-white border-slate-200" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Mother's Name</Label>
                                <Input value={motherName} onChange={(e) => setMotherName(e.target.value)} className="h-14 font-semibold bg-white border-slate-200" />
                            </div>
                        </div>
                    </div>


                    {/* --- SECTION 3: NOMINEE DETAILS --- */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                                <Heart className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Nominee Declaration</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Nominee Name</Label>
                                <Input value={nomineeName} onChange={(e) => setNomineeName(e.target.value)} className="h-14 font-semibold bg-white border-slate-200" placeholder="Enter Full Name" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Relationship</Label>
                                <Select value={nomineeRelation} onValueChange={setNomineeRelation}>
                                    <SelectTrigger className="h-14 bg-white border-slate-200 font-semibold px-4"><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mother">Mother</SelectItem>
                                        <SelectItem value="Father">Father</SelectItem>
                                        <SelectItem value="Spouse">Spouse</SelectItem>
                                        <SelectItem value="Sibling">Sibling</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Date of Birth</Label>
                                <Input type="date" value={nomineeDob} onChange={(e) => setNomineeDob(e.target.value)} className="h-14 font-semibold bg-white border-slate-200" />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Gender</Label>
                                <Select value={nomineeGender} onValueChange={setNomineeGender}>
                                    <SelectTrigger className="h-14 bg-white border-slate-200 font-semibold px-4"><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Label className="text-sm font-bold text-slate-700 block mb-3">Nominee Address</Label>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setNomineeAddressSame(true)}>
                                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", nomineeAddressSame ? "border-primary" : "border-slate-300")}>
                                        {nomineeAddressSame && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">Same as Applicant's Address</span>
                                </div>
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setNomineeAddressSame(false)}>
                                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", !nomineeAddressSame ? "border-primary" : "border-slate-300")}>
                                        {!nomineeAddressSame && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">Add Custom Address</span>
                                </div>
                            </div>

                            {!nomineeAddressSame && (
                                <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                                    <Input
                                        placeholder="Enter Nominee's Full Address"
                                        value={customNomineeAddress}
                                        onChange={(e) => setCustomNomineeAddress(e.target.value)}
                                        className="h-14 bg-white border-slate-200 rounded-xl"
                                    />
                                </div>
                            )}
                        </div>
                    </div>


                </CardContent>

                <CardFooter className="p-10 pt-0 flex justify-center flex-col gap-4">
                    <Button
                        onClick={handleContinue}
                        disabled={isRedirecting}
                        className="w-full md:w-auto h-16 px-12 rounded-full bg-[#0047CC] hover:bg-[#003AAB] text-white text-xl font-bold shadow-xl shadow-blue-900/20 gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {isRedirecting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Proceed to Verfication"} <ArrowRight className="w-6 h-6" />
                    </Button>
                </CardFooter>
            </Card>

            {isRedirecting && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100]">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        <p className="font-bold text-slate-700">Saving your profile...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
