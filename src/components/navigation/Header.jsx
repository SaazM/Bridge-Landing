
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Header({ currentPage }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="text-xl font-semibold text-[#1E3A8A]">
            Bridge
          </Link>

          <nav className="flex items-center gap-8">
            <Link 
              to={createPageUrl("Home")} 
              className={`text-sm font-normal transition-colors ${
                currentPage === "Home" 
                  ? "text-[#1E3A8A]" 
                  : "text-gray-600 hover:text-[#0B1121]"
              }`}
            >
              For Students
            </Link>
            <Link 
              to={createPageUrl("Employers")} 
              className={`text-sm font-normal transition-colors ${
                currentPage === "Employers" 
                  ? "text-[#1E3A8A]" 
                  : "text-gray-600 hover:text-[#0B1121]"
              }`}
            >
              For Employers
            </Link>
            <Link 
              to={createPageUrl("StudentDashboard")} 
              className={`text-sm font-normal transition-colors ${
                currentPage === "Dashboard" 
                  ? "text-[#1E3A8A]" 
                  : "text-gray-600 hover:text-[#0B1121]"
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to={createPageUrl("Onboarding")} 
              className={`text-sm font-normal transition-colors ${
                currentPage === "Onboarding" 
                  ? "text-[#1E3A8A]" 
                  : "text-gray-600 hover:text-[#0B1121]"
              }`}
            >
              Test Onboarding
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
