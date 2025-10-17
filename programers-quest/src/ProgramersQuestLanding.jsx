import React from "react";
import { useNavigate } from 'react-router-dom';
import "./ProgramersQuestLanding.css";
import "./animations.js";

export default function ProgramersQuestLanding() {
  const navigate = useNavigate();

  return (
    <div className="programers-landing">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo-icon">🚀</div>
          <div>
            <h1>Programers Quest</h1>
            <p>Aprenda programação jogando — aventura educativa</p>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#gameplay">Como Jogar</a>
          <a href="#recursos">Recursos</a>
          <a href="#contato">Contato</a>
          <button className="button-gradient" onClick={()=> navigate('/logica')}>Jogar Agora</button>
        </nav>
      </header>

      {/* Main */}
      <main className="main-section">
        <section className="section">
          <h2>Embarque na galáxia do código</h2>
          <p>
            Programers Quest é um jogo educativo que transforma conceitos de programação em missões interativas.
            Aprenda lógica, estruturas de dados e desenvolvimento web enquanto explora planetas, resolve desafios e desbloqueia ferramentas.
          </p>

          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
            <button className="button-primary" onClick={()=> navigate('/logica')}>Como Jogar</button>
            <button className="button-secondary" onClick={()=> navigate('/recursos')}>Ver Recursos</button>
          </div>

          <div
            className="feature-grid"
            style={{
              marginTop: "1.5rem",
            }}
          >
            <FeatureCard title="Lógica" desc="Aprenda passo a passo" to="/logica" />
            <FeatureCard title="Missões" desc="Problemas do mundo real" to="/missoes" />
            <FeatureCard title="Progressão" desc="Níveis que ensinam" to="/progresso" />
          </div>
        </section>

        <section className="section">
          <div className="card missao">
            <h3>Tela de Missão</h3>
            <p>Resolva o quebra-cabeça para restaurar a nave</p>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <MockCard label="Entrada" />
              <MockCard label="Saída" />
              <MockCard label="Dicas" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div>© {new Date().getFullYear()} Programers Quest — Todos os direitos reservados</div>
        <div>
          <a href="#">Termos</a> | <a href="#">Privacidade</a>
        </div>
      </footer>
    </div>
  );
}

/* --- Components --- */
function FeatureCard({ title, desc, to }) {
  const navigate = useNavigate();
  return (
    <div className="card feature-card" role="button" onClick={() => navigate(to)}>
      <h4>{title}</h4>
      <p>{desc}</p>
      <div className="cta">Entrar</div>
    </div>
  );
}

function MockCard({ label }) {
  return (
    <div className="mock-card">
      <div className="mock-label">{label}</div>
      <div className="mock-placeholder">Espaço reservado</div>
    </div>
  );
}
