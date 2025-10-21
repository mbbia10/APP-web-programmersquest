import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { confettiBurst } from "../utils/Confetti";
import "../coach.css";

// Dicas (adulto e kids) — sem mudanças perigosas de sintaxe
const DEFAULT_TIPS = {
  Variáveis: [
    "Use const por padrão e let quando precisar reatribuir.",
    "Nomes claros ajudam a entender o código depois.",
    "Evite var em JS moderno; prefira let/const.",
  ],
  Condicionais: [
    "Prefira === a == para evitar coerção inesperada.",
    "Ternário é ótimo para retornos simples: cond ? A : B.",
    "Condições devem ser expressivas e simples.",
  ],
  Loops: [
    "for é bom para contadores; for...of para coleções.",
    "Cuidado com loops infinitos no while.",
    "Prefira métodos de array (map/filter) quando possível.",
  ],
  Funções: [
    "Funções pequenas e com nome claro são mais fáceis de manter.",
    "Retorne cedo para simplificar condições.",
    "Arrow functions são ótimas para callbacks.",
  ],
  Arrays: [
    "map retorna um novo array; forEach não.",
    "filter seleciona itens; reduce acumula valores.",
    "Cuidado ao mutar arrays compartilhados.",
  ],
  Strings: [
    "Template literals deixam o código mais legível.",
    "includes verifica ocorrência de substring.",
    "trim remove espaços extras no início/fim.",
  ],
  Objetos: [
    "Acesse com ponto ou colchetes: obj.x ou obj['x'].",
    "Desestruture para legibilidade: const { nome } = obj.",
    "Propriedade inexistente retorna undefined.",
  ],
  __generic: [
    "Leia a pergunta com calma e destaque palavras-chave.",
    "Teste mentalmente o código antes de responder.",
    "Errou? Sem problema! Aprender é iterar.",
  ],
};

const KIDS_TIPS = {
  Variáveis: [
    "Variável é uma caixinha onde guardamos coisas! 📦",
    "const é caixinha que não muda; let pode mudar! 🔁",
    "Dê nomes legais pras caixinhas. ✨",
  ],
  Condicionais: [
    "Se algo for verdade, fazemos uma coisa; senão, outra! ✅❌",
    "Use === para comparar direitinho! 🧪",
    "O ternário é tipo escolher: se sim, A; se não, B. 🔀",
  ],
  Loops: [
    "Loop repete uma tarefa várias vezes! 🔁",
    "Cuidado para não repetir para sempre! ♾️",
    "for...of ajuda a passear pelos itens! 🚶",
  ],
  Funções: [
    "Função é uma receita: entra algo, sai algo! 🍰",
    "Dê nomes que expliquem o que faz! 🏷️",
    "Use return para devolver a resposta! 🎁",
  ],
  Arrays: [
    "Array é uma fila de coisas! 📚",
    "map faz uma nova fila transformada! ✨",
    "filter escolhe só o que queremos! ✅",
  ],
  Strings: [
    "Strings são textos! 📝",
    "includes vê se tem uma palavrinha dentro! 🔍",
    "Com crase você monta frases: `Olá, ${nome}` ✨",
  ],
  Objetos: [
    "Objeto é uma mochila com bolsos (propriedades)! 🎒",
    "Acesse com ponto: pessoa.nome 👈",
    "Desestruturar é tirar do bolso: const { nome } = pessoa 🪄",
  ],
  __generic: [
    "Leia com calma. Você consegue! 💪",
    "Tente e, se errar, tentamos de novo! 🔄",
    "Programar é brincar com ideias! 🧠✨",
  ],
};

const KIDS_QUIZZES = {
  Variáveis: [
    { q: "Qual caixinha NÃO pode mudar?", a: ["let", "const"], correct: 1, tip: "const é constante! 🧊" },
  ],
  Condicionais: [
    { q: "Qual compara tipo e valor?", a: ["==", "==="], correct: 1, tip: "=== é o super comparador! 🦸" },
  ],
  Loops: [{ q: "Qual repete uma ação várias vezes?", a: ["for", "soma"], correct: 0, tip: "for repete! 🔁" }],
  __generic: [
    { q: "Programar é…", a: ["Brincar com ideias!", "Só decorar coisas."], correct: 0, tip: "Criatividade conta! 🎨" },
  ],
};

