import React, { useEffect, useRef, useState, useCallback } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "SYS_KERNEL",
    subtitle: "Cinematic interaction-focused interface system with futuristic layered transitions.",
    description: "A full-stack OS-inspired interface built with Next.js and GSAP. Features real-time WebSocket state sync, GPU-accelerated animations, and a custom command-palette engine. Deployed on Vercel Edge.",
    tags: ["NEXT.JS", "GSAP", "WEBSOCKET", "TAILWIND", "VERCEL"],
    accent: "#39ff14",
    bg: "linear-gradient(135deg, #0f1117 0%, #1a1d2e 100%)",
    year: "2024",
    role: "Full-Stack Dev",
    code: `const kernel = init();\nkernel.boot({ mode: 'silent' });\nawait kernel.mount('/sys');`,
  },
  {
    id: "02",
    title: "KRYPT_OS",
    subtitle: "Encrypted OS-level dashboard with real-time data streams and neural UI layers.",
    description: "End-to-end encrypted dashboard for sensitive data teams. Built with React, Node.js, and AES-256 vault layers. Integrates live data streaming via SSE and custom auth middleware.",
    tags: ["REACT", "NODE.JS", "POSTGRESQL", "AES-256", "SSE"],
    accent: "#00ffcc",
    bg: "linear-gradient(135deg, #0d1a0f 0%, #111e12 100%)",
    year: "2024",
    role: "Security + UI Eng",
    code: `import { encrypt } from 'krypt';\nconst vault = new Vault(key);\nawait vault.seal(payload);`,
  },
  {
    id: "03",
    title: "DATA_SPHERE",
    subtitle: "Gen AI-powered analytics sphere with multi-model orchestration and live insights.",
    description: "LangChain multi-agent pipeline ingesting live data streams, summarising with GPT-4o, and surfacing anomalies. React frontend with D3 force-graph visualisation and Pinecone vector store.",
    tags: ["LANGCHAIN", "GPT-4O", "PINECONE", "D3.JS", "PYTHON"],
    accent: "#a78bfa",
    bg: "linear-gradient(135deg, #111118 0%, #1c1a2e 100%)",
    year: "2025",
    role: "Gen AI + Frontend",
    code: `const sphere = DataSphere.init();\nsphere.ingest(stream, { live: true });\nconsole.log(sphere.nodes);`,
  },
  {
    id: "04",
    title: "NEURAL_NET",
    subtitle: "Self-learning recommendation engine powered by transformer architecture and RAG.",
    description: "RAG-based recommendation engine fine-tuned on domain data. Python FastAPI backend, React UI with streaming responses. Embeddings via OpenAI, retrieval via Weaviate, deployed on AWS Lambda.",
    tags: ["PYTHON", "FASTAPI", "OPENAI", "WEAVIATE", "AWS"],
    accent: "#f97316",
    bg: "linear-gradient(135deg, #170f0f 0%, #221414 100%)",
    year: "2025",
    role: "AI/ML Engineer",
    code: `const model = await load('gpt-nano');\nconst ctx = buildContext(docs);\nreturn model.complete(ctx);`,
  },
  {
    id: "05",
    title: "ARCH_LENS",
    subtitle: "AI-powered code review assistant with semantic diff and architectural suggestions.",
    description: "GitHub App that runs on every PR — parses diffs, runs semantic analysis via Claude API, posts structured inline review comments. Built with Node.js, Octokit, and a React settings dashboard.",
    tags: ["CLAUDE API", "NEXT.JS", "OCTOKIT", "NODE.JS", "TYPESCRIPT"],
    accent: "#38bdf8",
    bg: "linear-gradient(135deg, #0f1318 0%, #141c28 100%)",
    year: "2025",
    role: "Dev Tools + AI",
    code: `const diff = await lens.analyze(pr);\nconst review = lens.suggest(diff);\nawait gh.comment(review);`,
  },
];

