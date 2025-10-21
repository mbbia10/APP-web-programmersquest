import { useEffect, useState } from 'react';
import { getTopScores } from '../services/scores';

export default function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const data = await getTopScores(50);
        setScores(data);
      } catch (e) {
        setErr(e.message || 'Erro ao carregar classificação.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="game-screen" style={{ padding: 16 }}>
      <div className="game-card">
        <h2>Classificação</h2>
        {loading && <p>Carregando...</p>}
        {!!err && <p style={{ color: 'tomato' }}>{err}</p>}
        {!loading && !err && (scores?.length ? (
          <ol style={{ paddingLeft: 20 }}>
            {scores.map((s) => (
              <li key={s.id} style={{ marginBottom: 8 }}>
                <strong>{s.name}</strong> — {s.points} pts
              </li>
            ))}
          </ol>
        ) : (
          <p>Ninguém pontuou ainda.</p>
        ))}
      </div>
    </div>
  );
}