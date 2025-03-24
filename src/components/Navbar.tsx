
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <span className="text-2xl font-bold text-gradient">AskNexus</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/how-it-works" className="nav-link">How It Works</Link>
            <Link to="/subjects" className="nav-link">Subjects</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/about" className="nav-link">About Us</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/student/login">
              <Button variant="outline" className="rounded-full border-nexus-200 text-nexus-700 dark:border-nexus-800 dark:text-nexus-300">
                Log In
              </Button>
            </Link>
            <Link to="/student/register">
              <Button className="rounded-full bg-nexus-500 hover:bg-nexus-600 text-white">
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
              className="text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={cn(
        "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
        isMenuOpen ? "max-h-96" : "max-h-0"
      )}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-background/95 backdrop-blur-sm border-t border-border">
          <Link 
            to="/how-it-works" 
            className="block py-2 text-foreground/80 hover:text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            to="/subjects" 
            className="block py-2 text-foreground/80 hover:text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            Subjects
          </Link>
          <Link 
            to="/pricing" 
            className="block py-2 text-foreground/80 hover:text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link 
            to="/about" 
            className="block py-2 text-foreground/80 hover:text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <div className="pt-2 flex flex-col space-y-2">
            <Link 
              to="/student/login" 
              className="w-full" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Button 
                variant="outline" 
                className="w-full rounded-full border-nexus-200 text-nexus-700 dark:border-nexus-800 dark:text-nexus-300"
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
                className="w-full rounded-full bg-nexus-500 hover:bg-nexus-600 text-white"
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
