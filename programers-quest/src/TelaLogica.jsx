import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ProgramersQuestLanding.css';

const questions = [
  { q: 'JavaScript é case-sensitive?', options: ['Sim', 'Não'], answer: 0 },
  { q: '0 é truthy em JS?', options: ['Sim', 'Não'], answer: 1 },
  { q: 'Arrays em JS são objetos?', options: ['Sim', 'Não'], answer: 0 },
];

export default function TelaLogica() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function submit() {
    if (selected === null) return;
    if (selected === questions[index].answer) setScore(s => s + 1);
    setSelected(null);
    if (index + 1 >= questions.length) setDone(true);
    else setIndex(i => i + 1);
  }

  function restart() {
    setIndex(0); setScore(0); setDone(false); setSelected(null);
  }

  return (
    <div className="game-screen">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} className="game-card">
        <h2>Quiz de Lógica</h2>

        {!done ? (
          <>
            <p className="q-text">{questions[index].q}</p>
            <div className="options">
              {questions[index].options.map((opt,i)=>(
                <button key={i} className={'opt-btn'+(selected===i?' selected':'')} onClick={()=>setSelected(i)}>
                  {opt}
                </button>
              ))}
            </div>
            <div style={{display:'flex',gap:8,marginTop:12}}>
              <button className="button-primary" onClick={submit}>Enviar</button>
              <button className="button-secondary" onClick={()=>{ setSelected(null); }}>Limpar</button>
            </div>
          </>
        ) : (
          <div className="result">
            <h3>Você marcou {score} / {questions.length}</h3>
            <button className="button-primary" onClick={restart}>Recomeçar</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
