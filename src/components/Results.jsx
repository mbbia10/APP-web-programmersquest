import React, { useMemo } from "react";
import { downloadResultCard } from "../utils/resultCard";

export default function Results({ score, total, perTopic, onRestart, onPracticeTopic, player }) {
  const pct = total ? (score / total) * 100 : 0;
  const pctText = `${pct.toFixed(1)}%`;

  const weakTopics = useMemo(() => {
    const arr = Object.entries(perTopic || {}).map(([topic, d]) => {
      const accuracy = d.total ? (d.correct || 0) / d.total : 0;
      return { topic, correct: d.correct || 0, total: d.total || 0, accuracy };
    });
    arr.sort((a, b) => a.accuracy - b.accuracy);
    return arr.slice(0, 2);
  }, [perTopic]);

  function shareResult() {
    const lines = [
      "Resultado do Programmer´s Quest:",
      `Pontuação: ${score} / ${total} (${pctText})`,
      "Por tópico:"
    ];
    Object.entries(perTopic || {}).forEach(([topic, d]) => {
      const p = d.total ? Math.round(((d.correct || 0) / d.total) * 100) : 0;
      lines.push(`- ${topic}: ${d.correct}/${d.total} (${p}%)`);
    });
    const text = lines.join("\n");
    navigator.clipboard.writeText(text);
  }

  function clearBest() {
    localStorage.removeItem("progquiz_best");
    alert("Melhor pontuação limpa!");
  }

  async function handleCard() {
    await downloadResultCard({
      player: { name: player?.name || "Jogador", avatar: player?.avatar || "/mage.png" },
      score,
      total,
      perTopic
    });
  }

  return (
    <section className="card cute">
      <h2 style={{ textAlign: "center", marginTop: 0 }}>Resultado</h2>
      <p style={{ textAlign: "center" }}>
        <strong>Pontuação:</strong>{" "}
        <span>{score} / {total} ({pctText})</span>
      </p>

      <div>
        <h3>Desempenho por tópico</h3>
        <ul>
          {Object.entries(perTopic || {}).map(([topic, data]) => {
            const p = data.total ? Math.round(((data.correct || 0) / data.total) * 100) : 0;
            return (
              <li key={topic}>
                {topic}: {data.correct}/{data.total} ({p}%)
              </li>
            );
          })}
        </ul>
      </div>

      {weakTopics.length ? (
        <div style={{ marginTop: 12 }}>
          <h3>Revisar pontos fracos</h3>
          <div className="results-actions" style={{ justifyContent: "center" }}>
            {weakTopics.map(w => (
              <button
                key={w.topic}
                className="btn"
                onClick={() => onPracticeTopic?.(w.topic)}
                title={`Praticar apenas ${w.topic}`}
              >
                Praticar {w.topic}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="results-actions" style={{ justifyContent: "center" }}>
        <button className="btn" onClick={onRestart}>Reiniciar</button>
        <button className="btn" onClick={shareResult}>Copiar resultado</button>
        <button className="btn" onClick={handleCard}>Gerar cartaz (PNG)</button>
        <button className="btn danger" onClick={clearBest}>Limpar melhor pontuação</button>
      </div>

      <p className="muted small" style={{ textAlign: "center" }}>
        Dica: publique no GitHub Pages e entregue o link + repositório.
      </p>
    </section>
  );
}