
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useAuth } from '../contexts/AuthContext';
// import { toast } from 'sonner';
// import Layout from '@/components/layout/Layout';

// const SignupPage: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const validateEmail = (email: string): boolean => {
//     return /\S+@\S+\.\S+/.test(email);
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validation
//     if (!username || !email || !password || !confirmPassword) {
//       toast.error('Please fill in all fields');
//       return;
//     }
    
//     if (!validateEmail(email)) {
//       toast.error('Please enter a valid email address');
//       return;
//     }
    
//     if (password.length < 6) {
//       toast.error('Password must be at least 6 characters long');
//       return;
//     }
    
//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }
    
//     try {
//       setIsLoading(true);
//       await signup(username, email, password);
//       toast.success('Account created successfully! Please log in.');
//       navigate('/login');
//     } catch (error: any) {
//       console.error('Signup error:', error);
//       // In dummy mode we'll still redirect
//       toast.warning('Using dummy mode - redirecting to login');
//       navigate('/login');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="container max-w-md mx-auto px-6 py-12">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold mb-2">Create an account</h1>
//           <p className="text-muted-foreground">
//             Sign up to get started with DSA Tracker
//           </p>
//           <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded-md text-sm">
//             <p>Dummy mode active - registration will always succeed</p>
//           </div>
//         </div>
        
//         <div className="bg-card rounded-xl border shadow-sm p-8">
//           <form onSubmit={handleSignup} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Choose a username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 disabled={isLoading}
//                 required
//                 className="h-11"
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={isLoading}
//                 required
//                 className="h-11"
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Create a password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={isLoading}
//                 required
//                 className="h-11"
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 disabled={isLoading}
//                 required
//                 className="h-11"
//               />
//             </div>
            
//             <Button
//               type="submit"
//               className="w-full h-11 mt-6"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Creating account...' : 'Create Account'}
//             </Button>
//           </form>
          
//           <div className="mt-6 text-center text-sm">
//             <p className="text-muted-foreground">
//               Already have an account?{' '}
//               <Link to="/login" className="text-primary hover:text-primary/90 font-medium">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default SignupPage;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Eye, EyeOff } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      await signup(username, email, password);
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2 text-primary">Create an Account</h1>
          <p className="text-muted-foreground text-sm">Join DSA Tracker to level up your coding journey.</p>
        </div>

        <div className="bg-card rounded-xl border shadow-lg p-8">
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-muted-foreground"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button type="submit" className="w-full h-11 mt-4" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
