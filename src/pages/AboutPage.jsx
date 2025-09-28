import React from "react";
import { motion } from "framer-motion";
import { Globe, Rocket, Users, Award } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-orange-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center bg-orange-100">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold text-orange-600"
        >
          About Us
        </motion.h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          We are passionate explorers, dreamers, and creators—bringing the magic of the cosmos closer to you.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src="https://source.unsplash.com/600x400/?space,stars"
          alt="Our Story"
          className="rounded-2xl shadow-lg w-full md:w-1/2 object-cover"
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded with a vision to connect people with the wonders of the universe, 
            we’ve dedicated ourselves to crafting products and experiences that ignite curiosity, 
            inspire imagination, and bring the stars a little closer.  
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Mission & Vision</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {[
            { icon: <Globe className="w-8 h-8 text-orange-500" />, title: "Global Reach", desc: "Inspiring stargazers across the world with our premium cosmic products." },
            { icon: <Rocket className="w-8 h-8 text-orange-500" />, title: "Innovation", desc: "Pioneering creative designs that merge science with imagination." },
            { icon: <Users className="w-8 h-8 text-orange-500" />, title: "Community", desc: "Building a global family of dreamers, learners, and explorers." },
            { icon: <Award className="w-8 h-8 text-orange-500" />, title: "Excellence", desc: "Committed to delivering premium quality and value every time." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-orange-50 p-6 rounded-2xl shadow-md text-center"
            >
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Meet Our Team</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {[
            { name: "Ava Johnson", role: "Founder & CEO", image: "https://source.unsplash.com/300x300/?woman,portrait" },
            { name: "Ethan Clark", role: "Lead Designer", image: "https://source.unsplash.com/300x300/?man,portrait" },
            { name: "Sophia Lee", role: "Marketing Head", image: "https://source.unsplash.com/300x300/?business,woman" },
            { name: "Liam Smith", role: "Tech Lead", image: "https://source.unsplash.com/300x300/?developer,man" },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden text-center p-6"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-orange-200"
              />
              <h3 className="mt-4 text-lg font-bold text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats / Achievements */}
      <section className="py-16 px-6 bg-orange-600 text-white text-center">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "50+", label: "Cosmic Products" },
            { number: "15+", label: "Countries Reached" },
            { number: "5+", label: "Awards Won" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="p-6"
            >
              <h3 className="text-4xl font-extrabold">{stat.number}</h3>
              <p className="mt-2 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 text-center bg-orange-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Journey 🚀</h2>
        <p className="mb-6 text-lg text-gray-700 max-w-2xl mx-auto">
          Together, we can inspire the world to look up and dream beyond the stars. 
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-700 transition"
        >
          Contact Us
        </motion.button>
      </section>
    </div>
  );
};

export default AboutPage;
