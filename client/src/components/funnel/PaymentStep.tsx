import { useState, useEffect } from "react";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { FunnelData } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";

// Initialize Stripe outside component to avoid recreation on renders
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

type PaymentFormProps = {
  data: FunnelData;
  onPrev: () => void;
  onComplete: () => void;
};

const PaymentForm = ({ data, onPrev, onComplete }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  
  const getPlanDetails = () => {
    switch (data.selectedPlan) {
      case "starter":
        return { name: "Starter Plan", price: "$997/mo" };
      case "growth":
        return { name: "Growth Plan", price: "$1,997/mo" };
      case "enterprise":
        return { name: "Enterprise Plan", price: "$3,997/mo" };
      default:
        return { name: "Growth Plan", price: "$1,997/mo" };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!cardholderName || !billingAddress || !city || !postalCode) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Register the customer first
      await apiRequest("POST", "/api/register-customer", {
        ...data.businessInfo,
        plan: data.selectedPlan,
        billingInfo: {
          cardholderName,
          billingAddress,
          city,
          postalCode,
        }
      });

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout?success=true`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "An error occurred during payment processing",
          variant: "destructive",
        });
      } else {
        onComplete();
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const planDetails = getPlanDetails();

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Payment Details</h3>
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-base font-medium text-gray-900">{planDetails.name}</h4>
            <p className="text-sm text-gray-500">Monthly subscription</p>
          </div>
          <div className="text-base font-medium text-gray-900">{planDetails.price}</div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label htmlFor="card_holder">Cardholder Name</Label>
          <Input 
            id="card_holder" 
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Name on card" 
            required 
          />
        </div>
        
        <div>
          <Label htmlFor="card_element">Card Information</Label>
          <div className="mt-1 p-3 border border-gray-300 rounded-md bg-white">
            <PaymentElement />
          </div>
        </div>
        
        <div>
          <Label htmlFor="billing_address">Billing Address</Label>
          <Input 
            id="billing_address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            placeholder="Street address" 
            required 
          />
        </div>
        
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="postal_code">ZIP / Postal</Label>
            <Input 
              id="postal_code" 
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required 
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev} disabled={isProcessing}>
          Back
        </Button>
        <Button type="submit" disabled={!stripe || isProcessing}>
          {isProcessing ? "Processing..." : "Complete Purchase"}
        </Button>
      </div>
    </form>
  );
};

const PaymentStep = ({ data, onPrev, onComplete }: PaymentFormProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const getPlanAmount = () => {
      switch (data.selectedPlan) {
        case "starter": return 997 * 100;
        case "growth": return 1997 * 100;
        case "enterprise": return 3997 * 100;
        default: return 1997 * 100;
      }
    };

    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", {
          amount: getPlanAmount() / 100, // Amount in dollars, converted to cents by the API
          plan: data.selectedPlan,
        });
        
        const responseData = await response.json();
        setClientSecret(responseData.clientSecret);
      } catch (error) {
        toast({
          title: "Payment initialization failed",
          description: "Unable to initialize payment process. Please try again.",
          variant: "destructive",
        });
      }
    };

    createPaymentIntent();
  }, [data.selectedPlan, toast]);

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm data={data} onPrev={onPrev} onComplete={onComplete} />
    </Elements>
  );
};

export default PaymentStep;
