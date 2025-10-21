import React, { useEffect } from "react";
import Coach from "./Coach.jsx";

const ICONS = {
  Variáveis: "📦",
  Condicionais: "🔀",
  Loops: "🔁",
  Funções: "🪄",
  Arrays: "📚",
  Strings: "🧵",
  Objetos: "🎒",
  default: "📘",
};

export default function Learn({
  lessons,
  topics,
  currentTopic,
  onSelectTopic,
  onPracticeAll,
  onPracticeTopic,
  onBack,
  fromQuiz,
  mageImage,
  playerName
}) {
  const data = currentTopic ? lessons[currentTopic] : null;

  useEffect(() => {
    if (!currentTopic && topics.length) onSelectTopic(topics[0]);
  }, [currentTopic, topics, onSelectTopic]);

  return (
    <section className="card" aria-live="polite">
      <div className="learn-header">
        <h2>Aulas rápidas</h2>
        <div className="learn-actions">
          <button className="btn" onClick={onBack}>
            {fromQuiz ? "Voltar ao Quiz" : "Voltar"}
          </button>
          <button className="btn" onClick={onPracticeAll}>Praticar todas</button>
          <button className="btn primary" onClick={onPracticeTopic} disabled={!currentTopic}>
            Praticar este tópico
          </button>
        </div>
      </div>

      <div className="learn-layout">
        <nav className="learn-nav" aria-label="Tópicos">
          {topics.map((t) => {
            const icon = ICONS[t] || ICONS.default;
            const active = t === currentTopic;
            return (
              <button
                key={t}
                type="button"
                className={`topic-btn ${active ? "active" : ""}`}
                onClick={() => onSelectTopic(t)}
              >
                <span className="topic-ico" aria-hidden="true">{icon}</span>
                <span className="topic-label">{t}</span>
              </button>
            );
          })}
        </nav>

        <article className="learn-content">
          <h3>{data?.title || "Selecione um tópico"}</h3>
          {data?.summary && <p className="muted">{data.summary}</p>}

          {!!(data?.points?.length) && (
            <>
              <h4>Pontos-chave</h4>
              <ul>
                {data.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </>
          )}

          {data?.code && (
            <>
              <h4>Exemplo</h4>
              <pre className="code-block"><code>{data.code}</code></pre>
            </>
          )}

          {!!(data?.pitfalls?.length) && (
            <>
              <h4>Erros comuns</h4>
              <ul>
                {data.pitfalls.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </>
          )}

          {!!(data?.exercises?.length) && (
            <>
              <h4>Experimente</h4>
              <ul>
                {data.exercises.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </>
          )}
        </article>
      </div>

      <Coach topic={currentTopic || "Geral"} context="learn" mageImage={mageImage} playerName={playerName} />
    </section>
  );
}