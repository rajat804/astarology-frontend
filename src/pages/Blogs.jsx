// pages/Blogs.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  HiOutlineCalendar, 
  HiOutlineUser, 
  HiOutlineArrowRight,
  HiOutlineClock
} from "react-icons/hi";
import { GiStarsStack, GiLotus } from "react-icons/gi";
import assets from "../assets/assets";


const Blogs = () => {
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
    excerpt: "Guided by the wisdom of stars, Praveen Nangia brings you an ancient blend of Vedic Astrology, Numerology, and Vastu Shastra to unlock your life's true potential...",
    content: `Guided by the wisdom of stars, Praveen Nangia brings you an ancient blend of Vedic Astrology, Numerology, and Vastu Shastra to unlock your life's true potential. Discover how cosmic forces influence your destiny and find balance with divine guidance.

Personalized horoscope consultations and remedies
Numerological insights to enhance name vibrations
Vastu guidance to create harmony in your space

At Nakshatraganak, we believe that every individual has a unique cosmic blueprint. Our mission is to help you understand this blueprint and use it to navigate life's challenges with confidence and clarity.

Whether you're seeking answers about your career, relationships, health, or spiritual path, our expert guidance combines ancient wisdom with modern understanding to provide you with practical, actionable insights.`,
    image: assets.nakshatraganak,
    category: "Spiritual Guidance",
    tags: ["Vedic Astrology", "Numerology", "Vastu Shastra", "Spiritual Healing"]
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

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
              <GiLotus className="text-yellow-400 w-4 h-4" />
              <span className="text-sm font-semibold text-yellow-200">Our Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Blogs
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Explore spiritual insights, Vedic wisdom, and guidance from our experts
            </p>
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

      {/* Blogs Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-offWhite to-orange-50/50">
        {showBackgroundAnimations && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(orbCount)].map((_, i) => (
              <div
                key={`blog-orb-${i}`}
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
          {/* Blog Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-contain object-top transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-red-600">
                {blog.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar className="w-4 h-4 text-red-500" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineUser className="w-4 h-4 text-red-500" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="w-4 h-4 text-red-500" />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {blog.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {blog.excerpt}
              </p>

              {/* Read More Button */}
              <Link
                to={`/blog/${blog.id}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 hover:gap-3"
              >
                Read More
                <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
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

export default Blogs;