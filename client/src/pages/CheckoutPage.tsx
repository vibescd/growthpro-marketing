import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet";

const CheckoutPage = () => {
  const [location, navigate] = useLocation();
  
  // Parse the URL search params to check for success or error
  const searchParams = new URLSearchParams(location.split("?")[1]);
  const isSuccess = searchParams.get("success") === "true";
  const errorMessage = searchParams.get("error");

  useEffect(() => {
    // If neither success nor error params exist, redirect to home
    if (!searchParams.has("success") && !searchParams.has("error")) {
      navigate("/");
    }
  }, [location, navigate, searchParams]);

  return (
    <>
      <Helmet>
        <title>{isSuccess ? "Payment Successful" : "Payment Error"} | GrowthPro</title>
        <meta name="description" content={isSuccess ? "Your payment was successful. Thank you for choosing GrowthPro!" : "There was an issue with your payment. Please try again or contact support."} />
      </Helmet>
      
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              {isSuccess ? (
                <>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h1 className="mt-3 text-lg font-medium text-gray-900">Payment Successful!</h1>
                  <p className="mt-2 text-sm text-gray-500">
                    Thank you for choosing GrowthPro. We'll be in touch shortly to get started on your marketing journey.
                  </p>
                </>
              ) : (
                <>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <h1 className="mt-3 text-lg font-medium text-gray-900">Payment Failed</h1>
                  <p className="mt-2 text-sm text-gray-500">
                    {errorMessage || "There was an issue processing your payment. Please try again or contact our support team."}
                  </p>
                </>
              )}
              <div className="mt-5">
                <Button onClick={() => navigate("/")} className="w-full">
                  Return to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CheckoutPage;
