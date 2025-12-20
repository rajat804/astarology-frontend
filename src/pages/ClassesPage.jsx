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
        Unlock the Secrets of <Accent>Numerology, Vastu, and Yoga</Accent>
      </h1>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
        Enroll in live online courses led by certified experts. Gain diplomas, master certifications, practical training, and transformative experiences.
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

/* ---------- COURSES ---------- */
const NumerologyCourse = ({ handleEnroll }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl shadow-lg p-6"
  >
    <h3 className="text-xl font-bold mb-4">Numerology Course</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <p><strong>Course:</strong> Numerology</p>
        <p><strong>Certification:</strong> Diploma/Master</p>
        <p><strong>Duration:</strong> 3 Months</p>
        <p><strong>Classes:</strong> 30+ Sessions</p>
        <p><strong>Offer:</strong></p>
        <p><strong>Mode:</strong> Live - Online</p>
        <p><strong>Training:</strong> Practical</p>
        <p><strong>Study Material:</strong> Soft Copy</p>
        <p><strong>Language:</strong> Hindi/English</p>
        <p><strong>Numerology Fee:</strong></p>
      </div>
    </div>
    <h4 className="text-lg font-semibold mt-6">Numerology Syllabus - Diploma</h4>
    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      <li>Introduction to Numerology
        <ul className="list-circle pl-6 space-y-1">
          <li>Vedic Numerology</li>
          <li>Chaldean Numerology</li>
          <li>Pythagorean Numerology</li>
          <li>Lo Shu</li>
        </ul>
      </li>
      <li>Introduction of nine numbers</li>
      <li>Characteristics of Numbers</li>
      <li>Personal Number Calculation
        <ul className="list-circle pl-6 space-y-1">
          <li>Psychic / Driver Number</li>
          <li>Life path Number</li>
          <li>Destiny / Expression Number</li>
        </ul>
      </li>
      <li>Lo Shu Grid</li>
      <li>Placement of numbers in Grid</li>
      <li>Combinations in Grid</li>
    </ul>
    <h4 className="text-lg font-semibold mt-6">Numerology Syllabus - Master</h4>
    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      <li>Introduction to Numerology
        <ul className="list-circle pl-6 space-y-1">
          <li>Vedic Numerology</li>
          <li>Chaldean Numerology</li>
          <li>Pythagorean Numerology</li>
          <li>Lo Shu</li>
        </ul>
      </li>
      <li>Introduction of nine numbers</li>
      <li>Characteristics of Numbers</li>
      <li>Number connections</li>
      <li>Personal Number Calculation
        <ul className="list-circle pl-6 space-y-1">
          <li>Psychic / Driver Number</li>
          <li>Life path Number</li>
          <li>Destiny / Expression Number</li>
        </ul>
      </li>
      <li>Lo Shu Grid</li>
      <li>Placement of numbers in Grid</li>
      <li>Combinations in Grid</li>
      <li>Name numerology</li>
      <li>Time Cycle
        <ul className="list-circle pl-6 space-y-1">
          <li>Personal Year</li>
          <li>Personal Month</li>
          <li>Personal Day</li>
        </ul>
      </li>
      <li>Elements and Planets</li>
      <li>Karmic numbers</li>
      <li>Master Numbers</li>
      <li>Calculation of Dasha
        <ul className="list-circle pl-6 space-y-1">
          <li>Maha Dasha</li>
          <li>Antar Dasha</li>
        </ul>
      </li>
      <li>Zodiac Sign and Numerology</li>
      <li>Remedies</li>
    </ul>
    <div className="mt-6">
      <CTA onClick={handleEnroll}>Enroll Now</CTA>
    </div>
  </motion.div>
);

