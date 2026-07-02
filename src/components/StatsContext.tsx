import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Stats {
  clients: number;
  orders: number;
}

interface StatsContextValue {
  stats: Stats;
  bumpStats: () => void;
}

const StatsContext = createContext<StatsContextValue | null>(null);

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<Stats>({ clients: 14, orders: 89 });

  const bumpStats = useCallback(() => {
    setStats((s) => ({ clients: s.clients + 1, orders: s.orders + 1 }));
  }, []);

  return (
    <StatsContext.Provider value={{ stats, bumpStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error('useStats must be used inside StatsProvider');
  return ctx;
}
