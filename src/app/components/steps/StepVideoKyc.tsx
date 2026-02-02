"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Loader2, CheckCircle2, Video, Calendar, Shield } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import AgentMessage from "@/app/components/chat/AgentMessage";
import UserResponse from "@/app/components/chat/UserResponse";
import HelpIcon from "@/app/components/shared/HelpIcon";

export default function StepVideoKyc() {
    const { nextStep, currentStepIndex, journeySteps } = useJourney();
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        trackEvent('page_viewed', { page: 'video_kyc' });
    }, []);

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

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2 text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Video Verification</h1>
                <p className="text-slate-500">Live video call with an HDFC Bank agent</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8 space-y-6">
                {!isConnected && !isCompleted && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 p-4 bg-orange-50/50 rounded-xl border border-orange-100">
                            <Calendar className="w-5 h-5 text-orange-600" />
                            <p className="text-sm text-orange-900 leading-tight">
                                <span className="font-bold">Agent Available.</span> Estimated wait time: <span className="font-bold">Under 30 seconds</span>.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Before you start:</h3>
                            <ul className="space-y-3">
                                {[
                                    "Keep your original Physical PAN Card ready",
                                    "Ensure you are in a well-lit environment",
                                    "A stable internet connection is required",
                                    "Keep a blank paper and blue/black pen ready"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button
                            onClick={handleStartCall}
                            disabled={isConnecting}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isConnecting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Initiating Secure Call...</span>
                                </>
                            ) : (
                                <>
                                    <Video className="w-5 h-5" />
                                    <span>Start Video Verification</span>
                                </>
                            )}
                        </Button>
                    </div>
                )}

                {isConnected && !isCompleted && (
                    <div className="bg-slate-900 rounded-2xl p-8 lg:p-12 text-center space-y-6 animate-in zoom-in-95 duration-500 relative overflow-hidden">
                        {/* Simulation of Video Surface */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="w-full h-full bg-[radial-gradient(circle,rgba(59,130,246,0.3)0%,transparent 70%)]" />
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-blue-600/10 animate-pulse">
                                <Video className="w-10 h-10 text-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-white text-lg font-bold">Secure Call in Progress</h3>
                                <p className="text-slate-400 text-sm">Our agent is verifying your identity...</p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-3 pt-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce delay-150" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce delay-300" />
                        </div>
                    </div>
                )}

                {isCompleted && (
                    <div className="bg-green-50/50 rounded-2xl p-8 lg:p-12 text-center space-y-6 animate-in zoom-in-95 duration-500 border border-green-100">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-green-900 text-xl font-bold">Verification Successful</h3>
                            <p className="text-green-700 text-sm">Thank you! Your Video KYC is complete.</p>
                        </div>
                        <div className="flex justify-center items-center gap-2 text-green-600 font-medium text-sm">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Updating your status...</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-center gap-4 grayscale opacity-40">
                <Shield className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">AES-256 Encrypted Call</span>
            </div>
        </div>
    );
}
