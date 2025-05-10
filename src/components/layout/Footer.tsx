
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="font-semibold text-xl tracking-tight">
              DSA-TRACKER</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Track your DSA problem-solving journey with our intuitive platform.
            </p>
            <div className="mt-6 flex space-x-6 justify-center">
  <Button
    variant="ghost"
    size="icon"
    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transform hover:scale-110 transition duration-300 ease-in-out shadow-lg"
    asChild
  >
    <a
      href="https://github.com/Vishal-jain2003"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <Github className="h-6 w-6 text-primary" />
    </a>
  </Button>
  <Button
    variant="ghost"
    size="icon"
    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transform hover:rotate-6 hover:scale-110 transition duration-300 ease-in-out shadow-lg"
    asChild
  >
    <a
      href="https://x.com/jackmuscik6"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
    >
      <Twitter className="h-6 w-6 text-primary" />
    </a>
  </Button>
  <Button
    variant="ghost"
    size="icon"
    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transform hover:scale-110 transition duration-300 ease-in-out shadow-lg"
    asChild
  >
    <a
      href="mailto:vmailai493@gmail.com"
      aria-label="Email"
    >
      <Mail className="h-6 w-6 text-primary" />
    </a>
  </Button>
  <Button
    variant="ghost"
    size="icon"
    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 transform hover:-rotate-6 hover:scale-110 transition duration-300 ease-in-out shadow-lg"
    asChild
  >
    <a
      href="https://www.linkedin.com/in/your-linkedin-username"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <Linkedin className="h-6 w-6 text-primary" />
    </a>
  </Button>
</div>

          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <a 
                  href="https://leetcode.com/u/jain_Vishalvj/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  LeetCode
                </a>
              </li>
              <li>
                <a 
                  href="https://www.hackerrank.com/profile/vishal_jain12345" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  HackerRank
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
      
        <p className="text-sm text-muted-foreground text-center">
  &copy; {new Date().getFullYear()} AI_DSA Tracker by Vishal Jain. All rights reserved.
</p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
