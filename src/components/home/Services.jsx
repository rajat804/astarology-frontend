import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";
import { GiStarsStack } from "react-icons/gi";
import { getAllServices } from "../../services/api";
import toast from "react-hot-toast";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Dynamic category style generator - based on category name
  const getCategoryStyle = (category) => {
    // Color mapping based on category name
    const colorMap = {
      'vedic': 'purple',
      'astrology': 'purple',
      'numerology': 'blue',
      'face': 'pink',
      'reading': 'pink',
      'vastu': 'green',
      'paranormal': 'indigo',
      'spiritual': 'amber',
      'healing': 'amber'
    };

    const color = colorMap[category?.toLowerCase()] || 'purple';

    return {
      icon: `text-${color}-600`,
      bg: `from-${color}-100 to-${color}-50`,
      button: `border-${color}-500 text-${color}-600 hover:bg-${color}-500`,
      gradient: `from-${color}-600 to-pink-600`,
    };
  };

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get service link from name
  const getServiceLink = (service) => {
    return `/services/${service.slug || service.category}`;
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await getAllServices();
      console.log('📦 Services from backend:', response);

      let servicesList = [];
      if (response.success && response.services) {
        servicesList = response.services;
      } else if (response.services) {
        servicesList = response.services;
      } else if (Array.isArray(response)) {
        servicesList = response;
      }

      // Filter only active services and sort by order
      const activeServices = servicesList
        .filter(s => s.isActive !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      console.log('✅ Active services:', activeServices.length);
      setServices(activeServices);
    } catch (error) {
      console.error('❌ Error fetching services:', error);
      toast.error('Failed to load services');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-offWhite to-orange-50/50 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4">
            <GiStarsStack className="text-red-500 w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold text-red-600">Our Services</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
            How We Guide You
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Loading services...
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className="bg-gradient-to-b from-offWhite to-orange-50/50 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4">
            <GiStarsStack className="text-red-500 w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold text-red-600">Our Services</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
            How We Guide You
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            No services available at the moment. Please check back later.
          </p>
        </div>
      </section>
    );
  }

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
        {services.map((service, index) => {
          const style = getCategoryStyle(service.category);
          const serviceLink = getServiceLink(service);
          const alignment = index % 2 === 0 ? 'left' : 'right';

          return (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-[80px] p-6 md:p-10 mb-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 flex flex-col md:flex-row items-center gap-8 md:gap-10 ${alignment === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
            >
              {/* IMAGE SIDE - Using backend image or fallback */}
              <div className="relative w-full md:w-1/2 flex justify-center">
                <div className={`bg-gradient-to-br ${style.bg} rounded-[120px] p-6 w-full max-w-[480px] h-[220px] flex items-center justify-center transition-all duration-300 hover:scale-105`}>
                  <div className="overflow-hidden rounded-full w-[380px] h-[180px] shadow-md bg-white flex items-center justify-center">
                    {service.image && service.image !== '' && !service.image.includes('undefined') ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<span class="text-6xl">${service.icon || '🔮'}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-6xl">{service.icon || '🔮'}</span>
                    )}
                  </div>
                </div>
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${style.gradient} opacity-60`} />

                {/* Discount Badge - From backend */}
                {service.discount > 0 && (
                  <div className="absolute -top-2 -left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {service.discount}% OFF
                  </div>
                )}
              </div>

              {/* TEXT SIDE - All data from backend */}
              <div className="md:w-1/2">
                {/* Icon and Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{service.icon || '🔮'}</span>
                  <span className={`text-sm font-semibold ${style.icon}`}>Discover Your Path</span>
                </div>

                {/* Title - From backend */}
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent`}>
                  {service.name}
                </h2>

                {/* Description - From backend */}
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {service.shortDescription || service.description}
                </p>

                {/* Price and Discount - From backend */}
                <div className="mb-4 flex items-center gap-3 flex-wrap">
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(service.price)}
                  </span>
                  {service.originalPrice && service.originalPrice > service.price && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(service.originalPrice)}
                    </span>
                  )}
                  {service.discount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Save {service.discount}%
                    </span>
                  )}
                </div>

                {/* Duration - From backend */}
                <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                  <span>⏰</span>
                  <span>Duration: {service.duration}</span>
                </div>

                {/* Features Preview - From backend */}
                {service.features && service.features.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          ✓ {feature.length > 25 ? feature.substring(0, 25) + '...' : feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="text-xs text-gray-400">+{service.features.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Learn More Button - Dynamic link */}
                <Link
                  to={serviceLink}
                  className={`group inline-flex items-center gap-2 border-2 ${style.button} px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-black hover:text-white`}
                >
                  Learn More
                  <HiOutlineArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;