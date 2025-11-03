/* src/app/layout.tsx */

import type { Metadata } from "next";
import "./globals.css";
import { JourneyProvider } from "@/app/context/JourneyContext";
import { cn } from "@/lib/utils";

// Import the font
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: "HDFC Bank - Salaried Account",
  description: "Streamlined account opening for salaried employees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fallback font link just in case */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased", 
          plusJakartaSans.variable
        )}
      >
        {/* This Provider MUST wrap the children */}
        <JourneyProvider>
          {children}
        </JourneyProvider>
      </body>
    </html>
  );
}