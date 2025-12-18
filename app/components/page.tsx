"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserMessage } from "@/components/chat/UserMessage"
import { AIMessage } from "@/components/chat/AIMessage"
import { ThinkingProcess } from "@/components/chat/ThinkingProcess"
import { MemoryCard } from "@/components/glass-box/MemoryCard"
import { SearchResultCard } from "@/components/glass-box/SearchResultCard"
import { PlanCard } from "@/components/common/PlanCard"
import { useState } from "react"

export default function ComponentsGalleryPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const components = [
    { id: "button", name: "Button (버튼)" },
    { id: "card", name: "Card (카드)" },
    { id: "input", name: "Input (입력 필드)" },
    { id: "dialog", name: "Dialog (다이얼로그)" },
    { id: "badge", name: "Badge (배지)" },
    { id: "avatar", name: "Avatar (아바타)" },
    { id: "separator", name: "Separator (구분선)" },
    { id: "tabs", name: "Tabs (탭)" },
    { id: "chat-message", name: "채팅 메시지 (UserMessage, AIMessage)" },
    { id: "thinking-process", name: "사고 과정 (ThinkingProcess)" },
    { id: "memory-card", name: "메모리 카드 (MemoryCard, SearchResultCard)" },
    { id: "plan-card", name: "계획 카드 (PlanCard, PlanStep)" },
  ]

  const filteredComponents = components.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const shouldShow = (id: string) => {
    if (!searchTerm) return true
    return filteredComponents.some(comp => comp.id === id)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">컴포넌트 갤러리</h1>
      <p className="text-muted-foreground mb-12">
        GLASSY 프로젝트에서 사용되는 모든 UI 컴포넌트를 확인하고 테스트할 수 있습니다.
      </p>

      {/* 카테고리 네비게이션 및 검색 */}
      <div className="sticky top-4 z-10 bg-background/95 backdrop-blur mb-8 p-4 border rounded-lg space-y-4">
        <Input
          type="text"
          placeholder="컴포넌트 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        <nav>
          <div className="flex flex-wrap gap-2">
            {filteredComponents.map((comp) => (
              <a
                key={comp.id}
                href={`#${comp.id}`}
                className="px-3 py-1.5 text-sm rounded-md hover:bg-accent transition-colors"
              >
                {comp.name}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="space-y-12">
        {/* Button 섹션 */}
        {shouldShow("button") && <section id="button">
          <h2 className="text-3xl font-semibold mb-4">Button (버튼)</h2>
          <p className="text-muted-foreground mb-6">
            사용자 액션을 트리거하는 클릭 가능한 버튼 컴포넌트
          </p>
          <div className="flex flex-wrap gap-4 p-6 border rounded-lg">
            <Button>기본 버튼</Button>
            <Button variant="secondary">보조 버튼</Button>
            <Button variant="destructive">삭제 버튼</Button>
            <Button variant="outline">아웃라인 버튼</Button>
            <Button variant="ghost">고스트 버튼</Button>
            <Button size="sm">작은 버튼</Button>
            <Button size="lg">큰 버튼</Button>
            <Button disabled>비활성화 버튼</Button>
          </div>
        </section>}

        {/* Card 섹션 */}
        {shouldShow("card") && <section id="card">
          <h2 className="text-3xl font-semibold mb-4">Card (카드)</h2>
          <p className="text-muted-foreground mb-6">
            콘텐츠를 그룹화하는 컨테이너 컴포넌트
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>카드 제목</CardTitle>
                <CardDescription>카드 설명이 여기에 표시됩니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>카드 내용이 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>다른 카드</CardTitle>
                <CardDescription>카드는 그리드 레이아웃으로 배치할 수 있습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>반응형으로 동작합니다.</p>
              </CardContent>
            </Card>
          </div>
        </section>}

        {/* Input 섹션 */}
        {shouldShow("input") && <section id="input">
          <h2 className="text-3xl font-semibold mb-4">Input (입력 필드)</h2>
          <p className="text-muted-foreground mb-6">
            사용자 입력을 받는 텍스트 필드 컴포넌트
          </p>
          <div className="space-y-4 p-6 border rounded-lg max-w-md">
            <Input placeholder="기본 입력 필드" />
            <Input type="email" placeholder="이메일 주소" />
            <Input type="password" placeholder="비밀번호" />
            <Input disabled placeholder="비활성화된 입력 필드" />
          </div>
        </section>}

        {/* Dialog 섹션 */}
        {shouldShow("dialog") && <section id="dialog">
          <h2 className="text-3xl font-semibold mb-4">Dialog (다이얼로그)</h2>
          <p className="text-muted-foreground mb-6">
            모달 형태로 콘텐츠를 표시하는 컴포넌트
          </p>
          <div className="p-6 border rounded-lg">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>다이얼로그 열기</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>다이얼로그 제목</DialogTitle>
                  <DialogDescription>
                    이것은 다이얼로그의 설명입니다. 여기에 추가 정보를 표시할 수 있습니다.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>다이얼로그 내용이 여기에 표시됩니다.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>}

        {/* Badge 섹션 */}
        {shouldShow("badge") && <section id="badge">
          <h2 className="text-3xl font-semibold mb-4">Badge (배지)</h2>
          <p className="text-muted-foreground mb-6">
            상태나 레이블을 표시하는 작은 컴포넌트
          </p>
          <div className="flex flex-wrap gap-4 p-6 border rounded-lg">
            <Badge>기본 배지</Badge>
            <Badge variant="secondary">보조 배지</Badge>
            <Badge variant="destructive">경고 배지</Badge>
            <Badge variant="outline">아웃라인 배지</Badge>
          </div>
        </section>}

        {/* Avatar 섹션 */}
        {shouldShow("avatar") && <section id="avatar">
          <h2 className="text-3xl font-semibold mb-4">Avatar (아바타)</h2>
          <p className="text-muted-foreground mb-6">
            사용자 프로필 이미지를 표시하는 컴포넌트
          </p>
          <div className="flex flex-wrap gap-4 p-6 border rounded-lg">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>XY</AvatarFallback>
            </Avatar>
          </div>
        </section>}

        {/* Separator 섹션 */}
        {shouldShow("separator") && <section id="separator">
          <h2 className="text-3xl font-semibold mb-4">Separator (구분선)</h2>
          <p className="text-muted-foreground mb-6">
            콘텐츠를 시각적으로 구분하는 선 컴포넌트
          </p>
          <div className="space-y-4 p-6 border rounded-lg">
            <div>첫 번째 섹션</div>
            <Separator />
            <div>두 번째 섹션</div>
            <Separator />
            <div>세 번째 섹션</div>
          </div>
        </section>}

        {/* Tabs 섹션 */}
        {shouldShow("tabs") && <section id="tabs">
          <h2 className="text-3xl font-semibold mb-4">Tabs (탭)</h2>
          <p className="text-muted-foreground mb-6">
            콘텐츠를 탭으로 전환하여 표시하는 컴포넌트
          </p>
          <div className="p-6 border rounded-lg">
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">탭 1</TabsTrigger>
                <TabsTrigger value="tab2">탭 2</TabsTrigger>
                <TabsTrigger value="tab3">탭 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <p className="py-4">첫 번째 탭의 내용입니다.</p>
              </TabsContent>
              <TabsContent value="tab2">
                <p className="py-4">두 번째 탭의 내용입니다.</p>
              </TabsContent>
              <TabsContent value="tab3">
                <p className="py-4">세 번째 탭의 내용입니다.</p>
              </TabsContent>
            </Tabs>
          </div>
        </section>}

        {/* 채팅 메시지 섹션 */}
        {shouldShow("chat-message") && <section id="chat-message">
          <h2 className="text-3xl font-semibold mb-4">채팅 메시지</h2>
          <p className="text-muted-foreground mb-6">
            사용자와 AI의 대화 메시지를 표시하는 컴포넌트
          </p>
          <div className="space-y-6 p-6 border rounded-lg bg-background">
            <UserMessage
              content="안녕하세요, Phase P2 작업을 시작합니다."
              timestamp="방금 전"
            />
            <AIMessage
              content="네, Phase P2에서는 8개의 조합 컴포넌트를 구현합니다. 채팅 메시지, 사고 과정, 메모리 카드, 계획 카드 컴포넌트를 단계별로 만들어갈 예정입니다."
              timestamp="1분 전"
              personaName="시니어 개발자"
              personaInitials="SD"
            />
            <UserMessage
              content="UserMessage와 AIMessage 컴포넌트가 잘 동작하는지 확인해주세요."
              timestamp="2분 전"
            />
            <AIMessage
              content="두 컴포넌트 모두 정상적으로 표시되고 있습니다. 저장 버튼도 클릭하여 테스트해보세요."
              timestamp="3분 전"
              personaName="프로덕트 매니저"
              personaInitials="PM"
            />
          </div>
        </section>}

        {/* 사고 과정 섹션 */}
        {shouldShow("thinking-process") && <section id="thinking-process">
          <h2 className="text-3xl font-semibold mb-4">사고 과정</h2>
          <p className="text-muted-foreground mb-6">
            AI의 사고 과정을 단계별로 시각화하는 아코디언 컴포넌트
          </p>
          <div className="p-6 border rounded-lg">
            <ThinkingProcess
              steps={[
                { id: "1", title: "사용자 의도 분석 중...", description: "입력된 질문의 핵심 의도를 파악합니다", status: "completed", order: 1 },
                { id: "2", title: "관련 기억 검색 중...", description: "저장된 기억에서 관련 정보를 찾습니다", status: "in-progress", order: 2 },
                { id: "3", title: "답변 구조화 중...", status: "pending", order: 3 }
              ]}
              defaultOpen={true}
            />
          </div>
        </section>}

        {/* 메모리 카드 섹션 */}
        {shouldShow("memory-card") && <section id="memory-card">
          <h2 className="text-3xl font-semibold mb-4">메모리 카드</h2>
          <p className="text-muted-foreground mb-6">
            저장된 기억과 검색 결과를 표시하는 카드 컴포넌트
          </p>
          <div className="space-y-6 p-6 border rounded-lg">
            <div>
              <h3 className="text-lg font-semibold mb-4">MemoryCard</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MemoryCard
                  id="mem-1"
                  title="Phase P1 완료 내용"
                  summary="shadcn/ui 기본 컴포넌트 8개 설치 및 갤러리 등록 완료. Button, Card, Input, Dialog, Badge, Avatar, Separator, Tabs 구현."
                  createdAt="2025년 12월 17일"
                  onEdit={() => console.log('수정')}
                  onDelete={() => console.log('삭제')}
                />
                <MemoryCard
                  id="mem-2"
                  title="TypeScript 타입 정의 완료"
                  summary="Message, Thinking, Memory, Plan 관련 인터페이스를 types/ 디렉토리에 정의. 모든 컴포넌트 Props 타입 정의 완료."
                  createdAt="2025년 12월 17일"
                  onEdit={() => console.log('수정')}
                  onDelete={() => console.log('삭제')}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">SearchResultCard</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchResultCard
                  id="search-1"
                  title="Next.js App Router 공식 문서"
                  source="Next.js 공식 문서"
                  url="https://nextjs.org/docs/app"
                  summary="Next.js 16 App Router는 파일 시스템 기반 라우팅을 제공하며, Server Components를 기본으로 사용합니다. 향상된 성능과 개발자 경험을 제공합니다."
                  isSelected={true}
                  onToggle={(selected) => console.log('선택:', selected)}
                />
                <SearchResultCard
                  id="search-2"
                  title="shadcn/ui 컴포넌트 라이브러리"
                  source="shadcn/ui 공식 사이트"
                  url="https://ui.shadcn.com"
                  summary="Radix UI 기반의 재사용 가능한 컴포넌트 라이브러리입니다. Tailwind CSS를 사용하며, 복사하여 프로젝트에 직접 붙여넣는 방식으로 사용합니다."
                  isSelected={false}
                  onToggle={(selected) => console.log('선택:', selected)}
                />
              </div>
            </div>
          </div>
        </section>}

        {/* 계획 카드 섹션 */}
        {shouldShow("plan-card") && <section id="plan-card">
          <h2 className="text-3xl font-semibold mb-4">계획 카드</h2>
          <p className="text-muted-foreground mb-6">
            단계별 계획을 관리하고 실행하는 카드 컴포넌트
          </p>
          <div className="p-6 border rounded-lg">
            <PlanCard
              id="plan-1"
              title="Phase P2 구현 계획"
              description="조합 컴포넌트 구현을 위한 단계별 작업"
              steps={[
                { id: "1", order: 1, title: "타입 정의 생성", description: "types/ 디렉토리에 TypeScript 인터페이스 정의", status: "completed", isSelected: true, onEdit: () => console.log('수정 1'), onDelete: () => console.log('삭제 1') },
                { id: "2", order: 2, title: "채팅 메시지 컴포넌트", description: "UserMessage, AIMessage 구현", status: "completed", isSelected: true, onEdit: () => console.log('수정 2'), onDelete: () => console.log('삭제 2') },
                { id: "3", order: 3, title: "사고 과정 컴포넌트", description: "ThinkingProcess 구현", status: "completed", isSelected: true, onEdit: () => console.log('수정 3'), onDelete: () => console.log('삭제 3') },
                { id: "4", order: 4, title: "메모리 카드 컴포넌트", description: "MemoryCard, SearchResultCard 구현", status: "in-progress", isSelected: true, onEdit: () => console.log('수정 4'), onDelete: () => console.log('삭제 4') },
                { id: "5", order: 5, title: "계획 카드 컴포넌트", description: "PlanCard, PlanStep 구현", status: "pending", isSelected: true, onEdit: () => console.log('수정 5'), onDelete: () => console.log('삭제 5') },
                { id: "6", order: 6, title: "갤러리 통합", description: "모든 컴포넌트를 갤러리에 등록", status: "pending", isSelected: false, onEdit: () => console.log('수정 6'), onDelete: () => console.log('삭제 6') }
              ]}
              onExecute={() => console.log('실행')}
              onAddStep={() => console.log('단계 추가')}
            />
          </div>
        </section>}
      </div>

      {/* 맨 위로 버튼 */}
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-8 right-8"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        맨 위로
      </Button>
    </div>
  )
}
