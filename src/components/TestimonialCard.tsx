
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  stars: number;
  className?: string;
}

const TestimonialCard = ({ quote, author, role, stars = 5, className }: TestimonialCardProps) => {
  return (
    <div className={cn(
      "rounded-xl p-6 flex flex-col glass-morphism",
      "transition-transform duration-300 hover:-translate-y-1",
      className
    )}>
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-4 h-4",
              i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
            )} 
          />
        ))}
      </div>
      
      <blockquote className="mb-4 text-white/80 italic">"{quote}"</blockquote>
      
      <div className="mt-auto">
        <p className="font-semibold text-white">{author}</p>
        <p className="text-sm text-white/60">{role}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
