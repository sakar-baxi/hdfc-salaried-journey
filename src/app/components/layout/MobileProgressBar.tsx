/* src/app/components/layout/MobileProgressBar.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
// --- ADD THIS IMPORT ---
import { ALL_STEPS, STEP_COMPONENTS } from "@/app/context/stepDefinitions";

export default function MobileProgressBar() {
  const { journeySteps, currentStepIndex, currentBranchComponent } = useJourney();

  // If we are in a branch, we don't show progress.
  // We'll show the title of the branch step instead.
  let title = journeySteps[currentStepIndex]?.title || "";
  let progressPercentage = (currentStepIndex / (journeySteps.length - 1)) * 100;

  if (currentBranchComponent) {
    // Find the title of the branch component
    const branchStepId = Object.keys(STEP_COMPONENTS).find(
      key => STEP_COMPONENTS[key] === currentBranchComponent
    );
    if (branchStepId && ALL_STEPS[branchStepId]) {
      title = ALL_STEPS[branchStepId].title;
    }
    progressPercentage = 100; // Show full progress during KYC branch
  }

  return (
    // MODIFIED: Made navbar taller, added padding, shadow, and better text
    <div className="md:hidden w-full fixed top-0 left-0 bg-card shadow-md h-16 z-40">
      <div className="flex flex-col justify-center h-full px-4 pt-2">
        <span className="text-sm font-semibold text-text-darkest">
          {title}
        </span>
        <div className="w-full bg-gray-200 h-1 rounded-full mt-2">
          <div
            className="bg-primary-cta h-1 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}