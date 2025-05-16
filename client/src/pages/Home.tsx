import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PricingSection from "@/components/home/PricingSection";
import SalesFunnel from "@/components/funnel/SalesFunnel";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>GrowthPro - Digital Marketing Consultancy</title>
        <meta name="description" content="Transform your marketing strategy with our proven, results-oriented approach. Increase conversion rates by up to 300% using our proprietary funnel methodology." />
        <meta property="og:title" content="GrowthPro - Digital Marketing Consultancy" />
        <meta property="og:description" content="Transform your marketing strategy with our proven, results-oriented approach." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <PricingSection />
      <SalesFunnel />
    </>
  );
};

export default Home;
