// ServicesPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { FaCheck, FaStar, FaChevronDown } from "react-icons/fa";

/* ---------- Helpers ---------- */
const Accent = ({ children }) => (
  <span className="text-orange-600">{children}</span>
);

const CTA = ({ children, className = "", ...rest }) => (
  <button
    {...rest}
    className={
      "inline-flex items-center gap-3 px-5 py-2 rounded-2xl font-semibold shadow-md text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition " +
      className
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
        Explore Our <Accent>Premium Services</Accent>
      </h1>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
        From astrology to vastu, numerology, and personalized wellness — find
        the right guidance and tools crafted for your journey.
      </p>
      <div className="mt-6">
        <CTA>Book a Consultation</CTA>
      </div>
    </div>
  </section>
);

/* ---------- SERVICE CATEGORIES ---------- */
const Categories = () => {
  const cats = [
    {
      name: "Astrology Readings",
      desc: "Get clarity on career, relationships, and life path.",
      img: "https://images.unsplash.com/photo-1622649517030-0e0597f5b6a1",
    },
    {
      name: "Numerology Insights",
      desc: "Decode your life numbers and cycles with expert reports.",
      img: "https://images.unsplash.com/photo-1605170439002-22c3da6a142a",
    },
    {
      name: "Vastu Consultations",
      desc: "Balance your space with ancient architectural wisdom.",
      img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
    },
    {
      name: "Wellness & Yoga",
      desc: "Mind-body harmony through guided practices.",
      img: "https://images.unsplash.com/photo-1554344056-591b3d3f197d",
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Service Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-gray-600 text-sm">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- SERVICE LISTINGS ---------- */
const ServicesList = () => {
  const services = [
    {
      title: "Natal Chart Reading",
      duration: "60 min",
      price: "₹2,499",
      rating: 4.9,
      desc: "Personalized birth chart interpretation with future insights.",
    },
    {
      title: "Numerology Report",
      duration: "45 min",
      price: "₹1,299",
      rating: 4.7,
      desc: "Decode your life path numbers and learn about opportunities.",
    },
    {
      title: "Vastu Consultation",
      duration: "90 min",
      price: "₹3,999",
      rating: 4.8,
      desc: "Enhance energy flow at home or office with practical remedies.",
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Popular Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-2xl transition"
            >
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{s.desc}</p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <HiOutlineClock className="text-orange-500" /> {s.duration}
                </span>
                <span className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={`w-3 h-3 ${
                        idx < Math.round(s.rating) ? "" : "opacity-30"
                      }`}
                    />
                  ))}
                  {s.rating}
                </span>
              </div>
              <div className="mt-4 font-bold text-orange-600">{s.price}</div>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 px-4 py-2 rounded-xl border border-orange-100 text-orange-600 font-semibold hover:bg-orange-50">
                  Details
                </button>
                <CTA>Book</CTA>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- PRICING PACKAGES ---------- */
const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "₹999",
      features: ["15-min consultation", "1 follow-up email", "Basic notes"],
    },
    {
      name: "Premium",
      price: "₹2,999",
      features: [
        "60-min consultation",
        "Detailed chart report",
        "Priority booking",
        "Free gemstone guide",
      ],
    },
    {
      name: "Elite",
      price: "₹5,999",
      features: [
        "90-min session",
        "Full written report",
        "3 follow-up emails",
        "Exclusive remedies kit",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">Flexible Packages</h2>
        <p className="text-gray-600 mt-2">
          Choose a plan that suits your journey best.
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
              <CTA className="mt-6">Choose Plan</CTA>
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
      q: "How do I book a consultation?",
      a: "Simply select your desired service, pick a slot, and checkout securely online.",
    },
    {
      q: "Are remedies included?",
      a: "Basic remedies are shared during sessions. Premium kits are available in our shop.",
    },
    {
      q: "Can I reschedule?",
      a: "Yes, up to 24 hours before your session without extra charge.",
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
const ServicesPage = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <ServicesList />
      <Pricing />
      <FAQ />
    </main>
  );
};

export default ServicesPage;
