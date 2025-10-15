import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import anime from "animejs";
import { Eye, Heart } from "lucide-react";

export default function GallerySection({ scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const imagesRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const yBg = useTransform(scrollProgress || { current: 0 }, [0.4, 0.6], [-35, 35]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.4, 0.6], [0, -20]);

  // Scroll-controlled reveal animation using Anime.js
  useEffect(() => {
    const handleScroll = () => {
      const section = ref.current;
      if (!section || hasAnimated) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));

      if (scrollProgress > 0.4 && scrollProgress < 0.6) {
        // Fade in and slide from right
        anime({
          targets: section,
          translateX: [50, 0],
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

  // Staggered image animations
  useEffect(() => {
    if (isInView && imagesRef.current) {
      anime({
        targets: imagesRef.current.children,
        translateY: [80, 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        rotateY: [-15, 0],
        delay: anime.stagger(300, { start: 800 }),
        duration: 1000,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  }, [isInView]);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&q=80",
      alt: "Elegant Aqeeq necklace",
      title: "Celestial Harmony",
      desc: "A masterpiece of blue Aqeeq stones"
    },
    {
      src: "https://images.unsplash.com/photo-1574169208507-8437617482de?w=500&q=80",
      alt: "Red Aqeeq bracelet",
      title: "Crimson Elegance",
      desc: "Vibrant red stones in gold setting"
    },
    {
      src: "https://images.unsplash.com/photo-1611085583200-a3b181a88402?w=500&q=80",
      alt: "White Aqeeq ring",
      title: "Pure Serenity",
      desc: "Timeless white Aqeeq craftsmanship"
    },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">

      {/* Glassmorphism background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-amber-50/30 backdrop-blur-sm"
      />

      {/* Luxury accent elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-24 h-24 border border-amber-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-blue-400 rounded-full"></div>
      </div>

      <motion.div
        style={{ y: yContent }}
        className="relative max-w-7xl mx-auto px-6"
      >
        {/* Glassmorphism container */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-4 bg-amber-50/50 px-4 py-2 rounded-full border border-amber-200/50">
              Visual Showcase
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 via-amber-800 to-slate-900 bg-clip-text text-transparent">
              Gallery
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-32 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto mb-8 rounded-full shadow-lg"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-xl text-slate-700 font-light max-w-3xl mx-auto"
            >
              Immerse yourself in the breathtaking beauty of our handcrafted Aqeeq collections, where tradition meets contemporary elegance.
            </motion.p>
          </motion.div>

          <div ref={imagesRef} className="grid md:grid-cols-3 gap-8">
            {images.map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.1 }}
                className="group cursor-pointer"
              >
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:shadow-amber-500/20 transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-80 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-bold text-xl mb-2">{image.title}</h3>
                      <p className="text-sm opacity-90 mb-4">{image.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm hover:text-amber-300 transition-colors">
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button className="flex items-center gap-1 text-sm hover:text-red-300 transition-colors">
                            <Heart className="w-4 h-4" />
                            Like
                          </button>
                        </div>
                        <span className="text-xs bg-amber-500/80 px-2 py-1 rounded-full">Premium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="text-center mt-16"
          >
            <p className="text-slate-600 mb-6 font-light">Experience the full collection in person</p>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all duration-300">
              Visit Our Booth
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
