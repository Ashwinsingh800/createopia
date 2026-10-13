import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Star,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { Creator, PageView, User } from '../types';
import { useTheme } from '../context/ThemeContext';

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

  return (
    <div
      className={`pf-page pf-home space-y-24 pb-20 overflow-hidden transition-colors duration-200 ${
        isDark ? 'bg-[#0B0E14] text-white' : 'bg-[#F7F6F2] text-[#242424]'
      }`}
    >
      {/* 1. HERO SECTION */}
      <section
        className={`relative pt-8 sm:pt-16 pb-8 border-b ${
          isDark ? 'border-[#1F2433]' : 'border-[#E5E4DE]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Bold Headline & 4 Bullets */}
            <div className="lg:col-span-6 space-y-6">
              <p className={`text-sm font-bold tracking-wide ${isDark ? 'text-[#B7AEFF]' : 'text-[#6556D9]'}`}>
                {greeting}
                {currentUser?.name ? `, ${currentUser.name.split(' ')[0]}` : ''}
              </p>
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-balance ${
                  isDark ? 'text-white' : 'text-[#242424]'
                }`}
              >
                Your next great creative collaboration starts here.
              </h1>

              <p
                className={`max-w-xl text-base sm:text-lg leading-7 ${
                  isDark ? 'text-[#CBD5E1]' : 'text-[#555555]'
                }`}
              >
                Discover AI-native creators, turn ideas into creative briefs, and bring campaigns to life.
              </p>

              {/* Action Buttons: Primary + Secondary */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className={`px-7 py-3.5 text-sm font-bold text-white rounded-md transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider ${
                    isDark
                      ? 'bg-[#E60067] hover:bg-[#C70058] active:bg-[#B0004E] shadow-lg shadow-[#E60067]/25'
                      : 'bg-[#6556D9] hover:bg-[#5345C4] active:bg-[#4839B6] shadow-sm'
                  }`}
                >
                  <span>Explore Creators</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAuth('sign_up')}
                  className={`px-7 py-3.5 text-sm font-bold rounded-md transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider border-2 ${
                    isDark
                      ? 'text-white bg-transparent hover:bg-white/10 border-white'
                      : 'text-[#242424] bg-white hover:bg-[#F0EFEA] border-[#DCDAD2] shadow-2xs'
                  }`}
                >
                  <span>Get Started</span>
                </button>
              </div>

            </div>

            {/* Right Column: Hero Technical Showcase Card */}
            <div className="lg:col-span-6 relative">
              <div
                className={`relative rounded-2xl overflow-hidden aspect-16/11 shadow-2xl group border ${
                  isDark
                    ? 'border-[#232838] bg-[#121620]'
                    : 'border-[#E5E4DE] bg-white shadow-xl'
                }`}
              >
                <img
                  key={activeSlide}
                  src={currentHeroProject.imageUrl}
                  alt={currentHeroProject.title}
                  className="pf-hero-reel-image w-full h-full object-cover group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />

                {/* Technical Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none"></div>

                {/* Subtle circular reel motion around the active project */}
                <div className="pf-hero-reel-orbit" aria-hidden="true">
                  <span className="pf-hero-reel-orbit-dot pf-hero-reel-orbit-dot-one"></span>
                  <span className="pf-hero-reel-orbit-dot pf-hero-reel-orbit-dot-two"></span>
                  <span className="pf-hero-reel-orbit-dot pf-hero-reel-orbit-dot-three"></span>
                </div>

                <div className="sr-only" aria-live="polite">
                  Showing {currentHeroProject.title}
                </div>

                {/* Top-Right Technical Dimension Box */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded text-xs font-mono tracking-widest uppercase">
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

                {/* Center Target Wireframe */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div
                    className={`w-16 h-16 rounded-full border flex items-center justify-center animate-pulse ${
                      isDark
                        ? 'border-[#00C9FF]/60'
                        : 'border-[#6556D9]/70'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isDark ? 'bg-[#00C9FF]' : 'bg-[#6556D9]'
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Rating Badge Tag */}
                <div className="absolute bottom-14 right-4 bg-black/75 backdrop-blur-md border border-white/20 p-2.5 rounded-lg text-xs space-y-1">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "AS USED BY" ENTERPRISE LOGOS */}
      <section
        className={`border-b py-6 ${
          isDark
            ? 'border-[#1F2433] bg-[#0E1118]/60 text-[#CBD5E1]'
            : 'border-[#E5E4DE] bg-[#F1F0EB]/80 text-[#555555]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8 justify-between">
          <span
            className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
              isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
            }`}
          >
            As used by
          </span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 sm:gap-12 opacity-85 text-sm sm:text-base font-black tracking-widest">
            <span className="hover:opacity-100 transition-opacity cursor-default">
              ADOBE
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              FACEBOOK
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              DELOITTE.
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              NASA
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              IBM
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              AIRBUS
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              NETFLIX
            </span>
          </div>
        </div>
      </section>

      {/* 3. "MAKE IT REAL WITH CREATEOPIA" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 4 Pillars in 2x2 Grid */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
                  isDark ? 'text-white' : 'text-[#242424]'
                }`}
              >
                Make it real <br />
                <span className={isDark ? 'text-[#E60067]' : 'text-[#6556D9]'}>
                  with Createopia
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              {/* Pillar 1 */}
              <div
                className={`space-y-2 p-4 rounded-xl border ${
                  isDark
                    ? 'bg-[#121622] border-[#232838]'
                    : 'bg-white border-[#E5E4DE] shadow-xs'
                }`}
              >
                <h3
                  className={`text-base font-bold ${
                    isDark ? 'text-white' : 'text-[#242424]'
                  }`}
                >
                  The best talent
                </h3>
                <p
                  className={`leading-relaxed text-xs ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                  }`}
                >
                  Discover reliable AI creators by exploring their original generation
                  seeds, node graphs, and audited client reviews.
                </p>
              </div>

              {/* Pillar 2 */}
              <div
                className={`space-y-2 p-4 rounded-xl border ${
                  isDark
                    ? 'bg-[#121622] border-[#232838]'
                    : 'bg-white border-[#E5E4DE] shadow-xs'
                }`}
              >
                <h3
                  className={`text-base font-bold ${
                    isDark ? 'text-white' : 'text-[#242424]'
                  }`}
                >
                  Fast proposals
                </h3>
                <p
                  className={`leading-relaxed text-xs ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                  }`}
                >
                  Get quick, structured estimates from verified specialists. 80% of
                  jobs receive tailored proposals within 60 minutes.
                </p>
              </div>

              {/* Pillar 3 */}
              <div
                className={`space-y-2 p-4 rounded-xl border ${
                  isDark
                    ? 'bg-[#121622] border-[#232838]'
                    : 'bg-white border-[#E5E4DE] shadow-xs'
                }`}
              >
                <h3
                  className={`text-base font-bold ${
                    isDark ? 'text-white' : 'text-[#242424]'
                  }`}
                >
                  Quality work
                </h3>
                <p
                  className={`leading-relaxed text-xs ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                  }`}
                >
                  Audited 4K ProRes deliverables, custom LoRA seed logs, and complete
                  commercial buyout clearance on every campaign.
                </p>
              </div>

              {/* Pillar 4 */}
              <div
                className={`space-y-2 p-4 rounded-xl border ${
                  isDark
                    ? 'bg-[#121622] border-[#232838]'
                    : 'bg-white border-[#E5E4DE] shadow-xs'
                }`}
              >
                <h3
                  className={`text-base font-bold ${
                    isDark ? 'text-white' : 'text-[#242424]'
                  }`}
                >
                  Be in control
                </h3>
                <p
                  className={`leading-relaxed text-xs ${
                    isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                  }`}
                >
                  Stay in the loop with milestone releases. Chat directly with
                  creators and get real-time review updates anytime.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('brief')}
                className={`text-sm font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDark
                    ? 'text-[#E60067] hover:text-[#FF007A]'
                    : 'text-[#6556D9] hover:text-[#5345C4]'
                }`}
              >
                <span>Make your creative vision a reality. Get started now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual with Chat Bubble Mockups */}
          <div className="lg:col-span-5 relative">
            <div
              className={`relative rounded-2xl overflow-hidden aspect-4/5 p-6 flex flex-col justify-between shadow-2xl border ${
                isDark
                  ? 'border-[#232838] bg-[#121622]'
                  : 'border-[#E5E4DE] bg-white'
              }`}
            >
              <video
                src="/createopia-forest-showcase.mp4"
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

              {/* Floating Chat Bubble 1 */}
              <div className="relative z-10 self-start max-w-xs bg-black/85 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-xl space-y-1">
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

              {/* Floating Chat Bubble 2 */}
              <div className="relative z-10 self-end max-w-xs bg-[#1F2433]/90 backdrop-blur-md border border-[#00C9FF]/30 p-3 rounded-2xl shadow-xl space-y-1 text-right">
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
          </div>
        </div>
      </section>

      {/* 4. TOP CREATIVE WORK BENTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
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
            className={`text-xs font-bold hover:underline inline-flex items-center gap-1 cursor-pointer ${
              isDark ? 'text-[#E60067]' : 'text-[#6556D9]'
            }`}
          >
            <span>View All ({creators.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Big Card on Left */}
          <div
            onClick={() => onNavigate('explore')}
            className={`md:col-span-6 relative rounded-2xl overflow-hidden aspect-16/10 cursor-pointer group shadow-lg border ${
              isDark
                ? 'border-[#232838] bg-[#121622]'
                : 'border-[#E5E4DE] bg-white'
            }`}
          >
            <img
              src="/src/assets/images/hero_cinematic_film_1791881136552.jpg"
              alt="Year of the Launch"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              referrerPolicy="no-referrer"
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
          </div>

          {/* 4 Cards Grid on Right */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            {/* Card 1 */}
            <div
              onClick={() => onNavigate('explore')}
              className={`relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer group border ${
                isDark
                  ? 'border-[#232838] bg-[#121622]'
                  : 'border-[#E5E4DE] bg-white'
              }`}
            >
              <img
                src="/src/assets/images/portfolio_cyber_cinema_1791881136586.jpg"
                alt="Video Post-Production"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white">
                Video Post-Production &amp; VFX
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => onNavigate('explore')}
              className={`relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer group border ${
                isDark
                  ? 'border-[#232838] bg-[#121622]'
                  : 'border-[#E5E4DE] bg-white'
              }`}
            >
              <img
                src="/src/assets/images/portfolio_surreal_fashion_1791881137083.jpg"
                alt="Architectural Design"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white">
                Haute Couture &amp; Key Art
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onNavigate('explore')}
              className={`relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer group border ${
                isDark
                  ? 'border-[#232838] bg-[#121622]'
                  : 'border-[#E5E4DE] bg-white'
              }`}
            >
              <video
                src="/createopia-forest-showcase.mp4"
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

            {/* Card 4: Post a Project CTA Card */}
            <div
              onClick={() => onNavigate('brief')}
              className={`relative rounded-xl overflow-hidden border-2 border-dashed p-4 flex flex-col justify-between cursor-pointer transition-colors ${
                isDark
                  ? 'border-[#E60067] bg-[#E60067]/10 hover:bg-[#E60067]/15'
                  : 'border-[#6556D9] bg-[#6556D9]/10 hover:bg-[#6556D9]/15'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
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
          </div>
        </div>
      </section>

      {/* 5. "TAP INTO A GLOBAL TALENT NETWORK" */}
      <section
        className={`border-t border-b py-16 ${
          isDark
            ? 'border-[#1F2433] bg-[#0E1118]/80'
            : 'border-[#E5E4DE] bg-[#F1F0EB]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: 4 Workflow Steps */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <h2
                  className={`text-3xl sm:text-4xl font-black tracking-tight ${
                    isDark ? 'text-white' : 'text-[#242424]'
                  }`}
                >
                  Tap into a <br />
                  <span className={isDark ? 'text-[#E60067]' : 'text-[#6556D9]'}>
                    global talent network
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <h3
                    className={`text-base font-bold flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-[#242424]'
                    }`}
                  >
                    <span
                      className={isDark ? 'text-[#E60067]' : 'text-[#6556D9]'}
                    >
                      1.
                    </span>{' '}
                    Post your brief
                  </h3>
                  <p
                    className={`leading-relaxed text-xs ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                    }`}
                  >
                    It's free and easy! Leverage our Gemini AI Brief Builder to turn
                    raw concepts into structured deliverables.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3
                    className={`text-base font-bold flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-[#242424]'
                    }`}
                  >
                    <span
                      className={isDark ? 'text-[#E60067]' : 'text-[#6556D9]'}
                    >
                      2.
                    </span>{' '}
                    Choose creators
                  </h3>
                  <p
                    className={`leading-relaxed text-xs ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                    }`}
                  >
                    No vision is too complex. Filter creators by tools (Runway,
                    ComfyUI, Midjourney), verified skills, and budget.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3
                    className={`text-base font-bold flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-[#242424]'
                    }`}
                  >
                    <span
                      className={isDark ? 'text-[#E60067]' : 'text-[#6556D9]'}
                    >
                      3.
                    </span>{' '}
                    Pay safely
                  </h3>
                  <p
                    className={`leading-relaxed text-xs ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                    }`}
                  >
                    Only release milestone funds when you are 100% satisfied with the
                    generated cut and seed log transparency.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h3
                    className={`text-base font-bold flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-[#242424]'
                    }`}
                  >
                    <span
                      className={isDark ? 'text-[#E60067]' : 'text-[#6556D9]'}
                    >
                      4.
                    </span>{' '}
                    We're here to help
                  </h3>
                  <p
                    className={`leading-relaxed text-xs ${
                      isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                    }`}
                  >
                    Our human editorial reviewers and Creative Copilot ensure strict
                    quality control and commercial licensing.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Creator Cards */}
            <div className="lg:col-span-5 relative space-y-3">
              <div
                className={`text-[11px] font-bold tracking-wider uppercase ${
                  isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
                }`}
              >
                Active Creator Nodes:
              </div>

              {creators.slice(0, 3).map((creator) => (
                <div
                  key={creator.id}
                  onClick={() => onSelectCreator(creator.id)}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isDark
                      ? 'bg-[#151923] border-[#232838] hover:border-[#E60067]'
                      : 'bg-white border-[#E5E4DE] hover:border-[#6556D9] shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.avatarUrl}
                      alt={creator.name}
                      className={`w-10 h-10 rounded-full object-cover border ${
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. "AS SEEN ON" MEDIA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`border rounded-2xl p-6 space-y-4 ${
            isDark
              ? 'border-[#1F2433] bg-[#0E1118]'
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
            <span className="hover:opacity-100 transition-opacity cursor-default">
              The New York Times
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              CNBC
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              WSJ
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              CNN
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              Bloomberg
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              yahoo!
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              BUSINESS INSIDER
            </span>
            <span className="hover:opacity-100 transition-opacity cursor-default">
              Forbes
            </span>
          </div>
        </div>
      </section>

      {/* 7. OVER 50 AI SPECIALIZATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="space-y-1">
          <h2
            className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isDark ? 'text-white' : 'text-[#242424]'
            }`}
          >
            Get work done in over 50 AI specializations
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
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
          ].map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onNavigate('explore')}
              className={`p-3 text-left rounded-xl transition-all cursor-pointer truncate border ${
                isDark
                  ? 'bg-[#121622] hover:bg-[#1A1F2E] border-[#232838] hover:border-[#E60067] text-[#CBD5E1] hover:text-white'
                  : 'bg-white hover:bg-[#F0EFEA] border-[#E5E4DE] hover:border-[#6556D9] text-[#444444] hover:text-[#242424] shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 8. GENERATIVE PIPELINES BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`relative rounded-2xl overflow-hidden p-8 sm:p-12 shadow-xl border ${
            isDark
              ? 'border-[#E60067]/40 bg-gradient-to-r from-[#121622] via-[#1A1226] to-[#250D24] text-white'
              : 'border-[#6556D9]/30 bg-gradient-to-r from-white via-[#F5F4FD] to-[#EBE8FC] text-[#242424]'
          }`}
        >
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
                className={`px-6 py-3 text-xs font-bold text-white rounded-md transition-all shadow-md uppercase tracking-wider cursor-pointer flex items-center gap-2 ${
                  isDark
                    ? 'bg-[#E60067] hover:bg-[#C70058]'
                    : 'bg-[#6556D9] hover:bg-[#5345C4]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Creative Copilot</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('brief')}
                className={`px-6 py-3 text-xs font-bold rounded-md transition-all cursor-pointer uppercase tracking-wider border ${
                  isDark
                    ? 'text-white border-white/40 hover:bg-white/10'
                    : 'text-[#242424] bg-white border-[#DCDAD2] hover:bg-[#F0EFEA]'
                }`}
              >
                Build Brief with AI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. ADVANTAGE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`p-6 rounded-2xl border space-y-3 ${
              isDark
                ? 'bg-[#121622] border-[#232838]'
                : 'bg-white border-[#E5E4DE] shadow-xs'
            }`}
          >
            <h3
              className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-[#242424]'
              }`}
            >
              Createopia Enterprise
            </h3>
            <p
              className={`text-xs leading-relaxed ${
                isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
              }`}
            >
              Company creative budget? Produce cinematic assets at 10x speed. Access
              dedicated creator teams and master licensing.
            </p>
            <button
              onClick={() => onNavigate('brief')}
              className={`text-xs font-bold hover:underline cursor-pointer ${
                isDark ? 'text-[#E60067]' : 'text-[#6556D9]'
              }`}
            >
              Learn more →
            </button>
          </div>

          <div
            className={`p-6 rounded-2xl border space-y-3 ${
              isDark
                ? 'bg-[#121622] border-[#232838]'
                : 'bg-white border-[#E5E4DE] shadow-xs'
            }`}
          >
            <h3
              className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-[#242424]'
              }`}
            >
              Innovation Challenges
            </h3>
            <p
              className={`text-xs leading-relaxed ${
                isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
              }`}
            >
              Crowdsource high-concept AI trailers, brand identity explorations, and
              spec films from global creators in competition formats.
            </p>
            <button
              onClick={() => onNavigate('explore')}
              className={`text-xs font-bold hover:underline cursor-pointer ${
                isDark ? 'text-[#E60067]' : 'text-[#6556D9]'
              }`}
            >
              Explore challenges →
            </button>
          </div>

          <div
            className={`p-6 rounded-2xl border space-y-3 ${
              isDark
                ? 'bg-[#121622] border-[#232838]'
                : 'bg-white border-[#E5E4DE] shadow-xs'
            }`}
          >
            <h3
              className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-[#242424]'
              }`}
            >
              Verified Creator API
            </h3>
            <p
              className={`text-xs leading-relaxed ${
                isDark ? 'text-[#94A3B8]' : 'text-[#737373]'
              }`}
            >
              Integrate verified AI creators directly into your agency workflow.
              Standardized prompt manifests and seed logs.
            </p>
            <button
              onClick={onOpenCopilot}
              className={`text-xs font-bold hover:underline cursor-pointer ${
                isDark ? 'text-[#E60067]' : 'text-[#6556D9]'
              }`}
            >
              API Documentation →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
