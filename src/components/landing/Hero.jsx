import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const handleJoinWaitlist = () => {
    window.open('https://tally.so/r/kddZMR', '_blank');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden bg-white">
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#FFFF00]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8">

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
            <span className="text-[#0B1121]">You don't apply.</span>{" "}
            <span className="text-[#1E3A8A]"><br />You get matched.</span>
          </h1>

          <p className="text-xl lg:text-2xl text-[#6B7280] leading-relaxed max-w-3xl mx-auto font-normal">We automatically match you with top startup internships. 
<br />No job boards. No applications. No forms.

          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleJoinWaitlist}
              className="h-16 px-10 text-lg font-medium rounded-2xl text-[#1E3A8A] shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
              style={{ backgroundColor: '#FFFF00' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFFF00'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFF00'}>
              Join Waitlist <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

        </motion.div>
      </div>
    </div>);

}