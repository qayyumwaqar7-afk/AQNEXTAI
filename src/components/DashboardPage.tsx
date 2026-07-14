import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock, CheckCircle2, XCircle, ArrowRight, LogOut, ExternalLink,
  Sparkles, Zap, ShieldCheck, TrendingUp,
} from 'lucide-react';
import { useAuth } from './AuthContext';
import { FIVERR_INBOX, FIVERR_GIG } from '../lib/supabase';
import BrainLogo from './BrainLogo';

const TRIAL_MS = 3 * 24 * 60 * 60 * 1000; // 72 hours

function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState(targetMs - Date.now());

  useEffect(() => {
    const id = setInterval(() => setRemaining(targetMs - Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return remaining;
}

function formatTime(ms: number) {
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const total = Math.floor(ms / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const createdAtMs = profile ? new Date(profile.created_at).getTime() : 0;
  const expiryMs = createdAtMs + TRIAL_MS;
  const remaining = useCountdown(expiryMs);
  const trialExpired = remaining <= 0;
  const time = formatTime(remaining);

  const buttonLink = trialExpired ? FIVERR_GIG : FIVERR_INBOX;
  const buttonLabel = trialExpired ? 'Upgrade to Paid Plan' : 'Go to Fiverr Inbox';

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative">
      {/* Top bar */}
      <header className="glass border-b border-violet-500/15 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <BrainLogo size={36} className="drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <div className="font-display font-bold text-lg text-white tracking-tight">
              AQ NEXT <span className="text-gradient">AI</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-slate-400">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-violet-500/30 text-slate-200 text-sm font-medium hover:bg-violet-500/10 hover:border-violet-500/60 transition-all"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Greeting */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Welcome back, <span className="text-gradient">{profile?.name || 'there'}</span>
          </h1>
          <p className="text-slate-400 mt-2">Here's your custom AI chatbot dashboard.</p>
        </div>

        {/* Trial status card */}
        <div
          className={`glass rounded-2xl p-8 mb-8 border-2 transition-all duration-500 ${
            trialExpired
              ? 'border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
              : 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {trialExpired ? (
                <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                  <XCircle className="w-7 h-7 text-red-400" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400 animate-pulse" />
                </div>
              )}
              <div>
                <div className="text-sm text-slate-400 mb-1">Trial Status</div>
                <div
                  className={`text-2xl font-display font-bold ${
                    trialExpired ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {trialExpired ? 'Expired' : 'Active'}
                </div>
              </div>
            </div>

            {!trialExpired && (
              <div className="flex gap-6">
                {[
                  { label: 'Days', value: time.d },
                  { label: 'Hours', value: time.h },
                  { label: 'Mins', value: time.m },
                  { label: 'Secs', value: time.s },
                ].map((u) => (
                  <div key={u.label} className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-ink-900/60 border border-violet-500/20 flex items-center justify-center text-2xl font-display font-bold text-white tabular-nums">
                      {String(u.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-slate-500 mt-1.5">{u.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {trialExpired && (
            <div className="mt-6 px-5 py-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <p className="text-red-200 text-sm font-medium">
                Your 3-Day Free Trial Has Expired. Please upgrade to a paid plan to continue
                using your custom AI Chatbot.
              </p>
            </div>
          )}
        </div>

        {/* Main action button */}
        <div className="glass border border-violet-500/20 rounded-2xl p-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            {trialExpired ? 'Upgrade Required' : 'Your AI Chatbot Is Ready'}
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-3">
            {trialExpired
              ? 'Unlock Your AI Chatbot Now'
              : 'Access Your Fiverr Inbox'}
          </h2>
          <p className="text-slate-400 max-w-md mx-auto mb-6 text-sm">
            {trialExpired
              ? 'Your free trial has ended. Purchase a plan to reactivate your custom AI chatbot and continue automating your business.'
              : 'Click below to head to our Fiverr inbox where we coordinate your project.'}
          </p>
          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 ${
              trialExpired
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]'
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-glow hover:shadow-glow-lg'
            }`}
          >
            {buttonLabel}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Info cards (only visible during active trial) */}
        {!trialExpired && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Zap, title: 'AI Chatbot Active', desc: 'Your custom chatbot is live and ready to serve your customers 24/7.' },
              { icon: ShieldCheck, title: 'Secure & Private', desc: 'All your data is encrypted and protected with enterprise-grade security.' },
              { icon: TrendingUp, title: 'Scale Anytime', desc: 'Upgrade to unlock advanced automations, CRM integrations, and more.' },
            ].map((c) => (
              <div
                key={c.title}
                className="glass border border-violet-500/15 rounded-2xl p-6 hover:border-violet-500/40 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
                  <c.icon className="w-6 h-6 text-violet-300" />
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Account info */}
        <div className="glass border border-violet-500/15 rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-display font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-violet-400" /> Account Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Name</span>
              <p className="text-white font-medium mt-0.5">{profile?.name || '—'}</p>
            </div>
            <div>
              <span className="text-slate-500">Email</span>
              <p className="text-white font-medium mt-0.5">{user?.email}</p>
            </div>
            <div>
              <span className="text-slate-500">WhatsApp</span>
              <p className="text-white font-medium mt-0.5">{profile?.whatsapp || '—'}</p>
            </div>
            <div>
              <span className="text-slate-500">Business Page</span>
              {profile?.page_link ? (
                <a
                  href={profile.page_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-300 hover:text-violet-200 font-medium mt-0.5 inline-flex items-center gap-1"
                >
                  {profile.page_link} <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <p className="text-white font-medium mt-0.5">—</p>
              )}
            </div>
            <div>
              <span className="text-slate-500">Account Created</span>
              <p className="text-white font-medium mt-0.5">
                {profile ? new Date(profile.created_at).toLocaleString() : '—'}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Trial Expires</span>
              <p className={`font-medium mt-0.5 ${trialExpired ? 'text-red-400' : 'text-emerald-400'}`}>
                {profile ? new Date(expiryMs).toLocaleString() : '—'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
