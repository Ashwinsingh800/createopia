import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => (
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
    <div className="welcome-content">
      <div className="welcome-mark" aria-hidden="true">
        <Play size={14} fill="currentColor" />
      </div>
      <p className="welcome-kicker">AI-native creative marketplace</p>
      <h1>Createopia</h1>
      <p className="welcome-copy">
        Find the people, tools, and momentum to turn an ambitious idea into finished work.
      </p>
      <button type="button" className="welcome-cta" onClick={onGetStarted}>
        Get Started <ArrowRight size={17} />
      </button>
      <p className="welcome-note">Sign in to unlock creator discovery, briefs, and collaboration tools.</p>
    </div>
  </main>
);
