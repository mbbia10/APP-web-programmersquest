import React, { useEffect, useRef } from "react";

// Fundo animado: "chuva de código" em tons de roxo
// Controle a velocidade via prop: speed (0.3 = bem lento, 1 = normal)
export default function Background({ speed = 0.55 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const codeTokens = "< > {} () ; = + / * - const let if else return => [] for while map filter reduce".split(
      " "
    );
    const columnWidth = 22;
    let columns = Math.floor(w / columnWidth);
    let drops = Array.from({ length: columns }, () => Math.random() * -100);

    function onResize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      columns = Math.floor(w / columnWidth);
      drops = Array.from({ length: columns }, (_, i) => drops[i] ?? Math.random() * -100);
    }
    window.addEventListener("resize", onResize);

    function draw() {
      // “fade” leve para trilha (não cobre o conteúdo, o canvas fica atrás)
      ctx.fillStyle = "rgba(11, 10, 18, 0.10)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < drops.length; i++) {
        const x = i * columnWidth + 6;
        const y = drops[i] * 18;

        ctx.fillStyle = Math.random() < 0.08 ? "#c084fc" : "#8b5cf6";
        ctx.font = "16px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
        const token = codeTokens[Math.floor(Math.random() * codeTokens.length)];
        ctx.fillText(token, x, y);

        // velocidade controlada (mais baixo => mais lento)
        drops[i] += (Math.random() * 0.5 + 0.6) * speed;
        if (y > h + 40) drops[i] = Math.random() * -20;
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,          // <- garante que fique atrás
        pointerEvents: "none"
      }}
    />
  );
}