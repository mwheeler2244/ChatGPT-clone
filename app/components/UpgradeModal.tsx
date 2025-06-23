import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

interface UpgradeModalProps {
  showUpgradePlans: boolean;
  setShowUpgradePlans: (show: boolean) => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({
  showUpgradePlans,
  setShowUpgradePlans,
}) => {
  return (
    <AnimatePresence>
      {showUpgradePlans && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-4 sm:p-3 xs:p-2"
          onClick={() => setShowUpgradePlans(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl max-w-2xl w-full mx-4 md:mx-4 sm:mx-2 xs:mx-1 shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 md:p-6 sm:p-4 xs:p-3 border-b border-zinc-100">
              <h2 className="text-xl md:text-xl sm:text-lg xs:text-base font-heading font-bold tracking-tight">
                ChatGPT Plans
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowUpgradePlans(false)}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="p-6 md:p-6 sm:p-4 xs:p-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 sm:gap-4 xs:gap-3">
                {/* Free Plan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-zinc-200 rounded-xl p-6 md:p-6 sm:p-4 xs:p-3 hover:border-zinc-400 transition-colors cursor-pointer flex flex-col"
                >
                  <h3 className="font-heading font-bold mb-1">Free</h3>
                  <p className="text-zinc-500 text-sm mb-4">
                    For trying out ChatGPT
                  </p>
                  <div className="text-3xl md:text-3xl sm:text-2xl xs:text-xl font-heading font-semibold mb-6 md:mb-6 sm:mb-4 xs:mb-3 tracking-tight">
                    $0
                  </div>
                  <ul className="space-y-4 md:space-y-4 sm:space-y-3 xs:space-y-2 mb-8 md:mb-8 sm:mb-6 xs:mb-4">
                    <li className="flex items-center text-sm">
                      <CheckCircle
                        size={16}
                        className="text-green-500 mr-3 flex-shrink-0"
                      />
                      <span>Access to GPT-3.5</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle
                        size={16}
                        className="text-green-500 mr-3 flex-shrink-0"
                      />
                      <span>Standard response speed</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle
                        size={16}
                        className="text-green-500 mr-3 flex-shrink-0"
                      />
                      <span>Regular model updates</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      className="w-full py-2 border border-zinc-300 rounded-md bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer font-heading font-medium"
                    >
                      Current Plan
                    </motion.button>
                  </div>
                </motion.div>

                {/* Plus Plan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="border border-purple-200 rounded-xl p-6 md:p-6 sm:p-4 xs:p-3 hover:border-purple-400 transition-colors bg-gradient-to-b from-white to-purple-50 cursor-pointer flex flex-col relative"
                >
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-purple-500 to-violet-500 text-white text-xs rounded-full font-heading font-medium shadow-sm">
                    ✦ RECOMMENDED
                  </div>
                  <h3 className="font-heading font-bold mb-1">Plus</h3>
                  <p className="text-zinc-500 text-sm mb-4">For power users</p>
                  <div className="text-3xl md:text-3xl sm:text-2xl xs:text-xl font-heading font-semibold mb-6 md:mb-6 sm:mb-4 xs:mb-3 tracking-tight">
                    $20{" "}
                    <span className="text-base md:text-base sm:text-sm xs:text-xs font-normal">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-4 md:space-y-4 sm:space-y-3 xs:space-y-2 mb-8 md:mb-8 sm:mb-6 xs:mb-4">
                    <li className="flex items-center text-sm">
                      <CheckCircle
                        size={16}
                        className="text-purple-600 mr-3 flex-shrink-0"
                      />
                      <span>Access to GPT-4</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle
                        size={16}
                        className="text-purple-600 mr-3 flex-shrink-0"
                      />
                      <span>Faster response speed</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle
                        size={16}
                        className="text-purple-600 mr-3 flex-shrink-0"
                      />
                      <span>Early access to new features</span>
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:opacity-90 transition-opacity cursor-pointer font-heading font-medium"
                    >
                      Upgrade to Plus
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              <p className="text-xs text-zinc-500 mt-6 text-center">
                This is a demo. No actual subscription will be processed.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;
