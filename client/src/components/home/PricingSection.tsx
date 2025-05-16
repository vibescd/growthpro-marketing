import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses just getting started",
    price: "$997",
    featured: false,
    features: [
      "Basic marketing strategy",
      "1 sales funnel setup",
      "Email sequence (5 emails)",
      "Basic analytics dashboard",
      "Monthly strategy call",
    ],
  },
  {
    name: "Growth",
    description: "For established businesses ready to scale",
    price: "$1,997",
    featured: true,
    features: [
      "Comprehensive marketing strategy",
      "2 sales funnels setup",
      "Email sequence (10 emails)",
      "Advanced analytics & reporting",
      "Bi-weekly strategy calls",
      "A/B testing & optimization",
    ],
  },
  {
    name: "Enterprise",
    description: "Custom solutions for larger organizations",
    price: "$3,997",
    featured: false,
    features: [
      "Custom marketing strategy",
      "Multiple funnel systems",
      "Advanced email automation",
      "Custom reporting dashboard",
      "Weekly strategy calls",
      "Dedicated account manager",
      "Priority support",
    ],
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Pricing Plans
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Choose the plan that works best for your business needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg ${
                plan.featured ? "shadow-xl ring-2 ring-primary" : "shadow-lg"
              } overflow-hidden`}
            >
              {plan.featured && (
                <div className="px-6 py-1 bg-primary">
                  <p className="text-center text-sm font-medium text-white">
                    Most Popular
                  </p>
                </div>
              )}
              <div className="px-6 py-8">
                <h3 className="text-2xl font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-[#10B981]" />
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <a href="#start-funnel">
                  <Button
                    variant={plan.featured ? "default" : "outline"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
