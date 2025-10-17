import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ProgramersQuestLanding.css';

/* Simple ordering puzzle: drag to reorder steps */
const initial = [
  { id: 'a', text: 'Ligar gerador' },
  { id: 'b', text: 'Conectar módulo' },
  { id: 'c', text: 'Iniciar sequência' },
];

export default function TelaMissoes() {
  const [items, setItems] = useState(shuffle(initial));
  const [message, setMessage] = useState('');

  function shuffle(arr){ return [...arr].sort(()=>Math.random()-0.5); }

  function onDragStart(e, idx){
    e.dataTransfer.setData('text/plain', idx);
  }
  function onDrop(e, idx){
    const from = Number(e.dataTransfer.getData('text/plain'));
    const to = idx;
    const copy = [...items];
    const [moved] = copy.splice(from,1);
    copy.splice(to,0,moved);
    setItems(copy);
  }

  function allow(e){ e.preventDefault(); }

  function check(){
    const ok = items.map(i=>i.id).join('') === initial.map(i=>i.id).join('');
    setMessage(ok ? 'Missão concluída! Nave restaurada 🚀' : 'A ordem ainda está errada.');
  }

  function reset(){
    setItems(shuffle(initial)); setMessage('');
  }

  return (
    <div className="game-screen">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} className="game-card">
        <h2>Puzzle de Missão</h2>
        <p>Arraste os passos para a ordem correta.</p>
        <div className="drag-list">
          {items.map((it,idx)=>(
            <div
              key={it.id}
              draggable
              onDragStart={(e)=>onDragStart(e, idx)}
              onDragOver={allow}
              onDrop={(e)=>onDrop(e, idx)}
              className="drag-item"
            >
              {it.text}
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button className="button-primary" onClick={check}>Verificar</button>
          <button className="button-secondary" onClick={reset}>Embaralhar</button>
        </div>

        {message && <div className="message">{message}</div>}
      </motion.div>
    </div>
  );
}
