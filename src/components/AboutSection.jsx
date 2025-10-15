import React, { useRef, useEffect } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { Heart, Users, Gem } from "lucide-react";
import anime from "animejs";
import { useCursor } from "./CursorTrail";

export default function AboutSection({ scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { setCursorType } = useCursor();
  const iconsRef = useRef(null);

  const yBg1 = useTransform(scrollProgress || { current: 0 }, [0.1, 0.3], [-50, 50]);
  const yBg2 = useTransform(scrollProgress || { current: 0 }, [0.1, 0.3], [50, -50]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.1, 0.3], [0, -20]);

  // Scroll-controlled reveal animation using Anime.js
  useEffect(() => {
    const handleScroll = () => {
      const section = ref.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));

      if (scrollProgress > 0.1 && scrollProgress < 0.9) {
        // Fade in and scale up the entire section
        anime({
          targets: section,
          opacity: [0, 1],
          scale: [0.95, 1],
          filter: ['blur(10px)', 'blur(0px)'],
          duration: 800,
          easing: 'easeOutCubic'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Anime.js staggered icons animation
  useEffect(() => {
    if (isInView && iconsRef.current) {
      anime({
        targets: iconsRef.current.children,
        translateY: [50, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(200, { start: 1000 }),
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
      });
    }
  }, [isInView]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-cream-50 to-slate-100"
    >
      {/* Enhanced background with moving gradients and particles */}
      <motion.div
        style={{ y: yBg1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-blue-200/20 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl -translate-y-1/2 translate-x-1/2"
        animate={{
          background: [
            "radial-gradient(circle, rgba(251,191,36,0.2) 0%, rgba(59,130,246,0.2) 100%)",
            "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(251,191,36,0.2) 100%)",
            "radial-gradient(circle, rgba(251,191,36,0.2) 0%, rgba(59,130,246,0.2) 100%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        style={{ y: yBg2 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tl from-blue-200/20 to-amber-200/20 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl translate-y-1/2 -translate-x-1/2"
        animate={{
          background: [
            "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(251,191,36,0.2) 100%)",
            "radial-gradient(circle, rgba(251,191,36,0.2) 0%, rgba(59,130,246,0.2) 100%)",
            "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(251,191,36,0.2) 100%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Luxury accent elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-amber-400 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 border border-blue-400 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        style={{ y: yContent }}
        className="relative max-w-6xl mx-auto text-center px-6"
      >
        {/* Glassmorphism container */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4 bg-amber-50/50 px-4 py-2 rounded-full border border-amber-200/50"
          >
            Our Story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 via-amber-800 to-slate-900 bg-clip-text text-transparent"
          >
            A Journey of Passion
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto mb-8 rounded-full shadow-lg"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-4xl mx-auto font-light"
          >
            <span className="font-semibold text-slate-900 bg-amber-50/30 px-2 py-1 rounded">Crystals of Luxury</span> began as a vision shared by passionate students preparing for our school's Student Souk event. We chose <span className="font-semibold text-blue-900 bg-blue-50/30 px-2 py-1 rounded">Aqeeq stones</span> for their extraordinary beauty, rarity, and deep cultural significance.
          </motion.p>

          {/* Luxury icons with Anime.js animation */}
          <div
            ref={iconsRef}
            className="flex justify-center gap-8 mt-12"
          >
            <motion.div
              className="text-center group cursor-pointer"
              onMouseEnter={() => setCursorType('card')}
              onMouseLeave={() => setCursorType('default')}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
              <p className="text-sm text-slate-600 font-medium group-hover:text-amber-600 transition-colors">Passion</p>
            </motion.div>
            <motion.div
              className="text-center group cursor-pointer"
              onMouseEnter={() => setCursorType('card')}
              onMouseLeave={() => setCursorType('default')}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Gem className="w-8 h-8 text-white" />
              </motion.div>
              <p className="text-sm text-slate-600 font-medium group-hover:text-blue-600 transition-colors">Craftsmanship</p>
            </motion.div>
            <motion.div
              className="text-center group cursor-pointer"
              onMouseEnter={() => setCursorType('card')}
              onMouseLeave={() => setCursorType('default')}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <p className="text-sm text-slate-600 font-medium group-hover:text-slate-600 transition-colors">Community</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
