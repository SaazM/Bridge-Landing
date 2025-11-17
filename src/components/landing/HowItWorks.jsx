import React from "react";
import { motion } from "framer-motion";
import { X, Check, Clock } from "lucide-react";

export default function HowItWorks() {
  const traditional = {
    title: "Traditional Internship Hunt",
    steps: [
      "Apply to hundreds of internships on job boards",
      "Rewrite resumes and cover letters for every role",
      "Wait weeks with no updates or ghosting",
      "Interviews only if your resume has the \"right keywords\""
    ],
    caption: "Exhausting. Low-response. Luck-based."
  };

  const bridge = {
    title: "Bridge",
    steps: [
      "Create a profile once — no applications needed",
      "Bridge analyzes your GitHub, Linkedin, projects",
      "You're matched automatically with roles that fit your skills",
      "Assessments and interviews delivered to your dashboard"
    ],
    caption: "Automatic. High-response. Skill-based"
  };

  return (
    <div className="relative py-20 px-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight">
            <span className="text-[#0B1121]">Traditional Search</span>{" "}
            <span className="text-[#6B7280]">vs</span>{" "}
            <span className="text-[#1E3A8A]">Bridge</span>
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-4">
            {/* Traditional Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10"
            >
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700">{traditional.title}</h3>
              </div>

              <div className="space-y-6 mb-8">
                {traditional.steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                      <X className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-gray-700 leading-relaxed font-normal">
                        {step}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-300">
                <p className="text-sm text-gray-600 font-medium text-center">
                  {traditional.caption}
                </p>
              </div>
            </motion.div>

            {/* Bridge Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-lg"
            >
              <div className="flex flex-col items-center text-center mb-10">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6917685328c008689a17e188/526ff9972_square-image.jpg" 
                  alt="Bridge Logo" 
                  className="w-16 h-16 rounded-2xl mb-4"
                />
                <h3 className="text-2xl font-semibold text-[#1E3A8A]">{bridge.title}</h3>
              </div>

              <div className="space-y-6 mb-8">
                {bridge.steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-[#0B1121] leading-relaxed font-normal">
                        {step}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#1E3A8A]">
                <p className="text-sm text-[#1E3A8A] font-medium text-center">
                  {bridge.caption}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}