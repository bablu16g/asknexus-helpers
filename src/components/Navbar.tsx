
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "glass-card shadow-md py-2" 
        : "bg-transparent backdrop-blur-sm py-4"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group" onClick={() => setIsMenuOpen(false)}>
              <img 
                src="/lovable-uploads/1f9406a2-356b-4351-b6a8-86d2b32da5f3.png" 
                alt="AskNexus Logo" 
                className="h-10 w-auto mr-3 transition-all duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient transition-all duration-300 group-hover:scale-105">AskNexus</span>
                <span className="text-xs text-muted-foreground">Ask. Learn. Succeed</span>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/how-it-works" className={cn("nav-link", isActive("/how-it-works") && "text-nexus-600 dark:text-nexus-400")}>How It Works</Link>
            <Link to="/subjects" className={cn("nav-link", isActive("/subjects") && "text-nexus-600 dark:text-nexus-400")}>Subjects</Link>
            <Link to="/pricing" className={cn("nav-link", isActive("/pricing") && "text-nexus-600 dark:text-nexus-400")}>Pricing</Link>
            <Link to="/about" className={cn("nav-link", isActive("/about") && "text-nexus-600 dark:text-nexus-400")}>About Us</Link>
            <Link to="/contact" className={cn("nav-link", isActive("/contact") && "text-nexus-600 dark:text-nexus-400")}>Contact</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/student/login">
              <Button variant="outline" className="rounded-full border-nexus-200 text-nexus-700 dark:border-nexus-800 dark:text-nexus-300 hover:bg-nexus-50 dark:hover:bg-nexus-950/30 transition-colors duration-300">
                Log In
              </Button>
            </Link>
            <Link to="/student/register">
              <Button className="rounded-full bg-nexus-500 hover:bg-nexus-600 text-white transition-colors duration-300">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:bg-background/80 transition-colors duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={cn(
        "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
        isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-background/95 backdrop-blur-sm border-t border-border">
          <Link 
            to="/how-it-works" 
            className={cn(
              "block py-2 transition-colors duration-200",
              isActive("/how-it-works") ? "text-nexus-600 dark:text-nexus-400" : "text-foreground/80 hover:text-foreground"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            to="/subjects" 
            className={cn(
              "block py-2 transition-colors duration-200",
              isActive("/subjects") ? "text-nexus-600 dark:text-nexus-400" : "text-foreground/80 hover:text-foreground"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Subjects
          </Link>
          <Link 
            to="/pricing" 
            className={cn(
              "block py-2 transition-colors duration-200",
              isActive("/pricing") ? "text-nexus-600 dark:text-nexus-400" : "text-foreground/80 hover:text-foreground"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "block py-2 transition-colors duration-200",
              isActive("/about") ? "text-nexus-600 dark:text-nexus-400" : "text-foreground/80 hover:text-foreground"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className={cn(
              "block py-2 transition-colors duration-200",
              isActive("/contact") ? "text-nexus-600 dark:text-nexus-400" : "text-foreground/80 hover:text-foreground"
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="pt-2 flex flex-col space-y-2">
            <Link 
              to="/student/login" 
              className="w-full" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Button 
                variant="outline" 
                className="w-full rounded-full border-nexus-200 text-nexus-700 dark:border-nexus-800 dark:text-nexus-300 transition-colors duration-300"
              >
                Log In
              </Button>
            </Link>
            <Link 
              to="/student/register" 
              className="w-full" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Button 
                className="w-full rounded-full bg-nexus-500 hover:bg-nexus-600 text-white transition-colors duration-300"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
