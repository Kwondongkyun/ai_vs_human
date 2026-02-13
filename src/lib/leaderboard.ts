import { supabase } from './supabase';

const MAX_ENTRIES = 50;

export interface LeaderboardEntry {
  nickname: string;
  score: number;
  round: number;
  date: string;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('leaderboard_entries')
    .select('nickname, score, round, created_at')
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(MAX_ENTRIES);

  if (error) throw error;

  return (data || []).map(row => ({
    nickname: row.nickname,
    score: row.score,
    round: row.round,
    date: row.created_at,
  }));
}

export async function addLeaderboardEntry(entry: {
  nickname: string;
  score: number;
  round: number;
}): Promise<{ rank: number }> {
  // 엔트리 삽입
  const { error: insertError } = await supabase
    .from('leaderboard_entries')
    .insert({
      nickname: entry.nickname,
      score: entry.score,
      round: entry.round,
    });

  if (insertError) throw insertError;

  // 순위 계산
  const { count, error: countError } = await supabase
    .from('leaderboard_entries')
    .select('*', { count: 'exact', head: true })
    .gt('score', entry.score);

  if (countError) throw countError;

  return { rank: (count || 0) + 1 };
}
