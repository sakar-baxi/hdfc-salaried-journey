/* src/app/context/stepDefinitions.ts */

import StepWelcome from "@/app/components/steps/StepWelcome";
import StepJourneySelection from "@/app/components/steps/StepJourneySelection";
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
import StepAccountAuth from "@/app/components/steps/StepAccountAuth";
import StepLoanOffer from "@/app/components/steps/StepLoanOffer";
import StepEmploymentInfo from "@/app/components/steps/StepEmploymentInfo";
import StepNomineeInfo from "@/app/components/steps/StepNomineeInfo";

export type UserType = "ntb" | "etb-no-acct" | "etb-with-acct";
export type JourneyType = "journey1" | "journey2" | "journey3";

export interface Step {
  id: string;
  title: string;
}

export const ALL_STEPS: Record<string, Step> = {
  journeySelection: { id: "journeySelection", title: "Select Journey" },
  welcome: { id: "welcome", title: "Mobile Verification" },
  ekycHandler: { id: "ekycHandler", title: "Aadhaar EKYC" },
  combinedDetails: { id: "combinedDetails", title: "Your Details" },
  kycChoice: { id: "kycChoice", title: "KYC Choice" },
  convertAccount: { id: "convertAccount", title: "Convert Account" },
  accountAuth: { id: "accountAuth", title: "Account Authentication" },
  physicalKyc: { id: "physicalKyc", title: "Application Saved" },
  kycInstructions: { id: "kycInstructions", title: "Video KYC" },
  kycFace: { id: "kycFace", title: "Face Capture" },
  kycPan: { id: "kycPan", title: "PAN Capture" },
  kycPanFace: { id: "kycPanFace", title: "Final Proof" },
  kycLoading: { id: "kycLoading", title: "Verifying KYC" },
  employmentInfo: { id: "employmentInfo", title: "Employment Information" },
  nomineeInfo: { id: "nomineeInfo", title: "Nominee Information" },
  loanOffer: { id: "loanOffer", title: "Pre-approved Loan" },
  complete: { id: "complete", title: "Account Created" },
};

export const STEP_COMPONENTS: Record<string, React.ComponentType> = {
  journeySelection: StepJourneySelection,
  welcome: StepWelcome,
  ekycHandler: StepEkycHandler,
  combinedDetails: StepCombinedDetails,
  kycChoice: StepKycChoice,
  convertAccount: StepConvertAccount,
  accountAuth: StepAccountAuth,
  complete: StepComplete,
  physicalKyc: StepPhysicalKyc,
  kycInstructions: StepKycInstructions,
  kycFace: StepKycFace,
  kycPan: StepKycPan,
  kycPanFace: StepKycPanFace,
  kycLoading: StepKycLoading,
  employmentInfo: StepEmploymentInfo,
  nomineeInfo: StepNomineeInfo,
  loanOffer: StepLoanOffer,
};