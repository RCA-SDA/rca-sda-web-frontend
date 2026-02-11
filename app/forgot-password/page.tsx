'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Mail, Lock, CheckCircle, AlertCircle, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useForgotPassword } from '@/lib/hooks/usePassword';
import type { ForgotPasswordInput } from '@/lib/services/password.service';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Add password reset logic here
    console.log('Password reset requested for:', email);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className=" bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black uppercase transform -rotate-2 mb-2">
            RCA-SDA
          </h1>
          <p className="text-lg font-bold">Password Recovery</p>
        </div>

        {/* Forgot Password Card */}
        <Card className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className=" ">
            <CardTitle className="uppercase text-2xl flex items-center gap-2">
              <Mail className="w-6 h-6" />
              Forgot Password
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {!isSubmitted ? (
              <>
                <p className="font-bold mb-6 text-gray-700">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>

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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="pl-10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-base h-12"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-lg font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Reset Link
                      </>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              /* Success Message */
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-green-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center transform rotate-6">
                    <CheckCircle className="w-12 h-12 text-black" />
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase mb-4">
                  Check Your Email!
                </h3>
                <p className="font-bold text-gray-700 mb-6">
                  We've sent password reset instructions to:
                </p>
                <p className="font-black text-lg mb-6 bg-yellow-200 border-2 border-black p-3 inline-block">
                  {email}
                </p>
                <p className="font-bold text-sm text-gray-600">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>
            )}


            {/* Back to Login Link */}
            <div className="text-center mt-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 font-black text-blue-600 hover:text-blue-800 underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  );
}