const LS_KEYS = { voice: "mago_voiceURI", rate: "mago_rate", pitch: "mago_pitch", kids: "mago_kids" };

function chunkText(text, maxLen = 180) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const sentences = clean.split(/([.!?…]+)\s+/).reduce((acc, part, i, arr) => {
    if (i % 2 === 0) {
      const punct = arr[i + 1] || "";
      acc.push((part + " " + punct).trim());
    }
    return acc;
  }, []);
  const chunks = [];
  let buf = "";
  for (const s of sentences) {
    if ((buf + " " + s).trim().length > maxLen) {
      if (buf) chunks.push(buf.trim());
      buf = s;
    } else {
      buf = (buf ? buf + " " : "") + s;
    }
  }
  if (buf) chunks.push(buf.trim());
  return chunks;
}

function useSpeech() {
  const [enabled, setEnabled] = useState(false);
  const [voices, setVoices] = useState([]);
  const [voiceURI, setVoiceURI] = useState(localStorage.getItem(LS_KEYS.voice) || "");
  const [rate, setRate] = useState(parseFloat(localStorage.getItem(LS_KEYS.rate) || "0.95"));
  const [pitch, setPitch] = useState(parseFloat(localStorage.getItem(LS_KEYS.pitch) || "1.1"));
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);

  useEffect(() => {
    if (!synthRef.current) return;
    function loadVoices() {
      const list = synthRef.current.getVoices() || [];
      const pt = list.filter((v) => v.lang?.toLowerCase().startsWith("pt"));
      const nonPt = list.filter((v) => !v.lang?.toLowerCase().startsWith("pt"));
      setVoices([...pt, ...nonPt]);
      if (!voiceURI) {
        const chosen = pt[0] || list[0];
        if (chosen?.voiceURI) setVoiceURI(chosen.voiceURI);
      }
    }
    loadVoices();
    synthRef.current.onvoiceschanged = loadVoices;
    return () => { try { synthRef.current.onvoiceschanged = null; } catch {} };
  }, [voiceURI]);

  useEffect(() => { localStorage.setItem(LS_KEYS.voice, voiceURI || ""); }, [voiceURI]);
  useEffect(() => { localStorage.setItem(LS_KEYS.rate, String(rate)); }, [rate]);
  useEffect(() => { localStorage.setItem(LS_KEYS.pitch, String(pitch)); }, [pitch]);

  function stop() { try { synthRef.current?.cancel(); } catch {} }

  function speak(text) {
    if (!enabled || !synthRef.current || !text) return;
    stop();
    const chunks = chunkText(text);
    const current = voices.find((v) => v.voiceURI === voiceURI) || null;
    function speakChunk(i) {
      if (i >= chunks.length) return;
      const u = new SpeechSynthesisUtterance(chunks[i]);
      u.lang = current?.lang || "pt-BR";
      u.voice = current || null;
      u.rate = rate;
      u.pitch = pitch;
      u.onend = () => speakChunk(i + 1);
      u.onerror = () => speakChunk(i + 1);
      synthRef.current.speak(u);
    }
    speakChunk(0);
  }

  function unlock() {
    try {
      if (!synthRef.current) return;
      const dummy = new SpeechSynthesisUtterance("");
      synthRef.current.speak(dummy);
      synthRef.current.cancel();
    } catch {}
  }

  return { enabled, setEnabled, voices, voiceURI, setVoiceURI, rate, setRate, pitch, setPitch, speak, stop, unlock };
}

function useTypewriter(text, speed = 16) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    setOut("");
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

