import { defineConfig } from "vite";

// IMPORTANTE para GitHub Pages:
// - Se publicar em https://SEU_USUARIO.github.io/NOME_DO_REPO/,
//   defina base como "/NOME_DO_REPO/"
// - Se publicar na raiz (user/organization page), deixe base como "/"
export default defineConfig({
  base: "/",
  server: {
    // escuta em todas as interfaces (necessário para túnel/rede)
    host: true,
    // permita seu domínio do ngrok (use o específico ou wildcard do subdomínio)
    // Opção A: domínio específico do seu túnel
    // Opção B (alternativa): wildcard do ngrok
    allowedHosts: [".ngrok-free.app"],

    // Se o HMR não conectar pelo túnel (WebSocket), descomente e ajuste:
    // hmr: {
    //   host: "e39ca073d0d1.ngrok-free.app",
    //   protocol: "wss",   // use "wss" se o túnel for https
    //   clientPort: 443    // porta do HTTPS do ngrok
    // },

    // opcional, trava a porta
    strictPort: true,
    port: 5173
  }
});