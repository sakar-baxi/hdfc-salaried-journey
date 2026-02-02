import React from "react";

interface StepCardProps {
    children: React.ReactNode;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    step?: string;
}

const maxWidthClasses = {
    sm: "max-w-md",   // 448px - for simple forms
    md: "max-w-lg",   // 512px - default
    lg: "max-w-2xl",  // 672px - for tables/summaries
    xl: "max-w-4xl",  // 896px - for complex layouts
    "2xl": "max-w-6xl", // 1152px - for widescreen forms
    "3xl": "max-w-7xl", // 1280px - for full dashboards
};

export default function StepCard({ children, maxWidth = "md", step }: StepCardProps) {
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className={`enterprise-card ${maxWidthClasses[maxWidth]} w-full`}>
                {step && (
                    <div className="step-progress mb-6">
                        <span>{step}</span>
                    </div>
                )}
                <div className="space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
