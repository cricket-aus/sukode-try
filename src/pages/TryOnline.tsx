import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Trash, CopyCheck, Download, Code } from "lucide-react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApiKeyInput from "@/components/ApiKeyInput";
import { cerebrasService } from "@/services/cerebrasService";
import { toast } from "@/hooks/use-toast";

interface ChatMessage {
  role: "user" | "assistant";
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
      role: "assistant",
      content:
        "Hello! I'm Sukode powered by Cerebras. What would you like help with today? Enter your Cerebras API key to use AI code generation.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [editorValue, setEditorValue] = useState(defaultCode);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("llama3.1-8b");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize the model from session storage if available
  useEffect(() => {
    const storedModel = sessionStorage.getItem("cerebras_selected_model");
    if (storedModel) {
      setSelectedModel(storedModel);
    }
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorValue(value);
    }
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    cerebrasService.setModel(model);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsGenerating(true);

    try {
      // Check if API key is set
      if (!cerebrasService.getApiKey()) {
        const assistantResponse: ChatMessage = {
          role: "assistant",
          content:
            "Please set your Cerebras API key first using the input field above.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantResponse]);
        setIsGenerating(false);
        return;
      }

      // Generate code with Cerebras
      const generatedCode = await cerebrasService.generateCode({
        prompt: userMessage.content,
        model: selectedModel,
      });

      // Update editor with generated code
      setEditorValue(generatedCode);

      // Add AI response
      const assistantResponse: ChatMessage = {
        role: "assistant",
        content: `I've generated the code based on your request using ${selectedModel}. You can view it in the editor.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantResponse]);
    } catch (error) {
      console.error("Error generating code:", error);
      // Add error message
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: `Error: ${
          error instanceof Error
            ? error.message
            : "Failed to generate code. Please try again."
        }`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to generate code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared. How can I help you with your code today?",
        timestamp: new Date(),
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(editorValue);
    setIsCopied(true);
    toast({
      title: "Success",
      description: "Code copied to clipboard",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([editorValue], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Sukode-example.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Success",
      description: "Code downloaded successfully",
    });
  };

  const generateCodeFromEditor = async () => {
    if (!editorValue.trim()) {
      toast({
        title: "Error",
        description: "Editor is empty. Please add some code to improve.",
        variant: "destructive",
      });
      return;
    }

    const prompt = `Improve or complete this code: \n\n${editorValue}`;
    const userMessage: ChatMessage = {
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      if (!cerebrasService.getApiKey()) {
        const assistantResponse: ChatMessage = {
          role: "assistant",
          content:
            "Please set your Cerebras API key first using the input field above.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantResponse]);
        setIsGenerating(false);
        return;
      }

      const generatedCode = await cerebrasService.generateCode({
        prompt,
        model: selectedModel,
      });

      setEditorValue(generatedCode);

      const assistantResponse: ChatMessage = {
        role: "assistant",
        content: `I've improved your code using ${selectedModel}. Check the editor to see the changes.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantResponse]);
    } catch (error) {
      console.error("Error generating code:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: `Error: ${
          error instanceof Error
            ? error.message
            : "Failed to generate code. Please try again."
        }`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to improve code",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cerebras-800/40 via-background to-background pointer-events-none"></div>

      <Navbar />

      <section className="pt-24 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Try Sukode Online
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto mb-4">
            Experience how Sukode can help you write better code. Chat with the
            AI assistant and see suggestions in the editor.
          </p>
          <div className="max-w-lg mx-auto">
            <ApiKeyInput
              onModelChange={handleModelChange}
              defaultModel={selectedModel}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto glass-morphism rounded-xl overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
            {/* Chat Panel */}
            <ResizablePanel defaultSize={40} minSize={30}>
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Chat with Sukode</h3>
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
                        message.role === "user"
                          ? "bg-cerebras-400/20 ml-auto"
                          : "bg-white/10"
                      )}
                    >
                      <div>
                        <div className="font-medium">
                          {message.role === "user" ? "You" : "Sukode"}
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

                  {isGenerating && (
                    <div className="bg-white/10 rounded-lg p-4 max-w-[80%] animate-pulse">
                      <div className="font-medium">Sukode</div>
                      <div className="mt-1">Generating code...</div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask for code generation..."
                      className="min-h-[60px] bg-white/5 border-white/10 resize-none"
                      disabled={isGenerating}
                    />
                    <Button
                      className="ml-2 bg-cerebras-400 hover:bg-cerebras-500 self-end"
                      onClick={handleSendMessage}
                      disabled={isGenerating}
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
                      onClick={generateCodeFromEditor}
                      className="flex items-center gap-1"
                      disabled={isGenerating}
                      title="Improve code with AI"
                    >
                      <Code className="h-4 w-4" /> Improve Code
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyCode}
                      className="flex items-center gap-1"
                      disabled={isGenerating}
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
                      disabled={isGenerating}
                    >
                      <Download className="h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>

                <div className="flex-1">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    value={editorValue}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      wordWrap: "on",
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
