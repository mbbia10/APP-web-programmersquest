import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProgramersQuestLanding from './ProgramersQuestLanding';
import TelaLogica from './TelaLogica';
import TelaMissoes from './TelaMissoes';
import TelaProgresso from './TelaProgresso';
import Leaderboard from './pages/Leaderboard';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProgramersQuestLanding />} />
        <Route path="/logica" element={<TelaLogica />} />
        <Route path="/missoes" element={<TelaMissoes />} />
        <Route path="/progresso" element={<TelaProgresso />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}