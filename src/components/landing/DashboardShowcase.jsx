import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Calendar, CheckCircle2, User, Clock, AlertCircle, FileCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CompanyLogo = ({ company }) => {
  const logos = {
    nova: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect width="40" height="40" rx="8" fill="#3B82F6" />
        <path d="M12 28L20 12L28 28H12Z" fill="white" />
      </svg>
    ),
    seedify: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect width="40" height="40" rx="8" fill="#10B981" />
        <circle cx="20" cy="15" r="4" fill="white" />
        <path d="M20 19C15 19 12 25 12 28H28C28 25 25 19 20 19Z" fill="white" />
      </svg>
    ),
    cloudstream: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <rect width="40" height="40" rx="8" fill="#8B5CF6" />
        <path d="M28 20C28 16 25 13 20 13C15 13 12 16 12 20C12 24 15 27 20 27H28C28 24 28 22 28 20Z" fill="white" />
      </svg>
    )
  };
  return logos[company] || logos.nova;
};

export default function DashboardShowcase() {
  const matches = [
    {
      company: "Seedify Labs",
      role: "Product Intern",
      location: "Remote",
      match: "89%",
      description: "Early-stage fintech startup revolutionizing investment tools. Need a product intern to help shape our roadmap.",
      skills: ["React", "Figma", "Product Strategy", "User Research"],
      insight: "Your React projects and design thinking experience make you a strong fit for their product team.",
      logo: "seedify",
      actionType: "continue",
      assessmentStarted: true,
      hoursLeft: 2,
      completionTimeAllowedHours: 4
    },
    {
      company: "CloudVentures",
      role: "Frontend Engineer Intern",
      location: "Seattle, WA",
      match: "88%",
      description: "Building next-generation cloud storage solutions for developers.",
      skills: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
      insight: "Your frontend expertise and TypeScript knowledge make you an excellent fit for their engineering team.",
      logo: "cloudstream",
      actionType: "assessment",
      assessmentStarted: false,
      completionTimeAllowedHours: 4
    }
  ];

  const pipelineStages = [
    {
      title: "New Matches",
      color: "blue",
      count: 3,
      candidates: [
        { name: "Seedify Labs", role: "Product Intern", status: "Assessment: 2h left", statusColor: "yellow" },
        { name: "CloudVentures", role: "Frontend Intern", status: "Not started", statusColor: "gray" }
      ]
    },
    {
      title: "Assessments",
      color: "yellow",
      count: 2,
      candidates: [
        { name: "TechFlow Inc", role: "ML Intern", status: "Submitted Dec 10", statusColor: "green" },
        { name: "DataCore", role: "Backend Intern", status: "Submitted Dec 9", statusColor: "green" }
      ]
    },
    {
      title: "Interviews",
      color: "purple",
      count: 2,
      candidates: [
        { name: "Nova Robotics", role: "Data Science Intern", status: "Dec 18, 2pm", statusColor: "purple" },
        { name: "CloudStream", role: "DevOps Intern", status: "Dec 19, 10am", statusColor: "purple" }
      ]
    },
    {
      title: "Offers",
      color: "green",
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
    <div className="relative py-16 md:py-20 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-4 md:mb-6 tracking-tight">
            <span className="text-[#0B1121]">Your personalized</span>{" "}
            <span className="text-[#1E3A8A]">dashboard</span>
          </h2>
          <p className="text-base md:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed font-normal">
            Track matches, manage assessments, and follow your journey from application to offer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200 mb-8"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200 gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#0B1121] mb-1">
                Welcome back, Student
              </h3>
              <p className="text-sm md:text-base text-[#6B7280] font-normal">
                You have 3 new matches this week
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 bg-blue-100">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#1E3A8A]" />
              </div>
              <p className="text-[#6B7280] text-xs md:text-sm mb-1 font-normal">Matches</p>
              <p className="text-2xl md:text-3xl font-semibold text-[#0B1121]">4</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 bg-purple-100">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
              </div>
              <p className="text-[#6B7280] text-xs md:text-sm mb-1 font-normal">Interviews Booked</p>
              <p className="text-2xl md:text-3xl font-semibold text-[#0B1121]">1</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 bg-yellow-100">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
              <p className="text-[#6B7280] text-xs md:text-sm mb-1 font-normal">Projects Left</p>
              <p className="text-2xl md:text-3xl font-semibold text-[#0B1121]">2</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 bg-orange-100">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
              </div>
              <p className="text-[#6B7280] text-xs md:text-sm mb-1 font-normal">Next Matches</p>
              <p className="text-2xl md:text-3xl font-semibold text-[#0B1121]">6d 12h</p>
            </motion.div>
          </div>

          {/* To Do Section - Match Cards */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-[#0B1121] mb-4 md:mb-6">To Do</h3>
            <div className="space-y-4">
              {matches.map((match, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="bg-white rounded-xl border-2 border-gray-200 p-4 md:p-6 hover:border-[#1E3A8A] transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                      <CompanyLogo company={match.logo} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg md:text-xl font-semibold text-[#0B1121] mb-1">{match.company}</h4>
                          <p className="text-sm md:text-base text-[#6B7280] font-normal">{match.role} • {match.location}</p>
                        </div>
                        <Badge className="bg-[#1E3A8A] text-white px-3 py-1 self-start md:self-auto">
                          {match.match} Match
                        </Badge>
                      </div>

                      <p className="text-sm text-[#6B7280] mb-3 font-normal leading-relaxed">{match.description}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {match.skills.map((skill, skillIdx) => (
                          <span
                            key={skillIdx}
                            className="px-3 py-1 bg-gray-100 text-[#0B1121] rounded-lg text-xs md:text-sm font-normal"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 mb-4">
                        <p className="text-xs md:text-sm text-[#1E3A8A] font-normal">{match.insight}</p>
                      </div>

                      {match.assessmentStarted ? (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1 p-3 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-700 flex-shrink-0" />
                            <span className="text-sm text-yellow-900 font-medium">
                              {match.hoursLeft}h {Math.floor((match.hoursLeft % 1) * 60)}m left
                            </span>
                          </div>
                          <Button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
                            Continue Assessment
                          </Button>
                        </div>
                      ) : (
                        <Button className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
                          Start Assessment
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pipeline Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-semibold text-[#0B1121]">My Pipeline</h3>
              <Button variant="outline" className="text-sm">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pipelineStages.map((stage, idx) => {
                const colors = colorMap[stage.color];

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}