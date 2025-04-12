import OpenAI from 'openai';

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
  private selectedModel: string = 'gpt-4-turbo-preview';
  private client: OpenAI | null = null;

  private getClient(): OpenAI {
    if (!this.client) {
      const apiKey = this.getApiKey();
      if (!apiKey) {
        throw new Error('API key not set. Please set your OpenAI API key first.');
      }
      this.client = new OpenAI({ apiKey });
    }
    return this.client;
  }

  setApiKey(key: string) {
    this.apiKey = key;
    this.client = null; // Reset client so it will be recreated with new key
    sessionStorage.setItem('openai_api_key', key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = sessionStorage.getItem('openai_api_key');
    }
    return this.apiKey;
  }

  setModel(model: string) {
    this.selectedModel = model;
    sessionStorage.setItem('openai_selected_model', model);
  }

  getModel(): string {
    const storedModel = sessionStorage.getItem('openai_selected_model');
    if (storedModel) {
      this.selectedModel = storedModel;
    }
    return this.selectedModel;
  }

  async generateCode({ prompt, model }: CodeGenRequest): Promise<string> {
    const useModel = model || this.getModel();
    
    try {
      const completion = await this.getClient().chat.completions.create({
        model: useModel,
        messages: [
          {
            role: 'system',
            content: 
              'You are an expert programming assistant. Your task is to generate high-quality, ' +
              'production-ready code based on the user\'s requirements. Follow these guidelines:\n' +
              '1. Write clean, efficient, and well-documented code\n' +
              '2. Include type definitions where appropriate\n' +
              '3. Follow modern best practices and patterns\n' +
              '4. Add necessary error handling\n' +
              '5. Respond with only the code implementation, no explanations\n' +
              '6. Use markdown code blocks with appropriate language tags'
          },
          {
            role: 'user',
            content: `Generate code for the following requirement:\n${prompt}`
          }
        ],
        temperature: 0.2,
        max_tokens: 4000
      });

      const content = completion.choices[0]?.message?.content || '';
      
      // Extract code from markdown code blocks
      const codeBlockRegex = /```(?:\w+)?\s*([\s\S]*?)```/g;
      const matches = [...content.matchAll(codeBlockRegex)];
      
      if (matches.length > 0) {
        return matches.map(match => match[1].trim()).join('\n\n');
      }
      
      return content.trim();
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }
}

export const openaiService = new OpenAIService();
