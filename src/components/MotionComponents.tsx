/**
 * Premium Framer Motion animation components for Creatopia.
 * Provides reusable, high-impact animation wrappers using the `motion` package.
 */
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence, type Variants } from 'motion/react';

/* ────────────────────────────────────────────────────────────
   1. FADE-IN ON SCROLL — the workhorse reveal component
   ──────────────────────────────────────────────────────────── */
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
  scale?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  direction = 'up',
  distance = 40,
  once = true,
  scale = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px 0px' });

  const initialState: Record<string, number> = { opacity: 0 };
  if (scale) initialState.scale = 0.92;
  if (direction === 'up') initialState.y = distance;
  if (direction === 'down') initialState.y = -distance;
  if (direction === 'left') initialState.x = distance;
  if (direction === 'right') initialState.x = -distance;

  const animateState: Record<string, number> = { opacity: 1 };
  if (scale) animateState.scale = 1;
  if (direction === 'up' || direction === 'down') animateState.y = 0;
  if (direction === 'left' || direction === 'right') animateState.x = 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initialState}
      animate={isInView ? animateState : initialState}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────
   2. STAGGER CHILDREN — cascading reveal for lists/grids
   ──────────────────────────────────────────────────────────── */
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: { stagger: number; delay: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

export const Stagger: React.FC<StaggerProps> = ({
  children,
  className = '',
  stagger = 0.08,
  delay = 0,
  direction = 'up',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={{ stagger, delay }}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const offset = direction === 'up' ? 30 : direction === 'down' ? -30 : 0;
        const offsetX = direction === 'left' ? 30 : direction === 'right' ? -30 : 0;

        return (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: offset, x: offsetX },
              visible: {
                opacity: 1,
                y: 0,
                x: 0,
                transition: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────
   3. PARALLAX SECTION — depth-based scroll parallax
   ──────────────────────────────────────────────────────────── */
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className = '',
  speed = 0.2,
  direction = 'vertical',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [-80 * speed, 80 * speed]);
  const smoothed = useSpring(raw, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        style={direction === 'vertical' ? { y: smoothed } : { x: smoothed }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   4. SCALE ON SCROLL — grows/shrinks as user scrolls
   ──────────────────────────────────────────────────────────── */
interface ScaleOnScrollProps {
  children: React.ReactNode;
  className?: string;
  from?: number;
  to?: number;
}

export const ScaleOnScroll: React.FC<ScaleOnScrollProps> = ({
  children,
  className = '',
  from = 0.88,
  to = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);
  const smoothScale = useSpring(scale, { stiffness: 120, damping: 25 });

  return (
    <motion.div ref={ref} className={className} style={{ scale: smoothScale, opacity }}>
      {children}
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────
   5. MAGNETIC HOVER — element follows cursor on hover
   ──────────────────────────────────────────────────────────── */
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  strength = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────
   6. TEXT REVEAL — letter-by-letter or word-by-word animation
   ──────────────────────────────────────────────────────────── */
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: 'word' | 'letter';
  once?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  mode = 'word',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px 0px' });

  const units = mode === 'word' ? text.split(' ') : text.split('');
  const separator = mode === 'word' ? '\u00A0' : '';

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(4px)' }}
          transition={{
            duration: 0.45,
            delay: delay + i * (mode === 'word' ? 0.06 : 0.02),
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {unit}{separator}
        </motion.span>
      ))}
    </span>
  );
};

/* ────────────────────────────────────────────────────────────
   7. HORIZONTAL SCROLL PROGRESS — progress bar on scroll
   ──────────────────────────────────────────────────────────── */
interface ScrollProgressProps {
  color?: string;
  height?: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = '#E60067',
  height = 3,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height,
        background: color,
        transformOrigin: '0%',
        zIndex: 9999,
      }}
    />
  );
};

/* ────────────────────────────────────────────────────────────
   8. FLOAT — gentle hovering animation for decorative elements
   ──────────────────────────────────────────────────────────── */
interface FloatProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}

export const Float: React.FC<FloatProps> = ({
  children,
  className = '',
  duration = 4,
  distance = 10,
  delay = 0,
}) => (
  <motion.div
    className={className}
    animate={{
      y: [-distance / 2, distance / 2, -distance / 2],
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
      delay,
    }}
  >
    {children}
  </motion.div>
);

/* ────────────────────────────────────────────────────────────
   9. GLOW CARD — card with animated gradient border on hover
   ──────────────────────────────────────────────────────────── */
interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(230, 0, 103, 0.15)',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {/* Radial glow that follows the cursor */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 60%)`,
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────
   10. PAGE TRANSITION — wraps an entire page with entrance
   ──────────────────────────────────────────────────────────── */
interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ────────────────────────────────────────────────────────────
   11. COUNTER — animated counting number
   ──────────────────────────────────────────────────────────── */
interface CounterProps {
  target: number;
  className?: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const Counter: React.FC<CounterProps> = ({
  target,
  className = '',
  duration = 2,
  suffix = '',
  prefix = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

/* ────────────────────────────────────────────────────────────
   12. TILT CARD — 3D perspective tilt on hover
   ──────────────────────────────────────────────────────────── */
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   13. CURSOR GLOW — fluid ambient cursor spotlight
   ──────────────────────────────────────────────────────────── */
export const CursorGlow: React.FC<{ color?: string }> = ({
  color = 'rgba(230, 0, 103, 0.08)',
}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const mouseX = useSpring(-500, { stiffness: 350, damping: 28 });
  const mouseY = useSpring(-500, { stiffness: 350, damping: 28 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, visible]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed pointer-events-none rounded-full"
      style={{
        width: 500,
        height: 500,
        left: 0,
        top: 0,
        x: mouseX,
        y: mouseY,
        zIndex: 1,
        opacity: visible ? 1 : 0,
        background: `radial-gradient(circle, ${color} 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)`,
        transition: 'opacity 0.3s ease',
      }}
      aria-hidden="true"
    />
  );
};

/* ────────────────────────────────────────────────────────────
   14. MAC DOCK ITEM — macOS Dock jumping magnification effect
   ──────────────────────────────────────────────────────────── */
interface MacDockItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  scaleHover?: number;
  yOffset?: number;
  rotateHover?: number;
}

export const MacDockItem: React.FC<MacDockItemProps> = ({
  children,
  className = '',
  onClick,
  scaleHover = 1.14,
  yOffset = -5,
  rotateHover = 0,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center transform-gpu ${className}`}
      whileHover={{
        y: yOffset,
        scale: scaleHover,
        rotate: rotateHover,
        transition: {
          type: 'spring',
          stiffness: 450,
          damping: 17,
          mass: 0.6,
        },
      }}
      whileTap={{
        scale: 0.94,
        y: 0,
        transition: { type: 'spring', stiffness: 500, damping: 20 },
      }}
    >
      {children}
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────
   Re-exports for convenience
   ──────────────────────────────────────────────────────────── */
export { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring };


