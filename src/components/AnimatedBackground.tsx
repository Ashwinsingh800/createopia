import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * AnimatedBackground renders an ultra-high-level animated canvas:
 * - Interactive particle constellation that responds to cursor movements with gentle physics
 * - Dynamic glowing orbs drifting in the background
 * - Undulating generative aurora ribbons that pulse with harmonic sine waves
 * - Animated cybernetic grid perspective
 */
export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let particles: Particle[] = [];
    let orbs: Orb[] = [];
    let gridOpacity = 0;
    const mouse = { x: -2000, y: -2000, radius: 140 };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      radius: number;
      opacity: number;
      color: string;
      pulseSpeed: number;
    }

    interface Orb {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      opacity: number;
      phase: number;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const PARTICLE_COUNT = 85;
    const ORB_COUNT = 4;

    const particleColors = isDark
      ? ['rgba(230,0,103,0.45)', 'rgba(0,201,255,0.4)', 'rgba(139,92,246,0.35)', 'rgba(255,255,255,0.25)', 'rgba(56,189,248,0.3)']
      : ['rgba(101,86,217,0.25)', 'rgba(143,133,232,0.2)', 'rgba(230,0,103,0.18)', 'rgba(0,201,255,0.15)'];

    const orbColors = isDark
      ? ['rgba(230,0,103,0.10)', 'rgba(0,201,255,0.08)', 'rgba(139,92,246,0.09)', 'rgba(56,189,248,0.07)']
      : ['rgba(101,86,217,0.05)', 'rgba(143,133,232,0.04)', 'rgba(230,0,103,0.03)', 'rgba(200,180,240,0.04)'];

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.2 + 0.6,
        opacity: Math.random() * 0.55 + 0.15,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        pulseSpeed: 0.002 + Math.random() * 0.003,
      });
    }

    // Initialize glowing orbs
    for (let i = 0; i < ORB_COUNT; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 240 + 120,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.18,
        color: orbColors[i % orbColors.length],
        opacity: 0.6 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Draw futuristic animated perspective grid
    const drawGrid = (time: number) => {
      const targetOpacity = isDark ? 0.045 : 0.025;
      gridOpacity += (targetOpacity - gridOpacity) * 0.02;

      ctx.strokeStyle = isDark
        ? `rgba(139,92,246,${gridOpacity})`
        : `rgba(101,86,217,${gridOpacity})`;
      ctx.lineWidth = 0.5;

      const spacing = 80;
      const offsetX = (time * 0.012) % spacing;
      const offsetY = (time * 0.008) % spacing;

      for (let y = -spacing + offsetY; y < canvas.height + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      for (let x = -spacing + offsetX; x < canvas.width + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    };

    // Draw ethereal fluid Aurora wave ribbon across background
    const drawAurora = (time: number) => {
      const count = isDark ? 2 : 1;
      for (let a = 0; a < count; a++) {
        ctx.save();
        const baseHeight = canvas.height * (0.35 + a * 0.3);
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        if (isDark) {
          gradient.addColorStop(0, a === 0 ? 'rgba(230,0,103,0.035)' : 'rgba(0,201,255,0.03)');
          gradient.addColorStop(0.5, a === 0 ? 'rgba(139,92,246,0.045)' : 'rgba(230,0,103,0.035)');
          gradient.addColorStop(1, 'transparent');
        } else {
          gradient.addColorStop(0, 'rgba(101,86,217,0.02)');
          gradient.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        const segments = 12;
        const segWidth = canvas.width / segments;
        for (let i = 0; i <= segments; i++) {
          const x = i * segWidth;
          const wavePhase = time * 0.0006 + i * 0.4 + a * 2;
          const y = baseHeight + Math.sin(wavePhase) * 60 + Math.cos(time * 0.0004 + i * 0.2) * 30;
          if (i === 0) ctx.lineTo(x, y);
          else {
            const prevX = (i - 1) * segWidth;
            const prevPhase = time * 0.0006 + (i - 1) * 0.4 + a * 2;
            const prevY = baseHeight + Math.sin(prevPhase) * 60 + Math.cos(time * 0.0004 + (i - 1) * 0.2) * 30;
            const cx = (prevX + x) / 2;
            const cy = (prevY + y) / 2;
            ctx.quadraticCurveTo(prevX, prevY, cx, cy);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    };

    // Draw floating glow orbs
    const drawOrbs = (time: number) => {
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.phase += 0.006;

        const pulse = Math.sin(orb.phase) * 0.35 + 0.65;

        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * pulse);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(orb.x - orb.radius, orb.y - orb.radius, orb.radius * 2, orb.radius * 2);
      }
    };

    // Draw dynamic particles with mouse repulsion & constellation webs
    const drawParticles = (time: number) => {
      for (const p of particles) {
        // Natural velocity
        p.x += p.vx;
        p.y += p.vy;

        // Mouse physics: repulsion when cursor approaches
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 3.5;
          p.y += (dy / dist) * force * 3.5;

          // Tether line from mouse to particle
          const tetherAlpha = force * (isDark ? 0.22 : 0.12);
          ctx.strokeStyle = isDark
            ? `rgba(0,201,255,${tetherAlpha})`
            : `rgba(101,86,217,${tetherAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // Screen boundary wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const twinkle = Math.sin(time * p.pulseSpeed + p.x * 0.01) * 0.35 + 0.65;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * twinkle;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Constellation webs between nearby particles
      const connectionDist = 125;
      ctx.lineWidth = 0.35;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * (isDark ? 0.09 : 0.045);
            ctx.strokeStyle = isDark
              ? `rgba(139,92,246,${alpha})`
              : `rgba(101,86,217,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawAurora(time);
      drawGrid(time);
      drawOrbs(time);
      drawParticles(time);
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: isDark ? 0.85 : 0.65 }}
      aria-hidden="true"
    />
  );
};
