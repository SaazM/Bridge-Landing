import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function FinalCTA() {
  const handleScheduleCall = () => {
    window.open('https://calendly.com/smahadkar-ucsd/30min', '_blank');
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
              <span className="text-[#0B1121]">Build your team without the</span>{" "}
              <span className="text-[#1E3A8A]">hiring headache</span>
            </h2>

            <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
              Schedule a 15-minute call to see how Bridge can transform your hiring
            </p>

            <Button
              onClick={handleScheduleCall}
              className="h-14 px-10 text-lg font-medium rounded-2xl text-[#1E3A8A] shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: '#FFFF00' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E500'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFF00'}
            >
              <Calendar className="mr-2 w-5 h-5" />
              Schedule a Call
            </Button>

            <p className="text-[#6B7280] text-sm mt-6 font-normal">
              No commitment required • See how Bridge works in minutes
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}