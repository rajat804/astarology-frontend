// AboutPage.jsx
import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { 
  Globe, 
  Rocket, 
  Users, 
  Award, 
  Star, 
  Sparkles, 
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

const AboutPage = () => {
  const [counters, setCounters] = useState({
    customers: 0,
    products: 0,
    countries: 0,
    awards: 0
  });

  // Counter animation
  useEffect(() => {
    const targetCustomers = 12500;
    const targetProducts = 85;
    const targetCountries = 32;
    const targetAwards = 12;
    
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCounters({
          customers: Math.floor((targetCustomers * currentStep) / steps),
          products: Math.floor((targetProducts * currentStep) / steps),
          countries: Math.floor((targetCountries * currentStep) / steps),
          awards: Math.floor((targetAwards * currentStep) / steps)
        });
      } else {
        clearInterval(interval);
      }
    }, stepTime);
    
    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

  const teamMembers = [
    { 
      name: "Ava Johnson", 
      role: "Founder & CEO", 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
      bio: "Visionary leader with 15+ years in spiritual wellness",
      social: { linkedin: "#", twitter: "#" }
    },
    { 
      name: "Ethan Clark", 
      role: "Lead Designer", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      bio: "Creative mind behind our unique product designs",
      social: { linkedin: "#", instagram: "#" }
    },
    { 
      name: "Sophia Lee", 
      role: "Marketing Head", 
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
      bio: "Digital strategist & community builder",
      social: { linkedin: "#", twitter: "#" }
    },
    { 
      name: "Liam Smith", 
      role: "Tech Lead", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      bio: "Building seamless digital experiences",
      social: { linkedin: "#", github: "#" }
    }
  ];

  const values = [
    {
      icon: <Globe className="w-10 h-10 text-red-500" />,
      title: "Global Reach",
      desc: "Inspiring stargazers across 32+ countries with our premium cosmic products.",
      color: "from-red-50 to-orange-50"
    },
    {
      icon: <Rocket className="w-10 h-10 text-red-500" />,
      title: "Innovation",
      desc: "Pioneering creative designs that merge ancient wisdom with modern science.",
      color: "from-orange-50 to-red-50"
    },
    {
      icon: <Users className="w-10 h-10 text-red-500" />,
      title: "Community",
      desc: "Building a global family of 12,500+ dreamers, learners, and explorers.",
      color: "from-red-50 to-orange-50"
    },
    {
      icon: <Award className="w-10 h-10 text-red-500" />,
      title: "Excellence",
      desc: "Committed to delivering premium quality, authenticity, and value every time.",
      color: "from-orange-50 to-red-50"
    }
  ];

  return (
    <div className="bg-offWhite text-gray-900">
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden py-24 px-6 text-center bg-gradient-to-br from-red-50 via-orange-50 to-offWhite">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Welcome to Our Cosmos
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We are passionate explorers, dreamers, and creators—bringing the magic of the cosmos closer to you. 
            Founded with a vision to inspire and transform lives through ancient wisdom and modern innovation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:scale-105">
              Our Journey
            </button>
            <button className="px-6 py-3 border-2 border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition">
              Meet the Team
            </button>
          </div>
        </motion.div>
      </section>

      {/* Our Story - Enhanced */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-200 to-orange-200 rounded-2xl blur-xl opacity-50"></div>
              <img
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=400&fit=crop"
                alt="Our Story"
                className="relative rounded-2xl shadow-2xl w-full object-cover h-[400px]"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2"
          >
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-6">
              A Journey of <span className="text-red-600">Cosmic Discovery</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2015 with a simple yet profound vision — to connect people with the wonders of the universe. 
              What started as a small community of spiritual seekers has now grown into a global movement of 12,500+ 
              passionate individuals exploring the depths of astrology, numerology, and holistic wellness.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We've dedicated ourselves to crafting authentic products and transformative experiences that ignite 
              curiosity, inspire imagination, and bring the stars a little closer to your everyday life.
            </p>
            <div className="mt-6 flex items-center gap-2 text-red-600 group cursor-pointer">
              <span className="font-semibold">Read our full story</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision - Enhanced */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Our Core Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              What Drives <span className="text-red-600">Us Forward</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Guided by ancient wisdom and modern innovation, we're committed to making a positive impact.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100`}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 text-center mb-2">{item.title}</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats / Achievements - Enhanced with Counter Animation */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Numbers that reflect our dedication to excellence and global reach
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: counters.customers.toLocaleString(), label: "Happy Customers", suffix: "+" },
              { number: counters.products, label: "Cosmic Products", suffix: "+" },
              { number: counters.countries, label: "Countries Reached", suffix: "+" },
              { number: counters.awards, label: "Awards Won", suffix: "" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
              >
                <h3 className="text-4xl md:text-5xl font-extrabold">
                  {stat.number}{stat.suffix}
                </h3>
                <p className="mt-2 text-white/90 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced */}
      <section className="py-20 px-6 bg-offWhite">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Our People</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              Meet the <span className="text-red-600">Visionaries</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate experts dedicated to bringing you the best of ancient wisdom and modern innovation
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden text-center border border-orange-100 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-4">
                    <div className="flex gap-3">
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} className="bg-white rounded-full p-2 hover:bg-red-500 hover:text-white transition">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} className="bg-white rounded-full p-2 hover:bg-red-500 hover:text-white transition">
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a href={member.social.instagram} className="bg-white rounded-full p-2 hover:bg-red-500 hover:text-white transition">
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                  <p className="text-red-600 text-sm font-medium mt-1">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-2">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
              What Our <span className="text-red-600">Community Says</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              {[
                { name: "Priya Sharma", text: "The most authentic spiritual products I've ever purchased. Highly recommended!", rating: 5 },
                { name: "Rahul Mehta", text: "Their courses transformed my understanding of numerology. Life-changing!", rating: 5 },
                { name: "Anjali Kapoor", text: "Amazing customer service and genuine products. Will shop again!", rating: 5 }
              ].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl shadow-md border border-orange-100"
                >
                  <div className="flex text-yellow-500 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic">"{testimonial.text}"</p>
                  <p className="mt-4 font-semibold text-gray-800">— {testimonial.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & CTA Section - Enhanced */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
                Join Our <span className="text-red-600">Cosmic Journey</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Together, we can inspire the world to look up and dream beyond the stars. 
                Have questions? We'd love to hear from you!
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-red-500" />
                  <span>hello@cosmicjourney.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-red-500" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>Mumbai, India</span>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-red-500 hover:text-white transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Stay Connected</h3>
              <p className="text-gray-600 mb-6">Subscribe to our newsletter for cosmic insights and exclusive offers</p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">No spam. Unsubscribe anytime.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;