import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Conversation } from "../types";

interface ChatInterfaceProps {
  activeConversation: Conversation | null | undefined;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  activeConversation,
  messagesEndRef,
}) => {
  return (
    <div
      className="py-6 md:py-6 sm:py-4 xs:py-3 space-y-6 md:space-y-6 sm:space-y-4 xs:space-y-3 overflow-y-auto relative"
      style={{ maxHeight: "calc(100vh - 210px)" }}
    >
      {activeConversation?.messages.map((message, idx) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: idx < 2 ? idx * 0.1 : 0,
          }}
          className={`flex max-w-3xl mx-auto ${
            message.isBot ? "" : "justify-end"
          }`}
        >
          <div
            className={`flex gap-4 md:gap-4 sm:gap-3 xs:gap-2 ${
              message.isBot ? "" : "flex-row-reverse"
            }`}
          >
            <div className="flex-shrink-0 mt-1">
              {message.isBot ? (
                <div className="w-8 h-8 md:w-8 md:h-8 sm:w-7 sm:h-7 xs:w-6 xs:h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <MessageSquare
                    size={16}
                    className="md:w-4 md:h-4 sm:w-3.5 sm:h-3.5 xs:w-3 xs:h-3"
                  />
                </div>
              ) : null}
            </div>
            <div
              className={`max-w-[90%] message-bubble whitespace-pre-wrap leading-7 md:leading-7 sm:leading-6 xs:leading-5 px-4 py-3 md:px-4 md:py-3 sm:px-3 sm:py-2 xs:px-2 xs:py-2 rounded-2xl ${
                message.isBot
                  ? message.isProcessing
                    ? "bg-zinc-100 text-zinc-700 border border-zinc-200"
                    : "bg-white text-zinc-700 shadow-sm border border-zinc-100"
                  : "bg-purple-600 text-white"
              }`}
            >
              {message.isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-zinc-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-3 h-3 bg-zinc-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-zinc-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                  <span className="ml-2">{message.text}</span>
                </div>
              ) : (
                message.text
              )}
            </div>
          </div>
        </motion.div>
      ))}
      {/* Add a div ref at the end of messages for auto-scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatInterface;
