import { Model, HistorySection } from "./types";

// AI Models
export const availableModels: Model[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "Our most capable model for complex tasks",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5",
    description: "Our fastest model, great for most everyday tasks",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    description: "Advanced reasoning and understanding",
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    description: "Balanced performance and speed",
  },
];

// Mock responses based on keywords
export const keywordResponses: { [key: string]: string[] } = {
  hello: [
    "Hello! How can I help you today?",
    "Hi there! What can I assist you with?",
    "Greetings! How may I be of service?",
  ],
  help: [
    "I'm here to help. What do you need assistance with?",
    "I can assist with a variety of topics. What's on your mind?",
    "I'd be happy to help. Could you please specify what you need help with?",
  ],
  thanks: [
    "You're welcome! Is there anything else I can help with?",
    "Happy to help! Let me know if you need anything else.",
    "No problem at all! Feel free to ask if you have more questions.",
  ],
  weather: [
    "I don't have real-time weather data, but I can help you find a weather service.",
    "The weather is always perfect in the digital world! But seriously, I can't access current weather data.",
    "I wish I could tell you the weather, but I don't have access to that information.",
  ],
  ai: [
    "AI, or artificial intelligence, refers to systems designed to mimic human intelligence and perform tasks that typically require human cognition.",
    "Artificial intelligence encompasses various technologies including machine learning, natural language processing, and computer vision.",
    "As an AI assistant, I'm designed to understand and generate human-like text based on the input I receive.",
  ],
  joke: [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do you call a fake noodle? An impasta!",
  ],
  code: [
    "I can help with coding questions. What programming language are you working with?",
    "Programming is fascinating! What specific coding help do you need?",
    "I'd be happy to help with code. Could you share more details about your project?",
  ],
  typescript: [
    "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    "TypeScript adds optional static typing to JavaScript, which can help catch errors early and improve developer experience.",
    "I can help with TypeScript questions. What specific aspect are you interested in?",
  ],
  react: [
    "React is a JavaScript library for building user interfaces, particularly single-page applications.",
    "React uses a component-based architecture that allows you to build encapsulated components that manage their own state.",
    "What specific React concepts or issues would you like help with?",
  ],
};

// Random response for unknown inputs
export const fallbackResponses = [
  "I'm not sure I understand. Could you please elaborate?",
  "That's an interesting point. Can you tell me more?",
  "I'm still learning. Could you rephrase that?",
  "I don't have information on that specific topic. Is there something else I can help with?",
  "I'm not sure how to respond to that. Could you try asking in a different way?",
];

// Sample conversation history grouped by time
export const sampleHistoryItems: HistorySection[] = [
  {
    header: "Today",
    items: [
      "Building a React state management system",
      "How to implement authentication with NextAuth",
      "Designing responsive layouts with CSS Grid",
      "Optimizing database queries for PostgreSQL",
      "Modern JavaScript best practices",
    ],
  },
  {
    header: "Yesterday",
    items: ["TypeScript generics explained", "React server components"],
  },
  {
    header: "Previous 7 Days",
    items: ["Real-time data with WebSockets", "Custom React hooks patterns"],
  },
  {
    header: "May",
    items: ["Microservices architecture", "GraphQL vs REST API"],
  },
  {
    header: "April",
    items: ["Frontend performance optimization", "AWS deployment strategies"],
  },
];

// Chat suggestions for new chat view
export const chatSuggestions = [
  "Tell me about React hooks",
  "Explain TypeScript generics",
  "Create a Node.js REST API",
  "Design a database schema for a blog",
  "Write unit tests for this function",
  "How to use Git for collaboration",
];