const VastuCourse = ({ handleEnroll }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl shadow-lg p-6"
  >
    <h3 className="text-xl font-bold mb-4">Vastu Course</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <p><strong>Course:</strong> Vastu</p>
        <p><strong>Certification:</strong> Diploma</p>
        <p><strong>Duration:</strong> 3 Months</p>
        <p><strong>Classes:</strong> 30+ Sessions</p>
        <p><strong>Offer:</strong></p>
        <p><strong>Mode:</strong> Live - Online</p>
        <p><strong>Training:</strong> Practical</p>
        <p><strong>Study Material:</strong> Soft Copy</p>
        <p><strong>Language:</strong> Hindi/English</p>
        <p><strong>Vastu Fee:</strong></p>
      </div>
    </div>
    <h4 className="text-lg font-semibold mt-6">Vastu Diploma Course</h4>
    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      <li>Introduction to Learn Vastu Shastra and origin of Vastu.</li>
      <li>Importance Vastu Shastra Course.</li>
      <li>The Origin Vastu Purush.</li>
      <li>Instruments used in Vastu Shastra.</li>
      <li>Types of Vastu
        <ul className="list-circle pl-6 space-y-1">
          <li>Residential Vastu</li>
          <li>Commercial Vastu</li>
          <li>Religious Vastu.</li>
        </ul>
      </li>
      <li>Understand Natural Powers and Energies in Vastu Course:</li>
      <li>Solar Energy, Magnetic Force and Gravitational Force.</li>
      <li>Introduction to Five Elements (Panch Mahabhoot) and their Use in Vastu Planning.</li>
      <li>Earth, Air, Fire, Water and Sky and Relationship between Five Elements.</li>
      <li>Directions in Vastu</li>
      <li>Selection of Site
        <ul className="list-circle pl-6 space-y-1">
          <li>Surroundings</li>
          <li>Environment:</li>
        </ul>
      </li>
      <li>Testing of Land and Slope of Land.</li>
      <li>Type and Best Shape of Plots as per Vastu.</li>
      <li>Facing of Plots and Adjoining Roads.</li>
      <li>Extension of Land and Cut of Land.</li>
      <li>Brief Study of Directions of Rooms according to Residential Vastu.</li>
      <li>Many other Vastu related topics…</li>
    </ul>
    <h4 className="text-lg font-semibold mt-6">Vastu Master Course</h4>
    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      <li>All the topics covered in Level I Vastu Course in Depth.</li>
      <li>Detailed study of Directions of Rooms according to Residential Vastu.</li>
      <li>Puja Room as per Vastu, Study Room as per Vastu and Safe Room as per Vastu.</li>
      <li>Master Bedroom as per Vastu, Young Couples Bedroom as per Vastu Shastra.</li>
      <li>Children Bedroom as per Vastu, Guest Bedroom as per Vastu and Dining Room.</li>
      <li>Kitchen as per Vastu and Pantry Location as per Vastu.</li>
      <li>Toilet and Bathroom Zone as per Vastu.</li>
      <li>Location and Directions for Different Other Spaces:</li>
      <li>Main Gate, Staircase, Basement, Septic Tank, Boring.</li>
      <li>Alternative Directions of Different Rooms and Spaces.</li>
      <li>Direction of Foundation and Height of Building.</li>
      <li>Commercial Vastu and Principles.</li>
      <li>Vastu Remedies without Demolition for Residential Buildings.</li>
      <li>Five Types of Vastu Remedies.</li>
      <li>Vedic Remedies – Mantra and Yantra Remedies.</li>
      <li>Gems Remedies and Pyramid Remedies.</li>
      <li>General Remedies and brief Feng Shui Remedies.</li>
      <li>Maps and Drawing Discussions for checking Vastu compliance.</li>
      <li>Practical Vastu Analysis of Drawings.</li>
      <li>Many other Vastu course related topics…,</li>
    </ul>
    <div className="mt-6">
      <CTA onClick={handleEnroll}>Enroll Now</CTA>
    </div>
  </motion.div>
);

