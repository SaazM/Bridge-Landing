import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function ProgressMilestones({ milestones, currentMilestone, progress }) {
  return (
    <div className="space-y-4 mb-8">
      <AnimatePresence mode="wait">
        {milestones.slice(0, Math.min(currentMilestone + 1, milestones.length)).map((milestone, i) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            {milestone.id < currentMilestone ? (
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
            ) : milestone.id === currentMilestone ? (
              <Loader2 className="w-5 h-5 text-[#EC4899] animate-spin flex-shrink-0" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex-shrink-0" />
            )}
            <span className={`text-sm ${milestone.id === currentMilestone ? 'text-white font-medium' : 'text-gray-400'}`}>
              {milestone.text}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="mt-6 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#EC4899] to-[#38BDF8]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}