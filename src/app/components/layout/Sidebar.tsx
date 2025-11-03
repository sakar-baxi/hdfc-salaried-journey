/* src/app/components/layout/Sidebar.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import { cn } from "@/lib/utils";
import { CheckCircle, CircleDot, Circle } from "lucide-react";

export default function Sidebar() {
  const { journeySteps, currentStepIndex } = useJourney();

  return (
    // --- MODIFIED: Set to bg-card (white) with a border ---
    <aside className="hidden md:block w-72 bg-card text-foreground p-8 fixed top-0 left-0 h-screen border-r border-border">
      <h1 className="text-2xl font-bold mb-10 text-primary">
        HDFC Bank
      </h1>
      <nav>
        {/* --- MODIFIED: Border is now a subtle gray --- */}
        <ol className="relative border-l border-border/50">
          {journeySteps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            const Icon = isCompleted ? CheckCircle : isCurrent ? CircleDot : Circle;
            
            return (
              <li key={step.id} className="mb-8 ml-6">
                <span className={cn(
                  "absolute -left-[13px] flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-card",
                  // --- MODIFIED: Use the NEW bright blue accent ---
                  isCompleted ? "bg-primary-cta" :
                  isCurrent ? "bg-primary-cta" : "bg-muted"
                )}>
                  <Icon 
                    className={cn(
                      // --- MODIFIED: Use white on the blue bg ---
                      isCompleted ? "text-white" :
                      isCurrent ? "text-white" : "text-muted-foreground",
                      "w-4 h-4"
                    )} 
                  />
                </span>
                <h3 className={cn(
                  "font-semibold",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}>
                  {step.title}
                </h3>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}