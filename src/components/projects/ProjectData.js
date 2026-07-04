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
  title: "RESUME_ANALYZER",
  subtitle:
    "AI resume analyzer powered by LangChain-style AI workflows.",
  description:
    "AI-driven interview preparation platform that parses resumes, analyzes candidate profiles, and generates personalized interview strategies using LLM pipelines with structured AI responses.",
  tags: [
    "REACT",
    "NODE.JS",
    "EXPRESS",
    "MONGODB",
    "GOOGLE GENAI",
    "LANGCHAIN",
    "ZOD",
    "JWT",
    "PDF PARSER"
  ],
  accent: "#ff4d8d",
  bg: "linear-gradient(135deg,#140014 0%,#071526 100%)",
  year: "2026",
  role: "Full Stack AI Developer",

  code: `const schema = zodToJsonSchema(strategySchema);

const response = await ai.models.generateContent({
  model,
  contents: resumeData
});

return interviewStrategy;`,

  liveUrl: "https://resume-analyzer-blush-iota.vercel.app",
  sourceUrl: "https://github.com/Rahul-Singh2507/Resume-analyzer",
},
{
  id: "03",
  title: "SNITCH",
  subtitle:
    "Full-stack e-commerce platform with secure payments.",
  description:
    "Production-ready MERN stack shopping platform featuring user authentication, product catalog, cart management, image uploads, Razorpay payment integration, and scalable REST APIs.",
  tags: [
    "REACT",
    "NODE.JS",
    "EXPRESS",
    "MONGODB",
    "REDUX",
    "RAZORPAY",
    "JWT",
    "MULTER",
    "TAILWINDCSS",
  ],
  accent: "#f5a524",
  bg: "linear-gradient(135deg,#1a1205 0%,#2b1d0e 100%)",
  year: "2026",
  role: "Full Stack Developer",
  code: `const cart = addToCart(product);

const order = await createOrder({
  amount,
  payment: "razorpay"
});

await checkout(order);`,
},
];