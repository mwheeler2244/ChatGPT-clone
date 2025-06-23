import React from "react";
import { motion } from "framer-motion";
import { Send, HelpCircle, Globe } from "lucide-react";

interface InputAreaProps {
  isSidebarOpen: boolean;
  input: string;
  isProcessing: boolean;
  activeFeature: "none" | "reason" | "browse";
  setInput: (input: string) => void;
  setActiveFeature: (feature: "none" | "reason" | "browse") => void;
  handleSendMessage: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({
  isSidebarOpen,
  input,
  isProcessing,
  activeFeature,
  setInput,
  setActiveFeature,
  handleSendMessage,
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-[#f9f9fa] border-t border-zinc-200 z-30 safari-padding-fix"
      style={{
        left: isSidebarOpen ? "280px" : "0px",
        transition: "left 0.3s ease-in-out",
      }}
    >
      <div className="w-full max-w-3xl px-4 md:px-4 sm:px-3 xs:px-2 mx-auto py-4 md:py-4 sm:py-3 xs:py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative shadow-lg rounded-xl border border-zinc-200 bg-white overflow-hidden"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Message ChatGPT..."
            className="w-full py-4 px-4 md:py-4 md:px-4 sm:py-3 sm:px-3 xs:py-2 xs:px-2 pr-12 border-none focus:outline-none focus:ring-0 resize-none min-h-[56px] max-h-[200px]"
            rows={1}
            style={{ fontSize: "16px" }} /* Prevents iOS zoom on focus */
          />

          {/* New modern features bar */}
          <div className="flex items-center justify-between px-4 py-2 md:px-4 md:py-2 sm:px-3 sm:py-1.5 xs:px-2 xs:py-1 border-t border-zinc-100 bg-zinc-50">
            <div className="flex items-center gap-2 mobile-feature-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setActiveFeature(
                    activeFeature === "reason" ? "none" : "reason"
                  )
                }
                className={`flex items-center gap-1.5 px-2.5 py-1.5 md:px-2.5 md:py-1.5 sm:px-2 sm:py-1 xs:px-1.5 xs:py-0.5 text-xs font-heading font-medium tracking-tight transition-colors rounded-md cursor-pointer nav-item ${
                  activeFeature === "reason"
                    ? "bg-purple-600 text-white"
                    : "text-zinc-600 hover:bg-zinc-200"
                }`}
                disabled={isProcessing}
              >
                <HelpCircle size={14} className="md:block sm:block xs:hidden" />
                <span>Reason</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setActiveFeature(
                    activeFeature === "browse" ? "none" : "browse"
                  )
                }
                className={`flex items-center gap-1.5 px-2.5 py-1.5 md:px-2.5 md:py-1.5 sm:px-2 sm:py-1 xs:px-1.5 xs:py-0.5 text-xs font-heading font-medium tracking-tight transition-colors rounded-md cursor-pointer nav-item ${
                  activeFeature === "browse"
                    ? "bg-purple-600 text-white"
                    : "text-zinc-600 hover:bg-zinc-200"
                }`}
                disabled={isProcessing}
              >
                <Globe size={14} className="md:block sm:block xs:hidden" />
                <span>Web Browse</span>
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!input.trim() || isProcessing}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 md:px-2.5 md:py-1.5 sm:px-2 sm:py-1 xs:px-1.5 xs:py-0.5 text-xs font-heading font-medium tracking-tight transition-colors rounded-md cursor-pointer nav-item ${
                input.trim() && !isProcessing
                  ? "bg-purple-600 text-white"
                  : "text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {isProcessing ? (
                <div className="w-[14px] h-[14px] border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send size={14} className="stroke-current" />
              )}
              <span>Send</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="text-center text-xs text-zinc-500 mt-2">
          ChatGPT can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
};

export default InputArea;
