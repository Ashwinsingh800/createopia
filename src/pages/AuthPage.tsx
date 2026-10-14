import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check, AlertCircle, Building2, Palette } from 'lucide-react';
import { AuthMode, UserRole, User, Creator } from '../types';
import { StorageService } from '../services/storage';

function getAuthErrorMessage(error: unknown, mode: AuthMode): string {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error || '').toLowerCase();
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? Number((error as { status?: number }).status)
      : undefined;
  if (
    status === 401 ||
    status === 422 ||
    message.includes('invalid login credentials') ||
    message.includes('user not found') ||
    message.includes('invalid email') ||
    message.includes('email not confirmed') ||
    message.includes('user not found')
  ) {
    return "You don't have an account. Please sign up.";
  }
  if (mode === 'sign_up' && message.includes('already registered')) {
    return 'An account with this email already exists. Please sign in.';
  }
  return mode === 'sign_up'
    ? 'We could not create your account. Please check your details and try again.'
    : 'We could not sign you in right now. Please check your email and password.';
}

interface AuthPageProps {
  initialMode?: AuthMode;
  initialRole?: UserRole | null;
  onSuccess: (user: User) => void;
  onDemoSuccess?: (user: User) => void;
  onCancel?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'sign_in',
  initialRole = null,
  onSuccess,
  onDemoSuccess,
  onCancel,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(initialRole);
  const [signupStep, setSignupStep] = useState(1);
  const [password, setPassword] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');

  // Creator specific onboarding fields
  const [handle, setHandle] = useState('');
  const [tagline, setTagline] = useState('');
  const [specialization, setSpecialization] = useState<Creator['specialization']>('Filmmaking');
  const [primaryTools, setPrimaryTools] = useState('Runway Gen-3, Midjourney v6, DaVinci Resolve');
  const [skills, setSkills] = useState('Cinematography, Color Grading, Prompt Engineering');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handlePasswordAuth = async (flow: 'sign_in' | 'sign_up', role?: 'brand' | 'creator') => {
    if (!email.trim() || !password) {
      setError('Enter your Gmail address and password.');
      return;
    }
    if (flow === 'sign_up' && password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Your password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (flow === 'sign_up') {
        const user = await StorageService.registerUserWithPassword(
          email,
          password,
          role || 'brand',
          fullName,
          organizationName
        );
        onSuccess(user);
      } else {
        const user = await StorageService.authenticateUser(email, password);
        onSuccess(user);
      }
    } catch (err: unknown) {
      setError(getAuthErrorMessage(err, flow === 'sign_up' ? 'sign_up' : 'sign_in'));
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Logins for fast evaluation
  const handleQuickDemo = (demoType: 'brand' | 'creator') => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      try {
        if (demoType === 'brand') {
          const user = StorageService.signInUser('brand@lumina.studio');
          (onDemoSuccess || onSuccess)(user);
        } else {
          const user = StorageService.signInUser('elena@elenafilm.ai');
          (onDemoSuccess || onSuccess)(user);
        }
      } catch (err: any) {
        setError(err.message || 'Demo sign-in failed');
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'forgot_password') {
      if (!email.trim()) {
        setError('Please enter your email address.');
        return;
      }
      setLoading(true);
      void (async () => {
        try {
          throw new Error('Password reset requires an email service and is not available in browser-only mode. Please create a new account or contact support.');
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : 'Could not send the password reset email.');
        } finally {
          setLoading(false);
        }
      })();
      return;
    }

    if (mode === 'sign_in') {
      void handlePasswordAuth('sign_in');
    } else {
      // Sign up / Onboarding flow
      if (signupStep === 1) {
        if (!fullName.trim() || !email.trim()) {
          setError('Please fill in your name and email.');
          return;
        }
        setError(null);
        setSignupStep(2);
        return;
      }
      if (signupStep === 2) {
        if (!selectedRole || (selectedRole !== 'brand' && selectedRole !== 'creator')) {
          setError('Choose Brand / Agency or AI Creator to continue.');
          return;
        }
        setError(null);
        setSignupStep(3);
        return;
      }
      if (!fullName.trim() || !email.trim() || !selectedRole) {
        setError('Complete the required account details before continuing.');
        return;
      }
      const userRole: 'brand' | 'creator' = selectedRole === 'creator' ? 'creator' : 'brand';

      void handlePasswordAuth('sign_up', userRole);
    }
  };

