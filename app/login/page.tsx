'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Dummy credentials for testing
const DUMMY_CREDENTIALS = {
  grand_father: {
    email: 'grand_father@gmail.com',
    password: 'user123',
    redirect: '/users/grand_father'
  },
  father: {
    email: 'father@gmail.com',
    password: 'user123',
    redirect: '/users/father'
  },
  mother: {
    email: 'mother@gmail.com',
    password: 'user123',
    redirect: '/users/mother'
  },
  church_secretary: {
    email: 'church_secretary@gmail.com',
    password: 'user123',
    redirect: '/users/church_secretary'
  },
  choir_secretary: {
    email: 'choir_secretary@gmail.com',
    password: 'user123',
    redirect: '/users/choir_secretary'
  },
  admin: {
    email: 'admin@rcasda.com',
    password: 'admin123',
    redirect: '/'
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check dummy credentials
    const credentials = Object.values(DUMMY_CREDENTIALS).find(
      cred => cred.email === formData.email && cred.password === formData.password
    );

    // Simulate API call
    setTimeout(() => {
      if (credentials) {
        // Successful login
        console.log('Login successful:', formData.email);
        router.push(credentials.redirect);
      } else {
        // Failed login
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Blurry Circular Background - Oxford Blue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#002147] rounded-full blur-[120px] opacity-20 pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <Image 
                src="/logo.jpeg" 
                alt="RCA-SDA Logo" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <h1 className="text-4xl font-black uppercase transform -rotate-2 mb-2">
            RCA-SDA
          </h1>
        </div>

        {/* Login Card */}
        <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    
          <CardContent className="">
           

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-200 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="font-bold text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-lg">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="pl-10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-base h-12"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="font-bold text-lg">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                    className="pl-10 pr-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-base h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    className="w-5 h-5 border-4 border-black"
                  />
                  <span>Remember me</span>
                </label>
                <Link 
                  href="/forgot-password" 
                  className="font-bold text-blue-600 hover:text-blue-800 underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span>Logging in...</span>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Login
                  </>
                )}
              </Button>
            </form>


          
          </CardContent>
        </Card>

      
      </div>
    </div>
  );
}
