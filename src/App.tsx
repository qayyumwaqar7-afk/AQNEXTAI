import { useEffect, useState } from 'react';
import {
  Zap, Workflow, MessageSquare, Mail, Target, Database,
  ArrowRight, Check, Menu, X, Globe, MapPin, Cpu, Network, Bot, ShieldCheck,
} from 'lucide-react';
import BrainLogo from './components/BrainLogo';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';

const FIVERR_URL = 'https://fiverr.com';

const services = [
  {
    icon: Target,
    title: 'Lead Generation Automation',
    desc: 'AI-powered prospecting that finds, qualifies, and enriches leads 24/7 — feeding your sales pipeline on autopilot.',
    points: ['Multi-source scraping', 'Auto-qualification scoring', 'CRM enrichment'],
  },
  {
    icon: Workflow,
    title: 'CRM Workflow Automation',
    desc: 'Connect your tools and eliminate manual data entry. Every trigger, update, and follow-up handled by intelligent workflows.',
    points: ['HubSpot & GoHighLevel sync', 'Auto follow-up sequences', 'Pipeline stage automation'],
  },
  {
    icon: MessageSquare,
    title: 'Customer Support Bots',
    desc: 'Conversational AI that resolves tickets, answers FAQs, and escalates intelligently — across every channel your clients use.',
    points: ['24/7 multilingual support', 'Smart escalation routing', 'Knowledge base integration'],
  },
  {
    icon: Mail,
    title: 'Email & Outreach Sequences',
    desc: 'Personalized cold outreach at scale. AI writes, schedules, and optimizes your sequences for maximum reply rates.',
    points: ['AI copywriting', 'A/B tested sequences', 'Reply detection'],
  },
  {
    icon: Database,
    title: 'Data & Analytics Pipelines',
    desc: 'Centralize scattered data into clean, visual dashboards. Real-time insights that drive smarter business decisions.',
    points: ['ETL automation', 'Live KPI dashboards', 'Anomaly alerts'],
  },
  {
    icon: Cpu,
    title: 'Custom AI Agents',
    desc: 'Bespoke AI agents trained on your business context — handling research, scheduling, and operations end-to-end.',
    points: ['GPT & Claude integration', 'Tool-use capabilities', 'Memory & context'],
  },
];

const plans = [
  {
    name: 'Starter',
    price: '$499',
    period: '/project',
    desc: 'Perfect for single-workflow automation needs.',
    features: ['1 automation workflow', 'Up to 3 integrations', 'Email support', '2 revisions', '7-day delivery'],
    cta: 'Start on Fiverr',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$1,299',
    period: '/project',
    desc: 'For businesses scaling multiple automations.',
    features: ['Up to 5 workflows', 'Unlimited integrations', 'Priority support', 'Unlimited revisions', 'Live dashboard', '14-day delivery'],
    cta: 'Scale on Fiverr',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Full-scale AI automation infrastructure.',
    features: ['Unlimited workflows', 'Dedicated AI engineer', '24/7 support SLA', 'Custom AI agents', 'Quarterly optimization', 'Ongoing maintenance'],
    cta: 'Consult on Fiverr',
    popular: false,
  },
];

