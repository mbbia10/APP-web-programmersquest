import React, { useEffect, useMemo, useState } from "react";

const EMPTY_Q = () => ({
  topic: "",
  prompt: "",
  code: "",
  choices: ["", "", "", ""],
  answer: 0,
  explanation: ""
});

function validateQuestion(q) {
  const errors = [];
  if (!q.topic?.trim()) errors.push("Tópico é obrigatório.");
  if (!q.prompt?.trim()) errors.push("Enunciado é obrigatório.");
  if (!Array.isArray(q.choices) || q.choices.length < 2) errors.push("Informe ao menos 2 alternativas.");
  if (q.choices.some((c) => !c?.trim())) errors.push("Todas as alternativas precisam ter texto.");
  if (q.answer < 0 || q.answer >= q.choices.length) errors.push("Índice da alternativa correta inválido.");
  if (!q.explanation?.trim()) errors.push("A explicação é obrigatória.");
  return { valid: errors.length === 0, errors };
}

export default function QuestionEditor({
  open,
  onClose,
  onSave,           // recebe array customQuestions atualizado
  initial = [],     // array de questões customizadas já salvas
  knownTopics = []  // lista de tópicos existentes para sugestão
}) {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(EMPTY_Q());
  const [editIdx, setEditIdx] = useState(-1);
  const topics = useMemo(() => {
    const extra = list.map((q) => q.topic).filter(Boolean);
    return Array.from(new Set([...(knownTopics || []), ...extra])).filter(Boolean);
  }, [knownTopics, list]);

  useEffect(() => {
    if (open) {
      setList(Array.isArray(initial) ? initial : []);
      setForm(EMPTY_Q());
      setEditIdx(-1);
    }
  }, [open, initial]);

  if (!open) return null;

  function startNew() {
    setForm(EMPTY_Q());
    setEditIdx(-1);
  }

  function startEdit(i) {
    setEditIdx(i);
    setForm(JSON.parse(JSON.stringify(list[i])));
  }

  function remove(i) {
    if (!confirm("Remover esta questão?")) return;
    const next = list.slice();
    next.splice(i, 1);
    setList(next);
  }

  function up(i) {
    if (i <= 0) return;
    const next = list.slice();
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setList(next);
  }
  function down(i) {
    if (i >= list.length - 1) return;
    const next = list.slice();
    [next[i + 1], next[i]] = [next[i], next[i + 1]];
    setList(next);
  }

  function setChoice(idx, val) {
    const ch = form.choices.slice();
    ch[idx] = val;
    setForm({ ...form, choices: ch });
  }

  function addChoice() {
    if (form.choices.length >= 6) return;
    setForm({ ...form, choices: [...form.choices, ""] });
  }
  function removeChoice(idx) {
    if (form.choices.length <= 2) return;
    const ch = form.choices.slice();
    ch.splice(idx, 1);
    let ans = form.answer;
    if (idx < ans) ans -= 1;
    else if (idx === ans) ans = 0;
    setForm({ ...form, choices: ch, answer: ans });
  }

  function saveForm() {
    const { valid, errors } = validateQuestion(form);
    if (!valid) {
      alert("Corrija os erros:\n- " + errors.join("\n- "));
      return;
    }
    const next = list.slice();
    if (editIdx >= 0) next[editIdx] = form;
    else next.push(form);
    setList(next);
    setForm(EMPTY_Q());
    setEditIdx(-1);
  }

  function exportCustom() {
    const data = JSON.stringify(list, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "custom-questions.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function importCustom() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const arr = JSON.parse(text);
        if (!Array.isArray(arr)) throw new Error("Arquivo não contém um array JSON.");
        const validated = [];
        const bad = [];
        arr.forEach((q, i) => {
          const { valid, errors } = validateQuestion(q);
          if (valid) validated.push(q);
          else bad.push(`Item ${i + 1}: ${errors.join("; ")}`);
        });
        if (bad.length) alert("Alguns itens foram ignorados:\n- " + bad.join("\n- "));
        setList([...list, ...validated]);
      } catch (e) {
        alert("Falha ao importar: " + e.message);
      }
    };
    input.click();
  }

  function resetCustom() {
    if (!confirm("Limpar todas as questões personalizadas?")) return;
    setList([]);
  }

  function persistAndClose() {
    onSave(list);
    onClose();
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Editor de Perguntas">
      <div className="modal-card" style={{ width: "min(1100px, 95vw)" }}>
        <div className="modal-header">
          <h3>Editor de Perguntas</h3>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div className="modal-body" style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: 12 }}>
          <div className="qe-left">
            <div className="field">
              <span>Tópico</span>
              <input
                list="topics"
                type="text"
                placeholder="Ex.: Variáveis"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
              />
              <datalist id="topics">
                {topics.map((t) => <option key={t} value={t} />)}
              </datalist>
            </div>
            <div className="field">
              <span>Enunciado</span>
              <textarea
                placeholder="Pergunta..."
                value={form.prompt}
                onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                rows={3}
                style={{ background: "#161337", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 10, padding: 10 }}
              />
            </div>
            <div className="field">
              <span>Snippet (opcional)</span>
              <textarea
                placeholder="Código opcional a ser exibido"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                rows={4}
                style={{ background: "#161337", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 10, padding: 10, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" }}
              />
            </div>

            <div className="field">
              <span>Alternativas</span>
              <div className="qe-choices">
                {form.choices.map((c, i) => (
                  <div key={i} className="qe-choice-row">
                    <input
                      type="radio"
                      name="correct"
                      checked={form.answer === i}
                      onChange={() => setForm({ ...form, answer: i })}
                      title="Correta"
                    />
                    <input
                      type="text"
                      placeholder={`Opção ${i + 1}`}
                      value={c}
                      onChange={(e) => setChoice(i, e.target.value)}
                    />
                    <button className="btn tiny" onClick={() => removeChoice(i)} disabled={form.choices.length <= 2}>–</button>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 6 }}>
                <button className="btn tiny" onClick={addChoice} disabled={form.choices.length >= 6}>+ Adicionar alternativa</button>
              </div>
            </div>

            <div className="field">
              <span>Explicação</span>
              <textarea
                placeholder="Explique por que a resposta está correta (e por que as outras não estão)."
                value={form.explanation}
                onChange={(e) => setForm({ ...form, explanation: e.target.value })}
                rows={3}
                style={{ background: "#161337", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 10, padding: 10 }}
              />
            </div>

            <div className="modal-actions" style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="btn" onClick={startNew}>Novo</button>
                <button className="btn primary" onClick={saveForm}>{editIdx >= 0 ? "Salvar edição" : "Adicionar"}</button>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="btn" onClick={importCustom} title="Importar JSON">Importar</button>
                <button className="btn" onClick={exportCustom} title="Exportar JSON">Exportar</button>
                <button className="btn danger" onClick={resetCustom} title="Limpar todas as personalizadas">Reset</button>
              </div>
            </div>
          </div>

          <div className="qe-right">
            <div style={{ marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <h4 style={{ margin: 0 }}>Minhas perguntas ({list.length})</h4>
              <small className="muted">Dica: clique em editar para ajustar; setas movem a ordem.</small>
            </div>
            <div className="qe-list">
              {list.length === 0 ? (
                <div className="muted">Você ainda não adicionou perguntas personalizadas.</div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: 140 }}>Tópico</th>
                      <th>Enunciado</th>
                      <th style={{ width: 130 }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((q, i) => (
                      <tr key={i}>
                        <td><span className="tag">{q.topic}</span></td>
                        <td style={{ color: "var(--text)" }}>{q.prompt}</td>
                        <td className="qe-actions">
                          <button className="btn tiny" onClick={() => up(i)} title="Subir">▲</button>
                          <button className="btn tiny" onClick={() => down(i)} title="Descer">▼</button>
                          <button className="btn tiny" onClick={() => startEdit(i)} title="Editar">Editar</button>
                          <button className="btn tiny danger" onClick={() => remove(i)} title="Remover">Remover</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button className="btn" onClick={onClose}>Cancelar</button>
              <button className="btn primary" onClick={persistAndClose}>Salvar e fechar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}