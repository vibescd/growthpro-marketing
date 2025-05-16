import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  plan: z.enum(["starter", "growth", "enterprise"]),
});

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    price: "$997/month",
    recommended: false,
  },
  {
    id: "growth",
    name: "Growth Plan",
    price: "$1,997/month",
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: "$3,997/month",
    recommended: false,
  },
];

type Props = {
  selectedPlan: string;
  onUpdate: (plan: string) => void;
  onNext: () => void;
  onPrev: () => void;
};

const PlanSelectionStep = ({ selectedPlan, onUpdate, onNext, onPrev }: Props) => {
  const form = useForm<{ plan: "starter" | "growth" | "enterprise" }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plan: (selectedPlan as "starter" | "growth" | "enterprise") || "growth",
    },
  });

  const onSubmit = (values: { plan: "starter" | "growth" | "enterprise" }) => {
    onUpdate(values.plan);
    onNext();
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Choose your growth plan</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-4">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-4"
                  >
                    {plans.map((plan) => (
                      <FormItem
                        key={plan.id}
                        className={`relative border rounded-lg ${
                          field.value === plan.id ? "border-primary" : "border-gray-300"
                        } bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-primary focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary`}
                      >
                        <FormControl>
                          <RadioGroupItem value={plan.id} id={plan.id} className="peer sr-only" />
                        </FormControl>
                        <FormLabel
                          htmlFor={plan.id}
                          className="flex-1 min-w-0 cursor-pointer"
                        >
                          <p className="text-sm font-medium text-gray-900">{plan.name}</p>
                          <p className="text-sm text-gray-500 truncate">{plan.price}</p>
                        </FormLabel>
                        {plan.recommended && (
                          <Badge className="bg-primary text-white">
                            Recommended
                          </Badge>
                        )}
                      </FormItem>
                    ))}
                  </RadioGroup>
                </div>
              </FormItem>
            )}
          />
          
          <div className="mt-8 flex justify-between">
            <Button type="button" variant="outline" onClick={onPrev}>
              Back
            </Button>
            <Button type="submit">
              Continue to Payment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PlanSelectionStep;
