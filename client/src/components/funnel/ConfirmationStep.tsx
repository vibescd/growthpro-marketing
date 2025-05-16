import { Check } from "lucide-react";

const ConfirmationStep = () => {
  return (
    <div className="text-center py-6">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
        <Check className="h-6 w-6 text-[#10B981]" />
      </div>
      <h3 className="mt-3 text-lg font-medium text-gray-900">Payment successful!</h3>
      <p className="mt-2 text-sm text-gray-500">
        Thank you for choosing GrowthPro. We'll be in touch shortly to get started on your marketing journey.
      </p>
      <div className="mt-5">
        <a href="/" className="text-primary font-medium hover:text-blue-700">
          Return to homepage
        </a>
      </div>
    </div>
  );
};

export default ConfirmationStep;
