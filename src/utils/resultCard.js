export async function generateResultCard({
  player = { name: "Jogador", avatar: "/mage.png" },
  score = 0,
  total = 0,
  perTopic = {},
  title = "Programmer´s Quest",
  subtitle = "Resultado"
} = {}) {
  const W = 1000, H = 560;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Fundo gradiente
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#271a52");
  g.addColorStop(1, "#0b0a12");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Decoração
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = "#8b5cf6";
  for (let i = 0; i < 24; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 60 + 20;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Título
  ctx.fillStyle = "#ece8ff";
  ctx.font = "bold 36px Inter, Arial, sans-serif";
  ctx.fillText(title, 40, 60);
  ctx.font = "24px Inter, Arial, sans-serif";
  ctx.fillStyle = "#bfb6ff";
  ctx.fillText(subtitle, 40, 96);

  // Avatar
  const avatarSize = 128;
  const avatarX = 40;
  const avatarY = 130;

  await drawRoundedImage(ctx, player.avatar, avatarX, avatarY, avatarSize, avatarSize, 16);

  // Nome
  ctx.fillStyle = "#ece8ff";
  ctx.font = "bold 28px Inter, Arial, sans-serif";
  const name = (player.name || "Jogador").slice(0, 24);
  ctx.fillText(name, avatarX + avatarSize + 20, avatarY + 44);

  // Pontuação e medalha
  const pct = total ? Math.round((score / total) * 100) : 0;
  ctx.font = "24px Inter, Arial, sans-serif";
  ctx.fillStyle = "#bfb6ff";
  ctx.fillText(`Pontuação: ${score} / ${total} (${pct}%)`, avatarX + avatarSize + 20, avatarY + 80);

  const medal = pct >= 90 ? "🥇 Ouro" : pct >= 75 ? "🥈 Prata" : pct >= 50 ? "🥉 Bronze" : "💜 Explorador";
  ctx.fillStyle = "#ece8ff";
  ctx.fillText(`Medalha: ${medal}`, avatarX + avatarSize + 20, avatarY + 114);

  // Barra por tópico
  const topics = Object.entries(perTopic || {});
  const barsX = 40;
  const barsY = 300;
  const barW = W - 80;
  const rowH = 34;

  ctx.font = "20px Inter, Arial, sans-serif";
  ctx.fillStyle = "#ece8ff";
  ctx.fillText("Desempenho por tópico:", barsX, barsY - 16);

  topics.slice(0, 6).forEach(([topic, d], i) => {
    const y = barsY + i * rowH;
    const acc = d.total ? (d.correct || 0) / d.total : 0;
    ctx.fillStyle = "#1b1637";
    roundRect(ctx, barsX, y, barW, 20, 10);
    ctx.fill();
    const fillW = Math.max(4, Math.round(barW * acc));
    const grad = ctx.createLinearGradient(barsX, y, barsX + fillW, y);
    grad.addColorStop(0, "#8b5cf6");
    grad.addColorStop(1, "#c084fc");
    ctx.fillStyle = grad;
    roundRect(ctx, barsX, y, fillW, 20, 10);
    ctx.fill();

    ctx.fillStyle = "#ece8ff";
    ctx.font = "16px Inter, Arial, sans-serif";
    const label = `${topic}: ${d.correct || 0}/${d.total || 0} (${Math.round(acc * 100)}%)`;
    ctx.fillText(label, barsX + 8, y + 15);
  });

  // Rodapé
  ctx.font = "16px Inter, Arial, sans-serif";
  ctx.fillStyle = "#bfb6ff";
  ctx.fillText("Feito com Programmer´s Quest", 40, H - 24);

  return await canvasToDataURL(canvas);

  // Helpers
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  async function drawRoundedImage(ctx, src, x, y, w, h, r = 12) {
    const img = await loadImage(src);
    ctx.save();
    roundRect(ctx, x, y, w, h, r);
    ctx.clip();
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
    // borda
    ctx.strokeStyle = "#2a2353";
    ctx.lineWidth = 2;
    roundRect(ctx, x, y, w, h, r);
    ctx.stroke();
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function canvasToDataURL(canvas) {
    return new Promise((resolve) => {
      resolve(canvas.toDataURL("image/png"));
    });
  }
}

export async function downloadResultCard(opts = {}) {
  const dataUrl = await generateResultCard(opts);
  const a = document.createElement("a");
  a.href = dataUrl;
  const name = (opts?.player?.name || "resultado").replace(/[^\p{L}\p{N}_-]/gu, "_");
  a.download = `resultado_${name}.png`;
  a.click();
}