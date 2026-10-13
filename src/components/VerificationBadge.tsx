import React, { useState } from 'react';
import { ShieldCheck, FileText, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { VerificationStatus, VerificationEvidence } from '../types';

interface VerificationBadgeProps {
  status: VerificationStatus;
  evidence?: VerificationEvidence[];
  creatorName?: string;
  showModalOnClick?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  evidence = [],
  creatorName,
  showModalOnClick = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderBadge = () => {
    switch (status) {
      case 'verified':
        return (
          <button
            type="button"
            onClick={(e) => {
              if (showModalOnClick) {
                e.stopPropagation();
                setIsOpen(true);
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer text-left group"
            title="Verified by authorized reviewer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-105 transition-transform" />
            <span>Verified</span>
          </button>
        );
      case 'evidence_submitted':
        return (
          <button
            type="button"
            onClick={(e) => {
              if (showModalOnClick) {
                e.stopPropagation();
                setIsOpen(true);
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer text-left group"
            title="Evidence submitted — under active technical review"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-105 transition-transform" />
            <span>Evidence Submitted</span>
          </button>
        );
      case 'self_reported':
      default:
        return (
          <button
            type="button"
            onClick={(e) => {
              if (showModalOnClick) {
                e.stopPropagation();
                setIsOpen(true);
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] hover:text-white transition-colors cursor-pointer text-left group"
            title="Self-reported claims — not yet verified by reviewer"
          >
            <AlertCircle className="w-3.5 h-3.5 text-[#64748B] shrink-0 group-hover:scale-105 transition-transform" />
            <span>Self-reported</span>
          </button>
        );
    }
  };

  return (
    <>
      {renderBadge()}

      {/* Verification Evidence Detail Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-[#121622] rounded-2xl shadow-2xl border border-[#232838] p-6 max-h-[90vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-[#1F2433]">
              <div>
                <div className="text-[11px] uppercase font-bold tracking-wider text-[#E60067]">
                  Verification Audit Log
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {creatorName ? `${creatorName}'s Status` : 'Verification Details'}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#1A1F2E] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="p-3.5 bg-[#1A1F2E] rounded-xl border border-[#232838] text-xs text-[#CBD5E1] space-y-1.5">
                <div className="font-medium text-white flex items-center gap-2">
                  <span>Current Tier:</span>
                  <span
                    className={`font-semibold ${
                      status === 'verified'
                        ? 'text-emerald-400'
                        : status === 'evidence_submitted'
                        ? 'text-amber-400'
                        : 'text-[#94A3B8]'
                    }`}
                  >
                    {status === 'verified'
                      ? 'Verified Creator'
                      : status === 'evidence_submitted'
                      ? 'Evidence Submitted (Review Pending)'
                      : 'Self-Reported Claims'}
                  </span>
                </div>
                <p className="leading-relaxed text-xs">
                  {status === 'verified'
                    ? 'Only displays "Verified" after an authorized Createopia reviewer inspects raw project files, project seeds, or working timelines.'
                    : status === 'evidence_submitted'
                    ? 'The creator has submitted technical evidence (node graphs, raw project files, screen captures). A human reviewer is validating.'
                    : 'Information has been stated by the creator without independent verification.'}
                </p>
              </div>

              {evidence.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-white uppercase tracking-wider">
                    Submitted Evidence &amp; Claims
                  </div>
                  {evidence.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[#232838] bg-[#151923] space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{item.claim}</span>
                        {item.status === 'verified' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                            <FileText className="w-3.5 h-3.5" /> In Review
                          </span>
                        )}
                      </div>
                      <p className="text-[#94A3B8] leading-relaxed">{item.description}</p>
                      <div className="pt-2 border-t border-[#1F2433] text-[11px] text-[#64748B] flex flex-wrap gap-x-3 gap-y-1">
                        <span>Submitted: {item.submittedAt}</span>
                        {item.verifiedAt && <span>Verified: {item.verifiedAt}</span>}
                        {item.verifiedBy && <span>Auditor: {item.verifiedBy}</span>}
                      </div>
                      {item.reviewerNotes && (
                        <div className="p-2 bg-[#1A1F2E] rounded-lg text-white text-[11px] italic border border-[#232838]">
                          "{item.reviewerNotes}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-[#94A3B8] py-4 text-center">
                  No individual technical claims submitted yet.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#1F2433] flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1A1F2E] hover:bg-[#232838] border border-[#232838] rounded-lg transition-colors cursor-pointer"
              >
                Close Audit Log
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
