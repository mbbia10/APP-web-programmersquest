// Confete leve com emojis (sem dependências)
export function confettiBurst({ x = window.innerWidth / 2, y = window.innerHeight / 2 } = {}) {
  const emojis = ["✨", "🪄", "⭐", "💜", "🎉"];
  const count = 22;

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.className = "confetti";
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    const dx = (Math.random() - 0.5) * 220;
    const dy = -Math.random() * 240 - 120;
    const rot = (Math.random() - 0.5) * 120;
    span.style.setProperty("--dx", `${dx}px`);
    span.style.setProperty("--dy", `${dy}px`);
    span.style.setProperty("--rot", `${rot}deg`);
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 1000);
  }
}