/* src/app/components/JourneyStepWrapper.tsx */

"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function JourneyStepWrapper({ children }: Props) {
  return (
    <motion.div
      className="w-full max-w-6xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        type: "spring",
        damping: 25,
        stiffness: 200,
        mass: 0.5
      }}
    >
      {children}
    </motion.div>
  );
}