export const PROJECTS = [
 {
    id: "01",
    title: "OMNI",
    subtitle: "AI-powered real-time chat application with smart conversations.",
    description: "A full-stack chat app built with React, Node.js, and Socket.io featuring AI responses via Mistral API.",
    tags: [
        "REACT",
        "NODE.JS",
        "SOCKET.IO",
        "MONGODB",
        "MISTRAL AI",
    ],
    accent: "#00c9ff",
    bg: "linear-gradient(135deg,#0a0f1e 0%,#0d1f3c 100%)",
    year: "2026",
    role: "Full-Stack Dev",
    code: `const omni = init();
omni.boot({ mode: 'chat' });
await omni.connect('/ai');`,
liveUrl: "https://omni-nu.vercel.app",       
sourceUrl: "https://github.com/Rahul-Singh2507/Omni", 
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