import { useState } from 'react';

export const useGrammarChecker = () => {
  const [isLoading, setIsLoading] = useState(false);

  const refineText = async (text: string, tone: 'neutral' | 'formal' | 'casual'): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Use OpenAI GPT-4 for comprehensive text refinement
      const refinedText = await refineWithAI(text, tone);
      return refinedText;
    } finally {
      setIsLoading(false);
    }
  };

  const refineWithAI = async (text: string, tone: 'neutral' | 'formal' | 'casual'): Promise<string> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
    }

    const toneInstructions = {
      neutral: 'Maintain the original tone and style while fixing errors.',
      formal: 'Make the text more formal, professional, and polished.',
      casual: 'Make the text more casual, friendly, and conversational.'
    };

    const systemPrompt = `You are an expert grammar, punctuation, and spelling checker. Your task is to:

1. Fix all grammar errors
2. Correct punctuation mistakes
3. Fix spelling errors
4. Improve sentence structure and clarity
5. ${toneInstructions[tone]}

Important guidelines:
- Preserve the original meaning and intent
- Only make necessary corrections and improvements
- Return only the corrected text without explanations
- Maintain the original formatting (paragraphs, line breaks)`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: text
            }
          ],
          temperature: 0.3,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401) {
          throw new Error('Invalid OpenAI API key. Please check your VITE_OPENAI_API_KEY environment variable.');
        } else if (response.status === 429) {
          throw new Error('OpenAI API rate limit exceeded. Please try again in a moment.');
        } else if (response.status === 403) {
          throw new Error('OpenAI API access denied. Please check your API key permissions.');
        } else {
          throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
        }
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response from OpenAI API');
      }

      return data.choices[0].message.content.trim();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Failed to connect to OpenAI API. Please check your internet connection.');
      }
    }
  };

  return { refineText, isLoading };
};