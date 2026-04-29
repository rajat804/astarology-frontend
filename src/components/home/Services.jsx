import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineSparkles } from "react-icons/hi";
import { GiStarsStack } from "react-icons/gi";
import assets from "../../assets/assets";

const Services = () => {

  const services = [
    {
      id: 1,
      title: "Vedic Astrology",
      image: assets.service1,
      description:
        "Explore the science of planets and stars to reveal your destiny. Our detailed horoscope analysis offers insight into career, marriage, health, and life path — guiding you to make confident decisions in harmony with the cosmos.",
      link: "/services/vedic-astrology",
      iconColor: "text-purple-600",
      bgColor: "from-purple-100 to-purple-50",
      buttonColor: "border-purple-500 text-purple-600 hover:bg-purple-500",
      gradient: "from-purple-600 to-pink-600",
      align: "left" // image left, content right
    },
    {
      id: 2,
      title: "Numerology",
      image: assets.service2,
      description:
        "Decode the divine power of numbers. Discover what your name and date of birth reveal about your personality, opportunities, and spiritual purpose. Numerology helps you attract success and align with your true vibrations.",
      link: "/services/numerology",
      iconColor: "text-blue-600",
      bgColor: "from-blue-100 to-blue-50",
      buttonColor: "border-blue-500 text-blue-600 hover:bg-blue-500",
      gradient: "from-blue-600 to-cyan-600",
      align: "right" // image right, content left
    },
    {
      id: 3,
      title: "Vastu Shastra",
      image: assets.service3,
      description:
        "Balance your surroundings to attract prosperity and peace. Our Vastu experts align your home or workplace with cosmic energies — promoting happiness, health, and spiritual harmony in your daily life.",
      link: "/services/vastu",
      iconColor: "text-green-600",
      bgColor: "from-green-100 to-green-50",
      buttonColor: "border-green-500 text-green-600 hover:bg-green-500",
      gradient: "from-green-600 to-emerald-600",
      align: "left"
    },
    {
      id: 4,
      title: "Spiritual Healer",
      image: assets.service6,
      description:
        "Heal your aura and free yourself from negative influences. Through meditation, mantra, and energy balancing, our spiritual healing sessions restore inner peace and strengthen your divine connection.",
      link: "/services/spiritual-healer",
      iconColor: "text-amber-600",
      bgColor: "from-amber-100 to-amber-50",
      buttonColor: "border-amber-500 text-amber-600 hover:bg-amber-500",
      gradient: "from-amber-600 to-orange-600",
      align: "right"
    },
    {
      id: 5,
      title: "Paranormal Activity",
      image: assets.paranormal,
      description:
        "Restore harmony when unseen forces disturb your peace. Our spiritual experts use ancient Vedic rituals and mantra healing to neutralize negative energies and protect your space from paranormal disturbances.",
      link: "/services/paranormal",
      iconColor: "text-indigo-600",
      bgColor: "from-indigo-100 to-indigo-50",
      buttonColor: "border-indigo-500 text-indigo-600 hover:bg-indigo-500",
      gradient: "from-indigo-600 to-purple-600",
      align: "left"
    },
    {
      id: 6,
      title: "Face Reading",
      image: assets.service4,
      description:
        "Discover the ancient art of Samudrika Shastra. Your facial features reveal your personality, destiny, and inner nature. Our experts analyze your expressions and features to provide deep insights into your life path.",
      link: "/services/face-reading",
      iconColor: "text-pink-600",
      bgColor: "from-pink-100 to-pink-50",
      buttonColor: "border-pink-500 text-pink-600 hover:bg-pink-500",
      gradient: "from-pink-600 to-rose-600",
      align: "right"
    },
  ];

  return (
    <section className="bg-gradient-to-b from-offWhite to-orange-50/50 py-16 md:py-20 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4">
          <GiStarsStack className="text-red-500 w-3 h-3 md:w-4 md:h-4" />
          <span className="text-xs md:text-sm font-semibold text-red-600">Our Services</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
          How We Guide You
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Ancient wisdom tailored for your modern life
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`bg-white rounded-[80px] p-6 md:p-10 mb-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 flex flex-col md:flex-row items-center gap-8 md:gap-10 ${
              service.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
            {/* IMAGE SIDE */}
            <div className="relative w-full md:w-1/2 flex justify-center">
              <div className={`bg-gradient-to-br ${service.bgColor} rounded-[120px] p-6 w-full max-w-[480px] h-[220px] flex items-center justify-center transition-all duration-300 hover:scale-105`}>
                <div className="overflow-hidden rounded-full w-[380px] h-[180px] shadow-md">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
              {/* Decorative dot */}
              <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${service.gradient} opacity-60`} />
            </div>

            {/* TEXT SIDE */}
            <div className="md:w-1/2">
              {/* Title with accent color on dot */}
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                <span className={`text-sm font-semibold ${service.iconColor}`}>Discover Your Path</span>
              </div>
              
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                {service.title}
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <Link
                to={service.link}
                className={`inline-flex items-center gap-2 border-2 ${service.buttonColor} px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:text-white hover:gap-3`}
              >
                Learn More
                <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;