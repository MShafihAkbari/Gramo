import React from 'react';
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
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      label: 'Word',
      icon: File,
      onClick: () => exportToWord(text),
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      label: 'Text',
      icon: Download,
      onClick: () => exportToText(text),
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {exportOptions.map((option) => {
        const Icon = option.icon;
        
        return (
          <button
            key={option.label}
            onClick={option.onClick}
            className={`${option.color} text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};