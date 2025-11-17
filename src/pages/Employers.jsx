import React, { useEffect } from "react";
import Header from "../components/navigation/Header";
import EmployerHero from "../components/employers/Hero";
import TraditionalVsBridge from "../components/employers/TraditionalVsBridge";
import BeyondResumesEmployer from "../components/employers/BeyondResumes";
import WhyFoundersLove from "../components/employers/WhyFoundersLove";
import DashboardShowcase from "../components/employers/DashboardShowcase";
import EmployerTestimonials from "../components/employers/Testimonials";
import FinalCTA from "../components/employers/FinalCTA";
import Footer from "../components/landing/Footer";

export default function Employers() {
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
      <Header currentPage="Employers" />
      <EmployerHero />
      <TraditionalVsBridge />
      <BeyondResumesEmployer />
      <DashboardShowcase />
      <FinalCTA />
      <Footer />
    </div>
  );
}