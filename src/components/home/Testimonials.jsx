// components/home/Testimonials.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-3 text-green-600">Trusted voices</h3>
        <p className="text-gray-600 mb-8">
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
                className="bg-orange-50/50 rounded-2xl p-8 shadow-lg border border-orange-100"
              >
                <p className="italic text-gray-700">“{reviews[idx].text}”</p>
                <div className="mt-4 font-semibold text-red-600">
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
              className="p-2 rounded-full bg-white shadow"
              aria-label="previous"
            >
              <FaChevronLeft />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full ${
                    i === idx ? "bg-red-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((i) => (i + 1) % reviews.length)}
              className="p-2 rounded-full bg-white shadow"
              aria-label="next"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;