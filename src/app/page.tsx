/* src/app/page.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import Sidebar from "@/app/components/layout/Sidebar";
import MobileProgressBar from "@/app/components/layout/MobileProgressBar";
import DemoToggle from "@/app/components/DemoToggle";
import MobileMockDrawer from "@/app/components/MobileMockDrawer";
import JourneyStepWrapper from "@/app/components/JourneyStepWrapper";
import { AnimatePresence } from "framer-motion";
import { ALL_STEPS, STEP_COMPONENTS } from "@/app/context/stepDefinitions";
import { useState, useEffect } from "react";

export default function Home() {
  const { 
    currentStepIndex, 
    journeySteps, 
    CurrentStepComponent, 
    currentBranchComponent,
    journeyType,
    setJourneyType
  } = useJourney();
  
  const [otp, setOtp] = useState<string | undefined>();
  const [journeyLink, setJourneyLink] = useState<string | undefined>();

  // Generate journey link on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = `${window.location.origin}${window.location.pathname}?journey=${Date.now()}`;
      setJourneyLink(link);
    }
  }, []);

  
  // --- NEW RENDER LOGIC ---
  // Priority:
  // 1. Show the branch component (e.g., StepKycFace) if it exists.
  // 2. Fallback to the main flow component (e.g., StepKycChoice).
  const ComponentToRender = currentBranchComponent || CurrentStepComponent;

  if (!ComponentToRender) {
    return null; // or a loading screen
  }

  // Use the component itself as the key to force re-render
  const currentStepId = ComponentToRender.name; 

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* MODIFIED: Main content area */}
      <main className="flex-1 md:ml-72 flex flex-col items-center justify-start p-0 md:p-10 relative">
        {/* Mobile Progress Bar (Mobile) */}
        <MobileProgressBar />

        {/* MODIFIED: This wrapper handles the mobile padding and desktop centering */}
        <div className="w-full h-full flex-grow flex flex-col justify-start md:justify-center items-center pt-20 pb-4 px-4 md:p-0">
          <AnimatePresence mode="wait">
            <JourneyStepWrapper key={currentStepId}>
              <ComponentToRender />
            </JourneyStepWrapper>
          </AnimatePresence>
        </div>
      </main>

      <DemoToggle />
      <MobileMockDrawer 
        otp={otp} 
        journeyLink={journeyLink}
        messages={[
          {
            type: "sms",
            content: "Welcome to HDFC Bank! Start your salary account journey now.",
            timestamp: new Date().toLocaleTimeString()
          }
        ]}
      />
    </div>
  );
}