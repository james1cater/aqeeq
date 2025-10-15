import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function AnimatedFooter() {
  const [isActive, setIsActive] = useState(false);
  const wrapCtaRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const wrapCta = wrapCtaRef.current;
    const content = contentRef.current;
    if (!wrapCta || !content) return;

    // Anime.js Commons Values for SVG Morph
    const common = {
      targets: '.polymorph',
      easing: 'easeOutQuad',
      duration: 600,
      loop: false
    };

    const handleCtaClick = () => {
      setIsActive(true);
      // Elements appearance
      wrapCta.classList.remove('active');
      content.classList.add('active');

      // Morph SVG
      anime({
        ...common,
        points: [
          { value: '215,110 0,110 186,86 215,0' }
        ],
      });
    };

    const handleCloseClick = () => {
      setIsActive(false);
      // Elements appearance
      content.classList.remove('active');
      wrapCta.classList.add('active');

      // Morph SVG
      anime({
        ...common,
        points: [
          { value: '215,110 0,110 0,0 215,0' }
        ]
      });
    };

    const ctaBtn = wrapCta.querySelector('#cta');
    const closeBtn = content.querySelector('#close');

    ctaBtn.addEventListener('click', handleCtaClick);
    closeBtn.addEventListener('click', handleCloseClick);

    return () => {
      ctaBtn.removeEventListener('click', handleCtaClick);
      closeBtn.removeEventListener('click', handleCloseClick);
    };
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl"
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
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
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
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-xl">C</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
                    Crystals of Luxury
                  </h3>
                  <p className="text-sm text-slate-400">Premium Aqeeq Jewelry</p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-slate-300 leading-relaxed"
              >
                Handcrafted Aqeeq jewelry that combines traditional craftsmanship with contemporary elegance. Each piece tells a story of heritage and beauty.
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex space-x-4"
              >
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-xl font-semibold text-amber-400"
              >
                Contact Us
              </motion.h4>

              <div className="space-y-4">
                {[
                  { icon: Mail, text: "info@crystalsofluxury.com", href: "mailto:info@crystalsofluxury.com" },
                  { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
                  { icon: MapPin, text: "Student Souk Event", href: "#" }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3 text-slate-300 hover:text-amber-400 transition-colors duration-300 group"
                  >
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter Section with Morphing CTA */}
            <div className="space-y-6">
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-xl font-semibold text-amber-400"
              >
                Stay Updated
              </motion.h4>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-slate-300"
              >
                Subscribe to receive updates about new collections and exclusive offers.
              </motion.p>

              {/* Morphing CTA Button */}
              <div className="relative">
                <div id="wrap-cta" ref={wrapCtaRef} className="active">
                  <button
                    id="cta"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Subscribe Now
                  </button>
                </div>

                <svg viewBox="0 0 215 110" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  <polygon
                    className="polymorph fill-amber-500"
                    points="215,110 0,110 0,0 215,0"
                  />
                </svg>

                <div className="container absolute inset-0">
                  <div id="content" ref={contentRef} className="flex items-center justify-center h-full">
                    <div className="bg-slate-800 p-4 rounded-lg shadow-xl max-w-sm w-full">
                      <h3 className="text-lg font-semibold text-amber-400 mb-2">Thank You!</h3>
                      <p className="text-slate-300 text-sm mb-3">You've been subscribed to our newsletter.</p>
                      <button
                        id="close"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-slate-800"
        >
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.p
                className="text-slate-400 text-sm"
                whileHover={{ color: "#fbbf24" }}
              >
                © 2024 Crystals of Luxury. All rights reserved.
              </motion.p>

              <motion.div
                className="flex space-x-6 text-sm text-slate-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {["Privacy Policy", "Terms of Service", "Shipping Info"].map((item, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="hover:text-amber-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
