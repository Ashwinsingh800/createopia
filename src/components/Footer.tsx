import React, { useState } from 'react';
import { Accessibility, HelpCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenCopilot: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCopilot }) => {
  const { isDark } = useTheme();
  const [dialog, setDialog] = useState<'help' | 'accessibility' | null>(null);

  return (
    <footer
      className={`w-full border-t transition-colors ${
        isDark
          ? 'bg-[#080A0E] text-[#94A3B8] border-[#1F2433]'
          : 'bg-[#EFECE6] text-[#737373] border-[#E5E4DE]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className={isDark ? 'text-white font-extrabold' : 'text-[#242424] font-extrabold'}>
          Create<span className={isDark ? 'text-[#E60067]' : 'text-[#6556D9]'}>opia</span>
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDialog('help')}
            className="inline-flex items-center gap-2 rounded-lg border border-current/15 px-3 py-2 hover:text-[#6556D9] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            Help &amp; Support
          </button>
          <button
            type="button"
            onClick={() => setDialog('accessibility')}
            className="inline-flex items-center gap-2 rounded-lg border border-current/15 px-3 py-2 hover:text-[#6556D9] transition-colors cursor-pointer"
          >
            <Accessibility className="w-4 h-4" />
            Accessibility
          </button>
        </div>
      </div>

      {dialog && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4" role="dialog" aria-modal="true">
          <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${isDark ? 'bg-[#121622] text-white' : 'bg-white text-[#242424]'}`}>
            <h2 className="text-lg font-bold">
              {dialog === 'help' ? 'Help & Support' : 'Accessibility'}
            </h2>
            <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-[#CBD5E1]' : 'text-[#5F626B]'}`}>
              {dialog === 'help'
                ? 'Need help with a brief, creator search, or your workspace? Open the AI Creative Copilot for guided assistance.'
                : 'Createopia supports keyboard navigation, readable contrast, reduced motion, and captions on media previews.'}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              {dialog === 'help' && (
                <button type="button" onClick={onOpenCopilot} className="rounded-lg bg-[#6556D9] px-4 py-2 text-sm font-semibold text-white cursor-pointer">
                  Open AI Assistant
                </button>
              )}
              <button type="button" onClick={() => setDialog(null)} className="rounded-lg border border-current/15 px-4 py-2 text-sm font-semibold cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
