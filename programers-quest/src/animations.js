// animations.js
export function initAnimations() {
  const icons = ["{}", "</>", "⚙️", "💻", ";", "🚀", "🌌"];
  const container = document.querySelector(".floating-icons");
  const foguetes = document.querySelector(".foguetes-container");


  if (!container || !foguetes) return;

  
  setInterval(() => {
    const span = document.createElement("span");
    span.classList.add("float-symbol");
    span.textContent = icons[Math.floor(Math.random() * icons.length)];
    span.style.left = Math.random() * 100 + "%";
    span.style.bottom = "-20px";
    span.style.fontSize = Math.random() * 1.5 + 1 + "rem";
    span.style.animationDuration = Math.random() * 8 + 8 + "s";
    container.appendChild(span);
    setTimeout(() => span.remove(), 12000);
  }, 800);


  setInterval(() => {
    const rocket = document.createElement("div");
    rocket.textContent = "🚀";
    rocket.style.position = "absolute";
    rocket.style.left = "-50px";
    rocket.style.bottom = Math.random() * 80 + "%";
    rocket.style.fontSize = "1.5rem";
    rocket.style.animation = "flyAcross 10s linear";
    foguetes.appendChild(rocket);
    setTimeout(() => rocket.remove(), 10000);
  }, 4000);
}

// adiciona keyframe dinâmico apenas uma vez
if (!document.getElementById("flyAcrossStyle")) {
  const style = document.createElement("style");
  style.id = "flyAcrossStyle";
  style.textContent = `
  @keyframes flyAcross {
    0% { transform: translateX(0) rotate(-20deg); opacity: 1; }
    100% { transform: translateX(120vw) rotate(15deg); opacity: 0; }
  }`;
  document.head.appendChild(style);
}
