import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Testimonials", href: "/#testimonials" },
];

const Header = () => {
  const [location] = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/#home" && location === "/") return true;
    return location.includes(href.replace("/#", ""));
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-primary cursor-pointer">GrowthPro</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? "border-b-2 border-primary text-primary"
                      : "border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 border-b-2"
                  } px-1 pt-1 inline-flex items-center text-sm font-medium`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <a href="/#start-funnel">
              <Button variant="default" className="ml-3">
                Get Started
              </Button>
            </a>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[350px]">
                <div className="pt-2 pb-3 space-y-1">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`${
                        isActive(item.href)
                          ? "bg-primary border-primary text-white"
                          : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                      } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a href="/#start-funnel" onClick={() => setIsSheetOpen(false)}>
                    <Button variant="default" className="w-full mt-4">
                      Get Started
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
