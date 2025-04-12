
import React from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  animated?: boolean;
}

const CodeBlock = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
  className,
  animated = false
}: CodeBlockProps) => {
  const lines = code.split('\n');
  
  return (
    <div className={cn(
      "rounded-lg overflow-hidden text-sm font-mono",
      "bg-black/50 border border-white/10",
      className
    )}>
      <div className="flex items-center px-4 py-2 bg-black/30 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="ml-4 text-xs text-white/50">
          {language.toUpperCase()} EXAMPLE
        </div>
      </div>
      
      <div className="p-4 overflow-x-auto">
        <pre className="language-javascript">
          <code>
            {lines.map((line, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex",
                  animated && "opacity-0 animate-fade-in",
                  animated && { 'animation-delay': `${index * 0.1}s` }
                )}
              >
                {showLineNumbers && (
                  <span className="inline-block w-8 text-gray-500 select-none">{index + 1}</span>
                )}
                <span 
                  className={cn(
                    "flex-1",
                    line.includes('//') && "text-gray-400",
                    line.includes('function') && "text-code-300",
                    line.includes('return') && "text-cerebras-300",
                    line.includes('const') && "text-cerebras-200",
                    (line.includes('"') || line.includes("'")) && "text-green-300"
                  )}
                >
                  {line || " "}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
