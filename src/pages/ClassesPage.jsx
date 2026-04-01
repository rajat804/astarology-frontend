// src/pages/CoursesPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineBookOpen,
  HiOutlineGlobe,
  HiOutlineChip,
  HiOutlineCalendar,
  HiOutlineAcademicCap,
  HiOutlineChat,
} from "react-icons/hi";
import { FaCheck, FaChevronDown, FaStar, FaGraduationCap, FaAward, FaLanguage, FaLaptopCode } from "react-icons/fa";
import { GiCrystalBall, GiYinYang, GiHouse } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

/* ---------- Helpers ---------- */
const Accent = ({ children }) => (
  <span className="text-green-600">{children}</span>
);

const CTA = ({ children, className = "", onClick, disabled, ...rest }) => (
  <button
    {...rest}
    onClick={onClick}
    disabled={disabled}
    className={
      "inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold shadow-md text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 " +
      className + (disabled ? " opacity-50 cursor-not-allowed" : "")
    }
  >
    {children}
  </button>
);

/* ---------- HERO ---------- */
const Hero = () => (
  <section className="relative bg-gradient-to-br from-red-50 via-orange-50/30 to-offWhite py-20 overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
    
    <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <FaGraduationCap /> Transform Your Life
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Master Ancient Wisdom with <Accent>Expert-Led Courses</Accent>
        </h1>
        <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
          Dive deep into Numerology, Vastu Shastra, and Yoga with our comprehensive certification programs. 
          Learn from masters, get certified, and transform your life and career.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <CTA>Explore All Courses</CTA>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ---------- FEATURED COURSE CARDS (Product Style) ---------- */
const CourseCard = ({ course, onViewDetails }) => {
  const getIcon = () => {
    switch(course.type) {
      case 'numerology':
        return <GiCrystalBall className="w-8 h-8 text-red-500" />;
      case 'vastu':
        return <GiHouse className="w-8 h-8 text-red-500" />;
      case 'yoga':
        return <GiYinYang className="w-8 h-8 text-red-500" />;
      default:
        return <FaGraduationCap className="w-8 h-8 text-red-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-orange-100"
      onClick={() => onViewDetails(course)}
    >
      {/* Course Image Banner */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            course.level === 'Master' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
          }`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2">
          {getIcon()}
        </div>
      </div>

      {/* Course Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <FaStar className="text-yellow-500 w-4 h-4" />
          <span className="text-sm font-medium text-gray-600">{course.rating} (120+ reviews)</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Key Features */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <HiOutlineClock className="text-red-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <HiOutlineBookOpen className="text-red-500" />
            <span>{course.sessions}+ Sessions</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaLanguage className="text-red-500" />
            <span>{course.language}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaLaptopCode className="text-red-500" />
            <span>{course.mode}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-orange-100">
          <div>
            <span className="text-xs text-gray-500">Starting from</span>
            <div className="text-2xl font-bold text-red-600">{course.price}</div>
          </div>
          <button 
            className="px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition group-hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(course);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- COURSE DETAILS MODAL ---------- */
const CourseDetailsModal = ({ course, onClose, onEnroll }) => {
  const { isAuthenticated } = useAuth();

  const handleEnroll = () => {
    if (isAuthenticated) {
      onEnroll(course);
    } else {
      navigate("/auth");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Course Header */}
          <div className="relative h-64">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full p-2 text-white hover:bg-white/40 transition"
            >
              ✕
            </button>
            <div className="absolute bottom-6 left-6 text-white">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                course.level === 'Master' ? 'bg-red-500' : 'bg-orange-500'
              }`}>
                {course.level} Certification
              </span>
              <h2 className="text-3xl font-bold mt-3">{course.title}</h2>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <HiOutlineClock className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Duration</div>
                <div className="font-semibold">{course.duration}</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <HiOutlineBookOpen className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Sessions</div>
                <div className="font-semibold">{course.sessions}+ Live Classes</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <FaAward className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Certification</div>
                <div className="font-semibold">{course.level} Diploma</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">About This Course</h3>
              <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {course.syllabus?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Course Includes</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {course.includes?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCheck className="text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <div className="text-sm text-gray-600">Course Fee</div>
                <div className="text-3xl font-bold text-red-600">{course.price}</div>
                <div className="text-xs text-gray-500">Inclusive of all taxes & materials</div>
              </div>
              <button 
                onClick={handleEnroll}
                className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition transform hover:scale-105"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ---------- COURSES DATA ---------- */
const coursesData = [
  {
    id: 1,
    type: 'numerology',
    title: 'Professional Numerology Course',
    level: 'Diploma',
    duration: '3 Months',
    sessions: '30+',
    language: 'Hindi/English',
    mode: 'Live Online',
    price: '₹24,999',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1590080876135-2a34e3a3d6a9?w=800&h=500&fit=crop',
    description: 'Master the ancient science of numbers with our comprehensive diploma program. Learn Vedic, Chaldean, and Pythagorean numerology systems.',
    longDescription: 'This comprehensive Numerology Diploma program takes you on a transformative journey into the mystical world of numbers. You\'ll learn the ancient wisdom of Vedic, Chaldean, and Pythagorean numerology systems, understand how numbers influence your life path, relationships, and career. Our expert instructors will guide you through practical applications, enabling you to provide professional numerology consultations.',
    syllabus: [
      'Introduction to Numerology - Vedic, Chaldean, Pythagorean Systems',
      'Lo Shu Grid - Complete Analysis & Interpretations',
      'Introduction of Nine Numbers & Their Characteristics',
      'Personal Number Calculation - Psychic, Life Path, Destiny Numbers',
      'Name Numerology & Name Correction Techniques',
      'Time Cycles - Personal Year, Month & Day Calculations',
      'Elements, Planets & Their Connection with Numbers',
      'Karmic Numbers & Master Numbers (11, 22, 33)',
      'Dasha Systems - Maha Dasha & Antar Dasha Calculations',
      'Zodiac Sign and Numerology Integration',
      'Practical Remedies & Solutions',
      'Client Consultation Techniques & Ethics'
    ],
    includes: [
      '30+ Live Sessions',
      'Study Material (Soft Copy)',
      'Practical Training',
      'Certificate of Completion',
      'Lifetime Access to Recordings',
      'WhatsApp Support Group'
    ]
  },
  {
    id: 2,
    type: 'numerology',
    title: 'Master Numerology Certification',
    level: 'Master',
    duration: '6 Months',
    sessions: '60+',
    language: 'Hindi/English',
    mode: 'Live Online',
    price: '₹44,999',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop',
    description: 'Advanced mastery program with in-depth knowledge of numerology, remedies, and professional practice techniques.',
    longDescription: 'Take your numerology expertise to the next level with our Master Certification program. This advanced course delves deep into complex numerological concepts, advanced prediction techniques, and professional practice management. You\'ll master the art of combining numerology with other metaphysical sciences and learn to provide comprehensive consultations.',
    syllabus: [
      'All Diploma Level Topics in Depth',
      'Advanced Number Connections & Combinations',
      'Detailed Lo Shu Grid Analysis & Remedies',
      'Advanced Name Numerology & Business Name Selection',
      'Comprehensive Time Cycle Analysis',
      'Advanced Dasha Calculations & Predictions',
      'Remedies - Gems, Yantras, Mantras, Colors',
      'Integrating Numerology with Astrology & Vastu',
      'Predictive Techniques for Career, Finance, Health, Relationships',
      'Professional Consultation Practice',
      'Case Studies & Live Practice Sessions',
      'Marketing & Business Setup for Numerology Practice'
    ],
    includes: [
      '60+ Live Sessions',
      'Advanced Study Material',
      '1-on-1 Mentorship',
      'Practice Case Studies',
      'Master Certification',
      'Lifetime Support',
      'Business Toolkit'
    ]
  },
  {
    id: 3,
    type: 'vastu',
    title: 'Vastu Shastra Diploma',
    level: 'Diploma',
    duration: '3 Months',
    sessions: '30+',
    language: 'Hindi/English',
    mode: 'Live Online',
    price: '₹24,999',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&h=500&fit=crop',
    description: 'Learn the ancient science of architecture and space harmony. Create balanced living and working spaces.',
    longDescription: 'Vastu Shastra, the ancient Indian science of architecture, teaches us how to create harmonious living spaces that support health, wealth, and happiness. This comprehensive diploma program covers residential and commercial vastu principles, practical analysis techniques, and effective remedies.',
    syllabus: [
      'Introduction & Origin of Vastu Shastra',
      'The Vastu Purush - Understanding Energy Flow',
      'Instruments & Tools for Vastu Analysis',
      'Five Elements (Panch Mahabhoot) in Vastu',
      'Directions & Their Significance',
      'Site Selection & Land Analysis',
      'Residential Vastu - Room by Room Guide',
      'Commercial Vastu Principles',
      'Vastu Remedies without Demolition',
      'Mantras, Yantras & Gem Remedies',
      'Practical Vastu Analysis of Drawings',
      'Case Studies & Live Practice'
    ],
    includes: [
      '30+ Live Sessions',
      'Vastu Toolkit (Digital)',
      'Practical Drawing Analysis',
      'Certificate of Completion',
      'Lifetime Access',
      'Community Support'
    ]
  },
  {
    id: 4,
    type: 'vastu',
    title: 'Master Vastu Consultant',
    level: 'Master',
    duration: '6 Months',
    sessions: '60+',
    language: 'Hindi/English',
    mode: 'Live Online',
    price: '₹44,999',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582656999268-7bb53fa3b55b?w=800&h=500&fit=crop',
    description: 'Become a certified Vastu consultant with advanced knowledge of remedies, commercial vastu, and professional practice.',
    longDescription: 'Master the art and science of Vastu Shastra with our advanced certification program. This comprehensive course prepares you to become a professional Vastu consultant capable of handling complex residential and commercial projects with confidence.',
    syllabus: [
      'All Diploma Level Topics in Depth',
      'Advanced Directional Analysis',
      'Detailed Room-by-Room Vastu Planning',
      'Commercial Vastu - Offices, Factories, Showrooms',
      'Vastu for Specific Businesses',
      'Advanced Remedies - Yantras, Pyramids, Feng Shui Integration',
      'Vedic Remedies & Mantra Applications',
      'Practical Site Visits & Case Studies',
      'Client Consultation Protocols',
      'Drawing Analysis & Software Tools',
      'Business Development for Vastu Practice',
      'Live Project Mentorship'
    ],
    includes: [
      '60+ Live Sessions',
      'Advanced Vastu Toolkit',
      '1-on-1 Mentorship',
      'Live Project Experience',
      'Master Certification',
      'Business Launch Support'
    ]
  },
  {
    id: 5,
    type: 'yoga',
    title: 'Yoga Teacher Training',
    level: 'Diploma',
    duration: '3 Months',
    sessions: '45+',
    language: 'Hindi/English',
    mode: 'Live Online',
    price: '₹29,999',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
    description: 'Transformative yoga teacher training program covering asanas, pranayama, philosophy, and teaching methodology.',
    longDescription: 'Embark on a transformative journey to become a certified yoga teacher. This comprehensive program covers traditional Hatha Yoga, Vinyasa flows, pranayama techniques, meditation practices, yoga philosophy, and teaching methodology. Perfect for those seeking to deepen their practice or start a career as a yoga instructor.',
    syllabus: [
      'History & Philosophy of Yoga',
      'Patanjali\'s Yoga Sutras',
      'Asanas - Alignment, Modifications, Benefits',
      'Pranayama Techniques & Benefits',
      'Meditation & Mindfulness Practices',
      'Anatomy & Physiology for Yoga',
      'Sequencing & Class Structure',
      'Teaching Methodology & Communication',
      'Adjustments & Hands-on Assistance',
      'Yoga for Special Conditions',
      'Business of Yoga',
      'Practicum & Teaching Practice'
    ],
    includes: [
      '45+ Live Sessions',
      'Detailed Manual',
      'Teaching Practice Sessions',
      'Yoga Alliance Certified',
      'Lifetime Access',
      'Community Support'
    ]
  }
];

/* ---------- COURSES SECTION ---------- */
const CoursesSection = ({ onViewDetails }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'numerology', name: 'Numerology', icon: '🔮' },
    { id: 'vastu', name: 'Vastu', icon: '🏠' },
    { id: 'yoga', name: 'Yoga', icon: '🧘' },
  ];

  const filteredCourses = activeCategory === 'all' 
    ? coursesData 
    : coursesData.filter(course => course.type === activeCategory);

  return (
    <section className="py-20 bg-offWhite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore Our <span className="text-red-600">Certified Programs</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive certification programs designed to transform your understanding and career
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-red-50 border border-orange-200'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- WHY CHOOSE US ---------- */
const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: "Certified Experts",
      description: "Learn from industry experts with decades of experience"
    },
    {
      icon: <HiOutlineAcademicCap className="w-8 h-8" />,
      title: "Recognized Certification",
      description: "Get certified and start your professional journey"
    },
    {
      icon: <HiOutlineClock className="w-8 h-8" />,
      title: "Flexible Learning",
      description: "Live online classes with lifetime access to recordings"
    },
    {
      icon: <HiOutlineChat className="w-8 h-8" />,
      title: "Support Community",
      description: "Join our community of learners and practitioners"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Courses?</h2>
          <p className="text-gray-600">Join thousands of successful graduates who transformed their lives</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-6 bg-offWhite rounded-2xl hover:shadow-lg transition border border-orange-100"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
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
      a: "All our courses are conducted live via Zoom/Google Meet. Each session is recorded and made available in your dashboard for lifetime access."
    },
    {
      q: "Will I receive a certificate?",
      a: "Yes, upon successful completion of the course and assessment, you will receive a recognized certificate that you can showcase on your resume and LinkedIn."
    },
    {
      q: "What if I miss a live class?",
      a: "Don't worry! All sessions are recorded and uploaded to your dashboard within 24 hours. You can access them anytime, anywhere."
    },
    {
      q: "Is there any practical training?",
      a: "Absolutely! Our courses include practical assignments, case studies, and live practice sessions to ensure you gain hands-on experience."
    },
    {
      q: "Can I get a refund if I'm not satisfied?",
      a: "We offer a 7-day money-back guarantee if you're not satisfied with the course quality. No questions asked!"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50/30 to-offWhite">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Got questions? We've got answers</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex justify-between w-full items-center p-5 font-semibold text-gray-800 hover:bg-red-50 transition"
              >
                <span>{f.q}</span>
                <FaChevronDown
                  className={`transition-transform text-red-500 ${
                    open === i ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-gray-600">{f.a}</p>
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

/* ---------- MAIN PAGE ---------- */
const CoursesPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  const handleEnroll = (course) => {
    if (isAuthenticated) {
      navigate(`/checkout/${course.id}`);
    } else {
      navigate("/auth", { state: { redirectTo: `/checkout/${course.id}` } });
    }
  };

  return (
    <main className="bg-offWhite">
      <Hero />
      <CoursesSection onViewDetails={handleViewDetails} />
      <WhyChooseUs />
      <FAQ />
      
      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal 
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onEnroll={handleEnroll}
        />
      )}
    </main>
  );
};

export default CoursesPage;