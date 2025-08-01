import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next";
import NavigationTracker from "@/components/NavigationTracker";
import NavigationDebugger from "@/components/NavigationDebugger";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artifex Studio - AI-Powered Content Creation",
  description: "Transform your content creation with cutting-edge AI. Generate, edit, and publish compelling text content that engages your audience and drives results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NavigationTracker screenName="root-layout" />
          {children}
          <Analytics />
          <NavigationDebugger />
        </AuthProvider>
      </body>
    </html>
  );
}
