"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Loader2, ArrowRight, AlertCircle } from "lucide-react";
import { useBranding } from "@/app/context/BrandingContext";
import { trackEvent } from "@/lib/analytics";
import StepCard from "@/app/components/layout/StepCard";

export default function StepReviewApplication() {
    const { nextStep, formData } = useJourney();
    const { config } = useBranding();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    useEffect(() => {
        trackEvent('page_viewed', { page: 'review_application' });
    }, []);

    const handleSubmit = () => {
        if (!termsAccepted) return;

        setIsSubmitting(true);
        trackEvent('application_submitted');

        setTimeout(() => {
            setIsSubmitting(false);
            nextStep();
        }, 1500);
    };

    const summaryItems = [
        { label: "Mobile Number", value: `+91 ${formData.mobileNumber || "—"}` },
        { label: "Date of Birth", value: formData.dob || "—" },
        { label: "PAN Number", value: formData.pan || "—" },
        { label: "Email Address", value: formData.email || "—" },
        { label: "Father's Name", value: formData.fatherName || "—" },
        { label: "Mother's Name", value: formData.motherName || "—" },
        { label: "Marital Status", value: formData.maritalStatus ? formData.maritalStatus.charAt(0).toUpperCase() + formData.maritalStatus.slice(1) : "—" },
        { label: "Address", value: formData.currentAddress || "—" }
    ];

    return (
        <StepCard step="Step 5 of 5" maxWidth="lg">
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">Review Your Application</h1>
                <p className="page-subtitle">
                    Please verify all details before submitting
                </p>
            </div>

            {/* Summary Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {summaryItems.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-5 text-sm font-semibold text-gray-700 w-2/5">
                                    {item.label}
                                </td>
                                <td className="py-4 px-5 text-sm text-gray-900">
                                    {item.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-4 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-hdfc-blue focus:ring-hdfc-blue-light cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 leading-relaxed">
                        I confirm that all information provided is accurate and I accept the{" "}
                        <a href="#" className="text-hdfc-blue hover:underline font-medium">
                            Terms & Conditions
                        </a>{" "}
                        of {config.name}.
                    </span>
                </label>

                {/* Submit Button */}
                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !termsAccepted}
                    className="btn-primary w-full"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting Application...
                        </>
                    ) : (
                        <>
                            Submit Application
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </Button>

                {!termsAccepted && (
                    <p className="helper-text flex items-center gap-1 justify-center">
                        <AlertCircle className="w-3 h-3" />
                        Please accept the terms to submit
                    </p>
                )}
            </div>
        </StepCard>
    );
}
