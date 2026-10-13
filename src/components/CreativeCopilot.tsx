import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Copy, Check, ArrowRight, Loader2 } from 'lucide-react';

interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  generatedPrompt?: string;
  recommendedModel?: string;
  suggestedBrief?: {
    title?: string;
    contentType?: string;
    visualStyle?: string;
  };
}

interface CreativeCopilotProps {
  isOpen: boolean;
  onClose: () => void;
  onTransferToBrief: (briefData: {
    title?: string;
    contentType?: string;
    visualStyle?: string;
    referenceNotes?: string;
  }) => void;
}

export const CreativeCopilot: React.FC<CreativeCopilotProps> = ({
  isOpen,
  onClose,
  onTransferToBrief,
}) => {
  const [promptType, setPromptType] = useState<'image_prompt' | 'video_prompt' | 'campaign_idea'>('video_prompt');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: 'Hello! I am your Creative Copilot. Tell me your project concept, or choose what you need help shaping today.',
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: CopilotMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptType,
          messages: [...messages, userMsg]
            .slice(-12)
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) {
        const errorPayload = await res.json().catch(() => null);
        throw new Error(errorPayload?.error || `Creative Copilot failed (${res.status}).`);
      }

      const data = await res.json();
      const assistantMsg: CopilotMessage = {
        id: 'asst-' + Date.now(),
        role: 'assistant',
        content: data.reply || 'Here is your refined creative specification:',
        generatedPrompt: data.generatedPrompt,
        recommendedModel: data.recommendedModel,
        suggestedBrief: data.suggestedBrief,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const assistantMsg: CopilotMessage = {
        id: 'asst-' + Date.now(),
        role: 'assistant',
        content: err instanceof Error
          ? err.message
          : 'The AI assistant is unavailable. Check the Gemini server configuration and try again.',
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = (id: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTransfer = (msg: CopilotMessage) => {
    onTransferToBrief({
      title: msg.suggestedBrief?.title || input.slice(0, 40) || 'AI Creative Campaign',
      contentType: msg.suggestedBrief?.contentType || (promptType === 'video_prompt' ? 'AI Brand Film' : 'Key Visuals'),
      visualStyle: msg.suggestedBrief?.visualStyle || 'Cinematic Direction',
      referenceNotes: msg.generatedPrompt || msg.content,
    });
    onClose();
  };

  const quickStarters = [
    'Anamorphic 35mm sci-fi commercial teaser',
    'Haute couture iridescent garment in minimalist studio',
    'Bioluminescent macro botanical growth video',
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="pf-copilot-drawer w-full max-w-md bg-[#121622] text-white h-full shadow-2xl flex flex-col border-l border-[#232838] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 px-5 border-b border-[#1F2433] flex items-center justify-between bg-[#0E1118]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00C9FF]" />
            <h3 className="font-bold text-sm text-white">Creative Copilot</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#94A3B8] hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="p-3 bg-[#151923] border-b border-[#1F2433] flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPromptType('video_prompt')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              promptType === 'video_prompt'
                ? 'bg-[#E60067] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Video Prompt
          </button>
          <button
            type="button"
            onClick={() => setPromptType('image_prompt')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              promptType === 'image_prompt'
                ? 'bg-[#E60067] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Image Prompt
          </button>
          <button
            type="button"
            onClick={() => setPromptType('campaign_idea')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              promptType === 'campaign_idea'
                ? 'bg-[#E60067] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Campaign Idea
          </button>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-3.5 leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#E60067] text-white rounded-br-xs font-medium'
                    : 'pf-copilot-assistant-message bg-[#1A1F2E] text-white rounded-bl-xs border border-[#232838]'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Generated Prompt Box */}
                {msg.generatedPrompt && (
                  <div className="mt-3 p-3 bg-[#0B0E14] rounded-xl border border-[#232838] text-white space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pb-1 border-b border-[#1F2433]">
                      <span>Prompt Specification</span>
                      {msg.recommendedModel && (
                        <span className="text-[#00C9FF] font-semibold">
                          {msg.recommendedModel}
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-[11px] leading-relaxed text-[#CBD5E1] select-all">
                      {msg.generatedPrompt}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1F2433]">
                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(msg.id, msg.generatedPrompt!)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00C9FF] hover:underline cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTransfer(msg)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF007A] hover:underline cursor-pointer"
                      >
                        <span>Transfer to Brief</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] p-2 bg-[#1A1F2E] rounded-xl max-w-xs border border-[#232838]">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E60067]" />
              <span>Synthesizing creative prompt...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Starters */}
        <div className="p-3 border-t border-[#1F2433] bg-[#0E1118] space-y-1.5">
          <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider block">
            Quick Inquiries:
          </span>
          <div className="flex flex-wrap gap-1">
            {quickStarters.map((starter, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(starter)}
                className="text-[11px] text-[#CBD5E1] bg-[#1A1F2E] hover:bg-[#232838] border border-[#232838] px-2.5 py-1 rounded-md transition-colors cursor-pointer truncate max-w-full"
              >
                {starter}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#1F2433] bg-[#121622]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your creative idea..."
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 bg-[#1A1F2E] border border-[#232838] rounded-xl text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#E60067]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-[#E60067] hover:bg-[#C70058] disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
