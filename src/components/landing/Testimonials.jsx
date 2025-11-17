import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alex Chen",
    role: "CS Major, UCSD '25",
    image: "AC",
    text: "I got matched with a YC startup in under a week. No applications, no stress — just one interview and I got the offer.",
    rating: 5
  },
  {
    name: "Maya Patel",
    role: "Data Science, UCSD '24",
    image: "MP",
    text: "Finally a job app that doesn't waste time. The AI actually understood what I was looking for and matched me with companies I love.",
    rating: 5
  },
  {
    name: "Jordan Lee",
    role: "Product Design, UCSD '26",
    image: "JL",
    text: "I was skeptical at first, but the matches were spot on. Had 3 interviews in my first week and landed my dream internship.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <div className="relative py-16 md:py-20 px-6 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-semibold mb-6 tracking-tight">
            <span className="text-[#0B1121]">Loved by</span>{" "}
            <span className="text-[#1E3A8A]">students</span>
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed font-normal">
            Join hundreds of students who've already found their perfect startup match
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <p className="text-[#0B1121] mb-6 leading-relaxed text-lg font-normal">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium bg-[#1E3A8A]">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-semibold text-[#0B1121]">{testimonial.name}</p>
                  <p className="text-sm text-[#6B7280] font-normal">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}