const CARD_W = 680;
const CARD_H = 420;
const RADIUS = 900;

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function Projects() {
  const [active, setActive] = useState(2);
  const [modal, setModal] = useState(null);

  const animRef = useRef(null);
  const [animOffset, setAnimOffset] = useState(2);
  const targetOffset = useRef(2);
  const currentOffset = useRef(2);
  const scrollLocked = useRef(false);

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, 0.1);

  /* Lerp loop */
  useEffect(() => {
    const loop = () => {
      const diff = targetOffset.current - currentOffset.current;
      currentOffset.current += diff * 0.075;
      setAnimOffset(currentOffset.current);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, idx));
    setActive(clamped);
    targetOffset.current = clamped;
  }, []);

  /* Scroll handler */
  useEffect(() => {
    const handleWheel = (e) => {
      if (modal) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inSection = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!inSection) return;

      e.preventDefault();

      if (scrollLocked.current) return;

      scrollLocked.current = true;
      setTimeout(() => { scrollLocked.current = false; }, 700);

      if (e.deltaY > 0) {
        setActive((prev) => {
          const next = Math.min(PROJECTS.length - 1, prev + 1);
          targetOffset.current = next;
          return next;
        });
      } else {
        setActive((prev) => {
          const next = Math.max(0, prev - 1);
          targetOffset.current = next;
          return next;
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [modal]);

  /* Keyboard */
  useEffect(() => {
    const h = (e) => {
      if (modal) { if (e.key === "Escape") setModal(null); return; }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(active + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(active - 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, modal, goTo]);

  const proj = PROJECTS[active];

  return (
    <div
      ref={sectionRef}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: "#080a0c",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        .works-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(57,255,20,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57,255,20,0.018) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        @keyframes scan {
          0%   { top: -3px; opacity: 0.7; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes dp {
          0%,100% { opacity:1; } 50% { opacity:0.3; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes modalIn {
          from { opacity:0; transform: scale(0.94) translateY(20px); }
          to   { opacity:1; transform: scale(1) translateY(0); }
        }
        .header-anim { opacity:0; animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards; }
        .controls-anim { opacity:0; animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s forwards; }
        .carousel-anim { opacity:0; animation: fadeIn 0.9s ease 0.35s forwards; }
        .nav-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%; width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.55);
          font-size: 18px; transition: all 0.2s;
          font-family: 'JetBrains Mono', monospace;
        }
        .nav-btn:hover:not(:disabled) {
          background: rgba(57,255,20,0.08);
          border-color: rgba(57,255,20,0.45);
          color: #39ff14; transform: scale(1.05);
        }
        .nav-btn:disabled { opacity: 0.18; cursor: default; }
        .pip {
          height: 6px; border-radius: 3px;
          background: rgba(255,255,255,0.18);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
          width: 6px;
        }
        .pip.active { width: 24px; }
        .view-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 6px; padding: 11px 24px;
          color: rgba(255,255,255,0.8);
          font-size: 11px; letter-spacing: 0.16em;
          text-transform: uppercase; cursor: pointer;
          font-family: 'JetBrains Mono', monospace;
          transition: all 0.2s; white-space: nowrap;
        }
        .view-btn:hover {
          border-color: rgba(57,255,20,0.55);
          color: #39ff14; background: rgba(57,255,20,0.08);
        }
        .tag {
          display: inline-block; padding: 3px 10px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 3px; font-size: 9px; letter-spacing: 0.14em;
          color: rgba(200,210,195,0.55); text-transform: uppercase;
          transition: border-color 0.2s, color 0.2s;
        }
        .tag:hover { border-color: rgba(57,255,20,0.4); color: rgba(57,255,20,0.8); }
        .modal-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.82);
          display: flex; align-items: center; justify-content: center;
          padding: 24px; animation: fadeIn 0.2s ease forwards;
        }
        .modal-box {
          position: relative; max-width: 640px; width: 100%;
          border-radius: 20px; overflow: hidden;
          animation: modalIn 0.35s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .modal-close {
          position: absolute; top: 16px; right: 16px; z-index: 10;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          cursor: pointer; color: rgba(255,255,255,0.6);
          font-size: 16px; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; font-family: monospace;
        }
        .modal-close:hover { background: rgba(255,0,0,0.1); border-color: rgba(255,80,80,0.4); color: #ff5555; }
        .modal-tag {
          display: inline-block; padding: 4px 12px; border-radius: 4px;
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>

      <div className="works-grid" />

      {/* Header */}
      <div className={inView ? "header-anim" : ""} style={{
        position: "relative", zIndex: 10,
        padding: "36px 52px 0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: 10, color: "rgba(57,255,20,0.5)", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 8 }}>
            ● selected_works
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 700, color: "#e8ebe6", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>
            PROJECTS
          </h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "rgba(57,255,20,0.45)", letterSpacing: "0.2em", marginBottom: 4 }}>
            {String(active + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em" }}>
            {proj.year} · {proj.role}
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className={inView ? "carousel-anim" : ""} style={{
        position: "relative", zIndex: 5,
        height: "calc(100vh - 200px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        perspective: "1400px",
        perspectiveOrigin: "50% 42%",
      }}>
        {PROJECTS.map((p, i) => {
          const offset = i - animOffset;
          const angle = offset * 18;
          const rad = (angle * Math.PI) / 180;
          const x = Math.sin(rad) * RADIUS;
          const z = Math.cos(rad) * RADIUS - RADIUS;
          const rotY = -angle;
          const absOffset = Math.abs(offset);
          const opacity = Math.max(0, 1 - absOffset * 0.38);
          const scale = Math.max(0.5, 1 - absOffset * 0.13);
          const isActive = i === active;

          return (
            <div
              key={p.id}
              onClick={() => goTo(i)}
              style={{
                position: "absolute",
                width: CARD_W, height: CARD_H,
                borderRadius: 20, overflow: "hidden",
                background: p.bg,
                border: isActive ? `1px solid ${p.accent}50` : "1px solid rgba(255,255,255,0.07)",
                boxShadow: isActive
                  ? `0 0 0 1px ${p.accent}20, 0 36px 90px rgba(0,0,0,0.92), 0 0 70px ${p.accent}20`
                  : "0 10px 50px rgba(0,0,0,0.75)",
                transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity,
                transition: "box-shadow 0.4s ease, border-color 0.4s ease",
                cursor: isActive ? "default" : "pointer",
                zIndex: isActive ? 10 : Math.max(1, 6 - Math.floor(absOffset)),
              }}
            >
              {isActive && (
                <div style={{
                  position: "absolute", left: 0, right: 0, height: 2, zIndex: 20,
                  background: `linear-gradient(to right, transparent, ${p.accent}50, transparent)`,
                  animation: "scan 3.2s linear infinite",
                }} />
              )}

              <pre style={{
                position: "absolute", inset: 0, margin: 0, zIndex: 0,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, lineHeight: 1.75,
                color: "rgba(255,255,255,0.065)",
                padding: "18px 22px", overflow: "hidden",
                pointerEvents: "none", letterSpacing: "0.02em",
              }}>
                {Array.from({ length: 20 }, (_, row) =>
                  `${String(row + 1).padStart(2, " ")}  ${p.code.split("\n")[row % 3] || ""}`
                ).join("\n")}
              </pre>

              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.82) 100%)",
              }} />

              <div style={{
                position: "absolute", top: -40, right: -40, zIndex: 1,
                width: 160, height: 160, borderRadius: "50%",
                background: `radial-gradient(circle, ${p.accent}18 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              <div style={{ position: "absolute", top: 20, left: 22, right: 20, zIndex: 5,
                display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: p.accent, letterSpacing: "0.05em" }}>
                  {p.id}
                </span>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", background: p.accent,
                  boxShadow: `0 0 10px ${p.accent}`,
                  animation: "dp 2s ease-in-out infinite",
                }} />
              </div>

              {isActive && (
                <div style={{ position: "absolute", top: 56, left: 22, right: 22, zIndex: 5,
                  display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              )}

              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5,
                padding: "0 26px 26px",
                display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16,
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700,
                    color: "#f2f2ef", margin: "0 0 8px", letterSpacing: "-0.01em",
                    textShadow: "0 2px 24px rgba(0,0,0,0.9)",
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontSize: 11, color: "rgba(195,202,188,0.65)",
                    margin: 0, lineHeight: 1.65, letterSpacing: "0.02em", maxWidth: 360,
                  }}>
                    {p.subtitle}
                  </p>
                </div>
                {isActive && (
                  <button className="view-btn" onClick={(e) => { e.stopPropagation(); setModal(p); }}>
                    VIEW_PROJECT
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom controls */}
      <div className={inView ? "controls-anim" : ""} style={{
        position: "relative", zIndex: 10,
        padding: "0 52px 36px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="nav-btn" onClick={() => goTo(active - 1)} disabled={active === 0}>←</button>
          <button className="nav-btn" onClick={() => goTo(active + 1)} disabled={active === PROJECTS.length - 1}>→</button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={`pip ${i === active ? "active" : ""}`}
              onClick={() => goTo(i)}
              style={i === active ? { background: proj.accent, boxShadow: `0 0 8px ${proj.accent}` } : {}}
            />
          ))}
        </div>

        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: "0.18em" }}>
          SCROLL · ARROW KEYS
        </span>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}
            style={{ background: modal.bg, border: `1px solid ${modal.accent}40` }}>

            <pre style={{
              position: "absolute", inset: 0, margin: 0,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, lineHeight: 1.75,
              color: "rgba(255,255,255,0.055)",
              padding: "16px 20px", overflow: "hidden",
              pointerEvents: "none", borderRadius: 20,
            }}>
              {Array.from({ length: 22 }, (_, row) =>
                `${String(row + 1).padStart(2, " ")}  ${modal.code.split("\n")[row % 3] || ""}`
              ).join("\n")}
            </pre>

            <div style={{ position: "absolute", inset: 0, borderRadius: 20,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.75) 100%)" }} />

            <button className="modal-close" onClick={() => setModal(null)}>✕</button>

            <div style={{ position: "relative", zIndex: 5, padding: "36px 36px 32px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: modal.accent, letterSpacing: "0.2em", marginBottom: 8, textTransform: "uppercase" }}>
                    ● {modal.id} / {modal.year}
                  </div>
                  <h2 style={{ fontSize: 30, fontWeight: 700, color: "#f0f0ed", margin: 0, letterSpacing: "-0.01em" }}>{modal.title}</h2>
                  <div style={{ fontSize: 11, color: "rgba(200,210,195,0.5)", marginTop: 6, letterSpacing: "0.1em" }}>{modal.role}</div>
                </div>
                <div style={{ width: 12, height: 12, borderRadius: "50%", marginTop: 4,
                  background: modal.accent, boxShadow: `0 0 14px ${modal.accent}`, flexShrink: 0 }} />
              </div>

              <p style={{ fontSize: 13, color: "rgba(195,205,188,0.75)", lineHeight: 1.75, margin: "0 0 24px", letterSpacing: "0.01em" }}>
                {modal.description}
              </p>

              <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 20 }} />

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 10, color: modal.accent, letterSpacing: "0.24em", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
                  Tech Stack
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {modal.tags.map((t) => (
                    <span key={t} className="modal-tag"
                      style={{ background: `${modal.accent}15`, border: `1px solid ${modal.accent}35`, color: modal.accent }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button className="view-btn" style={{ flex: 1, padding: "12px 0", textAlign: "center", borderColor: `${modal.accent}50`, color: modal.accent }}>
                  VIEW LIVE ↗
                </button>
                <button className="view-btn" style={{ flex: 1, padding: "12px 0", textAlign: "center" }}>
                  SOURCE CODE ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}