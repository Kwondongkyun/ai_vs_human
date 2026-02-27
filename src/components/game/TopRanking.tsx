'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LeaderboardEntry } from '@/types/game';

const MEDALS = ['🥇', '🥈', '🥉'];

export default function TopRanking() {
  const router = useRouter();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((data) => setEntries(Array.isArray(data) ? data.slice(0, 5) : []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || entries.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="absolute top-4 right-4 z-10 w-52 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3"
    >
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-sm">🏆</span>
        <span className="text-sm font-bold text-white">TOP 5</span>
      </div>

      <div className="space-y-2">
        {entries.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-5 text-center shrink-0 text-sm leading-none">
              {i < 3 ? MEDALS[i] : <span className="text-white/40 font-medium">{i + 1}</span>}
            </span>
            <span className="flex-1 truncate text-white/80">{entry.nickname}</span>
            <span className="text-lg-red font-bold shrink-0 tabular-nums">
              {entry.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push('/leaderboard')}
        className="mt-3 w-full text-xs text-white/40 hover:text-white/70 transition-colors text-center"
      >
        전체 랭킹 보기 →
      </button>
    </motion.div>
  );
}
