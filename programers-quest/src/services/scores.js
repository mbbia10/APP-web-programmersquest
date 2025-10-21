import { supabase } from '../lib/supabaseClient';

const TABLE = 'scores';

export async function addScore({ name, points }) {
  const cleanName = String(name || '').trim();
  if (!cleanName || cleanName.length < 3 || cleanName.length > 32) {
    throw new Error('Nome deve ter entre 3 e 32 caracteres.');
  }
  if (typeof points !== 'number' || points < 0) {
    throw new Error('Pontuação inválida.');
  }

  const { error } = await supabase.from(TABLE).insert([{ name: cleanName, points }]);
  if (error) throw error;
}

export async function getTopScores(limit = 50) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, name, points, created_at')
    .order('points', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data || [];
}