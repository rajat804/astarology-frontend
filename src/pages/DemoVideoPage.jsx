// src/pages/DemoVideoPage.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Play, 
  Clock, 
  BookOpen, 
  Users, 
  Award, 
  Download, 
  Headphones, 
  FileText,
  ChevronRight,
  Star,
  CheckCircle,
  Calendar,
  Video,
  MessageCircle
} from "lucide-react";

const DemoVideoPage = () => {
  const { isAuthenticated, remainingTime } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!isAuthenticated) {
    return null;
  }

  const features = [
    { icon: <BookOpen className="w-5 h-5" />, text: "12 Comprehensive Modules" },
    { icon: <Video className="w-5 h-5" />, text: "40+ Video Lessons" },
    { icon: <Users className="w-5 h-5" />, text: "Live Q&A Sessions" },
    { icon: <Award className="w-5 h-5" />, text: "Certificate of Completion" }
  ];

  const syllabus = [
    { title: "Module 1: Introduction to Astrology", duration: "45 mins", topics: ["History of Astrology", "Zodiac Signs Overview", "Elements & Modalities"] },
    { title: "Module 2: Planets & Their Significance", duration: "60 mins", topics: ["Sun, Moon & Rising Signs", "Planetary Rulerships", "Retrogrades Explained"] },
    { title: "Module 3: Houses & Chart Reading", duration: "90 mins", topics: ["12 Houses & Their Meanings", "Aspects & Orbs", "Chart Interpretation Basics"] },
    { title: "Module 4: Advanced Techniques", duration: "120 mins", topics: ["Transits & Progressions", "Synastry & Composite Charts", "Predictive Astrology"] }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-offWhite">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            Free Demo Session
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Astrology Mastery <span className="text-red-600">Program</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience a glimpse of our comprehensive astrology course designed to transform your understanding of cosmic wisdom
          </p>
          
          {/* Timer Card */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-3 mt-6 px-6 py-3 bg-white rounded-2xl shadow-lg border border-orange-100"
          >
            <Clock className="w-5 h-5 text-red-500" />
            <span className="text-gray-700">Session expires in:</span>
            <span className="font-mono text-xl font-bold text-red-600">
              {formatTime(remainingTime)}
            </span>
          </motion.div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-12"
        >
          {!isVideoPlaying && (
            <div 
              className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer z-10"
              onClick={() => setIsVideoPlaying(true)}
            >
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition transform hover:scale-110">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </div>
          )}
          <div className="aspect-w-16 aspect-h-9 bg-gray-900">
            <iframe
              width="100%"
              height="100%"
              src={isVideoPlaying ? "https://www.youtube.com/embed/RKpXxsAEJJI?start=2&autoplay=1" : "https://www.youtube.com/embed/RKpXxsAEJJI?start=2"}
              title="Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-orange-200 mb-8">
          {[
            { id: "overview", label: "📘 Course Overview", icon: <BookOpen className="w-4 h-4" /> },
            { id: "syllabus", label: "📚 Syllabus", icon: <FileText className="w-4 h-4" /> },
            { id: "resources", label: "📂 Resources", icon: <Download className="w-4 h-4" /> },
            { id: "faq", label: "❓ FAQ", icon: <MessageCircle className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? "text-red-600 border-b-2 border-red-600 bg-red-50/50 rounded-t-lg"
                  : "text-gray-600 hover:text-red-500"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.id === "overview" ? "Overview" : tab.id === "syllabus" ? "Syllabus" : tab.id === "resources" ? "Resources" : "FAQ"}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeInUp}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-3">
                    {[
                      "Basics of astrology and zodiac signs",
                      "How to read a natal chart",
                      "Understanding planetary influences",
                      "Practical applications in daily life"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-3">
                    {[
                      "Predictive techniques and transits",
                      "Astrology software essentials",
                      "Ethics in astrological practice",
                      "Building your astrology practice"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-orange-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Users className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Who This Course Is For</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>✨ Beginners curious about astrology</li>
                    <li>✨ Students of spirituality and self-growth</li>
                    <li>✨ Anyone seeking life guidance</li>
                    <li>✨ Professionals exploring astrology as a career</li>
                    <li>✨ Yoga and wellness practitioners</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Award className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Course Features</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        {feature.icon}
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Syllabus Tab */}
          {activeTab === "syllabus" && (
            <motion.div
              key="syllabus"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
              className="space-y-4"
            >
              {syllabus.map((module, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-xl transition"
                >
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-gray-800">{module.title}</h3>
                      <span className="flex items-center gap-1 text-sm text-red-600">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <ul className="grid md:grid-cols-3 gap-2">
                      {module.topics.map((topic, topicIdx) => (
                        <li key={topicIdx} className="flex items-center gap-2 text-sm text-gray-600">
                          <ChevronRight className="w-4 h-4 text-red-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <motion.div
              key="resources"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                  <Download className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-bold text-gray-800">Downloadable Materials</h3>
                </div>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-red-50 transition group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-red-500" />
                        <span className="text-gray-700">Astrology Basics PDF</span>
                      </div>
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-red-50 transition group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-red-500" />
                        <span>Natal Chart Template</span>
                      </div>
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-red-50 transition group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-red-500" />
                        <span>Planetary Reference Guide</span>
                      </div>
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                    </a>
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
                <div className="flex items-center gap-3 mb-6">
                  <Headphones className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-bold text-gray-800">Media & Podcasts</h3>
                </div>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-red-50 transition">
                      <Headphones className="w-5 h-5 text-red-500" />
                      <span>Podcast: Role of Planets in Modern Life</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-red-50 transition">
                      <Video className="w-5 h-5 text-red-500" />
                      <span>Video: Understanding Your Birth Chart</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-red-50 transition">
                      <FileText className="w-5 h-5 text-red-500" />
                      <span>Blog: Astrology in the Digital Age</span>
                    </a>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          )}

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <motion.div
              key="faq"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
              className="space-y-4"
            >
              {[
                { q: "Is this course beginner-friendly?", a: "Yes! This course is designed for absolute beginners with no prior knowledge of astrology. We start from the very basics and gradually build up to advanced concepts." },
                { q: "Will I get lifetime access?", a: "Yes, once you enroll in the premium version, you get lifetime access to all course materials, updates, and future additions." },
                { q: "Can I get a certificate?", a: "Absolutely! Upon successful completion of the premium course and passing the assessment, you'll receive a recognized certificate." },
                { q: "What if I miss a live session?", a: "All live sessions are recorded and uploaded to your dashboard within 24 hours. You can watch them at your convenience." },
                { q: "Is there any support available?", a: "Yes! You'll have access to our dedicated support team and a private community of fellow students." }
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition"
                >
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Master Astrology? 🚀</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-6">
              Join thousands of students who have transformed their lives through our comprehensive astrology program
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate("/courses")}
                className="px-8 py-3 bg-white text-red-600 font-semibold rounded-xl shadow-lg hover:bg-orange-50 transition transform hover:scale-105"
              >
                Enroll in Full Course Now
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition"
              >
                Talk to an Advisor
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-white/80">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-current" /> 4.9/5 Rating</span>
              <span>•</span>
              <span>🎓 5,000+ Students</span>
              <span>•</span>
              <span>📜 100% Certificate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoVideoPage;