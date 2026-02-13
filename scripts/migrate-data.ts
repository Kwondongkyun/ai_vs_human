import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface OldEntry {
  nickname: string;
  score: number;
  round: number;
  date: string;
}

async function migrate() {
  try {
    const jsonPath = path.join(process.cwd(), 'leaderboard.json');
    const data = await fs.readFile(jsonPath, 'utf-8');
    const entries: OldEntry[] = JSON.parse(data);

    console.log(`Found ${entries.length} entries to migrate`);

    // Supabase는 배치 삽입 지원
    const insertData = entries.map(entry => ({
      nickname: entry.nickname,
      score: entry.score,
      round: entry.round,
      created_at: entry.date,
    }));

    const { error } = await supabase
      .from('leaderboard_entries')
      .insert(insertData);

    if (error) throw error;

    console.log(`Migration completed successfully! ${entries.length} entries migrated.`);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
