// src/pages/ClassesPage.jsx (renamed from coursesPage.jsx for consistency)
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineClock,
  HiOutlineUser,
} from "react-icons/hi";
import { FaCheck, FaChevronDown, FaStar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

/* ---------- Helpers ---------- */
const Accent = ({ children }) => (
  <span className="text-orange-600">{children}</span>
);

const CTA = ({ children, className = "", onClick, disabled, ...rest }) => (
  <button
    {...rest}
    onClick={onClick}
    disabled={disabled}
    className={
      "inline-flex items-center gap-3 px-5 py-2 rounded-2xl font-semibold shadow-md text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition " +
      className + (disabled ? " opacity-50 cursor-not-allowed" : "")
    }
  >
    {children}
  </button>
);

/* ---------- HERO ---------- */
const Hero = () => (
  <section className="relative bg-gradient-to-b from-orange-50 to-white py-20">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
        Learn with <Accent>Experts</Accent>
      </h1>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
        Enroll in live and recorded courses led by certified astrologers,
        numerologists, and yoga instructors. Build knowledge step by step.
      </p>
      <div className="mt-6">
        <CTA>Explore courses</CTA>
      </div>
    </div>
  </section>
);

/* ---------- CATEGORIES ---------- */
const Categories = () => {
  const cats = [
    {
      name: "Astrology Basics",
      img: "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66",
    },
    {
      name: "Numerology",
      img: "https://images.unsplash.com/photo-1590080876135-2a34e3a3d6a9",
    },
    {
      name: "Vastu Principles",
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
    {
      name: "Yoga & Meditation",
      img: "https://images.unsplash.com/photo-1554344056-591b3d3f197d",
    },
    {
      name: "Tarot Reading",
      img: "https://images.unsplash.com/photo-1622649517030-0e0597f5b6a1",
    },
    {
      name: "Mindfulness",
      img: "https://images.unsplash.com/photo-1558980664-10ea2320e07a",
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Courses Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-orange-50 rounded-2xl shadow hover:shadow-xl overflow-hidden hover:-translate-y-1 transition"
            >
              <img
                src={c.img}
                alt={c.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {c.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore {c.name} with interactive lessons and expert guidance.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- FEATURED COURSES ---------- */
const FeaturedCourses = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const courses = [
    {
      title: "Astrology 101",
      duration: "6 Weeks",
      instructor: "Dr. Meera Sharma",
      price: "₹4,999",
      rating: 4.8,
    },
    {
      title: "Advanced Numerology",
      duration: "4 Weeks",
      instructor: "Rajesh Kumar",
      price: "₹3,499",
      rating: 4.7,
    },
    {
      title: "Vastu for Homes",
      duration: "8 Weeks",
      instructor: "Ananya Gupta",
      price: "₹6,999",
      rating: 4.9,
    },
  ];

  const handleEnroll = () => {
    if (isAuthenticated) {
      navigate("/demo-video");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="py-14 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Featured Courses</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-2xl transition"
            >
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-gray-600 text-sm mt-2">
                Learn {c.title} in-depth with practical guidance.
              </p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <HiOutlineClock className="text-orange-500" /> {c.duration}
                </span>
                <span className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={`w-3 h-3 ${
                        idx < Math.round(c.rating) ? "" : "opacity-30"
                      }`}
                    />
                  ))}
                  {c.rating}
                </span>
              </div>
              <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                <HiOutlineUser className="text-orange-500" /> {c.instructor}
              </div>
              <div className="mt-4 font-bold text-orange-600">{c.price}</div>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 px-4 py-2 rounded-xl border border-orange-100 text-orange-600 font-semibold hover:bg-orange-50">
                  Details
                </button>
                <CTA onClick={handleEnroll}>Enroll</CTA>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- CLASS PACKAGES ---------- */
const Packages = () => {
  const plans = [
    {
      name: "Beginner",
      price: "₹1,999",
      features: ["2 Weeks Access", "Recorded Sessions", "Certificate"],
    },
    {
      name: "Advanced",
      price: "₹3,999",
      features: [
        "6 Weeks Access",
        "Live + Recorded Sessions",
        "Assignments",
        "Certificate",
      ],
    },
    {
      name: "Mastery",
      price: "₹7,999",
      features: [
        "12 Weeks Access",
        "1-on-1 Mentorship",
        "All Class Materials",
        "Lifetime Access",
        "Certificate",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">Course Packages</h2>
        <p className="text-gray-600 mt-2">
          Choose a package that fits your learning style.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-orange-50 rounded-2xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition"
            >
              <h3 className="font-bold text-lg">{p.name}</h3>
              <div className="text-3xl font-extrabold text-orange-600 mt-2">
                {p.price}
              </div>
              <ul className="mt-4 text-sm space-y-2 text-gray-600 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <FaCheck className="text-orange-500" /> {f}
                  </li>
                ))}
              </ul>
              <CTA className="mt-6">Choose Package</CTA>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- FAQ ---------- */
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: "How are the courses conducted?",
      a: "Courses are conducted live on Zoom/Google Meet with recordings available for later access.",
    },
    {
      q: "Will I get a certificate?",
      a: "Yes, certificates are provided for all paid courses upon successful completion.",
    },
    {
      q: "Can I interact with the instructor?",
      a: "Yes, our live courses include Q&A sessions and assignments for feedback.",
    },
  ];

  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 cursor-pointer"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex justify-between w-full items-center font-semibold"
              >
                {f.q}
                <FaChevronDown
                  className={`transition ${
                    open === i ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-sm text-gray-600"
                  >
                    {f.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- MAIN PAGE ---------- */
const ClassesPage = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedCourses />
      <Packages />
      <FAQ />
    </main>
  );
};

export default ClassesPage;