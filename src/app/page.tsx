/* src/app/page.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import { STEP_COMPONENTS } from "@/app/context/stepDefinitions";
import Navbar from "@/app/components/layout/Navbar";
import DemoToggle from "@/app/components/DemoToggle";
import MobileMockDrawer from "@/app/components/MobileMockDrawer";
import JourneyStepWrapper from "@/app/components/JourneyStepWrapper";
import AgentLayout from "@/app/components/layout/AgentLayout";
import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const {
    journeySteps,
    currentStepIndex,
    currentBranchComponent,
  } = useJourney();

  const scrollRef = useRef<HTMLDivElement>(null);
  const history = journeySteps.slice(0, currentStepIndex);
  const BranchComponent = currentBranchComponent;

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }
  }, [currentStepIndex, currentBranchComponent]);

  return (
    <div className="min-h-screen">
      <AgentLayout>
        <div className="flex flex-col gap-3 lg:gap-4 pb-20">
          {history.map((step) => {
            const StepComponent = STEP_COMPONENTS[step.id];
            if (!StepComponent) return null;

            return (
              <JourneyStepWrapper key={step.id}>
                <StepComponent />
              </JourneyStepWrapper>
            );
          })}

          <JourneyStepWrapper key={journeySteps[currentStepIndex]?.id || 'current'}>
            {BranchComponent ? (
              <BranchComponent />
            ) : (
              journeySteps[currentStepIndex] ? React.createElement(STEP_COMPONENTS[journeySteps[currentStepIndex].id]) : null
            )}
          </JourneyStepWrapper>

          <div ref={scrollRef} className="h-2" />
        </div>
      </AgentLayout>

      <DemoToggle />
      <MobileMockDrawer />
    </div>
  );
}