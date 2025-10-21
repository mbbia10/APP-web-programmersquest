import React, { useEffect, useMemo, useState } from "react";
import Intro from "./components/Intro.jsx";
import Learn from "./components/Learn.jsx";
import Quiz from "./components/Quiz.jsx";
import Results from "./components/Results.jsx";
import Background from "./components/Background.jsx";
import ProfileModal from "./components/ProfileModal.jsx";
import { QUESTIONS } from "./data/questions.js";
import { LESSONS } from "./data/lessons.js";

const BEST_KEY = "progquiz_best";
const PROFILE_KEY = "player_profile";
const SHUFFLE = true;

const DEFAULT_QUESTIONS = [
  {
    topic: "Variáveis",
    prompt: "Qual opção declara uma variável em JavaScript corretamente?",
    code: "",
    choices: ["var 1nome = 'Ana'", "let nome = 'Ana'", "const = nome 'Ana'", "def nome := 'Ana'"],
    answer: 1,
    explanation: 'Use var/let/const seguidos do identificador. "let nome = \\"Ana\\"" é válido.'
  },
  {
    topic: "Condicionais",
    prompt: "Qual expressão é verdadeira?",
    code: "const a = '5';\nconst b = 5;",
    choices: ["a == b e a === b", "a == b e a !== b", "a != b e a === b", "a !== b e a === b"],
    answer: 1,
    explanation: "== faz coerção; === compara tipo e valor."
  }
];

function shuffleArray(arr) {
  return arr.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(([, v]) => v);
}

function initPerTopic(questions) {
  const perTopic = {};
  questions.forEach((q) => {
    if (!perTopic[q.topic]) perTopic[q.topic] = { correct: 0, total: 0 };
    perTopic[q.topic].total += 1;
  });
  return perTopic;
}

