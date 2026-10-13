import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Send,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
  Layers,
  MapPin,
  ExternalLink,
  Check,
  Plus,
  Edit3,
  X,
  Upload,
  Sliders,
} from 'lucide-react';
import { Creator, PortfolioItem, PageView, VerificationStatus, User, VerificationEvidence } from '../types';
import { VerificationBadge } from '../components/VerificationBadge';
import { LightboxModal } from '../components/LightboxModal';
import { StorageService } from '../services/storage';
import { useTheme } from '../context/ThemeContext';

interface CreatorProfilePageProps {
  creator: Creator;
  currentUser: User | null;
  onBack: () => void;
  onInviteToBrief: (creatorId: string) => void;
  isShortlisted: boolean;
  onToggleShortlist: (creatorId: string) => void;
  onCreatorUpdated?: (updated: Creator) => void;
  onRequireAuth: () => void;
}

export const CreatorProfilePage: React.FC<CreatorProfilePageProps> = ({
  creator,
  currentUser,
  onBack,
  onInviteToBrief,
  isShortlisted,
  onToggleShortlist,
  onCreatorUpdated,
  onRequireAuth,
}) => {
  const { isDark } = useTheme();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showReviewerPanel, setShowReviewerPanel] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<VerificationStatus>(creator.verificationStatus);
  const [copiedLink, setCopiedLink] = useState(false);

  // Creator self-editing states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
  const [showSubmitEvidenceModal, setShowSubmitEvidenceModal] = useState(false);

  // Edit fields
  const [editBio, setEditBio] = useState(creator.bio);
  const [editTagline, setEditTagline] = useState(creator.tagline);
  const [editRate, setEditRate] = useState(creator.rateEstimate);

  // New portfolio piece fields
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newContentType, setNewContentType] = useState<PortfolioItem['contentType']>('Brand Film');
  const [newTools, setNewTools] = useState('Runway Gen-3, Midjourney v6');
  const [newPrompt, setNewPrompt] = useState('');

  // Submit Evidence fields
  const [evidenceClaim, setEvidenceClaim] = useState('');
  const [evidenceType, setEvidenceType] = useState<VerificationEvidence['evidenceType']>('node_graph');
  const [evidenceDesc, setEvidenceDesc] = useState('');

  const isOwner =
    currentUser &&
    (currentUser.creatorProfileId === creator.id || currentUser.id === creator.userId);

  const handleStatusChangeByReviewer = (newStatus: VerificationStatus) => {
    setCurrentStatus(newStatus);
    const updatedList = StorageService.updateCreatorVerification(creator.id, newStatus);
    const updated = updatedList.find((c) => c.id === creator.id);
    if (updated && onCreatorUpdated) {
      onCreatorUpdated(updated);
    }
  };

  const handleSaveProfile = () => {
    const updated: Creator = {
      ...creator,
      bio: editBio,
      tagline: editTagline,
      rateEstimate: editRate,
    };
    StorageService.saveCreator(updated);
    if (onCreatorUpdated) onCreatorUpdated(updated);
    setIsEditingProfile(false);
  };

  const handleAddPortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: PortfolioItem = {
      id: 'p-' + Date.now(),
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom original commercial deliverable produced with GenAI.',
      imageUrl: newImgUrl.trim() || creator.portfolio[0]?.imageUrl || creator.coverImageUrl,
      contentType: newContentType,
      aspectRatio: '16:9',
      toolsUsed: newTools.split(',').map((t) => t.trim()).filter(Boolean),
      promptExcerpt: newPrompt.trim() || undefined,
      year: '2026',
    };

    const updatedPortfolio = [newItem, ...creator.portfolio];
    const updated: Creator = {
      ...creator,
      portfolio: updatedPortfolio,
    };

    StorageService.saveCreator(updated);
    if (onCreatorUpdated) onCreatorUpdated(updated);
    setShowAddPortfolioModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewImgUrl('');
    setNewPrompt('');
  };

  const handleSubmitEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceClaim.trim()) return;

    const newEvidence: VerificationEvidence = {
      claim: evidenceClaim.trim(),
      evidenceType,
      description: evidenceDesc.trim() || 'Technical artifacts, project graph, and seed manifests.',
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'evidence_submitted',
    };

    const updatedEvidence = [...creator.verificationEvidence, newEvidence];
    const updated: Creator = {
      ...creator,
      verificationStatus: 'evidence_submitted',
      verificationEvidence: updatedEvidence,
    };

    setCurrentStatus('evidence_submitted');
    StorageService.saveCreator(updated);
    if (onCreatorUpdated) onCreatorUpdated(updated);
    setShowSubmitEvidenceModal(false);
    setEvidenceClaim('');
    setEvidenceDesc('');
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className={`pf-page max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 transition-colors duration-200 ${
        isDark ? 'text-white' : 'text-[#242424]'
      }`}
    >
      {/* Back button and quick actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Reviewer Audit Controls */}
          <button
            type="button"
            onClick={() => setShowReviewerPanel(!showReviewerPanel)}
            className="px-3 py-1.5 text-xs font-semibold text-[#94A3B8] hover:text-white bg-[#121622] hover:bg-[#1A1F2E] border border-[#232838] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            title="Inspect reviewer tools"
          >
            <Sliders className="w-3.5 h-3.5 text-[#00C9FF]" />
            <span>Reviewer Station</span>
          </button>

          <button
            type="button"
            onClick={handleShareProfile}
            className="px-3 py-1.5 text-xs font-semibold text-[#94A3B8] hover:text-white bg-[#121622] hover:bg-[#1A1F2E] border border-[#232838] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Reviewer Audit Bar (Simulation) */}
      {showReviewerPanel && (
        <div className="p-4 bg-[#121622] border border-[#00C9FF]/30 rounded-2xl space-y-3 text-xs animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00C9FF]" />
              <span>Authorized Reviewer Audit Station</span>
            </div>
            <span className="text-[11px] text-[#94A3B8]">
              Only authorized reviewer can approve verified badge
            </span>
          </div>
          <p className="text-[#94A3B8] text-xs">
            Createopia policy: Creators can submit evidence, but only authorized human reviewers can approve "Verified" status.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button type="button" onClick={() => handleStatusChangeByReviewer('self_reported')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${currentStatus === 'self_reported' ? 'bg-white text-black' : 'bg-[#1A1F2E] text-white border border-[#232838] hover:bg-[#2A3246]'}`}>
              Set Self-reported
            </button>
            <button type="button" onClick={() => handleStatusChangeByReviewer('evidence_submitted')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${currentStatus === 'evidence_submitted' ? 'bg-amber-600 text-white' : 'bg-[#1A1F2E] text-white border border-[#232838] hover:bg-[#2A3246]'}`}>
              Set Evidence Submitted
            </button>
            <button type="button" onClick={() => handleStatusChangeByReviewer('verified')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${currentStatus === 'verified' ? 'bg-emerald-600 text-white' : 'bg-[#1A1F2E] text-white border border-[#232838] hover:bg-[#2A3246]'}`}>
              Approve &amp; Verify Claim
            </button>
          </div>
        </div>
      )}

      {/* Header Profile Section */}
      <div className="bg-[#121622] rounded-2xl border border-[#232838] p-6 md:p-8 space-y-6 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border border-[#232838]"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {creator.name}
                </h1>
                <VerificationBadge
                  status={currentStatus}
                  evidence={creator.verificationEvidence}
                  creatorName={creator.name}
                />
              </div>
              <div className="text-xs text-[#94A3B8] font-medium flex items-center gap-2">
                <span>{creator.handle}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#64748B]" />
                  {creator.location}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#00C9FF] font-semibold">{creator.specialization}</span>
              </div>
              <div className="text-xs text-[#CBD5E1] pt-0.5">{creator.tagline}</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {isOwner && (
              <button
                type="button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="px-3.5 py-2.5 text-xs font-semibold text-white bg-[#1A1F2E] hover:bg-[#2A3246] border border-[#232838] rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  onRequireAuth();
                  return;
                }
                onToggleShortlist(creator.id);
              }}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                isShortlisted
                  ? 'bg-[#E60067] text-white border-[#E60067]'
                  : 'bg-[#151923] text-white border-[#232838] hover:border-[#E60067]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-white' : ''}`} />
              <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  onRequireAuth();
                  return;
                }
                onInviteToBrief(creator.id);
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#E60067] hover:bg-[#C70058] rounded-xl transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Invite to Brief</span>
            </button>
          </div>
        </div>

        {/* Edit Profile Form (Owner only) */}
        {isEditingProfile && (
          <div className="p-4 bg-[#1A1F2E] rounded-xl border border-[#232838] space-y-3 text-xs">
            <div className="font-bold text-white">Edit Your Profile</div>
            <div>
              <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Headline</label>
              <input
                type="text"
                value={editTagline}
                onChange={(e) => setEditTagline(e.target.value)}
                className="w-full px-3 py-2 bg-[#121622] border border-[#232838] rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Biography</label>
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={3}
                className="w-full p-3 bg-[#121622] border border-[#232838] rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">Typical Rate Scope</label>
              <input
                type="text"
                value={editRate}
                onChange={(e) => setEditRate(e.target.value)}
                className="w-full px-3 py-2 bg-[#121622] border border-[#232838] rounded-lg text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-3 py-1.5 border border-[#232838] rounded-lg text-[#94A3B8]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-4 py-1.5 bg-[#E60067] hover:bg-[#C70058] text-white rounded-lg font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Bio */}
        <div className="pt-4 border-t border-[#1F2433]">
          <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-3xl">
            {creator.bio}
          </p>
        </div>

        {/* Skills & Primary Tools */}
        <div className="pt-4 border-t border-[#1F2433] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1.5">
            <span className="font-semibold text-white">Primary Models &amp; Tools:</span>
            <div className="text-[#94A3B8] leading-relaxed">
              {creator.primaryTools.map((tool, idx) => (
                <span key={idx}>
                  <span className="text-[#CBD5E1]">{tool}</span>
                  {idx < creator.primaryTools.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="font-semibold text-white">Specialized Capabilities:</span>
            <div className="text-[#94A3B8] leading-relaxed">
              {creator.skills.map((skill, idx) => (
                <span key={idx}>
                  <span className="text-[#CBD5E1]">{skill}</span>
                  {idx < creator.skills.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Commercial & Production Specifications */}
        <div className="pt-4 border-t border-[#1F2433] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-[#151923] rounded-xl border border-[#232838] space-y-1">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Turnaround</span>
            <span className="font-bold text-white block">{creator.turnaroundTime || '1-2 weeks'}</span>
          </div>

          <div className="p-3 bg-[#151923] rounded-xl border border-[#232838] space-y-1">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Commercial Rights</span>
            <span className="font-bold text-emerald-400 block">
              {creator.commercialBuyoutReady ? 'Buyout Ready' : 'Negotiable'}
            </span>
          </div>

          <div className="p-3 bg-[#151923] rounded-xl border border-[#232838] space-y-1">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Seed Logs</span>
            <span className="font-bold text-[#E60067] block">
              {creator.seedLogsVerified ? 'Verified & Logged' : 'Available on request'}
            </span>
          </div>

          <div className="p-3 bg-[#151923] rounded-xl border border-[#232838] space-y-1">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">Region</span>
            <span className="font-bold text-white block">{creator.region || 'Remote / Global'}</span>
          </div>
        </div>
      </div>

      {/* Portfolio Gallery Section */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#E60067] tracking-wider uppercase">
              Showcase
            </div>
            <h2 className="text-2xl font-bold text-white mt-0.5">
              Portfolio &amp; Original Deliverables
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#94A3B8]">
              {creator.portfolio.length} project{creator.portfolio.length === 1 ? '' : 's'}
            </span>
            {isOwner && (
              <button
                type="button"
                onClick={() => setShowAddPortfolioModal(true)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#E60067] hover:bg-[#C70058] rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {creator.portfolio.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-[#121622] rounded-2xl border border-[#232838] overflow-hidden hover:border-[#E60067] transition-all cursor-pointer group flex flex-col"
            >
              <div className="relative aspect-16/10 bg-black overflow-hidden">
                {item.videoUrl ? (
                  <video
                    src={item.videoUrl}
                    poster={item.imageUrl}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={`${item.title} video preview`}
                  />
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute top-3 left-3 bg-black/80 text-white text-[11px] px-2.5 py-1 rounded font-mono border border-white/20">
                  {item.aspectRatio}
                </div>
                <div className="absolute top-3 right-3 bg-black/80 text-[#00C9FF] text-[11px] px-2.5 py-1 rounded font-semibold border border-white/20">
                  {item.contentType}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-white text-base group-hover:text-[#FF007A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1F2433] flex items-center justify-between text-xs text-[#94A3B8]">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#64748B]" />
                    <span className="text-[#CBD5E1]">{item.toolsUsed.join(' · ')}</span>
                  </div>
                  <span className="font-semibold text-[#E60067] group-hover:translate-x-0.5 transition-transform">
                    Inspect ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Production Workflow Pipeline */}
      <section className="bg-[#121622] rounded-2xl border border-[#232838] p-6 md:p-8 space-y-6">
        <div>
          <div className="text-[11px] font-bold text-[#E60067] tracking-wider uppercase">
            Technical Methodology
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Production &amp; Generation Workflow
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            How {creator.name} ensures character consistency, motion coherence, and client delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {creator.workflow.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#151923] border border-[#232838] space-y-2 text-xs"
            >
              <div className="font-bold text-white text-sm">{step.phase}</div>
              <p className="text-[#94A3B8] leading-relaxed">{step.description}</p>
              <div className="pt-2 text-[11px] text-[#64748B]">
                <span className="font-medium text-[#CBD5E1]">Tools:</span>{' '}
                {step.tools.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verification Evidence Audit Log */}
      <section className="bg-[#121622] rounded-2xl border border-[#232838] p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#E60067] tracking-wider uppercase">
              Trust &amp; Provenance
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Verification Status &amp; Audit Trail
            </h2>
          </div>
          <VerificationBadge
            status={currentStatus}
            evidence={creator.verificationEvidence}
            creatorName={creator.name}
          />
        </div>

        <div className="space-y-4">
          {creator.verificationEvidence.map((ev, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#232838] bg-[#151923] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">{ev.claim}</span>
                {ev.status === 'verified' ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> Verified Claim
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                    <FileText className="w-4 h-4" /> Pending Review
                  </span>
                )}
              </div>
              <p className="text-[#94A3B8] leading-relaxed">{ev.description}</p>
              <div className="pt-2 border-t border-[#1F2433] text-[11px] text-[#64748B] flex flex-wrap gap-x-4 gap-y-1">
                <span>Submitted: {ev.submittedAt}</span>
                {ev.verifiedAt && <span>Approved Date: {ev.verifiedAt}</span>}
                {ev.verifiedBy && <span>Reviewer: {ev.verifiedBy}</span>}
              </div>
              {ev.reviewerNotes && (
                <div className="p-2.5 bg-[#1A1F2E] rounded-lg border border-[#232838] text-white italic text-[11px]">
                  Reviewer Notes: "{ev.reviewerNotes}"
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Add Portfolio Piece Modal (Owner only) */}
      {showAddPortfolioModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowAddPortfolioModal(false)}
        >
          <div
            className="w-full max-w-lg bg-[#121622] rounded-2xl border border-[#232838] p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2433]">
              <h3 className="font-bold text-base text-white">Add Portfolio Artwork</h3>
              <button
                type="button"
                onClick={() => setShowAddPortfolioModal(false)}
                className="text-[#94A3B8] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPortfolioItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-white mb-1">Project Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Chroma Dreams: Spec Luxury Commercial"
                  required
                  className="w-full px-3.5 py-2 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Summary of the creative concept, cinematography cues, and artistic intent..."
                  rows={2}
                  className="w-full p-3 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Image URL / Asset</label>
                <input
                  type="text"
                  value={newImgUrl}
                  onChange={(e) => setNewImgUrl(e.target.value)}
                  placeholder="Paste image URL (or leave blank to use high-res film still)"
                  className="w-full px-3.5 py-2 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Tools &amp; Pipeline</label>
                <input
                  type="text"
                  value={newTools}
                  onChange={(e) => setNewTools(e.target.value)}
                  placeholder="Runway Gen-3, Midjourney v6, Topaz AI"
                  className="w-full px-3.5 py-2 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Master Prompt Excerpt</label>
                <textarea
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Prompt excerpt demonstrating camera settings and lighting..."
                  rows={2}
                  className="w-full p-3 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPortfolioModal(false)}
                  className="px-4 py-2 border border-[#232838] rounded-xl text-[#94A3B8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E60067] hover:bg-[#C70058] text-white rounded-xl font-bold uppercase tracking-wider"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit Verification Evidence Modal (Owner only) */}
      {showSubmitEvidenceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowSubmitEvidenceModal(false)}
        >
          <div
            className="w-full max-w-lg bg-[#121622] rounded-2xl border border-[#232838] p-6 space-y-4 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2433]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">Submit Verification Evidence</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmitEvidenceModal(false)}
                className="text-[#94A3B8] hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Submit proof of your AI workflow (node graphs, raw project files, screen captures, or seed logs). An authorized reviewer will inspect and validate the claim.
            </p>

            <form onSubmit={handleSubmitEvidence} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-white mb-1">Evidence Title / Claim *</label>
                <input
                  type="text"
                  value={evidenceClaim}
                  onChange={(e) => setEvidenceClaim(e.target.value)}
                  placeholder="e.g. ComfyUI Custom AnimateDiff Node Graph JSON"
                  required
                  className="w-full px-3.5 py-2 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Evidence Type</label>
                <select
                  value={evidenceType}
                  onChange={(e) => setEvidenceType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                >
                  <option value="node_graph">Node Graph (ComfyUI / Houdini)</option>
                  <option value="screen_capture">Timeline Screen Capture (DaVinci / Premiere)</option>
                  <option value="seed_reproducibility">Seed Reproducibility Log</option>
                  <option value="client_deliverable">Client Deliverable Invoice / License</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Description &amp; Verification Notes</label>
                <textarea
                  value={evidenceDesc}
                  onChange={(e) => setEvidenceDesc(e.target.value)}
                  placeholder="Describe seeds, parameter checkpoints, or attach verification cloud link..."
                  rows={3}
                  className="w-full p-3 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitEvidenceModal(false)}
                  className="px-4 py-2 border border-[#232838] rounded-xl text-[#94A3B8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E60067] hover:bg-[#C70058] text-white rounded-xl font-bold uppercase tracking-wider"
                >
                  Submit for Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
