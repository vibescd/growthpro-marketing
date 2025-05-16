import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { BusinessInfo } from "@/lib/types";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  businessWebsite: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional(),
  industry: z.string().min(1, "Please select an industry"),
  contactName: z.string().min(2, "Your name is required"),
  email: z.string().email("Please enter a valid email address"),
});

type Props = {
  data: BusinessInfo;
  onUpdate: (data: BusinessInfo) => void;
  onNext: () => void;
};

const BusinessInfoStep = ({ data, onUpdate, onNext }: Props) => {
  const form = useForm<BusinessInfo>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: data.businessName || "",
      businessWebsite: data.businessWebsite || "",
      industry: data.industry || "",
      contactName: data.contactName || "",
      email: data.email || "",
    },
  });

  const onSubmit = (values: BusinessInfo) => {
    onUpdate(values);
    onNext();
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Tell us about your business</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Business Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="businessWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourbusiness.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="service">Professional Services</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="mt-8">
            <Button type="submit" className="w-full">
              Continue to Goals
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BusinessInfoStep;
