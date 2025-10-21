import React, { useEffect, useMemo } from "react";
import Coach from "./Coach.jsx";
import { confettiBurst } from "../utils/Confetti.js";

export default function Quiz({
  question,
  index,
  total,
  filterTopic,
  answered,
  selectedIndex,
  onSelectChoice,
  onNext,
  onOpenTheory,
  onCancel,
  mageImage,
  playerName
}) {
  const progress = useMemo(() => (total ? (index / total) * 100 : 0), [index, total]);

  useEffect(() => {
    function handler(e) {
      if (e.key === "Enter" && !document.getElementById("btnNext")?.disabled) {
        onNext();
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onNext]);

  useEffect(() => {
    if (!question || !answered) return;
    const correct = question.answer;
    if (selectedIndex === correct) {
      confettiBurst({ x: window.innerWidth / 2, y: 120 });
    }
  }, [answered, selectedIndex, question]);

  if (!total) {
    return (
      <section className="card">
        <h2>Nenhuma pergunta disponível</h2>
        <p className="muted">
          Não encontramos perguntas para este modo. Volte e escolha outro tópico ou adicione questões em src/data/questions.js.
        </p>
        <div className="intro-actions">
          <button className="btn" onClick={onCancel}>Voltar</button>
        </div>
      </section>
    );
  }

  if (!question) {
    return (
      <section className="card">
        <p>Carregando perguntas...</p>
        <div className="intro-actions" style={{ marginTop: 8 }}>
          <button className="btn" onClick={onCancel}>Voltar</button>
        </div>
      </section>
    );
  }

  const correct = question.answer;
  const showFeedback = answered;
  const isCorrect = selectedIndex === correct;
  const explanationText = showFeedback
    ? (isCorrect ? "Boa! " : "Quase! ") + (question.explanation || "")
    : "";

  return (
    <section className="card" aria-live="polite" style={{ position: "relative", zIndex: 1 }}>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz-header">
        <div className="left">
          <span className="tag">{filterTopic ? `${question.topic} (foco)` : question.topic}</span>
          <span className="muted">{`Pergunta ${index + 1} de ${total}`}</span>
        </div>
        <div className="right">
          <button className="btn" onClick={onOpenTheory}>Teoria do tópico</button>
        </div>
      </div>

      <h2>{question.prompt}</h2>

      {question.code?.trim() ? (
        <pre className="code-block">
          <code>{question.code}</code>
        </pre>
      ) : null}

      <div className="choices">
        {question.choices.map((c, i) => {
          const good = i === correct;
          const picked = i === selectedIndex;
          const classNames = [
            "choice",
            showFeedback && good ? "correct" : "",
            showFeedback && picked && !good ? "incorrect" : ""
          ].join(" ").trim();

          return (
            <button
              key={i}
              type="button"
              className={classNames}
              aria-disabled={showFeedback ? "true" : "false"}
              onClick={() => onSelectChoice(i)}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div id="feedback" className={`feedback ${showFeedback ? "" : "hidden"}`} role="status">
        {showFeedback
          ? (isCorrect
              ? `Correto! ${question.explanation}`
              : `Resposta incorreta. ${question.explanation}`)
          : ""}
      </div>

      <div className="quiz-actions">
        <button id="btnNext" className="btn" onClick={onNext} disabled={!showFeedback}>
          Próxima
        </button>
      </div>

      <Coach
        topic={question.topic}
        context="quiz"
        explanation={explanationText}
        onOpenTheory={onOpenTheory}
        mageImage={mageImage}
        playerName={playerName}
      />
    </section>
  );
}