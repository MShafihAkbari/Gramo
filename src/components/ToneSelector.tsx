import React from 'react';
import { motion } from 'framer-motion';
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
      description: 'Preserve original tone',
      gradient: 'from-gray-500 to-gray-600',
    },
    {
      id: 'formal' as const,
      label: 'Formal',
      icon: Briefcase,
      description: 'Professional & polished',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      id: 'casual' as const,
      label: 'Casual',
      icon: MessageCircle,
      description: 'Friendly & conversational',
      gradient: 'from-green-500 to-teal-600',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {tones.map((tone) => {
        const Icon = tone.icon;
        const isSelected = selectedTone === tone.id;
        
        return (
          <motion.button
            key={tone.id}
            onClick={() => onToneChange(tone.id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center relative overflow-hidden ${
              isSelected
                ? 'border-white/40 bg-white/10 backdrop-blur-sm'
                : 'border-white/20 hover:border-white/30 hover:bg-white/5'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isSelected && (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${tone.gradient} opacity-20`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            <div className="relative z-10">
              <motion.div
                className="flex justify-center mb-3"
                animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Icon className={`w-8 h-8 ${
                  isSelected ? 'text-white' : 'text-white/70'
                }`} />
              </motion.div>
              
              <div className={`text-lg font-semibold mb-2 ${
                isSelected ? 'text-white' : 'text-white/80'
              }`}>
                {tone.label}
              </div>
              
              <div className={`text-sm ${
                isSelected ? 'text-white/90' : 'text-white/60'
              }`}>
                {tone.description}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};