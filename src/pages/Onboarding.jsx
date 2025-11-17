
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, CheckCircle2, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/navigation/Header";

export default function Onboarding() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setResumeFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setResumeFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const isLinkedinValid = linkedinUrl.includes("linkedin.com/in/");
  const canContinue = resumeFile !== null || isLinkedinValid;

  const handleContinue = () => {
    const payload = {
      resume: resumeFile ? { name: resumeFile.name, size: resumeFile.size } : null,
      linkedin: isLinkedinValid ? linkedinUrl : null,
    };
    console.log("Onboarding payload:", payload);
    navigate("/onboarding/parse");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="Onboarding" />
      
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-[720px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-semibold text-[#0B1121] mb-4">
              Let's get you matched.
            </h1>
            <p className="text-xl text-[#6B7280] font-normal">
              Upload your resume or connect LinkedIn. We'll auto-capture your experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Upload Resume Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-full"
            >
              <label
                htmlFor="resume-upload"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                  flex flex-col items-center justify-center h-full min-h-[280px]
                  bg-gray-50 border-2 border-dashed rounded-3xl p-8 
                  cursor-pointer transition-all duration-200
                  hover:border-gray-400 hover:bg-gray-100
                  ${isDragging ? "border-[#1E3A8A] bg-gray-100" : "border-gray-300"}
                  ${resumeFile ? "border-green-500 bg-green-50" : ""}
                `}
              >
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center text-center">
                  {resumeFile ? (
                    <>
                      <CheckCircle2 className="w-12 h-12 text-green-600 mb-4" />
                      <p className="text-[#0B1121] font-semibold mb-2">Resume uploaded</p>
                      <p className="text-sm text-[#6B7280] font-normal truncate max-w-full">
                        {resumeFile.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-[#0B1121] font-semibold mb-2">Upload resume</p>
                      <p className="text-sm text-[#6B7280] font-normal">
                        Drag & drop or click to browse
                      </p>
                      <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX</p>
                    </>
                  )}
                </div>
              </label>
            </motion.div>

            {/* Connect LinkedIn Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`
                flex flex-col h-full min-h-[280px]
                bg-gray-50 border-2 rounded-3xl p-8 transition-all duration-200
                ${isLinkedinValid ? "border-green-500 bg-green-50" : "border-gray-300"}
              `}
            >
              <div className="flex flex-col items-center text-center mb-6">
                {isLinkedinValid ? (
                  <CheckCircle2 className="w-12 h-12 text-green-600 mb-4" />
                ) : (
                  <Linkedin className="w-12 h-12 text-[#0077B5] mb-4" />
                )}
                <p className="text-[#0B1121] font-semibold mb-2">Connect LinkedIn</p>
                <p className="text-sm text-[#6B7280] font-normal">
                  Paste your profile URL
                </p>
              </div>

              <Input
                type="url"
                placeholder="linkedin.com/in/yourprofile"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="h-12 text-base rounded-xl border-gray-300 focus:border-[#1E3A8A]"
              />
            </motion.div>
          </div>

          {/* Privacy Line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-gray-500 text-center mb-8 font-normal"
          >
            We never share without your permission.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <button
              onClick={handleSkip}
              className="text-[#6B7280] hover:text-[#0B1121] transition-colors font-normal"
            >
              Skip for now
            </button>

            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className="h-14 px-10 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: canContinue ? '#FFFF00' : '#E5E5E5',
                color: canContinue ? '#1E3A8A' : '#9CA3AF'
              }}
            >
              Continue
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
