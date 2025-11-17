import React, { useEffect } from "react";
import Header from "../components/navigation/Header";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import BeyondResumes from "../components/landing/BeyondResumes";
import DashboardShowcase from "../components/landing/DashboardShowcase";
import Testimonials from "../components/landing/Testimonials";
import StudentFinalCTA from "../components/landing/StudentFinalCTA";
import Footer from "../components/landing/Footer";

export default function Home() {
  useEffect(() => {
    const handleScroll = (e) => {
      if (e.target.tagName === 'A' && e.target.hash) {
        e.preventDefault();
        const element = document.querySelector(e.target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleScroll);
    return () => document.removeEventListener('click', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header currentPage="Home" />
      <Hero />
      <HowItWorks />
      <BeyondResumes />
      <DashboardShowcase />
      <StudentFinalCTA />
      <Footer />
    </div>
  );
}