/* src/app/components/DemoToggle.tsx */

"use client";

import { useJourney, UserType } from "@/app/context/JourneyContext";
import { Toggle } from "@/components/ui/toggle";
import { Users, User, UserCheck } from "lucide-react";

const USER_TYPES: UserType[] = ["ntb", "etb-no-acct", "etb-with-acct"];

const TYPE_DETAILS: Record<UserType, { label: string; icon: React.ElementType }> = {
  "ntb": { label: "NTB", icon: User },
  "etb-no-acct": { label: "ETB (No Acct)", icon: UserCheck },
  "etb-with-acct": { label: "ETB (With Acct)", icon: Users },
};

export default function DemoToggle() {
  const { userType, setUserType } = useJourney();

  const cycleUserType = () => {
    const currentIndex = USER_TYPES.indexOf(userType);
    const nextIndex = (currentIndex + 1) % USER_TYPES.length;
    setUserType(USER_TYPES[nextIndex]);
  };
  
  const CurrentIcon = TYPE_DETAILS[userType].icon;

  return (
    <Toggle
      aria-label="Toggle user type"
      onClick={cycleUserType}
      className="fixed bottom-4 left-4 z-50 bg-card shadow-lg border data-[state=on]:bg-primary-cta data-[state=on]:text-primary-cta-foreground"
      pressed={true} // Keep it in the "on" state visually
    >
      <CurrentIcon className="h-4 w-4 mr-2" />
      <span className="text-xs font-semibold">
        Demo: {TYPE_DETAILS[userType].label}
      </span>
    </Toggle>
  );
}