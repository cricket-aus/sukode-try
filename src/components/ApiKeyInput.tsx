
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Key } from "lucide-react";
import { openaiService } from '@/services/openaiService';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ApiKeyInputProps {
  onModelChange?: (model: string) => void;
  defaultModel?: string;
}

const ApiKeyInput = ({ onModelChange, defaultModel = 'gpt-4o-mini' }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const [selectedModel, setSelectedModel] = useState(defaultModel);

  useEffect(() => {
    // Check if we already have a key in session storage
    const savedKey = sessionStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeySet(true);
    }
  }, []);

  const handleSetApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive"
      });
      return;
    }

    openaiService.setApiKey(apiKey.trim());
    setIsKeySet(true);
    toast({
      title: "Success",
      description: "API key set successfully",
    });
  };

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    if (onModelChange) {
      onModelChange(value);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 items-center">
      <div className="flex-1 w-full">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter OpenAI API key"
          className="bg-white/5 border-white/10"
        />
      </div>
      <Select value={selectedModel} onValueChange={handleModelChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
          <SelectItem value="gpt-4o">GPT-4o</SelectItem>
          <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        onClick={handleSetApiKey}
        size="sm"
        className={isKeySet ? "bg-green-600 hover:bg-green-700" : ""}
      >
        {isKeySet ? <Check className="h-4 w-4 mr-1" /> : <Key className="h-4 w-4 mr-1" />}
        {isKeySet ? "Set" : "Set Key"}
      </Button>
    </div>
  );
};

export default ApiKeyInput;
