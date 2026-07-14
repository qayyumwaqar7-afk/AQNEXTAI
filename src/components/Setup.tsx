import { useState, FormEvent } from 'react';
import { User, Phone, Globe, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { supabase, FIVERR_INBOX } from '../lib/supabase';
import { useAuth } from './AuthContext';
import BrainLogo from './BrainLogo';

export default function Setup() {
  const { user, refreshProfile } = useAuth();

  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [pageLink, setPageLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: insertError } = await supabase.from('bolt_new').insert({
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        page_link: pageLink.trim(),
      });

      if (insertError) throw insertError;

      await refreshProfile();
      window.location.href = FIVERR_INBOX;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save your info. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 grid-bg relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse-slow" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-3 mb-6">
            <BrainLogo size={48} className="drop-shadow-[0_0_14px_rgba(168,85,247,0.7)]" />
            <div className="font-display font-bold text-2xl text-white tracking-tight">
              AQ NEXT <span className="text-gradient">AI</span>
            </div>
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-sm font-medium mb-4">
            <User className="w-4 h-4" /> One-Time Setup
          </div>
          <h1 className="text-3xl font-display font-bold text-white">Let's get you set up</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Tell us a bit about yourself to activate your 3-day free trial.
          </p>
        </div>

        <div className="glass border border-violet-500/20 rounded-2xl p-8">
          {error && (
            <div className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayesha Qayyum"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-ink-900/60 border border-violet-500/20 text-white placeholder-slate-500 focus:border-violet-500/60 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="e.g. +92 300 1234567"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-ink-900/60 border border-violet-500/20 text-white placeholder-slate-500 focus:border-violet-500/60 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Business Page Link</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="url"
                  required
                  value={pageLink}
                  onChange={(e) => setPageLink(e.target.value)}
                  placeholder="https://yourbusiness.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-ink-900/60 border border-violet-500/20 text-white placeholder-slate-500 focus:border-violet-500/60 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-glow hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Submit & Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-500">
            Signed in as {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
