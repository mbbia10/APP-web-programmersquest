import React, { useEffect, useMemo, useState } from "react";
import Coach from "./Coach.jsx";
import { confettiBurst } from "../utils/confetti";
import { Sound } from "../utils/sound";

export default function Quiz({
  question,
  index,
  total,
  filterTopic,
  answered,
  selectedIndex,
  onSelectChoice,     // agora recebe (idx, hintUsed)
  onNext,
  onOpenTheory,
  onCancel,
  mageImage,
  playerName
}) {
  const [hintUsed, setHintUsed] = useState(false);
  const [hiddenChoices, setHiddenChoices] = useState(new Set());

  const progress = useMemo(() => (total ? (index / total) * 100 : 0), [index, total]);

  useEffect(() => {
    function handler(e) {
      if (e.key === "Enter" && !document.getElementById("btnNext")?.disabled) {
        onNext();
        Sound.play("next");
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onNext]);

  // Reset hint state ao carregar nova questão
  useEffect(() => {
    setHintUsed(false);
    setHiddenChoices(new Set());
  }, [question, index]);

  // Confete ao acertar
  useEffect(() => {
    if (!question || !answered) return;
    const correct = question.answer;
    if (selectedIndex === correct) {
      confettiBurst({ x: window.innerWidth / 2, y: 120 });
      Sound.play("correct");
    } else {
      Sound.play("wrong");
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

  function handleHint() {
    if (!question || hintUsed) return;
    // Elimina 2 alternativas incorretas aleatórias
    const wrongIdx = question.choices
      .map((_, i) => i)
      .filter((i) => i !== correct && !hiddenChoices.has(i));
    // embaralha e pega 2
    for (let i = wrongIdx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wrongIdx[i], wrongIdx[j]] = [wrongIdx[j], wrongIdx[i]];
    }
    const toHide = wrongIdx.slice(0, 2);
    const nextSet = new Set(hiddenChoices);
    toHide.forEach((i) => nextSet.add(i));
    setHiddenChoices(nextSet);
    setHintUsed(true);
    Sound.play("hint");
  }

  function handleSelect(i) {
    if (showFeedback) return;
    // passa informação de dica usada
    onSelectChoice(i, hintUsed);
  }

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
        <div className="right quiz-tools">
          <button className="btn" onClick={onOpenTheory}>Teoria do tópico</button>
          <button
            className="btn"
            onClick={handleHint}
            disabled={hintUsed || showFeedback}
            title="Elimina 2 alternativas; acerto vale 0,5 ponto"
          >
            Pedir dica (-0,5)
          </button>
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
          const hidden = hiddenChoices.has(i) && !showFeedback; // após responder, mostramos todas para feedback
          const classNames = [
            "choice",
            showFeedback && good ? "correct" : "",
            showFeedback && picked && !good ? "incorrect" : "",
            hidden ? "is-hidden" : ""
          ].join(" ").trim();

          return (
            <button
              key={i}
              type="button"
              className={classNames}
              aria-disabled={showFeedback ? "true" : "false"}
              onClick={() => handleSelect(i)}
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
        <button
          id="btnNext"
          className="btn"
          onClick={() => { onNext(); Sound.play("next"); }}
          disabled={!showFeedback}
        >
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