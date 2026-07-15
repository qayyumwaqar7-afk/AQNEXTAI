import { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const N8N_WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL';
const FIVERR_URL = 'https://fiverr.com';

type Msg = {
  role: 'bot' | 'user';
  text: string;
  showFiverr?: boolean;
};

const STEPS = ['name', 'email', 'project'] as const;
type Step = (typeof STEPS)[number];

const GREETING =
  "Welcome to AQ NEXT AI! I'm your AI automation concierge. To get started, could you please share your **name**?";

const PROMPTS: Record<Step, string> = {
  name: "Great to meet you, {name}! What's the best **email** to reach you on?",
  email: "Perfect. Lastly, briefly describe your **project details** — what would you like us to automate?",
  project: "Thank you, {name}! Your request has been received. Our team will review your project and respond shortly.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<Step | null>(null);
  const [lead, setLead] = useState<{ name: string; email: string; project: string }>({
    name: '',
    email: '',
    project: '',
  });
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, sending]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'bot', text: GREETING }]);
      setStep('name');
      setUnread(false);
    }
  }, [open, messages.length]);

  const send = async () => {
    if (!input.trim() || !step || sending) return;
    const text = input.trim();
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);

    const currentStep = step;
    const newLead = { ...lead, [currentStep]: text };
    setLead(newLead);

    let nextStep: Step | null = null;
    if (currentStep === 'name') nextStep = 'email';
    else if (currentStep === 'email') nextStep = 'project';
    else if (currentStep === 'project') nextStep = null;

    setStep(nextStep);
    setSending(true);

    if (currentStep === 'project') {
      try {
        await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newLead.name,
            email: newLead.email,
            project: newLead.project,
            source: 'AQ NEXT AI Website Chatbot',
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {});
      } catch {
        // webhook not yet configured — fail silently
      }
    }

    setTimeout(() => {
      const replyText = PROMPTS[currentStep].replace('{name}', newLead.name || 'there');
      const showFiverr = currentStep === 'project';
      setMessages((m) => [...m, { role: 'bot', text: replyText, showFiverr }]);
      setSending(false);
    }, 700);
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-glow flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
        aria-label="Open chat"
      >
        {open ? <X className="w-7 h-7 text-white" /> : <MessageSquare className="w-7 h-7 text-white" />}
        {unread && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-fuchsia-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            1
          </span>
        )}
        <span className="absolute inset-0 rounded-full bg-violet-500/40 animate-ping opacity-20" />
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[32rem] max-h-[80vh] glass border border-violet-500/30 rounded-2xl shadow-glow-lg flex flex-col overflow-hidden animate-[float_0.3s_ease]">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-700/40 to-fuchsia-700/30 px-5 py-4 flex items-center gap-3 border-b border-violet-500/20">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-glow-sm">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display font-semibold text-white text-sm">AQ NEXT AI Assistant</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online now
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    m.role === 'bot'
                      ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500'
                      : 'bg-ink-700 border border-violet-500/30'
                  }`}
                >
                  {m.role === 'bot' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-violet-300" />}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'bot'
                      ? 'bg-ink-800/80 border border-violet-500/15 text-slate-200 rounded-tl-sm'
                      : 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-tr-sm'
                  }`}
                >
                  {m.text.split('**').map((part, j) =>
                    j % 2 === 1 ? <strong key={j} className="text-violet-300 font-semibold">{part}</strong> : <span key={j}>{part}</span>
                  )}
                  {m.showFiverr && (
                    <a
                      href={FIVERR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold text-sm shadow-glow hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300 animate-pulse-slow"
                    >
                      <Sparkles className="w-4 h-4" />
                      Secure Order on Fiverr
                    </a>
                  )}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-ink-800/80 border border-violet-500/15 rounded-tl-sm">
                  <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-violet-500/20 bg-ink-900/50">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={step ? 'Type your answer...' : 'Chat ended — secure your order on Fiverr!'}
                disabled={sending || !step}
                className="flex-1 bg-ink-800 border border-violet-500/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 transition-colors disabled:opacity-50"
              />
              <button
                onClick={send}
                disabled={sending || !input.trim() || !step}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white hover:shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-center">Powered by AQ NEXT AI · n8n automation</p>
          </div>
        </div>
      )}
    </>
  );
}
