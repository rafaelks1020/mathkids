import { useState, useEffect, useRef } from "react";

// ============================================================
// MATHKIDS — Protótipo Interativo
// Software Educacional de Matemática para Educação Infantil
// ============================================================

const COLORS = {
  bg: "#FFF8F0",
  primary: "#FF6B35",
  secondary: "#5B8DEF",
  success: "#4ECB71",
  warning: "#FFD93D",
  pink: "#FF8FAB",
  purple: "#B388FF",
  cyan: "#4DD0E1",
  dark: "#2D3436",
  gray: "#95A5A6",
  white: "#FFFFFF",
  lightBg: "#FFF0E6",
};

const AVATARS = [
  { id: 1, emoji: "🦁", name: "Leão", color: "#FFD93D" },
  { id: 2, emoji: "🐰", name: "Coelho", color: "#FF8FAB" },
  { id: 3, emoji: "🐸", name: "Sapo", color: "#4ECB71" },
  { id: 4, emoji: "🦊", name: "Raposa", color: "#FF6B35" },
  { id: 5, emoji: "🐼", name: "Panda", color: "#B388FF" },
  { id: 6, emoji: "🐧", name: "Pinguim", color: "#4DD0E1" },
];

const SHAPES = [
  { name: "Círculo", svg: "circle", color: "#FF6B35" },
  { name: "Quadrado", svg: "square", color: "#5B8DEF" },
  { name: "Triângulo", svg: "triangle", color: "#4ECB71" },
  { name: "Retângulo", svg: "rectangle", color: "#B388FF" },
];

const FRUIT_EMOJIS = ["🍎", "🍊", "🍋", "🍇", "🍓", "🍑", "🥝", "🍌", "🫐", "🍒"];

function ShapeIcon({ type, size = 48, color }) {
  if (type === "circle") return <svg width={size} height={size} viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill={color} /></svg>;
  if (type === "square") return <svg width={size} height={size} viewBox="0 0 48 48"><rect x="4" y="4" width="40" height="40" rx="4" fill={color} /></svg>;
  if (type === "triangle") return <svg width={size} height={size} viewBox="0 0 48 48"><polygon points="24,4 44,44 4,44" fill={color} /></svg>;
  if (type === "rectangle") return <svg width={size} height={size} viewBox="0 0 60 48"><rect x="2" y="8" width="56" height="32" rx="4" fill={color} /></svg>;
  return null;
}

// ============================================================
// TELA: Login por Avatar
// ============================================================
function LoginScreen({ onLogin }) {
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleSelect = (avatar) => {
    setSelected(avatar);
    setAnimating(true);
    setTimeout(() => onLogin(avatar), 800);
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.bg} 0%, #FFE8D6 50%, #FFDDD2 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Fredoka', 'Nunito', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🧮</div>
        <h1 style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, margin: 0, textShadow: "2px 2px 0 rgba(255,107,53,0.15)" }}>MathKids</h1>
        <p style={{ fontSize: 20, color: COLORS.gray, fontWeight: 500, margin: "8px 0 0" }}>Quem vai aprender hoje?</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 420, width: "100%" }}>
        {AVATARS.map((a) => (
          <button key={a.id} onClick={() => handleSelect(a)} style={{
            background: selected?.id === a.id ? a.color : COLORS.white,
            border: `4px solid ${selected?.id === a.id ? a.color : "#E8E8E8"}`,
            borderRadius: 24, padding: "20px 12px", cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: selected?.id === a.id ? "scale(1.1)" : "scale(1)",
            boxShadow: selected?.id === a.id ? `0 8px 25px ${a.color}55` : "0 4px 12px rgba(0,0,0,0.06)",
          }}>
            <div style={{ fontSize: 48, lineHeight: 1 }}>{a.emoji}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: selected?.id === a.id ? COLORS.white : COLORS.dark, marginTop: 8 }}>{a.name}</div>
          </button>
        ))}
      </div>
      {animating && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ textAlign: "center", animation: "bounceIn 0.5s ease" }}>
            <div style={{ fontSize: 96 }}>{selected?.emoji}</div>
            <p style={{ fontSize: 28, fontWeight: 700, color: COLORS.primary, marginTop: 16 }}>Olá, {selected?.name}!</p>
          </div>
        </div>
      )}
      <style>{`@keyframes bounceIn { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }`}</style>
    </div>
  );
}

