import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../components/navigation/Header";
import Footer from "../components/landing/Footer";

export default function Contact() {
  return (
    <>
      <Header currentPage="Contact" />
      
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
        {/* Spacer for fixed header */}
        <div className="h-20" />
        
        {/* Main content */}
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-20 relative">
          {/* Background effects */}
          <div className="absolute top-20 right-10 md:right-20 w-72 md:w-96 h-72 md:h-96 bg-[#FFFF00]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 md:left-20 w-72 md:w-96 h-72 md:h-96 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto text-center w-full z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-16"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight text-[#0B1121]">
                Get in Touch
              </h1>
              
              <p className="text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto font-normal leading-relaxed">
                Have questions about Bridge? We'd love to hear from you. Reach out and we'll get back to you as soon as possible.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <motion.a
                href="mailto:hello@usebridge.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#1E3A8A] hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#1E3A8A] group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-8 h-8 text-[#1E3A8A] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1121] mb-2">Email Us</h3>
                <p className="text-[#6B7280] font-normal text-sm">saaz.m@icloud.com</p>
              </motion.a>

              <motion.a
                href="tel:+15551234567"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#1E3A8A] hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#1E3A8A] group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-8 h-8 text-[#1E3A8A] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1121] mb-2">Call Us</h3>
                <p className="text-[#6B7280] font-normal text-sm">+1 (862) 337-0989</p>
              </motion.a>

              <motion.a
                href="https://calendly.com/smahadkar-ucsd/30min"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#1E3A8A] hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl bg-[#1E3A8A]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#1E3A8A] group-hover:scale-110 transition-all duration-300">
                  <MessageCircle className="w-8 h-8 text-[#1E3A8A] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1121] mb-2">Schedule a Call</h3>
                <p className="text-[#6B7280] font-normal text-sm">Book a meeting</p>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}