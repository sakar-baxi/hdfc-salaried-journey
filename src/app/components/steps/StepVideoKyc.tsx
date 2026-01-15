"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Mic, MicOff, VideoOff, PhoneOff, ShieldCheck, UserCheck, Loader2, Camera, Info } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import StepBanner from "./StepBanner";
import { cn } from "@/lib/utils";

export default function StepVideoKyc() {
    const { nextStep, addNotification } = useJourney();
    const [isJoined, setIsJoined] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [callStatus, setCallStatus] = useState("Waiting for Agent...");
    const [callDuration, setCallDuration] = useState(0);

    useEffect(() => {
        trackEvent('page_viewed', { page: 'videoKyc' });
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isJoined) {
            interval = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isJoined]);

    const handleStartCall = () => {
        setIsConnecting(true);
        trackEvent('video_kyc_started');

        setTimeout(() => {
            setIsConnecting(false);
            setIsJoined(true);
            setCallStatus("Connected with HDFC Agent");
            addNotification("Video KYC", "You are now connected with a bank agent. Please keep your original PAN card ready.");
        }, 3000);
    };

    const handleEndCall = () => {
        trackEvent('video_kyc_completed', { duration: callDuration });
        setIsJoined(false);
        setCallStatus("Call Ended. KYC Processed.");

        setTimeout(() => {
            nextStep();
        }, 1500);
    };

    const formatDuration = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6">
            <StepBanner
                title="Video Customer Identification Process (V-CIP)"
                name="Chirag Ameta"
                subTitle="S S PLAZA"
            />

            <Card className="border-none shadow-premium-lg bg-slate-900 rounded-[32px] overflow-hidden text-white h-[600px] flex flex-col relative">
                {!isJoined && !isConnecting ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 space-y-8 animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-[#0047CC]/20 rounded-full flex items-center justify-center ring-4 ring-[#0047CC]/30 animate-pulse">
                            <Video className="w-12 h-12 text-[#0047CC]" />
                        </div>
                        <div className="text-center space-y-4 max-w-md">
                            <h2 className="text-3xl font-black tracking-tight">Ready for Video KYC?</h2>
                            <p className="text-slate-400 font-medium">Please ensure you are in a well-lit room and have your original PAN card ready for verification.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                <span className="text-xs font-bold text-slate-300">Secure 128-bit Encryption</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                                <UserCheck className="w-5 h-5 text-blue-400" />
                                <span className="text-xs font-bold text-slate-300">RBI Compliant Process</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleStartCall}
                            className="h-16 px-12 rounded-full bg-[#0047CC] hover:bg-[#0037AA] text-xl font-black shadow-2xl shadow-blue-900/40 gap-3"
                        >
                            Start Video Call <Video className="w-6 h-6" />
                        </Button>
                    </div>
                ) : isConnecting ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 space-y-6 animate-in fade-in duration-500">
                        <div className="relative">
                            <div className="w-32 h-32 border-4 border-t-[#0047CC] border-blue-900/20 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PhoneOff className="w-8 h-8 text-slate-500 rotate-135" />
                            </div>
                        </div>
                        <p className="text-xl font-black tracking-widest uppercase animate-pulse">Connecting to Agent...</p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col animate-in fade-in duration-700">
                        {/* Main Video Area */}
                        <div className="flex-1 relative bg-black">
                            {/* Remote Stream (Agent) - Simulated */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700">
                                        <UserCheck className="w-16 h-16 text-slate-500" />
                                    </div>
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">{callStatus}</p>
                                </div>
                            </div>

                            {/* Local Stream (User) - Picture in Picture */}
                            <div className="absolute bottom-6 right-6 w-48 h-64 bg-slate-800 rounded-2xl border-2 border-white/10 overflow-hidden shadow-2xl ring-4 ring-black/40">
                                {isVideoOn ? (
                                    <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                                        <Camera className="w-10 h-10 text-slate-600 animate-pulse" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                                        <VideoOff className="w-10 h-10 text-slate-800" />
                                    </div>
                                )}
                                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-black uppercase tracking-widest">
                                    You (Chirag)
                                </div>
                            </div>

                            {/* Top Bar */}
                            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="font-black tracking-widest text-sm">{formatDuration(callDuration)}</span>
                                </div>
                                <div className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest">
                                    Live Secure Session
                                </div>
                            </div>
                        </div>

                        {/* Controls Bar */}
                        <div className="p-8 bg-slate-900 flex items-center justify-center gap-6 border-t border-white/5">
                            <button
                                onClick={() => setIsMicOn(!isMicOn)}
                                className={cn(
                                    "w-14 h-14 rounded-full flex items-center justify-center transition-all",
                                    isMicOn ? "bg-white/10 hover:bg-white/20" : "bg-red-500/20 text-red-500 border border-red-500/30"
                                )}
                            >
                                {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                            </button>

                            <button
                                onClick={() => setIsVideoOn(!isVideoOn)}
                                className={cn(
                                    "w-14 h-14 rounded-full flex items-center justify-center transition-all",
                                    isVideoOn ? "bg-white/10 hover:bg-white/20" : "bg-red-500/20 text-red-500 border border-red-500/30"
                                )}
                            >
                                {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                            </button>

                            <button
                                onClick={handleEndCall}
                                className="h-14 px-10 rounded-full bg-red-600 hover:bg-red-700 text-white font-black flex items-center gap-3 shadow-xl shadow-red-900/40 transition-all hover:scale-105"
                            >
                                <PhoneOff className="w-5 h-5 leading-none" /> End Call
                            </button>
                        </div>
                    </div>
                )}
            </Card>

            {isJoined && (
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-4 animate-in slide-in-from-bottom-5 duration-500">
                    <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm font-bold text-amber-900/80">
                        The agent will ask you to show your PAN card and sign on a blank piece of paper. Please follow the instructions carefully.
                    </p>
                </div>
            )}
        </div>
    );
}
