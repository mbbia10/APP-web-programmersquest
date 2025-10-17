import React, { useEffect } from "react";
import "./ProgramersQuestLanding.css";
import "./animations.js";
import { initAnimations } from "./animations";

import { useNavigate } from "react-router-dom";

export default function ProgramersQuestLanding() {
  const navigate = useNavigate();
useEffect(() => {
  const timeout = setTimeout(() => {
    initAnimations();
  }, 300); // pequeno delay pra garantir render
  return () => clearTimeout(timeout);
}, []);

  return (
    <div className="programers-landing">
      <div className="floating-icons"></div>
      <div className="foguetes-container"></div>

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
          <button className="button-gradient" onClick={() => navigate("/missoes")}>
            Jogar Agora
          </button>
        </nav>
      </header>

      {/* Main */}
      <main className="main-section">
        <section className="section">
          <h2>Embarque na galáxia do código</h2>
          <p>
            Programers Quest é um jogo educativo que transforma conceitos de
            programação em missões interativas. Aprenda lógica, estruturas de
            dados e desenvolvimento web enquanto explora planetas, resolve
            desafios e desbloqueia ferramentas.
          </p>

          <div className="button-group">
            <button className="button-primary">Como Jogar</button>
            <button className="button-secondary">Ver Recursos</button>
          </div>

          <div className="feature-grid">
            <FeatureCard
              title="Lógica"
              desc="Aprenda passo a passo com desafios de código"
              icon="🧩"
              onClick={() => navigate("/logica")}
            />
            <FeatureCard
              title="Missões"
              desc="Resolva problemas reais em formato de jogo"
              icon="⚡"
              onClick={() => navigate("/missoes")}
            />
            <FeatureCard
              title="Progressão"
              desc="Suba de nível e acompanhe seu avanço"
              icon="🪐"
              onClick={() => navigate("/progresso")}
            />
          </div>
        </section>

        <section className="section">
          <div className="card missao">
            <h3>Tela de Missão</h3>
            <p>Resolva o puzzle para consertar a nave</p>
            <div className="mock-container">
              <MockCard label="Entrada" />
              <MockCard label="Saída" />
              <MockCard label="Dicas" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div>
          © {new Date().getFullYear()} Programers Quest — Todos os direitos reservados
        </div>
        <div>
          <a href="#">Termos</a> | <a href="#">Privacidade</a>
        </div>
      </footer>
    </div>
  );
}

/* --- Components --- */
function FeatureCard({ title, desc, icon, onClick }) {
  return (
    <div className="card feature-card" onClick={onClick}>
      <div className="feature-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function MockCard({ label }) {
  return (
    <div className="mock-card">
      <div>{label}</div>
      <div>Placeholder</div>
    </div>
  );
}
