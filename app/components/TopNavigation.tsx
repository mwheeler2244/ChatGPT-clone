"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle } from "lucide-react";
import { SiOpenai } from "react-icons/si";

interface TopNavigationProps {
  isSidebarOpen: boolean;
  isModelSelectOpen: boolean;
  setIsModelSelectOpen: (open: boolean) => void;
  setShowUpgradePlans: (show: boolean) => void;
  handleToggleSidebar: () => void;
  createNewConversation: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  isSidebarOpen,
  isModelSelectOpen,
  setIsModelSelectOpen,
  setShowUpgradePlans,
  handleToggleSidebar,
  createNewConversation,
}) => {
  return (
    <div
      className="fixed top-0 right-0 z-30 border-b border-zinc-200 bg-white transition-all duration-300 ease-in-out"
      style={{
        width: isSidebarOpen ? "calc(100% - 280px)" : "100%",
        left: isSidebarOpen ? "280px" : "0px",
      }}
    >
      <nav className="flex items-center h-[60px] w-full px-0">
        {/* Left side - ChatGPT dropdown absolutely flush with left edge */}
        <div className="px-0 flex items-center absolute left-0 h-full">
          {/* Add sidebar toggle and new conversation buttons to the left of ChatGPT when sidebar is collapsed */}
          {!isSidebarOpen && (
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={handleToggleSidebar}
                className="p-2 text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M9 10H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 14H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <button
                onClick={createNewConversation}
                className="p-2 text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4V20M4 12H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="relative" data-dropdown="model-select">
            <button
              className="flex items-center gap-2 font-heading font-medium hover:bg-zinc-100 pl-4 pr-3 py-1.5 rounded-md transition-colors cursor-pointer tracking-tight nav-item"
              onClick={() => setIsModelSelectOpen(!isModelSelectOpen)}
            >
              ChatGPT
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {isModelSelectOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-1 w-72 bg-white border border-zinc-200 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <div className="p-4 flex items-center gap-3 border-b border-zinc-100">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
                        <SiOpenai size={16} />
                      </div>
                    </div>
                    <div>
                      <div className="font-heading font-medium tracking-tight nav-item">
                        ChatGPT Plus
                      </div>
                      <div className="text-xs text-zinc-500">
                        Our smartest model & more
                      </div>
                    </div>
                    <button
                      className="ml-auto px-3 py-1 text-sm font-heading bg-white border border-zinc-200 rounded-md shadow-sm hover:bg-zinc-50 cursor-pointer nav-item"
                      onClick={() => {
                        setShowUpgradePlans(true);
                        setIsModelSelectOpen(false);
                      }}
                    >
                      Upgrade
                    </button>
                  </div>
                  <div className="p-4 flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
                        <SiOpenai size={16} />
                      </div>
                    </div>
                    <div>
                      <div className="font-heading font-medium tracking-tight nav-item">
                        ChatGPT
                      </div>
                      <div className="text-xs text-zinc-500">
                        Great for everyday tasks
                      </div>
                    </div>
                    <div className="ml-auto">
                      <CheckCircle size={20} className="text-black" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Remove the Center area since we moved the buttons to the left */}
        <div className="flex-1"></div>

        {/* Right side - profile absolutely flush with right edge */}
        <div className="px-0 flex items-center absolute right-0 h-full">
          <button className="w-8 h-8 mr-4 bg-purple-600 text-white rounded-full flex items-center justify-center cursor-pointer font-heading font-medium">
            G
          </button>
        </div>
      </nav>
    </div>
  );
};

export default TopNavigation;
