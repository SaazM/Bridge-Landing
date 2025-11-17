import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function OnboardingParse() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const handleContinue = () => {
    navigate("/dashboard");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  // Simulate progress
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1121] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[720px]">
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-white mb-4">
              Analyzing your background…
            </h1>
            <p className="text-lg text-gray-300 font-normal">
              We're building your skill map to find your best-fit internships.
            </p>
          </div>

          {/* Simple Progress Display */}
          <div className="mb-8">
            <div className="text-white text-center mb-4">
              Progress: {progress}%
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#EC4899] to-[#38BDF8] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Test Content */}
          <div className="text-center text-white mb-8">
            <p className="text-sm text-gray-400">
              This is a simplified test version of the parsing page.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-sm text-gray-400 hover:text-white transition-colors font-normal"
            >
              Skip
            </button>

            {progress >= 100 && (
              <Button
                onClick={handleContinue}
                className="h-14 px-10 text-lg font-medium rounded-2xl text-[#1E3A8A] shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: '#FFFF00' }}
              >
                Continue to Dashboard
              </Button>
            )}
          </div>
        </div>

        {/* Background accents */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#EC4899]/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl -z-10" />
      </div>
    </div>
  );
}