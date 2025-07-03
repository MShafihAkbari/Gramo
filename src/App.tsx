import React, { useState, useEffect } from 'react';
import { Moon, Sun, FileText, Download, Copy, Loader2, Sparkles } from 'lucide-react';
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
  const [isProcessing, setIsProcessing] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const { refineText } = useGrammarChecker();

  const handleRefineText = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    try {
      const refined = await refineText(inputText, selectedTone);
      setOutputText(refined);
    } catch (error) {
      console.error('Error refining text:', error);
      setOutputText('Sorry, there was an error processing your text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      <div className="gradient-bg min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Gramo</h1>
                <p className="text-white/80 text-sm">Write With Confidence</p>
              </div>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl glass-effect hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5 text-white" />
              )}
            </button>
          </header>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Input Text
                </h2>
                <TextInput
                  value={inputText}
                  onChange={setInputText}
                  placeholder="Paste or type your text here to refine grammar, style, and tone..."
                />
              </div>

              <div className="glass-effect rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                  Select Tone
                </h3>
                <ToneSelector
                  selectedTone={selectedTone}
                  onToneChange={setSelectedTone}
                />
              </div>

              <button
                onClick={handleRefineText}
                disabled={!inputText.trim() || isProcessing}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Refining Text...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Refine Text</span>
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Refined Text
                  </h2>
                  {outputText && (
                    <button
                      onClick={() => navigator.clipboard.writeText(outputText)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  )}
                </div>
                <OutputDisplay text={outputText} isProcessing={isProcessing} />
              </div>

              {outputText && (
                <div className="glass-effect rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
                    Export Options
                  </h3>
                  <ExportButtons text={outputText} />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center">
            <p className="text-white/60 text-sm">
              Gramo – Write With Confidence
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;