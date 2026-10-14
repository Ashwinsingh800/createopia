import React, { useState } from 'react';
import {
  Sparkles,
  Bookmark,
  LogOut,
  Menu,
  X,
  Globe,
  ChevronDown,
  Sun,
  Moon,
} from 'lucide-react';
import { AuthMode, PageView, User } from '../types';
import { useTheme } from '../context/ThemeContext';
import { MacDockItem } from './MotionComponents';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenAuth?: (mode: AuthMode) => void;
  currentUser: User | null;
  shortlistCount: number;
  onOpenCopilot: () => void;
  onSignOut: () => void;
  onSelectCreator?: (id: string | null) => void;
  projectsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAuth,
  currentUser,
  shortlistCount,
  onOpenCopilot,
  onSignOut,
  onSelectCreator,
  projectsCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const { isDark, toggleTheme } = useTheme();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelectCreator) onSelectCreator(null);
    onNavigate('home');
  };

  const navItemClass = (isActive: boolean) =>
    `text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 rounded-lg px-3 py-2 ${
      isActive
        ? isDark
        ? 'text-white font-semibold bg-[#232838]'
        : 'text-[#242424] font-semibold bg-[#F0EFEA]'
        : isDark
        ? 'text-[#94A3B8] hover:text-white'
        : 'text-[#737373] hover:text-[#242424]'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 backdrop-blur-md ${
        isDark
          ? 'bg-[#0E1118]/95 border-b border-[#1F2433]'
          : 'bg-[#F7F6F2]/95 border-b border-[#E5E4DE]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-3.5">
        {/* Left Zone: Brand Logo & Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <MacDockItem yOffset={-3} scaleHover={1.06}>
            <a
              href="/"
              onClick={handleLogoClick}
              className={`text-lg font-bold tracking-tight transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 ${
                isDark ? 'text-white' : 'text-[#242424]'
              }`}
            >
              {/* Origami Bird / Crest Logo Icon */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center p-1 shadow-xs ${
                  isDark
                    ? 'bg-gradient-to-tr from-[#00C9FF] to-[#E60067]'
                    : 'bg-gradient-to-tr from-[#6556D9] to-[#8F85E8]'
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                  <path
                    d="M3 13.5L9.5 4.5L14 10.5L21 3L17.5 19.5L10.5 16L7 21L3 13.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span
                className={`font-extrabold tracking-tight text-lg ${
                  isDark ? 'text-white' : 'text-[#242424]'
                }`}
              >
                Creat<span className={isDark ? 'text-[#E60067]' : 'text-[#6556D9]'}>opia</span>
              </span>
            </a>
          </MacDockItem>

          {/* Desktop Navigation Links with MacBook Dock Jump Effect */}
          <nav
            className={`hidden md:flex items-center gap-1.5 rounded-xl border p-1 text-sm ${
              isDark
                ? 'border-[#232838] bg-[#121622]/90 backdrop-blur-md'
                : 'border-[#E5E4DE] bg-white/90 shadow-sm backdrop-blur-md'
            }`}
          >
            {!currentUser ? (
              <>
                <MacDockItem yOffset={-4} scaleHover={1.08}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectCreator) onSelectCreator(null);
                      onNavigate('explore');
                    }}
                    className={navItemClass(currentPage === 'explore')}
                  >
                    <span>Hire Creators</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 ${
                        isDark ? 'text-[#64748B]' : 'text-[#A0A0A0]'
                      }`}
                    />
                  </button>
                </MacDockItem>

                <MacDockItem yOffset={-4} scaleHover={1.08}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectCreator) onSelectCreator(null);
                      onNavigate('brief');
                    }}
                    className={navItemClass(currentPage === 'brief')}
                  >
                    <span>Explore Briefs</span>
                  </button>
                </MacDockItem>

                <MacDockItem yOffset={-4} scaleHover={1.08}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectCreator) onSelectCreator(null);
                      onNavigate('home');
                      setTimeout(() => {
                        const el = document.getElementById('how-it-works');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className={`text-sm font-medium transition-colors cursor-pointer px-3 py-2 rounded-lg ${
                      isDark
                        ? 'text-[#94A3B8] hover:text-white'
                        : 'text-[#737373] hover:text-[#242424]'
                    }`}
                  >
                    How It Works
                  </button>
                </MacDockItem>
              </>
            ) : currentUser.role === 'brand' ? (
              <>
                <MacDockItem yOffset={-4} scaleHover={1.08}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectCreator) onSelectCreator(null);
                      onNavigate('explore');
                    }}
                    className={navItemClass(currentPage === 'explore')}
                  >
                    Discover
                  </button>
                </MacDockItem>

                <MacDockItem yOffset={-4} scaleHover={1.08}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectCreator) onSelectCreator(null);
                      onNavigate('my-briefs');
                    }}
                    className={navItemClass(currentPage === 'brief')}
                  >
                    My Briefs
                  </button>
                </MacDockItem>

                <MacDockItem yOffset={-4} scaleHover={1.08}>
                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className={navItemClass(currentPage === 'projects')}
                  >
                    <span>Projects</span>
                    {projectsCount > 0 && (
                      <span
                        className={`w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold ${
                          isDark ? 'bg-[#E60067]' : 'bg-[#6556D9]'
                        }`}
                      >
                        {projectsCount}
                      </span>
                    )}
                  </button>
                </MacDockItem>
              </>
            ) : (
              <>
                <MacDockItem yOffset={-4} scaleHover={1.08}>
                  <button
                    type="button"
                    onClick={() => onNavigate('brief')}
                    className={navItemClass(currentPage === 'brief')}
                  >
                    Explore Briefs
                  </button>
                </MacDockItem>

                <MacDockItem yOffset={-4} scaleHover={1.08}>
                  <button
                    type="button"
                    onClick={() => onNavigate('my-portfolio')}
                    className={navItemClass(currentPage === 'creator')}
                  >
                    My Portfolio
                  </button>
                </MacDockItem>

                <MacDockItem yOffset={-4} scaleHover={1.08}>
                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className={navItemClass(currentPage === 'projects')}
                  >
                    <span>Projects</span>
                    {projectsCount > 0 && (
                      <span
                        className={`w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold ${
                          isDark ? 'bg-[#E60067]' : 'bg-[#6556D9]'
                        }`}
                      >
                        {projectsCount}
                      </span>
                    )}
                  </button>
                </MacDockItem>
              </>
            )}
          </nav>
        </div>

        {/* Right Zone: Controls, Theme Toggle, Auth & CTA with MacBook Dock Jump */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* THEME TOGGLE: Switch between Light (Default) and Dark Mode */}
          <MacDockItem yOffset={-4} scaleHover={1.12}>
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#151923] text-amber-300 border-[#232838] hover:bg-[#1C2130] hover:text-amber-200'
                  : 'bg-white text-[#6556D9] border-[#E5E4DE] hover:bg-[#F0EFEA] hover:text-[#5345C4] shadow-xs'
              }`}
              title={isDark ? 'Switch to Light Mode (Default)' : 'Switch to Dark Mode'}
              aria-label="Toggle dark/light theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline text-[11px] font-medium text-slate-300">
                    Light
                  </span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#6556D9]" />
                  <span className="hidden lg:inline text-[11px] font-medium text-[#737373]">
                    Dark
                  </span>
                </>
              )}
            </button>
          </MacDockItem>

          {/* Language / Region Pill */}
          <MacDockItem yOffset={-3} scaleHover={1.08}>
            <button
              type="button"
              onClick={() => setLanguage((current) => current === 'EN' ? 'HI' : 'EN')}
              aria-label={`Switch language. Current language: ${language === 'EN' ? 'English' : 'Hindi'}`}
              className={`hidden xl:flex items-center gap-1.5 text-xs px-2 py-1 rounded-md cursor-pointer transition-colors ${
                isDark
                  ? 'text-[#94A3B8] hover:text-white'
                  : 'text-[#737373] hover:text-[#242424]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-medium">{language}</span>
            </button>
          </MacDockItem>

          {/* Creative Copilot Trigger */}
          <MacDockItem yOffset={-5} scaleHover={1.14}>
            <button
              type="button"
              onClick={onOpenCopilot}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
                isDark
                  ? 'text-[#00C9FF] bg-[#00C9FF]/10 hover:bg-[#00C9FF]/20 border-[#00C9FF]/30'
                  : 'text-[#6556D9] bg-[#6556D9]/10 hover:bg-[#6556D9]/15 border-[#6556D9]/25'
              }`}
              title="Open Gemini Creative Copilot"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Copilot</span>
            </button>
          </MacDockItem>

          {/* Shortlist Icon */}
          <MacDockItem yOffset={-4} scaleHover={1.18}>
            <button
              type="button"
              onClick={() => onNavigate('shortlist')}
              className={`relative p-2 transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#94A3B8] hover:text-white'
                  : 'text-[#737373] hover:text-[#242424]'
              }`}
              title="Shortlisted Creators"
            >
              <Bookmark className="w-4 h-4" />
              {shortlistCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold ${
                    isDark ? 'bg-[#E60067]' : 'bg-[#6556D9]'
                  }`}
                >
                  {shortlistCount}
                </span>
              )}
            </button>
          </MacDockItem>

          {/* Authentication states */}
          {!currentUser ? (
            <MacDockItem yOffset={-3} scaleHover={1.08}>
              <div className="flex items-center gap-1.5 sm:gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => onOpenAuth?.('sign_in') ?? onNavigate('auth')}
                  className={`font-semibold px-2 py-1.5 transition-colors cursor-pointer ${
                    isDark
                      ? 'text-white hover:text-[#94A3B8]'
                      : 'text-[#242424] hover:text-[#6556D9]'
                  }`}
                >
                  Log In
                </button>
              </div>
            </MacDockItem>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex flex-col text-right">
                <span
                  className={`text-xs font-bold truncate max-w-28 ${
                    isDark ? 'text-white' : 'text-[#242424]'
                  }`}
                >
                  {currentUser.name}
                </span>
                <span
                  className={`text-[10px] uppercase font-bold ${
                    isDark ? 'text-[#E60067]' : 'text-[#6556D9]'
                  }`}
                >
                  {currentUser.role}
                </span>
              </div>
              <MacDockItem yOffset={-3} scaleHover={1.15}>
                <button
                  type="button"
                  onClick={onSignOut}
                  className={`p-1.5 transition-colors cursor-pointer ${
                    isDark
                      ? 'text-[#94A3B8] hover:text-rose-400'
                      : 'text-[#737373] hover:text-rose-600'
                  }`}
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </MacDockItem>
            </div>
          )}

          {/* Primary CTA Button */}
          <MacDockItem yOffset={-5} scaleHover={1.08}>
            <button
              type="button"
              onClick={() => onNavigate('brief')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-white rounded-md transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 uppercase tracking-wide ${
                isDark
                  ? 'bg-[#E60067] hover:bg-[#C70058] active:bg-[#B0004E]'
                  : 'bg-[#6556D9] hover:bg-[#5345C4] active:bg-[#4839B6]'
              }`}
            >
              <span>Post a Project</span>
            </button>
          </MacDockItem>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 transition-colors ${
              isDark
                ? 'text-[#94A3B8] hover:text-white'
                : 'text-[#737373] hover:text-[#242424]'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-4 py-4 space-y-3 text-xs border-t transition-colors ${
            isDark
              ? 'border-[#1F2433] bg-[#0E1118]'
              : 'border-[#E5E4DE] bg-[#F7F6F2]'
          }`}
        >
          {/* Theme Toggle row in Mobile Menu */}
          <div className="flex items-center justify-between py-2 border-b border-inherit">
            <span
              className={`font-semibold ${
                isDark ? 'text-white' : 'text-[#242424]'
              }`}
            >
              Appearance
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer ${
                isDark
                  ? 'bg-[#151923] text-amber-300 border-[#232838]'
                  : 'bg-white text-[#6556D9] border-[#E5E4DE]'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Switch to Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#6556D9]" />
                  <span>Switch to Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onSelectCreator) onSelectCreator(null);
              onNavigate('explore');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left py-2 font-medium ${
              isDark
                ? 'text-[#94A3B8] hover:text-white'
                : 'text-[#737373] hover:text-[#242424]'
            }`}
          >
            Explore Creators
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigate('brief');
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left py-2 font-medium ${
              isDark
                ? 'text-[#94A3B8] hover:text-white'
                : 'text-[#737373] hover:text-[#242424]'
            }`}
          >
            Post a Brief
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenCopilot();
              setMobileMenuOpen(false);
            }}
            className={`block w-full text-left py-2 font-semibold flex items-center gap-1.5 ${
              isDark ? 'text-[#00C9FF]' : 'text-[#6556D9]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Copilot</span>
          </button>

          {!currentUser ? (
            <button
              type="button"
              onClick={() => {
                onNavigate('auth');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-center py-2.5 font-semibold rounded-lg mt-2 ${
                isDark
                  ? 'bg-[#1F2433] hover:bg-[#2C3246] text-white'
                  : 'bg-[#6556D9] hover:bg-[#5345C4] text-white'
              }`}
            >
              Log In / Sign Up
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onSignOut();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-rose-500 font-semibold"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};
