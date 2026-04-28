// components/home/Testimonials.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      name: "Anjali K.",
      text: "Transformed my perspective — accurate and empathetic reading.",
    },
    {
      name: "Rohit S.",
      text: "Amazing courses and practical exercises. Highly recommended.",
    },
    {
      name: "Priya M.",
      text: "The gemstone I ordered felt so authentic. Great packaging!",
    },
  ];
  const [idx, setIdx] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % reviews.length);
    }, 5500);
    return () => clearTimeout(timeoutRef.current);
  }, [idx]);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-amber-500/30">
          <FaQuoteLeft className="text-amber-400 w-3 h-3" />
          <span className="text-xs md:text-sm font-semibold text-amber-400">Client Stories</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
          Trusted voices
        </h3>
        <p className="text-gray-400 mb-8">
          Stories from clients who felt guided and supported.
        </p>

        <div className="relative">
          <div className="h-48">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-amber-500/30"
              >
                {/* Quote icon decoration */}
                <div className="absolute top-4 left-4 opacity-10">
                  <FaQuoteLeft className="w-8 h-8 text-amber-400" />
                </div>
                <p className="italic text-gray-300 relative z-10">"{reviews[idx].text}"</p>
                <div className="mt-4 font-semibold text-amber-400">
                  — {reviews[idx].name}
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() =>
                setIdx((i) => (i - 1 + reviews.length) % reviews.length)
              }
              className="p-2 rounded-full bg-gray-800 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all duration-300 shadow-lg"
              aria-label="previous"
            >
              <FaChevronLeft className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === idx ? "bg-amber-400 w-4" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((i) => (i + 1) % reviews.length)}
              className="p-2 rounded-full bg-gray-800 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all duration-300 shadow-lg"
              aria-label="next"
            >
              <FaChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;