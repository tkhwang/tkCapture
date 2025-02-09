"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  BookOpen,
  Camera,
  MessageSquare,
  BookMarked,
  Share2,
  Instagram,
  Twitter,
} from "lucide-react";
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
              <div className="flex flex-col-reverse items-center gap-8 md:flex-row">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold">
                    나만의 독서 기록을 공유하기
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    마음에 드는 문구를 다양한 디자인의 프레임으로 꾸며보세요. 책
                    표지, 작가 정보, 출판사 등의 메타 정보를 자동으로 포함하여
                    더욱 풍성한 독서 기록을 만들 수 있습니다.
                  </p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-medium">맞춤형 프레임 템플릿</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>책 표지와
                          어울리는 컬러 테마
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>
                          장르별 최적화된 디자인
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>
                          계절/시간대별 분위기 템플릿
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">풍부한 메타 정보</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>책 표지
                          이미지 자동 추가
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>
                          작가/역자 정보 포함
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>
                          출판사 및 ISBN 정보
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-6">
                    <h4 className="mb-4 font-medium">간편한 공유 옵션</h4>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Instagram className="w-5 h-5" />
                        <span>인스타그램 스토리</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Instagram className="w-5 h-5" />
                        <span>인스타그램 포스트</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Twitter className="w-5 h-5" />
                        <span>트위터</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex-1 p-8">
                  <div className="relative w-full overflow-hidden aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 transform rotate-45 bg-primary/20 rounded-xl" />
                        <div className="absolute transform inset-2 bg-primary/30 rounded-xl rotate-12" />
                        <div className="absolute flex items-center justify-center text-white inset-4 bg-primary rounded-xl">
                          <Share2 className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse items-center gap-8 md:flex-row">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold">
                    책 속 문구를 찍으면 AI가 분석해드려요
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    마음에 드는 문구를 발견하면 촬영하세요. AI가 자동으로
                    텍스트를 인식하고 깊이 있는 분석을 제공합니다. 작가의
                    의도부터 역사적 맥락까지, 새로운 관점으로 책을 이해할 수
                    있습니다.
                  </p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-medium">스마트한 텍스트 인식</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>
                          정확한 OCR 텍스트 추출
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>책 제목,
                          저자 자동 식별
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>
                          페이지, 챕터 정보 저장
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">AI 기반 심층 분석</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>
                          문맥 기반 의미 분석
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>
                          문학적 기법 해설
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="p-1 text-primary">•</span>
                          관련 도서 추천
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="relative flex-1 p-8">
                  <div className="relative w-full overflow-hidden aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 transform rotate-45 bg-primary/20 rounded-xl" />
                        <div className="absolute transform inset-2 bg-primary/30 rounded-xl rotate-12" />
                        <div className="absolute flex items-center justify-center text-white inset-4 bg-primary rounded-xl">
                          <MessageSquare className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                  </div>
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
