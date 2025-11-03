/* src/app/components/layout/Sidebar.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import { cn } from "@/lib/utils";
import { CheckCircle, CircleDot, Circle } from "lucide-react";

export default function Sidebar() {
  const { journeySteps, currentStepIndex } = useJourney();

  return (
    // Base: Hidden on mobile, fixed on desktop
    <aside className="hidden md:block w-72 bg-primary text-primary-foreground p-8 fixed top-0 left-0 h-screen">
      <h1 className="text-2xl font-bold mb-10 text-white">
        HDFC Bank
      </h1>
      <nav>
        <ol className="relative border-l border-blue-200/30">
          {journeySteps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            const Icon = isCompleted ? CheckCircle : isCurrent ? CircleDot : Circle;
            
            return (
              <li key={step.id} className="mb-8 ml-6">
                <span className={cn(
                  "absolute -left-[13px] flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-primary",
                  isCompleted ? "bg-success" :
                  isCurrent ? "bg-white" : "bg-blue-200/30"
                )}>
                  <Icon 
                    className={cn(
                      isCompleted ? "text-white" :
                      isCurrent ? "text-primary" : "text-blue-200/50",
                      "w-4 h-4"
                    )} 
                  />
                </span>
                <h3 className={cn(
                  "font-semibold",
                  isCurrent ? "text-white" : "text-blue-200/70"
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