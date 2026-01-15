"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Smartphone, MessageSquare, Minimize2, Bell, Send, Wifi, Battery, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMockDrawer() {
  const { notifications, journeySteps, currentStepIndex, addNotification, clearNotifications } = useJourney();
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeNudge, setActiveNudge] = useState<string | null>(null);
  const [lastNotifCount, setLastNotifCount] = useState(notifications.length);

  useEffect(() => {
    if (notifications.length > lastNotifCount) {
      const latest = notifications[0];
      setActiveNudge(latest.title);
      const timer = setTimeout(() => setActiveNudge(null), 5000);
      setLastNotifCount(notifications.length);
      return () => clearTimeout(timer);
    }
  }, [notifications, lastNotifCount]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[60] rounded-full h-16 w-16 shadow-2xl bg-[#0047CC] hover:bg-[#0037AA] text-white"
        variant="default"
      >
        <Smartphone className="h-8 w-8" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white">
            {notifications.length}
          </span>
        )}
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "hidden md:block fixed right-0 top-0 h-full w-[400px] bg-white border-l shadow-2xl z-[60] transition-all duration-500 ease-in-out",
        isMinimized ? "translate-x-[340px] opacity-50" : "translate-x-0"
      )}
    >
      <div className="h-full flex flex-col">
        {/* Header/Control Bar */}
        <div className="flex items-center justify-between p-4 border-b bg-slate-50">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <Smartphone className="h-5 w-5" />
            </div>
            {!isMinimized && (
              <div className="text-left">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Device Preview</p>
                <p className="text-sm font-black text-slate-800 tracking-tight">iPhone 15 Pro</p>
              </div>
            )}
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-10 w-10 p-0 rounded-full hover:bg-red-50 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-100/50">
            {/* Real Phone Mockup */}
            <div className="mx-auto w-[280px] bg-slate-900 rounded-[3.5rem] p-3 shadow-[0_0_50px_rgba(0,0,0,0.2)] relative border-[6px] border-slate-800">

              {/* Inner Screen */}
              <div className="bg-[#f0f2f5] rounded-[2.8rem] h-[580px] overflow-hidden relative flex flex-col">

                {/* Dynamic Island / Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-1 h-1 bg-blue-900 rounded-full ml-10 opacity-30" />
                </div>

                {/* Status Bar */}
                <div className="h-10 flex justify-between items-center px-8 pt-2 relative z-20">
                  <span className="text-[10px] font-bold text-slate-800">9:41</span>
                  <div className="flex items-center gap-1.5 opacity-60">
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-4 h-4" />
                  </div>
                </div>

                {/* Lock Screen Notification (Push) */}
                <AnimatePresence>
                  {activeNudge && (
                    <motion.div
                      initial={{ y: -100, opacity: 0, scale: 0.9 }}
                      animate={{ y: 12, opacity: 1, scale: 1 }}
                      exit={{ y: -100, opacity: 0, scale: 0.9 }}
                      className="absolute top-0 left-4 right-4 z-[40] bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-white/50 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
                        <img src="https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/297c88c7-24a3-41c1-9257-268e3981881a?" className="w-6 invert" alt="HDFC" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-[10px] font-black text-primary uppercase">HDFC Bank</p>
                        <p className="text-xs font-bold text-slate-800 truncate">{notifications[0].body}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Screen Content - Messages List */}
                <div className="flex-1 overflow-y-auto p-4 pt-12 space-y-4 scrollbar-hide bg-slate-100">
                  <div className="text-center py-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full">Today</span>
                  </div>

                  {notifications.map((notif, idx) => {
                    const hasLink = notif.body.includes('http');
                    const textParts = notif.body.split(/https?:\/\/\S+/);

                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/50 space-y-2 relative group"
                      >
                        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-primary rounded-md flex items-center justify-center">
                              <MessageSquare className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-[10px] font-black text-slate-800">{notif.title}</span>
                          </div>
                          <span className="text-[9px] font-bold text-slate-400">{notif.timestamp}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-600 font-medium whitespace-pre-wrap">
                          {textParts[0]}
                          {hasLink && (
                            <button
                              onClick={() => {
                                window.location.href = '/?resume=true';
                              }}
                              className="text-primary font-black underline hover:text-blue-700 ml-1"
                            >
                              Link
                            </button>
                          )}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Home bar */}
                <div className="h-10 flex items-center justify-center pb-2">
                  <div className="w-20 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* Nudge Management */}
            <Card className="border-none shadow-premium bg-white rounded-[2rem] overflow-hidden mb-6">
              <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Nudge Desk</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearNotifications}
                  className="h-6 px-2 text-[10px] font-bold text-slate-400 hover:text-white"
                >
                  Clear all
                </Button>
              </div>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={() => addNotification("HDFC Bank", "SMS: Please complete your HDFC Bank journey. Click to resume: https://hdfc-bank.com/?resume=true")}
                    className="flex-1 h-16 flex-col gap-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border-none shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-[9px] font-bold">SMS</span>
                  </Button>
                  <Button
                    onClick={() => addNotification("HDFC Bank", "WhatsApp: Your account is waiting. Click to resume: https://wa.me/hdfc?resume=true")}
                    className="flex-1 h-16 flex-col gap-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-none shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-[9px] font-bold">WhatsApp</span>
                  </Button>
                  <Button
                    onClick={() => addNotification("HDFC Bank", "Email: Final reminder to complete your KYC. https://hdfc-bank.com/resume?true")}
                    className="flex-1 h-16 flex-col gap-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-none shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-[9px] font-bold">Email</span>
                  </Button>
                </div>

                <Button
                  onClick={() => {
                    addNotification("HDFC Bank", "Omnichannel Nudge sent successfully.");
                  }}
                  className="w-full h-10 rounded-lg bg-[#0047CC] hover:bg-[#0037AA] text-white text-xs font-bold gap-2"
                >
                  <Send className="w-3 h-3" /> Nudge Everywhere
                </Button>
              </CardContent>
            </Card>

            {/* Current Step Info */}
            <Card className="border-none shadow-premium bg-white overflow-hidden rounded-[2rem]">
              <div className="bg-[#002D72] p-4 text-white">
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Active Step</p>
                <p className="text-lg font-black">{journeySteps[currentStepIndex]?.title}</p>
              </div>
              <CardContent className="p-6 space-y-4 font-medium text-slate-600 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-time session active</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Cross-device sync enabled</span>
                </div>
              </CardContent>
            </Card>

            <div className="text-center pt-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">HDFC Bank Secure Node</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
