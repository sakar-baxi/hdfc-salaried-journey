/* src/app/components/layout/AgentLayout.tsx */

"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
    MessageSquareText,
    Send,
    HelpCircle,
    CheckCircle2,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useJourney } from "@/app/context/JourneyContext";

export default function AgentLayout({ children }: { children: React.ReactNode }) {
    const [rightNavOpen, setRightNavOpen] = useState(false);

    return (
        <div className="flex h-screen w-full bg-white text-slate-900 font-sans overflow-hidden">

            {/* Main Center Area (Thread & Interface) */}
            <main className="flex-1 flex flex-col relative overflow-hidden h-full">

                {/* Minimalistic Top Header */}
                <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-6 flex-shrink-0 z-30">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-semibold">
                            B
                        </div>
                        <span className="font-semibold text-sm text-slate-900">Banking Assistant</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
                            <HelpCircle className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setRightNavOpen(!rightNavOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Scrollable Thread Viewport */}
                <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-8 lg:py-8 relative scroll-smooth bg-white">
                    {/* This is where all conversational bubbles + modules will live */}
                    <div className="max-w-4xl mx-auto space-y-3 relative z-10 min-h-full pb-8">
                        {children}
                    </div>
                </div>
            </main>

            {/* Right Sidebar (Task Progress) - Desktop: Visible, Mobile: Drawer */}
            <AnimatePresence>
                {(rightNavOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        exit={{ x: 400 }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className={cn(
                            "fixed lg:relative right-0 w-[280px] h-full z-50 lg:z-20",
                            !rightNavOpen && "hidden lg:block"
                        )}
                    >
                        {/* Overlay for mobile */}
                        <div
                            onClick={() => setRightNavOpen(false)}
                            className="lg:hidden fixed inset-0 bg-slate-900/10 backdrop-blur-sm -z-10"
                        />
                        <Sidebar />
                        <button
                            onClick={() => setRightNavOpen(false)}
                            className="lg:hidden absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-lg text-slate-600 backdrop-blur-sm transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
