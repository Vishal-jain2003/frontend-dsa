

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useStreaks } from '@/contexts/StreakContext';
import { cn } from '../../lib/utils';
import {
  Menu,
  X,
  Home,
  List,
  BarChart2,
  Settings,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentStreak } = useStreaks();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { title: 'Dashboard', href: '/dashboard', icon: Home },
    { title: 'Problems', href: '/problems', icon: List },
    { title: 'Statistics', href: '/statistics', icon: BarChart2 },
    { title: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-md">

            <span className="text-white font-bold text-xl">AI</span>
          </div>
          <span className="font-semibold text-xl tracking-tight text-foreground">
            DSA-TRACKER
          </span>
        </Link>

        {/* Mobile toggle button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary',
                    location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.title}</span>
                </Link>
              ))}
              <div className="text-sm px-3 py-1 bg-primary/10 rounded-full text-primary">
                🔥 <span className="font-semibold">{currentStreak}</span> day streak
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-primary">
                Sign In
              </Link>
              <Link to="/signup">
                <Button className="rounded-full">Sign Up</Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in px-4 py-5 bg-background/95 backdrop-blur-sm border-t space-y-4">
          {user ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'flex items-center space-x-3 p-3 rounded-lg transition-colors',
                    location.pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.title}</span>
                </Link>
              ))}
              <div className="flex justify-between items-center p-3">
                <span className="px-3 py-1 bg-primary/10 rounded-full text-primary">
                  🔥 <span className="font-semibold">{currentStreak}</span> day streak
                </span>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                onClick={logout}
                className="w-full justify-start text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                variant="ghost"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </>
          ) : (
            <div className="space-y-3">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full">Sign Up</Button>
              </Link>
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
