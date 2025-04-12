
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  onClick?: () => void;
}

const FeatureCard = ({ title, description, icon: Icon, className, onClick }: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-xl p-6 glass-morphism transition-all duration-300",
        "hover:bg-white/10 hover:shadow-lg hover:-translate-y-1",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="rounded-full bg-cerebras-500/20 p-3 w-fit mb-4">
        <Icon className="w-6 h-6 text-cerebras-300" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default FeatureCard;
