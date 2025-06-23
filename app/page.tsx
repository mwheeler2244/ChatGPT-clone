"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Conversation, Model, HistorySection } from "./types";
import { availableModels, sampleHistoryItems } from "./constants";
import { generateId, getMockedResponse } from "./utils";
import { styles } from "./styles";
import Sidebar from "./components/Sidebar";
import TopNavigation from "./components/TopNavigation";
import NewChatView from "./components/NewChatView";
import ChatInterface from "./components/ChatInterface";
import InputArea from "./components/InputArea";
import UpgradeModal from "./components/UpgradeModal";

export default function MyComponent() {
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>("");
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Set sidebar closed by default on mobile, open on desktop
    return typeof window !== "undefined" ? window.innerWidth > 768 : true;
  });
  const [isNewChat, setIsNewChat] = useState(true);
  const [isModelSelectOpen, setIsModelSelectOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedModel, setSelectedModel] = useState<Model>(availableModels[0]);
  const [showUpgradePlans, setShowUpgradePlans] = useState(false);
  const [sampleHistory, setSampleHistory] =
    useState<HistorySection[]>(sampleHistoryItems);
  const [activeFeature, setActiveFeature] = useState<
    "none" | "reason" | "browse"
  >("none");
  const [isProcessing, setIsProcessing] = useState(false);
  const [tempConversation, setTempConversation] = useState<Conversation | null>(
    null
  );
  // Add ref for message container to enable auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom of messages with more options for reliable scrolling
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      try {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      } catch {
        // Fallback for browsers that don't support options
        messagesEndRef.current.scrollIntoView(false);
      }
    }
  };

  // Create a new conversation - using useCallback to avoid dependency cycle
  const createNewConversation = useCallback(() => {
    // If there's already an active conversation with no messages, don't create a new one
    const activeConvo = conversations.find(
      (conv) => conv.id === activeConversationId
    );

    // Clear any temporary conversation
    if (tempConversation) {
      setTempConversation(null);
    }

    if (activeConvo && activeConvo.messages.length === 0) {
      setActiveConversationId(activeConvo.id);
      setIsNewChat(true);
      return;
    }

    const newConversationId = generateId();
    const newConversation: Conversation = {
      id: newConversationId,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      model: selectedModel.id,
    };

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversationId);
    setInput("");
    setIsNewChat(true);
  }, [conversations, activeConversationId, tempConversation, selectedModel.id]);

  // Check window size on mount and set sidebar state accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    // Check initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  // Initialize with a new conversation
  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    }
  }, [conversations, createNewConversation]);

  // Add style tag for animations and fonts
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.type = "text/css";
    styleTag.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleTag);

    // Add preconnect for Google Fonts performance
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";

    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "anonymous";

    // Add viewport meta tag for proper mobile rendering
    const viewport = document.createElement("meta");
    viewport.name = "viewport";
    viewport.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(viewport);

    return () => {
      document.head.removeChild(styleTag);
      document.head.removeChild(preconnect1);
      document.head.removeChild(preconnect2);
      document.head.removeChild(viewport);
    };
  }, []);

  // Get active conversation - check temp conversation first
  const activeConversation =
    tempConversation && tempConversation.id === activeConversationId
      ? tempConversation
      : conversations.find((conv) => conv.id === activeConversationId);

  // Auto-scroll when messages change
  useEffect(() => {
    if (
      !isNewChat &&
      activeConversation &&
      activeConversation.messages &&
      activeConversation.messages.length > 0
    ) {
      // Use a slight delay to ensure all animations are complete before scrolling
      setTimeout(() => {
        scrollToBottom();
      }, 150);
    }
  }, [activeConversation?.messages, isNewChat, activeConversation]);

  // Auto-scroll when processing state changes
  useEffect(() => {
    if (
      !isProcessing &&
      !isNewChat &&
      activeConversation &&
      activeConversation.messages.length > 0
    ) {
      setTimeout(() => {
        scrollToBottom();
      }, 150);
    }
  }, [isProcessing, isNewChat, activeConversation]);

  // Handle sending a message with animations
  const handleSendMessage = () => {
    if (input.trim() === "" || !activeConversation || isProcessing) return;

    // Check if current conversation is temporary
    const isTemp = activeConversation.id.startsWith("temp-");

    if (isTemp && tempConversation) {
      // Convert temp conversation to a real one
      const realConvoId = generateId();
      const realConvo: Conversation = {
        ...tempConversation,
        id: realConvoId,
        messages: [
          ...tempConversation.messages,
          { id: generateId(), text: input, isBot: false },
        ],
      };

      // Remove the conversation from sample history if it exists there
      const title = tempConversation.title;
      setSampleHistory((prevHistory) => {
        return prevHistory
          .map((section) => {
            // Check if this item exists in this section
            const itemIndex = section.items.findIndex((item) => item === title);
            if (itemIndex >= 0) {
              // Found the item, remove it
              const newItems = [...section.items];
              newItems.splice(itemIndex, 1);
              return {
                ...section,
                items: newItems,
              };
            }
            return section;
          })
          .filter((section) => section.items.length > 0); // Remove empty sections
      });

      // Add to real conversations and set as active
      setConversations((prev) => [realConvo, ...prev]);
      setActiveConversationId(realConvoId);
      setTempConversation(null);

      // Continue with response logic...
      setInput("");
      setIsNewChat(false);
      setIsProcessing(true);

      // Show processing message if using reason or browse
      if (activeFeature !== "none") {
        const processingMessageId = generateId();
        const processingText =
          activeFeature === "reason" ? "Reasoning..." : "Web searching...";

        setTimeout(() => {
          setConversations((prevConversations) =>
            prevConversations.map((conv) => {
              if (conv.id === realConvoId) {
                return {
                  ...conv,
                  messages: [
                    ...conv.messages,
                    {
                      id: processingMessageId,
                      text: processingText,
                      isBot: true,
                      isProcessing: true,
                    },
                  ],
                };
              }
              return conv;
            })
          );
        }, 300);
      }

      // Determine response delay based on active feature
      const responseDelay = activeFeature === "none" ? 800 : 2500;

      // Get mocked response with typing animation
      setTimeout(() => {
        const botMessageId = generateId();
        const responsePrefix =
          activeFeature === "reason"
            ? "After careful reasoning: "
            : activeFeature === "browse"
            ? "After browsing the web: "
            : "";
        const response = responsePrefix + getMockedResponse(input);

        setConversations((prevConversations) =>
          prevConversations.map((conv) => {
            if (conv.id === realConvoId) {
              // Remove processing message if it exists
              const messages = conv.messages.filter((msg) => !msg.isProcessing);
              return {
                ...conv,
                messages: [
                  ...messages,
                  { id: botMessageId, text: response, isBot: true },
                ],
              };
            }
            return conv;
          })
        );

        setIsProcessing(false);
        setActiveFeature("none");
      }, responseDelay);

      // We'll add a setTimeout to scroll to bottom after the state updates
      setTimeout(() => {
        scrollToBottom();
      }, 150);

      return;
    }

    // Handle regular conversation (non-temporary)
    // Add user message
    const userMessageId = generateId();
    setIsProcessing(true);

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversationId) {
        // Update conversation title based on first user message if it's still "New Chat"
        let updatedTitle = conv.title;
        if (
          updatedTitle === "New Chat" &&
          conv.messages.filter((m) => !m.isBot).length === 0
        ) {
          updatedTitle =
            input.length > 30 ? `${input.substring(0, 30)}...` : input;
        }

        return {
          ...conv,
          title: updatedTitle,
          messages: [
            ...conv.messages,
            { id: userMessageId, text: input, isBot: false },
          ],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setInput("");
    setIsNewChat(false);

    // Show processing message if using reason or browse
    if (activeFeature !== "none") {
      const processingMessageId = generateId();
      const processingText =
        activeFeature === "reason" ? "Reasoning..." : "Web searching...";

      setTimeout(() => {
        setConversations((prevConversations) =>
          prevConversations.map((conv) => {
            if (conv.id === activeConversationId) {
              return {
                ...conv,
                messages: [
                  ...conv.messages,
                  {
                    id: processingMessageId,
                    text: processingText,
                    isBot: true,
                    isProcessing: true,
                  },
                ],
              };
            }
            return conv;
          })
        );
      }, 300);
    }

    // Determine response delay based on active feature
    const responseDelay = activeFeature === "none" ? 800 : 2500;

    // Get mocked response with typing animation
    setTimeout(() => {
      const botMessageId = generateId();

      // Different prefixes based on active feature
      let responsePrefix = "";
      if (activeFeature === "reason") {
        responsePrefix = "After careful reasoning: ";
      } else if (activeFeature === "browse") {
        responsePrefix = "After browsing the web: ";
      }

      const response = responsePrefix + getMockedResponse(input);

      setConversations((prevConversations) =>
        prevConversations.map((conv) => {
          if (conv.id === activeConversationId) {
            // Remove processing message if it exists
            const messages = conv.messages.filter((msg) => !msg.isProcessing);
            return {
              ...conv,
              messages: [
                ...messages,
                { id: botMessageId, text: response, isBot: true },
              ],
            };
          }
          return conv;
        })
      );

      setIsProcessing(false);
      setActiveFeature("none");
    }, responseDelay);

    // We'll add a setTimeout to scroll to bottom after the state updates
    setTimeout(() => {
      scrollToBottom();
    }, 150);
  };

  // Delete a conversation
  const deleteConversation = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    // Handle deleting a temporary conversation
    if (id.startsWith("temp-") && tempConversation?.id === id) {
      setTempConversation(null);
      // Create a new conversation or select the first existing one
      if (conversations.length > 0) {
        setActiveConversationId(conversations[0].id);
        setIsNewChat(false);
      } else {
        createNewConversation();
      }
      return;
    }

    setConversations((prev) => prev.filter((conv) => conv.id !== id));

    // If we're deleting the active conversation
    if (activeConversationId === id) {
      // Set the first remaining conversation as active, or create a new one if none left
      if (conversations.length > 1) {
        const remainingConvs = conversations.filter((conv) => conv.id !== id);
        setActiveConversationId(remainingConvs[0].id);
        setIsNewChat(false);
      } else {
        createNewConversation();
      }
    }
  };

  // Delete a sample history item
  const deleteSampleHistoryItem = (
    sectionIndex: number,
    itemIndex: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSampleHistory((prev) => {
      const newHistory = [...prev];
      newHistory[sectionIndex].items = newHistory[sectionIndex].items.filter(
        (_, idx) => idx !== itemIndex
      );
      // Remove the section if it's empty
      if (newHistory[sectionIndex].items.length === 0) {
        newHistory.splice(sectionIndex, 1);
      }
      return newHistory;
    });
  };

  // Very simple toggle function
  function handleToggleSidebar() {
    console.log("Current sidebar state:", isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
    console.log("New sidebar state:", !isSidebarOpen);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isModelSelectOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest('[data-dropdown="model-select"]')
      ) {
        setIsModelSelectOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModelSelectOpen]);

  return (
    <div className="flex min-h-screen bg-[#f9f9fa] text-gray-900 safari-full-height">
      {/* Overlay when sidebar is open on mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={handleToggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        conversations={conversations}
        activeConversationId={activeConversationId}
        sampleHistory={sampleHistory}
        tempConversation={tempConversation}
        selectedModel={selectedModel}
        handleToggleSidebar={handleToggleSidebar}
        createNewConversation={createNewConversation}
        setActiveConversationId={setActiveConversationId}
        setIsNewChat={setIsNewChat}
        deleteConversation={deleteConversation}
        deleteSampleHistoryItem={deleteSampleHistoryItem}
        setShowUpgradePlans={setShowUpgradePlans}
        setTempConversation={setTempConversation}
        generateId={generateId}
      />

      {/* Main content area with proper offset */}
      <div
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: isSidebarOpen ? "280px" : "0px" }}
      >
        {/* Top navigation */}
        <TopNavigation
          isSidebarOpen={isSidebarOpen}
          isModelSelectOpen={isModelSelectOpen}
          setIsModelSelectOpen={setIsModelSelectOpen}
          setShowUpgradePlans={setShowUpgradePlans}
          handleToggleSidebar={handleToggleSidebar}
          createNewConversation={createNewConversation}
        />

        {/* Content area with browser scrolling and adjusted top padding */}
        <div className="w-full max-w-3xl px-4 mx-auto pb-[140px] pt-[70px]">
          {/* Chat or New Chat UI */}
          {isNewChat ? (
            <NewChatView
              setInput={setInput}
              setIsNewChat={setIsNewChat}
              handleSendMessage={handleSendMessage}
            />
          ) : (
            <ChatInterface
              activeConversation={activeConversation}
              messagesEndRef={messagesEndRef}
            />
          )}
        </div>

        {/* Input area */}
        <InputArea
          isSidebarOpen={isSidebarOpen}
          input={input}
          isProcessing={isProcessing}
          activeFeature={activeFeature}
          setInput={setInput}
          setActiveFeature={setActiveFeature}
          handleSendMessage={handleSendMessage}
        />
      </div>

      {/* Upgrade Plans Modal */}
      <UpgradeModal
        showUpgradePlans={showUpgradePlans}
        setShowUpgradePlans={setShowUpgradePlans}
      />
    </div>
  );
}