const workflowSteps = [
  { icon: Network, title: 'Discovery', desc: 'We map your processes and identify automation opportunities.' },
  { icon: Bot, title: 'Build', desc: 'Custom AI workflows engineered and tested in your environment.' },
  { icon: Zap, title: 'Deploy', desc: 'Seamless integration with your existing tools and systems.' },
  { icon: ShieldCheck, title: 'Optimize', desc: 'Continuous monitoring and refinement for peak performance.' },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'glass border-b border-violet-500/20 py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <BrainLogo size={42} className="drop-shadow-[0_0_12px_rgba(168,85,247,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.9)] transition-all" />
          </div>
          <div className="font-display font-bold text-xl text-white tracking-tight">
            AQ NEXT <span className="text-gradient">AI</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-300 hover:text-violet-300 transition-colors font-medium">
              {l.label}
            </a>
          ))}
          <a
            href={FIVERR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
          >
            Get Started
          </a>
        </div>

        <button onClick={() => setMenuOpen((o) => !o)} className="md:hidden text-white">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-violet-500/20 px-6 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block text-slate-300 hover:text-violet-300 py-2">
              {l.label}
            </a>
          ))}
          <a href={FIVERR_URL} target="_blank" rel="noopener noreferrer" className="block text-center px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 grid-bg overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-sm font-medium mb-8 animate-[float_4s_ease-in-out_infinite]">
          <Sparkle /> AI Automation Agency · Pakistan to the World
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.05] mb-6">
          Automate Everything.<br />
          <span className="text-gradient">Scale Infinitely.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          We design and deploy intelligent AI automation systems — lead generation, CRM workflows, and support bots — that run your business while you sleep.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={FIVERR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Secure Order on Fiverr
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-full border border-violet-500/30 text-slate-200 font-semibold text-lg hover:border-violet-500/60 hover:bg-violet-500/5 transition-all duration-300"
          >
            Explore Services
          </a>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-500">
          <div className="flex items-center gap-2 text-sm"><Globe className="w-4 h-4 text-violet-400" /> 14+ Active Clients</div>
          <div className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4 text-violet-400" /> 89+ Orders This Month</div>
          <div className="flex items-center gap-2 text-sm"><ShieldCheck className="w-4 h-4 text-violet-400" /> 99.7% Uptime</div>
        </div>
      </div>
    </section>
  );
}

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-violet-400">
      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" />
    </svg>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-sm font-medium mb-4">
            <Cpu className="w-4 h-4" /> What We Build
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            AI Automation <span className="text-gradient">Workflows</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            End-to-end automation solutions that connect your tools, eliminate repetitive work, and unlock scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="glass border border-violet-500/15 rounded-2xl p-7 hover:border-violet-500/50 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 border border-violet-500/20 flex items-center justify-center mb-5 group-hover:shadow-glow-sm transition-all">
                <s.icon className="w-7 h-7 text-violet-300" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{s.desc}</p>
              <ul className="space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-violet-400 flex-shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-sm font-medium mb-4">
            <Workflow className="w-4 h-4" /> How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            From Idea to <span className="text-gradient">Automation</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-violet-500/0 via-violet-500/40 to-violet-500/0" />
          {workflowSteps.map((s, i) => (
            <div key={s.title} className="text-center relative z-10">
              <div className="w-24 h-24 mx-auto rounded-2xl glass border border-violet-500/30 flex items-center justify-center mb-5 hover:shadow-glow transition-all duration-500 group">
                <s.icon className="w-10 h-10 text-violet-300 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white text-xs font-bold flex items-center justify-center shadow-glow-sm">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" /> Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Choose your plan and secure your order directly on Fiverr for a protected, platform-backed transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 transition-all duration-500 ${
                p.popular
                  ? 'glass border-2 border-violet-500/50 shadow-glow scale-105'
                  : 'glass border border-violet-500/15 hover:border-violet-500/40'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold shadow-glow-sm">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-display font-semibold text-white mb-2">{p.name}</h3>
              <p className="text-sm text-slate-400 mb-5">{p.desc}</p>
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-white">{p.price}</span>
                <span className="text-slate-500 text-sm">{p.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-violet-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={FIVERR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  p.popular
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-glow hover:shadow-glow-lg hover:scale-105'
                    : 'border border-violet-500/30 text-violet-200 hover:bg-violet-500/10 hover:border-violet-500/60'
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center glass border border-violet-500/30 rounded-3xl p-12 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/5" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px]" />
        <div className="relative z-10">
          <BrainLogo size={64} className="mx-auto mb-6 drop-shadow-[0_0_20px_rgba(168,85,247,0.7)] animate-float" />
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Ready to <span className="text-gradient">Automate</span> Your Growth?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Join 14+ businesses scaling with AQ NEXT AI. Secure your project on Fiverr today.
          </p>
          <a
            href={FIVERR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300"
          >
            Chat with us on Fiverr <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-violet-500/15 px-6 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <BrainLogo size={40} className="drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              <div className="font-display font-bold text-xl text-white">
                AQ NEXT <span className="text-gradient">AI</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Premium AI automation agency building intelligent workflows for businesses worldwide. From lead generation to custom AI agents — we automate the work that slows you down.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-violet-300 transition-colors">Lead Generation</a></li>
              <li><a href="#services" className="hover:text-violet-300 transition-colors">CRM Automation</a></li>
              <li><a href="#services" className="hover:text-violet-300 transition-colors">Support Bots</a></li>
              <li><a href="#services" className="hover:text-violet-300 transition-colors">Custom AI Agents</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Headquarters</h4>
            <div className="flex items-start gap-2.5 text-sm text-slate-400 mb-3">
              <MapPin className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-slate-200 font-medium">Pakistan</div>
                <div className="text-xs text-slate-500 mt-0.5">Serving clients globally · Remote-first</div>
              </div>
            </div>
            <a
              href={FIVERR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200 transition-colors"
            >
              <Globe className="w-4 h-4" /> Hire us on Fiverr
            </a>
          </div>
        </div>

        <div className="border-t border-violet-500/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} AQ NEXT AI. All rights reserved.</p>
          <p className="text-xs text-slate-500">Designed & engineered in Pakistan · Deployed worldwide</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950 text-slate-200 overflow-x-hidden">
      <Nav />
      <Hero />
      <Services />
      <Dashboard />
      <Process />
      <Pricing />
      <CTA />
      <Footer />
      <Chatbot />
    </div>
  );
}