// ============================================================
// TELA: Menu Principal
// ============================================================
function MenuScreen({ avatar, onSelect, onLogout, stars }) {
  const modules = [
    { id: "counting", icon: "🔢", title: "Contagem", desc: "Conte de 1 a 20!", color: COLORS.primary, bg: "#FFF0E6" },
    { id: "shapes", icon: "🔷", title: "Formas", desc: "Descubra as formas!", color: COLORS.secondary, bg: "#E8F0FE" },
    { id: "math", icon: "➕", title: "Somar e Subtrair", desc: "Vamos calcular!", color: COLORS.success, bg: "#E8F8EE" },
    { id: "dashboard", icon: "📊", title: "Painel do Professor", desc: "Ver progresso", color: COLORS.purple, bg: "#F0E8FF" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${COLORS.bg} 0%, #FFE8D6 100%)`, fontFamily: "'Fredoka', 'Nunito', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet" />
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", background: COLORS.white, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 36, background: avatar.color + "30", borderRadius: 16, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>{avatar.emoji}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.dark }}>Olá, {avatar.name}!</div>
            <div style={{ fontSize: 14, color: COLORS.gray }}>Vamos aprender? 🚀</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#FFF8E1", padding: "8px 16px", borderRadius: 20, fontWeight: 700, fontSize: 18, color: "#F9A825" }}>
            ⭐ {stars}
          </div>
          <button onClick={onLogout} style={{ background: "none", border: "2px solid #E8E8E8", borderRadius: 12, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 14, color: COLORS.gray }}>Sair</button>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", padding: "32px 20px 16px" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: COLORS.dark, margin: 0 }}>O que vamos estudar? 📚</h2>
      </div>

      {/* Module Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 540, margin: "0 auto", padding: "0 20px 40px" }}>
        {modules.map((m) => (
          <button key={m.id} onClick={() => onSelect(m.id)} style={{
            background: COLORS.white, border: `3px solid transparent`, borderRadius: 28, padding: 24,
            cursor: "pointer", textAlign: "center", transition: "all 0.25s ease",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.borderColor = m.color; e.currentTarget.style.boxShadow = `0 8px 28px ${m.color}25`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
          >
            <div style={{ fontSize: 52, marginBottom: 12, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>{m.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: m.color, marginBottom: 4 }}>{m.title}</div>
            <div style={{ fontSize: 13, color: COLORS.gray, fontWeight: 500 }}>{m.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// TELA: Módulo de Contagem
// ============================================================
function CountingModule({ onBack, onEarnStar }) {
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState(0);
  const [count, setCount] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const totalRounds = 3;

  useEffect(() => { newRound(); }, []);

  const newRound = () => {
    const t = Math.floor(Math.random() * 8) + 2;
    setTarget(t);
    setCount(0);
    setFeedback(null);
  };

  const handleTap = () => {
    if (feedback) return;
    const next = count + 1;
    setCount(next);
    if (next === target) {
      setFeedback("correct");
      setScore((s) => s + 1);
      onEarnStar();
      setTimeout(() => {
        if (step + 1 >= totalRounds) { setCompleted(true); }
        else { setStep((s) => s + 1); newRound(); }
      }, 1500);
    }
  };

  const handleCheck = () => {
    if (count === target) {
      setFeedback("correct");
      setScore((s) => s + 1);
      onEarnStar();
      setTimeout(() => {
        if (step + 1 >= totalRounds) setCompleted(true);
        else { setStep((s) => s + 1); newRound(); }
      }, 1500);
    } else {
      setFeedback("wrong");
      setTimeout(() => { setFeedback(null); setCount(0); }, 1200);
    }
  };

  if (completed) return <CompletionScreen score={score} total={totalRounds} onBack={onBack} title="Contagem" />;

  const fruits = Array.from({ length: target }, (_, i) => FRUIT_EMOJIS[i % FRUIT_EMOJIS.length]);

  return (
    <ModuleLayout title="🔢 Contagem" onBack={onBack} step={step + 1} total={totalRounds} color={COLORS.primary}>
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: COLORS.dark, margin: "0 0 8px" }}>Quantas frutinhas tem?</h2>
        <p style={{ fontSize: 16, color: COLORS.gray, margin: 0 }}>Toque em cada fruta para contar!</p>
      </div>

      {/* Fruits display */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, padding: "20px 0", minHeight: 120 }}>
        {fruits.map((f, i) => (
          <div key={i} onClick={handleTap} style={{
            fontSize: 44, cursor: "pointer", transition: "transform 0.2s",
            opacity: i < count ? 1 : 0.5,
            transform: i < count ? "scale(1.15)" : "scale(1)",
            filter: i < count ? "none" : "grayscale(0.4)",
          }}>{f}</div>
        ))}
      </div>

      {/* Counter */}
      <div style={{ textAlign: "center", margin: "16px 0" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: COLORS.white, padding: "12px 32px", borderRadius: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <span style={{ fontSize: 36, fontWeight: 700, color: count === target ? COLORS.success : COLORS.primary }}>{count}</span>
          <span style={{ fontSize: 20, color: COLORS.gray }}>/</span>
          <span style={{ fontSize: 24, fontWeight: 600, color: COLORS.gray }}>?</span>
        </div>
      </div>

      {/* Check button */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button onClick={handleCheck} style={{
          background: count > 0 ? COLORS.primary : "#DDD", color: COLORS.white, border: "none", borderRadius: 20,
          padding: "14px 48px", fontSize: 20, fontWeight: 700, cursor: count > 0 ? "pointer" : "default",
          boxShadow: count > 0 ? `0 4px 16px ${COLORS.primary}40` : "none",
        }}>Verificar ✓</button>
      </div>

      {/* Feedback overlay */}
      {feedback && <FeedbackOverlay type={feedback} />}
    </ModuleLayout>
  );
}

// ============================================================
// TELA: Módulo de Formas Geométricas
// ============================================================
function ShapesModule({ onBack, onEarnStar }) {
  const [step, setStep] = useState(0);
  const [targetShape, setTargetShape] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const totalRounds = 4;

  useEffect(() => { newRound(); }, []);

  const newRound = () => {
    const shuffled = [...SHAPES].sort(() => Math.random() - 0.5);
    setTargetShape(shuffled[0]);
    setOptions(shuffled);
    setFeedback(null);
  };

  const handleSelect = (shape) => {
    if (feedback) return;
    if (shape.name === targetShape.name) {
      setFeedback("correct");
      setScore((s) => s + 1);
      onEarnStar();
      setTimeout(() => {
        if (step + 1 >= totalRounds) setCompleted(true);
        else { setStep((s) => s + 1); newRound(); }
      }, 1500);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (completed) return <CompletionScreen score={score} total={totalRounds} onBack={onBack} title="Formas" />;

  return (
    <ModuleLayout title="🔷 Formas" onBack={onBack} step={step + 1} total={totalRounds} color={COLORS.secondary}>
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: COLORS.dark, margin: "0 0 12px" }}>Encontre o {targetShape?.name}!</h2>
        <p style={{ fontSize: 16, color: COLORS.gray }}>Toque na forma correta</p>
      </div>

      {/* Target shape display */}
      <div style={{ textAlign: "center", margin: "16px 0 32px" }}>
        <div style={{ display: "inline-flex", background: COLORS.white, padding: 32, borderRadius: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          {targetShape && <ShapeIcon type={targetShape.svg} size={96} color={targetShape.color} />}
        </div>
      </div>

      {/* Options grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 360, margin: "0 auto" }}>
        {options.map((s) => (
          <button key={s.name} onClick={() => handleSelect(s)} style={{
            background: COLORS.white, border: "3px solid #E8E8E8", borderRadius: 20, padding: 20,
            cursor: "pointer", textAlign: "center", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.transform = ""; }}
          >
            <ShapeIcon type={s.svg} size={56} color={s.color} />
            <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.dark, marginTop: 8 }}>{s.name}</div>
          </button>
        ))}
      </div>

      {feedback && <FeedbackOverlay type={feedback} />}
    </ModuleLayout>
  );
}

// ============================================================
// TELA: Módulo de Adição/Subtração
// ============================================================
function MathModule({ onBack, onEarnStar }) {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const totalRounds = 4;

  useEffect(() => { newProblem(); }, []);

  const newProblem = () => {
    const isAdd = Math.random() > 0.4;
    let a, b;
    if (isAdd) {
      a = Math.floor(Math.random() * 6) + 1;
      b = Math.floor(Math.random() * (10 - a)) + 1;
    } else {
      a = Math.floor(Math.random() * 7) + 3;
      b = Math.floor(Math.random() * (a - 1)) + 1;
    }
    const answer = isAdd ? a + b : a - b;
    const wrongAnswers = new Set();
    while (wrongAnswers.size < 2) {
      const w = answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      if (w >= 0 && w <= 15 && w !== answer) wrongAnswers.add(w);
    }
    const choices = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    setProblem({ a, b, op: isAdd ? "+" : "-", answer, choices });
    setSelected(null);
    setFeedback(null);
  };

  const handleChoice = (val) => {
    if (feedback) return;
    setSelected(val);
    if (val === problem.answer) {
      setFeedback("correct");
      setScore((s) => s + 1);
      onEarnStar();
      setTimeout(() => {
        if (step + 1 >= totalRounds) setCompleted(true);
        else { setStep((s) => s + 1); newProblem(); }
      }, 1500);
    } else {
      setFeedback("wrong");
      setTimeout(() => { setFeedback(null); setSelected(null); }, 1000);
    }
  };

  if (completed) return <CompletionScreen score={score} total={totalRounds} onBack={onBack} title="Somar e Subtrair" />;
  if (!problem) return null;

  return (
    <ModuleLayout title="➕ Somar e Subtrair" onBack={onBack} step={step + 1} total={totalRounds} color={COLORS.success}>
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: COLORS.dark, margin: "0 0 24px" }}>Quanto é?</h2>

        {/* Visual representation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", maxWidth: 140 }}>
            {Array.from({ length: problem.a }, (_, i) => <span key={i} style={{ fontSize: 32 }}>🍎</span>)}
          </div>
          <span style={{ fontSize: 40, fontWeight: 700, color: problem.op === "+" ? COLORS.success : COLORS.primary }}>{problem.op}</span>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", maxWidth: 140 }}>
            {Array.from({ length: problem.b }, (_, i) => <span key={i} style={{ fontSize: 32 }}>{problem.op === "+" ? "🍎" : "❌"}</span>)}
          </div>
        </div>

        {/* Equation */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: COLORS.white, padding: "16px 36px", borderRadius: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.06)", marginBottom: 32 }}>
          <span style={{ fontSize: 44, fontWeight: 700, color: COLORS.dark }}>{problem.a}</span>
          <span style={{ fontSize: 44, fontWeight: 700, color: problem.op === "+" ? COLORS.success : COLORS.primary }}>{problem.op}</span>
          <span style={{ fontSize: 44, fontWeight: 700, color: COLORS.dark }}>{problem.b}</span>
          <span style={{ fontSize: 44, fontWeight: 700, color: COLORS.gray }}>=</span>
          <span style={{ fontSize: 44, fontWeight: 700, color: COLORS.warning }}>?</span>
        </div>

        {/* Choices */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          {problem.choices.map((c) => (
            <button key={c} onClick={() => handleChoice(c)} style={{
              width: 80, height: 80, borderRadius: "50%", fontSize: 32, fontWeight: 700,
              border: selected === c ? `4px solid ${c === problem.answer ? COLORS.success : COLORS.primary}` : "4px solid #E8E8E8",
              background: selected === c ? (c === problem.answer ? COLORS.success + "20" : COLORS.primary + "20") : COLORS.white,
              color: COLORS.dark, cursor: "pointer", transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            onMouseEnter={(e) => { if (!selected) e.currentTarget.style.transform = "scale(1.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
            >{c}</button>
          ))}
        </div>
      </div>

      {feedback && <FeedbackOverlay type={feedback} />}
    </ModuleLayout>
  );
}

// ============================================================
// TELA: Painel do Professor
// ============================================================
function DashboardScreen({ onBack, stars }) {
  const students = [
    { name: "Leão", emoji: "🦁", progress: 85, stars: stars, status: "Avançado" },
    { name: "Coelho", emoji: "🐰", progress: 62, stars: 8, status: "Intermediário" },
    { name: "Sapo", emoji: "🐸", progress: 45, stars: 5, status: "Iniciante" },
    { name: "Raposa", emoji: "🦊", progress: 91, stars: 15, status: "Avançado" },
    { name: "Panda", emoji: "🐼", progress: 33, stars: 3, status: "Iniciante" },
    { name: "Pinguim", emoji: "🐧", progress: 70, stars: 10, status: "Intermediário" },
  ];

  const statusColor = (s) => s === "Avançado" ? COLORS.success : s === "Intermediário" ? COLORS.warning : COLORS.pink;

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0FF", fontFamily: "'Fredoka', 'Nunito', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet" />
      {/* Header */}
      <div style={{ background: COLORS.white, padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontWeight: 600, color: COLORS.purple, fontFamily: "inherit" }}>← Voltar</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: COLORS.dark, margin: 0 }}>📊 Painel do Professor</h1>
        <div style={{ width: 80 }} />
      </div>

      <div style={{ maxWidth: 700, margin: "24px auto", padding: "0 20px" }}>
        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Alunos Ativos", value: "6", icon: "👦", bg: "#E8F0FE" },
            { label: "Média de Progresso", value: "64%", icon: "📈", bg: "#E8F8EE" },
            { label: "Atividades Realizadas", value: "47", icon: "✅", bg: "#FFF8E1" },
          ].map((c) => (
            <div key={c.label} style={{ background: COLORS.white, borderRadius: 20, padding: 20, textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{c.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.dark }}>{c.value}</div>
              <div style={{ fontSize: 12, color: COLORS.gray, fontWeight: 500 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {/* Students List */}
        <h3 style={{ fontSize: 20, fontWeight: 700, color: COLORS.dark, marginBottom: 16 }}>Progresso Individual</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {students.map((s) => (
            <div key={s.name} style={{ background: COLORS.white, borderRadius: 20, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 36 }}>{s.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 16, color: COLORS.dark }}>{s.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: statusColor(s.status), background: statusColor(s.status) + "20", padding: "4px 12px", borderRadius: 12 }}>{s.status}</span>
                </div>
                <div style={{ background: "#F0F0F0", borderRadius: 10, height: 12, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 10, background: `linear-gradient(90deg, ${statusColor(s.status)}, ${statusColor(s.status)}CC)`, width: `${s.progress}%`, transition: "width 1s ease" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontSize: 12, color: COLORS.gray }}>{s.progress}% concluído</span>
                  <span style={{ fontSize: 12, color: "#F9A825" }}>⭐ {s.stars}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMPONENTES COMPARTILHADOS
// ============================================================
function ModuleLayout({ title, onBack, step, total, color, children }) {
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${COLORS.bg} 0%, #FFE8D6 100%)`, fontFamily: "'Fredoka', 'Nunito', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ background: COLORS.white, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontWeight: 600, color, fontFamily: "inherit" }}>← Voltar</button>
        <span style={{ fontWeight: 700, fontSize: 18, color: COLORS.dark }}>{title}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.gray, background: "#F5F5F5", padding: "6px 14px", borderRadius: 12 }}>{step}/{total}</span>
      </div>
      {/* Progress bar */}
      <div style={{ height: 6, background: "#EEE" }}>
        <div style={{ height: "100%", background: color, width: `${(step / total) * 100}%`, transition: "width 0.5s ease", borderRadius: "0 3px 3px 0" }} />
      </div>
      <div style={{ maxWidth: 540, margin: "0 auto", padding: "0 20px 40px" }}>{children}</div>
    </div>
  );
}

function FeedbackOverlay({ type }) {
  const isCorrect = type === "correct";
  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
      background: isCorrect ? "rgba(78, 203, 113, 0.15)" : "rgba(255, 107, 53, 0.12)", zIndex: 100,
      animation: "fadeIn 0.3s ease",
    }}>
      <div style={{
        background: COLORS.white, borderRadius: 32, padding: "40px 56px", textAlign: "center",
        boxShadow: `0 12px 40px ${isCorrect ? "rgba(78,203,113,0.25)" : "rgba(255,107,53,0.2)"}`,
        animation: "bounceIn 0.4s ease",
      }}>
        <div style={{ fontSize: 72 }}>{isCorrect ? "🎉" : "🤔"}</div>
        <p style={{ fontSize: 28, fontWeight: 700, color: isCorrect ? COLORS.success : COLORS.primary, margin: "12px 0 0" }}>
          {isCorrect ? "Muito bem!" : "Tente de novo!"}
        </p>
        {isCorrect && <p style={{ fontSize: 18, color: "#F9A825", margin: "8px 0 0" }}>⭐ +1 estrela!</p>}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bounceIn { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}

function CompletionScreen({ score, total, onBack, title }) {
  const pct = Math.round((score / total) * 100);
  const medal = pct === 100 ? "🏆" : pct >= 75 ? "🥇" : pct >= 50 ? "🥈" : "🥉";
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(135deg, ${COLORS.bg}, #FFE8D6, #FFDDD2)`,
      fontFamily: "'Fredoka', 'Nunito', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ background: COLORS.white, borderRadius: 32, padding: "48px 56px", textAlign: "center", maxWidth: 420, boxShadow: "0 12px 40px rgba(0,0,0,0.08)", animation: "bounceIn 0.5s ease" }}>
        <div style={{ fontSize: 80 }}>{medal}</div>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: COLORS.dark, margin: "16px 0 4px" }}>Parabéns!</h2>
        <p style={{ fontSize: 16, color: COLORS.gray, margin: "0 0 24px" }}>Você completou {title}!</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 28 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.success }}>{score}</div>
            <div style={{ fontSize: 13, color: COLORS.gray }}>Acertos</div>
          </div>
          <div style={{ width: 1, background: "#EEE" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.primary }}>{total}</div>
            <div style={{ fontSize: 13, color: COLORS.gray }}>Total</div>
          </div>
          <div style={{ width: 1, background: "#EEE" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#F9A825 " }}>⭐{score}</div>
            <div style={{ fontSize: 13, color: COLORS.gray }}>Estrelas</div>
          </div>
        </div>
        <button onClick={onBack} style={{
          background: COLORS.primary, color: COLORS.white, border: "none", borderRadius: 20,
          padding: "14px 48px", fontSize: 18, fontWeight: 700, cursor: "pointer",
          boxShadow: `0 4px 16px ${COLORS.primary}40`,
        }}>Voltar ao Menu 🏠</button>
      </div>
      <style>{`@keyframes bounceIn { 0% { transform: scale(0.5); opacity:0; } 60% { transform: scale(1.05); } 100% { transform: scale(1); opacity:1; } }`}</style>
    </div>
  );
}

// ============================================================
// APP PRINCIPAL
// ============================================================
export default function MathKidsApp() {
  const [screen, setScreen] = useState("login");
  const [avatar, setAvatar] = useState(null);
  const [stars, setStars] = useState(0);

  const handleLogin = (a) => { setAvatar(a); setScreen("menu"); };
  const handleLogout = () => { setScreen("login"); setAvatar(null); setStars(0); };
  const earnStar = () => setStars((s) => s + 1);

  switch (screen) {
    case "login": return <LoginScreen onLogin={handleLogin} />;
    case "menu": return <MenuScreen avatar={avatar} stars={stars} onSelect={(id) => setScreen(id)} onLogout={handleLogout} />;
    case "counting": return <CountingModule onBack={() => setScreen("menu")} onEarnStar={earnStar} />;
    case "shapes": return <ShapesModule onBack={() => setScreen("menu")} onEarnStar={earnStar} />;
    case "math": return <MathModule onBack={() => setScreen("menu")} onEarnStar={earnStar} />;
    case "dashboard": return <DashboardScreen onBack={() => setScreen("menu")} stars={stars} />;
    default: return <LoginScreen onLogin={handleLogin} />;
  }
}
