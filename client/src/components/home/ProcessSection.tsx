import { Button } from "@/components/ui/button";

const ProcessSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Our Process
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            How Our Marketing Funnel Works
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our proven 4-step process has helped hundreds of businesses achieve predictable growth.
          </p>
        </div>

        <div className="mt-16 relative">
          <div className="hidden md:block absolute inset-0">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:grid md:grid-cols-2 md:gap-x-8">
              <div className="md:col-start-2 md:pl-8">
                <div className="max-w-2xl mx-auto lg:max-w-none">
                  <div className="space-y-16">
                    {/* Step 1 */}
                    <div className="relative">
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                        <span className="text-lg font-bold">1</span>
                      </div>
                      <div className="ml-16">
                        <h3 className="text-lg font-medium text-gray-900">Attract & Capture</h3>
                        <p className="mt-2 text-base text-gray-500">
                          We create targeted content and lead magnets to attract your ideal customers and capture their information.
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative">
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                        <span className="text-lg font-bold">2</span>
                      </div>
                      <div className="ml-16">
                        <h3 className="text-lg font-medium text-gray-900">Nurture & Educate</h3>
                        <p className="mt-2 text-base text-gray-500">
                          We build trust through educational content that addresses pain points and demonstrates your expertise.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative">
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                        <span className="text-lg font-bold">3</span>
                      </div>
                      <div className="ml-16">
                        <h3 className="text-lg font-medium text-gray-900">Convert & Sell</h3>
                        <p className="mt-2 text-base text-gray-500">
                          We present compelling offers with clear value propositions that drive qualified leads to purchase.
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative">
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                        <span className="text-lg font-bold">4</span>
                      </div>
                      <div className="ml-16">
                        <h3 className="text-lg font-medium text-gray-900">Delight & Expand</h3>
                        <p className="mt-2 text-base text-gray-500">
                          We create post-purchase experiences that turn customers into advocates and drive additional revenue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 md:mt-0">
                <div className="px-4 py-8 bg-white rounded-lg shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
                    className="w-full rounded-lg shadow"
                    alt="Marketing funnel visualization"
                  />
                  <div className="mt-6 text-center">
                    <h4 className="text-lg font-medium text-gray-900">
                      The GrowthPro Funnel System
                    </h4>
                    <p className="mt-2 text-sm text-gray-500">
                      Our data-driven approach converts more visitors into paying customers
                    </p>
                    <a href="#start-funnel">
                      <Button className="mt-4">
                        Start Building Your Funnel
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
