
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Key } from "lucide-react";
import { openaiService } from '@/services/openaiService';
import { toast } from '@/hooks/use-toast';

const ApiKeyInput = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);

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

  return (
    <div className="flex space-x-2 items-center">
      <Input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter OpenAI API key"
        className="bg-white/5 border-white/10"
      />
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
