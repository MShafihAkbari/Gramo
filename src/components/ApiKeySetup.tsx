import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: () => void;
  onApiKeyRemoved: () => void;
}

export const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySet, onApiKeyRemoved }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsValid(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      setIsValid(true);
      onApiKeySet();
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setIsValid(false);
    onApiKeyRemoved();
  };

  if (isValid) {
    return (
      <div className="glass-effect rounded-2xl p-6 shadow-xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Key className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                OpenAI API Connected
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI-powered grammar checking is active
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveApiKey}
            className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            Remove Key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl p-6 shadow-xl mb-6 border-2 border-yellow-200 dark:border-yellow-800">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <Key className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            OpenAI API Key Required
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            To use AI-powered grammar checking, you need to provide your OpenAI API key.
          </p>
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <span>Get your API key from OpenAI</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <input
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showApiKey ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        <button
          onClick={handleSaveApiKey}
          disabled={!apiKey.trim()}
          className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm disabled:cursor-not-allowed"
        >
          Save API Key
        </button>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Your API key is stored locally in your browser and never sent to our servers.
        </p>
      </div>
    </div>
  );
};