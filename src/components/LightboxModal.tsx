import React from 'react';
import { X, Copy, Check, Sparkles, Layers } from 'lucide-react';
import { PortfolioItem } from '../types';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onUsePromptInBrief?: (prompt: string, title: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onUsePromptInBrief,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!item) return null;

  const handleCopyPrompt = () => {
    if (item.promptExcerpt) {
      navigator.clipboard.writeText(item.promptExcerpt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#121622] rounded-2xl border border-[#232838] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Side */}
        <div className="w-full md:w-3/5 bg-[#0B0E14] flex items-center justify-center relative min-h-[300px] md:min-h-[480px]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain max-h-[70vh]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 bg-black/80 text-white text-xs px-2.5 py-1 rounded-md font-mono border border-white/20">
            {item.aspectRatio}
          </div>
        </div>

        {/* Details Side */}
        <div className="w-full md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto bg-[#121622]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2433]">
              <span className="text-[11px] font-bold text-[#E60067] uppercase tracking-wider">
                {item.contentType}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#1A1F2E] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-white mt-4 leading-snug">
              {item.title}
            </h3>

            <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
              {item.description}
            </p>

            {/* Tools Used */}
            <div className="mt-5 space-y-1.5">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#94A3B8]" />
                Pipeline &amp; Models
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
                {item.toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="bg-[#1A1F2E] border border-[#232838] px-2.5 py-0.5 rounded text-[11px] text-[#CBD5E1]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Prompt Excerpt */}
            {item.promptExcerpt && (
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00C9FF]" />
                    Prompt Excerpt
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#94A3B8] hover:text-[#00C9FF] cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 bg-[#1A1F2E] rounded-xl border border-[#232838] text-xs font-mono text-[#CBD5E1] leading-relaxed max-h-32 overflow-y-auto">
                  {item.promptExcerpt}
                </div>
              </div>
            )}

            {/* Project metadata */}
            <div className="mt-5 pt-3 border-t border-[#1F2433] text-xs text-[#94A3B8] space-y-1">
              {item.clientOrProject && (
                <div>
                  <span className="text-[#64748B]">Context:</span> {item.clientOrProject}
                </div>
              )}
              <div>
                <span className="text-[#64748B]">Year:</span> {item.year}
              </div>
            </div>
          </div>

          {/* Action button */}
          {onUsePromptInBrief && item.promptExcerpt && (
            <div className="mt-6 pt-4 border-t border-[#1F2433]">
              <button
                type="button"
                onClick={() => {
                  onUsePromptInBrief(item.promptExcerpt!, item.title);
                  onClose();
                }}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#E60067] hover:bg-[#C70058] rounded-xl transition-colors cursor-pointer uppercase tracking-wider"
              >
                Use Visual Style in Brief Builder
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
