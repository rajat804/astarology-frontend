// pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  HiOutlineCalendar, 
  HiOutlineUser, 
  HiOutlineClock,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineShare
} from "react-icons/hi";
import { GiStarsStack, GiLotus, GiCrystalBall } from "react-icons/gi";
import assets from "../assets/assets";

const BlogDetail = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Detect device performance
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      const isSlow = navigator.deviceMemory ? navigator.deviceMemory < 4 : false;
      const isLowEnd = mobile && isSlow;
      setIsLowEndDevice(isLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const showBackgroundAnimations = !isLowEndDevice;
  const orbCount = isLowEndDevice ? 2 : isMobile ? 3 : 6;
  const starCount = isLowEndDevice ? 15 : isMobile ? 25 : 50;

  const blog = {
    id: 1,
    title: "Nakshatraganak",
    date: "17 Apr 2026",
    author: "Praveen Nangia",
    readTime: "5 min read",
    fullContent: `Guided by the wisdom of stars, Praveen Nangia brings you an ancient blend of Vedic Astrology, Numerology, and Vastu Shastra to unlock your life's true potential. Discover how cosmic forces influence your destiny and find balance with divine guidance.

At Nakshatraganak, we believe that every individual has a unique cosmic blueprint. Our mission is to help you understand this blueprint and use it to navigate life's challenges with confidence and clarity.

Whether you're seeking answers about your career, relationships, health, or spiritual path, our expert guidance combines ancient wisdom with modern understanding to provide you with practical, actionable insights.`,
    image: assets.nakshatraganak,
    category: "Spiritual Guidance",
    tags: ["Vedic Astrology", "Numerology", "Vastu Shastra", "Spiritual Healing"],
    features: [
      "Personalized horoscope consultations and remedies",
      "Numerological insights to enhance name vibrations",
      "Vastu guidance to create harmony in your space"
    ]
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://nakshatraganak.com/img/curosel5.webp')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {showBackgroundAnimations && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(orbCount)].map((_, i) => (
              <div
                key={`hero-orb-${i}`}
                className="absolute rounded-full blur-3xl opacity-20 animate-float-orb"
                style={{
                  width: `${100 + Math.random() * 150}px`,
                  height: `${100 + Math.random() * 150}px`,
                  background: `radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(249,115,22,0.3) 100%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${15 + i * 3}s`,
                }}
              />
            ))}
            {[...Array(starCount)].map((_, i) => (
              <div
                key={`hero-star-${i}`}
                className="absolute w-0.5 h-0.5 bg-yellow-200 rounded-full animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 border border-white/20">
              <GiLotus className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-semibold text-yellow-200">Read Our Blog</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-gray-300 text-xs sm:text-sm">
              <div className="flex items-center gap-1 sm:gap-2">
                <HiOutlineCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <HiOutlineUser className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <HiOutlineClock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-scroll"></div>
          </div>
        </motion.div>
      </section>

      {/* Blog Content Section */}
      <section className="relative py-8 sm:py-12 md:py-20 overflow-hidden bg-gradient-to-b from-offWhite to-orange-50/50">
        {showBackgroundAnimations && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(orbCount)].map((_, i) => (
              <div
                key={`content-orb-${i}`}
                className="absolute rounded-full blur-3xl opacity-20 animate-float-orb"
                style={{
                  width: `${100 + Math.random() * 150}px`,
                  height: `${100 + Math.random() * 150}px`,
                  background: `radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(249,115,22,0.2) 100%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${15 + i * 3}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-red-600 mb-4 sm:mb-6 transition-colors duration-300"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>

          {/* Blog Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-100"
          >
            {/* Image Container - Responsive */}
            <div className="relative w-full bg-gray-100">
              {/* Responsive Image Sizing */}
              <div className="relative pt-[56.25%] sm:pt-[50%] md:pt-[45%] lg:pt-[40%]">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="absolute top-0 left-0 w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-3 py-1 rounded-full mb-4 sm:mb-6">
                <GiStarsStack className="text-red-500 w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-semibold text-red-600">{blog.category}</span>
              </div>

              {/* Full Content */}
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg whitespace-pre-line">
                  {blog.fullContent}
                </div>

                {/* Features Section - Responsive */}
                <div className="my-6 sm:my-8 p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <GiCrystalBall className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
                    What We Offer:
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {blog.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 sm:gap-3">
                        <HiOutlineCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                  At Nakshatraganak, we are committed to providing authentic, personalized guidance that helps 
                  you navigate life's journey with confidence. Our ancient wisdom combined with modern understanding 
                  ensures that you receive practical solutions that work in today's world.
                </div>
              </div>

              {/* Tags - Responsive */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-orange-100">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Tags:</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-[10px] sm:text-xs rounded-full hover:bg-red-100 hover:text-red-600 transition-colors duration-300 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Section - Responsive */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-orange-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <HiOutlineShare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <span className="text-xs sm:text-sm text-gray-600">Share this article:</span>
                    <div className="flex gap-1.5 sm:gap-2">
                      <button className="px-2 sm:px-3 py-1 bg-blue-500 text-white text-[10px] sm:text-xs rounded-full hover:bg-blue-600 transition">
                        Facebook
                      </button>
                      <button className="px-2 sm:px-3 py-1 bg-blue-400 text-white text-[10px] sm:text-xs rounded-full hover:bg-blue-500 transition">
                        Twitter
                      </button>
                      <button className="px-2 sm:px-3 py-1 bg-green-500 text-white text-[10px] sm:text-xs rounded-full hover:bg-green-600 transition">
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Book Consultation CTA - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-6 sm:mt-10 p-4 sm:p-6 md:p-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl sm:rounded-2xl text-center"
          >
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-orange-100 mb-3 sm:mb-4">
              Book a personalized consultation with our experts today
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white text-red-600 font-semibold text-sm sm:text-base hover:bg-gray-100 transition-all duration-300"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-orb {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, -15px) scale(1.05);
          }
          66% {
            transform: translate(-15px, 10px) scale(0.95);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 0.5;
            transform: scale(1);
          }
        }
        
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(15px);
            opacity: 0;
          }
        }
        
        .animate-float-orb {
          animation: float-orb ease-in-out infinite;
          will-change: transform;
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
          will-change: opacity, transform;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
};

export default BlogDetail;