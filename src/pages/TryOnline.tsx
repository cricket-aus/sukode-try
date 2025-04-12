
import React, { useState, useRef, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Trash, CopyCheck, Download } from "lucide-react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const defaultCode = `// Try writing some code here
function calculateTotal(items) {
  // Type more and see suggestions appear
  
}`;

const TryOnline = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m CodeWhisperer powered by Cerebras. What would you like help with today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [editorValue, setEditorValue] = useState(defaultCode);
  const [isCopied, setIsCopied] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll chat to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorValue(value);
    }
  };
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (inputMessage.toLowerCase().includes('suggest') || inputMessage.toLowerCase().includes('complete')) {
        response = 'I suggest completing your function like this:\n\n```js\nfunction calculateTotal(items) {\n  return items.reduce((total, item) => {\n    return total + (item.price * (1 - item.discount || 0));\n  }, 0);\n}\n```\n\nThis function uses reduce to sum the prices of all items, taking into account any discount.';
      } else if (inputMessage.toLowerCase().includes('explain') || inputMessage.toLowerCase().includes('how')) {
        response = 'The code you\'re looking at calculates the total price of items in a shopping cart. It uses the reduce method to iterate through each item and accumulate a total sum. For each item, it multiplies the price by one minus the discount (if any) to get the final price after discount.';
      } else {
        response = 'I\'m here to help you write better code. Try asking me to complete or explain code, or I can suggest improvements for your existing code.';
      }
      
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  const handleClearChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Chat cleared. How can I help you with your code today?',
      timestamp: new Date()
    }]);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const copyCode = () => {
    navigator.clipboard.writeText(editorValue);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const downloadCode = () => {
    const blob = new Blob([editorValue], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codewhisperer-example.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cerebras-800/40 via-background to-background pointer-events-none"></div>
      
      <Navbar />
      
      <section className="pt-24 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Try CodeWhisperer Online</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Experience how CodeWhisperer can help you write better code. Chat with the AI assistant and see suggestions in the editor.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto glass-morphism rounded-xl overflow-hidden">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[600px]"
          >
            {/* Chat Panel */}
            <ResizablePanel defaultSize={40} minSize={30}>
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Chat with CodeWhisperer</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleClearChat}
                    title="Clear chat"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Messages */}
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none"
                >
                  {messages.map((message, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "flex max-w-[80%] rounded-lg p-4",
                        message.role === 'user' 
                          ? "bg-cerebras-400/20 ml-auto" 
                          : "bg-white/10"
                      )}
                    >
                      <div>
                        <div className="font-medium">
                          {message.role === 'user' ? 'You' : 'CodeWhisperer'}
                        </div>
                        <div className="mt-1 whitespace-pre-wrap">
                          {message.content}
                        </div>
                        <div className="text-xs text-white/50 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about your code..."
                      className="min-h-[60px] bg-white/5 border-white/10 resize-none"
                    />
                    <Button 
                      className="ml-2 bg-cerebras-400 hover:bg-cerebras-500 self-end"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Press Enter to send. Shift+Enter for new line.
                  </p>
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Editor Panel */}
            <ResizablePanel defaultSize={60} minSize={40}>
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Code Editor</h3>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={copyCode}
                      className="flex items-center gap-1"
                    >
                      {isCopied ? (
                        <>
                          <CopyCheck className="h-4 w-4" /> Copied
                        </>
                      ) : (
                        <>
                          <CopyCheck className="h-4 w-4" /> Copy
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={downloadCode}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    defaultValue={defaultCode}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      wordWrap: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TryOnline;
