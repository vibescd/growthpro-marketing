import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";

const initialFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  businessName: z.string().min(2, "Business name is required"),
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional(),
});

type InitialFormValues = z.infer<typeof initialFormSchema>;

const HeroSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InitialFormValues>({
    resolver: zodResolver(initialFormSchema),
    defaultValues: {
      email: "",
      businessName: "",
      website: "",
    },
  });

  const onSubmit = async (data: InitialFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/leads", {
        email: data.email,
        businessName: data.businessName,
        website: data.website || undefined,
      });
      
      toast({
        title: "Success!",
        description: "Your information has been submitted. We'll contact you shortly.",
      });
      
      form.reset();
      
      // Scroll to funnel section
      const funnelElement = document.getElementById("start-funnel");
      if (funnelElement) {
        funnelElement.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="home" className="bg-gradient-to-r from-blue-50 to-indigo-50 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl">
              <span className="block">Grow Your Business</span>
              <span className="block text-primary">With Data-Driven Marketing</span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Transform your marketing strategy with our proven, results-oriented approach. We help businesses increase conversion rates by up to 300% using our proprietary funnel methodology.
            </p>
            <div className="mt-8 sm:mt-10">
              <a href="#start-funnel">
                <Button className="px-6 py-6 shadow-lg">
                  Start Your Growth Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <p className="mt-3 text-sm text-gray-500">
                <CheckCircle className="inline mr-1 h-4 w-4 text-[#10B981]" /> No credit card required to start
              </p>
            </div>
            <div className="mt-6">
              <div className="inline-flex items-center">
                <div className="flex -space-x-1 overflow-hidden">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
                    alt="Customer"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
                    alt="Customer"
                  />
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
                    alt="Customer"
                  />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">
                  Trusted by 2,000+ businesses
                </span>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6">
            <Card className="sm:max-w-md sm:w-full sm:mx-auto shadow-xl">
              <CardContent className="px-4 py-8 sm:px-10">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-900">Free Marketing Assessment</h2>
                  <p className="mt-1 text-sm text-gray-600">Get your personalized growth plan</p>
                </div>
                <div className="mt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="email" className="sr-only">Email</Label>
                            <FormControl>
                              <Input 
                                placeholder="Your email address" 
                                type="email" 
                                {...field} 
                                required 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="businessName" className="sr-only">Business Name</Label>
                            <FormControl>
                              <Input 
                                placeholder="Your business name" 
                                {...field} 
                                required 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="website" className="sr-only">Website</Label>
                            <FormControl>
                              <Input 
                                placeholder="Your website URL (optional)" 
                                type="url" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Get Your Free Assessment"}
                      </Button>
                    </form>
                  </Form>
                  <p className="mt-4 text-xs text-center text-gray-500">
                    By signing up, you agree to our{" "}
                    <a href="#" className="text-primary font-medium hover:text-blue-700">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary font-medium hover:text-blue-700">
                      Terms of Service
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
