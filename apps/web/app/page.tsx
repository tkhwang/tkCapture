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

        <section className="py-20 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 mx-auto">
            <h2 className="mb-16 text-3xl font-bold text-center">
              tkCaptureBook으로 더 풍부한 독서 경험을
            </h2>

            <div className="space-y-24">
              {/* 시나리오 1: 책 문구 캡처 */}
              <div className="flex flex-col-reverse items-center gap-8 md:flex-row">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold">
                    마음에 드는 문구를 발견하는 순간
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    책을 읽다가 마음에 드는 문구를 발견하셨나요? 스마트폰으로
                    간단히 촬영하세요. AI가 자동으로 텍스트를 인식하고 책 정보를
                    찾아드립니다.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="p-1 text-primary">•</span>
                      정확한 OCR 인식으로 텍스트 추출
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="p-1 text-primary">•</span>책 제목, 저자
                      자동 식별
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="p-1 text-primary">•</span>
                      다양한 프레임으로 이미지 꾸미기
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  {/* 이미지는 실제 앱 스크린샷으로 교체 필요 */}
                  <div className="aspect-[4/3] bg-muted rounded-lg"></div>
                </div>
              </div>

              {/* 시나리오 2: AI 분석 */}
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div className="flex-1">
                  {/* 이미지는 실제 앱 스크린샷으로 교체 필요 */}
                  <div className="aspect-[4/3] bg-muted rounded-lg"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold">
                    AI와 함께 더 깊이 있는 독서
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    캡처한 문구에 대해 AI가 다양한 관점에서 분석을 제공합니다.
                    작가의 의도, 문학적 기법, 역사적 맥락까지 새로운 시각으로
                    책을 이해해보세요.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="p-1 text-primary">•</span>
                      문맥 기반 심층 분석
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="p-1 text-primary">•</span>
                      관련 토론 주제 제안
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="p-1 text-primary">•</span>
                      유사 도서 추천
                    </li>
                  </ul>
                </div>
              </div>

              {/* 시나리오 3: 독서 커뮤니티 */}
              <div className="flex flex-col-reverse items-center gap-8 md:flex-row">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold">
                    나만의 독서 기록 공유하기
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    마음에 드는 문구와 AI의 분석을 소셜 미디어에 공유하세요.
                    다른 독자들과 생각을 나누고 새로운 관점을 발견할 수
                    있습니다.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="p-1 text-primary">•</span>
                      아름다운 이미지 템플릿
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="p-1 text-primary">•</span>
                      간편한 소셜 미디어 공유
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="p-1 text-primary">•</span>
                      독서 기록 타임라인
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  {/* 이미지는 실제 앱 스크린샷으로 교체 필요 */}
                  <div className="aspect-[4/3] bg-muted rounded-lg"></div>
                </div>
              </div>
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
