import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function EmployerHero() {
  const handleScheduleCall = () => {
    window.open('https://calendly.com/smahadkar-ucsd/30min', '_blank');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden bg-white">
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#FFFF00]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8">

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
            <span className="text-[#0B1121]">No sifting through resumes.</span>{" "}
            <span className="text-[#1E3A8A]">Match with candidates.</span>
          </h1>

          <p className="text-xl text-[#6B7280] leading-relaxed max-w-3xl mx-auto font-normal">Bridge handles sourcing, screening, and assessments automatically — so you only review candidates who've already proven they fit the role.

          </p>

          <Button
            onClick={handleScheduleCall}
            className="h-14 px-10 text-lg font-medium rounded-2xl text-[#1E3A8A] shadow-lg hover:shadow-xl transition-all"
            style={{ backgroundColor: '#FFFF00' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E500'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFF00'}>

            <Calendar className="mr-2 w-5 h-5" />
            Schedule a Call
          </Button>
        </motion.div>
      </div>
    </div>);

}