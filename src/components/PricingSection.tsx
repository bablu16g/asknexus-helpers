
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  highlighted?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Basic access for occasional help",
    features: [
      { text: "3 questions per month", included: true },
      { text: "Standard response time (24h)", included: true },
      { text: "Access to basic subjects", included: true },
      { text: "Community support", included: true },
      { text: "Priority answers", included: false },
      { text: "Advanced subjects access", included: false },
      { text: "24/7 priority support", included: false },
      { text: "Solution archives access", included: false },
    ],
    buttonText: "Get Started",
  },
  {
    name: "Premium",
    price: "$19.99",
    description: "Comprehensive access for students",
    features: [
      { text: "Unlimited questions", included: true },
      { text: "Fast response time (12h)", included: true },
      { text: "Access to all subjects", included: true },
      { text: "Community support", included: true },
      { text: "Priority answers", included: true },
      { text: "Advanced subjects access", included: true },
      { text: "24/7 priority support", included: false },
      { text: "Solution archives access", included: false },
    ],
    buttonText: "Go Premium",
    highlighted: true,
    badge: "Popular",
  },
  {
    name: "Ultimate",
    price: "$39.99",
    description: "Complete solution for serious students",
    features: [
      { text: "Unlimited questions", included: true },
      { text: "Express response time (4h)", included: true },
      { text: "Access to all subjects", included: true },
      { text: "Community support", included: true },
      { text: "Priority answers", included: true },
      { text: "Advanced subjects access", included: true },
      { text: "24/7 priority support", included: true },
      { text: "Solution archives access", included: true },
    ],
    buttonText: "Go Ultimate",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your academic needs. Upgrade or downgrade anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.name.toLowerCase()}
              className={cn(
                "glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px]",
                plan.highlighted ? "ring-2 ring-nexus-500 dark:ring-nexus-400 md:scale-105" : ""
              )}
            >
              <div className="relative h-full flex flex-col">
                {plan.badge && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-nexus-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      {plan.badge}
                    </div>
                  </div>
                )}
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-2">
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      /month
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.description}
                  </p>
                  
                  <Link to="/student/register" className="block">
                    <Button 
                      className={cn(
                        "w-full rounded-full transition-colors duration-300",
                        plan.highlighted 
                          ? "bg-nexus-500 hover:bg-nexus-600 text-white" 
                          : "bg-secondary hover:bg-secondary/80"
                      )}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </div>
                
                <div className="p-6 pt-0 flex-grow">
                  <div className="border-t border-border pt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check 
                            className={cn(
                              "h-5 w-5 mr-2 flex-shrink-0",
                              feature.included 
                                ? "text-green-500" 
                                : "text-gray-300 dark:text-gray-600"
                            )} 
                          />
                          <span className={feature.included ? "" : "text-muted-foreground"}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            All plans include access to our mobile app, email notifications, and basic student support. 
            Premium and Ultimate plans auto-renew but can be canceled anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
