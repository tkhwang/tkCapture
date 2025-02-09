"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Camera, MessageSquare, BookMarked } from "lucide-react";
import { FeatureCard } from "@/components/feature-card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between px-4 mx-auto">
          <h1 className="text-2xl font-bold">tkCaptureBook</h1>
          <nav>
            <Link href="#features" className="mr-4 hover:underline">
              Features
            </Link>
            <Link href="#privacy" className="hover:underline">
              Privacy
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 text-center bg-gradient-to-b from-primary to-background">
          <div className="container px-4 mx-auto">
            <h2 className="mb-4 text-4xl font-bold">
              Capture, Analyze, and Explore Books
            </h2>
            <p className="mb-8 text-xl">
              Transform your reading experience with AI-powered insights and
              recommendations
            </p>
            <Button size="lg" className="mr-4">
              Download App
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container px-4 mx-auto">
            <h2 className="mb-12 text-3xl font-bold text-center">
              Key Features
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Camera className="w-12 h-12 mb-4" />}
                title="Capture Book Quotes"
                description="Easily capture and save your favorite book quotes with your camera"
              />
              <FeatureCard
                icon={<BookOpen className="w-12 h-12 mb-4" />}
                title="Book Information"
                description="Get detailed book information and create beautiful frames for your captures"
              />
              <FeatureCard
                icon={<MessageSquare className="w-12 h-12 mb-4" />}
                title="AI Analysis"
                description="Receive AI-powered analysis and discussion topics related to your captures"
              />
              <FeatureCard
                icon={<BookMarked className="w-12 h-12 mb-4" />}
                title="Book Recommendations"
                description="Discover new books based on your reading preferences and captures"
              />
            </div>
          </div>
        </section>

        <section id="privacy" className="py-20 bg-muted">
          <div className="container px-4 mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold">개인정보 처리방침</h2>
            <p className="mb-6">
              tkCaptureBook은 사용자의 개인정보를 소중히 다룹니다. 자세한 내용은
              개인정보 처리방침을 확인해주세요.
            </p>
            <Link
              href="/privacy"
              className="inline-block px-6 py-3 text-white rounded-lg bg-primary hover:bg-primary/90"
            >
              개인정보 처리방침 보기
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-4 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <p>&copy; 2025 tkCaptureBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
