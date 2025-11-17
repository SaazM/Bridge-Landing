import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function StudentFinalCTA() {
  const handleJoinWaitlist = () => {
    window.open('https://tally.so/r/kddZMR', '_blank');
  };

  return (
    <div className="relative py-20 px-6 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-12 lg:p-16 text-center overflow-hidden bg-gray-50 border border-gray-200"
        >
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-semibold mb-6 tracking-tight">
              <span className="text-[#0B1121]">Ready to stop applying and</span>{" "}
              <span className="text-[#1E3A8A]">start matching?</span>
            </h2>
            
            <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
              Be one of the first students to try AI-powered matching for internships that actually fit you.
            </p>

            <Button
              onClick={handleJoinWaitlist}
              className="h-14 px-10 text-lg font-medium rounded-2xl text-[#1E3A8A] shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: '#FFFF00' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E500'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFF00'}
            >
              Join Waitlist <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-[#6B7280] text-sm mt-6 font-normal">
              No commitment required • Start getting matched in minutes
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}