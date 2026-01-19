/* src/app/layout.tsx */

import type { Metadata } from "next";
import "./globals.css";
import { JourneyProvider } from "@/app/context/JourneyContext";
import { cn } from "@/lib/utils";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: 'swap',
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
    // --- MODIFIED: Removed 'dark' class ---
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      {/* --- MODIFIED: Removed all extra classes --- */}
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          plusJakartaSans.variable
        )}
      >
        <JourneyProvider>
          {children}
        </JourneyProvider>
      </body>
    </html>
  );
}