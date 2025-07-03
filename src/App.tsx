import React, { useState } from 'react';
import { Moon, Sun, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToneSelector } from './components/ToneSelector';
import { TextInput } from './components/TextInput';
import { OutputDisplay } from './components/OutputDisplay';
import { ExportButtons } from './components/ExportButtons';
import { useGrammarChecker } from './hooks/useGrammarChecker';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedTone, setSelectedTone] = useState<'neutral' | 'formal' | 'casual'>('neutral');
  const [outputText, setOutputText] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isDark, toggleDarkMode } = useDarkMode();
  const { refineText } = useGrammarChecker();

  const handleRefineText = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    setOutputText('');
    setStreamingText('');
    
    try {
      const refined = await refineText(inputText, selectedTone, (chunk: string) => {
        setStreamingText(prev => prev + chunk);
      });
      
      setOutputText(refined);
      setStreamingText('');
    } catch (error) {
      console.error('Error refining text:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      setOutputText('');
      setStreamingText('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isDark ? 'dark' : ''}`}>
      <div className="luxury-gradient min-h-screen relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
          {/* Header */}
          <motion.header 
            className="flex justify-between items-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-14 h-14 luxury-glass rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-1">Gramo</h1>
                <p className="text-white/70 text-lg">AI-Powered Grammar Perfection</p>
              </div>
            </div>
            
            <motion.button
              onClick={toggleDarkMode}
              className="p-4 luxury-glass rounded-2xl hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.header>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="luxury-glass rounded-3xl p-6 shadow-2xl mb-8 border-2 border-red-400/30"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-300 mb-2">
                      Processing Error
                    </h3>
                    <p className="text-red-200/80 leading-relaxed">
                      {error}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="grid xl:grid-cols-2 gap-10">
            {/* Input Section */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="luxury-glass rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <span>Input Text</span>
                </h2>
                <TextInput
                  value={inputText}
                  onChange={setInputText}
                  placeholder="Paste or type your text here to transform it with AI-powered grammar correction, style enhancement, and tone adjustment..."
                />
              </div>

              <div className="luxury-glass rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Select Writing Tone
                </h3>
                <ToneSelector
                  selectedTone={selectedTone}
                  onToneChange={setSelectedTone}
                />
              </div>

              <motion.button
                onClick={handleRefineText}
                disabled={!inputText.trim() || isProcessing}
                className="w-full luxury-button text-white font-semibold py-6 px-8 rounded-2xl transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {isProcessing ? (
                    <motion.div
                      key="processing"
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-6 h-6" />
                      </motion.div>
                      <span>AI is crafting your perfect text...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="ready"
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Sparkles className="w-6 h-6" />
                      <span>Transform with AI</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Output Section */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="luxury-glass rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    AI-Perfected Text
                  </h2>
                </div>
                <OutputDisplay 
                  text={outputText} 
                  streamingText={streamingText}
                  isProcessing={isProcessing} 
                />
              </div>

              <AnimatePresence>
                {(outputText || streamingText) && (
                  <motion.div 
                    className="luxury-glass rounded-3xl p-8 shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-6">
                      Export Options
                    </h3>
                    <ExportButtons text={outputText || streamingText} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.footer 
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-white/50 text-lg">
              Gramo – Where AI Meets Perfect Writing
            </p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}

export default App;