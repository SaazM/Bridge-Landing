import React from "react";
import { Calendar, TrendingUp, CheckCircle2 } from "lucide-react";
import Header from "../components/navigation/Header";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import MatchesList from "../components/dashboard/MatchesList";

export default function StudentDashboard() {
  const matches = [
    {
      company: "Nova Robotics",
      role: "Data Science Intern",
      location: "San Diego, CA",
      match: "94%",
      description: "Building autonomous systems for warehouse logistics. Looking for a data science intern to optimize ML models.",
      skills: ["Python", "TensorFlow", "Data Analysis", "Machine Learning", "Statistics"],
      insight: "Your machine learning coursework and Python projects align perfectly with their tech stack.",
      logo: "nova",
      actionType: "interview"
    },
    {
      company: "Seedify Labs",
      role: "Product Intern",
      location: "Remote",
      match: "89%",
      description: "Early-stage fintech startup revolutionizing investment tools. Need a product intern to help shape our roadmap.",
      skills: ["React", "Figma", "Product Strategy", "User Research"],
      insight: "Your React projects and design thinking experience make you a strong fit for their product team.",
      logo: "seedify",
      actionType: "assessment"
    },
    {
      company: "CloudStream",
      role: "Backend Engineer Intern",
      location: "San Francisco, CA",
      match: "87%",
      description: "Real-time streaming platform serving millions of users. Looking for backend engineers passionate about scale.",
      skills: ["Node.js", "PostgreSQL", "AWS", "Microservices"],
      insight: "Your Node.js expertise and cloud architecture knowledge align with their infrastructure needs.",
      logo: "cloudstream",
      actionType: "booked",
      bookedDate: "November 25th"
    },
    {
      company: "DataFlow",
      role: "ML Engineer Intern",
      location: "Boston, MA",
      match: "85%",
      description: "AI-powered analytics platform helping businesses make data-driven decisions. Seeking ML engineers.",
      skills: ["Python", "PyTorch", "SQL", "Data Visualization"],
      insight: "Your Python and data visualization skills are exactly what they need for their ML pipeline.",
      logo: "dataflow",
      actionType: "completed"
    }
  ];

  const stats = [
    { label: "Matches", value: "4", icon: TrendingUp },
    { label: "Interviews Booked", value: "1", icon: Calendar },
    { label: "Projects Completed", value: "1", icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Dashboard" />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <DashboardHeader userName="Student" matchCount={matches.length} />
          <DashboardStats stats={stats} />
          <MatchesList matches={matches} />
        </div>
      </div>
    </div>
  );
}