import { keywordResponses, fallbackResponses } from "./constants";

// Simple function to generate unique IDs
export const generateId = () =>
  `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Get a mocked response based on input
export const getMockedResponse = (userInput: string) => {
  const input = userInput.toLowerCase();

  // Check for keyword matches
  for (const [keyword, responses] of Object.entries(keywordResponses)) {
    if (input.includes(keyword)) {
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    }
  }

  // Return a random fallback response if no keywords match
  const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
  return fallbackResponses[randomIndex];
};
