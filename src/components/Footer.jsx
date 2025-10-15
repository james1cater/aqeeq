import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6 mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto text-center space-y-4"
      >
        <p className="text-sm md:text-base">&copy; 2025 Crystals of Luxury. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-amber-400 transition-colors duration-300">Instagram</a>
          <a href="#" className="hover:text-amber-400 transition-colors duration-300">Facebook</a>
          <a href="#" className="hover:text-amber-400 transition-colors duration-300">Twitter</a>
        </div>
      </motion.div>
    </footer>
  );
}
