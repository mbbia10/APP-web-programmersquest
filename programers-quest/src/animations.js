// animations.js
document.addEventListener("DOMContentLoaded", () => {
  const missionCard = document.querySelector(".card.missao");
  if (!missionCard) return;

  let glow = 0;
  let direction = 1;

  setInterval(() => {
    glow += direction * 0.02;
    if (glow > 1 || glow < 0) direction *= -1;

    missionCard.style.boxShadow = `0 0 ${20 + glow * 10}px rgba(180, 100, 255, ${0.3 + glow * 0.4})`;
  }, 80);
});
