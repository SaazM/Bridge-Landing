import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, CheckCircle2, Clock, AlertCircle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardShowcase() {
  return (
    <div className="relative py-16 md:py-20 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-4 md:mb-6 tracking-tight px-4">
            <span className="text-[#0B1121]">Your</span>{" "}
            <span className="text-[#1E3A8A]">hiring dashboard</span>
          </h2>
          <p className="text-base md:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed px-4 font-normal">
            Track your pipeline, review assessments, and schedule interviews — all in one place.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main dashboard mockup */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200">
            {/* Dashboard header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200 gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#0B1121] mb-1">
                  Full-Stack Engineer Intern
                </h3>
                <p className="text-sm md:text-base text-[#6B7280] font-normal">
                  New York, NY • 32 candidates in pipeline
                </p>
              </div>
            </div>

            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 md:mb-8"
            >
              <h4 className="text-base md:text-lg font-semibold text-[#0B1121] mb-4 md:mb-5">Progress Overview</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="p-3 md:p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#1E3A8A]" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-[#0B1121] mb-1">8</p>
                  <p className="text-xs md:text-sm text-[#6B7280] font-normal">New matches this week</p>
                </div>

                <div className="p-3 md:p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-[#0B1121] mb-1">4</p>
                  <p className="text-xs md:text-sm text-[#6B7280] font-normal">Assessments awaiting review</p>
                </div>

                <div className="p-3 md:p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-[#0B1121] mb-1">4</p>
                  <p className="text-xs md:text-sm text-[#6B7280] font-normal">Interviews scheduled</p>
                </div>

                <div className="p-3 md:p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-[#0B1121] mb-1">1</p>
                  <p className="text-xs md:text-sm text-[#6B7280] font-normal">Offers pending</p>
                </div>
              </div>
            </motion.div>

            {/* Pipeline Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg md:text-2xl font-semibold text-[#0B1121] mb-4 md:mb-6">Application Pipeline</h4>

              {/* Kanban Columns Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Assessments In Progress Column */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <h5 className="text-sm font-semibold text-[#0B1121]">Assessments In Progress</h5>
                    </div>
                    <span className="text-xs font-semibold text-[#6B7280]">8</span>
                  </div>

                  <div className="space-y-2">
                    {/* Candidate Card 1 - In Progress */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#0B1121] truncate">Maya Johnson</p>
                          <p className="text-xs text-[#6B7280]">94% match</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-md bg-yellow-50 border border-yellow-200">
                        <Clock className="w-3 h-3 text-yellow-700 flex-shrink-0" />
                        <span className="text-xs text-yellow-900 font-medium">2h 15m left</span>
                      </div>
                    </div>

                    {/* Candidate Card 2 - Overdue */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#0B1121] truncate">Emily Chen</p>
                          <p className="text-xs text-[#6B7280]">89% match</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-md bg-red-50 border border-red-200">
                        <AlertCircle className="w-3 h-3 text-red-600 flex-shrink-0" />
                        <span className="text-xs text-red-900 font-medium">2h overdue</span>
                      </div>
                    </div>

                    {/* Candidate Card 3 - Not Started */}
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#0B1121] truncate">Carlos Rivera</p>
                          <p className="text-xs text-[#6B7280]">91% match</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-md bg-gray-50 border border-gray-200">
                        <FileCheck className="w-3 h-3 text-[#6B7280] flex-shrink-0" />
                        <span className="text-xs text-[#6B7280] font-medium">Not started</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assessments Completed Column */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <h5 className="text-sm font-semibold text-[#0B1121]">Assessments Completed</h5>
                    </div>
                    <span className="text-xs font-semibold text-[#6B7280]">4</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: "Sam Patel", match: "90%", score: 92 },
                      { name: "Nina Walsh", match: "92%", score: 88 },
                      { name: "Lucas Brown", match: "88%", score: 85 }
                    ].map((candidate, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#0B1121] truncate">{candidate.name}</p>
                            <p className="text-xs text-[#6B7280]">{candidate.match} match</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md bg-green-50 border border-green-200">
                          <span className="text-xs text-green-900 font-medium">AI Score</span>
                          <span className="text-xs font-semibold text-green-900">{candidate.score}/100</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interview Scheduled Column */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <h5 className="text-sm font-semibold text-[#0B1121]">Interview Scheduled</h5>
                    </div>
                    <span className="text-xs font-semibold text-[#6B7280]">4</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: "Alex Park", match: "92%", date: "Dec 18, 2pm" },
                      { name: "Jordan Lee", match: "88%", date: "Dec 19, 10am" },
                      { name: "Rachel Green", match: "91%", date: "Dec 19, 3pm" }
                    ].map((candidate, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#0B1121] truncate">{candidate.name}</p>
                            <p className="text-xs text-[#6B7280]">{candidate.match} match</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 p-2 rounded-md bg-purple-50 border border-purple-200">
                          <Calendar className="w-3 h-3 text-purple-700 flex-shrink-0" />
                          <span className="text-xs text-purple-900 font-medium">{candidate.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}