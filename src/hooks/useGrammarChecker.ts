import { useState } from 'react';
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

export const useGrammarChecker = () => {
  const [isLoading, setIsLoading] = useState(false);

  const refineText = async (
    text: string, 
    tone: 'neutral' | 'formal' | 'casual',
    onStream?: (chunk: string) => void
  ): Promise<string> => {
    setIsLoading(true);
    
    try {
      const refinedText = await refineWithGitHubAI(text, tone, onStream);
      return refinedText;
    } finally {
      setIsLoading(false);
    }
  };

  const refineWithGitHubAI = async (
    text: string, 
    tone: 'neutral' | 'formal' | 'casual',
    onStream?: (chunk: string) => void
  ): Promise<string> => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    
    if (!token) {
      throw new Error('GitHub token is not configured. Please check your environment variables.');
    }

    const endpoint = "https://models.inference.ai.azure.com";
    const model = "gpt-4o";

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
      const client = ModelClient(endpoint, new AzureKeyCredential(token));

      const response = await client.path("/chat/completions").post({
        body: {
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text }
          ],
          temperature: 0.3,
          top_p: 0.9,
          max_tokens: 2000,
          model: model,
          stream: true
        }
      });

      if (isUnexpected(response)) {
        throw new Error(`GitHub AI API error: ${response.body?.error?.message || 'Unknown error'}`);
      }

      let fullResponse = '';
      
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                
                if (content) {
                  fullResponse += content;
                  if (onStream) {
                    onStream(content);
                  }
                }
              } catch (e) {
                // Skip invalid JSON lines
                continue;
              }
            }
          }
        }
      }

      return fullResponse.trim();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Failed to connect to GitHub AI API. Please check your internet connection.');
      }
    }
  };

  return { refineText, isLoading };
};