  useEffect(() => {
    if (mode !== 'sign_up') setVerificationSent(false);
  }, [mode]);

  return (
    <div className="auth-page">
      <div className="auth-layout">
        <section className="auth-form-panel">
          <div className="auth-brand">CREATOPIA ACCESS</div>
        {/* Brand Header */}
        <div className="auth-heading">

          {mode === 'sign_up' && (
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
              {[['1', 'Account'], ['2', 'Role']].map(([number, label], index) => (
                <React.Fragment key={number}>
                  <span className={signupStep === index + 1 ? 'text-[#E60067]' : signupStep > index + 1 ? 'text-emerald-400' : ''}>
                    {number}. {label}
                  </span>
                  {index < 1 && <span className="h-px flex-1 bg-[#232838]" />}
                </React.Fragment>
              ))}
            </div>
          )}
          <h1 className="text-3xl font-black text-[#334FC0]">
            {mode === 'sign_in'
              ? 'Sign in to Creatopia'
              : mode === 'sign_up'
              ? 'Create your account'
              : 'Reset your password'}
          </h1>
          <p className="text-sm text-[#737B94]">
            {mode === 'sign_in'
              ? 'Connect with verified creators and manage creative briefs.'
              : mode === 'sign_up'
              ? 'Join as a Brand or Showcase your AI portfolio as a Creator.'
              : 'Enter your email address to receive reset instructions.'}
          </p>
        </div>

        {error && (
          <div className="auth-error p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {mode === 'sign_in' && (
          <div className="auth-demo rounded-xl p-3 text-xs">
            <p className="mb-2 font-bold">Hackathon demo access</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => handleQuickDemo('brand')} disabled={loading} className="auth-demo-button rounded-lg p-2 text-left transition-colors">
                <strong className="block">Brand demo</strong>
                <span className="text-[10px] opacity-75">brand@lumina.studio</span>
              </button>
              <button type="button" onClick={() => handleQuickDemo('creator')} disabled={loading} className="auth-demo-button rounded-lg p-2 text-left transition-colors">
                <strong className="block">Creator demo</strong>
                <span className="text-[10px] opacity-75">elena@elenafilm.ai</span>
              </button>
            </div>
          </div>
        )}

        {verificationSent && (
          <div className="auth-success rounded-xl p-4 text-center text-sm">
            <p className="font-bold">Verify your email to continue</p>
            <p className="mt-2 text-xs leading-5 opacity-80">
              We sent a verification link to {email}. Open it in Gmail or your spam folder. After verification, return here and sign in with your email and password.
            </p>
          </div>
        )}

