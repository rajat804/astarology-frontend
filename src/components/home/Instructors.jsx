// components/home/Instructors.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Compass, 
  Hand, 
  Star, 
  Calendar, 
  Award,
  Sparkles,
  Quote,
  X
} from "lucide-react";

import assets from "../../assets/assets";

const Instructors = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);

  const teamMembers = [
    {
      id: "anuja",
      name: "Anuja S Chavaan",
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
      stats: { experience: "12+ years", students: "1500+", consultations: "3000+" },
      specialties: ["Vastu Shastra", "Numerology", "Space Healing", "Energy Balancing"]
    },
    {
      id: "himesh",
      name: "Himesh A Kumar",
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
      stats: { experience: "10+ years", readings: "2500+", accuracy: "95%" },
      specialties: ["Palmistry", "Hand Analysis", "Life Guidance", "Future Prediction"]
    },
    {
      id: "shrivya",
      name: "Shravya",
      role: "Yoga & Wellness Instructor",
      expertise: "Hatha Yoga | Pranayama | Meditation",
      image: assets.shravya,
      icon: Activity,
      intro: `A journey of balance, healing, and self-discovery awaits. Yoga is not just a physical practice; it is a lifestyle that cultivates the body, soothes the mind, and liberates the soul.

As a dedicated and passionate yoga instructor, I will lead you through a series of exercises and movements that will empower and uplift your body, as well as bring peace and tranquility to your mind and soul. Whether a beginner or a seasoned yogi, every session is carefully crafted to address your needs and assist you in your personal growth and development. Through breathing exercises, movements, and meditation, you will learn to reconnect with yourself and find balance and harmony within your life. Step onto the mat and begin your journey to a healthier, more peaceful, and balanced you.`,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      stats: { experience: "8+ years", students: "2000+", classes: "500+" },
      specialties: ["Hatha Yoga", "Pranayama", "Meditation", "Mindfulness"]
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-orange-50/50 to-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-4 py-2 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="text-red-500 w-4 h-4" />
            <span className="text-sm font-semibold text-red-600">Meet Our Masters</span>
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
            Our Spiritual Experts
          </h3>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Carefully selected practitioners with deep traditional knowledge and years of experience
          </p>
        </motion.div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((mentor, i) => {
            const IconComponent = mentor.icon;
            
            return (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${mentor.color} rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl`}
                />
                
                <div className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100 ${mentor.bgColor}`}>
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating Icon */}
                    <motion.div
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg"
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <IconComponent className={`w-5 h-5 ${mentor.iconColor}`} />
                    </motion.div>

                    {/* Name Overlay */}
                    <motion.div
                      className="absolute bottom-4 left-4 right-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="text-white font-bold text-xl">{mentor.name}</h4>
                      <p className="text-white/80 text-sm">{mentor.role}</p>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-medium text-gray-600">{mentor.expertise}</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-orange-100">
                      {Object.entries(mentor.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-gray-900">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.slice(0, 3).map((specialty, idx) => (
                        <motion.span
                          key={specialty}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`text-xs px-2 py-1 rounded-full bg-white border border-${mentor.iconColor.split('-')[1]}-200 text-${mentor.iconColor.split('-')[1]}-600`}
                        >
                          {specialty}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <motion.button
                        onClick={() => setSelectedMentor(mentor)}
                        className="flex-1 px-4 py-2 rounded-xl border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Quote className="w-3 h-3" />
                        View Profile
                      </motion.button>
                      <motion.button
                        className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Calendar className="w-3 h-3" />
                        Book Session
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full">
            <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
            <span className="text-sm font-semibold text-purple-700">
              "Ancient wisdom meets modern guidance — Transform your life today"
            </span>
            <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
          </div>
        </motion.div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMentor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg hover:bg-white transition"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="grid md:grid-cols-2">
                  {/* Image Section */}
                  <div className="relative h-96 md:h-full">
                    <img
                      src={selectedMentor.image}
                      alt={selectedMentor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
                    <div className="absolute bottom-6 left-6 right-6 md:bottom-auto md:top-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{selectedMentor.name}</h3>
                      <p className="text-white/90">{selectedMentor.role}</p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-semibold text-gray-700">{selectedMentor.expertise}</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">About</h4>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {selectedMentor.intro}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMentor.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className={`text-sm px-3 py-1 rounded-full bg-${selectedMentor.bgColor.split('-')[1]} border border-${selectedMentor.iconColor.split('-')[1]}-200 text-${selectedMentor.iconColor.split('-')[1]}-600`}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                      {Object.entries(selectedMentor.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Book a Consultation
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Instructors;