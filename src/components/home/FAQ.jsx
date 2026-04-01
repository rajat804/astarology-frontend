// components/home/FAQ.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <section className="py-16 bg-orange-50/50">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-2xl font-bold mb-4 text-green-600">Frequently asked</h3>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow p-4 border border-orange-100"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex justify-between items-center gap-4"
              >
                <div>
                  <div className="font-semibold">{f.q}</div>
                  <div className="text-sm text-gray-500">
                    {open === i ? "Close" : "Read answer"}
                  </div>
                </div>
                <div
                  className={`transform transition ${
                    open === i ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="#374151"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-gray-600 text-sm"
                  >
                    {f.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;