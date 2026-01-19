"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Loader2, CheckCircle2, FileText } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import AgentMessage from "@/app/components/chat/AgentMessage";
import UserResponse from "@/app/components/chat/UserResponse";

export default function StepReviewApplication() {
    const { nextStep, formData, currentStepIndex, journeySteps } = useJourney();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);

    const myIndex = journeySteps.findIndex(s => s.id === "reviewApplication");
    const isHistory = myIndex !== -1 && myIndex < currentStepIndex;
    const isActive = myIndex === currentStepIndex;

    useEffect(() => {
        if (isActive) {
            trackEvent('page_viewed', { page: 'review_application' });
        }
    }, [isActive]);

    const handleSubmit = () => {
        if (!termsAccepted) return;

        setIsSubmitting(true);
        trackEvent('application_submitted');

        setTimeout(() => {
            setIsSubmitting(false);
            nextStep();
        }, 2000);
    };

    if (isHistory) {
        return (
            <div className="space-y-3">
                <AgentMessage isNew={false}>
                    Your application has been submitted successfully!
                </AgentMessage>
                <UserResponse isNew={false}>
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Application Submitted</span>
                        <CheckCircle2 className="w-3 h-3" />
                    </div>
                </UserResponse>
            </div>
        );
    }

    if (!isActive) return null;

    return (
        <div className="space-y-3 w-full animate-in slide-in-from-bottom-4 duration-300">
            <AgentMessage>
                Almost done! Here's a summary of your application. Please review and confirm to proceed.
            </AgentMessage>

            <div className="pl-8 space-y-3">
                <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                        <span className="text-slate-600">Name:</span>
                        <span className="font-semibold text-slate-900">{formData.name || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-600">PAN:</span>
                        <span className="font-semibold text-slate-900">{formData.panNumber || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-600">Mobile:</span>
                        <span className="font-semibold text-slate-900">{formData.mobileNumber || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-600">Email:</span>
                        <span className="font-semibold text-slate-900">{formData.email || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-600">City:</span>
                        <span className="font-semibold text-slate-900">{formData.city || "—"}</span>
                    </div>
                </div>

                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                        I confirm that all information provided is accurate and I accept the{" "}
                        <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                    </span>
                </label>

                <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !termsAccepted}
                    className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Application"}
                </Button>
            </div>
        </div>
    );
}
