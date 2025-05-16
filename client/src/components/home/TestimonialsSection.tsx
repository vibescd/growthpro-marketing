import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "GrowthPro transformed our marketing strategy. We've seen a 215% increase in qualified leads and our conversion rate has doubled.",
    name: "Sarah Johnson",
    title: "CEO, TechSolutions Inc.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
  },
  {
    quote: "Their sales funnel approach revolutionized how we connect with customers. Our ROI increased by 180% within just 3 months.",
    name: "Michael Chen",
    title: "Founder, EcoProducts",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
  },
  {
    quote: "The email automation sequences they built have generated consistent sales on autopilot. Best investment we've made in our business.",
    name: "Jennifer Lopez",
    title: "Marketing Director, StyleShop",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Clients Say
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Businesses like yours have achieved extraordinary results with our marketing approach.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="mt-3">
                <p className="text-lg text-gray-700 italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>
              <div className="mt-4 flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
