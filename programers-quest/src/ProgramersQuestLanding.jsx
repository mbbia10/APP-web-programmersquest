import React from "react";

export default function ProgramersQuestLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#0b1220] to-[#081025] text-white relative overflow-hidden">
      {/* Galaxy background stars */}
      <svg className="pointer-events-none fixed inset-0 w-full h-full -z-10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="g1" cx="50%" cy="10%" r="60%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g1)" />
        {/* small stars */}
        {Array.from({ length: 80 }).map((_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r={Math.random() * 1.6 + 0.2}
            fill={Math.random() > 0.85 ? '#ffffff' : '#c7d2fe'}
            opacity={Math.random() * 0.9 + 0.1}
          />
        ))}
      </svg>

      <header className="max-w-6xl mx-auto px-6 pt-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 20h16" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 7l5-4 5 4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3v14" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Programers Quest</h1>
              <p className="text-xs text-slate-300">Aprenda programação jogando — aventura educativa</p>
            </div>
          </div>
          <div className="hidden md:flex gap-6 items-center text-sm text-slate-200">
            <a href="#sobre" className="hover:underline">Sobre</a>
            <a href="#gameplay" className="hover:underline">Como Jogar</a>
            <a href="#recursos" className="hover:underline">Recursos</a>
            <a href="#contato" className="hover:underline">Contato</a>
            <button className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-black font-semibold shadow-md">Jogar Agora</button>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Embarque na galáxia do código</h2>
            <p className="mt-4 text-slate-200 max-w-xl">Programers Quest é um jogo educativo que transforma conceitos de programação em missões interativas. Aprenda lógica, estruturas de dados e desenvolvimento web enquanto explora planetas, resolve desafios e desbloqueia ferramentas.</p>

            <div className="mt-6 flex gap-3">
              <a href="#gameplay" className="px-5 py-3 rounded-lg bg-white text-black font-semibold shadow">Como Jogar</a>
              <a href="#recursos" className="px-5 py-3 rounded-lg border border-slate-600 text-slate-200">Ver Recursos</a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <FeatureCard title="Lógica" desc="Aprenda passo a passo" icon="</>" />
              <FeatureCard title="Missões" desc="Problemas do mundo real" icon="🚀" />
              <FeatureCard title="Progressão" desc="Níveis que ensinam" icon="⭐" />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl p-1 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-2xl">
              <div className="bg-[#071027] rounded-2xl p-6">
                <div className="h-56 md:h-72 w-full rounded-xl bg-gradient-to-br from-[#08102a] via-[#0b1b3a] to-[#021029] flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Tela de Missão</h3>
                    <p className="text-slate-300 mt-2">Resolva o puzzle para consertar a nave</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <MockCard label="Entrada"/>
                  <MockCard label="Saída"/>
                  <MockCard label="Dicas"/>
                </div>
              </div>
            </div>

            <svg className="absolute -right-10 -bottom-10 opacity-50" width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="130" cy="130" r="130" fill="url(#rg)" />
              <defs>
                <radialGradient id="rg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(130 130) rotate(90) scale(130)">
                  <stop stopColor="#7c3aed" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#06b6d4" stopOpacity="0.08" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </section>

        <section id="sobre" className="mt-16">
          <h3 className="text-2xl font-bold">Sobre o jogo</h3>
          <p className="mt-3 text-slate-200 max-w-3xl">Programers Quest foi criado para tornar o aprendizado de programação mais atraente para iniciantes e jovens estudantes. Em vez de apenas ler teoria, os jogadores aprendem através de provas concretas: cada planeta tem temas — variáveis, loops, arrays, funções e mais — apresentados por meio de puzzles e minijogos. O objetivo é ensinar fundamentos e preparar para desafios reais.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <InfoCard title="Currículo Progressivo" text="Conteúdo organizado do básico ao avançado, com checkpoints." />
            <InfoCard title="Feedback Imediato" text="Correções automáticas e dicas que explicam o porquê." />
            <InfoCard title="Projetos Reais" text="Missões que simulam problemas do mundo real." />
          </div>
        </section>

        <section id="gameplay" className="mt-16">
          <h3 className="text-2xl font-bold">Como jogar</h3>
          <ol className="mt-4 list-decimal list-inside text-slate-200 max-w-3xl space-y-3">
            <li>Crie sua conta e escolha um avatar espacial.</li>
            <li>Complete o tutorial de introdução (variáveis e comandos básicos).</li>
            <li>Explore planetas — cada planeta é um módulo com missões.</li>
            <li>Use a sandbox integrada para testar seu código e ver a saída imediatamente.</li>
            <li>Conclua missões para ganhar recursos, desbloquear ferramentas e progredir na história.</li>
          </ol>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl p-6 bg-gradient-to-tr from-[#071027] to-[#041029] shadow-inner">
              <h4 className="font-semibold">Exemplo de missão</h4>
              <p className="mt-2 text-slate-300">"Ajude o robô a atravessar o labirinto usando apenas loops."</p>
              <pre className="mt-3 bg-[#021126] p-3 rounded-md text-sm overflow-auto">{`for (let i = 0; i < 10; i++) {
  moverFrente();
  if (sensorParede()) virarDireita();
}`}</pre>
            </div>

            <div className="rounded-xl p-6 bg-gradient-to-tr from-[#071027] to-[#041029]">
              <h4 className="font-semibold">Ferramenta: Sandbox</h4>
              <p className="mt-2 text-slate-300">Editor leve com dicas, testes automatizados e console integrado.</p>
              <div className="mt-3 flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-black font-semibold">Abrir Sandbox</button>
                <button className="px-4 py-2 rounded-lg border border-slate-600">Ver Testes</button>
              </div>
            </div>
          </div>
        </section>

        <section id="recursos" className="mt-16">
          <h3 className="text-2xl font-bold">Recursos & Aprendizado</h3>
          <p className="mt-3 text-slate-200 max-w-3xl">Além das missões, o jogo oferece:</p>
          <ul className="mt-4 list-disc list-inside text-slate-200 max-w-3xl space-y-2">
            <li>Notas didáticas e links para materiais de estudo.</li>
            <li>Desafios semanais com leaderboard.</li>
            <li>Modo professor: criar turmas e acompanhar progresso.</li>
          </ul>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <MiniCard title="Para Professores" text="Gerencie turmas e avalie progresso." />
            <MiniCard title="Leaderboard" text="Comparação por experiência e badges." />
            <MiniCard title="Certificados" text="Conquiste certificados ao finalizar módulos." />
          </div>
        </section>

        <section id="cta" className="mt-16 text-center">
          <div className="inline-block rounded-3xl p-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] shadow-xl">
            <div className="px-10 py-8 bg-[#07102a] rounded-3xl">
              <h3 className="text-2xl font-bold">Pronto para começar?</h3>
              <p className="mt-2 text-slate-300">Junte-se à comunidade de aprendizes e transforme curiosidade em habilidade.</p>
              <div className="mt-6 flex justify-center gap-4">
                <button className="px-6 py-3 rounded-lg bg-white text-black font-semibold">Criar Conta</button>
                <button className="px-6 py-3 rounded-lg border border-slate-600">Experimentar Demo</button>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="mt-16 mb-24 grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-bold">Fale com a gente</h4>
            <p className="mt-2 text-slate-300 max-w-md">Para parcerias, escolas ou sugestões, envie uma mensagem. Estamos sempre abertos a feedbacks para melhorar o aprendizado.</p>
            <form className="mt-4 space-y-3 max-w-md">
              <input className="w-full rounded-md p-3 bg-[#031125] border border-slate-700" placeholder="Seu nome" />
              <input className="w-full rounded-md p-3 bg-[#031125] border border-slate-700" placeholder="Email" />
              <textarea className="w-full rounded-md p-3 bg-[#031125] border border-slate-700" rows={4} placeholder="Mensagem" />
              <div>
                <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-black font-semibold">Enviar</button>
              </div>
            </form>
          </div>

          <div className="rounded-xl p-6 bg-gradient-to-tr from-[#04102a] to-[#021029]">
            <h4 className="font-semibold">Roadmap</h4>
            <ul className="mt-3 text-slate-200 space-y-2">
              <li>📌 Módulos iniciais: Variáveis, Loops, Funções</li>
              <li>📌 Próximo: Introdução a JavaScript e DOM</li>
              <li>📌 Futuro: Multiplayer cooperativo e editor de níveis</li>
            </ul>
            <div className="mt-6 text-sm text-slate-400">Versão: MVP • Conteúdo educacional</div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-400">© {new Date().getFullYear()} Programers Quest — Todos os direitos reservados</div>
          <div className="flex gap-4 text-sm text-slate-300">
            <a href="#" className="hover:underline">Termos</a>
            <a href="#" className="hover:underline">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* --- Small presentational components --- */

function FeatureCard({ title, desc }) {
  return (
    <div className="rounded-xl p-4 bg-gradient-to-br from-[#061226] to-[#041025] border border-slate-700">
      <div className="text-2xl">⭐</div>
      <h4 className="mt-2 font-semibold">{title}</h4>
      <p className="text-slate-300 text-sm mt-1">{desc}</p>
    </div>
  );
}

function MockCard({ label }) {
  return (
    <div className="rounded-lg p-3 bg-[#021029] border border-slate-800 text-center text-sm">
      <div className="font-semibold">{label}</div>
      <div className="text-slate-400 text-xs mt-2">Placeholder</div>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-xl p-6 bg-gradient-to-br from-[#07102a] to-[#041029] border border-slate-800">
      <h5 className="font-semibold">{title}</h5>
      <p className="text-slate-300 mt-2 text-sm">{text}</p>
    </div>
  );
}

function MiniCard({ title, text }) {
  return (
    <div className="rounded-xl p-4 bg-[#021126] border border-slate-800">
      <h6 className="font-semibold">{title}</h6>
      <p className="text-slate-300 text-sm mt-2">{text}</p>
    </div>
  );
}
