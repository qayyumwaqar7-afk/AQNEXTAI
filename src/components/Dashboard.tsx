import { useEffect, useState } from 'react';
import { Users, ShoppingCart, TrendingUp, Activity, ArrowUpRight } from 'lucide-react';

const FIVERR_URL = 'https://fiverr.com';

function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

const salesData = [42, 58, 51, 67, 74, 69, 82, 91, 88, 96, 104, 112];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  accent,
  live,
}: {
  icon: typeof Users;
  label: string;
  value: number;
  suffix?: string;
  accent: string;
  live?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 1800, visible);
  return (
    <div
      ref={(el) => {
        if (el && !visible) {
          const obs = new IntersectionObserver(
            ([e]) => e.isIntersecting && setVisible(true),
            { threshold: 0.3 }
          );
          obs.observe(el);
        }
      }}
      className="glass border border-violet-500/20 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all" />
      <div className="flex items-start justify-between mb-4 relative">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
          <Icon className="w-6 h-6" />
        </div>
        {live && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        )}
      </div>
      <div className="text-3xl font-display font-bold text-white tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-slate-400 mt-1">{label}</div>
    </div>
  );
}

function SalesChart() {
  const [visible, setVisible] = useState(false);
  const max = Math.max(...salesData);
  const w = 520;
  const h = 200;
  const pad = 10;
  const stepX = (w - pad * 2) / (salesData.length - 1);
  const points = salesData.map((v, i) => {
    const x = pad + i * stepX;
    const y = h - pad - (v / max) * (h - pad * 2);
    return [x, y];
  });
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const area = `${path} L ${points[points.length - 1][0]} ${h - pad} L ${points[0][0]} ${h - pad} Z`;

  return (
    <div
      ref={(el) => {
        if (el && !visible) {
          const obs = new IntersectionObserver(
            ([e]) => e.isIntersecting && setVisible(true),
            { threshold: 0.2 }
          );
          obs.observe(el);
        }
      }}
      className="glass border border-violet-500/20 rounded-2xl p-6 lg:col-span-2 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-400" />
            Sales Growth
          </h3>
          <p className="text-sm text-slate-400 mt-1">Monthly completed orders — last 12 months</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-display font-bold text-gradient">+167%</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 justify-end">
            <ArrowUpRight className="w-3 h-3" /> YoY
          </div>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={pad} x2={w - pad} y1={h * g} y2={h * g} stroke="rgba(168,85,247,0.08)" strokeWidth="1" />
        ))}
        {visible && (
          <>
            <path d={area} fill="url(#areaFill)" />
            <path
              d={path}
              fill="none"
              stroke="url(#lineStroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 1400, strokeDashoffset: visible ? 0 : 1400, transition: 'stroke-dashoffset 2s ease' }}
            />
            {points.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#0a0712" stroke="#a855f7" strokeWidth="1.5" />
            ))}
          </>
        )}
      </svg>
      <div className="flex justify-between mt-2 text-[10px] text-slate-500">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [visitors, setVisitors] = useState(48213);

  useEffect(() => {
    const id = setInterval(() => setVisitors((v) => v + Math.floor(Math.random() * 4) + 1), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="dashboard" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-sm font-medium mb-4">
            <Activity className="w-4 h-4" /> Live Client Portal
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            Trusted by <span className="text-gradient">Global Clients</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Real-time visibility into our automation pipeline. Transparency builds trust — here's a live snapshot of what we deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
          <StatCard icon={Activity} label="Total Website Visitors" value={visitors} accent="bg-violet-500/15 text-violet-300" live />
          <StatCard icon={Users} label="Active Clients" value={14} suffix="+" accent="bg-fuchsia-500/15 text-fuchsia-300" />
          <StatCard icon={ShoppingCart} label="Orders Completed (This Month)" value={89} suffix="+" accent="bg-indigo-500/15 text-indigo-300" />
          <StatCard icon={TrendingUp} label="Avg. ROI Delivered" value={312} suffix="%" accent="bg-purple-500/15 text-purple-300" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <SalesChart />
          <div className="glass border border-violet-500/20 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-display font-semibold text-white mb-1">Automation Uptime</h3>
              <p className="text-sm text-slate-400 mb-6">Across all active workflows</p>
              <div className="relative w-40 h-40 mx-auto">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50" fill="none" stroke="url(#lineStroke)" strokeWidth="10"
                    strokeLinecap="round" strokeDasharray="314" strokeDashoffset="9"
                    style={{ transition: 'stroke-dashoffset 2s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-display font-bold text-white">99.7%</span>
                  <span className="text-xs text-slate-400">uptime</span>
                </div>
              </div>
            </div>
            <a
              href={FIVERR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-center text-sm text-violet-300 hover:text-violet-200 transition-colors"
            >
              Become our next success story →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
