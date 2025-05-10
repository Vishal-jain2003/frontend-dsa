
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  requireAuth = false,
  className 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // If authentication is required and user isn't logged in,
  // redirect to login page with return URL
  if (requireAuth && !loading && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Public pages can be accessed by anyone
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className={cn("flex-grow pt-24", className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
