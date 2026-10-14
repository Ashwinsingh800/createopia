import React, { useState, useEffect, useRef } from 'react';
import { AuthMode, PageView, Creator, User, CreativeBrief } from './types';
import { StorageService } from './services/storage';
import { useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CreativeCopilot } from './components/CreativeCopilot';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CreatorProfilePage } from './pages/CreatorProfilePage';
import { CreateBriefPage } from './pages/CreateBriefPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AuthPage } from './pages/AuthPage';
import { WelcomePage } from './pages/WelcomePage';
import { MessageCircle } from 'lucide-react';
import { ScrollProgress, CursorGlow, PageTransition, AnimatePresence } from './components/MotionComponents';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return !StorageService.getCurrentUser() || sessionStorage.getItem('pixelforge_welcome_seen') !== 'true';
    } catch {
      return true;
    }
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() =>
    StorageService.getCurrentUser()
  );
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    return 'home';
  });
  const [authMode, setAuthMode] = useState<AuthMode>('sign_in');
  const [creators, setCreators] = useState<Creator[]>(() =>
    StorageService.getCreators()
  );
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);
  const [invitedCreator, setInvitedCreator] = useState<Creator | null>(null);
  const [shortlist, setShortlist] = useState<string[]>(() =>
    StorageService.getShortlist()
  );
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [prefilledBriefData, setPrefilledBriefData] = useState<{
    title?: string;
    contentType?: string;
    visualStyle?: string;
    referenceNotes?: string;
  } | null>(null);

  // Active brief filter for Explore creators
  const [activeBriefFilter, setActiveBriefFilter] = useState<CreativeBrief | null>(null);
  const [exploreInitialShortlist, setExploreInitialShortlist] = useState(false);
  const historyReadyRef = useRef(false);
  const restoringHistoryRef = useRef(false);

  const getHistoryState = () => ({
    app: 'creatopia',
    showWelcome,
    currentPage,
    authMode,
    selectedCreatorId,
  });

  useEffect(() => {
    if (!historyReadyRef.current) {
      window.history.replaceState(getHistoryState(), '', window.location.href);
      historyReadyRef.current = true;
      return;
    }

    if (restoringHistoryRef.current) {
      restoringHistoryRef.current = false;
      return;
    }

    window.history.pushState(getHistoryState(), '', window.location.href);
  }, [showWelcome, currentPage, authMode, selectedCreatorId]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (!state || state.app !== 'creatopia') {
        window.history.pushState(getHistoryState(), '', window.location.href);
        return;
      }

      restoringHistoryRef.current = true;
      setShowWelcome(Boolean(state.showWelcome));
      setCurrentPage(state.currentPage || 'home');
      setAuthMode(state.authMode || 'sign_in');
      setSelectedCreatorId(state.selectedCreatorId || null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedCreatorId]);

  const handleNavigate = (page: PageView) => {
    if (page === 'my-portfolio') {
      // Find creator profile associated with current user
      if (currentUser?.creatorProfileId) {
        setSelectedCreatorId(currentUser.creatorProfileId);
        setCurrentPage('creator');
        return;
      } else {
        const matching = creators.find((c) => c.userId === currentUser?.id);
        if (matching) {
          setSelectedCreatorId(matching.id);
          setCurrentPage('creator');
          return;
        }
      }
      // If no creator profile yet, take to explore
      setExploreInitialShortlist(false);
      setCurrentPage('explore');
      return;
    }

    if (page === 'shortlist') {
      setExploreInitialShortlist(true);
      setCurrentPage('explore');
      return;
    }

    if (page === 'explore') {
      setExploreInitialShortlist(false);
      setCurrentPage('explore');
      return;
    }

    if (page === 'my-briefs') {
      setCurrentPage('brief');
      return;
    }

    if (page === 'auth') setAuthMode('sign_in');
    setCurrentPage(page);
    if (page !== 'creator') {
      setSelectedCreatorId(null);
    }
  };

  const handleSelectCreator = (id: string | null) => {
    if (id) {
      setSelectedCreatorId(id);
      setCurrentPage('creator');
    } else {
      setSelectedCreatorId(null);
      setCurrentPage('explore');
    }
  };

  const handleToggleShortlist = (id: string) => {
    const updated = StorageService.toggleShortlist(id);
    setShortlist(updated);
  };

  const handleInviteToBrief = (creatorId: string) => {
    const target = creators.find((c) => c.id === creatorId) || null;
    setInvitedCreator(target);
    setCurrentPage('brief');
  };

  const handleTransferToBrief = (data: {
    title?: string;
    contentType?: string;
    visualStyle?: string;
    referenceNotes?: string;
  }) => {
    setPrefilledBriefData(data);
    setCurrentPage('brief');
  };

  const handleMatchCreatorsForBrief = (brief: CreativeBrief) => {
    setActiveBriefFilter(brief);
    setCurrentPage('explore');
  };

  const handleCreatorUpdated = (updated: Creator) => {
    setCreators((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setShowWelcome(false);
    setSelectedCreatorId(null);
    setCurrentPage('home');
  };

  const handleDemoSuccess = (user: User) => {
    setCurrentUser(user);
    setShowWelcome(false);
    setSelectedCreatorId(null);
    setCurrentPage('home');
  };

  const handleSignOut = () => {
    StorageService.signOut();
    try {
      sessionStorage.removeItem('pixelforge_welcome_seen');
    } catch {
      // Continue if storage is unavailable.
    }
    setShowWelcome(true);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const selectedCreator = selectedCreatorId
    ? creators.find((c) => c.id === selectedCreatorId)
    : null;

  const projectsCount = 0;
  const { isDark } = useTheme();

  if (showWelcome) {
    return (
      <WelcomePage
        onGetStarted={() => {
          try {
            sessionStorage.setItem('pixelforge_welcome_seen', 'true');
          } catch {
            // Continue if storage is unavailable.
          }
          setShowWelcome(false);
          setAuthMode('sign_in');
          setCurrentPage('auth');
        }}
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDark ? 'bg-[#0B0E14] text-[#F8FAFC]' : 'bg-[#F7F6F2] text-[#242424]'
      }`}
    >
      {/* Dynamic top scroll progress bar */}
      <ScrollProgress color="linear-gradient(90deg, #E60067 0%, #8B5CF6 50%, #00C9FF 100%)" height={3} />

      {/* Ambient mouse spotlight glow */}
      <CursorGlow color={isDark ? 'rgba(230, 0, 103, 0.12)' : 'rgba(101, 86, 217, 0.08)'} />

      {/* Animated particle/grid background */}
      <AnimatedBackground />

      {/* Role-Specific Navigation Bar */}
      {currentPage !== 'onboarding' && currentPage !== 'auth' && <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setCurrentPage('auth');
        }}
        currentUser={currentUser}
        shortlistCount={shortlist.length}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onSignOut={handleSignOut}
        onSelectCreator={handleSelectCreator}
        projectsCount={projectsCount}
      />}

      {/* Main Content Area with Smooth Page Transition */}
      <AnimatePresence mode="wait">
        <PageTransition key={currentPage} className="flex-1 pf-route flex flex-col">
          {currentPage === 'home' && (
            <HomePage
              creators={creators}
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onSelectCreator={handleSelectCreator}
              onOpenCopilot={() => setIsCopilotOpen(true)}
              onOpenAuth={(mode) => {
                setAuthMode(mode);
                setCurrentPage('auth');
              }}
            />
          )}

          {currentPage === 'explore' && (
            <ExplorePage
              creators={creators}
              onSelectCreator={handleSelectCreator}
              shortlist={shortlist}
              onToggleShortlist={handleToggleShortlist}
              currentUser={currentUser}
              onRequireAuth={() => setCurrentPage('auth')}
              activeBriefFilter={activeBriefFilter}
              onClearBriefFilter={() => setActiveBriefFilter(null)}
              initialShowShortlisted={exploreInitialShortlist}
            />
          )}

          {currentPage === 'creator' && selectedCreator && (
            <CreatorProfilePage
              creator={selectedCreator}
              currentUser={currentUser}
              onBack={() => handleNavigate('explore')}
              onInviteToBrief={handleInviteToBrief}
              isShortlisted={shortlist.includes(selectedCreator.id)}
              onToggleShortlist={handleToggleShortlist}
              onCreatorUpdated={handleCreatorUpdated}
              onRequireAuth={() => setCurrentPage('auth')}
            />
          )}

          {currentPage === 'brief' && (
            <CreateBriefPage
              invitedCreator={invitedCreator}
              currentUser={currentUser}
              onClearInvitedCreator={() => setInvitedCreator(null)}
              onNavigate={handleNavigate}
              onRequireAuth={() => setCurrentPage('auth')}
              prefilledBriefData={prefilledBriefData}
              onMatchCreatorsForBrief={handleMatchCreatorsForBrief}
            />
          )}

          {currentPage === 'projects' && (
            <ProjectsPage
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onRequireAuth={() => setCurrentPage('auth')}
            />
          )}

          {currentPage === 'auth' && (
            <AuthPage
              initialMode={authMode}
              onSuccess={handleAuthSuccess}
              onDemoSuccess={handleDemoSuccess}
              onCancel={() => setCurrentPage('home')}
            />
          )}
        </PageTransition>
      </AnimatePresence>

      {/* Compact Restrained Footer */}
      {currentPage !== 'onboarding' && currentPage !== 'auth' && <Footer
        onNavigate={handleNavigate}
        onOpenCopilot={() => setIsCopilotOpen(true)}
      />}

      {!isCopilotOpen && (
        <button
          type="button"
          className="pf-copilot-launcher"
          onClick={() => setIsCopilotOpen(true)}
          aria-label="Open Creatopia AI assistant"
          title="Open AI assistant"
        >
          <MessageCircle aria-hidden="true" />
          <span className="pf-copilot-launcher-pulse" aria-hidden="true" />
        </button>
      )}

      {/* Creative Copilot Chatbot Drawer */}
      <CreativeCopilot
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onTransferToBrief={handleTransferToBrief}
      />
    </div>
  );
}
