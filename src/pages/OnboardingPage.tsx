import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Check, Palette, Sparkles } from 'lucide-react';
import { Creator, User, UserRole } from '../types';
import { StorageService } from '../services/storage';
import { useTheme } from '../context/ThemeContext';

interface OnboardingPageProps {
  user: User | null;
  onRequireAuth: () => void;
  onComplete: (user: User) => void;
}

const goals = {
  brand: [
    'Find the right AI creator for a project',
    'Turn an idea into a production-ready brief',
    'Build a reliable creative partner network',
  ],
  creator: [
    'Showcase my AI creative work',
    'Find ambitious brand projects',
    'Build a stronger professional profile',
  ],
};

const steps = ['Your name', 'Your role', 'Your focus'];

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  user,
  onRequireAuth,
  onComplete,
}) => {
  const { isDark } = useTheme();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState<'brand' | 'creator' | null>(
    user?.role === 'creator' ? 'creator' : user?.role === 'brand' ? 'brand' : null
  );
  const [goal, setGoal] = useState(user?.onboardingGoal || '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [complete, setComplete] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) onRequireAuth();
  }, [user, onRequireAuth]);

  useEffect(() => {
    if (step === 0) nameInputRef.current?.focus();
  }, [step]);

  if (!user) return null;

  const validateStep = () => {
    if (step === 0 && !name.trim()) return 'Tell us your name to continue.';
    if (step === 1 && !role) return 'Choose the workspace that fits you best.';
    if (step === 2 && !goal) return 'Choose a focus for your first session.';
    return '';
  };

  const continueStep = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    if (step < 2) setStep((current) => current + 1);
    else void finish();
  };

  const finish = async () => {
    if (!role || !goal) return;
    setSaving(true);
    setError('');
    try {
      let updatedUser = StorageService.updateUserProfile(user.id, {
        name: name.trim(),
        role,
        onboardingGoal: goal,
        onboardingCompleted: true,
      });

      if (role === 'creator' && !updatedUser.creatorProfileId) {
        const creatorId = `creator-${Date.now()}`;
        const newCreator: Creator = {
          id: creatorId,
          userId: updatedUser.id,
          name: name.trim(),
          handle: `@${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '') || 'creator'}`,
          tagline: 'AI Visual Artist & Creator',
          bio: `Portfolio of ${name.trim()}.`,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          coverImageUrl: '/src/assets/images/hero_cinematic_film_1791881136552.jpg',
          specialization: 'Visual Art',
          primaryTools: [],
          skills: [],
          location: 'Remote',
          rateEstimate: '$3,000 - $6,000 / project',
          verificationStatus: 'self_reported',
          verificationEvidence: [],
          portfolio: [],
          workflow: [],
          published: false,
        };
        StorageService.saveCreator(newCreator);
        updatedUser = StorageService.updateUserProfile(updatedUser.id, {
          creatorProfileId: creatorId,
        });
      }

      setComplete(true);
      window.setTimeout(() => onComplete(updatedUser), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'We could not save your preferences.');
    } finally {
      setSaving(false);
    }
  };

  const roleCard = (value: 'brand' | 'creator', title: string, description: string, Icon: typeof Building2) => (
    <button
      type="button"
      aria-pressed={role === value}
      aria-label={`Choose ${title}`}
      onClick={() => {
        setRole(value);
        setGoal('');
        setError('');
        setStep(2);
      }}
      className={`onboarding-choice text-left ${role === value ? 'onboarding-choice-active' : ''}`}
    >
      <span className="flex items-start justify-between gap-4">
        <span className={`onboarding-icon ${role === value ? 'onboarding-icon-active' : ''}`}>
          <Icon size={21} strokeWidth={1.7} />
        </span>
        {role === value && <Check size={19} className="text-[#6556D9]" aria-label="Selected" />}
      </span>
      <span className="mt-7 block text-lg font-semibold">{title}</span>
      <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">{description}</span>
    </button>
  );

  return (
    <section className={`onboarding-shell ${isDark ? 'onboarding-shell-dark' : ''}`}>
      <div className="onboarding-wrap">
        <div className="onboarding-topline">
          <span className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <Sparkles size={16} className="text-[#6556D9]" /> Creatopia
          </span>
          <span className="text-xs text-[var(--text-secondary)]">A few thoughtful questions</span>
        </div>

        <div className="onboarding-progress" aria-label={`Onboarding step ${step + 1} of 3`}>
          <svg className="onboarding-connector" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 3 1 H 97" pathLength="100" />
            <path className="onboarding-connector-fill" d="M 3 1 H 97" pathLength="100" style={{ strokeDashoffset: `${100 - (step / 2) * 100}` }} />
          </svg>
          {steps.map((label, index) => (
            <div className={`onboarding-step ${index <= step ? 'onboarding-step-done' : ''} ${index === step ? 'onboarding-step-current' : ''}`} key={label}>
              <span>{index < step ? <Check size={14} /> : index + 1}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>

        <div className={`onboarding-card ${complete ? 'onboarding-complete' : ''}`} aria-live="polite">
          {complete ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#6556D9] text-white">
                <Check size={28} />
              </div>
              <h1 className="mt-7 text-3xl font-semibold tracking-tight">You’re all set, {name.trim()}.</h1>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                We’ve prepared your {role === 'creator' ? 'creator profile' : 'brand workspace'} around your focus.
              </p>
            </div>
          ) : (
            <>
              <div key={step} className="onboarding-question">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6556D9]">Step {step + 1} of 3</span>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {step === 0 && 'What should we call you?'}
                  {step === 1 && 'Which side of the work are you on?'}
                  {step === 2 && `What are you here to ${role === 'creator' ? 'make' : 'create'}?`}
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--text-secondary)]">
                  {step === 0 && 'A name helps us make every handoff feel a little more human.'}
                  {step === 1 && 'This shapes the tools and workspace you’ll see first.'}
                  {step === 2 && 'Choose the outcome you want to prioritize. You can change this later.'}
                </p>

                <div className="mt-10">
                  {step === 0 && (
                    <input
                      ref={nameInputRef}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      onKeyDown={(event) => event.key === 'Enter' && continueStep()}
                      className="onboarding-input"
                      placeholder="e.g. Sarah Jenkins"
                      autoComplete="name"
                      aria-label="Your name"
                    />
                  )}
                  {step === 1 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {roleCard('brand', 'Brand / Agency', 'Build briefs, discover talent, and move ideas into production.', Building2)}
                      {roleCard('creator', 'AI Creator', 'Share your practice, find great work, and grow your profile.', Palette)}
                    </div>
                  )}
                  {step === 2 && (
                    <div className="grid gap-3">
                      {(role ? goals[role] : []).map((option) => (
                        <button
                          type="button"
                          key={option}
                          aria-pressed={goal === option}
                          aria-label={`Choose ${option}`}
                          onClick={() => {
                            setGoal(option);
                            setError('');
                          }}
                          className={`onboarding-goal ${goal === option ? 'onboarding-goal-active' : ''}`}
                        >
                          <span>{option}</span>
                          {goal === option && <Check size={18} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {error && <p className="mt-4 text-sm font-medium text-red-600" role="alert">{error}</p>}
              </div>

              <div className="mt-12 flex items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6">
                <button type="button" onClick={() => { setError(''); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0 || saving} className="onboarding-back">
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" onClick={continueStep} disabled={saving} className="onboarding-continue">
                  {saving ? 'Saving…' : step === 2 ? 'Enter Creatopia' : 'Continue'} <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
