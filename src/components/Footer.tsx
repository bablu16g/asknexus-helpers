
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50 dark:bg-secondary/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/1f9406a2-356b-4351-b6a8-86d2b32da5f3.png" 
                alt="AskNexus Logo" 
                className="h-8 w-auto mr-2"
              />
              <h3 className="text-lg font-semibold">AskNexus</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Connecting students with experts for instant academic help.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-nexus-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-nexus-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-nexus-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-nexus-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/student/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/student/register" className="text-muted-foreground hover:text-foreground transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Premium Plans
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  How to Ask Questions
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Subjects
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Experts</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/expert/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Expert Login
                </Link>
              </li>
              <li>
                <Link to="/expert/register" className="text-muted-foreground hover:text-foreground transition-colors">
                  Apply as Expert
                </Link>
              </li>
              <li>
                <Link to="/expert/tests" className="text-muted-foreground hover:text-foreground transition-colors">
                  Subject Tests
                </Link>
              </li>
              <li>
                <Link to="/expert/earnings" className="text-muted-foreground hover:text-foreground transition-colors">
                  Earning System
                </Link>
              </li>
              <li>
                <Link to="/expert/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  Expert FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:asknexus@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  asknexus@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:7027867847" className="text-muted-foreground hover:text-foreground transition-colors">
                  (702) 786-7847
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} AskNexus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
