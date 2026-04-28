// components/home/BlogPreview.jsx
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const BlogPreview = () => {
  const posts = [
    {
      title: "Decoding Your Natal Chart",
      tag: "Astrology",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      date: "Dec 15, 2024",
      readTime: "5 min read",
    },
    {
      title: "Meditation for Busy People",
      tag: "Wellness",
      img: "https://images.unsplash.com/photo-1512303452023-8de2a16ab9aa",
      date: "Dec 10, 2024",
      readTime: "4 min read",
    },
    {
      title: "Choosing Crystals That Work",
      tag: "Crystals",
      img: "https://images.unsplash.com/photo-1513185158878-4ae0380f9cc3",
      date: "Dec 5, 2024",
      readTime: "6 min read",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-amber-500/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs md:text-sm font-semibold text-amber-400">Our Blog</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Latest Articles
          </h3>
          <p className="text-gray-400 mt-2">
            Insights, guides, and wisdom from our experts
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-500/20 bg-gray-800 hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  
                  {/* Tag Badge */}
                  <div className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold text-gray-900">
                    {p.tag}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  {/* Meta Info */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{p.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{p.readTime}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-white text-lg leading-tight mb-2 group-hover:text-amber-400 transition-colors duration-300">
                    {p.title}
                  </h4>
                  
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                    Discover the ancient wisdom and modern insights about {p.title.toLowerCase()}. Learn how this ancient practice can transform your life...
                  </p>
                  
                  <button className="mt-4 text-amber-400 font-semibold hover:text-amber-300 transition-colors duration-300 flex items-center gap-2 group/btn">
                    Read More
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-center mt-10"
        >
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-amber-500/30 text-amber-400 font-semibold hover:bg-amber-500/10 transition-all duration-300">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;