"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Smartphone, MessageSquare, Mail, Phone, Minimize2, Bell, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMockDrawerProps {
  otp?: string;
  messages?: Array<{ type: "sms" | "email" | "whatsapp"; content: string; timestamp: string }>;
  journeyLink?: string;
}

export default function MobileMockDrawer({ otp, messages = [], journeyLink }: MobileMockDrawerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [nudges, setNudges] = useState([
    { id: 1, name: "Initial Link", sent: true, timestamp: new Date().toLocaleTimeString() },
    { id: 2, name: "Nudge 1", sent: false, timestamp: null },
    { id: 3, name: "Nudge 2", sent: false, timestamp: null },
    { id: 4, name: "Nudge 3", sent: false, timestamp: null },
  ]);
  const [hasNewNudge, setHasNewNudge] = useState(false);

  const sendNudge = (nudgeId: number) => {
    const nudge = nudges.find(n => n.id === nudgeId);
    if (nudge && !nudge.sent) {
      setNudges(prev => prev.map(n => 
        n.id === nudgeId 
          ? { ...n, sent: true, timestamp: new Date().toLocaleTimeString() }
          : n
      ));
      setHasNewNudge(true);
      setTimeout(() => setHasNewNudge(false), 3000);
    }
  };

  const mockMessages = [
    ...messages,
    ...(otp ? [{
      type: "sms" as const,
      content: `Your HDFC OTP is ${otp}. Valid for 5 minutes.`,
      timestamp: new Date().toLocaleTimeString()
    }] : []),
    ...(journeyLink ? [{
      type: "whatsapp" as const,
      content: `Start your salary account journey: ${journeyLink}`,
      timestamp: new Date().toLocaleTimeString()
    }] : []),
    ...(nudges.filter(n => n.sent && n.id > 1).map(n => ({
      type: "sms" as const,
      content: `Reminder: Complete your HDFC salary account journey. ${journeyLink || ''}`,
      timestamp: n.timestamp || new Date().toLocaleTimeString()
    })))
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed bottom-4 right-4 z-50 rounded-full h-14 w-14 shadow-lg"
        variant="primary-cta"
      >
        <Smartphone className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "hidden md:block fixed right-0 top-0 h-full w-96 bg-background border-l shadow-2xl z-50 transition-transform duration-300",
        isMinimized ? "translate-y-[calc(100%-60px)]" : "translate-y-0"
      )}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary-cta" />
            <CardTitle className="text-sm font-semibold">Mobile Preview</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Phone Mock - Actual Phone Design */}
            <div className="mx-auto w-64 bg-black rounded-[2.5rem] p-2 shadow-2xl">
              {/* Phone Frame */}
              <div className="bg-white rounded-[2rem] overflow-hidden">
                {/* Notch */}
                <div className="h-6 bg-black rounded-t-[2rem] flex items-center justify-center">
                  <div className="w-32 h-4 bg-black rounded-b-2xl"></div>
                </div>
                
                {/* Screen */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-[500px] p-3">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 border border-gray-600 rounded-sm"></div>
                      <div className="w-6 h-3 border-2 border-gray-600 rounded-sm"></div>
                    </div>
                  </div>

                  {/* Messages App UI */}
                  <div className="space-y-3">
                    {/* HDFC Bank Header */}
                    <div className="bg-primary-cta text-white rounded-lg p-3 text-center">
                      <p className="font-semibold text-sm">HDFC Bank</p>
                    </div>

                    {/* OTP Display */}
                    {otp && (
                      <div className="bg-white border-2 border-primary-cta rounded-lg p-4 shadow-md">
                        <p className="text-xs text-gray-600 mb-2">OTP from HDFC Bank</p>
                        <p className="text-3xl font-mono font-bold text-primary-cta tracking-widest text-center">
                          {otp}
                        </p>
                        <p className="text-xs text-gray-500 text-center mt-2">Valid for 5 minutes</p>
                      </div>
                    )}

                    {/* SMS Messages */}
                    {mockMessages.filter(m => m.type === "sms").map((msg, idx) => (
                      <div key={idx} className="bg-gray-200 rounded-lg p-3 relative">
                        {idx === mockMessages.filter(m => m.type === "sms").length - 1 && hasNewNudge && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="h-4 w-4 text-gray-600" />
                          <span className="text-xs text-gray-600 font-semibold">HDFC Bank</span>
                          <span className="text-xs text-gray-500 ml-auto">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-800">{msg.content}</p>
                      </div>
                    ))}

                    {/* WhatsApp Messages */}
                    {mockMessages.filter(m => m.type === "whatsapp").map((msg, idx) => (
                      <div key={idx} className="bg-green-100 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className="h-4 w-4 text-green-600" />
                          <span className="text-xs text-green-700 font-semibold">WhatsApp</span>
                          <span className="text-xs text-gray-500 ml-auto">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-800">{msg.content}</p>
                        {journeyLink && (
                          <a 
                            href={journeyLink}
                            className="text-xs text-blue-600 underline mt-1 block"
                          >
                            {journeyLink.substring(0, 30)}...
                          </a>
                        )}
                      </div>
                    ))}

                    {/* Journey Link Info */}
                    {journeyLink && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs font-semibold text-yellow-800 mb-1">⚠️ Unique Link</p>
                        <p className="text-xs text-yellow-700 break-all font-mono">
                          {journeyLink}
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">Non-editable</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="h-1 bg-black rounded-full w-32 mx-auto mb-2"></div>
              </div>
            </div>

            {/* Nudge Management */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Nudge Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nudges.map((nudge) => (
                  <div 
                    key={nudge.id} 
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1">
                      <p className="text-xs font-medium">{nudge.name}</p>
                      {nudge.sent && nudge.timestamp && (
                        <p className="text-xs text-text-gray-1">Sent at {nudge.timestamp}</p>
                      )}
                    </div>
                    {nudge.sent ? (
                      <span className="text-xs font-semibold text-green-600">✓ Sent</span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendNudge(nudge.id)}
                        className="h-7 text-xs"
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Send
                      </Button>
                    )}
                  </div>
                ))}
                {hasNewNudge && (
                  <div className="p-2 bg-green-100 border border-green-300 rounded-lg animate-pulse">
                    <p className="text-xs text-green-800 font-semibold flex items-center gap-1">
                      <Bell className="h-3 w-3" />
                      New nudge sent! Check phone notifications.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Link Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Link Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div>
                  <span className="text-text-gray-1">Method:</span>
                  <span className="ml-2 font-semibold">SMS / Email / WhatsApp</span>
                </div>
                <div>
                  <span className="text-text-gray-1">Status:</span>
                  <span className="ml-2 font-semibold text-green-600">Active</span>
                </div>
                <div>
                  <span className="text-text-gray-1">Opened via:</span>
                  <span className="ml-2 font-semibold">Initial</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
