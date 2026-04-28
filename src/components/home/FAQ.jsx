// components/home/FAQ.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  const faqs = [
    {
      q: "How do I prepare for a consultation?",
      a: "Prepare a list of questions and have your birth details (date/time/place) handy for astrology sessions.",
    },
    {
      q: "Are the products certified?",
      a: "Yes — all gemstones and ritual items are authenticated and accompanied by quality notes.",
    },
    {
      q: "What payment options do you accept?",
      a: "Stripe, Razorpay, and major cards. Secure checkout with PCI compliance.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-amber-500/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs md:text-sm font-semibold text-amber-400">Got Questions?</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-400 mt-2">
            Everything you need to know about our services and products
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-2xl shadow-lg border border-amber-500/30 overflow-hidden hover:border-amber-500/50 transition-colors duration-300"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex justify-between items-center gap-4 p-4 hover:bg-amber-500/5 transition-colors duration-300"
              >
                <div className="flex-1">
                  <div className="font-semibold text-white">{f.q}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {open === i ? "Click to close" : "Click to read answer"}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-amber-400"
                >
                  <FaChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-amber-500/20"
                  >
                    <div className="p-4 text-gray-400 text-sm leading-relaxed">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-amber-500/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 6.68629 5.68629 4 9 4C10.933 4 12.5 5.5 12 7C11.5 5.5 13.067 4 15 4C18.3137 4 21 6.68629 21 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs md:text-sm text-gray-300">
              Still have questions? <a href="/contact" className="text-amber-400 hover:text-amber-300 font-semibold ml-1">Contact our support team →</a>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;