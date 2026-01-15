/* src/app/components/DemoToggle.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import { JourneyType } from "@/app/context/stepDefinitions";
import { Toggle } from "@/components/ui/toggle";
import { CreditCard, ArrowRight } from "lucide-react";

const JOURNEY_TYPES: JourneyType[] = ["journey2", "journey3"];

const JOURNEY_DETAILS: Record<JourneyType, { label: string; icon: React.ElementType }> = {
  "journey1": { label: "Journey 1 (Compact)", icon: CreditCard },
  "journey2": { label: "Journey 2 (SAJ)", icon: CreditCard },
  "journey3": { label: "Journey 3 (Direct)", icon: ArrowRight },
};

export default function DemoToggle() {
  const { journeyType, setJourneyType, updateFormData } = useJourney();

  const cycleJourneyType = () => {
    let nextJourney: JourneyType;
    if (!journeyType) {
      nextJourney = "journey2";
    } else {
      const currentIndex = JOURNEY_TYPES.indexOf(journeyType);
      const nextIndex = (currentIndex + 1) % JOURNEY_TYPES.length;
      nextJourney = JOURNEY_TYPES[nextIndex];
    }

    setJourneyType(nextJourney);

    // Update PAN based on journey
    const nextPan = nextJourney === "journey3" ? "EXSIT1234P" : "ABCDE1234E";
    updateFormData({ pan: nextPan });
  };

  const CurrentIcon = journeyType ? JOURNEY_DETAILS[journeyType].icon : CreditCard;
  const currentLabel = journeyType ? JOURNEY_DETAILS[journeyType].label : "Select Journey";

  return (
    <Toggle
      aria-label="Toggle journey type"
      onClick={cycleJourneyType}
      className="fixed bottom-4 left-4 z-50 bg-card shadow-lg border data-[state=on]:bg-primary-cta data-[state=on]:text-primary-cta-foreground"
      pressed={true}
    >
      <CurrentIcon className="h-4 w-4 mr-2" />
      <span className="text-xs font-semibold">
        {currentLabel}
      </span>
    </Toggle>
  );
}