import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Star,
  Zap,
  ChevronRight,
  Play,
  Users,
  Shield,
  Clock,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { Creator, PageView, User } from '../types';
import { useTheme } from '../context/ThemeContext';
import { ScrollReveal, StaggerReveal, useParallax } from '../hooks/useScrollAnimations';
import { TiltCard, Float, Counter } from '../components/MotionComponents';

interface HomePageProps {
  creators: Creator[];
  currentUser: User | null;
  onNavigate: (page: PageView) => void;
  onSelectCreator: (id: string) => void;
  onOpenCopilot: () => void;
  onOpenAuth: (mode: 'sign_in' | 'sign_up') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  creators,
  currentUser,
  onNavigate,
  onSelectCreator,
  onOpenCopilot,
  onOpenAuth,
}) => {
  const { isDark } = useTheme();
  // Interactive slide index for the hero showcase
  const [activeSlide, setActiveSlide] = useState(0);
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  const heroSlides = [
    {
      title: 'Radiation Shield & Orbital Satellite Spec',
      client: 'NASA Exploration Spec',
      creatorName: 'Albertus J.',
      creatorHandle: '@albertusjanuardy',
      cost: '$500 USD',
      days: '15 days',
      rating: '5.0',
      specs: '1650CM · 48 MODULES · 3D CAD',
      imageUrl: '/src/assets/images/portfolio_cyber_cinema_1791881136586.jpg',
      videoUrl: '/woman-hologram-city.mp4',
      tag: 'HIRE THIS DESIGNER',
    },
    {
      title: 'Sector 7G: Deep Sci-Fi Commercial',
      client: 'Lumina Studio Commercial',
      creatorName: 'Elena Rostova',
      creatorHandle: '@elenafilm.ai',
      cost: '$4,500 USD',
      days: '8 days',
      rating: '5.0',
      specs: '16:9 4K DCI · RUNWAY GEN-3 · DAVINCI',
      imageUrl: '/src/assets/images/hero_cinematic_film_1791881136552.jpg',
      videoUrl: '/operative-aims-rifle-corridor.mp4',
      tag: 'HIRE THIS DIRECTOR',
    },
    {
      title: 'Architectural Biophilic Pavilion',
      client: 'Terra Design Studio',
      creatorName: 'Marcus Vance',
      creatorHandle: '@marcusvance.art',
      cost: '$2,800 USD',
      days: '6 days',
      rating: '4.9',
      specs: '4K STILLS · UNREAL ENGINE 5 · FLUX.1',
      imageUrl: '/src/assets/images/portfolio_surreal_fashion_1791881137083.jpg',
      videoUrl: '/woman-industrial-hall.mp4',
      tag: 'HIRE THIS ARTIST',
    },
  ];

  const currentHeroProject = heroSlides[activeSlide];

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  // Parallax for hero visual
  const { ref: parallaxRef, offset: parallaxOffset } = useParallax(0.15);

  // Stats data
  const stats = [
    { label: 'Active Creators', value: '2,400+', icon: Users },
    { label: 'Projects Completed', value: '18,000+', icon: TrendingUp },
    { label: 'Countries', value: '90+', icon: Globe },
    { label: 'Avg. Response', value: '<1 hr', icon: Clock },
  ];

  return (
    <div
      className={`pf-page pf-home space-y-0 pb-0 overflow-hidden transition-colors duration-200 ${
        isDark ? 'bg-[#0B0E14] text-white' : 'bg-[#F7F6F2] text-[#242424]'
      }`}
    >
      {/* 1. HERO SECTION — Full-width immersive */}
      <section
        className={`relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b overflow-hidden ${
          isDark ? 'border-[#1F2433]' : 'border-[#E5E4DE]'
        }`}
      >
        {/* Ambient gradient glow behind hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className={`absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 ${
              isDark
                ? 'bg-gradient-to-br from-[#E60067] to-[#6556D9]'
                : 'bg-gradient-to-br from-[#6556D9] to-[#B7AEFF]'
            }`}
            style={{ animation: 'pf-glow-drift 8s ease-in-out infinite alternate' }}
          />
          <div
            className={`absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 ${
              isDark
                ? 'bg-gradient-to-tr from-[#00C9FF] to-[#6556D9]'
                : 'bg-gradient-to-tr from-[#B7AEFF] to-[#6556D9]'
            }`}
            style={{ animation: 'pf-glow-drift 10s ease-in-out 2s infinite alternate-reverse' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Bold Headline & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal delay={0} direction="up" distance={20}>
                <p className={`text-sm font-bold tracking-wide ${isDark ? 'text-[#B7AEFF]' : 'text-[#6556D9]'}`}>
                  {greeting}
                  {currentUser?.name ? `, ${currentUser.name.split(' ')[0]}` : ''}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1} direction="up" distance={30}>
                <h1
                  className={`text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-[1.08] text-balance ${
                    isDark ? 'text-white' : 'text-[#242424]'
                  }`}
                >
                  Your next great{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: isDark
                        ? 'linear-gradient(135deg, #E60067, #FF4DA6, #B7AEFF)'
                        : 'linear-gradient(135deg, #6556D9, #8F85E8, #B7AEFF)',
                    }}
                  >
                    creative collaboration
                  </span>{' '}
                  starts here.
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2} direction="up" distance={20}>
                <p
                  className={`max-w-xl text-base sm:text-lg leading-7 ${
                    isDark ? 'text-[#CBD5E1]' : 'text-[#555555]'
                  }`}
                >
                  Discover AI-native creators, turn ideas into creative briefs, and bring campaigns to life.
                </p>
              </ScrollReveal>

              {/* Action Buttons with hover glow */}
              <ScrollReveal delay={0.3} direction="up" distance={15}>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('explore')}
                    className={`group relative px-7 py-3.5 text-sm font-bold text-white rounded-xl transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider overflow-hidden ${
                      isDark
                        ? 'bg-[#E60067] hover:bg-[#C70058] active:bg-[#B0004E] shadow-lg shadow-[#E60067]/25'
                        : 'bg-[#6556D9] hover:bg-[#5345C4] active:bg-[#4839B6] shadow-lg shadow-[#6556D9]/25'
                    }`}
                  >
                    <span className="relative z-10">Explore Creators</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    {/* Shine effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenAuth('sign_up')}
                    className={`px-7 py-3.5 text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider border-2 backdrop-blur-sm ${
                      isDark
                        ? 'text-white bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/40'
                        : 'text-[#242424] bg-white/80 hover:bg-white border-[#DCDAD2] hover:border-[#6556D9]/40 shadow-sm'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Get Started</span>
                  </button>
                </div>
              </ScrollReveal>

              {/* Stats mini-row with animated counter */}
              <ScrollReveal delay={0.4} direction="up" distance={15}>
                <div className="pt-4 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Users className={`w-4 h-4 ${isDark ? 'text-[#00C9FF]' : 'text-[#6556D9]'}`} />
                    <div>
                      <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-[#242424]'}`}>
                        <Counter target={2400} suffix="+" duration={1.6} />
                      </div>
                      <div className={`text-[10px] ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
                        Active Creators
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${isDark ? 'text-[#00C9FF]' : 'text-[#6556D9]'}`} />
                    <div>
                      <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-[#242424]'}`}>
                        <Counter target={18000} suffix="+" duration={2} />
                      </div>
                      <div className={`text-[10px] ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
                        Projects Completed
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Globe className={`w-4 h-4 ${isDark ? 'text-[#00C9FF]' : 'text-[#6556D9]'}`} />
                    <div>
                      <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-[#242424]'}`}>
                        <Counter target={90} suffix="+" duration={1.4} />
                      </div>
                      <div className={`text-[10px] ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
                        Countries
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Hero Technical Showcase Card */}
            <div className="lg:col-span-6 relative" ref={parallaxRef}>
              <ScrollReveal delay={0.2} direction="scale" duration={0.9}>
                <TiltCard maxTilt={5} className="relative">
                  <div
                    className={`relative rounded-2xl overflow-hidden aspect-16/11 group border ${
                      isDark
                        ? 'border-[#232838] bg-[#121620]'
                        : 'border-[#E5E4DE] bg-white'
                    }`}
                    style={{
                      transform: `translateY(${parallaxOffset}px)`,
                      boxShadow: isDark
                        ? '0 25px 60px -12px rgba(230, 0, 103, 0.15), 0 12px 30px -8px rgba(0, 0, 0, 0.3)'
                        : '0 25px 50px -12px rgba(101, 86, 217, 0.15), 0 12px 24px -8px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    {currentHeroProject.videoUrl ? (
                      <video
                        key={currentHeroProject.videoUrl}
                        src={currentHeroProject.videoUrl}
                        poster={currentHeroProject.imageUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label={currentHeroProject.title}
                        className="pf-hero-reel-image w-full h-full object-cover group-hover:scale-103"
                      />
                    ) : (
                      <img
                        key={activeSlide}
                        src={currentHeroProject.imageUrl}
                        alt={currentHeroProject.title}
                        className="pf-hero-reel-image w-full h-full object-cover group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Technical Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none"></div>

                    <div className="sr-only" aria-live="polite">
                      Showing {currentHeroProject.title}
                    </div>

                    {/* Top-Right Technical Badge — Glassmorphism */}
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-xl border border-white/15 text-white px-3.5 py-2 rounded-xl text-xs font-mono tracking-widest uppercase">
                      <span
                        className={`font-bold text-sm block ${
                          isDark ? 'text-[#FF007A]' : 'text-[#9084FA]'
                        }`}
                      >
                        {currentHeroProject.specs.split('·')[0]}
                      </span>
                      <span className="text-[10px] text-white/80">
                        {currentHeroProject.tag}
                      </span>
                    </div>

                    {/* Rating Badge — Glassmorphism */}
                    <div className="absolute bottom-14 right-4 bg-black/40 backdrop-blur-xl border border-white/15 p-3 rounded-xl text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{currentHeroProject.rating}</span>
                      </div>
                      <div className="font-bold text-white text-xs">
                        {currentHeroProject.creatorName}
                      </div>
                      <div className="text-[10px] text-[#CBD5E1]">
                        {currentHeroProject.creatorHandle}
                      </div>
                    </div>

                    {/* Bottom Technical Caption Line */}
                    <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 font-medium">
                      <p className="truncate">
                        This spec for {currentHeroProject.client} cost{' '}
                        <strong className="text-white">{currentHeroProject.cost}</strong>{' '}
                        and took{' '}
                        <strong className="text-white">{currentHeroProject.days}</strong>
                      </p>
                    </div>

                    {/* Slide indicators */}
                    <div className="absolute top-4 left-4 flex gap-1.5">
                      {heroSlides.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveSlide(i)}
                          className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                            i === activeSlide
                              ? `w-8 ${isDark ? 'bg-[#E60067]' : 'bg-[#6556D9]'}`
                              : 'w-4 bg-white/40 hover:bg-white/60'
                          }`}
                          aria-label={`View slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Floating Live Activity Pill */}
                  <Float duration={4.5} distance={8} className="absolute -bottom-3 -left-3 z-30 hidden sm:block">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-xl text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                      <span className="font-semibold text-[11px] tracking-wide">Live Match Ready · 4m ago</span>
                    </div>
                  </Float>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "AS USED BY" ENTERPRISE LOGOS — Infinite scroll marquee */}
      <section
        className={`border-b py-5 overflow-hidden ${
          isDark
            ? 'border-[#1F2433] bg-[#0E1118]/60 text-[#CBD5E1]'
            : 'border-[#E5E4DE] bg-[#F1F0EB]/80 text-[#555555]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-6 justify-between">
          <span
            className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
              isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
            }`}
          >
            As used by
          </span>
          <div className="pf-marquee-container overflow-hidden flex-1">
            <div className="pf-marquee-track flex items-center gap-12 text-sm sm:text-base font-black tracking-widest opacity-85">
              {['ADOBE', 'FACEBOOK', 'DELOITTE.', 'NASA', 'IBM', 'AIRBUS', 'NETFLIX', 'ADOBE', 'FACEBOOK', 'DELOITTE.', 'NASA', 'IBM', 'AIRBUS', 'NETFLIX'].map((name, i) => (
                <span key={i} className="hover:opacity-100 transition-opacity cursor-default whitespace-nowrap shrink-0">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. "MAKE IT REAL WITH CREATOPIA" — Glassmorphism Pillar Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 4 Pillars in 2x2 Grid */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal direction="up" distance={30}>
              <div className="space-y-2">
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
                    isDark ? 'text-white' : 'text-[#242424]'
                  }`}
                >
                  Make it real <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: isDark
                        ? 'linear-gradient(135deg, #E60067, #FF4DA6)'
                        : 'linear-gradient(135deg, #6556D9, #8F85E8)',
                    }}
                  >
                    with Creatopia
                  </span>
                </h2>
              </div>
            </ScrollReveal>

            <StaggerReveal
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm"
              staggerDelay={0.1}
              direction="up"
            >
              {[
                {
                  icon: Users,
                  title: 'The best talent',
                  desc: 'Discover reliable AI creators by exploring their original generation seeds, node graphs, and audited client reviews.',
                },
                {
                  icon: Zap,
                  title: 'Fast proposals',
                  desc: 'Get quick, structured estimates from verified specialists. 80% of jobs receive tailored proposals within 60 minutes.',
                },
                {
                  icon: Shield,
                  title: 'Quality work',
                  desc: 'Audited 4K ProRes deliverables, custom LoRA seed logs, and complete commercial buyout clearance on every campaign.',
                },
                {
                  icon: CheckCircle2,
                  title: 'Be in control',
                  desc: 'Stay in the loop with milestone releases. Chat directly with creators and get real-time review updates anytime.',
                },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className={`group relative space-y-3 p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                      ? 'bg-white/[0.03] backdrop-blur-sm border-white/[0.08] hover:border-[#E60067]/40 hover:bg-white/[0.05]'
                      : 'bg-white/80 backdrop-blur-sm border-[#E5E4DE] hover:border-[#6556D9]/40 hover:shadow-lg shadow-xs'
                  }`}
                >
                  {/* Hover glow effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      isDark
                        ? 'bg-gradient-to-br from-[#E60067]/5 to-transparent'
                        : 'bg-gradient-to-br from-[#6556D9]/5 to-transparent'
                    }`}
                  />
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isDark
                        ? 'bg-[#E60067]/15 text-[#FF4DA6] group-hover:bg-[#E60067]/25'
                        : 'bg-[#6556D9]/10 text-[#6556D9] group-hover:bg-[#6556D9]/20'
                    }`}
                  >
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3
                    className={`text-base font-bold ${
                      isDark ? 'text-white' : 'text-[#242424]'
                    }`}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={`leading-relaxed text-xs ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                    }`}
                  >
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </StaggerReveal>

            <ScrollReveal delay={0.3}>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('brief')}
                  className={`group text-sm font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isDark
                      ? 'text-[#E60067] hover:text-[#FF007A]'
                      : 'text-[#6556D9] hover:text-[#5345C4]'
                  }`}
                >
                  <span>Make your creative vision a reality. Get started now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Visual with Chat Bubble Mockups */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" distance={40}>
              <div
                className={`relative rounded-2xl overflow-hidden aspect-4/5 p-6 flex flex-col justify-between border ${
                  isDark
                    ? 'border-[#232838] bg-[#121622]'
                    : 'border-[#E5E4DE] bg-white'
                }`}
                style={{
                  boxShadow: isDark
                    ? '0 30px 60px -15px rgba(0, 0, 0, 0.4)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <video
                  src="/creatopia-forest-showcase.mp4"
                  poster="/src/assets/images/portfolio_bioluminescent_nature_1791881135764.jpg"
                  aria-label="Bioluminescent forest showcase"
                  className="absolute inset-0 w-full h-full object-cover opacity-75"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isDark
                      ? 'from-[#0B0E14] via-transparent to-black/40'
                      : 'from-black/70 via-transparent to-black/30'
                  }`}
                ></div>

                {/* Floating Chat Bubble 1 — Glassmorphism */}
                <div className="relative z-10 self-start max-w-xs bg-black/30 backdrop-blur-xl border border-white/15 p-3.5 rounded-2xl shadow-2xl space-y-1.5"
                  style={{ animation: 'pf-float-bubble 4s ease-in-out infinite' }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                        isDark ? 'bg-[#E60067]' : 'bg-[#6556D9]'
                      }`}
                    >
                      ER
                    </div>
                    <span className="text-xs font-bold text-white">
                      Elena Rostova
                    </span>
                    <span className="text-[10px] text-emerald-400">★ 5.0</span>
                  </div>
                  <p className="text-[11px] text-[#CBD5E1]">
                    "Uploaded 4K ProRes cut with Runway camera zoom &amp; DaVinci grain
                    pass!"
                  </p>
                </div>

                {/* Floating Chat Bubble 2 — Glassmorphism */}
                <div className="relative z-10 self-end max-w-xs bg-black/30 backdrop-blur-xl border border-[#00C9FF]/20 p-3.5 rounded-2xl shadow-2xl space-y-1.5 text-right"
                  style={{ animation: 'pf-float-bubble 4s ease-in-out 1s infinite' }}
                >
                  <div className="text-xs font-bold text-[#00C9FF]">
                    Lumina Creative Director
                  </div>
                  <p className="text-[11px] text-white">
                    "Approved! Releasing Milestone 2 escrow now."
                  </p>
                  <div className="text-[10px] text-emerald-400 font-mono font-bold">
                    $4,500 Released
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. TOP CREATIVE WORK BENTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        <ScrollReveal>
          <div className="flex items-end justify-between">
            <div>
              <h2
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isDark ? 'text-white' : 'text-[#242424]'
                }`}
              >
                Explore Top Creative Work
              </h2>
              <p
                className={`text-xs sm:text-sm mt-1 ${
                  isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                }`}
              >
                Curated productions across filmmaking, character consistency, and 3D
                visual effects.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className={`group text-xs font-bold hover:underline inline-flex items-center gap-1 cursor-pointer ${
                isDark ? 'text-[#E60067]' : 'text-[#6556D9]'
              }`}
            >
              <span>View All ({creators.length})</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Big Card on Left */}
          <ScrollReveal className="md:col-span-6" delay={0.1} direction="scale">
            <div
              onClick={() => onNavigate('explore')}
              className={`relative rounded-2xl overflow-hidden aspect-16/10 cursor-pointer group border ${
                isDark
                  ? 'border-[#232838] bg-[#121622]'
                  : 'border-[#E5E4DE] bg-white'
              }`}
              style={{
                boxShadow: isDark
                  ? '0 20px 40px -10px rgba(0, 0, 0, 0.3)'
                  : '0 15px 30px -8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <video
                src="/operative-aims-rifle-corridor.mp4"
                poster="/src/assets/images/hero_cinematic_film_1791881136552.jpg"
                aria-label="Year of the Launch featured spec film"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <span
                  className={`text-[10px] font-mono font-bold tracking-widest uppercase ${
                    isDark ? 'text-[#00C9FF]' : 'text-[#9084FA]'
                  }`}
                >
                  Featured Spec Film
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  YEAR OF THE LAUNCH
                </h3>
                <p className="text-xs text-[#CBD5E1]">
                  Anamorphic sci-fi commercial directed with Runway Gen-3 &amp;
                  Midjourney v6
                </p>
              </div>
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md ${isDark ? 'bg-[#E60067]/80' : 'bg-[#6556D9]/80'}`}>
                  <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 4 Cards Grid on Right */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            {/* Card 1 */}
            <ScrollReveal delay={0.15}>
              <div
                onClick={() => onNavigate('explore')}
                className={`relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer group border ${
                  isDark
                    ? 'border-[#232838] bg-[#121622]'
                    : 'border-[#E5E4DE] bg-white'
                }`}
              >
                <video
                  src="/woman-hologram-city.mp4"
                  poster="/src/assets/images/portfolio_cyber_cinema_1791881136586.jpg"
                  aria-label="Video post-production and VFX portfolio showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white">
                  Video Post-Production &amp; VFX
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal delay={0.2}>
              <div
                onClick={() => onNavigate('explore')}
                className={`relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer group border ${
                  isDark
                    ? 'border-[#232838] bg-[#121622]'
                    : 'border-[#E5E4DE] bg-white'
                }`}
              >
                <video
                  src="/woman-industrial-hall.mp4"
                  poster="/src/assets/images/portfolio_surreal_fashion_1791881137083.jpg"
                  aria-label="Haute couture and key art portfolio showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white">
                  Haute Couture &amp; Key Art
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal delay={0.25}>
              <div
                onClick={() => onNavigate('explore')}
                className={`relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer group border ${
                  isDark
                    ? 'border-[#232838] bg-[#121622]'
                    : 'border-[#E5E4DE] bg-white'
                }`}
              >
                <video
                  src="/creatopia-forest-showcase.mp4"
                  poster="/src/assets/images/portfolio_bioluminescent_nature_1791881135764.jpg"
                  aria-label="Bioluminescent forest portfolio showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white">
                  Procedural Worlds &amp; Nature
                </div>
              </div>
            </ScrollReveal>

            {/* Card 4: Post a Project CTA Card */}
            <ScrollReveal delay={0.3}>
              <div
                onClick={() => onNavigate('brief')}
                className={`relative rounded-xl overflow-hidden border-2 border-dashed p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 group ${
                  isDark
                    ? 'border-[#E60067] bg-[#E60067]/10 hover:bg-[#E60067]/15'
                    : 'border-[#6556D9] bg-[#6556D9]/10 hover:bg-[#6556D9]/15'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform ${
                    isDark ? 'bg-[#E60067]' : 'bg-[#6556D9]'
                  }`}
                >
                  +
                </div>
                <div>
                  <div
                    className={`text-xs font-bold ${
                      isDark ? 'text-white' : 'text-[#242424]'
                    }`}
                  >
                    Post a Brief
                  </div>
                  <div
                    className={`text-[11px] ${
                      isDark ? 'text-[#CBD5E1]' : 'text-[#737373]'
                    }`}
                  >
                    Get matched in minutes
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. "TAP INTO A GLOBAL TALENT NETWORK" */}
      <section
        id="how-it-works"
        className={`border-t border-b py-20 ${
          isDark
            ? 'border-[#1F2433] bg-[#0E1118]/80'
            : 'border-[#E5E4DE] bg-[#F1F0EB]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 4 Workflow Steps */}
            <div className="lg:col-span-7 space-y-8">
              <ScrollReveal>
                <div className="space-y-2">
                  <h2
                    className={`text-3xl sm:text-4xl font-black tracking-tight ${
                      isDark ? 'text-white' : 'text-[#242424]'
                    }`}
                  >
                    Tap into a <br />
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: isDark
                          ? 'linear-gradient(135deg, #E60067, #FF4DA6)'
                          : 'linear-gradient(135deg, #6556D9, #8F85E8)',
                      }}
                    >
                      global talent network
                    </span>
                  </h2>
                </div>
              </ScrollReveal>

              <StaggerReveal
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm"
                staggerDelay={0.12}
                direction="up"
              >
                {[
                  {
                    num: '1',
                    title: 'Post your brief',
                    desc: "It's free and easy! Leverage our Gemini AI Brief Builder to turn raw concepts into structured deliverables.",
                  },
                  {
                    num: '2',
                    title: 'Choose creators',
                    desc: 'No vision is too complex. Filter creators by tools (Runway, ComfyUI, Midjourney), verified skills, and budget.',
                  },
                  {
                    num: '3',
                    title: 'Pay safely',
                    desc: 'Only release milestone funds when you are 100% satisfied with the generated cut and seed log transparency.',
                  },
                  {
                    num: '4',
                    title: "We're here to help",
                    desc: 'Our human editorial reviewers and Creative Copilot ensure strict quality control and commercial licensing.',
                  },
                ].map((step) => (
                  <div key={step.num} className="space-y-2">
                    <h3
                      className={`text-base font-bold flex items-center gap-2 ${
                        isDark ? 'text-white' : 'text-[#242424]'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white ${
                          isDark ? 'bg-[#E60067]' : 'bg-[#6556D9]'
                        }`}
                      >
                        {step.num}
                      </span>
                      {step.title}
                    </h3>
                    <p
                      className={`leading-relaxed text-xs ${
                        isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                ))}
              </StaggerReveal>
            </div>

            {/* Right Column: Creator Cards */}
            <div className="lg:col-span-5 relative space-y-3">
              <ScrollReveal direction="left" distance={30}>
                <div
                  className={`text-[11px] font-bold tracking-wider uppercase ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                  }`}
                >
                  Active Creator Nodes:
                </div>
              </ScrollReveal>

              {creators.slice(0, 3).map((creator, idx) => (
                <ScrollReveal key={creator.id} delay={0.1 * (idx + 1)} direction="left" distance={20}>
                  <div
                    onClick={() => onSelectCreator(creator.id)}
                    className={`group p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer hover:-translate-y-0.5 ${
                      isDark
                        ? 'bg-white/[0.03] backdrop-blur-sm border-white/[0.08] hover:border-[#E60067]/50 hover:bg-white/[0.05]'
                        : 'bg-white/80 backdrop-blur-sm border-[#E5E4DE] hover:border-[#6556D9]/50 hover:shadow-lg shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={creator.avatarUrl}
                        alt={creator.name}
                        className={`w-10 h-10 rounded-full object-cover border-2 group-hover:scale-110 transition-transform ${
                          isDark ? 'border-[#232838]' : 'border-[#E5E4DE]'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div
                          className={`text-xs font-bold flex items-center gap-1.5 ${
                            isDark ? 'text-white' : 'text-[#242424]'
                          }`}
                        >
                          <span>{creator.name}</span>
                          {creator.verificationStatus === 'verified' && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                        </div>
                        <div
                          className={`text-[11px] truncate max-w-44 ${
                            isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                          }`}
                        >
                          {creator.specialization} · {creator.location}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold justify-end">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{creator.rating || 4.9}</span>
                      </div>
                      <div
                        className={`text-[10px] font-semibold ${
                          isDark ? 'text-[#00C9FF]' : 'text-[#6556D9]'
                        }`}
                      >
                        {creator.rateEstimate.split('/')[0]}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. "AS SEEN ON" MEDIA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <ScrollReveal direction="scale">
          <div
            className={`border rounded-2xl p-6 space-y-4 ${
              isDark
                ? 'border-[#1F2433] bg-white/[0.02] backdrop-blur-sm'
                : 'border-[#E5E4DE] bg-white shadow-xs'
            }`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
              }`}
            >
              As seen on
            </span>
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 items-center text-center text-xs font-black tracking-wider ${
                isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
              }`}
            >
              {['The New York Times', 'CNBC', 'WSJ', 'CNN', 'Bloomberg', 'yahoo!', 'BUSINESS INSIDER', 'Forbes'].map((name, i) => (
                <span key={i} className="hover:opacity-100 transition-opacity cursor-default">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 7. OVER 50 AI SPECIALIZATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        <ScrollReveal>
          <div className="space-y-1">
            <h2
              className={`text-2xl sm:text-3xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-[#242424]'
              }`}
            >
              Get work done in over{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: isDark
                    ? 'linear-gradient(135deg, #E60067, #00C9FF)'
                    : 'linear-gradient(135deg, #6556D9, #8F85E8)',
                }}
              >
                50 AI specializations
              </span>
            </h2>
            <p
              className={`text-xs ${
                isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
              }`}
            >
              Direct pipelines for commercial video, concept design, and procedural
              animation.
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs"
          staggerDelay={0.04}
          direction="up"
        >
          {[
            'AI Commercial Filmmaking',
            'Runway Gen-3 Direction',
            'Midjourney v6 Key Art',
            'ComfyUI Node Graphs',
            'FLUX.1 Pro Visuals',
            'Unreal Engine 5 LED Volumes',
            'Character Turnaround LoRAs',
            'Anamorphic Cinematography',
            'Pika Motion Dynamics',
            'Kling 1.5 High-Speed Cuts',
            'Houdini VFX Particles',
            '4K Topaz Frame Upscaling',
            'DaVinci 35mm Color Grading',
            'ElevenLabs Voice Synthesis',
            'Surreal Fashion Editorial',
            'Bioluminescent Environment Rigging',
            'Spec Advertising Directing',
            'Product 3D Rotations',
            'Seed Reproducibility Audits',
            'Commercial Buyout Cleared Work',
          ].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onNavigate('explore')}
              className={`group p-3 text-left rounded-xl transition-all cursor-pointer truncate border duration-300 hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08] hover:border-[#E60067]/40 text-[#CBD5E1] hover:text-white'
                  : 'bg-white hover:bg-[#F0EFEA] border-[#E5E4DE] hover:border-[#6556D9]/40 text-[#444444] hover:text-[#242424] shadow-2xs hover:shadow-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </StaggerReveal>
      </section>

      {/* 8. GENERATIVE PIPELINES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <ScrollReveal direction="up" distance={40}>
          <div
            className={`relative rounded-3xl overflow-hidden p-8 sm:p-12 border ${
              isDark
                ? 'border-[#E60067]/30 text-white'
                : 'border-[#6556D9]/20 text-[#242424]'
            }`}
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #121622 0%, #1A1226 40%, #250D24 100%)'
                : 'linear-gradient(135deg, #FFFFFF 0%, #F5F4FD 40%, #EBE8FC 100%)',
              boxShadow: isDark
                ? '0 30px 60px -15px rgba(230, 0, 103, 0.15)'
                : '0 25px 50px -12px rgba(101, 86, 217, 0.1)',
            }}
          >
            {/* Decorative gradient orbs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
              style={{ background: isDark ? '#E60067' : '#6556D9', animation: 'pf-glow-drift 6s ease-in-out infinite alternate' }}
            />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px] opacity-15 pointer-events-none"
              style={{ background: isDark ? '#00C9FF' : '#B7AEFF', animation: 'pf-glow-drift 8s ease-in-out 1s infinite alternate-reverse' }}
            />

            <div className="relative z-10 max-w-2xl space-y-4">
              <span
                className={`text-xs font-mono font-bold tracking-wider uppercase ${
                  isDark ? 'text-[#00C9FF]' : 'text-[#6556D9]'
                }`}
              >
                Creative Copilot &amp; Generative Pipelines
              </span>
              <h2
                className={`text-3xl sm:text-4xl font-black tracking-tight ${
                  isDark ? 'text-white' : 'text-[#242424]'
                }`}
              >
                Scale your campaign production with AI Creators
              </h2>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-[#CBD5E1]' : 'text-[#555555]'
                }`}
              >
                Imagine turning a rough prompt idea into broadcast-ready commercials,
                3D assets, and print key visuals in days instead of months. Our
                verified creator network makes production effortless.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenCopilot}
                  className={`group relative px-6 py-3 text-xs font-bold text-white rounded-xl transition-all shadow-md uppercase tracking-wider cursor-pointer flex items-center gap-2 overflow-hidden ${
                    isDark
                      ? 'bg-[#E60067] hover:bg-[#C70058]'
                      : 'bg-[#6556D9] hover:bg-[#5345C4]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Explore Creative Copilot</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('brief')}
                  className={`px-6 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider border backdrop-blur-sm ${
                    isDark
                      ? 'text-white border-white/20 hover:bg-white/10'
                      : 'text-[#242424] bg-white/80 border-[#DCDAD2] hover:bg-white'
                  }`}
                >
                  Build Brief with AI
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 9. ADVANTAGE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 pb-24">
        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          staggerDelay={0.12}
          direction="up"
        >
          {[
            {
              title: 'Creatopia Enterprise',
              desc: 'Company creative budget? Produce cinematic assets at 10x speed. Access dedicated creator teams and master licensing.',
              cta: 'Learn more →',
              action: () => onNavigate('brief'),
            },
            {
              title: 'Innovation Challenges',
              desc: 'Crowdsource high-concept AI trailers, brand identity explorations, and spec films from global creators in competition formats.',
              cta: 'Explore challenges →',
              action: () => onNavigate('explore'),
            },
            {
              title: 'Verified Creator API',
              desc: 'Integrate verified AI creators directly into your agency workflow. Standardized prompt manifests and seed logs.',
              cta: 'API Documentation →',
              action: onOpenCopilot,
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`group relative p-6 rounded-2xl border space-y-3 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                isDark
                  ? 'bg-white/[0.03] backdrop-blur-sm border-white/[0.08] hover:border-[#E60067]/40'
                  : 'bg-white/80 backdrop-blur-sm border-[#E5E4DE] hover:border-[#6556D9]/40 hover:shadow-lg shadow-xs'
              }`}
            >
              {/* Hover gradient overlay */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  isDark
                    ? 'bg-gradient-to-br from-[#E60067]/5 via-transparent to-[#00C9FF]/5'
                    : 'bg-gradient-to-br from-[#6556D9]/5 via-transparent to-[#B7AEFF]/5'
                }`}
              />
              <h3
                className={`text-lg font-bold relative z-10 ${
                  isDark ? 'text-white' : 'text-[#242424]'
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`text-xs leading-relaxed relative z-10 ${
                  isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                }`}
              >
                {card.desc}
              </p>
              <button
                onClick={card.action}
                className={`group/btn text-xs font-bold hover:underline cursor-pointer relative z-10 inline-flex items-center gap-1 ${
                  isDark ? 'text-[#E60067]' : 'text-[#6556D9]'
                }`}
              >
                {card.cta}
              </button>
            </div>
          ))}
        </StaggerReveal>
      </section>
    </div>
  );
};
