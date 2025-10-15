import React, { useEffect, useState, createContext, useContext, useRef } from "react";
import anime from "animejs";

// Context for cursor state
export const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export default function CursorTrail({ children }) {
  const [particles, setParticles] = useState([]);
  const [cursorType, setCursorType] = useState('default');
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationFrameRef = useRef();

  useEffect(() => {
    const updateMousePosition = (e) => {
      const { clientX, clientY } = e;
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;

      // Calculate mouse velocity
      const dx = clientX - mouseRef.current.prevX;
      const dy = clientY - mouseRef.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Only create particles if moving fast enough
      if (speed > 2) {
        createParticles(clientX, clientY, dx, dy, speed);
      }
    };

    const createParticles = (x, y, vx, vy, speed) => {
      const particleCount = Math.min(Math.floor(speed / 10) + 1, 5); // 1-5 particles based on speed

      for (let i = 0; i < particleCount; i++) {
        const particle = {
          id: Date.now() + i,
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: vx * 0.3 + (Math.random() - 0.5) * 1.5, // Follow mouse direction with randomness
          vy: vy * 0.3 + (Math.random() - 0.5) * 1.5,
          size: Math.random() * 6 + 2, // 2-8px
          opacity: Math.random() * 0.5 + 0.5, // 0.5-1.0
          life: 0,
          maxLife: Math.random() * 1000 + 1500, // 1.5-2.5s
          type: cursorType,
          gravity: Math.random() * 0.02 + 0.01, // Subtle gravity
        };

        setParticles(prev => [...prev.slice(-50), particle]); // Keep max 50 particles

        // Animate particle with Anime.js
        anime({
          targets: particle,
          life: particle.maxLife,
          duration: particle.maxLife,
          easing: 'easeOutQuad',
          update: () => {
            // Update physics
            particle.vy += particle.gravity; // Apply gravity
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98; // Air resistance
            particle.vy *= 0.98;

            // Update opacity based on life
            particle.opacity = Math.max(0, 1 - (particle.life / particle.maxLife));

            // Force re-render
            setParticles(prev => [...prev]);
          },
          complete: () => {
            // Remove particle when animation completes
            setParticles(prev => prev.filter(p => p.id !== particle.id));
          }
        });
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorType]);

  const getParticleStyle = (type) => {
    const colorStyles = {
      button: 'bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-400 shadow-yellow-300/60',
      image: 'bg-gradient-to-r from-slate-200 via-blue-300 to-indigo-400 shadow-blue-300/60',
      card: 'bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-400 shadow-teal-300/60',
      default: 'bg-gradient-to-r from-stone-200 via-amber-200 to-yellow-300 shadow-amber-200/50'
    };

    return colorStyles[type] || colorStyles.default;
  };

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full shadow-lg ${getParticleStyle(particle.type)}`}
            style={{
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              transform: `scale(${0.5 + particle.opacity * 0.5})`, // Scale with opacity
            }}
          />
        ))}
      </div>
      {children}
    </CursorContext.Provider>
  );
}
