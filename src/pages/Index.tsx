
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Code, 
  Zap, 
  Lock, 
  Layers, 
  RefreshCw, 
  Database, 
  ChevronRight, 
  Terminal, 
  GitBranch, 
  ArrowRight, 
  Languages
} from "lucide-react";
import Navbar from '@/components/Navbar';
import CodeBlock from '@/components/CodeBlock';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import PricingCard from '@/components/PricingCard';
import Footer from '@/components/Footer';

const codeExample = `// Generate optimized code with Cerebras AI
function generateSolution(problem) {
  // The AI understands your context
  const solution = cerebras.analyze(problem);
  
  // Provides high-quality, idiomatic code
  return solution.optimize({
    performance: true,
    readability: true,
    bestPractices: true
  });
}`;

const completionExample = `// Start typing and let CodeWhisperer complete your code
function calculateTotalPrice(items) {
  // CodeWhisperer suggests the following:
  return items.reduce((total, item) => {
    const price = item.price * (1 - item.discount);
    return total + price;
  }, 0);
}`;

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-white overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cerebras-800/40 via-background to-background pointer-events-none"></div>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <div className="inline-block px-3 py-1 rounded-full bg-cerebras-500/20 text-cerebras-200 font-medium text-sm mb-6">
              Powered by Cerebras Inference Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Code Faster with <span className="text-gradient-cerebras">AI-Powered</span> Intelligence
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-lg">
              Supercharge your development workflow with the smartest AI coding assistant for VS Code, powered by Cerebras state-of-the-art inference technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-cerebras-400 hover:bg-cerebras-500 text-white px-8 py-6 text-lg">
                Install Extension
              </Button>
              <Button variant="outline" className="bg-transparent border-white/20 hover:bg-white/5 text-white px-8 py-6 text-lg">
                Learn More <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-8 text-white/50 text-sm">
              Compatible with all VS Code versions. No account required to start.
            </div>
          </div>
          
          <div className="relative z-10 animate-float">
            <CodeBlock 
              code={codeExample} 
              className="shadow-2xl shadow-cerebras-500/10" 
              animated={true}
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Enhance your coding experience with intelligent features powered by Cerebras' cutting-edge AI technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Smart Code Completion" 
              description="Get context-aware code suggestions that understand your project structure and coding patterns."
              icon={Code}
            />
            <FeatureCard 
              title="Lightning Fast" 
              description="Powered by Cerebras' high-performance inference engine for near-instant responses with minimal latency."
              icon={Zap}
            />
            <FeatureCard 
              title="Secure & Private" 
              description="Your code stays private. All processing happens locally without sending sensitive data to external servers."
              icon={Lock}
            />
            <FeatureCard 
              title="Multi-language Support" 
              description="Works seamlessly with JavaScript, Python, Java, C++, Go, Rust, and many more programming languages."
              icon={Languages}
            />
            <FeatureCard 
              title="Refactoring Assistance" 
              description="Suggest improvements to your code structure, performance optimizations, and best practices."
              icon={RefreshCw}
            />
            <FeatureCard 
              title="Documentation Generation" 
              description="Automatically generate documentation for your functions and classes with detailed explanations."
              icon={Layers}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 md:px-10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              CodeWhisperer seamlessly integrates with your VS Code environment to provide intelligent coding assistance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-10">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cerebras-500/20 flex items-center justify-center">
                    <span className="text-cerebras-300 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Install & Activate</h3>
                    <p className="text-white/70">
                      Install CodeWhisperer from the VS Code marketplace and activate it with a single click.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cerebras-500/20 flex items-center justify-center">
                    <span className="text-cerebras-300 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Code Naturally</h3>
                    <p className="text-white/70">
                      Start typing your code as usual. CodeWhisperer observes your patterns and context.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cerebras-500/20 flex items-center justify-center">
                    <span className="text-cerebras-300 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Receive Suggestions</h3>
                    <p className="text-white/70">
                      Get intelligent code suggestions that match your coding style and project requirements.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cerebras-500/20 flex items-center justify-center">
                    <span className="text-cerebras-300 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Accept or Modify</h3>
                    <p className="text-white/70">
                      Accept suggestions with a tab key or continue typing to modify them according to your needs.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button className="mt-10 bg-cerebras-400 hover:bg-cerebras-500 text-white">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <CodeBlock 
                code={completionExample} 
                className="shadow-2xl shadow-cerebras-500/10" 
                animated={true}
              />
              <div className="absolute -bottom-6 -right-6 z-10">
                <div className="bg-cerebras-400 text-white px-4 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    <span className="font-semibold">Smart Suggestion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Developer Feedback</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              See what developers are saying about their experience with CodeWhisperer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="CodeWhisperer has completely transformed my development workflow. The suggestions are spot-on and the performance is incredible." 
              author="Sarah Johnson"
              role="Senior Frontend Developer"
              stars={5}
            />
            <TestimonialCard 
              quote="I've tried many AI coding assistants, but nothing comes close to the speed and accuracy of CodeWhisperer with Cerebras tech." 
              author="Michael Chen"
              role="Full-Stack Engineer"
              stars={5}
            />
            <TestimonialCard 
              quote="The local processing is a game-changer for our team working with sensitive data. Great suggestions without the privacy concerns." 
              author="Alex Rodriguez"
              role="Security Engineer"
              stars={4}
            />
            <TestimonialCard 
              quote="CodeWhisperer understands my coding style better than any other tool I've used. It feels like having a senior dev pair programming with me." 
              author="Emily Williams"
              role="Software Developer"
              stars={5}
            />
            <TestimonialCard 
              quote="The multi-language support is impressive. Switching between TypeScript, Python and Rust projects and it works seamlessly for all." 
              author="David Kim"
              role="Systems Architect"
              stars={4}
            />
            <TestimonialCard 
              quote="Documentation generation alone has saved our team countless hours. The suggestions are clear, concise and follow our standards." 
              author="Lisa Zhang"
              role="Technical Lead"
              stars={5}
            />
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 md:px-10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Select the plan that best fits your development needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Free" 
              price="Free"
              description="Perfect for individual developers and small projects."
              features={[
                { text: "Basic code completion", included: true },
                { text: "Multi-language support", included: true },
                { text: "Limited suggestions per day", included: true },
                { text: "Community support", included: true },
                { text: "Advanced features", included: false },
                { text: "Priority updates", included: false },
              ]}
              buttonText="Download Free"
            />
            
            <PricingCard 
              title="Pro" 
              price="$9.99"
              description="Advanced features for professional developers."
              features={[
                { text: "Unlimited code suggestions", included: true },
                { text: "Advanced completions", included: true },
                { text: "Documentation generation", included: true },
                { text: "Code refactoring assistance", included: true },
                { text: "Email support", included: true },
                { text: "Team collaboration", included: false },
              ]}
              isPopular={true}
              buttonText="Start Pro Trial"
            />
            
            <PricingCard 
              title="Team" 
              price="$24.99"
              description="Enterprise-grade features for development teams."
              features={[
                { text: "Everything in Pro", included: true },
                { text: "Team collaboration", included: true },
                { text: "Custom model fine-tuning", included: true },
                { text: "Advanced security controls", included: true },
                { text: "Priority support", included: true },
                { text: "Custom integrations", included: true },
              ]}
              buttonText="Contact Sales"
            />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-white/60 mb-4">
              All plans come with a 14-day free trial. No credit card required.
            </p>
            <a href="#" className="text-cerebras-300 hover:text-cerebras-200 underline">
              View full plan details
            </a>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center glass-morphism rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Coding Experience?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have already enhanced their productivity with CodeWhisperer powered by Cerebras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-cerebras-400 hover:bg-cerebras-500 text-white px-8 py-6 text-lg">
              Install Extension
            </Button>
            <Button variant="outline" className="bg-transparent border-white/20 hover:bg-white/5 text-white px-8 py-6 text-lg">
              View Documentation
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
