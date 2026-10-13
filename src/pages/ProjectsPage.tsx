import React, { useState } from 'react';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Upload,
  MessageSquare,
  AlertCircle,
  FileCheck,
  Send,
  Eye,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  X,
} from 'lucide-react';
import { Engagement, User, EngagementStatus, DeliverableSubmission, PageView } from '../types';
import { StorageService } from '../services/storage';
import { useTheme } from '../context/ThemeContext';

interface ProjectsPageProps {
  currentUser: User | null;
  onNavigate: (page: PageView) => void;
  onRequireAuth: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  currentUser,
  onNavigate,
  onRequireAuth,
}) => {
  const { isDark } = useTheme();
  const [engagements, setEngagements] = useState<Engagement[]>(() =>
    StorageService.getEngagements()
  );
  const [selectedEngId, setSelectedEngId] = useState<string>(
    engagements[0]?.id || ''
  );

  // Deliverable upload modal / form
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [delivTitle, setDelivTitle] = useState('');
  const [delivUrl, setDelivUrl] = useState('');
  const [delivNotes, setDelivNotes] = useState('');

  // Revision / Message input
  const [revisionMessage, setRevisionMessage] = useState('');
  const [isRequestingRevision, setIsRequestingRevision] = useState(false);

  // Success alert
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);

  const activeEngagement = engagements.find((e) => e.id === selectedEngId) || engagements[0];

  const handleStatusChange = (status: EngagementStatus) => {
    if (!activeEngagement) return;
    try {
      const updated = StorageService.updateEngagementStatus(activeEngagement.id, status);
      setEngagements(StorageService.getEngagements());
      setFeedbackSuccess(`Project status updated to ${status.replace('_', ' ')}.`);
      setTimeout(() => setFeedbackSuccess(null), 3000);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAddDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEngagement || !delivTitle.trim()) return;
    const newDeliv: DeliverableSubmission = {
      id: 'deliv-' + Date.now(),
      title: delivTitle.trim(),
      fileUrl: delivUrl.trim() || 'https://storage.pixelforge.ai/deliverables/master_export.mp4',
      previewUrl: activeEngagement.creatorAvatar,
      type: 'video',
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      notes: delivNotes.trim() || 'Uploaded high-resolution master file with seed manifest.',
    };

    StorageService.addDeliverable(activeEngagement.id, newDeliv);
    setEngagements(StorageService.getEngagements());
    setShowUploadModal(false);
    setDelivTitle('');
    setDelivUrl('');
    setDelivNotes('');
    setFeedbackSuccess('Deliverable successfully submitted to brand!');
    setTimeout(() => setFeedbackSuccess(null), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEngagement || !revisionMessage.trim() || !currentUser) return;

    const role = currentUser.role === 'creator' ? 'creator' : 'brand';
    StorageService.addEngagementMessage(activeEngagement.id, {
      id: 'msg-' + Date.now(),
      authorRole: role,
      authorName: currentUser.name,
      message: revisionMessage.trim(),
      createdAt: new Date().toISOString().split('T')[0],
    });

    if (isRequestingRevision) {
      StorageService.updateEngagementStatus(activeEngagement.id, 'revision_requested');
      setIsRequestingRevision(false);
    }

    setEngagements(StorageService.getEngagements());
    setRevisionMessage('');
    setFeedbackSuccess('Note sent to project collaborator.');
    setTimeout(() => setFeedbackSuccess(null), 3000);
  };

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4 text-white">
        <div className="w-12 h-12 rounded-full bg-[#1A1F2E] text-[#94A3B8] flex items-center justify-center mx-auto border border-[#232838]">
          <FolderKanban className="w-6 h-6 text-[#E60067]" />
        </div>
        <h2 className="text-xl font-bold text-white">Project Workspace Access</h2>
        <p className="text-xs text-[#94A3B8] max-w-md mx-auto leading-relaxed">
          Please sign in to inspect active engagements, review uploaded deliverables, and manage approvals.
        </p>
        <button
          type="button"
          onClick={onRequireAuth}
          className="px-5 py-2.5 text-xs font-bold text-white bg-[#E60067] hover:bg-[#C70058] rounded-xl transition-colors cursor-pointer uppercase tracking-wider"
        >
          Sign In to View Projects
        </button>
      </div>
    );
  }

  return (
    <div
      className={`pf-page max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 ${
        isDark ? 'text-white' : 'text-[#242424]'
      }`}
    >
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 ${
          isDark ? 'border-[#1F2433]' : 'border-[#D9D7D0]'
        }`}
      >
        <div>
          <div className={`text-[11px] font-bold tracking-wider uppercase ${isDark ? 'text-[#E60067]' : 'text-[#6556D9]'}`}>
            Workspaces &amp; Engagements
          </div>
          <h1 className={`text-3xl font-extrabold mt-1 ${isDark ? 'text-white' : 'text-[#242424]'}`}>
            Projects &amp; Deliverables
          </h1>
          <p className={`text-xs mt-1 ${isDark ? 'text-[#CBD5E1]' : 'text-[#5F626B]'}`}>
            Review original briefs, inspect uploaded AI deliverables, and approve milestones.
          </p>
        </div>

        {currentUser.role === 'brand' && (
          <button
            type="button"
            onClick={() => onNavigate('brief')}
            className="px-4 py-2 text-xs font-bold text-white bg-[#E60067] hover:bg-[#C70058] rounded-xl transition-colors cursor-pointer uppercase tracking-wider"
          >
            Create New Brief
          </button>
        )}
      </div>

      {feedbackSuccess && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800/40 rounded-xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedbackSuccess}</span>
        </div>
      )}

      {engagements.length === 0 ? (
        <div className="p-16 text-center bg-[#121622] rounded-2xl border border-[#232838] space-y-3">
          <p className="text-sm font-semibold text-white">No active engagements yet</p>
          <p className="text-xs text-[#94A3B8]">
            {currentUser.role === 'brand'
              ? 'Explore creators and send an invitation, or publish a brief.'
              : 'Apply to open briefs or wait for brand invitations.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Project Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block">
              Active Engagements ({engagements.length})
            </span>
            <div className="space-y-2">
              {engagements.map((eng) => {
                const isSelected = eng.id === activeEngagement?.id;
                return (
                  <div
                    key={eng.id}
                    onClick={() => setSelectedEngId(eng.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#151923] border-[#E60067] shadow-sm'
                        : 'bg-[#121622] border-[#232838] hover:border-[#94A3B8]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-[#94A3B8] truncate">{eng.brandName}</span>
                      <span
                        className={`font-bold capitalize ${
                          eng.status === 'completed'
                            ? 'text-emerald-400'
                            : eng.status === 'deliverables_submitted'
                            ? 'text-[#00C9FF]'
                            : eng.status === 'revision_requested'
                            ? 'text-amber-400'
                            : 'text-[#94A3B8]'
                        }`}
                      >
                        {eng.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="font-bold text-xs text-white line-clamp-1">
                      {eng.brief.title}
                    </h3>

                    <div className="flex items-center justify-between text-[10px] text-[#64748B] pt-2 mt-2 border-t border-[#1F2433]">
                      <span>Creator: {eng.creatorName}</span>
                      <span>{eng.deliverables.length} files</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Active Project Detail Workspace */}
          {activeEngagement && (
            <div className="lg:col-span-8 space-y-6">
              {/* Engagement Status Header */}
              <div className="bg-[#121622] rounded-2xl border border-[#232838] p-6 space-y-4 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1F2433]">
                  <div>
                    <span className="text-[11px] font-bold text-[#00C9FF] uppercase tracking-wider">
                      {activeEngagement.brief.contentType}
                    </span>
                    <h2 className="text-xl font-bold text-white mt-0.5">
                      {activeEngagement.brief.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#94A3B8]">Status:</span>
                    <span className="text-xs font-bold text-white px-2.5 py-1 rounded bg-[#1A1F2E] border border-[#232838] capitalize">
                      {activeEngagement.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Brief Scope Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1 text-[#CBD5E1]">
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Budget Escrow</span>
                    <strong className="text-white">{activeEngagement.brief.budget}</strong>
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Target Duration</span>
                    <strong className="text-white">{activeEngagement.brief.duration}</strong>
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Deliverables</span>
                    <strong className="text-white truncate block">{activeEngagement.brief.deliverables}</strong>
                  </div>
                  <div>
                    <span className="text-[#64748B] block text-[11px]">Commercial Buyout</span>
                    <strong className="text-emerald-400">Included (12M)</strong>
                  </div>
                </div>

                {/* Role Actions */}
                <div className="pt-3 border-t border-[#1F2433] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={activeEngagement.creatorAvatar}
                      alt={activeEngagement.creatorName}
                      className="w-7 h-7 rounded-full object-cover border border-[#232838]"
                    />
                    <span className="text-xs text-[#94A3B8]">
                      Assigned to: <strong className="text-white">{activeEngagement.creatorName}</strong>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Creator can upload deliverable */}
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(true)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#E60067] hover:bg-[#C70058] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Deliverable</span>
                    </button>

                    {/* Brand can approve milestone */}
                    {activeEngagement.status !== 'completed' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange('completed')}
                        className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve &amp; Release Escrow</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Uploaded Deliverables Section */}
              <div className="bg-[#121622] rounded-2xl border border-[#232838] p-6 space-y-4 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-[#1F2433]">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#00C9FF]" />
                    <span>Project Deliverables ({activeEngagement.deliverables.length})</span>
                  </h3>
                </div>

                {activeEngagement.deliverables.length > 0 ? (
                  <div className="space-y-3">
                    {activeEngagement.deliverables.map((deliv) => (
                      <div
                        key={deliv.id}
                        className="p-4 rounded-xl border border-[#232838] bg-[#151923] space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">{deliv.title}</span>
                          <span className="text-[11px] text-[#64748B]">
                            Submitted: {deliv.submittedAt}
                          </span>
                        </div>
                        {deliv.notes && (
                          <p className="text-[#94A3B8] leading-relaxed">{deliv.notes}</p>
                        )}
                        <div className="pt-2 flex items-center gap-3">
                          <a
                            href={deliv.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E60067] hover:underline"
                          >
                            <span>Download 4K Master Asset</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-[#94A3B8]">
                    No deliverables uploaded yet. Creator is currently producing the initial motion pass.
                  </div>
                )}
              </div>

              {/* Revision & Discussion Thread */}
              <div className="bg-[#121622] rounded-2xl border border-[#232838] p-6 space-y-4 shadow-md">
                <h3 className="font-bold text-sm text-white flex items-center gap-2 pb-3 border-b border-[#1F2433]">
                  <MessageSquare className="w-4 h-4 text-[#E60067]" />
                  <span>Feedback &amp; Revision Log</span>
                </h3>

                {/* Message Feed */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {activeEngagement.revisionNotes.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3.5 rounded-xl bg-[#1A1F2E] border border-[#232838] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{msg.authorName}</span>
                        <span className="text-[10px] text-[#64748B]">{msg.createdAt}</span>
                      </div>
                      <p className="text-[#CBD5E1] leading-relaxed">{msg.message}</p>
                    </div>
                  ))}
                </div>

                {/* Send Note / Request Revision Form */}
                <form onSubmit={handleSendMessage} className="space-y-3 pt-3 border-t border-[#1F2433]">
                  <textarea
                    value={revisionMessage}
                    onChange={(e) => setRevisionMessage(e.target.value)}
                    rows={2}
                    placeholder="Provide specific timecoded feedback, camera motion requests, or color grading notes..."
                    className="w-full p-3 bg-[#1A1F2E] border border-[#232838] rounded-xl text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#E60067]"
                  />

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-[#94A3B8] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isRequestingRevision}
                        onChange={(e) => setIsRequestingRevision(e.target.checked)}
                        className="rounded bg-[#1A1F2E] border-[#232838] text-[#E60067]"
                      />
                      <span>Mark this note as formal Revision Request</span>
                    </label>

                    <button
                      type="submit"
                      disabled={!revisionMessage.trim()}
                      className="px-4 py-2 bg-[#E60067] hover:bg-[#C70058] disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Note</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Deliverable Upload Modal */}
      {showUploadModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="w-full max-w-lg bg-[#121622] rounded-2xl border border-[#232838] p-6 space-y-4 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2433]">
              <h3 className="font-bold text-base text-white">Upload Milestone Deliverable</h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-[#94A3B8] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDeliverable} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-white mb-1">Deliverable Title *</label>
                <input
                  type="text"
                  value={delivTitle}
                  onChange={(e) => setDelivTitle(e.target.value)}
                  placeholder="e.g. Master 4K ProRes 422 HQ (v2.0)"
                  required
                  className="w-full px-3.5 py-2 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">File Download URL</label>
                <input
                  type="text"
                  value={delivUrl}
                  onChange={(e) => setDelivUrl(e.target.value)}
                  placeholder="https://storage.pixelforge.ai/deliverables/master.mp4"
                  className="w-full px-3.5 py-2 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-white mb-1">Submission Notes &amp; Seed Logs</label>
                <textarea
                  value={delivNotes}
                  onChange={(e) => setDelivNotes(e.target.value)}
                  placeholder="Specify timeline grain passes, fixed camera seeds, and audio stems..."
                  rows={3}
                  className="w-full p-3 bg-[#1A1F2E] border border-[#232838] rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-[#232838] rounded-xl text-[#94A3B8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E60067] hover:bg-[#C70058] text-white rounded-xl font-bold uppercase tracking-wider"
                >
                  Submit Deliverable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
