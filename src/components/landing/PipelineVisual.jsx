import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, CheckCircle2, Clock, Award, FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PipelineVisual() {
  const pipelineStages = [
    {
      title: "New Matches",
      color: "blue",
      icon: TrendingUp,
      count: 3,
      candidates: [
        { name: "Seedify Labs", role: "Product Intern", status: "Assessment: 2h left", statusColor: "yellow" },
        { name: "CloudVentures", role: "Frontend Intern", status: "Not started", statusColor: "gray" }
      ]
    },
    {
      title: "Assessments",
      color: "yellow",
      icon: FileCheck,
      count: 2,
      candidates: [
        { name: "TechFlow Inc", role: "ML Intern", status: "Submitted Dec 10", statusColor: "green" },
        { name: "DataCore", role: "Backend Intern", status: "Submitted Dec 9", statusColor: "green" }
      ]
    },
    {
      title: "Interviews",
      color: "purple",
      icon: Calendar,
      count: 2,
      candidates: [
        { name: "Nova Robotics", role: "Data Science Intern", status: "Dec 18, 2pm", statusColor: "purple" },
        { name: "CloudStream", role: "DevOps Intern", status: "Dec 19, 10am", statusColor: "purple" }
      ]
    },
    {
      title: "Offers",
      color: "green",
      icon: Award,
      count: 1,
      candidates: [
        { name: "Quantum Labs", role: "Research Intern", status: "Offer received", statusColor: "green" }
      ]
    }
  ];

  const colorMap = {
    blue: { bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500", text: "text-blue-700" },
    yellow: { bg: "bg-yellow-50", border: "border-yellow-200", dot: "bg-yellow-500", text: "text-yellow-700" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", dot: "bg-purple-500", text: "text-purple-700" },
    green: { bg: "bg-green-50", border: "border-green-200", dot: "bg-green-500", text: "text-green-700" },
    gray: { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700" }
  };

  return (
    <div className="relative py-16 md:py-20 px-4 md:px-6 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-4 md:mb-6 tracking-tight">
            <span className="text-[#0B1121]">Track your</span>{" "}
            <span className="text-[#1E3A8A]">entire journey</span>
          </h2>
          <p className="text-base md:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed font-normal">
            Stay organized with a clear view of every opportunity from match to offer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#0B1121] mb-1">
                My Pipeline
              </h3>
              <p className="text-sm md:text-base text-[#6B7280] font-normal">
                8 active opportunities
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pipelineStages.map((stage, idx) => {
              const StageIcon = stage.icon;
              const colors = colorMap[stage.color];

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                      <h4 className="text-sm font-semibold text-[#0B1121]">{stage.title}</h4>
                    </div>
                    <span className="text-xs font-semibold text-[#6B7280]">{stage.count}</span>
                  </div>

                  <div className="space-y-2">
                    {stage.candidates.map((candidate, cIdx) => {
                      const statusColors = colorMap[candidate.statusColor];
                      
                      return (
                        <div key={cIdx} className="bg-white rounded-lg p-3 border border-gray-200">
                          <div className="mb-2">
                            <p className="text-sm font-semibold text-[#0B1121] mb-0.5 truncate">
                              {candidate.name}
                            </p>
                            <p className="text-xs text-[#6B7280] truncate">{candidate.role}</p>
                          </div>
                          <div className={`flex items-center gap-1.5 p-2 rounded-md ${statusColors.bg} border ${statusColors.border}`}>
                            {candidate.statusColor === "yellow" && <Clock className={`w-3 h-3 ${statusColors.text} flex-shrink-0`} />}
                            {candidate.statusColor === "purple" && <Calendar className={`w-3 h-3 ${statusColors.text} flex-shrink-0`} />}
                            {candidate.statusColor === "green" && <CheckCircle2 className={`w-3 h-3 ${statusColors.text} flex-shrink-0`} />}
                            <span className={`text-xs ${statusColors.text} font-medium truncate`}>
                              {candidate.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}