import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import anime from "animejs";
import { useCursor } from "./CursorTrail";

export default function CollectionSection({ scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { setCursorType } = useCursor();
  const cardsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const yBg = useTransform(scrollProgress || { current: 0 }, [0.2, 0.4], [-30, 30]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.2, 0.4], [0, -15]);

  // Scroll-controlled reveal animation using Anime.js
  useEffect(() => {
    const handleScroll = () => {
      const section = ref.current;
      if (!section || hasAnimated) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));

      if (scrollProgress > 0.2 && scrollProgress < 0.8) {
        // Fade in and slide up from bottom
        anime({
          targets: section,
          translateY: [100, 0],
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

  // Anime.js staggered cards animation
  useEffect(() => {
    if (isInView && cardsRef.current) {
      anime({
        targets: cardsRef.current.children,
        translateY: [80, 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        rotateX: [-15, 0],
        delay: anime.stagger(300, { start: 800 }),
        duration: 1000,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  }, [isInView]);

  const items = [
    { title: "Red Aqeeq", desc: "Bright red, pure energy", img: "https://images.unsplash.com/photo-1574169208507-8437617482de?w=400&q=80" },
    { title: "Blue Aqeeq", desc: "Calm and serene", img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80" },
    { title: "White Aqeeq", desc: "Purity and elegance", img: "https://images.unsplash.com/photo-1611085583200-a3b181a88402?w=400&q=80" },
  ];

  return (
    <motion.section
      id="collection"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50"
    >

      {/* Enhanced background with moving gradients and particles */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-blue-50/30 backdrop-blur-sm"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(251,191,36,0.3) 0%, transparent 50%, rgba(59,130,246,0.3) 100%)",
            "linear-gradient(135deg, rgba(59,130,246,0.3) 0%, transparent 50%, rgba(251,191,36,0.3) 100%)",
            "linear-gradient(135deg, rgba(251,191,36,0.3) 0%, transparent 50%, rgba(59,130,246,0.3) 100%)"
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-blue-500 rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + i * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.8, 1]
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      {/* Luxury accent elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 border-2 border-amber-400 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-16 h-16 border-2 border-blue-400 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        style={{ y: yContent }}
        className="relative max-w-7xl mx-auto px-6"
      >
        {/* Glassmorphism container */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-slate-900 mb-4 bg-gradient-to-r from-slate-900 via-amber-800 to-slate-900 bg-clip-text text-transparent"
          >
            Our Collection
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-32 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto mb-12 rounded-full shadow-lg"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-700 text-center mb-16 font-light max-w-3xl mx-auto"
          >
            Discover our exquisite selection of handcrafted Aqeeq jewelry, each piece telling a story of elegance and tradition.
          </motion.p>

          <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.1 }}
                className="group cursor-pointer"
                onMouseEnter={() => setCursorType('image')}
                onMouseLeave={() => setCursorType('default')}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  rotateX: 5
                }}
                whileHoverTransition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:shadow-amber-500/20 transition-all duration-500"
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.25)" }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    {/* Hover overlay with glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    />
                  </div>
                  <div className="p-6">
                    <motion.h3
                      className="font-bold text-xl text-slate-900 mb-2 group-hover:text-amber-700 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      className="text-slate-700 font-light"
                      whileHover={{ color: "#64748b" }}
                    >
                      {item.desc}
                    </motion.p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full">Premium</span>
                      <motion.div
                        className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-white text-xs font-bold">★</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
