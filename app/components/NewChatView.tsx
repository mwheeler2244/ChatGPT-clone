import React from "react";
import { motion } from "framer-motion";
import { chatSuggestions } from "../constants";

interface NewChatViewProps {
  setInput: (input: string) => void;
  setIsNewChat: (isNew: boolean) => void;
  handleSendMessage: () => void;
}

const NewChatView: React.FC<NewChatViewProps> = ({
  setInput,
  setIsNewChat,
  handleSendMessage,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-4 text-center min-h-[calc(100vh-180px)]"
    >
      <h1 className="text-3xl md:text-3xl sm:text-2xl xs:text-xl font-heading font-semibold mb-10 md:mb-10 sm:mb-6 text-zinc-800 tracking-tight">
        How can I help you today?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-3xl w-full">
        {chatSuggestions.map((suggestion, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-4 md:p-4 sm:p-3 xs:p-2 border border-zinc-200 rounded-xl hover:bg-zinc-50 text-left text-sm text-zinc-700 transition-all hover:shadow-md cursor-pointer"
            onClick={() => {
              setInput(suggestion);
              setIsNewChat(false);
              // Simulate immediate focus and typing
              setTimeout(() => handleSendMessage(), 100);
            }}
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default NewChatView;
