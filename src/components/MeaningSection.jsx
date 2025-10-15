import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import anime from "animejs";
import { Sparkles, Shield, Heart, Zap } from "lucide-react";

export default function MeaningSection({ scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const contentRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const yBg = useTransform(scrollProgress || { current: 0 }, [0.3, 0.5], [-40, 40]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.3, 0.5], [0, -25]);

  // Scroll-controlled reveal animation using Anime.js
  useEffect(() => {
    const handleScroll = () => {
      const section = ref.current;
      if (!section || hasAnimated) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));

      if (scrollProgress > 0.3 && scrollProgress < 0.7) {
        // Fade in and slide from left
        anime({
          targets: section,
          translateX: [-50, 0],
          opacity: [0, 1],
          scale: [0.95, 1],
          filter: ['blur(10px)', 'blur(0px)'],
          duration: 1000,
          easing: 'easeOutCubic',
          complete: () => setHasAnimated(true)
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  const meanings = [
    { icon: Shield, title: "Protection", desc: "Wards off negative energy and provides spiritual protection" },
    { icon: Heart, title: "Harmony", desc: "Promotes inner peace and emotional balance" },
    { icon: Zap, title: "Energy", desc: "Amplifies positive vibrations and creative flow" },
    { icon: Sparkles, title: "Wisdom", desc: "Enhances clarity of thought and decision-making" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-cream-50">

      {/* Glassmorphism background elements */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-blue-50/20 backdrop-blur-sm"
      />

      {/* Luxury geometric patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 border border-amber-400 transform rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-blue-400 transform -rotate-45"></div>
      </div>

      <motion.div
        style={{ y: yContent }}
        className="relative max-w-6xl mx-auto px-6"
      >
        {/* Glassmorphism container */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4 bg-amber-50/50 px-4 py-2 rounded-full border border-amber-200/50">
              Spiritual Significance
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 via-amber-800 to-slate-900 bg-clip-text text-transparent">
              Meaning Behind Aqeeq
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto mb-8 rounded-full shadow-lg"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-700 leading-relaxed text-center mb-16 font-light max-w-4xl mx-auto"
          >
            Aqeeq stones have been treasured for centuries, symbolizing <span className="font-semibold text-amber-700 bg-amber-50/30 px-2 py-1 rounded">strength</span>, <span className="font-semibold text-blue-700 bg-blue-50/30 px-2 py-1 rounded">protection</span>, <span className="font-semibold text-green-700 bg-green-50/30 px-2 py-1 rounded">positivity</span>, and <span className="font-semibold text-purple-700 bg-purple-50/30 px-2 py-1 rounded">grounding energy</span>. Each piece carries unique energy and patterns that inspire creativity and focus.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {meanings.map((meaning, idx) => (
              <motion.div
                key={meaning.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + 0.1 * idx }}
                className="text-center group"
              >
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-amber-500/10 transition-all duration-500 group-hover:bg-white/10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <meaning.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">{meaning.title}</h3>
                  <p className="text-slate-600 text-sm font-light leading-relaxed">{meaning.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <blockquote className="text-2xl md:text-3xl text-slate-800 font-light italic max-w-4xl mx-auto leading-relaxed">
              "In the heart of every Aqeeq lies a story of resilience, beauty, and timeless wisdom passed down through generations."
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <Sparkles className="w-5 h-5 text-amber-500" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
