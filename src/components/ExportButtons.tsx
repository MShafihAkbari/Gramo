import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, File } from 'lucide-react';
import { exportToPDF, exportToWord, exportToText } from '../utils/exportUtils';

interface ExportButtonsProps {
  text: string;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ text }) => {
  const exportOptions = [
    {
      label: 'PDF',
      icon: FileText,
      onClick: () => exportToPDF(text),
      gradient: 'from-red-500 to-pink-600',
    },
    {
      label: 'Word',
      icon: File,
      onClick: () => exportToWord(text),
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      label: 'Text',
      icon: Download,
      onClick: () => exportToText(text),
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {exportOptions.map((option, index) => {
        const Icon = option.icon;
        
        return (
          <motion.button
            key={option.label}
            onClick={option.onClick}
            className={`bg-gradient-to-r ${option.gradient} text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Icon className="w-5 h-5" />
            <span>{option.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};