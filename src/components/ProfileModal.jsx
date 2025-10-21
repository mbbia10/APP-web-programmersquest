import React, { useEffect, useRef, useState } from "react";
import { confettiBurst } from "../utils/confetti";

const DEFAULT_CHARACTERS = [
  { id: "char1", name: "Herói 1", img: "/characters/char1.png" },
  { id: "char2", name: "Herói 2", img: "/characters/char2.png" },
  { id: "char3", name: "Herói 3", img: "/characters/char3.png" }
];

export default function ProfileModal({ open, onClose, onSave, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [selected, setSelected] = useState(initial?.charId || "");
  const [avatar, setAvatar] = useState(initial?.avatar || "");
  const fileRef = useRef(null);

  useEffect(() => {
    if (open) {
      setName(initial?.name || "");
      setSelected(initial?.charId || "");
      setAvatar(initial?.avatar || "");
    }
  }, [open, initial]);

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

  const valid = name.trim().length >= 2 && avatar;

  function save() {
    if (!valid) return;
    onSave({ name: name.trim(), charId: selected || "custom", avatar });
    confettiBurst({ x: window.innerWidth / 2, y: 120 });
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Escolher personagem e nome">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Escolha seu personagem e nome</h3>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div className="modal-body">
          <label className="field">
            <span>Seu nome</span>
            <input
              type="text"
              placeholder="Digite seu nome"
              maxLength={20}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div className="avatars-header">
            <span>Escolha um personagem</span>
            <button className="btn tiny" onClick={pickFile} type="button">Enviar foto</button>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: "none" }} />
          </div>

          <div className="avatar-grid">
            {DEFAULT_CHARACTERS.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`avatar-card ${selected === c.id ? "active" : ""}`}
                onClick={() => chooseChar(c)}
                aria-pressed={selected === c.id ? "true" : "false"}
              >
                <img src={c.img} alt={c.name} />
                <span className="avatar-name">{c.name}</span>
              </button>
            ))}

            {avatar && selected === "custom" ? (
              <button
                type="button"
                className="avatar-card active"
                onClick={pickFile}
                title="Trocar sua foto"
              >
                <img src={avatar} alt="Sua foto" />
                <span className="avatar-name">Sua foto</span>
              </button>
            ) : (
              <button type="button" className="avatar-card" onClick={pickFile}>
                <div className="avatar-upload">+</div>
                <span className="avatar-name">Enviar foto</span>
              </button>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn primary" onClick={save} disabled={!valid}>Salvar</button>
        </div>
      </div>
    </div>
  );
}