function buildMessages({ topic, context, explanation, kids, playerName }) {
  const dict = kids ? KIDS_TIPS : DEFAULT_TIPS;
  const base = dict[topic] || dict.__generic;
  const hello = playerName ? `Oi, ${playerName}! ` : "";
  const intro =
    context === "learn"
      ? kids
        ? `Vamos aprender ${topic}! Eu te mostro o essencial! 🪄`
        : `Vamos aprender ${topic}? Eu destaco os pontos principais e erros comuns.`
      : kids
        ? `Foco em ${topic}! Vamos pensar juntinhos? 🤝`
        : `Foco em ${topic}. Leia a questão, analise o código e tente eliminar alternativas.`;
  const outro =
    context === "learn"
      ? kids
        ? `Quando quiser, clique em “Praticar este tópico”! 🎯`
        : `Quando quiser, clique em “Praticar este tópico”.`
      : kids
        ? `Se pintar dúvida, toque em “Teoria do tópico”! 📘`
        : `Se ficar em dúvida, use “Teoria do tópico” para revisar.`;

  const msgs = [`${hello}${intro}`, ...base.slice(0, 3), outro];
  if (explanation?.trim()) msgs.push(explanation);
  return msgs;
}

function useDraggable(initial = { x: null, y: null }) {
  const [pos, setPos] = useState(initial);
  const dragRef = useRef(null);

  useEffect(() => {
    const el = dragRef.current;
    if (!el) return;
    let startX = 0, startY = 0, origX = 0, origY = 0, dragging = false;

    function onDown(e) {
      dragging = true;
      const rect = el.getBoundingClientRect();
      origX = rect.left;
      origY = rect.top;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      e.preventDefault();
    }
    function onMove(e) {
      if (!dragging) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      setPos({ x: origX + (cx - startX), y: origY + (cy - startY) });
    }
    function onUp() { dragging = false; }

    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return { pos, dragRef };
}

export default function Coach({
  topic = "Geral",
  context = "learn",
  explanation = "",
  onOpenTheory,
  mageImage = "/mage.png",
  inline = false,
  playerName
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [idx, setIdx] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [kids, setKids] = useState(localStorage.getItem(LS_KEYS.kids) !== "false");
  const [miniMode, setMiniMode] = useState("talk");
  const [miniResult, setMiniResult] = useState(null);

  const speech = useSpeech();
  const messages = useMemo(
    () => buildMessages({ topic, context, explanation, kids, playerName }),
    [topic, context, explanation, kids, playerName]
  );
  const typed = useTypewriter(messages[idx], kids ? 12 : 16);

  useEffect(() => {
    setIdx(0);
    setMiniMode("talk");
    setMiniResult(null);
  }, [topic, context, kids, explanation, playerName]);

  useEffect(() => {
    if (speech.enabled) speech.speak(messages[idx]);
  }, [idx, messages, speech.enabled, speech.voiceURI, speech.rate, speech.pitch]); // eslint-disable-line

  useEffect(() => { localStorage.setItem(LS_KEYS.kids, String(kids)); }, [kids]);

  function next() { setIdx((i) => (i + 1) % messages.length); setMiniMode("talk"); setMiniResult(null); }
  function prev() { setIdx((i) => (i - 1 + messages.length) % messages.length); setMiniMode("talk"); setMiniResult(null); }

  const quizPool = KIDS_QUIZZES[topic] && KIDS_QUIZZES[topic].length ? KIDS_QUIZZES[topic] : KIDS_QUIZZES.__generic;
  const quiz = quizPool[0];

  function answerMini(i) {
    const correct = i === quiz.correct;
    setMiniResult(correct ? "yes" : "no");
    if (correct) {
      confettiBurst({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
      if (speech.enabled) speech.speak("Muito bem! Você acertou! 🎉");
    } else {
      if (speech.enabled) speech.speak(quiz.tip || "Quase! Vamos tentar de novo?");
    }
  }

  const { pos, dragRef } = useDraggable();
  const portalStyle = inline
    ? undefined
    : {
        position: "fixed",
        zIndex: 9999,
        right: pos.x == null ? 16 : "auto",
        bottom: pos.y == null ? 16 : "auto",
        left: pos.x != null ? `${Math.max(6, Math.min(pos.x, window.innerWidth - 90))}px` : "auto",
        top: pos.y != null ? `${Math.max(6, Math.min(pos.y, window.innerHeight - 90))}px` : "auto",
      };

  const ptVoices = (speech.voices || []).filter((v) => (v.lang || "").toLowerCase().startsWith("pt"));
  const friendlyName = (v) => v.name.replace(/Google\s+/i, "").replace(/\(.*\)/, "").trim() + (v.lang ? ` (${v.lang})` : "");

  const body = (
    <div className={`coach ${collapsed ? "is-collapsed" : ""}`} role="complementary" aria-live="polite" style={portalStyle}>
      <div
        className="coach-avatar"
        ref={dragRef}
        aria-hidden="true"
        onClick={() => { setCollapsed((c) => !c); if (!collapsed) speech.stop(); }}
        onMouseDown={() => speech.unlock()}
        onTouchStart={() => speech.unlock()}
      >
        <img src={mageImage} alt="Mago guia" width="64" height="64" style={{ display: "block", borderRadius: 14 }} />
      </div>

      {!collapsed && (
        <div className="coach-bubble">
          <div className="coach-header">
            <strong>Mago</strong>
            <div className="coach-actions">
              {onOpenTheory && context === "quiz" && (
                <button className="coach-btn" onClick={onOpenTheory} title="Abrir teoria do tópico">Teoria</button>
              )}
              <button className={`coach-btn ${kids ? "on" : ""}`} onClick={() => setKids((k) => !k)} title="Alternar Modo Crianças">
                {kids ? "Crianças: ON" : "Crianças: OFF"}
              </button>
              {kids && (
                <button className="coach-btn" onClick={() => { setMiniMode((m) => (m === "talk" ? "quiz" : "talk")); setMiniResult(null); }} title="Quiz relâmpago">
                  Jogar
                </button>
              )}
              <button
                className={`coach-btn ${speech.enabled ? "on" : ""}`}
                onClick={() => {
                  speech.unlock();
                  speech.setEnabled((e) => {
                    const next = !e;
                    if (next) speech.speak(messages[idx]); else speech.stop();
                    return next;
                  });
                }}
                title={speech.enabled ? "Desativar narração" : "Ativar narração"}
              >
                {speech.enabled ? "Narrando" : "Narrar"}
              </button>
              <button className="coach-btn" onClick={() => setShowSettings((s) => !s)} title="Voz e velocidade">Voz</button>
              <button className="coach-btn" onClick={() => setCollapsed(true)} title="Minimizar">Min</button>
            </div>
          </div>

          {miniMode === "talk" ? (
            <>
              <div className="coach-text">{typed}</div>
              <div className="coach-nav">
                <button className="coach-btn" onClick={prev} aria-label="Anterior">◀</button>
                <span className="coach-index">{idx + 1}/{messages.length}</span>
                <button className="coach-btn" onClick={next} aria-label="Próxima">▶</button>
              </div>
            </>
          ) : (
            <div className="kids-quiz">
              <div className="quiz-q">{quiz.q}</div>
              <div className="quiz-a">
                {quiz.a.map((opt, i) => {
                  const state = miniResult == null ? "" : i === quiz.correct ? "correct" : "incorrect";
                  return (
                    <button key={i} className={`coach-btn bubble ${state}`} onClick={() => answerMini(i)} disabled={miniResult != null}>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {miniResult != null && (
                <div className="quiz-tip">
                  {miniResult === "yes" ? "Uhuu! Acertou! 🎉" : (quiz.tip || "Tente outra vez!")}
                </div>
              )}
            </div>
          )}

          {showSettings && (
            <div className="coach-settings">
              <label>
                Selecionar voz:
                <select value={speech.voiceURI} onChange={(e) => speech.setVoiceURI(e.target.value)} title="Escolha uma voz (prioriza português)">
                  {ptVoices.length > 0
                    ? ptVoices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{friendlyName(v)}</option>)
                    : speech.voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{friendlyName(v)}</option>)
                  }
                </select>
              </label>
              <label>
                Velocidade: {speech.rate.toFixed(2)}
                <input type="range" min="0.7" max="1.3" step="0.05" value={speech.rate} onChange={(e) => speech.setRate(parseFloat(e.target.value))} />
              </label>
              <label>
                Tom: {speech.pitch.toFixed(2)}
                <input type="range" min="0.8" max="1.4" step="0.05" value={speech.pitch} onChange={(e) => speech.setPitch(parseFloat(e.target.value))} />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (inline || typeof document === "undefined") return body;
  return createPortal(body, document.body);
}