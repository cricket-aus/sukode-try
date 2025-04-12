
// OpenAI API service for code generation
interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface CodeGenRequest {
  prompt: string;
  model?: string;
}

class OpenAIService {
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
    // Store in session storage to persist during the session
    sessionStorage.setItem('openai_api_key', key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      // Try to get from session storage
      this.apiKey = sessionStorage.getItem('openai_api_key');
    }
    return this.apiKey;
  }

  async generateCode({ prompt, model = 'gpt-4o-mini' }: CodeGenRequest): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      throw new Error('API key not set. Please set your OpenAI API key first.');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'system',
              content: 'You are a helpful coding assistant. When asked to write code, respond with only the code and no additional explanation. Format your response using markdown code blocks with the appropriate language specified.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.2,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Error calling OpenAI API');
      }

      const data = await response.json() as OpenAIResponse;
      const content = data.choices[0]?.message?.content || '';
      
      // Extract code from markdown code blocks
      const codeBlockRegex = /```(?:\w+)?\s*([\s\S]*?)```/g;
      const matches = [...content.matchAll(codeBlockRegex)];
      
      if (matches.length > 0) {
        return matches.map(match => match[1]).join('\n\n');
      }
      
      return content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }
}

export const openaiService = new OpenAIService();
