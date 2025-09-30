// src/pages/DemoVideoPage.jsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DemoVideoPage = () => {
  const { isAuthenticated, remainingTime } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            🌟 Demo Course Video
          </h1>
          <p className="text-gray-600">
            Your session will expire automatically after 1 hour. <br />
            Remaining time:{" "}
            <span className="font-semibold text-orange-600">
              {formatTime(remainingTime)}
            </span>
          </p>
        </div>

        {/* Video */}
        <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/RKpXxsAEJJI?start=2" // Replace with real astrology/educational video
            title="Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Course Overview */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📘 Course Overview
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This demo session is a glimpse into our full Astrology Mastery
            Program. You will learn how planetary alignments affect life
            decisions, basic chart reading techniques, and how to apply
            astrological wisdom in day-to-day life.
          </p>
        </section>

        {/* Learning Outcomes */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-orange-100 rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              What You’ll Learn
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Basics of astrology and zodiac signs</li>
              <li>How to read a natal chart</li>
              <li>Understanding planetary influences</li>
              <li>Practical applications in life</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Who This Course is For
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Beginners curious about astrology</li>
              <li>Students of spirituality and self-growth</li>
              <li>Anyone seeking life guidance</li>
              <li>Professionals exploring astrology as a career</li>
            </ul>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📂 Additional Resources
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              📑 <a href="/" className="text-orange-600 hover:underline">Download Astrology Basics PDF</a>
            </li>
            <li>
              🎧 <a href="/" className="text-orange-600 hover:underline">Podcast: Role of Planets</a>
            </li>
            <li>
              📰 <a href="/" className="text-orange-600 hover:underline">Blog: Astrology in Modern Life</a>
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="bg-orange-50 rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">❓ FAQ</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Q: Is this course beginner-friendly?</strong> <br />
              Yes! No prior knowledge is required.
            </p>
            <p>
              <strong>Q: Will I get lifetime access?</strong> <br />
              Yes, once enrolled in the premium version.
            </p>
            <p>
              <strong>Q: Can I get a certificate?</strong> <br />
              Absolutely! Certificates are issued for premium courses.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={() => navigate("/courses")}
            className="px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:from-orange-500 hover:to-orange-600 transition transform hover:scale-105"
          >
            🚀 Enroll in Full Course Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoVideoPage;
