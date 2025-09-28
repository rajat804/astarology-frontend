import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-orange-50 text-gray-900">
      {/* Hero Section */}
      <section className="py-20 text-center bg-orange-100 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold text-orange-600"
        >
          Contact Us
        </motion.h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Have questions, feedback, or want to collaborate? We’d love to hear from you.
        </p>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Send us a Message</h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-white rounded-lg text-gray-900 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-white rounded-lg text-gray-900 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 border border-white rounded-lg text-gray-900 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-white rounded-lg text-gray-900 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-700 transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="bg-orange-50 p-6 rounded-2xl shadow-md flex items-start gap-4">
            <Mail className="w-7 h-7 text-orange-600" />
            <div>
              <h3 className="font-semibold text-lg">Email Us</h3>
              <p className="text-gray-700">support@astroplanets.com</p>
            </div>
          </div>
          <div className="bg-orange-50 p-6 rounded-2xl shadow-md flex items-start gap-4">
            <Phone className="w-7 h-7 text-orange-600" />
            <div>
              <h3 className="font-semibold text-lg">Call Us</h3>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
          </div>
          <div className="bg-orange-50 p-6 rounded-2xl shadow-md flex items-start gap-4">
            <MapPin className="w-7 h-7 text-orange-600" />
            <div>
              <h3 className="font-semibold text-lg">Visit Us</h3>
              <p className="text-gray-700">123 Galaxy Avenue, Delhi, India</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Map Section */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.50715108155!2d77.06889963502458!3d28.527280343409085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce26e5e9a5c4f%3A0x6f8f3f76d8cf66d7!2sDelhi!5e0!3m2!1sen!2sin!4v1695893714701!5m2!1sen!2sin"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-orange-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Let’s Connect 🌟</h2>
        <p className="mb-6 text-lg max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? Reach out today—we’d love to chat!
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg shadow-lg hover:bg-orange-100 transition"
        >
          Start a Conversation
        </motion.button>
      </section>
    </div>
  );
};

export default ContactPage;
