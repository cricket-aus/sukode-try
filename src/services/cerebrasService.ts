import OpenAI from 'openai';

export interface CodeGenRequest {
  prompt: string;
  model?: string;
}

class CerebrasService {
  private apiKey: string | null = null;
  private selectedModel: string = 'llama3.1-8b';
  private client: OpenAI | null = null;

  private getClient(): OpenAI {
    if (!this.client) {
      const apiKey = this.getApiKey();
      if (!apiKey) {
        throw new Error('API key not set. Please set your Cerebras API key first.');
      }
      this.client = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
        baseURL: 'https://api.cerebras.ai/v1'
      });
    }
    return this.client;
  }

  setApiKey(key: string) {
    this.apiKey = key;
    this.client = null; // Reset client to recreate with new key
    sessionStorage.setItem('cerebras_api_key', key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = sessionStorage.getItem('cerebras_api_key');
    }
    return this.apiKey;
  }

  setModel(model: string) {
    this.selectedModel = model;
    sessionStorage.setItem('cerebras_selected_model', model);
  }

  getModel(): string {
    const storedModel = sessionStorage.getItem('cerebras_selected_model');
    if (storedModel) {
      this.selectedModel = storedModel;
    }
    return this.selectedModel;
  }

  async generateCode({ prompt, model }: CodeGenRequest): Promise<string> {
    const useModel = model || this.getModel();

    try {
      const stream = await this.getClient().chat.completions.create({
        model: useModel,
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
        stream: true
      });

      let responseContent = '';


      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        responseContent += content;
      }

      // Extract code from markdown code blocks
      const codeBlockRegex = /```(?:\w+)?\s*([\s\S]*?)```/g;
      const matches = [...responseContent.matchAll(codeBlockRegex)];

      if (matches.length > 0) {
        return matches.map(match => match[1].trim()).join('\n\n');
      }

      return responseContent.trim();
    } catch (error) {
      console.error('Cerebras API error:', error);
      if (error instanceof Error) {
        throw new Error(`Cerebras API error: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while processing your request');
    }
  }
}

export const cerebrasService = new CerebrasService();