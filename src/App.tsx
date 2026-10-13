import React, { useState, useEffect } from 'react';
import { AuthMode, PageView, Creator, User, CreativeBrief } from './types';
import { StorageService } from './services/storage';
import { useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CreativeCopilot } from './components/CreativeCopilot';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CreatorProfilePage } from './pages/CreatorProfilePage';
import { CreateBriefPage } from './pages/CreateBriefPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { WelcomePage } from './pages/WelcomePage';
import { supabase } from './services/supabase';
import { MessageCircle } from 'lucide-react';

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
    const user = StorageService.getCurrentUser();
    return user && !user.onboardingCompleted ? 'onboarding' : 'home';
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

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let mounted = true;
    const restore = async () => {
      const { data } = await client.auth.getSession();
      if (!mounted || !data.session?.user) return;
      const authUser = data.session.user;
      const { data: profile } = await client
        .from('profiles')
        .select('name, role, onboarding_goal, onboarding_completed')
        .eq('id', authUser.id)
        .maybeSingle();
      if (!mounted) return;
      const metadataRole =
        authUser.user_metadata?.role === 'creator' || authUser.user_metadata?.role === 'brand'
          ? authUser.user_metadata.role
          : null;
      const resolvedProfile = profile || (metadataRole
        ? {
            name: String(authUser.user_metadata?.full_name || ''),
            role: metadataRole,
            onboarding_goal: 'Getting started',
            onboarding_completed: true,
          }
        : null);
      if (!profile && resolvedProfile) {
        await client.from('profiles').upsert({
          id: authUser.id,
          ...resolvedProfile,
        });
      }
      const user: User = {
        id: authUser.id,
        email: authUser.email || '',
        role: resolvedProfile?.role || null,
        name: resolvedProfile?.name || authUser.user_metadata?.full_name || '',
        onboardingGoal: resolvedProfile?.onboarding_goal,
        onboardingCompleted: resolvedProfile?.onboarding_completed || false,
        createdAt: authUser.created_at.split('T')[0],
      };
      setCurrentUser(user);
      setShowWelcome(false);
      setCurrentPage(user.onboardingCompleted ? 'home' : 'onboarding');
    };
    void restore();
    const { data: authListener } = client.auth.onAuthStateChange(() => {
      void restore();
    });
    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
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
    if (!user.onboardingCompleted) {
      setCurrentPage('onboarding');
      return;
    }
    if (user.role === 'brand') {
      setCurrentPage('explore');
    } else {
      if (user.creatorProfileId) {
        setSelectedCreatorId(user.creatorProfileId);
        setCurrentPage('creator');
      } else {
        setCurrentPage('explore');
      }
    }
  };

  const handleDemoSuccess = (user: User) => {
    setCurrentUser(user);
    setShowWelcome(false);
    setSelectedCreatorId(null);
    setCurrentPage('home');
  };

  const handleOnboardingComplete = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'creator' && user.creatorProfileId) {
      setCreators(StorageService.getCreators());
      setSelectedCreatorId(user.creatorProfileId);
      setCurrentPage('creator');
    } else {
      setCurrentPage('explore');
    }
  };

  const handleSignOut = () => {
    StorageService.signOut();
    void supabase?.auth.signOut();
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

      {/* Main Content Area */}
      <main key={currentPage} className="flex-1 pf-route">
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

        {currentPage === 'onboarding' && (
          <OnboardingPage
            user={currentUser}
            onRequireAuth={() => setCurrentPage('auth')}
            onComplete={handleOnboardingComplete}
          />
        )}
      </main>

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
          aria-label="Open Createopia AI assistant"
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
