import React from "react";
import { Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600 py-16 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6917685328c008689a17e188/53409a687_Untitled_Artwork.png"
                alt="Bridge Logo"
                className="w-10 h-10" />

              <span className="text-2xl font-semibold text-[#1E3A8A]">Bridge</span>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-md mb-6 font-normal">
              AI-powered internship matching for college students. Skip the applications, focus on what matters.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#1E3A8A] font-semibold mb-4">Product</h4>
            <ul className="space-y-3 font-normal">
              <li><a href="/home" className="hover:text-[#1E3A8A] transition-colors">For Students</a></li>
              <li><a href="/employers" className="hover:text-[#1E3A8A] transition-colors">For Employers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#1E3A8A] font-semibold mb-4">Company</h4>
            <ul className="space-y-3 font-normal">
              <li><a href="/contact" className="hover:text-[#1E3A8A] transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-normal">
            © 2025 Bridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>);

}