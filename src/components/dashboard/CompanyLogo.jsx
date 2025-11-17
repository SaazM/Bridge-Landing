import React from "react";

export default function CompanyLogo({ type }) {
  const logos = {
    nova: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white rounded-full" />
          <div className="absolute w-3 h-3 bg-white rounded-full" style={{ top: '20%', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
      </div>
    ),
    seedify: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center">
        <div className="relative">
          <div className="w-3 h-6 bg-white rounded-full" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full" />
        </div>
      </div>
    ),
    cloudstream: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] flex items-center justify-center relative">
        <div className="flex gap-0.5">
          <div className="w-1.5 bg-white rounded-full" style={{ height: '20px' }} />
          <div className="w-1.5 bg-white rounded-full" style={{ height: '28px' }} />
          <div className="w-1.5 bg-white rounded-full" style={{ height: '16px' }} />
          <div className="w-1.5 bg-white rounded-full" style={{ height: '24px' }} />
        </div>
      </div>
    ),
    dataflow: (
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#F87171] flex items-center justify-center">
        <div className="relative">
          <div className="flex gap-1">
            <div className="w-2 h-8 bg-white rounded" />
            <div className="w-2 h-6 bg-white rounded mt-2" />
            <div className="w-2 h-10 bg-white rounded -mt-1" />
          </div>
        </div>
      </div>
    )
  };
  
  return logos[type] || null;
}