/* src/app/context/stepDefinitions.ts */

import StepWelcome from "@/app/components/steps/StepWelcome";
// --- Ensure this line is 'StepEkycHandler' ---
import StepEkycHandler from "@/app/components/steps/StepEkycHandler";
import StepCombinedDetails from "@/app/components/steps/StepCombinedDetails";
import StepKycChoice from "@/app/components/steps/StepKycChoice";
import StepConvertAccount from "@/app/components/steps/StepConvertAccount";
import StepComplete from "@/app/components/steps/StepComplete";
import StepPhysicalKyc from "@/app/components/steps/StepPhysicalKyc";
import StepKycInstructions from "@/app/components/steps/StepKycInstructions";
import StepKycFace from "@/app/components/steps/StepKycFace";
import StepKycPan from "@/app/components/steps/StepKycPan";
import StepKycPanFace from "@/app/components/steps/StepKycPanFace";
import StepKycLoading from "@/app/components/steps/StepKycLoading";

export type UserType = "ntb" | "etb-no-acct" | "etb-with-acct";

export interface Step {
  id: string;
  title: string;
}

export const ALL_STEPS: Record<string, Step> = {
  welcome: { id: "welcome", title: "Mobile Verification" },
  // --- Ensure this ID is 'ekycHandler' ---
  ekycHandler: { id: "ekycHandler", title: "Aadhaar EKYC" },
  combinedDetails: { id: "combinedDetails", title: "Your Details" },
  kycChoice: { id: "kycChoice", title: "KYC Choice" },
  convertAccount: { id: "convertAccount", title: "Convert Account" },
  physicalKyc: { id: "physicalKyc", title: "Application Saved" },
  kycInstructions: { id: "kycInstructions", title: "Video KYC" },
  kycFace: { id: "kycFace", title: "Face Capture" },
  kycPan: { id: "kycPan", title: "PAN Capture" },
  kycPanFace: { id: "kycPanFace", title: "Final Proof" },
  kycLoading: { id: "kycLoading", title: "Verifying KYC" },
  complete: { id: "complete", title: "Account Created" },
};

export const STEP_COMPONENTS: Record<string, React.ComponentType> = {
  welcome: StepWelcome,
  // --- Ensure this points to the correct component ---
  ekycHandler: StepEkycHandler,
  combinedDetails: StepCombinedDetails,
  kycChoice: StepKycChoice,
  convertAccount: StepConvertAccount,
  complete: StepComplete,
  physicalKyc: StepPhysicalKyc,
  kycInstructions: StepKycInstructions,
  kycFace: StepKycFace,
  kycPan: StepKycPan,
  kycPanFace: StepKycPanFace,
  kycLoading: StepKycLoading,
};