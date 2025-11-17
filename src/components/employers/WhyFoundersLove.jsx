import React from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

export default function WhyFoundersLove() {
  const comparisons = [
    {
      old: "Spending hours sorting résumés",
      new: "Only reviewing candidates already proven to fit your role"
    },
    {
      old: "One-dimensional résumés",
      new: "Dynamic profiles built from projects, GitHub, and assessments"
    },
    {
      old: "Weeks of sourcing and waiting",
      new: "Bridge finds and screens candidates on/off the platform and delivers high-fit matches instantly"
    }
  ];

  return (
    <div className="relative py-20 px-6 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
            <span className="text-[#0B1121]">Why founders</span>{" "}
            <span className="text-[#1E3A8A]">love Bridge</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {comparisons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            >
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-[#6B7280] font-normal">{item.old}</p>
              </div>

              <div className="bg-gradient-to-br from-[#1E3A8A]/5 to-[#1E3A8A]/10 rounded-2xl p-6 border-2 border-[#1E3A8A]/30 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1E3A8A] flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-[#0B1121] font-semibold">{item.new}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}