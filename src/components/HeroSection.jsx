import React, { useState, useEffect, useRef } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useCursor } from "./CursorTrail";
import anime from "animejs";

export default function HeroSection({ scrollProgress }) {
  const { setCursorType } = useCursor();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Parallax effects
  const y = useTransform(scrollProgress, [0, 0.2], [0, 100]);
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.2], [1, 0.5, 0]);
  const scale = useTransform(scrollProgress, [0, 0.2], [1, 0.95]);

  // Mouse interaction for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Anime.js staggered text animation
  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.letter');
      anime({
        targets: letters,
        opacity: [0, 1],
        translateY: [50, 0],
        rotateX: [-90, 0],
        delay: anime.stagger(100, { start: 500 }),
        duration: 800,
        easing: 'easeOutExpo'
      });
    }

    if (subtitleRef.current) {
      const words = subtitleRef.current.querySelectorAll('.word');
      anime({
        targets: words,
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(150, { start: 1200 }),
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  }, []);

  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Word-by-word animation
  const words = "Crystals of Luxury".split(" ");

  return (
    <motion.section
      style={{ opacity, scale, rotateX, rotateY }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Content with parallax */}
      <motion.div style={{ y }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="mb-12"
        >
          <div className="inline-block relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-blue-500 rounded-full blur-2xl opacity-40"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-8 inline-block">
              <motion.div
                className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-20 h-20 md:w-32 md:h-32 text-amber-400" strokeWidth={1} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Brand Name - Letter by letter animation with Anime.js */}
        <div ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          <span className="inline-block mr-4">
            {'Crystals'.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className="letter inline-block"
                style={{ display: 'inline-block' }}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="inline-block mr-4">
            {'of'.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className="letter inline-block"
                style={{ display: 'inline-block' }}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="inline-block">
            {'Luxury'.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className="letter inline-block"
                style={{ display: 'inline-block' }}
              >
                {letter}
              </span>
            ))}
          </span>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-2xl md:text-3xl text-amber-300 mb-4 font-light tracking-wide"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Elegance in Every Stone
        </motion.p>

        {/* Subtitle with word-by-word reveal using Anime.js */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-blue-200 mb-12 max-w-2xl mx-auto font-light"
        >
          {"Handcrafted Aqeeq jewelry that carries tradition, meaning, and timeless beauty".split(' ').map((word, index) => (
            <span key={index} className="word inline-block mr-2">
              {word}
            </span>
          ))}
        </p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.button
            onClick={scrollToCollection}
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
            className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-10 py-6 text-lg rounded-full shadow-2xl transition-all duration-500 group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center">
              Explore the Collection
              <motion.div
                className="ml-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-amber-400" />
        </motion.div>
      </motion.div>


    </motion.section>
  );
}
