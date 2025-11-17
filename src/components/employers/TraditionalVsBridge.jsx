import React from "react";
import { motion } from "framer-motion";
import { Clock, Inbox, Search, Filter, Users, FileText, Target, CheckCircle, Sparkles } from "lucide-react";

export default function TraditionalVsBridge() {
  const traditional = {
    title: "Traditional Hiring",
    steps: [
      { text: "Post a job → wait for applicants", icon: Inbox },
      { text: "Manually source candidates on LinkedIn & job boards", icon: Search },
      { text: "Sort through hundreds of resumes or use keyword filters", icon: Filter },
      { text: "Interview candidates before seeing any proof of ability", icon: Users }
    ],
    caption: "Reactive. Low signal. Manual"
  };

  const bridge = {
    title: "Bridge",
    steps: [
      { text: "Describe your role → Bridge creates a custom project", icon: FileText },
      { text: "Bridge finds and matches candidates on/off the platform", icon: Target },
      { text: "AI that reads code and projects — not just resumes", icon: Sparkles },
      { text: "Only review candidates who completed your assessment", icon: CheckCircle }
    ],
    caption: "Proactive. High signal. Automatic."
  };

  return (
    <div className="relative py-20 px-6 bg-gray-50 border-t-2 border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight">
            <span className="text-[#0B1121]">Traditional Hiring</span>{" "}
            <span className="text-[#6B7280]">vs</span>{" "}
            <span className="text-[#1E3A8A]">Bridge</span>
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-4 items-stretch">
            {/* Traditional Hiring Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 flex flex-col"
            >
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700">{traditional.title}</h3>
              </div>

              <div className="space-y-6 mb-8 flex-grow">
                {traditional.steps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                        <StepIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-700 leading-relaxed font-normal">
                          {step.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-gray-300 mt-auto">
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
              className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-lg flex flex-col"
            >
              <div className="flex flex-col items-center text-center mb-10">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6917685328c008689a17e188/526ff9972_square-image.jpg" 
                  alt="Bridge Logo" 
                  className="w-16 h-16 rounded-2xl mb-4"
                />
                <h3 className="text-2xl font-semibold text-[#1E3A8A]">{bridge.title}</h3>
              </div>

              <div className="space-y-6 mb-8 flex-grow">
                {bridge.steps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center">
                        <StepIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-[#0B1121] leading-relaxed font-normal">
                          {step.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-[#1E3A8A] mt-auto">
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