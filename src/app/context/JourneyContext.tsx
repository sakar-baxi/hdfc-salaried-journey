/* src/app/context/JourneyContext.tsx */

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from "react";
import { ALL_STEPS, STEP_COMPONENTS } from "./stepDefinitions";
import type { Step, UserType } from "./stepDefinitions";

// --- 1. Types ---
interface JourneyState {
  userType: UserType;
  currentStepIndex: number;
  journeySteps: Step[];
  CurrentStepComponent: React.ComponentType; // The component for the *main flow*
  currentBranchComponent: React.ComponentType | null; // The component for *branches*
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepId: string) => void;
  setUserType: (type: UserType) => void;
  resetJourney: () => void;
}

// --- 2. Journey Logic ---
const getInitialStepsForUserType = (userType: UserType): Step[] => {
  let stepIds: string[] = [];
  switch (userType) {
    case "ntb":
      stepIds = ["welcome", "ekycRedirect", "combinedDetails", "kycChoice"];
      break;
    case "etb-no-acct":
      stepIds = ["welcome", "combinedDetails", "complete"];
      break;
    case "etb-with-acct":
      stepIds = ["welcome", "convertAccount", "complete"];
      break;
  }
  return stepIds.map(id => ALL_STEPS[id]);
};

// --- 3. Context & Provider ---
const JourneyContext = createContext<JourneyState | undefined>(undefined);

const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
const LOCAL_STORAGE_PREFIX = "hdfcJourney_";

export const JourneyProvider = ({ children }: { children: ReactNode }) => {
  const [userType, _setUserType] = useState<UserType>("ntb");
  const [currentStepIndex, _setCurrentStepIndex] = useState(0);
  const [journeySteps, _setJourneySteps] = useState<Step[]>(getInitialStepsForUserType("ntb"));
  const [currentBranchComponent, _setCurrentBranchComponent] = useState<React.ComponentType | null>(null);
  
  const [isInitialized, setIsInitialized] = useState(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  
  // --- State-setting functions ---
  const setJourneySteps = useCallback((steps: Step[]) => {
    _setJourneySteps(steps);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}journeySteps`, JSON.stringify(steps));
    }
  }, []);
  
  const setStepIndex = useCallback((index: number) => {
    _setCurrentStepIndex(index);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}stepIndex`, index.toString());
    }
  }, []);

  // --- THIS IS THE FIX ---
  // We MUST wrap the `component` in a function `() => component`
  // to prevent React from executing it.
  const setBranchComponent = useCallback((component: React.ComponentType | null) => {
    _setCurrentBranchComponent(() => component); // <-- THIS LINE IS THE FIX
    
    if (typeof window !== 'undefined') {
      const stepId = Object.keys(STEP_COMPONENTS).find(key => STEP_COMPONENTS[key] === component);
      if (stepId) {
        localStorage.setItem(`${LOCAL_STORAGE_PREFIX}branchStepId`, stepId);
      } else {
        localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}branchStepId`);
      }
    }
  }, []);

  const setUserType = useCallback((type: UserType) => {
    _setUserType(type);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}userType`, type);
    }
    const newSteps = getInitialStepsForUserType(type);
    setJourneySteps(newSteps);
    setStepIndex(0); 
    setBranchComponent(null); // Reset branch
  }, [setJourneySteps, setStepIndex, setBranchComponent]);

  const resetJourney = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}userType`);
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}stepIndex`);
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}journeySteps`);
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}branchStepId`);
    }
    _setUserType("ntb");
    const newSteps = getInitialStepsForUserType("ntb");
    _setJourneySteps(newSteps);
    _setCurrentStepIndex(0);
    setBranchComponent(null); // Reset branch
  }, [setBranchComponent]);

  // --- Inactivity Timer Logic ---
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(resetJourney, INACTIVITY_TIMEOUT_MS);
  }, [resetJourney]);

  useEffect(() => {
    if (!isInitialized) return; 
    const events = ["mousemove", "keydown", "click", "touchstart"];
    const handleActivity = () => resetInactivityTimer();
    events.forEach(event => window.addEventListener(event, handleActivity));
    resetInactivityTimer(); 
    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [isInitialized, resetInactivityTimer]);

  // --- Session Resume Logic ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedUserType = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}userType`) as UserType | null;
        const savedStepIndex = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}stepIndex`);
        const savedJourneySteps = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}journeySteps`);
        const savedBranchStepId = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}branchStepId`);

        if (savedUserType && savedStepIndex !== null && savedJourneySteps) {
          const parsedSteps = JSON.parse(savedJourneySteps) as Step[];
          const parsedIndex = parseInt(savedStepIndex, 10);

          if (parsedSteps.length > 0 && parsedIndex < parsedSteps.length) {
            _setUserType(savedUserType);
            _setJourneySteps(parsedSteps);
            _setCurrentStepIndex(parsedIndex); 
            
            if (savedBranchStepId && STEP_COMPONENTS[savedBranchStepId]) {
              // Use the correct setter
              setBranchComponent(STEP_COMPONENTS[savedBranchStepId]);
            }
          } else { resetJourney(); }
        } else { _setJourneySteps(getInitialStepsForUserType("ntb")); }
      } catch (error) { resetJourney(); }
      setIsInitialized(true);
    }
  }, [resetJourney, setBranchComponent]); // Add setBranchComponent to dependency array

  // --- Navigation Functions ---
  const nextStep = () => {
    setBranchComponent(null); // Go back to main flow
    if (currentStepIndex < journeySteps.length - 1) {
      setStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    setBranchComponent(null); // Go back to main flow
    if (currentStepIndex > 0) {
      setStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (stepId: string) => {
    const newComponent = STEP_COMPONENTS[stepId];
    if (!newComponent) {
      console.error(`Step "${stepId}" not found!`);
      return;
    }
    
    const mainJourneyIndex = journeySteps.findIndex(s => s.id === stepId);
    if (mainJourneyIndex !== -1) {
      setBranchComponent(null);
      setStepIndex(mainJourneyIndex);
    } else {
      setBranchComponent(newComponent);
    }
  };

  const CurrentStepComponent = journeySteps[currentStepIndex] 
    ? STEP_COMPONENTS[journeySteps[currentStepIndex].id]
    : () => null;

  if (!isInitialized) return null; 

  return (
    <JourneyContext.Provider
      value={{
        userType,
        currentStepIndex,
        journeySteps,
        CurrentStepComponent,
        currentBranchComponent,
        nextStep,
        prevStep,
        goToStep,
        setUserType,
        resetJourney,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};

// --- 6. Hook ---
export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error("useJourney must be used within a JourneyProvider");
  }
  return context;
};