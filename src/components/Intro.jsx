import React from "react";

export default function Intro({ onLearn, onStart, onOpenProfile, onOpenEditor, player }) {
  return (
    <section className="card">
      <h2>Como funciona</h2>
      <ul>
        <li>Aprenda o básico de cada tópico no módulo “Aprender”.</li>
        <li>Pratique com perguntas e receba feedback imediato.</li>
        <li>Seu melhor desempenho fica salvo neste navegador.</li>
      </ul>

      {player?.name ? (
        <div className="profile-pill">
          <img src={player.avatar} alt={player.name} />
          <div>
            <div className="profile-name">{player.name}</div>
            <button className="btn tiny" onClick={onOpenProfile}>Alterar personagem</button>
          </div>
        </div>
      ) : (
        <div className="profile-ask">
          <button className="btn" onClick={onOpenProfile}>Escolher personagem</button>
        </div>
      )}

      <div className="intro-actions">
        <button className="btn" onClick={onLearn}>Aprender</button>
        <button className="btn primary" onClick={onStart}>Praticar (Quiz)</button>
        <button className="btn" onClick={onOpenEditor} title="Adicionar/editar perguntas">
          Editar perguntas
        </button>
      </div>
    </section>
  );
}