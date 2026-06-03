export const PROJECTS = [
  {
    id: "01",
    title: "SYS_KERNEL",
    subtitle:
      "Cinematic interaction-focused interface system with futuristic layered transitions.",
    description:
      "A full-stack OS-inspired interface built with Next.js and GSAP.",
    tags: [
      "NEXT.JS",
      "GSAP",
      "WEBSOCKET",
      "TAILWIND",
      "VERCEL",
    ],
    accent: "#39ff14",
    bg: "linear-gradient(135deg,#0f1117 0%,#1a1d2e 100%)",
    year: "2024",
    role: "Full-Stack Dev",
    code: `const kernel = init();
kernel.boot({ mode: 'silent' });
await kernel.mount('/sys');`,
  },

  {
    id: "02",
    title: "KRYPT_OS",
    subtitle:
      "Encrypted OS-level dashboard with real-time data streams.",
    description:
      "End-to-end encrypted dashboard built with React and Node.",
    tags: [
      "REACT",
      "NODE.JS",
      "POSTGRESQL",
      "AES-256",
      "SSE",
    ],
    accent: "#00ffcc",
    bg: "linear-gradient(135deg,#0d1a0f 0%,#111e12 100%)",
    year: "2024",
    role: "Security Engineer",
    code: `import { encrypt } from 'krypt';
const vault = new Vault(key);
await vault.seal(payload);`,
  },

  {
    id: "03",
    title: "DATA_SPHERE",
    subtitle:
      "Gen AI-powered analytics sphere with live insights.",
    description:
      "Multi-agent AI analytics system with vector search.",
    tags: [
      "LANGCHAIN",
      "GPT-4O",
      "PINECONE",
      "D3.JS",
      "PYTHON",
    ],
    accent: "#a78bfa",
    bg: "linear-gradient(135deg,#111118 0%,#1c1a2e 100%)",
    year: "2025",
    role: "AI Engineer",
    code: `const sphere = DataSphere.init();
sphere.ingest(stream,{live:true});
console.log(sphere.nodes);`,
  },
];