import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Header({ currentPage }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2 flex-shrink-0">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6917685328c008689a17e188/53409a687_Untitled_Artwork.png" 
              alt="Bridge Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <span className="text-lg sm:text-xl font-semibold text-[#1E3A8A]">Bridge</span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-6">
            <Link 
              to={createPageUrl("Home")} 
              className={`text-xs sm:text-sm font-normal transition-colors whitespace-nowrap ${
                currentPage === "Home" ? "text-[#1E3A8A] font-medium" : "text-[#6B7280] hover:text-[#1E3A8A]"
              }`}
            >
              For Students
            </Link>
            <Link 
              to={createPageUrl("Employers")} 
              className={`text-xs sm:text-sm font-normal transition-colors whitespace-nowrap ${
                currentPage === "Employers" ? "text-[#1E3A8A] font-medium" : "text-[#6B7280] hover:text-[#1E3A8A]"
              }`}
            >
              For Employers
            </Link>
            <Link 
              to={createPageUrl("Contact")} 
              className={`text-xs sm:text-sm font-normal transition-colors whitespace-nowrap ${
                currentPage === "Contact" ? "text-[#1E3A8A] font-medium" : "text-[#6B7280] hover:text-[#1E3A8A]"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}