import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Goals } from "@/lib/types";

const formSchema = z.object({
  generateLeads: z.boolean().default(false),
  improveConversion: z.boolean().default(false),
  increaseRetention: z.boolean().default(false),
  boostOrderValue: z.boolean().default(false),
  budget: z.string().min(1, "Please select a budget range"),
});

type Props = {
  data: Goals;
  onUpdate: (data: Goals) => void;
  onNext: () => void;
  onPrev: () => void;
};

const GoalsStep = ({ data, onUpdate, onNext, onPrev }: Props) => {
  const form = useForm<Goals>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      generateLeads: data.generateLeads,
      improveConversion: data.improveConversion,
      increaseRetention: data.increaseRetention,
      boostOrderValue: data.boostOrderValue,
      budget: data.budget || "",
    },
  });

  const onSubmit = (values: Goals) => {
    onUpdate(values);
    onNext();
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">What are your main goals?</h3>
      <p className="text-sm text-gray-500 mb-6">Select all that apply to your business</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="generateLeads"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 hover:bg-slate-50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium text-gray-700">Generate more leads</FormLabel>
                  <p className="text-gray-500 text-sm">Attract more qualified prospects to your business</p>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="improveConversion"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 hover:bg-slate-50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium text-gray-700">Improve conversion rates</FormLabel>
                  <p className="text-gray-500 text-sm">Turn more prospects into paying customers</p>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="increaseRetention"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 hover:bg-slate-50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium text-gray-700">Increase customer retention</FormLabel>
                  <p className="text-gray-500 text-sm">Keep customers longer and reduce churn</p>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="boostOrderValue"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 hover:bg-slate-50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium text-gray-700">Boost average order value</FormLabel>
                  <p className="text-gray-500 text-sm">Increase the amount customers spend with you</p>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Marketing Budget</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="under_5k">Under $5,000</SelectItem>
                    <SelectItem value="5k_10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10k_25k">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25k_50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="over_50k">Over $50,000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="mt-8 flex justify-between">
            <Button type="button" variant="outline" onClick={onPrev}>
              Back
            </Button>
            <Button type="submit">
              Continue to Plan Selection
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GoalsStep;
