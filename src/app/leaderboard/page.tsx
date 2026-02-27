'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Medal, Home, Inbox } from 'lucide-react';
import Button from '@/components/ui/Button';
import { LeaderboardEntry } from '@/types/game';

const MEDAL_COLORS = [
  'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  'text-gray-300 border-gray-300/30 bg-gray-300/10',
  'text-amber-500 border-amber-500/30 bg-amber-500/10',
];

export default function LeaderboardPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          setEntries([]);
        }
      })
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 max-w-lg mx-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-yonam-dark via-yonam-blue/10 to-lg-red/15 pointer-events-none" />

      <div className="relative z-10">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="bg-lg-red/15 border border-lg-red/30 rounded-xl p-2.5">
              <Trophy className="w-5 h-5 text-lg-red" strokeWidth={1.5} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">리더보드</h1>
          </div>
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5" onClick={() => router.push('/')}>
            <Home className="w-4 h-4" strokeWidth={1.5} />
            홈으로
          </Button>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-8 h-8 border-2 border-white/20 border-t-lg-red rounded-full animate-spin" />
            <span className="text-sm text-white/40">불러오는 중...</span>
          </div>
        ) : entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-3 text-center"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-2">
              <Inbox className="w-10 h-10 text-white/20" strokeWidth={1.5} />
            </div>
            <p className="text-white/50 font-medium">아직 기록이 없습니다</p>
            <p className="text-sm text-white/30">첫 번째 스파이 헌터가 되어보세요!</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-2">
            {entries.map((entry, i) => (
              <motion.div
                key={`${entry.nickname}-${entry.date}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
                  i < 3
                    ? 'bg-white/5 border-white/15'
                    : 'bg-white/3 border-white/8'
                }`}
              >
                {/* 순위 */}
                <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg border text-xs font-bold ${
                  i < 3 ? MEDAL_COLORS[i] : 'text-white/30 border-white/10 bg-white/5'
                }`}>
                  {i < 3 ? <Medal className="w-4 h-4" strokeWidth={2} /> : i + 1}
                </div>

                {/* 닉네임 */}
                <div className="flex-1 min-w-0">
                  <span className={`font-semibold truncate block ${i < 3 ? 'text-white' : 'text-white/70'}`}>
                    {entry.nickname}
                  </span>
                </div>

                {/* 점수 */}
                <span className={`text-base font-bold tabular-nums shrink-0 ${i < 3 ? 'text-lg-red' : 'text-white/50'}`}>
                  {entry.score.toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
