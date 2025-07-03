import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export const exportToPDF = (text: string) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  
  // Split text into lines that fit the page width
  const lines = doc.splitTextToSize(text, maxWidth);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(lines, margin, margin);
  
  doc.save('gramo-refined-text.pdf');
};

export const exportToWord = async (text: string) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: text,
                font: 'Calibri',
                size: 24, // 12pt in half-points
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'gramo-refined-text.docx');
};

export const exportToText = (text: string) => {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'gramo-refined-text.txt');
};