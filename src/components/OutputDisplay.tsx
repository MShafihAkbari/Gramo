import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface OutputDisplayProps {
  text: string;
  streamingText: string;
  isProcessing: boolean;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
  text,
  streamingText,
  isProcessing,
}) => {
  const [copied, setCopied] = React.useState(false);

  const displayText = streamingText || text;

  const handleCopy = async () => {
    if (displayText) {
      await navigator.clipboard.writeText(displayText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ❌ No result to show yet
  if (!displayText && !isProcessing) {
    return (
      <div className="h-80 flex items-center justify-center bg-black/20 rounded-2xl border border-white/10 backdrop-blur-sm">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✨
            </motion.div>
          </motion.div>
          <p className="text-white/60 text-lg">
            Your perfected text will appear here
          </p>
        </div>
      </div>
    );
  }

  // ✅ Displaying output (even if still streaming)
  return (
    <div className="relative">
      {displayText && (
        <motion.button
          onClick={handleCopy}
          className="absolute top-4 right-4 z-10 p-3 luxury-glass rounded-xl hover:bg-white/20 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Copy to clipboard"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-5 h-5 text-green-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Copy className="w-5 h-5 text-white/70" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}

      <div className="h-80 p-6 bg-black/20 rounded-2xl border border-white/10 backdrop-blur-sm overflow-y-auto custom-scrollbar">
        <motion.div
          className="whitespace-pre-wrap text-white leading-relaxed text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {displayText}
          {isProcessing && (
            <motion.span
              className="inline-block w-1 h-6 bg-white ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};
