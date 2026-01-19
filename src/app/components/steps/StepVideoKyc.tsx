"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Loader2, CheckCircle2, Video, Calendar } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import AgentMessage from "@/app/components/chat/AgentMessage";
import UserResponse from "@/app/components/chat/UserResponse";
import HelpIcon from "@/app/components/shared/HelpIcon";

export default function StepVideoKyc() {
    const { nextStep, currentStepIndex, journeySteps } = useJourney();
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const myIndex = journeySteps.findIndex(s => s.id === "videoKyc");
    const isHistory = myIndex !== -1 && myIndex < currentStepIndex;
    const isActive = myIndex === currentStepIndex;

    useEffect(() => {
        if (isActive) {
            trackEvent('page_viewed', { page: 'video_kyc' });
        }
    }, [isActive]);

    const handleStartCall = () => {
        setIsConnecting(true);
        trackEvent('video_kyc_started');

        setTimeout(() => {
            setIsConnecting(false);
            setIsConnected(true);

            // Auto-complete after 3 seconds for demo
            setTimeout(() => {
                setIsCompleted(true);
                setTimeout(() => {
                    nextStep();
                }, 1500);
            }, 3000);
        }, 2000);
    };

    if (isHistory) {
        return (
            <div className="space-y-3">
                <AgentMessage isNew={false}>
                    Your Video KYC has been successfully completed!
                </AgentMessage>
                <UserResponse isNew={false}>
                    <div className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        <span>Video KYC Completed</span>
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
                Perfect! Let's complete your Video KYC verification. This will only take a few minutes.
            </AgentMessage>

            <div className="pl-8 space-y-3">
                {!isConnected && !isCompleted && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span>Agent available now</span>
                            <HelpIcon tooltip="Our KYC agent will verify your documents via video call" />
                        </div>

                        <Button
                            onClick={handleStartCall}
                            disabled={isConnecting}
                            className="h-10 px-6 bg-green-600 hover:bg-green-700 text-white text-sm flex items-center gap-2"
                        >
                            {isConnecting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Connecting...</span>
                                </>
                            ) : (
                                <>
                                    <Video className="w-4 h-4" />
                                    <span>Start Video Call</span>
                                </>
                            )}
                        </Button>
                    </div>
                )}

                {isConnected && !isCompleted && (
                    <div className="bg-slate-900 rounded-lg p-6 text-center space-y-3 animate-in fade-in duration-300">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                            <Video className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-white text-sm font-medium">Connected with KYC Agent</p>
                        <p className="text-slate-400 text-xs">Verifying your documents...</p>
                    </div>
                )}

                {isCompleted && (
                    <div className="bg-green-50 rounded-lg p-6 text-center space-y-3 animate-in zoom-in duration-300">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-green-900 text-sm font-semibold">Verification Complete!</p>
                        <p className="text-green-700 text-xs">Proceeding to next step...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
