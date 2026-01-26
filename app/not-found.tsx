'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h- bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[120px] font-black leading-none transform -rotate-3 text-black border-8 border-black bg-yellow-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] inline-block px-6 py-3">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transform rotate-1">
          <h2 className="text-3xl font-black uppercase mb-4 transform -rotate-1">
            Page Not Found!
          </h2>
          <p className="text-md font-bold mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-green-400 hover:bg-green-500 text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-black text-lg uppercase"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 bg-blue-400 hover:bg-blue-500 text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-black text-lg uppercase flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-4">
          <div className="w-16 h-16 bg-pink-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-12 flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <div className="w-16 h-16 bg-orange-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-12 flex items-center justify-center">
            <span className="text-3xl font-black">?</span>
          </div>
          <div className="w-16 h-16 bg-cyan-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-6 flex items-center justify-center">
            <span className="text-3xl font-black">!</span>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8">
          <p className="font-bold text-lg">
            Need help? Contact the church administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
