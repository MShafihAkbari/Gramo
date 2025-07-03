import React from 'react';
import { motion } from 'framer-motion';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <motion.textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-80 p-6 bg-black/20 border border-white/10 rounded-2xl resize-none focus:ring-2 focus:ring-white/30 focus:border-white/30 outline-none transition-all duration-300 backdrop-blur-sm text-white placeholder-white/50 text-lg leading-relaxed custom-scrollbar"
      whileFocus={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    />
  );
};