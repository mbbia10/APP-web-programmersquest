import React, { useEffect, useRef, useState } from "react";
import { confettiBurst } from "../utils/confetti";

const DEFAULT_CHARACTERS = [
  { id: "char1", name: "Explvorador", img: "/characters/char1.png" },
  { id: "char2", name: "Mago", img: "/characters/char2.png" },
  { id: "char3", name: "Magicista", img: "/characters/char3.png" }
];

const SUGGESTED_NAMES = [
  "CoderKid", "Nova", "Luna", "Pixel", "Nix", "Beta", "Rafa", "Domi", "Mika", "Sky",
  "Kira", "Zig", "Kai", "Nalu", "Teca", "Lipe"
];

function sanitizeName(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}
function validateName(s) {
  const n = sanitizeName(s);
  if (n.length < 2) return "Digite pelo menos 2 caracteres.";
  if (n.length > 20) return "No máximo 20 caracteres.";
  return "";
}

export default function ProfileModal({ open, onClose, onSave, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [selected, setSelected] = useState(initial?.charId || "");
  const [avatar, setAvatar] = useState(initial?.avatar || "");
  const [nameError, setNameError] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    if (open) {
      setName(initial?.name || "");
      setSelected(initial?.charId || "");
      setAvatar(initial?.avatar || "");
      setNameError("");
    }
  }, [open, initial]);

  useEffect(() => {
    setNameError(validateName(name));
  }, [name]);

  if (!open) return null;

  function pickFile() {
    fileRef.current?.click();
  }
  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelected("custom");
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function chooseChar(c) {
    setSelected(c.id);
    setAvatar(c.img);
  }

  function suggestName() {
    const current = sanitizeName(name);
    let candidate = SUGGESTED_NAMES[Math.floor(Math.random() * SUGGESTED_NAMES.length)];
    // evita sugerir exatamente o atual
    if (current && candidate.toLowerCase() === current.toLowerCase()) {
      candidate = SUGGESTED_NAMES[(Math.floor(Math.random() * SUGGESTED_NAMES.length) + 1) % SUGGESTED_NAMES.length];
    }
    setName(candidate);
  }

  const valid = !nameError && avatar;

  function save() {
    if (!valid) return;
    const payload = { name: sanitizeName(name), charId: selected || "custom", avatar };
    onSave(payload);
    confettiBurst({ x: window.innerWidth / 2, y: 120 });
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && valid) {
      e.preventDefault();
      save();
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Escolher personagem e nome" onKeyDown={onKeyDown}>
      <div className="modal-card profile-modal">
        <div className="modal-header">
          <h3>Seu perfil</h3>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        {/* Prévia do perfil */}
        <div className="profile-preview">
          <div className="preview-avatar">
            {avatar ? (
              <img src={avatar} alt="Prévia do avatar" />
            ) : (
              <div className="preview-placeholder">?</div>
            )}
          </div>
          <div className="preview-info">
            <div className="preview-name">{sanitizeName(name) || "Seu nome"}</div>
            <div className="muted small">É assim que você aparecerá no topo e no cartaz do resultado.</div>
          </div>
        </div>

        <div className="modal-body profile-grid">
          <section className="profile-left">
            <div className="field">
              <div className="name-row">
                <label htmlFor="player-name">Seu nome</label>
                <button type="button" className="btn tiny" onClick={suggestName} title="Sugerir um nome">
                  Sugestão
                </button>
              </div>
              <input
                id="player-name"
                type="text"
                placeholder="Digite seu nome"
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!nameError}
                aria-describedby="name-error"
              />
              {nameError ? <div id="name-error" className="field-error">{nameError}</div> : null}
            </div>

            <div className="field">
              <div className="avatars-header">
                <span>Escolha um personagem</span>
                <button className="btn tiny" onClick={pickFile} type="button">Enviar foto</button>
                <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} />
              </div>

              <div className="avatar-grid improved" role="radiogroup" aria-label="Personagens disponíveis">
                {DEFAULT_CHARACTERS.map((c) => {
                  const active = selected === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={active ? "true" : "false"}
                      className={`avatar-card improved ${active ? "active" : ""}`}
                      onClick={() => chooseChar(c)}
                    >
                      <div className="avatar-thumb">
                        <img src={c.img} alt={c.name} />
                        {active && <span className="check-badge">✓</span>}
                      </div>
                      <span className="avatar-name">{c.name}</span>
                    </button>
                  );
                })}

                {/* Upload card */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected === "custom" ? "true" : "false"}
                  className={`avatar-card improved ${selected === "custom" ? "active" : ""}`}
                  onClick={pickFile}
                  title="Enviar sua foto"
                >
                  <div className="avatar-thumb">
                    {selected === "custom" && avatar ? (
                      <img src={avatar} alt="Sua foto" />
                    ) : (
                      <div className="avatar-upload">+</div>
                    )}
                    {selected === "custom" && avatar ? <span className="check-badge">✓</span> : null}
                  </div>
                  <span className="avatar-name">{selected === "custom" && avatar ? "Sua foto" : "Enviar foto"}</span>
                </button>
              </div>
              {!avatar && <div className="field-error">Escolha um personagem ou envie sua foto.</div>}
            </div>
          </section>

          <aside className="profile-right tip-box">
            <strong>Dicas do Mago</strong>
            <ul>
              <li>Escolha um personagem que te represente.</li>
              <li>Use um nome curto e fácil de ler.</li>
              <li>Você pode trocar isso a qualquer momento no topo.</li>
            </ul>
          </aside>
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn primary" onClick={save} disabled={!valid}>Salvar</button>
        </div>
      </div>
    </div>
  );
}