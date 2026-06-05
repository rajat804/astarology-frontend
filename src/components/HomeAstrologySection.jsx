import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const HomeAstrologySection = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/astrology');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🔮 <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Kundli & Panchang
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your personalized Vedic birth chart and daily Panchang
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Kundli Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4">
              <h3 className="text-xl font-bold text-white text-center">📊 Kundli</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Complete Birth Chart Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Planetary Positions with Degrees</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Nakshatra & Rashi Details</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Dasha Predictions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Manglik Dosha Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>Remedies & Suggestions</span>
                </div>
              </div>
              <button
                onClick={handleClick}
                className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
              >
                {isAuthenticated ? '✨ Generate Your Kundli ✨' : '🔐 Login to Generate Kundli'}
              </button>
            </div>
          </motion.div>

          {/* Panchang Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4">
              <h3 className="text-xl font-bold text-white text-center">📅 Panchang</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>Daily Tithi & Nakshatra</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>Sunrise & Sunset Timings</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>Yoga & Karana Details</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>Rahu Kaal & Auspicious Timings</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>Paksha & Ritu Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-500">✓</span>
                  <span>Daily Muhurat</span>
                </div>
              </div>
              <button
                onClick={handleClick}
                className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
              >
                {isAuthenticated ? '📅 View Daily Panchang' : '🔐 Login to View Panchang'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Price Info */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
            <span className="text-yellow-500">⭐</span>
            <span className="font-medium">Special Offer: ₹99 only for Complete Kundli + PDF Download</span>
            <span className="text-yellow-500">⭐</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAstrologySection;