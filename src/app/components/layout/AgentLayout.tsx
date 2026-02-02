"use client";

import React, { useState } from "react";
import { HelpCircle, Settings2, Globe, Shield, CreditCard, Calendar } from "lucide-react";
import { useBranding } from "@/app/context/BrandingContext";
import StepProgress from "./StepProgress";
import WhitelabelModal from "../shared/WhitelabelModal";
import { cn } from "@/lib/utils";

export default function AgentLayout({ children }: { children: React.ReactNode }) {
    const { config } = useBranding();
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    return (
        <div
            className={cn(
                "flex h-screen w-full text-slate-900 font-sans overflow-hidden relative transition-all duration-1000",
                config.preset === 'neobrutalist' ? "bg-white" : "bg-[#fcfdfe]"
            )}
            style={{
                '--primary-bank': config.primary,
                '--radius-bank': `${config.borderRadius}px`,
                '--glass-opacity': config.glassOpacity,
                fontFamily: config.fontFamily
            } as any}
        >
            <WhitelabelModal
                isOpen={isConfigOpen}
                onClose={() => setIsConfigOpen(false)}
            />

            {/* Premium Background System */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8f9fa]">
                {/* Mesh Gradient Layers */}
                <div
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] blur-[140px] rounded-full opacity-20 transition-colors duration-1000"
                    style={{ backgroundColor: config.primary }}
                />
                <div
                    className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full opacity-15 transition-colors duration-1000"
                    style={{ backgroundColor: config.secondary }}
                />
                <div
                    className="absolute top-[20%] right-[10%] w-[30%] h-[30%] blur-[100px] rounded-full bg-indigo-400/10"
                />

                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            </div>

            {/* Main Center Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden h-full z-10 bg-transparent">

                {/* Glass Top Header - Modular Sizing */}
                <header className={cn(
                    "flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 flex-shrink-0 z-30 sticky top-0 transition-all duration-500 gap-4 py-4 md:py-0",
                    config.preset === 'neobrutalist' ? "bg-white border-b-4 border-black" : "glass border-b border-white/30",
                    config.modules.headerSize === 'large' ? "md:h-24 shadow-xl" : "md:h-20 shadow-lg"
                )}>
                    <div className="flex items-center gap-4 lg:gap-10 w-full md:w-auto justify-between md:justify-start">
                        <div className="flex items-center gap-4 lg:gap-8">
                            <div
                                onClick={() => setIsConfigOpen(true)}
                                className={cn(
                                    "flex items-center justify-center text-white font-semibold transition-all active:scale-95 cursor-pointer shrink-0 shadow-sm",
                                    config.preset === 'neobrutalist' ? "shadow-[4px_4px_0_0_#000] border-2 border-black" : "",
                                    config.modules.headerSize === 'large' ? "w-10 h-10 md:w-12 md:h-12 text-base md:text-xl" : "w-10 h-10 text-base"
                                )}
                                style={{ backgroundColor: config.primary, borderRadius: config.preset === 'neobrutalist' ? '0px' : `${config.borderRadius}px` }}
                            >
                                {config.logo}
                            </div>
                            <div className="h-8 md:h-10 w-px bg-slate-200/60 hidden sm:block" />
                            <div className="flex flex-col">
                                <span className={cn(
                                    "font-semibold tracking-tighter text-slate-900 leading-tight",
                                    config.modules.headerSize === 'large' ? "text-lg md:text-xl lg:text-2xl" : "text-base md:text-lg lg:text-xl"
                                )}>
                                    {config.name}
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[8px] md:text-[9px] font-semibold text-slate-400 uppercase tracking-[0.2em] shrink-0">Priority Banking</span>
                                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                                </div>
                            </div>
                        </div>

                        <div className="flex md:hidden items-center gap-2">
                            <button className={cn(
                                "w-8 h-8 flex items-center justify-center transition-all bg-white border border-slate-100 rounded-lg"
                            )}>
                                <HelpCircle className="w-4 h-4 text-slate-400" />
                            </button>
                            <div className={cn(
                                "w-8 h-8 flex items-center justify-center text-white font-semibold text-[10px] bg-slate-900 rounded-lg"
                            )}>
                                JD
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-10 w-full md:w-auto">
                        <div className={cn(
                            "flex-1 md:flex-none transition-all duration-700",
                            config.modules.headerSize === 'large' ? "md:max-w-4xl lg:max-w-screen-lg" : "md:max-w-xl lg:max-w-2xl"
                        )}>
                            <StepProgress />
                        </div>

                        <div className="hidden md:flex items-center gap-4 lg:gap-8">
                            <div className="h-10 w-px bg-slate-200/40 hidden lg:block" />
                            <div className="flex items-center gap-3 lg:gap-5">
                                <button className={cn(
                                    "w-10 h-10 md:w-11 md:h-11 flex items-center justify-center transition-all bg-slate-50 border border-slate-100/40 rounded-xl hover:bg-white hover:shadow-sm group"
                                )}>
                                    <HelpCircle className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                                </button>
                                <div className={cn(
                                    "w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-white font-semibold text-xs md:text-sm rounded-xl bg-slate-900"
                                )}>
                                    JD
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto relative flex flex-col items-center p-2 md:p-4 lg:p-5 overflow-x-hidden">
                    {/* Standard Dashboard Stage - RELIABLE ORIENTATION */}
                    <div className={cn(
                        "w-full max-w-full flex flex-col transition-all duration-1000 animate-in fade-in slide-in-from-bottom-4",
                        config.modules.headerSize === 'large' ? "xl:max-w-[1700px] 2xl:max-w-[1800px]" : "lg:max-w-[1500px]"
                    )}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
