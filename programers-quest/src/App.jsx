import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProgramersQuestLanding from './ProgramersQuestLanding';
import TelaLogica from './TelaLogica';
import TelaMissoes from './TelaMissoes';
import TelaProgresso from './TelaProgresso';
import './ProgramersQuestLanding.css';

export default function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<PageWrapper><ProgramersQuestLanding/></PageWrapper>} />
          <Route path="/logica" element={<PageWrapper><TelaLogica/></PageWrapper>} />
          <Route path="/missoes" element={<PageWrapper><TelaMissoes/></PageWrapper>} />
          <Route path="/progresso" element={<PageWrapper><TelaProgresso/></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
    >
      {children}
    </motion.div>
  );
}
