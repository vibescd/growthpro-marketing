import { 
  BarChart2, 
  Filter, 
  Target, 
  Mail, 
  PieChart, 
  ArrowLeftRight 
} from "lucide-react";

const services = [
  {
    title: "Marketing Strategy",
    description: "We develop personalized marketing strategies based on your business goals, target audience, and competitive landscape.",
    icon: <BarChart2 />,
  },
  {
    title: "Sales Funnel Design",
    description: "Our conversion-optimized sales funnels guide prospects from awareness to purchase with minimal friction.",
    icon: <Filter />,
  },
  {
    title: "Lead Generation",
    description: "We implement targeted campaigns to attract high-quality leads that are more likely to convert to paying customers.",
    icon: <Target />,
  },
  {
    title: "Email Automation",
    description: "Our automated email sequences nurture leads, build relationships, and drive conversions without constant manual effort.",
    icon: <Mail />,
  },
  {
    title: "Analytics & Reporting",
    description: "We provide detailed analytics and actionable insights to continuously improve your marketing performance.",
    icon: <PieChart />,
  },
  {
    title: "Conversion Optimization",
    description: "We continuously test and optimize your marketing assets to maximize conversion rates and ROI.",
    icon: <ArrowLeftRight />,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Our Services
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            A Better Way to Grow Your Business
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We provide end-to-end marketing solutions that drive real business growth.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="ml-4 text-lg font-medium text-gray-900">{service.title}</h3>
                </div>
                <p className="text-base text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
