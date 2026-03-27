// AboutPage.jsx - Optimized for Performance
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Star,
  Sparkles,
  Heart,
  ChevronRight,
  Quote,
  Award,
  Users,
  Calendar,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Compass,
  Activity,
  Hand
} from "lucide-react";
import assets from "../assets/assets";
const AboutPage = () => {
  // Track which sections are visible
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    shrivya: false,
    anuja: false,
    himesh: false,
    stats: false,
    philosophy: false,
    testimonials: false,
    cta: false
  });

  // Refs for each section
  const sectionRefs = {
    shrivya: useRef(null),
    anuja: useRef(null),
    himesh: useRef(null),
    stats: useRef(null),
    philosophy: useRef(null),
    testimonials: useRef(null),
    cta: useRef(null)
  };

  // Check visibility using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px" } // Reduced threshold and added margin
    );

    // Observe each section
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.id = key;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Simple fade animation
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const teamMembers = [
    {
      id: "shrivya",
      name: "Shrivya",
      role: "Yoga & Wellness Instructor",
      expertise: "Hatha Yoga | Pranayama | Meditation",
      image: assets.shravya,
      icon: Activity,
      intro: `A journey of balance, healing, and self-discovery awaits. Yoga is not just a physical practice; it is a lifestyle that cultivates the body, soothes the mind, and liberates the soul.

As a dedicated and passionate yoga instructor, I will lead you through a series of exercises and movements that will empower and uplift your body, as well as bring peace and tranquility to your mind and soul. Whether a beginner or a seasoned yogi, every session is carefully crafted to address your needs and assist you in your personal growth and development. Through breathing exercises, movements, and meditation, you will learn to reconnect with yourself and find balance and harmony within your life. Step onto the mat and begin your journey to a healthier, more peaceful, and balanced you.`,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      delay: 0
    },
    {
      id: "anuja",
      name: "Anuja Chavan",
      role: "Vastu & Numerology Expert",
      expertise: "Vastu Shastra | Numerology | Space Healing",
      image: assets.anuja,
      icon: Compass,
      intro: `Welcome to a space where ancient wisdom meets modern living. We specialize in the powerful sciences of Vastu Shastra and Numerology. Our goal is to bring harmony, balance, and success into every area of your life.

Your home, your workplace, and even your name carry unique energies. These energies impact your health, relationships, and financial success. By fine-tuning these energies through Vastu and discovering the secrets of numbers, we can bring a more positive and successful life into being.

Are you planning a new home? Do you face difficulties and need solutions? Do you need a clearer and more successful life? Our personal consultations are here to bring clarity, stability, and prosperity into your life.

Join us on a journey of transformation—where your space and numbers work for you, not against you.`,
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      delay: 0.1
    },
    {
      id: "himesh",
      name: "Himesh",
      role: "Palmistry & Life Path Guide",
      expertise: "Palmistry | Hand Analysis | Life Guidance",
      image: assets.hemant,
      icon: Hand,
      intro: `Welcome to the ancient art of Palmistry—where the lines on your hands tell the story of your life. Every palm bears unique markings that reveal your personality, your strengths and weaknesses, as well as your future prospects.

By interpreting the lines, mounts, and formations of your hands, we provide profound and meaningful insights into your life. Palmistry is not merely a method of fortune-telling; it is also a medium for self-discovery and for making informed, sound decisions.

Are you seeking clarity, true guidance, or peace of mind in your life? Our palmistry readings will help you understand the hidden patterns within yourself and fully unlock your true potential.`,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      delay: 0.2
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Clients" },
    { icon: Calendar, value: "15+", label: "Years Experience" },
    { icon: Star, value: "4.9", label: "Average Rating", suffix: "/5" },
    { icon: Award, value: "25+", label: "Awards Won" }
  ];

  return (
    <div className="bg-offWhite">
      {/* Hero Section - Always visible */}
      <section className="relative overflow-hidden py-20 md:py-24 px-6 text-center bg-gradient-to-br from-red-50 via-orange-50 to-offWhite">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full filter blur-3xl opacity-30"></div>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Meet Our Masters
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Guiding You to Your <br />
            <span className="text-gray-800">Highest Self</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Three masters, three ancient sciences, one mission — to help you discover balance, 
            harmony, and purpose in every aspect of your life.
          </p>
        </div>
      </section>

      {/* Team Members Section - Optimized with Intersection Observer */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            ref={sectionRefs[member.id]}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 items-center mb-20 last:mb-0`}
          >
            {/* Image Section - Preserving Original Aspect Ratio */}
<div className="lg:w-1/2 relative group">
  <div className={`absolute -inset-2 bg-gradient-to-r ${member.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500`}></div>
  <div className="relative overflow-hidden rounded-2xl shadow-xl">
    <img
      src={member.image}
      alt={member.name}
      className="w-full h-auto object-contain group-hover:scale-105 transition duration-500"
      loading={index === 0 ? "eager" : "lazy"}
    />
  </div>
</div>

            {/* Content Section - Fade in when visible */}
            <motion.div
              initial="hidden"
              animate={visibleSections[member.id] ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: member.delay }}
              className="lg:w-1/2 space-y-5"
            >
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 ${member.bgColor} rounded-full px-3 py-1.5 md:px-4 md:py-2`}>
                <member.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${member.iconColor}`} />
                <span className={`text-xs md:text-sm font-medium ${member.iconColor}`}>{member.role}</span>
              </div>

              {/* Name */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                {member.name}
                <div className={`w-12 md:w-16 h-1 bg-gradient-to-r ${member.color} mt-2 rounded-full`}></div>
              </h2>

              {/* Expertise */}
              <p className="text-red-600 font-semibold text-sm md:text-base">{member.expertise}</p>

              {/* Quote Icon */}
              <Quote className="w-6 h-6 text-gray-300" />

              {/* Intro Text - Truncated on mobile */}
              <div className="text-gray-600 leading-relaxed text-sm md:text-base space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {member.intro.split('\n\n').slice(0, 2).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Connect Button */}
              <button className={`mt-4 inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${member.bgColor} ${member.iconColor} hover:shadow-lg group text-sm md:text-base`}>
                Book a Consultation
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              {/* Social Links */}
              <div className="flex gap-2 pt-2">
                <a href="#" className={`p-1.5 md:p-2 rounded-full ${member.bgColor} ${member.iconColor} hover:scale-110 transition`}>
                  <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a href="#" className={`p-1.5 md:p-2 rounded-full ${member.bgColor} ${member.iconColor} hover:scale-110 transition`}>
                  <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a href="#" className={`p-1.5 md:p-2 rounded-full ${member.bgColor} ${member.iconColor} hover:scale-110 transition`}>
                  <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                </a>
                <a href="#" className={`p-1.5 md:p-2 rounded-full ${member.bgColor} ${member.iconColor} hover:scale-110 transition`}>
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Stats Section - Simplified */}
      <section ref={sectionRefs.stats} className="py-16 md:py-20 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Our Impact in Numbers</h2>
            <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">
              Thousands of lives transformed through ancient wisdom and modern guidance
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-4 md:p-6 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl"
              >
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3" />
                <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold">{stat.value}</h3>
                <p className="mt-1 text-white/90 text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - Simplified */}
      <section ref={sectionRefs.philosophy} className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4">
              <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Our Philosophy
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              Ancient Wisdom for <span className="text-red-600">Modern Living</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Combining time-tested practices with contemporary understanding for lasting transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Activity, title: "Holistic Healing", desc: "Integrating body, mind, and spirit for complete wellness" },
              { icon: Compass, title: "Space Harmony", desc: "Creating balanced environments that nurture success" },
              { icon: Hand, title: "Self Discovery", desc: "Unlocking your true potential through ancient arts" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-offWhite rounded-xl md:rounded-2xl p-6 text-center border border-orange-100 shadow-md hover:shadow-lg transition"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-red-500" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section - Simplified */}
      <section ref={sectionRefs.testimonials} className="py-16 md:py-20 px-6 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4">
            <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
            Client Stories
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 md:mb-10">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              { name: "Priya Sharma", text: "Shrivya's yoga classes transformed my life. I feel more balanced and at peace.", rating: 5 },
              { name: "Rahul Mehta", text: "Anuja's Vastu consultation brought incredible positive energy to my home.", rating: 5 },
              { name: "Neha Gupta", text: "Himesh's palmistry reading gave me clarity about my life path.", rating: 5 }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-5 md:p-6 rounded-xl md:rounded-2xl shadow-md border border-orange-100"
              >
                <div className="flex text-yellow-500 mb-2 md:mb-3 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-xs md:text-sm italic">"{testimonial.text}"</p>
                <p className="mt-3 md:mt-4 font-semibold text-gray-800 text-sm md:text-base">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Simplified */}
      <section ref={sectionRefs.cta} className="py-16 md:py-20 px-6 text-center bg-gradient-to-r from-red-600 to-red-700 text-white">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Begin Your Journey Today 🌟</h2>
        <p className="mb-5 md:mb-6 text-white/90 text-sm md:text-base max-w-2xl mx-auto">
          Connect with our experts and take the first step toward a more balanced, harmonious, and purposeful life.
        </p>
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
          <button className="px-6 py-2.5 md:px-8 md:py-3 bg-white text-red-600 font-semibold rounded-xl shadow-lg hover:bg-orange-50 transition text-sm md:text-base">
            Book a Consultation
          </button>
          <button className="px-6 py-2.5 md:px-8 md:py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition text-sm md:text-base">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;