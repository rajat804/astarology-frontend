// HomePage.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineShoppingCart,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineMail,
} from "react-icons/hi";
import { RiStarSLine } from "react-icons/ri";
import { GiCrystalBall } from "react-icons/gi";
import { FaChevronLeft, FaChevronRight, FaCheck, FaStar } from "react-icons/fa";

/**
 * Premium HomePage with Products added.
 * Requires: tailwindcss, framer-motion, react-icons
 */

/* ---------- Helpers ---------- */
const Accent = ({ children }) => (
  <span className="text-orange-600">{children}</span>
);

const CTA = ({ children, className = "", ...rest }) => (
  <button
    {...rest}
    className={
      "inline-flex items-center gap-3 px-5 py-2 rounded-2xl font-semibold shadow-md text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition " +
      className
    }
  >
    {children}
  </button>
);

function useCount(to = 0, duration = 1400) {
  const [num, setNum] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const loop = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setNum(Math.round(progress * to));
      if (progress < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return num;
}

/* ---------- HERO ---------- */
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-orange-50">
      {/* decorative shapes */}
      <svg
        className="absolute -right-48 -top-32 opacity-20 pointer-events-none"
        width="700"
        height="700"
        viewBox="0 0 700 700"
        fill="none"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#fff7ed" />
            <stop offset="1" stopColor="#ffe7d7" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="260" fill="url(#g1)" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 bg-orange-100/60 text-orange-700 px-3 py-1 rounded-full text-sm font-medium w-max shadow-sm">
              <RiStarSLine /> Featured
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Elevate your life with <Accent>astrology</Accent>, yoga &
              authentic ritual tools
            </h1>

            <p className="text-gray-600 max-w-2xl text-lg">
              Personalized consultations, premium courses, and ethically sourced
              products — all designed to help you live with clarity, balance,
              and intention.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <CTA>Book a Consultation</CTA>
              <button className="px-5 py-2 rounded-2xl border border-orange-200 text-orange-600 font-semibold hover:bg-orange-50 transition">
                Browse Products
              </button>
            </div>

            <div className="flex gap-6 items-center mt-4">
              <div className="flex items-center gap-3 bg-white/70 px-3 py-2 rounded-lg shadow-sm backdrop-blur">
                <HiOutlineUser className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="text-sm font-semibold">4.9/5</div>
                  <div className="text-xs text-gray-500">Avg. rating</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/70 px-3 py-2 rounded-lg shadow-sm backdrop-blur">
                <GiCrystalBall className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="text-sm font-semibold">2500+</div>
                  <div className="text-xs text-gray-500">Clients served</div>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-3 bg-white/70 px-3 py-2 rounded-lg shadow-sm backdrop-blur">
                <HiOutlineShoppingCart className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="text-sm font-semibold">500+</div>
                  <div className="text-xs text-gray-500">Products</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: layered cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl transform -translate-y-2">
                <img
                  src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop"
                  alt="hero"
                  className="w-full h-[420px] object-cover"
                />
              </div>

              {/* floating card 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute left-6 top-6 bg-white/90 backdrop-blur-sm border border-orange-50 rounded-2xl p-4 w-60 shadow-lg"
              >
                <div className="text-xs text-gray-500">Next Live Workshop</div>
                <div className="font-semibold">Moon Rituals • May 8</div>
                <div className="text-xs text-gray-400 mt-1">Seats left: 8</div>
                <div className="mt-3">
                  <button className="w-full px-3 py-2 bg-orange-400 text-white rounded-lg font-semibold">
                    Reserve
                  </button>
                </div>
              </motion.div>

              {/* floating card 2 (bottom-right) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute right-6 bottom-6 bg-gradient-to-tr from-white/70 to-orange-50 backdrop-blur-sm border border-orange-100 rounded-2xl p-4 w-64 shadow-xl"
              >
                <div className="text-xs text-gray-500">Intro Offer</div>
                <div className="font-semibold text-gray-900">
                  First consult 20% OFF
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Use code: WELCOME20
                </div>
                <div className="mt-3">
                  <button className="w-full px-3 py-2 bg-orange-500 text-white rounded-lg font-semibold">
                    Book Now
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ---------- STATS ---------- */
const Stats = () => {
  const clients = useCount(2580, 1600);
  const classes = useCount(120, 1400);
  const products = useCount(520, 1400);
  const rating = useCount(49, 1400); // shows 4.9

  return (
    <section className="py-10 -mt-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow"
        >
          <div className="text-sm text-gray-500">Happy Clients</div>
          <div className="mt-2 font-bold text-2xl text-gray-900">
            {clients.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400 mt-1">and growing</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow"
        >
          <div className="text-sm text-gray-500">Live Classes</div>
          <div className="mt-2 font-bold text-2xl text-gray-900">
            {classes}+
          </div>
          <div className="text-xs text-gray-400 mt-1">recorded & live</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow"
        >
          <div className="text-sm text-gray-500">Authentic Products</div>
          <div className="mt-2 font-bold text-2xl text-gray-900">
            {products}+
          </div>
          <div className="text-xs text-gray-400 mt-1">certified & sourced</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow"
        >
          <div className="text-sm text-gray-500">Avg. Rating</div>
          <div className="mt-2 font-bold text-2xl text-gray-900">
            {(rating / 10).toFixed(1)} / 5
          </div>
          <div className="text-xs text-gray-400 mt-1">based on reviews</div>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- SERVICES ---------- */
const Services = () => {
  const services = [
    {
      title: "One-on-one Natal Chart Reading",
      desc: "Deep, personalized chart analysis, career & relationship guidance.",
      duration: "60 min",
      price: "₹2,499",
      img: "https://media.istockphoto.com/id/1935644904/photo/zodiac-wheel-natal-chart-astrology-dices-and-stones-on-grey-table-flat-lay.jpg?s=612x612&w=0&k=20&c=128i99Orc9Y_RU3nSYKNLjf-INw5inM6q_H9FDCi_JE=",
    },
    {
      title: "Numerology Life Path Report",
      desc: "Actionable insights from your core numbers and cycles.",
      duration: "45 min",
      price: "₹1,299",
      img: "https://astrala.imgix.net/3GFULF5okVu23twscOo7Fd/7406ee47eac22e71767ea4f4ec1412c7/life-path-number-7-meaning.jpg?w=3840&h=2560&fit=crop&q=60&auto=format,compress",
    },
    {
      title: "Vastu Home Harmony Session",
      desc: "Practical remedies to balance your living & working space.",
      duration: "90 min",
      price: "₹3,999",
      img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Premium Consultation Services
            </h3>
            <p className="text-gray-600">
              Book curated sessions crafted by senior practitioners.
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <button className="px-4 py-2 rounded-lg border border-orange-100 text-orange-600">
              View all
            </button>
            <CTA>Book a Slot</CTA>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_18px_60px_rgba(255,140,64,0.08)] transform hover:-translate-y-2 transition"
            >
              <div className="relative h-48">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute left-4 top-4 bg-white/80 backdrop-blur px-3 py-1 rounded-lg text-xs font-semibold">
                  Expert
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  {s.title}
                </h4>
                <p className="text-gray-600 text-sm">{s.desc}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="inline-flex items-center gap-2">
                      <HiOutlineCalendar className="w-5 h-5 text-orange-400" />
                      <span>{s.duration}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-gray-500">From</div>
                    <div className="text-lg font-bold text-gray-900">
                      {s.price}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-3">
                  <button className="flex-1 px-4 py-2 rounded-xl border border-orange-100 text-orange-600 font-semibold hover:bg-orange-50">
                    Details
                  </button>
                  <CTA className="flex-none">Book Now</CTA>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- PRODUCTS (NEW, premium cards) ---------- */
const Products = () => {
  const items = [
    {
      id: "p1",
      name: "Premium Rudraksh Mala",
      price: "₹1,799",
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1606813902914-272f09fa0f79",
      badge: "Handpicked",
    },
    {
      id: "p2",
      name: "Clear Quartz Cluster",
      price: "₹1,299",
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1587394204583-19a3a7a2a4a2",
      badge: "Certified",
    },
    {
      id: "p3",
      name: "Copper Yantra Plate",
      price: "₹2,199",
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1589739907150-b89e3f7b2b58",
      badge: "Limited",
    },
    {
      id: "p4",
      name: "Selenite Charging Plate",
      price: "₹899",
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1555252332-5c808b0f7289",
      badge: "New",
    },
  ];

  const [quick, setQuick] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (p) => setCart((c) => [...c, p]);

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Featured Products
            </h3>
            <p className="text-gray-600">
              Ethically sourced, quality-checked spiritual tools.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg border border-orange-100 text-orange-600">
              View catalogue
            </button>
            <CTA>Go to Shop</CTA>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-orange-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="relative h-56">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute left-4 top-4 bg-white/90 text-xs px-3 py-1 rounded-xl font-semibold">
                  {p.badge}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-gray-900">{p.name}</h4>
                  <div className="text-orange-600 font-bold">{p.price}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center text-sm text-yellow-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <FaStar
                        key={idx}
                        className={`w-3 h-3 ${
                          idx < Math.round(p.rating) ? "" : "opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500">
                    · {p.rating.toFixed(1)}
                  </div>
                </div>

                <p className="text-gray-600 text-sm">
                  Quality assured • 7-day returns • Tracked shipping
                </p>

                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => setQuick(p)}
                    className="px-3 py-2 rounded-lg border border-orange-100 text-orange-600 font-semibold hover:bg-orange-50"
                  >
                    Quick view
                  </button>
                  <button
                    onClick={() => addToCart(p)}
                    className="flex-1 px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick view modal */}
        <AnimatePresence>
          {quick && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-2xl shadow-lg max-w-2xl w-full overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto">
                    <img
                      src={quick.img}
                      alt={quick.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">{quick.name}</h4>
                      <div className="text-orange-600 font-bold">
                        {quick.price}
                      </div>
                    </div>
                    <div className="mt-3 text-gray-600">
                      High quality, ethically sourced item with authenticity
                      notes and care instructions.
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => {
                          setQuick(null);
                          setCart((c) => [...c, quick]);
                        }}
                        className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => setQuick(null)}
                        className="px-4 py-2 rounded-lg border"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ---------- FEATURES LIST ---------- */
const FeaturesList = () => {
  const items = [
    "Personalized charts & follow-up notes",
    "Flexible scheduling, instant reminders",
    "Certified experts with 10+ years experience",
    "Secure payments & easy refunds",
    "Global delivery of products with tracking",
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold">What makes us premium</h3>
            <p className="text-gray-600 mt-3">
              We blend time-tested systems with modern UX and high quality
              products — so your experience is seamless and meaningful.
            </p>

            <ul className="mt-6 space-y-4">
              {items.map((it, idx) => (
                <li key={it} className="flex items-start gap-3">
                  <div className="mt-1 text-orange-500">
                    <FaCheck />
                  </div>
                  <div>
                    <div className="font-semibold">{it}</div>
                    <div className="text-sm text-gray-500">
                      Carefully curated to ensure authenticity and clarity.
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-50 to-white/80 p-6">
            <img
              src="https://astrala.imgix.net/3GFULF5okVu23twscOo7Fd/7406ee47eac22e71767ea4f4ec1412c7/life-path-number-7-meaning.jpg?w=3840&h=2560&fit=crop&q=60&auto=format,compress"
              alt="premium"
              className="w-full h-64 object-cover rounded-xl shadow"
            />
            <div className="mt-4 text-sm text-gray-600">
              <strong>Complimentary:</strong> Short follow-up note with every
              consultation to help implement insights.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- INSTRUCTORS ---------- */
const Instructors = () => {
  const mentors = [
    {
      name: "S. Sharma",
      role: "Senior Astrologer",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    },
    {
      name: "Ritu Kapoor",
      role: "Vastu Expert",
      img: "https://images.unsplash.com/photo-1545996124-8e04a3d2c4a2",
    },
    {
      name: "Maya Patel",
      role: "Yoga Instructor",
      img: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d",
    },
  ];

  return (
    <section className="py-14 bg-orange-50">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-2xl font-bold mb-4">Meet our experts</h3>
        <p className="text-gray-600 mb-6">
          Carefully selected practitioners with deep traditional knowledge.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {mentors.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-2xl p-4 shadow-lg text-center"
            >
              <div className="mx-auto w-28 h-28 rounded-full overflow-hidden shadow-md">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 font-semibold text-lg">{m.name}</div>
              <div className="text-sm text-gray-500">{m.role}</div>
              <div className="mt-4 flex justify-center gap-3">
                <button className="px-3 py-1 rounded-lg border border-orange-100 text-orange-600">
                  View profile
                </button>
                <button className="px-3 py-1 rounded-lg bg-orange-400 text-white">
                  Book
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- TESTIMONIALS (carousel) ---------- */
const Testimonials = () => {
  const reviews = [
    {
      name: "Anjali K.",
      text: "Transformed my perspective — accurate and empathetic reading.",
    },
    {
      name: "Rohit S.",
      text: "Amazing courses and practical exercises. Highly recommended.",
    },
    {
      name: "Priya M.",
      text: "The gemstone I ordered felt so authentic. Great packaging!",
    },
  ];
  const [idx, setIdx] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % reviews.length);
    }, 5500);
    return () => clearTimeout(timeoutRef.current);
  }, [idx]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-3">Trusted voices</h3>
        <p className="text-gray-600 mb-8">
          Stories from clients who felt guided and supported.
        </p>

        <div className="relative">
          <div className="h-48">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="bg-orange-50 rounded-2xl p-8 shadow-lg"
              >
                <p className="italic text-gray-700">“{reviews[idx].text}”</p>
                <div className="mt-4 font-semibold text-orange-600">
                  — {reviews[idx].name}
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() =>
                setIdx((i) => (i - 1 + reviews.length) % reviews.length)
              }
              className="p-2 rounded-full bg-white shadow"
              aria-label="previous"
            >
              <FaChevronLeft />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full ${
                    i === idx ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIdx((i) => (i + 1) % reviews.length)}
              className="p-2 rounded-full bg-white shadow"
              aria-label="next"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- FAQ (accordion) ---------- */
const FAQ = () => {
  const faqs = [
    {
      q: "How do I prepare for a consultation?",
      a: "Prepare a list of questions and have your birth details (date/time/place) handy for astrology sessions.",
    },
    {
      q: "Are the products certified?",
      a: "Yes — all gemstones and ritual items are authenticated and accompanied by quality notes.",
    },
    {
      q: "What payment options do you accept?",
      a: "Stripe, Razorpay, and major cards. Secure checkout with PCI compliance.",
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-2xl font-bold mb-4">Frequently asked</h3>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow p-4"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex justify-between items-center gap-4"
              >
                <div>
                  <div className="font-semibold">{f.q}</div>
                  <div className="text-sm text-gray-500">
                    {open === i ? "Close" : "Read answer"}
                  </div>
                </div>
                <div
                  className={`transform transition ${
                    open === i ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="#374151"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-gray-600 text-sm"
                  >
                    {f.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- BLOG PREVIEW ---------- */
const BlogPreview = () => {
  const posts = [
    {
      title: "Decoding Your Natal Chart",
      tag: "Astrology",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      title: "Meditation for Busy People",
      tag: "Wellness",
      img: "https://images.unsplash.com/photo-1512303452023-8de2a16ab9aa",
    },
    {
      title: "Choosing Crystals That Work",
      tag: "Crystals",
      img: "https://images.unsplash.com/photo-1513185158878-4ae0380f9cc3",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-2xl font-bold mb-6">Latest Articles</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4 bg-orange-50">
                  <div className="text-xs text-orange-600 mb-2 font-semibold">
                    {p.tag}
                  </div>
                  <h4 className="font-semibold text-gray-900">{p.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    A short preview of the article...
                  </p>
                  <button className="mt-3 text-orange-600 font-semibold hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- NEWSLETTER ---------- */
const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-400 to-orange-500 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold">Join our inner circle</h3>
        <p className="mt-3 text-white/90">
          Monthly horoscopes, exclusive workshops & priority bookings —
          delivered to your inbox.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <input
            aria-label="Email"
            type="email"
            placeholder="Your best email"
            className="px-4 py-3 rounded-l-lg w-full sm:w-auto min-w-[260px] text-white 
             bg-transparent border border-white placeholder-white/70
             focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
          />

          <button className="px-5 py-3 rounded-r-lg bg-white text-orange-600 font-semibold">
            Subscribe
          </button>
        </div>

        <div className="mt-4 text-sm text-white/90">
          No spam. Unsubscribe anytime.
        </div>
      </div>
    </section>
  );
};

/* ---------- FINAL HOMEPAGE ---------- */
export default function HomePage() {
  return (
    <div className="bg-white text-gray-900">
      <Hero />
      <Stats />
      <Services />
      <Products /> {/* ← NEW section added (keeps everything else) */}
      <FeaturesList />
      <Instructors />
      <Testimonials />
      <FAQ />
      <BlogPreview />
      <Newsletter />
    </div>
  );
}
