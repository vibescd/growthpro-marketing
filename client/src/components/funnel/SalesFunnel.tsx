import { useState } from "react";
import BusinessInfoStep from "./BusinessInfoStep";
import GoalsStep from "./GoalsStep";
import PlanSelectionStep from "./PlanSelectionStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import { FunnelData } from "@/lib/types";

// Initial empty state for the funnel data
const initialFunnelData: FunnelData = {
  businessInfo: {
    businessName: "",
    businessWebsite: "",
    industry: "",
    contactName: "",
    email: "",
  },
  goals: {
    generateLeads: false,
    improveConversion: false,
    increaseRetention: false,
    boostOrderValue: false,
    budget: "",
  },
  selectedPlan: "growth",
};

const SalesFunnel = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [funnelData, setFunnelData] = useState<FunnelData>(initialFunnelData);

  // Define the steps for the progress indicators
  const steps = [
    { id: "step1", name: "Business Info" },
    { id: "step2", name: "Goals" },
    { id: "step3", name: "Plan Selection" },
    { id: "step4", name: "Payment" },
  ];

  // Update funnel data based on step
  const updateFunnelData = (stepData: Partial<FunnelData>) => {
    setFunnelData(prevData => ({
      ...prevData,
      ...stepData
    }));
  };

  // Handle next step
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  // Handle previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <section id="start-funnel" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Start Your Growth Journey Today
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Get your personalized marketing strategy and start seeing results in as little as 30 days.
            </p>
            
            <div className="mt-6">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                className="w-full rounded-lg shadow"
                alt="Digital marketing analytics dashboard"
              />
            </div>
            
            <div className="mt-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gray-100 text-[#10B981]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  <strong className="text-gray-700">100% Secure Checkout</strong><br />
                  All payments are processed securely through Stripe
                </p>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gray-100 text-[#10B981]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"></path>
                    <path d="M16 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2"></path>
                  </svg>
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  <strong className="text-gray-700">30-Day Money-Back Guarantee</strong><br />
                  Not satisfied? Get a full refund within 30 days
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:col-span-7">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              {/* Step Indicator */}
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex items-center">
                  <nav className="flex" aria-label="Progress">
                    <ol className="flex items-center w-full">
                      {steps.map((step, index) => (
                        <li key={step.id} className={`relative ${index < steps.length - 1 ? "pr-8 sm:pr-20 flex-1" : "flex-1"}`}>
                          <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className={`h-0.5 w-full ${index < currentStep ? "bg-primary" : "bg-gray-200"}`}></div>
                          </div>
                          <div
                            className={`relative w-8 h-8 flex items-center justify-center rounded-full ${
                              index <= currentStep ? "bg-primary" : "bg-white border-2 border-gray-300"
                            }`}
                          >
                            <span className={`h-2.5 w-2.5 ${index <= currentStep ? "bg-white" : "bg-transparent"} rounded-full`} aria-hidden="true"></span>
                            <span className="absolute top-10 text-sm font-medium text-gray-500 whitespace-nowrap">
                              {step.name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </div>

              {/* Form Steps Content */}
              <div className="p-6">
                {currentStep === 0 && (
                  <BusinessInfoStep 
                    data={funnelData.businessInfo} 
                    onUpdate={data => updateFunnelData({ businessInfo: data })} 
                    onNext={nextStep}
                  />
                )}
                
                {currentStep === 1 && (
                  <GoalsStep 
                    data={funnelData.goals} 
                    onUpdate={data => updateFunnelData({ goals: data })} 
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}
                
                {currentStep === 2 && (
                  <PlanSelectionStep 
                    selectedPlan={funnelData.selectedPlan} 
                    onUpdate={plan => updateFunnelData({ selectedPlan: plan })} 
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}
                
                {currentStep === 3 && (
                  <PaymentStep 
                    data={funnelData} 
                    onPrev={prevStep}
                    onComplete={() => setCurrentStep(4)}
                  />
                )}
                
                {currentStep === 4 && (
                  <ConfirmationStep />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesFunnel;
