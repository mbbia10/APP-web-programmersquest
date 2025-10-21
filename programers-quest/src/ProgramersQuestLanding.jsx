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
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="programers-landing">
      <div className="floating-icons"></div>
      <div className="foguetes-container"></div>

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
            <button className="button-primary" onClick={() => navigate("/missoes")}>
              Jogar Agora
            </button>
            <button className="button-secondary" onClick={() => navigate("/leaderboard")}>
              Ver Classificação
            </button>
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
            <p>Arraste os passos para a ordem correta.</p>
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
        <div className="footer-links">
          <button type="button" className="linklike">Termos</button>
          <span className="sep">|</span>
          <button type="button" className="linklike">Privacidade</button>
        </div>
      </footer>
    </div>
  );
}

/* --- Components --- */
function FeatureCard({ title, desc, icon, onClick }) {
  return (
    <div className="card feature-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}>
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