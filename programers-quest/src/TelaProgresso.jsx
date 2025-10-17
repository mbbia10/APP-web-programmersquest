import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ProgramersQuestLanding.css';

export default function TelaProgresso(){
  const [value, setValue] = useState(40);
  function inc(){ setValue(v=>Math.min(100,v+10)); }
  function dec(){ setValue(v=>Math.max(0,v-10)); }
  return (
    <div className="game-screen">
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} className="game-card">
        <h2>Progresso do Jogador</h2>
        <p>Complete missões para subir de nível.</p>

        <div className="progress-wrap">
          <div className="progress-bar" style={{width: value + '%'}} />
        </div>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button className="button-primary" onClick={inc}>+ Progresso</button>
          <button className="button-secondary" onClick={dec}>- Progresso</button>
        </div>

        <div style={{marginTop:12}}>Progresso: {value}%</div>
      </motion.div>
    </div>
  );
}
