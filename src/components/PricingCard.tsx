
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText?: string;
  className?: string;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  buttonText = "Get Started",
  className,
}: PricingCardProps) => {
  return (
    <div className={cn(
      "rounded-xl p-6 glass-morphism relative",
      "transition-all duration-300 hover:shadow-xl",
      isPopular && "border-cerebras-400/50 bg-white/10",
      className
    )}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cerebras-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
          MOST POPULAR
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-white/70">/month</span>}
      </div>
      
      <p className="text-white/70 mb-6">{description}</p>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className={cn(
              "w-5 h-5 mt-0.5",
              feature.included ? "text-cerebras-300" : "text-gray-600"
            )} />
            <span className={feature.included ? "text-white/90" : "text-white/40 line-through"}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={cn(
          "w-full mt-auto",
          isPopular 
            ? "bg-cerebras-400 hover:bg-cerebras-500 text-white" 
            : "bg-white/10 hover:bg-white/20 text-white"
        )}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;
