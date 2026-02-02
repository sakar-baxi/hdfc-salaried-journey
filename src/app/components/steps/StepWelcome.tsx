"use client";

import React, { useState, useEffect } from "react";
import { useJourney } from "@/app/context/JourneyContext";
import { useBranding } from "@/app/context/BrandingContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import StepCard from "@/app/components/layout/StepCard";

export default function StepWelcome() {
  const { updateFormData, formData, addNotification, nextStep } = useJourney();
  const { config } = useBranding();

  const [mobileNumber, setMobileNumber] = useState(formData.mobileNumber || "");
  const [dob, setDob] = useState(formData.dob || "");
  const [pan, setPan] = useState(formData.pan || "");
  const [consent, setConsent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ mobile?: string; dob?: string; pan?: string; consent?: string }>({});

  useEffect(() => {
    trackEvent('page_viewed', { page: 'welcome' });
    if (formData.mobileNumber && !mobileNumber) setMobileNumber(formData.mobileNumber);
    if (formData.dob && !dob) setDob(formData.dob);
    if (formData.pan && !pan) setPan(formData.pan);
  }, [formData.mobileNumber, formData.dob, formData.pan]);

  const validateForm = () => {
    const errors: typeof validationErrors = {};

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileNumber || !mobileRegex.test(mobileNumber)) {
      errors.mobile = "Please enter a valid 10-digit mobile number starting with 6-9";
    }
    if (!dob) {
      errors.dob = "Please provide your date of birth";
    }
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!pan || !panRegex.test(pan)) {
      errors.pan = "Please enter a valid PAN number (e.g. ABCDE1234F)";
    }
    if (!consent) {
      errors.consent = "Please accept the terms to continue";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    updateFormData({ mobileNumber, dob, pan });

    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      addNotification(`${config.name}`, `Your OTP is: 481230`);
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      nextStep();
    }, 800);
  };

  return (
    <StepCard step="Step 1 of 5" maxWidth="2xl">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Verify Your Identity</h1>
        <p className="page-subtitle">
          Please provide your details to begin your account setup
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleRequestOtp} className="space-y-5">
        {/* Mobile Number */}
        <div>
          <label htmlFor="mobile" className="form-label">
            Mobile Number
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-medium text-sm">
              +91
            </span>
            <Input
              id="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10));
                if (validationErrors.mobile) {
                  setValidationErrors(prev => ({ ...prev, mobile: undefined }));
                }
              }}
              className={`enterprise-input pl-12 ${validationErrors.mobile ? 'error' : ''}`}
              placeholder="98765 43210"
              autoFocus
              disabled={otpSent}
            />
          </div>
          {validationErrors.mobile && (
            <p className="error-text">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.mobile}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <Input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              if (validationErrors.dob) {
                setValidationErrors(prev => ({ ...prev, dob: undefined }));
              }
            }}
            max={new Date().toISOString().split("T")[0]}
            className={`enterprise-input ${validationErrors.dob ? 'error' : ''}`}
            disabled={otpSent}
          />
          {validationErrors.dob && (
            <p className="error-text">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.dob}
            </p>
          )}
        </div>

        {/* PAN Number */}
        <div>
          <label htmlFor="pan" className="form-label">
            PAN Number
          </label>
          <Input
            id="pan"
            type="text"
            maxLength={10}
            value={pan}
            onChange={(e) => {
              setPan(e.target.value.toUpperCase());
              if (validationErrors.pan) {
                setValidationErrors(prev => ({ ...prev, pan: undefined }));
              }
            }}
            className={`enterprise-input uppercase ${validationErrors.pan ? 'error' : ''}`}
            placeholder="ABCDE1234F"
            disabled={otpSent}
          />
          {validationErrors.pan && (
            <p className="error-text">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.pan}
            </p>
          )}
        </div>

        {/* Consent */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (validationErrors.consent) {
                  setValidationErrors(prev => ({ ...prev, consent: undefined }));
                }
              }}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-hdfc-blue focus:ring-hdfc-blue-light cursor-pointer"
              disabled={otpSent}
            />
            <span className="text-sm text-gray-600 leading-relaxed">
              I authorize {config.name} to access my credit information and KYC details for account opening purposes.
            </span>
          </label>
          {validationErrors.consent && (
            <p className="error-text mt-2">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.consent}
            </p>
          )}
        </div>

        {/* OTP Section - Shows after request */}
        {otpSent && (
          <div className="pt-4 border-t border-gray-200 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-medium">
                A 6-digit code has been sent to +91 {mobileNumber}
              </p>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
              >
                Change number
              </button>
            </div>

            <div>
              <label htmlFor="otp" className="form-label">
                Enter Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setOtp(val);
                }}
                className="enterprise-input text-center text-2xl tracking-[0.5em] font-mono"
                placeholder="• • • • • •"
                autoFocus
                disabled={isLoading}
              />
              <p className="text-center mt-3">
                <button
                  type="button"
                  className="btn-link text-sm"
                  onClick={handleRequestOtp}
                >
                  Resend code
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          {!otpSent ? (
            <Button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  Request OTP
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleVerifyOtp}
              className="btn-primary w-full"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          )}

          {/* Trust Signal */}
          <p className="trust-badge justify-center mt-4">
            🔒 Your information is secured with 256-bit encryption
          </p>
        </div>
      </form>
    </StepCard>
  );
}