const YogaClasses = ({ handleEnroll }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl shadow-lg p-6"
  >
    <h3 className="text-xl font-bold mb-4">Yoga Class Offerings - Transformative Sessions for Mind, Body & Spirit</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-orange-50 p-6 rounded-xl shadow">
        <h4 className="font-semibold mb-2">Morning Healing Journey — 6:00 AM IST (60 minutes)- Monday, Wednesday, Friday</h4>
        <p className="text-sm text-gray-600">[Fees-Rs 2000/- for 12 classes, Early Bird offer 2 extra class for “Dhyana” & “Niyama”]</p>
        <p className="mt-2"><strong>Focus:</strong> Gentle Healing - Foundation Building - Mind-Body Connection</p>
        <p className="mt-2">Start your day with intention and grace. This nurturing class welcomes you exactly where you are in your wellness journey, whether you're new to yoga or seeking gentle healing support for conditions like PCOS, PCOD, thyroid imbalances, or weight management concerns.</p>
        <h5 className="font-medium mt-4">What You'll Experience:</h5>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Mindful Movement: Gentle flows that honor your body's wisdom and natural rhythm</li>
          <li>Pranayama Practice: Transformative breathwork to energize your spirit and quiet mental chatter</li>
          <li>Foundation Building: Essential postures that cultivate strength, flexibility, and unshakeable confidence</li>
          <li>Yogic Philosophy: An introduction to the eight limbs of yoga (Ashtanga) for complete well-being</li>
        </ul>
        <p className="mt-4">Each session is a loving invitation to reconnect with yourself. You'll leave feeling lighter in both body and heart, centred in your truth, and ready to embrace your day with renewed vitality.</p>
      </div>
      <div className="bg-orange-50 p-6 rounded-xl shadow">
        <h4 className="font-semibold mb-2">Therapeutic Restoration — 11:00 AM IST (45 minutes)- Tuesday, Thursday, Friday</h4>
        <p className="text-sm text-gray-600">[Fees-Rs 2000/- for 12 classes, Early Bird offer 2 extra class for “Dhyana” & “Niyama”]</p>
        <p className="mt-2"><strong>Focus:</strong> Deep Relaxation - Nervous System Harmony - Emotional Wellness</p>
        <p className="mt-2">This is your sanctuary for healing. Designed as a gentle refuge for anyone carrying the weight of stress, anxiety, exhaustion, or physical tension, these therapeutic sessions offer profound restoration through the ancient wisdom of yoga.</p>
        <h5 className="font-medium mt-4">What You'll Experience:</h5>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>Stress Transformation: Proven techniques to shift from overwhelm to inner peace</li>
          <li>Sleep Enhancement: Integrative practices combining breath, alignment, and deep relaxation</li>
          <li>Nervous System Reset: Restorative and yin yoga to activate your body's natural healing response</li>
          <li>Emotional Balance: Mindfulness practices that create space between you and life's challenges</li>
        </ul>
        <p className="mt-4">This is more than a yoga class—it's a healing journey. Here, you'll release what no longer serves you, rediscover your natural calm, and remember that peace is always available within you, just one conscious breath away.</p>
      </div>
    </div>
    <p className="mt-6 text-gray-700">Each class is thoughtfully crafted to meet you where you are and guide you toward where you want to be. Come as you are, leave as you're meant to be.</p>
    <div className="mt-6">
      <CTA onClick={handleEnroll}>Enroll Now</CTA>
    </div>
  </motion.div>
);

const Courses = ({ handleEnroll }) => (
  <section className="py-14 bg-gradient-to-b from-orange-50 to-white">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-2xl font-bold mb-8">Our Courses</h2>
      <div className="space-y-12">
        <NumerologyCourse handleEnroll={handleEnroll} />
        <VastuCourse handleEnroll={handleEnroll} />
        <YogaClasses handleEnroll={handleEnroll} />
      </div>
    </div>
  </section>
);

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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = () => {
    if (isAuthenticated) {
      navigate("/demo-video");
    } else {
      navigate("/auth");
    }
  };

  return (
    <main>
      <Hero />
      <Categories />
      <Courses handleEnroll={handleEnroll} />
      <Packages />
      <FAQ />
    </main>
  );
};

export default ClassesPage;