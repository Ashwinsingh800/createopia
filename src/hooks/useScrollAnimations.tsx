import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations using IntersectionObserver.
 * Returns a ref to attach to the target element and a boolean indicating visibility.
 */
export function useScrollReveal(options?: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    triggerOnce = true,
  } = options || {};

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Scroll-triggered animation wrapper component.
 * Wraps children in a div that animates in when scrolled into view.
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
  distance = 40,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce: once });

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return `translateY(${distance}px)`;
        case 'down': return `translateY(-${distance}px)`;
        case 'left': return `translateX(${distance}px)`;
        case 'right': return `translateX(-${distance}px)`;
        case 'scale': return 'scale(0.92)';
        case 'none': return 'none';
      }
    }
    return direction === 'scale' ? 'scale(1)' : 'translate(0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Stagger container for child elements.
 * Each child gets a progressive delay for a cascade reveal effect.
 */
interface StaggerRevealProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  baseDelay?: number;
  threshold?: number;
}

export function StaggerReveal({
  children,
  className = '',
  staggerDelay = 0.08,
  direction = 'up',
  baseDelay = 0,
  threshold = 0.1,
}: StaggerRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce: true });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => {
        const delay = baseDelay + i * staggerDelay;
        const getTransform = () => {
          if (!isVisible) {
            switch (direction) {
              case 'up': return 'translateY(30px)';
              case 'down': return 'translateY(-30px)';
              case 'left': return 'translateX(30px)';
              case 'right': return 'translateX(-30px)';
              case 'scale': return 'scale(0.9)';
            }
          }
          return direction === 'scale' ? 'scale(1)' : 'translate(0)';
        };
        return (
          <div
            key={i}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: getTransform(),
              transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
              willChange: 'opacity, transform',
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Counter animation hook — animates a number from 0 to target when scrolled into view.
 */
export function useAnimatedCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal({ triggerOnce: true });

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return { ref, count };
}

/**
 * Parallax scroll hook — shifts an element based on scroll position.
 */
export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      setOffset((center - viewCenter) * speed * -1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}
