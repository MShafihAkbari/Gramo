import React from 'react';
import { User, Briefcase, MessageCircle } from 'lucide-react';

interface ToneSelectorProps {
  selectedTone: 'neutral' | 'formal' | 'casual';
  onToneChange: (tone: 'neutral' | 'formal' | 'casual') => void;
}

export const ToneSelector: React.FC<ToneSelectorProps> = ({
  selectedTone,
  onToneChange,
}) => {
  const tones = [
    {
      id: 'neutral' as const,
      label: 'Neutral',
      icon: User,
      description: 'Keep original tone',
    },
    {
      id: 'formal' as const,
      label: 'Formal',
      icon: Briefcase,
      description: 'Professional & polished',
    },
    {
      id: 'casual' as const,
      label: 'Casual',
      icon: MessageCircle,
      description: 'Friendly & conversational',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {tones.map((tone) => {
        const Icon = tone.icon;
        const isSelected = selectedTone === tone.id;
        
        return (
          <button
            key={tone.id}
            onClick={() => onToneChange(tone.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
              isSelected
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Icon className={`w-6 h-6 mx-auto mb-2 ${
              isSelected ? 'text-primary-600 dark:text-primary-400' : ''
            }`} />
            <div className="text-sm font-medium">{tone.label}</div>
            <div className="text-xs opacity-75 mt-1">{tone.description}</div>
          </button>
        );
      })}
    </div>
  );
};