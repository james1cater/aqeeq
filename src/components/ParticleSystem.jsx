import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function ParticleSystem() {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles = [];
    const particleCount = 50;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-60';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      container.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Animate particles
    const particleAnimations = particles.map((particle, index) => {
      return anime({
        targets: particle,
        translateX: () => anime.random(-200, 200),
        translateY: () => anime.random(-200, 200),
        scale: [0, 1, 0],
        opacity: [0, 0.8, 0],
        duration: anime.random(3000, 6000),
        delay: index * 100,
        easing: 'easeInOutSine',
        loop: true,
        autoplay: false
      });
    });

    const scrollPercent = () => {
      const bodyST = document.body.scrollTop;
      const docST = document.documentElement.scrollTop;
      const docSH = document.documentElement.scrollHeight;
      const docCH = document.documentElement.clientHeight;

      return Math.min(100, (docST + bodyST) / (docSH - docCH) * 100);
    };

    const handleScroll = () => {
      const percent = scrollPercent();
      particleAnimations.forEach((anim, index) => {
        const delay = index * 0.5;
        if (percent > delay && percent < delay + 20) {
          anim.play();
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ height: '200vh' }}
    />
  );
}
