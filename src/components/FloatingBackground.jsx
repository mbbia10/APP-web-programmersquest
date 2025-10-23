import React, { useEffect, useRef } from "react";

const STYLE_ID = "floating-bg-style-v1";

function ensureStyleInjected() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
  .floating-icons, .foguetes-container {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
  }
  .float-symbol {
    position: absolute;
    color: rgba(236, 232, 255, 0.65);
    animation-name: floatUp;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    user-select: none;
    pointer-events: none;
    text-shadow: 0 2px 12px rgba(139, 92, 246, 0.35);
    will-change: transform, opacity;
  }
  @keyframes flyAcross {
    0% { transform: translateX(0) rotate(-20deg); opacity: 1; }
    100% { transform: translateX(120vw) rotate(15deg); opacity: 0; }
  }
  @keyframes floatUp {
    0% { transform: translateY(0); opacity: 0.9; }
    100% { transform: translateY(-120vh); opacity: 0; }
  }`;
  document.head.appendChild(style);
}

export default function FloatingBackground({
  // Quantidade
  floatsPerTick = 1,          // quantos emojis criados por tick
  floatIntervalMs = 800,      // intervalo entre ticks (ms)
  rocketIntervalMs = 4000,    // intervalo entre foguetes (ms)
  maxSymbols = 140,           // limite de elementos .float-symbol vivos

  // Velocidade
  emojiMinSpeedSec = 8,       // duração mínima da animação do emoji (s)
  emojiMaxSpeedSec = 16,      // duração máxima da animação do emoji (s)
  rocketSpeedSec = 10,        // duração da animação do foguete (s)

  // Aparência
  minFontRem = 1.0,
  maxFontRem = 2.5,
  iconSet = ["{}", "</>", "⚙️", "💻", ";", "🌌", "🧠"]
}) {
  const iconsRef = useRef(null);
  const rocketsRef = useRef(null);
  const timersRef = useRef([]);

  useEffect(() => {
    ensureStyleInjected();

    const container = iconsRef.current;
    const foguetes = rocketsRef.current;
    if (!container || !foguetes) return;

    function addFloat() {
      // Evita encher demais o DOM
      const current = container.querySelectorAll(".float-symbol").length;
      if (current >= maxSymbols) return;

      const span = document.createElement("span");
      span.classList.add("float-symbol");
      span.textContent = iconSet[Math.floor(Math.random() * iconSet.length)];
      span.style.left = Math.random() * 100 + "%";
      span.style.bottom = "-20px";
      const size = Math.random() * (maxFontRem - minFontRem) + minFontRem;
      span.style.fontSize = size.toFixed(2) + "rem";

      const duration = Math.random() * (emojiMaxSpeedSec - emojiMinSpeedSec) + emojiMinSpeedSec;
      span.style.animationDuration = duration.toFixed(2) + "s";

      container.appendChild(span);
      const life = (duration + 1) * 1000; // remove após animar
      setTimeout(() => span.remove(), life);
    }

    function addRocket() {
      const rocket = document.createElement("div");
      rocket.textContent = "🚀";
      rocket.style.position = "absolute";
      rocket.style.left = "-50px";
      rocket.style.bottom = Math.random() * 80 + "%";
      rocket.style.fontSize = "1.6rem";
      rocket.style.animation = `flyAcross ${rocketSpeedSec}s linear`;
      rocketsRef.current.appendChild(rocket);
      setTimeout(() => rocket.remove(), (rocketSpeedSec + 0.5) * 1000);
    }

    // Timers
    const t1 = setInterval(() => {
      for (let i = 0; i < Math.max(1, Math.floor(floatsPerTick)); i++) addFloat();
    }, Math.max(60, floatIntervalMs));
    const t2 = setInterval(addRocket, Math.max(500, rocketIntervalMs));
    timersRef.current.push(t1, t2);

    return () => {
      timersRef.current.forEach(clearInterval);
      timersRef.current = [];
      container.querySelectorAll(".float-symbol").forEach((n) => n.remove());
      while (foguetes.firstChild) foguetes.removeChild(foguetes.firstChild);
    };
  }, [
    floatsPerTick,
    floatIntervalMs,
    rocketIntervalMs,
    maxSymbols,
    emojiMinSpeedSec,
    emojiMaxSpeedSec,
    rocketSpeedSec,
    minFontRem,
    maxFontRem,
    iconSet
  ]);

  return (
    <>
      <div className="floating-icons" ref={iconsRef} aria-hidden="true" />
      <div className="foguetes-container" ref={rocketsRef} aria-hidden="true" />
    </>
  );
}