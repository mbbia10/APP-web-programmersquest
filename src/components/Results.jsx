import React from "react";

export default function Results({ score, total, perTopic, onRestart }) {
  const pct = total ? Math.round((score / total) * 100) : 0;

  function shareResult() {
    const lines = [
      "Resultado do ProgQuiz:",
      `Pontuação: ${score}/${total} (${pct}%)`,
      "Por tópico:"
    ];
    Object.entries(perTopic || {}).forEach(([topic, d]) => {
      const p = Math.round(((d.correct || 0) / (d.total || 0)) * 100) || 0;
      lines.push(`- ${topic}: ${d.correct}/${d.total} (${p}%)`);
    });
    const text = lines.join("\n");
    navigator.clipboard.writeText(text);
  }

  function clearBest() {
    localStorage.removeItem("progquiz_best");
    alert("Melhor pontuação limpa!");
  }

  return (
    <section className="card">
      <h2>Resultado</h2>
      <p>
        <strong>Pontuação:</strong>{" "}
        <span>{score} / {total} ({pct}%)</span>
      </p>

      <div>
        <h3>Desempenho por tópico</h3>
        <ul>
          {Object.entries(perTopic || {}).map(([topic, data]) => {
            const p = Math.round(((data.correct || 0) / (data.total || 0)) * 100) || 0;
            return (
              <li key={topic}>
                {topic}: {data.correct}/{data.total} ({p}%)
              </li>
            );
          })}
        </ul>
      </div>

      <div className="results-actions">
        <button className="btn" onClick={onRestart}>Reiniciar</button>
        <button className="btn" onClick={shareResult}>Copiar resultado</button>
        <button className="btn danger" onClick={clearBest}>Limpar melhor pontuação</button>
      </div>

      <p className="muted small">Dica: publique no GitHub Pages e entregue o link + repositório.</p>
    </section>
  );
}