        {resetSent ? (
          <div className="p-4 bg-emerald-950/60 border border-emerald-800/40 rounded-xl text-xs text-emerald-200 text-center space-y-3">
            <p className="font-bold">Check your email</p>
            <p className="text-[#CBD5E1]">
              We sent password reset instructions to {email}.
            </p>
            <button
              type="button"
              onClick={() => {
                setResetSent(false);
                setMode('sign_in');
              }}
              className="px-4 py-2 bg-[#E60067] text-white rounded-lg font-bold uppercase tracking-wider"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form space-y-4 text-xs">
            {/* Role Selection on Sign Up */}
            {mode === 'sign_up' && signupStep === 2 && (
              <div className="space-y-2">
                <span className="block font-bold text-white text-[11px] uppercase tracking-wider">
                  I am registering as:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('brand');
                      setError(null);
                      setSignupStep(3);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedRole !== 'creator'
                        ? 'bg-[#151923] border-[#E60067]'
                        : 'bg-[#1A1F2E] border-[#232838] hover:border-[#64748B]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#00C9FF] mb-1" />
                    <div className="font-bold text-white">Brand / Agency</div>
                    <div className="text-[10px] text-[#94A3B8]">Hiring creators</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('creator');
                      setError(null);
                      setSignupStep(3);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedRole === 'creator'
                        ? 'bg-[#151923] border-[#E60067]'
                        : 'bg-[#1A1F2E] border-[#232838] hover:border-[#64748B]'
                    }`}
                  >
                    <Palette className="w-4 h-4 text-[#E60067] mb-1" />
                    <div className="font-bold text-white">AI Creator</div>
                    <div className="text-[10px] text-[#94A3B8]">Showcase work</div>
                  </button>
                </div>
              </div>
            )}

            {/* Full Name on Sign Up */}
            {mode === 'sign_up' && signupStep === 1 && (
              <div>
                <label className="block font-bold text-white mb-1">
                  Full Name / Studio Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white focus:outline-none focus:border-[#E60067]"
                />
              </div>
            )}

            {/* Email Address */}
            {(mode !== 'sign_up' || signupStep === 1) && <div>
              <label className="block font-bold text-white mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-3.5 py-2.5 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white focus:outline-none focus:border-[#E60067]"
              />
            </div>}

            {(mode === 'sign_in' || (mode === 'sign_up' && signupStep === 3)) && (
              <>
                {mode === 'sign_up' && (
                  <p className="text-xs text-[#CBD5E1]">
                    Creating a {selectedRole === 'creator' ? 'Creator' : 'Brand / Agency'} account for {email}.
                  </p>
                )}
                <div>
                  <label className="block font-bold text-white mb-1">Password *</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete={mode === 'sign_in' ? 'current-password' : 'new-password'}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white focus:outline-none focus:border-[#E60067]"
                  />
                </div>
                {mode === 'sign_up' && (
                  <div>
                    <label className="block font-bold text-white mb-1">Confirm Password *</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white focus:outline-none focus:border-[#E60067]"
                    />
                  </div>
                )}
              </>
            )}

            {/* Submit Action */}
            {mode === 'sign_up' && signupStep === 3 && (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setSignupStep((current) => current - 1);
                }}
                className="w-full py-2.5 text-[#CBD5E1] border border-[#232838] rounded-xl font-bold"
              >
                Back
              </button>
            )}
            {(mode === 'sign_in' || (mode === 'sign_up' && (signupStep === 1 || signupStep === 3)) || mode === 'forgot_password') && (
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#E60067] hover:bg-[#C70058] active:bg-[#B0004E] text-white font-bold rounded-xl transition-all shadow-md cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1.5 mt-2"
              >
                <span>
                  {loading
                    ? 'Processing...'
                    : mode === 'sign_up' && signupStep === 3
                    ? 'Create Account'
                    : mode === 'sign_up'
                    ? 'Continue'
                    : mode === 'sign_in'
                    ? 'Sign In'
                    : 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </form>
        )}

        {/* Switch mode links */}
        <div className="auth-switch pt-2 border-t text-center text-xs">
          {mode === 'sign_in' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('sign_up');
                  setSignupStep(1);
                  setError(null);
                }}
                className="font-bold text-[#00C9FF] hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('sign_in');
                  setSignupStep(1);
                  setError(null);
                }}
                className="font-bold text-[#00C9FF] hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
        </section>
        <aside className="auth-media-panel" aria-label="Creatopia creative workspace preview">
          <video
            className="auth-media-video"
            src="/auth-background.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="auth-media-overlay" />
          <div className="auth-media-caption">
            <span>Creatopia</span>
            <strong>Make ambitious creative work feel possible.</strong>
          </div>
        </aside>
      </div>
    </div>
  );
};
