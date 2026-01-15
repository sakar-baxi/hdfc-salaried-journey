/* src/app/page.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import Navbar from "@/app/components/layout/Navbar";
import DemoToggle from "@/app/components/DemoToggle";
import MobileMockDrawer from "@/app/components/MobileMockDrawer";
import JourneyStepWrapper from "@/app/components/JourneyStepWrapper";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const {
    CurrentStepComponent,
    currentBranchComponent,
  } = useJourney();

  const ComponentToRender = currentBranchComponent || CurrentStepComponent;

  if (!ComponentToRender) {
    return null;
  }

  const currentStepId = ComponentToRender.name;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start p-0 md:p-10 relative overflow-x-hidden">
        <div className="w-full h-full flex-grow flex flex-col justify-start items-center pt-8 pb-12 px-4 md:p-0">
          <AnimatePresence mode="wait">
            <JourneyStepWrapper key={currentStepId}>
              <ComponentToRender />
            </JourneyStepWrapper>
          </AnimatePresence>
        </div>
      </main>

      <DemoToggle />
      <MobileMockDrawer />
    </div>
  );
}