import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

/**
 * Cinematic welcome/splash page with animated particles, floating text,
 * and a video background for maximum hackathon wow-factor.
 */
export const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation for the welcome page
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface WelcomeParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      phase: number;
    }

    const particles: WelcomeParticle[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        radius: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.01;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        const twinkle = Math.sin(p.phase + time * 0.001) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(176, 167, 255, ${p.opacity * twinkle})`;
        ctx.fill();

        // Glow effect
        if (p.radius > 1.5) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
          glow.addColorStop(0, `rgba(176, 167, 255, ${p.opacity * twinkle * 0.15})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.fillRect(p.x - p.radius * 4, p.y - p.radius * 4, p.radius * 8, p.radius * 8);
        }
      }

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.08;
            ctx.strokeStyle = `rgba(176, 167, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <main className="welcome-page">
      <video
        className="welcome-video"
        src="/background.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="welcome-overlay" />

      {/* Particle canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      <div className="welcome-content">
        {/* Animated ring icon */}
        <div className="welcome-mark" aria-hidden="true">
          <div className="welcome-mark-ring" />
          <Play size={14} fill="currentColor" />
        </div>

        <p className="welcome-kicker">
          <Sparkles className="inline-block w-3.5 h-3.5 mr-1.5 -mt-0.5" />
          AI-native creative marketplace
        </p>

        <h1>
          <span className="welcome-title-gradient">Creatopia</span>
        </h1>

        <p className="welcome-copy">
          Find the people, tools, and momentum to turn an ambitious idea into finished work.
        </p>

        <button type="button" className="welcome-cta group" onClick={onGetStarted}>
          <span>Get Started</span>
          <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          {/* Shine sweep */}
          <span className="welcome-cta-shine" />
        </button>

        <p className="welcome-note">
          Sign in to unlock creator discovery, briefs, and collaboration tools.
        </p>

        {/* Floating badges */}
        <div className="welcome-badges">
          <span className="welcome-badge" style={{ animationDelay: '0.3s' }}>
            🎬 2,400+ Creators
          </span>
          <span className="welcome-badge" style={{ animationDelay: '0.6s' }}>
            🌍 90+ Countries
          </span>
          <span className="welcome-badge" style={{ animationDelay: '0.9s' }}>
            ⚡ {"<"}1hr Response
          </span>
        </div>
      </div>
    </main>
  );
};
