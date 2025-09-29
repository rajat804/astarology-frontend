// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import assets from "../assets/assets";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-orange-200 to-orange-100 items-center justify-center p-10">
          <img
            src={assets.logo}
            alt="Astro Illustration"
            className="w-72 h-auto drop-shadow-lg"
          />
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Welcome Back 👋
                </h2>
                <form className="space-y-5">
                  <div className="relative">
                    <HiOutlineMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-gradient-to-r from-orange-300 to-orange-500 text-white py-3 rounded-lg font-semibold shadow-md hover:from-orange-400 hover:to-orange-600 transition"
                  >
                    Login
                  </button>
                </form>
                <p className="mt-6 text-gray-600 text-sm text-center">
                  Don’t have an account?{" "}
                  <button
                    onClick={toggleAuth}
                    className="text-orange-500 hover:underline font-medium cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Create Account ✨
                </h2>
                <form className="space-y-5">
                  <div className="relative">
                    <HiOutlineUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-gradient-to-r from-orange-300 to-orange-500 text-white py-3 rounded-lg font-semibold shadow-md hover:from-orange-400 hover:to-orange-600 transition"
                  >
                    Sign Up
                  </button>
                </form>
                <p className="mt-6 text-gray-600 text-sm text-center">
                  Already have an account?{" "}
                  <button
                    onClick={toggleAuth}
                    className="text-orange-500 hover:underline font-medium cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
