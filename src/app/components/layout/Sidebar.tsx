/* src/app/components/layout/Sidebar.tsx */

"use client";

import { useJourney } from "@/app/context/JourneyContext";
import { cn } from "@/lib/utils";
import { CheckCircle, CircleDot, Circle } from "lucide-react";

export default function Sidebar() {
  const { journeySteps, currentStepIndex } = useJourney();

  return (
    <aside className="hidden md:block w-72 bg-card/80 backdrop-blur-xl text-foreground p-8 fixed top-0 left-0 h-screen border-r border-border/50 shadow-premium">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-primary/10">
          H
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gradient">
          HDFC Bank
        </h1>
      </div>
      <nav>
        <ol className="relative border-l-2 border-primary/10 space-y-6">
          {journeySteps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            const Icon = isCompleted ? CheckCircle : isCurrent ? CircleDot : Circle;

            return (
              <li key={step.id} className="relative pl-8">
                <span className={cn(
                  "absolute -left-[13px] top-1 flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300",
                  isCompleted ? "bg-primary shadow-lg shadow-primary/30" :
                    isCurrent ? "bg-primary animate-pulse shadow-lg shadow-primary/30" : "bg-muted ring-2 ring-background text-muted-foreground"
                )}>
                  <Icon
                    className={cn(
                      isCompleted || isCurrent ? "text-white" : "text-muted-foreground",
                      "w-3.5 h-3.5"
                    )}
                  />
                </span>
                <div className="flex flex-col">
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-widest mb-1 transition-colors duration-300",
                    isCurrent ? "text-primary" : "text-muted-foreground/60"
                  )}>
                    Step {index + 1}
                  </span>
                  <h3 className={cn(
                    "font-bold transition-all duration-300",
                    isCurrent ? "text-foreground transform translate-x-1" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </h3>
                </div>
                {isCurrent && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full -ml-8" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}