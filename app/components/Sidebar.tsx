import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Package, Trash2 } from "lucide-react";
import { SiOpenai } from "react-icons/si";
import { Conversation, HistorySection, Model } from "../types";

interface SidebarProps {
  isSidebarOpen: boolean;
  conversations: Conversation[];
  activeConversationId: string;
  sampleHistory: HistorySection[];
  tempConversation: Conversation | null;
  selectedModel: Model;
  handleToggleSidebar: () => void;
  createNewConversation: () => void;
  setActiveConversationId: (id: string) => void;
  setIsNewChat: (isNew: boolean) => void;
  deleteConversation: (id: string, e?: React.MouseEvent) => void;
  deleteSampleHistoryItem: (
    sectionIndex: number,
    itemIndex: number,
    e: React.MouseEvent
  ) => void;
  setShowUpgradePlans: (show: boolean) => void;
  setTempConversation: (conv: Conversation | null) => void;
  generateId: () => string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  conversations,
  activeConversationId,
  sampleHistory,
  selectedModel,
  handleToggleSidebar,
  createNewConversation,
  setActiveConversationId,
  setIsNewChat,
  deleteConversation,
  deleteSampleHistoryItem,
  setShowUpgradePlans,
  setTempConversation,
  generateId,
}) => {
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  return (
    <motion.aside
      ref={sidebarRef}
      initial={{ x: "-100%" }}
      animate={{
        x: isSidebarOpen ? "0%" : "-100%",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={`fixed left-0 top-0 bottom-0 z-40 bg-[#202123] text-white flex flex-col h-screen w-[280px] md:w-[280px] sm:w-[80%] xs:w-[85%] shadow-xl`}
    >
      {/* Sidebar content */}
      <div className="p-3 flex items-center gap-2">
        <button
          onClick={handleToggleSidebar}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
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
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
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

      {/* ChatGPT branding */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <SiOpenai size={20} color="white" />
          </div>
          <span className="font-heading font-semibold tracking-tight">
            ChatGPT
          </span>
        </div>
      </div>

      {/* Conversation history with own scrolling */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800">
        {/* Real conversations section */}
        {conversations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 first:mt-2"
          >
            <h3 className="text-xs uppercase font-medium tracking-wide text-zinc-500 px-3 mb-2">
              Recent conversations
            </h3>
            {conversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                className={`flex items-center px-3 py-2 text-sm cursor-pointer group sidebar-item ${
                  conversation.id === activeConversationId
                    ? "bg-zinc-700/50"
                    : ""
                }`}
                onClick={() => {
                  setActiveConversationId(conversation.id);
                  setIsNewChat(false);
                }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <MessageSquare
                    size={16}
                    className="text-zinc-400 flex-shrink-0"
                  />
                  <span className="truncate">{conversation.title}</span>
                </div>

                <div className="flex ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 text-zinc-400 hover:text-zinc-200"
                    onClick={(e) => deleteConversation(conversation.id, e)}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Example history items */}
        {sampleHistory.map((section, sectionIdx) => (
          <motion.div
            key={sectionIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: sectionIdx * 0.05 }}
            className="mt-5 first:mt-2"
          >
            <h3 className="text-xs uppercase font-medium tracking-wide text-zinc-500 px-3 mb-2">
              {section.header}
            </h3>
            {section.items.map((item, itemIdx) => (
              <motion.div
                key={itemIdx}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                className="flex items-center px-3 py-2 text-sm cursor-pointer group sidebar-item"
                onClick={() => {
                  // Create a temporary conversation to view without adding to recent conversations
                  const tempConvoId = `temp-${generateId()}`;
                  const tempConvo: Conversation = {
                    id: tempConvoId,
                    title: item,
                    messages: [
                      {
                        id: generateId(),
                        text: "This is a sample conversation.",
                        isBot: true,
                      },
                    ],
                    createdAt: new Date(),
                    model: selectedModel.id,
                  };

                  // Set as active conversation but don't add to conversations list
                  setTempConversation(tempConvo);
                  setActiveConversationId(tempConvoId);
                  setIsNewChat(false);
                }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <MessageSquare
                    size={16}
                    className="text-zinc-400 flex-shrink-0"
                  />
                  <span className="truncate">{item}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-zinc-200 transition-opacity flex-shrink-0 ml-2"
                  onClick={(e) =>
                    deleteSampleHistoryItem(sectionIdx, itemIdx, e)
                  }
                >
                  <Trash2 size={16} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Upgrade plan */}
      <div className="mt-auto p-3 border-t border-zinc-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowUpgradePlans(true)}
          className="w-full"
        >
          <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-md hover:bg-zinc-700 cursor-pointer transition-colors duration-200">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Package size={16} />
            </div>
            <div className="text-left">
              <div className="text-sm font-heading font-medium tracking-tight">
                Upgrade plan
              </div>
              <div className="text-xs text-zinc-400">
                Get access to GPT-4 and more
              </div>
            </div>
          </div>
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
