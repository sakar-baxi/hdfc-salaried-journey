/* src/app/components/JourneyStepWrapper.tsx */

"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function JourneyStepWrapper({ children }: Props) {
  return (
    <motion.div
      // --- MODIFIED: Restoring the "full width" card layout ---
      className="w-full max-w-6xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, type: "spring", damping: 20, stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
}