export default function App() {
  const [view, setView] = useState("intro"); // intro | learn | quiz | results
  const [filterTopic, setFilterTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [perTopic, setPerTopic] = useState({});
  const [learnTopic, setLearnTopic] = useState(null);
  const [fromQuiz, setFromQuiz] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const allLessonsTopics = useMemo(() => Object.keys(LESSONS || {}), []);
  const currentQuestion = questions.length > 0 ? questions[index] : null;

  useEffect(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) {
      try { setProfile(JSON.parse(saved)); } catch {}
    }
  }, []);

  function getSafeQuestions() {
    if (Array.isArray(QUESTIONS) && QUESTIONS.length > 0) return QUESTIONS;
    console.warn("QUESTIONS vazio ou não carregado. Usando DEFAULT_QUESTIONS.");
    return DEFAULT_QUESTIONS;
  }

  function startQuiz(topic = null) {
    // Se não tem perfil, abre modal primeiro
    if (!profile) {
      setProfileOpen(true);
      return;
    }

    const base = getSafeQuestions().slice();
    const filtered = topic ? base.filter((q) => q.topic === topic) : base;

    if (!filtered.length) {
      if (topic) {
        alert(`Não há perguntas para o tópico: ${topic}. Abra “Aprender” para revisar ou adicione questões em src/data/questions.js.`);
        setFromQuiz(false);
        setLearnTopic(allLessonsTopics.includes(topic) ? topic : allLessonsTopics[0] || null);
        setView("learn");
      } else {
        alert("Banco de perguntas vazio. Edite src/data/questions.js e adicione questões.");
        setView("intro");
      }
      return;
    }

    const qs = SHUFFLE ? shuffleArray(filtered) : filtered;

    setQuestions(qs);
    setIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedIndex(null);
    setPerTopic(initPerTopic(qs));
    setFilterTopic(topic);
    setView("quiz");
  }

  function openLearn({ topic = null, fromQuiz = false } = {}) {
    // Se não tem perfil, ainda pode aprender, mas sugerimos criar
    setFromQuiz(fromQuiz);
    const initial = topic && LESSONS[topic] ? topic : (allLessonsTopics[0] || null);
    setLearnTopic(initial);
    setView("learn");
  }

  function backFromLearn() {
    setView("intro");
  }

  function backToQuiz() {
    if (questions.length > 0) setView("quiz");
    else setView("intro");
  }

  function selectChoice(idx) {
    if (answered) return;
    setAnswered(true);
    setSelectedIndex(idx);

    const q = questions[index];
    const isCorrect = idx === q.answer;
    if (isCorrect) {
      setScore((s) => s + 1);
      setPerTopic((pt) => ({
        ...pt,
        [q.topic]: { ...pt[q.topic], correct: (pt[q.topic]?.correct || 0) + 1 }
      }));
    }
  }

  function nextQuestion() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
      setAnswered(false);
      setSelectedIndex(null);
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    setView("results");
    const total = questions.length;
    const percentage = total ? Math.round((score / total) * 100) : 0;
    const best = JSON.parse(localStorage.getItem(BEST_KEY) || "null");
    const current = { score, total, percentage, date: new Date().toISOString(), perTopic };
    if (!best || current.percentage > best.percentage) {
      localStorage.setItem(BEST_KEY, JSON.stringify(current));
    }
  }

  function restart() {
    setView("intro");
    setQuestions([]);
    setIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedIndex(null);
    setPerTopic({});
    setFilterTopic(null);
  }

  function openProfile() {
    setProfileOpen(true);
  }
  function saveProfile(p) {
    setProfile(p);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    setProfileOpen(false);
  }

  return (
    <div className="app-root" style={{ position: "relative", zIndex: 1 }}>
      <Background speed={0.55} />

      <header className="app-header">
        <h1>Programmer´s Quest</h1>
        <p className="subtitle">Aprenda o básico e pratique com perguntas</p>

        <div className="header-profile">
          {profile?.name ? (
            <button className="profile-chip" onClick={openProfile} title="Alterar personagem">
              <img src={profile.avatar} alt={profile.name} />
              <span>{profile.name}</span>
            </button>
          ) : (
            <button className="btn tiny" onClick={openProfile}>Escolher personagem</button>
          )}
        </div>
      </header>

      <main className="container">
        {view === "intro" && (
          <Intro
            onLearn={() => openLearn({ fromQuiz: false })}
            onStart={() => startQuiz(null)}
            onOpenProfile={openProfile}
            player={profile}
          />
        )}

        {view === "learn" && (
          <Learn
            lessons={LESSONS}
            topics={allLessonsTopics}
            currentTopic={learnTopic}
            onSelectTopic={setLearnTopic}
            onPracticeAll={() => startQuiz(null)}
            onPracticeTopic={() => startQuiz(learnTopic)}
            onBack={fromQuiz ? backToQuiz : backFromLearn}
            fromQuiz={fromQuiz}
            mageImage={profile?.avatar || "/mage.png"}
            playerName={profile?.name || ""}
          />
        )}

        {view === "quiz" && (
          <Quiz
            question={currentQuestion}
            index={index}
            total={questions.length}
            filterTopic={filterTopic}
            answered={answered}
            selectedIndex={selectedIndex}
            onSelectChoice={selectChoice}
            onNext={nextQuestion}
            onOpenTheory={() => {
              if (currentQuestion?.topic) openLearn({ topic: currentQuestion.topic, fromQuiz: true });
            }}
            onCancel={() => setView("intro")}
            mageImage={profile?.avatar || "/mage.png"}
            playerName={profile?.name || ""}
          />
        )}

        {view === "results" && (
          <Results
            score={score}
            total={questions.length}
            perTopic={perTopic}
            onRestart={restart}
          />
        )}
      </main>

      <footer className="app-footer">
        <span>Feito para fins educacionais • © Você</span>
      </footer>

      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onSave={saveProfile}
        initial={profile || { name: "", avatar: "", charId: "" }}
      />
    </div>
  );
}