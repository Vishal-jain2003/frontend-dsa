// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'sonner';
// import Layout from '@/components/layout/Layout';

// const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get the redirect path from location state or default to dashboard
//   const from = (location.state as any)?.from?.pathname || '/dashboard';

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!username || !password) {
//       toast.error('Please enter both username and password');
//       return;
//     }
    
//     try {
//       setIsLoading(true);
//       await login(username, password);
//       navigate(from, { replace: true });
//     } catch (error: any) {
//       console.error('Login error:', error);
//       // In dummy mode, we'll always succeed, but keep this for when backend is ready
//       toast.error('Login failed. Using dummy mode - any credentials work.');
      
//       // Attempt dummy login fallback with any credentials
//       try {
//         await login(username, password);
//         navigate(from, { replace: true });
//       } catch (fallbackError) {
//         console.error('Fallback login error:', fallbackError);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="container max-w-md mx-auto px-6 py-12">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
//           <p className="text-muted-foreground">
//             Enter your credentials to access your account
//           </p>
//           <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded-md text-sm">
//             <p>Dummy mode active - any credentials will work</p>
//           </div>
//         </div>
        
//         <div className="bg-card rounded-xl border shadow-sm p-8">
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 disabled={isLoading}
//                 required
//                 className="h-11"
//               />
//             </div>
            
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password">Password</Label>
//                 <Link 
//                   to="/forgot-password" 
//                   className="text-sm text-primary hover:text-primary/90"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={isLoading}
//                 required
//                 className="h-11"
//               />
//             </div>
            
//             <Button
//               type="submit"
//               className="w-full h-11"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Signing in...' : 'Sign In'}
//             </Button>
//           </form>
          
//           <div className="mt-6 text-center text-sm">
//             <p className="text-muted-foreground">
//               Don't have an account?{' '}
//               <Link to="/signup" className="text-primary hover:text-primary/90 font-medium">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default LoginPage;


// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'sonner';
// import Layout from '@/components/layout/Layout';
// import { Eye, EyeOff } from 'lucide-react';

// const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const from = (location.state as any)?.from?.pathname || '/dashboard';

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!username || !password) {
//       toast.error('Please enter both username and password');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       await login(username, password);
//       navigate(from, { replace: true });
//     } catch (error: any) {
//       toast.error('Login failed. Please check your credentials.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
//         <div className="w-full max-w-md space-y-8 bg-white dark:bg-card p-8 rounded-2xl shadow-lg border border-border">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
//               Sign in to your account
//             </h1>
//             <p className="text-muted-foreground text-sm">
//               Access your DSA Tracker and continue your journey
//             </p>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 disabled={isLoading}
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   disabled={isLoading}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
//                   tabIndex={-1}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Signing in...' : 'Sign In'}
//             </Button>
//           </form>

//           <div className="text-center text-sm mt-4">
//             <p className="text-muted-foreground">
//               Don’t have an account?{' '}
//               <Link to="/signup" className="text-primary font-medium hover:underline">
//                 Sign up here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default LoginPage;



import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    try {
      setIsLoading(true);
      await login(username, password);
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotEmail) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setForgotLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email: forgotEmail }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }

      toast.success('Password reset link sent to your email!');
      setForgotPasswordOpen(false);
      setForgotEmail('');
    } catch (error: any) {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
        <div className="w-full max-w-md space-y-8 bg-white dark:bg-card p-8 rounded-2xl shadow-lg border border-border">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Sign in to your account
            </h1>
            <p className="text-muted-foreground text-sm">
              Access your DSA Tracker and continue your journey
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center text-sm mt-4">
            <p className="text-muted-foreground">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              Enter your email address to receive a password reset link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forgot-email">Email</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                disabled={forgotLoading}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={forgotLoading}>
                {forgotLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default LoginPage;