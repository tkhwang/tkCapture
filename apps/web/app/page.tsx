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
          <div className="container px-4 mx-auto">
            <h2 className="mb-8 text-3xl font-bold text-center">
              개인정보 처리방침
            </h2>
            <Card>
              <CardContent className="p-8 prose max-w-none">
                <h3 className="mb-4 text-xl font-semibold">
                  1. 개인정보의 처리 목적
                </h3>
                <p className="mb-4">
                  tkCaptureBook은 다음의 목적을 위하여 개인정보를 처리합니다:
                </p>
                <ul className="pl-6 mb-6 list-disc">
                  <li>책 문구 촬영 및 OCR 서비스 제공</li>
                  <li>AI 기반 도서 분석 및 추천 서비스 제공</li>
                  <li>사용자 맞춤형 콘텐츠 제공</li>
                  <li>서비스 개선 및 신규 서비스 개발</li>
                </ul>

                <h3 className="mb-4 text-xl font-semibold">
                  2. 수집하는 개인정보 항목
                </h3>
                <ul className="pl-6 mb-6 list-disc">
                  <li>필수항목: 기기 식별자, 카메라로 촬영한 이미지</li>
                  <li>선택항목: 독서 기록, 관심 도서 정보</li>
                </ul>

                <h3 className="mb-4 text-xl font-semibold">
                  3. 개인정보의 보유 및 이용기간
                </h3>
                <p className="mb-6">
                  회원 탈퇴 시 또는 개인정보 삭제 요청 시까지 보관됩니다. 단,
                  관련 법령에 따라 일정 기간 보관이 필요한 정보는 해당 기간 동안
                  보관될 수 있습니다.
                </p>

                <h3 className="mb-4 text-xl font-semibold">
                  4. 이용자의 권리와 행사 방법
                </h3>
                <p className="mb-4">
                  이용자는 다음과 같은 권리를 행사할 수 있습니다:
                </p>
                <ul className="pl-6 mb-6 list-disc">
                  <li>개인정보 열람 요구</li>
                  <li>오류 정정 요구</li>
                  <li>삭제 요구</li>
                  <li>처리 정지 요구</li>
                </ul>

                <h3 className="mb-4 text-xl font-semibold">
                  5. 개인정보의 안전성 확보 조치
                </h3>
                <ul className="pl-6 mb-6 list-disc">
                  <li>개인정보 암호화</li>
                  <li>보안 프로그램 설치 및 주기적 점검</li>
                  <li>접근 권한 관리 및 접근 통제</li>
                </ul>

                <h3 className="mb-4 text-xl font-semibold">
                  6. 개인정보 보호책임자
                </h3>
                <p className="mb-6">
                  개인정보 보호책임자: tkCaptureBook 개인정보보호팀
                  <br />
                  이메일: privacy@tkcapturebook.com
                  <br />
                  전화: 02-XXX-XXXX
                </p>

                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm">
                    본 개인정보 처리방침은 2024년 1월 1일부터 적용됩니다.
                    <br />
                    이전 개인정보 처리방침은 아래 메일로 문의하시면 확인하실 수
                    있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
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
