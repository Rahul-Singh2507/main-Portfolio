import React, { useEffect, useState, useRef } from "react";

const TYPING_TEXT =
  "I build intelligent full-stack experiences powered by Gen AI — structured, fast and visually precise.";

const FOCUS_ITEMS = ["FULL-STACK", "GEN AI", "LLM APPS", "PERFORMANCE"];
const TOOLS_ITEMS = [
  "REACT", "NODE.JS", "PYTHON", "LANGCHAIN",
  "OPENAI API", "NEXT.JS", "TAILWIND", "POSTGRESQL",
];

function useInView(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const About = () => {
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [typingStarted, setTypingStarted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const cardRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, 0.15);

  // Track scroll for parallax
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Start typing when in view
useEffect(() => {
  if (inView && !typingStarted) {

    requestAnimationFrame(() => {
      setTypingStarted(true)
    })

  }
}, [inView, typingStarted])

  useEffect(() => {
    if (!typingStarted) return;
    if (charIndex < TYPING_TEXT.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + TYPING_TEXT[charIndex]);
        setCharIndex((p) => p + 1);
      }, 38);
      return () => clearTimeout(t);
    }
  }, [charIndex, typingStarted]);

  useEffect(() => {
    const i = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(i);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Parallax offset for background elements based on scroll
  const parallaxSlow = scrollY * 0.08;
  const parallaxFast = scrollY * 0.18;

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: "#0a0a0a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap');

        html { scroll-behavior: smooth; }

        /* ── Floating particles ── */
        @keyframes floatA {
          0%,100% { transform: translateY(0px) translateX(0px); opacity: 0.18; }
          33%      { transform: translateY(-32px) translateX(14px); opacity: 0.28; }
          66%      { transform: translateY(16px) translateX(-10px); opacity: 0.12; }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px); opacity: 0.15; }
          50%      { transform: translateY(26px) translateX(-20px); opacity: 0.25; }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0px); opacity: 0.10; }
          40%      { transform: translateY(-22px) translateX(12px); opacity: 0.22; }
        }
        .p-a { animation: floatA 7s ease-in-out infinite; }
        .p-b { animation: floatB 9s ease-in-out infinite; }
        .p-c { animation: floatC 5.5s ease-in-out infinite; }

        /* ── Scan line ── */
        @keyframes scanLine {
          0%   { top: -4px; opacity: 0.6; }
          100% { top: 105%; opacity: 0; }
        }
        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(57,255,20,0.3), transparent);
          pointer-events: none;
          z-index: 20;
          animation: scanLine 3.5s linear infinite;
        }

        /* ── Grid bg ── */
        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(57,255,20,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57,255,20,0.025) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Pulse dots ── */
        @keyframes dotPulse {
          0%,100% { opacity:1; box-shadow: 0 0 10px #39ff14, 0 0 24px rgba(57,255,20,0.6); }
          50%      { opacity:0.35; box-shadow: 0 0 4px #39ff14; }
        }
        .sidebar-dot-pulse { animation: dotPulse 2s ease-in-out infinite; }
        .system-dot-pulse  { animation: dotPulse 1.6s ease-in-out infinite; }

        /* ── Card glows ── */
        .card-outer::before {
          content: '';
          position: absolute;
          top: -1px; left: -1px;
          width: 280px; height: 280px;
          background: radial-gradient(ellipse at top left, rgba(255,255,255,0.18) 0%, transparent 55%);
          border-radius: 26px 0 0 0;
          pointer-events: none;
          z-index: 0;
        }
        .card-outer::after {
          content: '';
          position: absolute;
          bottom: -1px; right: -1px;
          width: 200px; height: 200px;
          background: radial-gradient(ellipse at bottom right, rgba(255,255,255,0.09) 0%, transparent 55%);
          border-radius: 0 0 26px 0;
          pointer-events: none;
          z-index: 0;
        }

        .ring-halo {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 2.5px solid rgba(255,255,255,0.88);
          box-shadow:
            0 0 22px rgba(255,255,255,0.55),
            0 0 60px rgba(255,255,255,0.18),
            inset 0 0 22px rgba(255,255,255,0.07);
          top: 50%; left: 50%;
          transform: translate(-50%, -54%);
        }

        /* ── Tag chips ── */
        .tag-chip {
          display: inline-block;
          padding: 5px 13px;
          border: 1px solid rgba(57,255,20,0.22);
          border-radius: 4px;
          font-size: 10px;
          letter-spacing: 0.16em;
          color: rgba(200,220,200,0.68);
          background: rgba(57,255,20,0.04);
          text-transform: uppercase;
          transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s;
          cursor: default;
        }
        .tag-chip:hover {
          border-color: rgba(57,255,20,0.75);
          color: #39ff14;
          background: rgba(57,255,20,0.10);
          transform: translateY(-2px);
        }

        /* ── Corner brackets ── */
        .bracket-tl, .bracket-tr, .bracket-bl, .bracket-br {
          position: absolute;
          width: 20px; height: 20px;
          border-color: rgba(57,255,20,0.45);
          border-style: solid;
          z-index: 30;
          pointer-events: none;
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }
        .card-outer:hover .bracket-tl,
        .card-outer:hover .bracket-tr,
        .card-outer:hover .bracket-bl,
        .card-outer:hover .bracket-br {
          width: 28px; height: 28px;
          border-color: rgba(57,255,20,0.85);
        }
        .bracket-tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
        .bracket-tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
        .bracket-bl { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
        .bracket-br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

        /* ── Scroll-triggered entry animations ── */
        .reveal-left {
          opacity: 0;
          transform: translateX(-70px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .reveal-up {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-right {
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .reveal-chip {
          opacity: 0;
          transform: translateY(14px) scale(0.9);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal-chip.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* ── Hero section ── */
        .hero-text {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .hero-text.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Scroll indicator bounce ── */
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(8px); }
        }
        .bounce { animation: bounce 1.6s ease-in-out infinite; }

        /* ── Glowing orb drift ── */
        @keyframes orbDrift {
          0%,100% { transform: translate(0,0); }
          33%      { transform: translate(30px,-20px); }
          66%      { transform: translate(-20px,30px); }
        }
        .orb { animation: orbDrift 12s ease-in-out infinite; }
        .orb2 { animation: orbDrift 15s ease-in-out infinite reverse; }
      `}</style>

      {/* Fixed grid */}
      <div className="grid-bg" />

      {/* ─────────────── HERO SECTION (forces scroll) ─────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Drifting orbs */}
        <div className="orb" style={{
          position:"absolute", top:"20%", right:"15%",
          width:300, height:300, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(57,255,20,0.07) 0%, transparent 70%)",
          pointerEvents:"none",
        }} />
        <div className="orb2" style={{
          position:"absolute", bottom:"15%", left:"10%",
          width:240, height:240, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(57,255,20,0.05) 0%, transparent 70%)",
          pointerEvents:"none",
        }} />

        {/* Floating particles */}
        {[
          { cls:"p-a", top:"12%", left:"7%", size:4, delay:"0s" },
          { cls:"p-b", top:"25%", left:"90%", size:3, delay:"1.2s" },
          { cls:"p-c", top:"65%", left:"4%",  size:5, delay:"2.1s" },
          { cls:"p-a", top:"78%", left:"88%", size:3, delay:"0.6s" },
          { cls:"p-b", top:"45%", left:"48%", size:4, delay:"3s" },
          { cls:"p-c", top:"8%",  left:"55%", size:2, delay:"1.8s" },
        ].map((p, i) => (
          <div key={i} className={p.cls} style={{
            position:"absolute", top:p.top, left:p.left,
            width:p.size, height:p.size, borderRadius:"50%",
            background:"#39ff14", pointerEvents:"none",
            animationDelay:p.delay,
          }} />
        ))}

        <HeroContent />

        {/* Scroll down indicator */}
        <div style={{ position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:10, color:"rgba(57,255,20,0.5)", letterSpacing:"0.2em", textTransform:"uppercase" }}>
            scroll
          </span>
          <div className="bounce" style={{ width:1, height:32,
            background:"linear-gradient(to bottom, rgba(57,255,20,0.5), transparent)" }} />
        </div>
      </section>

      {/* ─────────────── ABOUT SECTION ─────────────── */}
      <section
        ref={sectionRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
          padding: "80px 24px",
          overflow: "hidden",
        }}
      >
        {/* Parallax orbs */}
        <div style={{
          position:"absolute", top:`${60 - parallaxSlow}px`, right:"8%",
          width:350, height:350, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(57,255,20,0.06) 0%, transparent 70%)",
          pointerEvents:"none", transition:"top 0.1s linear",
        }} />
        <div style={{
          position:"absolute", bottom:`${40 + parallaxFast}px`, left:"5%",
          width:260, height:260, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(57,255,20,0.04) 0%, transparent 70%)",
          pointerEvents:"none",
        }} />

        <div className="w-full" style={{ maxWidth: 1100, overflow:"visible" }}>

          {/* Section label */}
          <div className={`reveal-left ${inView ? "visible" : ""}`}
            style={{ marginBottom:32, transitionDelay:"0s" }}>
            <span style={{ fontSize:11, color:"rgba(57,255,20,0.6)", letterSpacing:"0.3em",
              textTransform:"uppercase" }}>
              — about me
            </span>
          </div>

          {/* ── Card ── */}
          <div
            ref={cardRef}
            className={`card-outer relative flex overflow-hidden`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setMousePos({ x:0, y:0 }); }}
            style={{
              background: "linear-gradient(140deg, rgba(28,31,36,0.98) 0%, rgba(14,16,19,0.99) 100%)",
              border: "1px solid rgba(255,255,255,0.11)",
              borderRadius: 26,
              minHeight: 440,
              boxShadow: isHovered
                ? "0 0 0 1px rgba(57,255,20,0.18), 0 40px 120px rgba(0,0,0,0.95), 0 0 80px rgba(57,255,20,0.10), inset 0 1px 0 rgba(255,255,255,0.12)"
                : "0 0 0 1px rgba(255,255,255,0.05), 0 24px 90px rgba(0,0,0,0.88), inset 0 1px 0 rgba(255,255,255,0.09)",
              transform: isHovered
                ? `perspective(1200px) rotateY(${mousePos.x * 2.5}deg) rotateX(${-mousePos.y * 1.5}deg) scale(1.1)`
                : "scale(1)",
              transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
              // Scroll-reveal the whole card
              opacity: inView ? 1 : 0,
              transitionProperty: "transform, box-shadow, opacity",
            }}
          >
            <div className="scan-line" />
            <div className="bracket-tl" />
            <div className="bracket-tr" />
            <div className="bracket-bl" />
            <div className="bracket-br" />

            {/* ── Left Sidebar ── */}
            <div
              className={`reveal-left ${inView ? "visible" : ""}`}
              style={{
                position:"relative", zIndex:10,
                display:"flex", flexDirection:"column", alignItems:"center",
                justifyContent:"space-between",
                width:72, flexShrink:0,
                borderRight:"1px solid rgba(255,255,255,0.07)",
                padding:"36px 0",
                transitionDelay:"0.1s",
              }}
            >
              <span style={{ fontSize:15, color:"#39ff14", fontWeight:600,
                letterSpacing:"0.04em", paddingLeft:20 }}>01</span>
              <div style={{ flex:1, width:1, margin:"16px auto",
                background:"linear-gradient(to bottom, rgba(255,255,255,0.13), rgba(255,255,255,0.02))" }} />
              <div className="sidebar-dot-pulse" style={{ width:9, height:9, borderRadius:"50%",
                background:"#39ff14", boxShadow:"0 0 8px #39ff14, 0 0 20px rgba(57,255,20,0.5)", marginLeft:20 }} />
            </div>

            {/* ── Photo Frame ── */}
            <div
              className={`reveal-up ${inView ? "visible" : ""}`}
              style={{
                position:"relative", zIndex:10, flexShrink:0,
                display:"flex", alignItems:"center",
                padding:"36px 0 36px 36px", marginRight:48,
                transitionDelay:"0.2s",
              }}
            >
              <div style={{
                width:280, height:360, borderRadius:20, position:"relative",
                display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
                background:"linear-gradient(160deg, rgba(45,50,60,0.65) 0%, rgba(16,18,22,0.92) 100%)",
                border:"1px solid rgba(255,255,255,0.10)",
                boxShadow:"inset 0 0 50px rgba(0,0,0,0.65)",
              }}>
                <div className="ring-halo" />
                <svg style={{ position:"absolute", bottom:0, left:"50%",
                  transform:"translateX(-50%)", width:210, height:320 }}
                  viewBox="0 0 200 310" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="M24 310 C24 230 10 205 22 185 C36 160 52 155 62 148
                    C52 138 44 122 42 106 C38 78 46 54 64 40
                    C75 31 87 26 100 26 C113 26 125 31 136 40
                    C154 54 162 78 158 106 C156 122 148 138 138 148
                    C148 155 164 160 178 185 C190 205 176 230 176 310 Z"
                    fill="rgba(8,10,13,0.98)" />
                  <ellipse cx="100" cy="76" rx="40" ry="48" fill="rgba(8,10,13,0.98)" />
                  <path d="M62 70 C60 44 72 22 100 20 C128 22 140 44 138 70
                    C134 52 122 42 100 42 C78 42 66 52 62 70 Z"
                    fill="rgba(8,10,13,0.98)" />
                </svg>
              </div>
            </div>

            {/* ── Info Panel ── */}
            <div
              className={`reveal-right ${inView ? "visible" : ""}`}
              style={{
                position:"relative", zIndex:10, flex:1,
                display:"flex", flexDirection:"column", justifyContent:"center",
                padding:"44px 48px 44px 0",
                transitionDelay:"0.3s",
              }}
            >
              {/* SYSTEM_INFO */}
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
                <div className="system-dot-pulse" style={{ width:7, height:7, borderRadius:"50%",
                  background:"#39ff14", boxShadow:"0 0 6px #39ff14", flexShrink:0 }} />
                <span style={{ fontSize:11, color:"#39ff14", letterSpacing:"0.20em",
                  textTransform:"uppercase", fontWeight:500 }}>System_Info</span>
              </div>

              {/* Typing */}
              <p style={{ fontSize:32, fontWeight:400, color:"#e4e8e2", lineHeight:1.44,
                letterSpacing:"-0.01em", marginBottom:34, minHeight:"9.5rem" }}>
                {displayed}
                <span style={{
                  display:"inline-block", width:2, height:"0.92em", background:"#39ff14",
                  marginLeft:3, verticalAlign:"middle", position:"relative", top:-2,
                  opacity: showCursor ? 1 : 0, transition:"opacity 0.05s",
                }} />
              </p>

              <div style={{ width:"100%", height:1, background:"rgba(255,255,255,0.07)", marginBottom:22 }} />

              {/* FOCUS */}
              <p style={{ fontSize:10, color:"#39ff14", letterSpacing:"0.24em",
                textTransform:"uppercase", fontWeight:600, marginBottom:12 }}>Focus</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:26 }}>
                {FOCUS_ITEMS.map((item, i) => (
                  <span key={i} className={`tag-chip reveal-chip ${inView ? "visible" : ""}`}
                    style={{ transitionDelay:`${0.45 + i * 0.08}s` }}>{item}</span>
                ))}
              </div>

              <div style={{ width:"100%", height:1, background:"rgba(255,255,255,0.07)", marginBottom:22 }} />

              {/* TOOLS */}
              <p style={{ fontSize:10, color:"#39ff14", letterSpacing:"0.24em",
                textTransform:"uppercase", fontWeight:600, marginBottom:12 }}>Tools</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {TOOLS_ITEMS.map((tool, i) => (
                  <span key={i} className={`tag-chip reveal-chip ${inView ? "visible" : ""}`}
                    style={{ transitionDelay:`${0.6 + i * 0.07}s` }}>{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── SPACER SECTION (extra scroll room) ─────────────── */}
      <section style={{ minHeight:"20vh", display:"flex", alignItems:"center",
        justifyContent:"center", position:"relative", zIndex:1 }}>
        <p style={{ fontSize:11, color:"rgba(57,255,20,0.2)", letterSpacing:"0.3em",
          textTransform:"uppercase" }}>// end of section</p>
      </section>
    </div>
  );
};

/* ── Hero content sub-component ── */
const HeroContent = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={ref} style={{ textAlign:"center", position:"relative", zIndex:1, padding:"0 24px" }}>
      <style>{`
        @keyframes glitchX {
          0%,100% { clip-path: inset(0 0 100% 0); transform: translateX(0); }
          20% { clip-path: inset(10% 0 60% 0); transform: translateX(-4px); }
          40% { clip-path: inset(50% 0 20% 0); transform: translateX(4px); }
          60% { clip-path: inset(20% 0 50% 0); transform: translateX(-2px); }
          80% { clip-path: inset(60% 0 10% 0); transform: translateX(2px); }
        }
        .glitch-wrap { position:relative; display:inline-block; }
        .glitch-wrap::before, .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          color: #39ff14;
          opacity: 0;
        }
        .glitch-wrap:hover::before {
          opacity: 0.6;
          animation: glitchX 0.4s steps(2) infinite;
          color: rgba(57,255,20,0.8);
        }
        .glitch-wrap:hover::after {
          opacity: 0.4;
          animation: glitchX 0.4s steps(2) 0.1s infinite;
          color: rgba(255,57,57,0.5);
        }
      `}</style>

      <div style={{
        fontSize:11, color:"rgba(57,255,20,0.55)", letterSpacing:"0.3em",
        textTransform:"uppercase", marginBottom:28,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition:"opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
        fontFamily:"'JetBrains Mono',monospace",
      }}>
        ● architect_sys / portfolio
      </div>

      <h1
        className="glitch-wrap"
        data-text="FULLSTACK"
        style={{
          display:"block", fontSize:"clamp(52px,10vw,110px)", fontWeight:600,
          color:"#e8ebe6", letterSpacing:"-0.03em", lineHeight:1, marginBottom:8,
          fontFamily:"'JetBrains Mono',monospace", cursor:"default",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
          transition:"opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
        }}>
        FULLSTACK
      </h1>
      <h1
        className="glitch-wrap"
        data-text="GEN AI DEV"
        style={{
          display:"block", fontSize:"clamp(52px,10vw,110px)", fontWeight:600,
          color:"#39ff14", letterSpacing:"-0.03em", lineHeight:1, marginBottom:40,
          fontFamily:"'JetBrains Mono',monospace", cursor:"default",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
          transition:"opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s",
        }}>
        GEN AI DEV
      </h1>

      <p style={{
        fontSize:13, color:"rgba(200,210,195,0.5)", letterSpacing:"0.12em",
        fontFamily:"'JetBrains Mono',monospace", maxWidth:480, margin:"0 auto 48px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition:"opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s",
      }}>
        scroll to explore ↓
      </p>
    </div>
  );
};

export default About;