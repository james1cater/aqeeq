import React from 'react';
import { motion, useScroll } from 'framer-motion';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CollectionSection from './components/CollectionSection';
import MeaningSection from './components/MeaningSection';
import GallerySection from './components/GallerySection';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import AnimatedFooter from './components/AnimatedFooter';
import ParticleSystem from './components/ParticleSystem';

import "./index.css";

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <CursorTrail>
      <div className="App">
        <ParticleSystem />

        {/* Original Aqeeq Website Sections */}
        <HeroSection scrollProgress={scrollYProgress} />
        <AboutSection scrollProgress={scrollYProgress} />
        <CollectionSection scrollProgress={scrollYProgress} />
        <MeaningSection scrollProgress={scrollYProgress} />
        <GallerySection scrollProgress={scrollYProgress} />
        <VisitSection scrollProgress={scrollYProgress} />
        <AnimatedFooter />
      </div>
    </CursorTrail>
  );
}
