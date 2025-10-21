import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ProgramersQuestLanding.css';
import { shuffle } from './utils/random';
import { addScore } from './services/scores';
import { Link, useNavigate } from 'react-router-dom';

const QUESTIONS = [
  { q: 'JavaScript é case-sensitive?', options: ['Sim', 'Não'], answer: 0 },
  { q: '0 é truthy em JS?', options: ['Sim', 'Não'], answer: 1 },
  { q: 'Arrays em JS são objetos?', options: ['Sim', 'Não'], answer: 0 },
  // Adicione mais perguntas aqui
];

export default function TelaLogica() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [name, setName] = useState(() => localStorage.getItem('player_name') || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [seed, setSeed] = useState(0); // controla reembaralhamento

  // Armazena as questões embaralhadas em estado
  const [questions, setQuestions] = useState(() => shuffle(QUESTIONS));

  // Reembaralha sempre que seed mudar (ex.: ao recomeçar)
  useEffect(() => {
    setQuestions(shuffle(QUESTIONS));
    setIndex(0);
  }, [seed]);

  async function submit() {
    if (selected === null) return;
    if (selected === questions[index].answer) setScore((s) => s + 1);
    setSelected(null);
    if (index + 1 >= questions.length) setDone(true);
    else setIndex((i) => i + 1);
  }

  function restart() {
    setIndex(0);
    setScore(0);
    setDone(false);
    setSaved(false);
    setSelected(null);
    setError('');
    setSeed((s) => s + 1); // força novo embaralhamento
  }

  async function handleSave() {
    try {
      setSaving(true);
      setError('');
      setSaved(false);
      const cleanName = (name || '').trim();
      localStorage.setItem('player_name', cleanName);
      await addScore({ name: cleanName, points: score });
      setSaved(true);
    } catch (e) {
      setError(e.message || 'Falha ao salvar pontuação.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="game-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="game-card"
      >
        <h2>Quiz de Lógica</h2>

        {!done ? (
          <>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 14, opacity: 0.8 }}>
                Seu nome para a classificação:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                maxLength={32}
                style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 8 }}
              />
            </div>

            <p className="q-text">{questions[index].q}</p>
            <div className="options">
              {questions[index].options.map((opt, i) => (
                <button
                  key={i}
                  className={'opt-btn' + (selected === i ? ' selected' : '')}
                  onClick={() => setSelected(i)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="button-primary" onClick={submit}>Enviar</button>
              <button className="button-secondary" onClick={() => { setSelected(null); }}>Limpar</button>
            </div>
          </>
        ) : (
          <div className="result" style={{ display: 'grid', gap: 8 }}>
            <h3>Você marcou {score} / {questions.length}</h3>

            {!!error && <p style={{ color: 'tomato' }}>{error}</p>}
            {saved ? (
              <p style={{ color: 'seagreen' }}>Pontuação salva! Obrigado, {name || 'Jogador'}.</p>
            ) : (
              <button
                className="button-primary"
                onClick={handleSave}
                disabled={saving || !(name || '').trim()}
                title={!(name || '').trim() ? 'Informe um nome para salvar' : ''}
              >
                {saving ? 'Salvando...' : 'Salvar pontuação no ranking'}
              </button>
            )}

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button className="button-secondary" onClick={restart}>Recomeçar</button>
              <button className="button-secondary" onClick={() => navigate('/leaderboard')}>Ver classificação</button>
            </div>

            <p style={{ marginTop: 8 }}>
              Ou acesse: <Link to="/leaderboard">/leaderboard</Link>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}