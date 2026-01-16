/* src/app/context/stepDefinitions.ts */

import StepWelcome from "@/app/components/steps/StepWelcome";
import StepJourneySelection from "@/app/components/steps/StepJourneySelection";
import StepCombinedDetails from "@/app/components/steps/StepCombinedDetails";
import StepKycChoice from "@/app/components/steps/StepKycChoice";
import StepContactDetails from "@/app/components/steps/StepContactDetails";
import StepEmploymentInfo from "@/app/components/steps/StepEmploymentInfo";
import StepKycDetails from "@/app/components/steps/StepKycDetails";
import StepComplete from "@/app/components/steps/StepComplete";
import StepVideoKyc from "@/app/components/steps/StepVideoKyc";
import StepEkycHandler from "@/app/components/steps/StepEkycHandler";
import StepPhysicalKyc from "@/app/components/steps/StepPhysicalKyc";
import StepAccountConversion from "@/app/components/steps/StepAccountConversion";
import StepProfessionalDetailsExpress from "@/app/components/steps/StepProfessionalDetailsExpress";

export type UserType = "ntb" | "etb-no-acct" | "etb-with-acct";
export type JourneyType = "journey1" | "journey2" | "journey3";

export interface Step {
  id: string;
  title: string;
}

export const ALL_STEPS: Record<string, Step> = {
  journeySelection: { id: "journeySelection", title: "Select Journey" },
  welcome: { id: "welcome", title: "Identify Yourself" },
  kycChoice: { id: "kycChoice", title: "Select KYC" },
  contactDetails: { id: "contactDetails", title: "Personal Profile" },
  combinedDetails: { id: "combinedDetails", title: "Your Profile" },
  employmentInfo: { id: "employmentInfo", title: "VKYC Consent" },
  kycDetails: { id: "kycDetails", title: "VKYC Consent" },
  videoKyc: { id: "videoKyc", title: "Video KYC" },
  accountConversion: { id: "accountConversion", title: "Convert Account" },
  professionalDetailsExpress: { id: "professionalDetailsExpress", title: "Your Profile" },
  complete: { id: "complete", title: "Submitted" },
};

export const STEP_COMPONENTS: Record<string, React.ComponentType> = {
  journeySelection: StepJourneySelection,
  welcome: StepWelcome,
  kycChoice: StepKycChoice,
  contactDetails: StepContactDetails,
  combinedDetails: StepCombinedDetails,
  employmentInfo: StepEmploymentInfo,
  kycDetails: StepKycDetails,
  videoKyc: StepVideoKyc,
  complete: StepComplete,
  ekycHandler: StepEkycHandler,
  physicalKyc: StepPhysicalKyc,
  accountConversion: StepAccountConversion,
  professionalDetailsExpress: StepProfessionalDetailsExpress,
};