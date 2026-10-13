import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Send,
  Save,
  FileCheck,
  UserCheck,
  ArrowRight,
  Search,
} from 'lucide-react';
import { Creator, CreativeBrief, PageView, User } from '../types';
import { StorageService } from '../services/storage';
import { useTheme } from '../context/ThemeContext';

interface CreateBriefPageProps {
  invitedCreator: Creator | null;
  currentUser: User | null;
  onClearInvitedCreator: () => void;
  onNavigate: (page: PageView) => void;
  onRequireAuth: () => void;
  prefilledBriefData?: {
    title?: string;
    contentType?: string;
    visualStyle?: string;
    referenceNotes?: string;
  } | null;
  onMatchCreatorsForBrief?: (brief: CreativeBrief) => void;
}

export const CreateBriefPage: React.FC<CreateBriefPageProps> = ({
  invitedCreator,
  currentUser,
  onClearInvitedCreator,
  onNavigate,
  onRequireAuth,
  prefilledBriefData,
  onMatchCreatorsForBrief,
}) => {
  const { isDark } = useTheme();
  // AI Brief Builder input
  const [aiIdea, setAiIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [missingRequirements, setMissingRequirements] = useState<string[]>([]);

  // Brief Form Fields
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [contentType, setContentType] = useState('AI Brand Film');
  const [visualStyle, setVisualStyle] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [duration, setDuration] = useState('30 seconds');
  const [budgetMin, setBudgetMin] = useState('4000');
  const [budgetMax, setBudgetMax] = useState('7500');
  const [deadline, setDeadline] = useState('');
  const [commercialRequirements, setCommercialRequirements] = useState(
    'Full worldwide digital commercial rights. Prompt recipes, seed reproducibility logs, and original upscaled master files included.'
  );
  const [referenceNotes, setReferenceNotes] = useState('');

  // Status and saved state
  const [savedSuccess, setSavedSuccess] = useState<CreativeBrief | null>(null);
  const [savedBriefs, setSavedBriefs] = useState<CreativeBrief[]>([]);
  const [viewTab, setViewTab] = useState<'create' | 'saved'>('create');

  useEffect(() => {
    setSavedBriefs(StorageService.getBriefs());
  }, []);

  // Handle prefilled data from Creative Copilot or Lightbox
  useEffect(() => {
    if (prefilledBriefData) {
      if (prefilledBriefData.title) setTitle(prefilledBriefData.title);
      if (prefilledBriefData.contentType) setContentType(prefilledBriefData.contentType);
      if (prefilledBriefData.visualStyle) setVisualStyle(prefilledBriefData.visualStyle);
      if (prefilledBriefData.referenceNotes) setReferenceNotes(prefilledBriefData.referenceNotes);
    }
  }, [prefilledBriefData]);

  // Handle Gemini Brief Builder
  const handleBuildWithAI = async () => {
    if (!aiIdea.trim()) {
      setAiError('Please enter a creative concept or campaign idea.');
      return;
    }

    setIsGenerating(true);
    setAiError(null);
    setMissingRequirements([]);

    try {
      const response = await fetch('/api/brief/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: aiIdea.trim() }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(errorPayload?.error || `AI brief builder failed (${response.status}).`);
      }

      const data = await response.json();

      if (data.title) setTitle(data.title);
      if (data.objective) setObjective(data.objective);
      if (data.contentType) setContentType(data.contentType);
      if (data.visualStyle) setVisualStyle(data.visualStyle);
      if (data.deliverables) setDeliverables(data.deliverables);
      if (data.aspectRatio) setAspectRatio(data.aspectRatio);
      if (data.duration) setDuration(data.duration);
      if (data.budgetMin) setBudgetMin(String(data.budgetMin));
      if (data.budgetMax) setBudgetMax(String(data.budgetMax));
      if (data.budget && !data.budgetMin) {
        const amounts = String(data.budget).match(/\d[\d,]*/g)?.map((value: string) => value.replace(/,/g, '')) || [];
        if (amounts[0]) setBudgetMin(amounts[0]);
        if (amounts[1]) setBudgetMax(amounts[1]);
      }
      if (typeof data.deadline === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(data.deadline)) {
        setDeadline(data.deadline);
      } else if (data.deadline) {
        setDeadline('');
      }
      if (data.commercialRequirements) setCommercialRequirements(data.commercialRequirements);
      if (data.referenceNotes) setReferenceNotes(data.referenceNotes);

      if (data.missingRequirements && data.missingRequirements.length > 0) {
        setMissingRequirements(data.missingRequirements);
      }
    } catch (err: any) {
      // Structured client fallback if server model has transient spike
      setAiError(err instanceof Error ? err.message : 'The AI brief builder is unavailable. Your draft was not changed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = (status: 'draft' | 'published') => {
    if (!title.trim() || !objective.trim()) {
      setAiError('Please provide a campaign title and objective.');
      return;
    }

    if (Number(budgetMax) < Number(budgetMin)) {
      setAiError('Budget maximum must be greater than or equal to the budget minimum.');
      return;
    }

    if (!currentUser) {
      onRequireAuth();
      return;
    }

    const newBrief: CreativeBrief = {
      id: 'brief-' + Date.now(),
      brandId: currentUser.id,
      brandName: currentUser.organizationName || currentUser.name,
      title: title.trim(),
      objective: objective.trim(),
      contentType,
      visualStyle: visualStyle.trim() || 'Cinematic Direction',
      deliverables: deliverables.trim() || '4K Master Video + High-Res Stills',
      aspectRatio,
      duration,
      budget: `$${Number(budgetMin || 0).toLocaleString()} - $${Number(budgetMax || 0).toLocaleString()}`,
      deadline,
      commercialRequirements,
      referenceNotes,
      invitedCreatorId: invitedCreator?.id,
      missingRequirements,
      status,
      createdAt: new Date().toISOString().split('T')[0],
    };

    StorageService.saveBrief(newBrief);

    if (invitedCreator && status === 'published') {
      const brandUser = currentUser || {
        id: 'brand-guest',
        email: 'brand@client.co',
        role: 'brand' as const,
        name: 'Brand Client',
        organizationName: 'Creative Brand',
      };
      StorageService.createEngagement(newBrief, invitedCreator, brandUser);
    }

    setSavedBriefs(StorageService.getBriefs());
    setSavedSuccess(newBrief);
  };

  return (
    <div className={`pf-page max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 ${isDark ? 'text-white' : 'text-[#242424]'}`}>
      {/* Top Header & Tab Controls */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${isDark ? 'border-[#1F2433]' : 'border-[#D9D7D0]'}`}>
        <div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#242424]'}`}>
            Create a Creative Brief
          </h1>
          <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-[#CBD5E1]' : 'text-[#5F626B]'}`}>
            Turn your campaign goals into a high-precision, production-ready specification.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className={`flex items-center gap-2 p-1 rounded-xl border text-xs self-start sm:self-auto ${isDark ? 'bg-[#121622] border-[#232838]' : 'bg-white border-[#D9D7D0] shadow-sm'}`}>
          <button
            type="button"
            onClick={() => setViewTab('create')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
              viewTab === 'create'
                ? 'bg-[#E60067] text-white shadow-xs'
                : isDark ? 'text-[#94A3B8] hover:text-white' : 'text-[#5F626B] hover:text-[#242424]'
            }`}
          >
            Brief Builder
          </button>
          <button
            type="button"
            onClick={() => setViewTab('saved')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
              viewTab === 'saved'
                ? 'bg-[#E60067] text-white shadow-xs'
                : isDark ? 'text-[#94A3B8] hover:text-white' : 'text-[#5F626B] hover:text-[#242424]'
            }`}
          >
            Saved Briefs ({savedBriefs.length})
          </button>
        </div>
      </div>

      {viewTab === 'saved' ? (
        /* Saved Briefs View */
        <div className="space-y-6">
          {savedBriefs.length > 0 ? (
            savedBriefs.map((b) => (
              <div
                key={b.id}
                className="bg-[#121622] rounded-2xl border border-[#232838] p-6 space-y-4 shadow-md text-white"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#E60067] uppercase">
                      {b.contentType}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{b.title}</h3>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-md font-semibold ${
                      b.status === 'published'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        : 'bg-[#1A1F2E] text-[#94A3B8]'
                    }`}
                  >
                    {b.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>

                <p className="text-xs text-[#CBD5E1] leading-relaxed">{b.objective}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-[#1F2433] text-[#94A3B8]">
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Budget</span>
                    <strong className="text-white">{b.budget}</strong>
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Deadline</span>
                    <strong className="text-white">{b.deadline}</strong>
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Aspect Ratio</span>
                    <strong className="text-white">{b.aspectRatio}</strong>
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Duration</span>
                    <strong className="text-white">{b.duration}</strong>
                  </div>
                </div>

                {/* Match Creators Button */}
                <div className="pt-2 flex items-center justify-between">
                  {b.invitedCreatorId ? (
                    <span className="text-xs text-[#94A3B8]">
                      Assigned to creator: <strong className="text-white">{b.invitedCreatorId}</strong>
                    </span>
                  ) : (
                    <span className="text-xs text-[#94A3B8]">
                      Open brief ready for creator matching.
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (onMatchCreatorsForBrief) {
                        onMatchCreatorsForBrief(b);
                      } else {
                        onNavigate('explore');
                      }
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#E60067] hover:bg-[#C70058] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Find Matching Creators</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-[#121622] rounded-2xl border border-[#232838] text-xs text-[#94A3B8]">
              No briefs saved yet. Build your first brief using the editor!
            </div>
          )}
        </div>
      ) : (
        /* Brief Builder Form */
        <div className="space-y-8">
          {/* Invited Creator Banner */}
          {invitedCreator && (
            <div className="p-4 bg-[#E60067]/15 border border-[#E60067]/30 rounded-2xl flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <img
                  src={invitedCreator.avatarUrl}
                  alt={invitedCreator.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#232838]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#00C9FF]" />
                    <span>Direct Invitation to {invitedCreator.name}</span>
                  </div>
                  <div className="text-[11px] text-[#CBD5E1]">
                    Publishing this brief will create an engagement and invite {invitedCreator.handle} directly.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClearInvitedCreator}
                className="text-xs text-[#FF007A] hover:underline font-semibold cursor-pointer"
              >
                Clear Invitation
              </button>
            </div>
          )}

          {/* AI-Assisted Brief Builder Section (At Top) */}
          <div className="p-6 bg-[#121622] rounded-2xl border border-[#232838] space-y-4 shadow-md text-white">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00C9FF] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#00C9FF]" />
              <span>AI Brief Builder with Gemini</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Describe your creative idea...
              </label>
              <textarea
                value={aiIdea}
                onChange={(e) => setAiIdea(e.target.value)}
                placeholder="E.g., We are launching an electric hypercar. Need a 45-second high-energy spec commercial featuring volumetric neon tunnel racing, anamorphic lens flares, DaVinci color grading, and 4K deliverables for paid social."
                rows={3}
                disabled={isGenerating}
                className="w-full p-3 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white transition-colors leading-relaxed placeholder-[#64748B]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] text-[#94A3B8]">
                Gemini structures deliverables, specs, and highlights missing requirements.
              </span>

              <button
                type="button"
                onClick={handleBuildWithAI}
                disabled={isGenerating || !aiIdea.trim()}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#E60067] hover:bg-[#C70058] disabled:opacity-40 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md uppercase tracking-wider"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Structuring Brief with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Build Brief with AI</span>
                  </>
                )}
              </button>
            </div>

            {aiError && (
              <div className="p-3 bg-red-950/60 border border-red-800/40 rounded-xl text-xs text-rose-300">
                {aiError}
              </div>
            )}
          </div>

          {/* Missing Requirements Callout Banner */}
          {missingRequirements.length > 0 && (
            <div className="p-4 bg-amber-950/40 border border-amber-800/50 rounded-2xl space-y-2 text-xs text-amber-200 animate-in fade-in duration-200">
              <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Notice: Missing Parameters in Rough Idea</span>
              </div>
              <p className="text-[#CBD5E1]">
                Rather than inventing unstated facts, Gemini identified the following parameters for your review:
              </p>
              <ul className="list-disc list-inside space-y-1 text-amber-200 pl-1 font-medium">
                {missingRequirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Structured Brief Form (Fully Editable) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave('published');
            }}
            className="bg-[#121622] rounded-2xl border border-[#232838] p-6 md:p-8 space-y-6 shadow-md text-white"
          >
            <div className="border-b border-[#1F2433] pb-4">
              <h2 className="text-lg font-bold text-white">Campaign Specifications</h2>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Review and refine all fields before publishing or saving as draft.
              </p>
            </div>

            {/* Campaign Title & Objective */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Apex Hypercar: 'Electric Velocity' 45s Spec"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Campaign Objective *
                </label>
                <textarea
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="What is the commercial or artistic goal of this production?"
                  rows={2}
                  required
                  className="w-full p-3 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
                />
              </div>
            </div>

            {/* Content Type & Visual Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Content Type *
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
                >
                  <option value="AI Brand Film">AI Brand Film</option>
                  <option value="Commercial Short">Commercial Short</option>
                  <option value="3D Motion & VFX">3D Motion &amp; VFX</option>
                  <option value="Key Visuals">High-Fashion Key Visuals</option>
                  <option value="Virtual Production">Virtual Production Assets</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Visual Style *
                </label>
                <input
                  type="text"
                  value={visualStyle}
                  onChange={(e) => setVisualStyle(e.target.value)}
                  placeholder="e.g. Cinematic Neo-Noir, Anamorphic 35mm, Volumetric haze"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
                />
              </div>
            </div>

            {/* Deliverables & Technical Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Deliverables *
                </label>
                <input
                  type="text"
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  placeholder="e.g. 1x 45s (4K ProRes) + 2x 15s (9:16)"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
                >
                  <option value="16:9">16:9 — Widescreen</option>
                  <option value="9:16">9:16 — Vertical</option>
                  <option value="1:1">1:1 — Square</option>
                  <option value="4:5">4:5 — Portrait</option>
                  <option value="3:2">3:2 — Photography</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
                >
                  <option value="N/A — stills">N/A — stills</option>
                  <option value="6 seconds">6 seconds</option>
                  <option value="15 seconds">15 seconds</option>
                  <option value="30 seconds">30 seconds</option>
                  <option value="45 seconds">45 seconds</option>
                  <option value="60 seconds">60 seconds</option>
                  <option value="90 seconds">90 seconds</option>
                </select>
              </div>
            </div>

            {/* Budget & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">Budget minimum (USD) *</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="4000"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">Budget maximum (USD) *</label>
                <input
                  type="number"
                  min={budgetMin || '0'}
                  step="100"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="7500"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-1">Project deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
                />
              </div>
            </div>

            {/* Commercial-use requirements */}
            <div>
              <label className="block text-xs font-semibold text-white mb-1">
                Commercial-Use &amp; Licensing Terms *
              </label>
              <textarea
                value={commercialRequirements}
                onChange={(e) => setCommercialRequirements(e.target.value)}
                rows={2}
                placeholder="Specify commercial buyout scope, prompt logs, seed verification, and model transparency."
                className="w-full p-3 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
              />
            </div>

            {/* Reference images & prompt notes */}
            <div>
              <label className="block text-xs font-semibold text-white mb-1">
                Reference Visuals, Lighting Cues &amp; Master Prompts
              </label>
              <textarea
                value={referenceNotes}
                onChange={(e) => setReferenceNotes(e.target.value)}
                rows={3}
                placeholder="Paste reference image URLs, lighting moodboards, camera movements, or prompt recipes..."
                className="w-full p-3 text-xs bg-[#1A1F2E] border border-[#232838] rounded-xl focus:outline-none focus:border-[#E60067] text-white"
              />
            </div>

            {/* Success Feedback with Direct Match Button */}
            {savedSuccess && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-800/40 rounded-xl text-xs text-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    Brief "{savedSuccess.title}" successfully {savedSuccess.status === 'published' ? 'published' : 'saved'}!
                  </span>
                </div>
                <p className="text-[#94A3B8]">
                  {invitedCreator
                    ? `An active engagement has been opened and sent to ${invitedCreator.name}.`
                    : 'Your brief is now ready to match against eligible verified creators.'}
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (onMatchCreatorsForBrief) {
                        onMatchCreatorsForBrief(savedSuccess);
                      } else {
                        onNavigate('explore');
                      }
                    }}
                    className="px-4 py-2 bg-[#E60067] hover:bg-[#C70058] text-white rounded-lg font-bold inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Find Matching Creators</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className="px-4 py-2 bg-[#1A1F2E] border border-[#232838] text-white hover:bg-[#232838] rounded-lg font-semibold cursor-pointer"
                  >
                    View in Projects
                  </button>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="pt-4 border-t border-[#1F2433] flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => handleSave('draft')}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#1A1F2E] hover:bg-[#232838] border border-[#232838] rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span>Save Draft</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#E60067] hover:bg-[#C70058] rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md uppercase tracking-wider"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Publish Creative Brief</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
