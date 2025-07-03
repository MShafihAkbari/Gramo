import React from 'react';
import { Loader2 } from 'lucide-react';

interface OutputDisplayProps {
  text: string;
  isProcessing: boolean;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
  text,
  isProcessing,
}) => {
  if (isProcessing) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">Processing your text...</p>
        </div>
      </div>
    );
  }

  if (!text) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600">
        <p className="text-gray-500 dark:text-gray-400">
          Your refined text will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="h-64 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 overflow-y-auto">
      <div className="whitespace-pre-wrap text-gray-900 dark:text-white leading-relaxed">
        {text}
      </div>
    </div>
  );
};