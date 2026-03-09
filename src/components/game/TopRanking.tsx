'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Medal, ChevronRight } from 'lucide-react';
import { LeaderboardEntry } from '@/types/game';

const MEDAL_COLORS = [
  'text-yellow-400',
  'text-gray-300',
  'text-amber-500',
];

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.4 }}
      className="w-full mt-6 md:fixed md:top-4 md:right-4 md:w-52 md:mt-0 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4 md:p-3"
    >
      <div className="flex items-center gap-1.5 mb-3">
        <Trophy className="w-3.5 h-3.5 text-lg-red" strokeWidth={1.5} />
        <span className="text-sm font-bold text-white">TOP 5</span>
      </div>

      <div className="space-y-2">
        {entries.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className={`w-5 flex justify-center shrink-0 ${i < 3 ? MEDAL_COLORS[i] : 'text-white/30'}`}>
              {i < 3
                ? <Medal className="w-3.5 h-3.5" strokeWidth={2} />
                : <span className="font-medium tabular-nums">{i + 1}</span>
              }
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
        className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
      >
        전체 랭킹 보기
        <ChevronRight className="w-3 h-3" strokeWidth={2} />
      </button>
    </motion.div>
  );
}
