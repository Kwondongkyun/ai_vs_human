import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard, addLeaderboardEntry } from '@/lib/leaderboard';

export async function GET() {
  try {
    const entries = await getLeaderboard();
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Leaderboard GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nickname, score, round } = body;

    if (!nickname || typeof score !== 'number' || score < 0 || score > 3000) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const { rank } = await addLeaderboardEntry({
      nickname: String(nickname).slice(0, 10),
      score,
      round: typeof round === 'number' ? round : 4,
    });

    return NextResponse.json({ success: true, rank });
  } catch (error) {
    console.error('Leaderboard POST error:', error);
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }
}
