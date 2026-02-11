import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TopProgressBar from "@/components/TopProgressBar";
import QueryProvider from "@/lib/providers/QueryProvider";
import AuthRedirectHandler from "@/components/auth/AuthRedirectHandler";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "RCA-SDA Church Management",
  description: "Church management system for RCA-SDA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <QueryProvider>
          <Suspense fallback={null}>
            <TopProgressBar />
          </Suspense>
          <Navbar />
          {/* <AuthRedirectHandler /> */}
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
