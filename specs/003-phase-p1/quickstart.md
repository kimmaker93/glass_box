# Quick Start: Phase P1 기본 컴포넌트

**Feature**: Phase P1 기본 컴포넌트 - shadcn/ui 컴포넌트 설치 및 갤러리 구성
**Date**: 2025-12-17
**Purpose**: 빠른 시작 가이드 - Phase P1 작업 순서 및 명령어

---

## 1. Phase P1 개요

**목표**: shadcn/ui 기본 컴포넌트 설치 및 컴포넌트 갤러리 페이지 구성
**예상 시간**: 2-3일 (컴포넌트 설치 + 갤러리 페이지 구현 + 검토)
**검토 필수**: ✅ (완료 후 /components 페이지에서 검토)

---

## 2. 작업 순서

### User Story 1: 컴포넌트 갤러리 페이지 구성 (Priority: P1)

#### Step 1: 갤러리 페이지 파일 생성 (30분)

```bash
# 1. app/components 디렉토리 생성
mkdir -p app/components

# 2. page.tsx 파일 생성
touch app/components/page.tsx
```

#### Step 2: 갤러리 페이지 기본 구조 작성 (1시간)

**app/components/page.tsx**:
```typescript
export default function ComponentsGalleryPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">컴포넌트 갤러리</h1>
      <p className="text-muted-foreground mb-12">
        GLASSY 프로젝트에서 사용되는 모든 UI 컴포넌트를 확인하고 테스트할 수 있습니다.
      </p>

      {/* 컴포넌트 섹션들이 추가될 위치 */}
      <div className="space-y-12">
        {/* US2, US3에서 컴포넌트 섹션 추가 예정 */}
      </div>
    </div>
  )
}
```

**완료 기준**:
- [ ] app/components/page.tsx 파일 생성 완료
- [ ] npm run dev 실행 시 /components 페이지 접속 가능
- [ ] 페이지 제목 "컴포넌트 갤러리" 표시됨

---

### User Story 2: 기본 UI 컴포넌트 설치 및 등록 (Priority: P1)

#### Step 3: 핵심 컴포넌트 설치 (1시간)

```bash
# 1. Button 컴포넌트 설치
npx shadcn@latest add button

# 2. Card 컴포넌트 설치
npx shadcn@latest add card

# 3. Input 컴포넌트 설치
npx shadcn@latest add input

# 4. Dialog 컴포넌트 설치
npx shadcn@latest add dialog

# 5. 설치 확인
ls -la components/ui/ | grep -E "(button|card|input|dialog)"
```

**완료 기준**:
- [ ] components/ui/button.tsx 파일 생성
- [ ] components/ui/card.tsx 파일 생성
- [ ] components/ui/input.tsx 파일 생성
- [ ] components/ui/dialog.tsx 파일 생성

#### Step 4: 갤러리에 핵심 컴포넌트 등록 (2-3시간)

**app/components/page.tsx** 업데이트:
```typescript
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

export default function ComponentsGalleryPage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">컴포넌트 갤러리</h1>
      <p className="text-muted-foreground mb-12">
        GLASSY 프로젝트에서 사용되는 모든 UI 컴포넌트를 확인하고 테스트할 수 있습니다.
      </p>

      <div className="space-y-12">
        {/* Button 섹션 */}
        <section id="button">
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
        </section>

        {/* Card 섹션 */}
        <section id="card">
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
        </section>

        {/* Input 섹션 */}
        <section id="input">
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
        </section>

        {/* Dialog 섹션 */}
        <section id="dialog">
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
        </section>
      </div>
    </div>
  )
}
```

**완료 기준**:
- [ ] /components 페이지에 Button, Card, Input, Dialog 섹션 존재
- [ ] 각 컴포넌트 동작 테스트 가능 (버튼 클릭, 입력 필드 입력, Dialog 열기/닫기)
- [ ] 한글 제목 및 설명 표시

---

### User Story 3: 추가 필수 컴포넌트 설치 및 등록 (Priority: P2)

#### Step 5: 추가 컴포넌트 설치 (30분)

```bash
# 1. Badge 컴포넌트 설치
npx shadcn@latest add badge

# 2. Avatar 컴포넌트 설치
npx shadcn@latest add avatar

# 3. Separator 컴포넌트 설치
npx shadcn@latest add separator

# 4. Tabs 컴포넌트 설치
npx shadcn@latest add tabs

# 5. 설치 확인
ls -la components/ui/ | grep -E "(badge|avatar|separator|tabs)"
```

**완료 기준**:
- [ ] components/ui/badge.tsx 파일 생성
- [ ] components/ui/avatar.tsx 파일 생성
- [ ] components/ui/separator.tsx 파일 생성
- [ ] components/ui/tabs.tsx 파일 생성

#### Step 6: 갤러리에 추가 컴포넌트 등록 (2-3시간)

**app/components/page.tsx** import 추가:
```typescript
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
```

**컴포넌트 섹션 추가** (Dialog 섹션 다음에):
```typescript
        {/* Badge 섹션 */}
        <section id="badge">
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
        </section>

        {/* Avatar 섹션 */}
        <section id="avatar">
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
        </section>

        {/* Separator 섹션 */}
        <section id="separator">
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
        </section>

        {/* Tabs 섹션 */}
        <section id="tabs">
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
        </section>
```

**완료 기준**:
- [ ] /components 페이지에 Badge, Avatar, Separator, Tabs 섹션 존재
- [ ] 각 컴포넌트 시각적 확인 가능
- [ ] Tabs 탭 전환 애니메이션 동작

---

### User Story 4: 갤러리 페이지 레이아웃 및 네비게이션 개선 (Priority: P3)

#### Step 7: 카테고리 네비게이션 추가 (선택적, 2-3시간)

**app/components/page.tsx** 상단에 네비게이션 추가:
```typescript
export default function ComponentsGalleryPage() {
  const components = [
    { id: "button", name: "Button (버튼)" },
    { id: "card", name: "Card (카드)" },
    { id: "input", name: "Input (입력 필드)" },
    { id: "dialog", name: "Dialog (다이얼로그)" },
    { id: "badge", name: "Badge (배지)" },
    { id: "avatar", name: "Avatar (아바타)" },
    { id: "separator", name: "Separator (구분선)" },
    { id: "tabs", name: "Tabs (탭)" },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">컴포넌트 갤러리</h1>
      <p className="text-muted-foreground mb-12">
        GLASSY 프로젝트에서 사용되는 모든 UI 컴포넌트를 확인하고 테스트할 수 있습니다.
      </p>

      {/* 카테고리 네비게이션 */}
      <nav className="sticky top-4 z-10 bg-background/95 backdrop-blur mb-8 p-4 border rounded-lg">
        <div className="flex flex-wrap gap-2">
          {components.map((comp) => (
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

      {/* 컴포넌트 섹션들 */}
      <div className="space-y-12">
        {/* ... 기존 섹션들 ... */}
      </div>
    </div>
  )
}
```

**완료 기준** (선택적):
- [ ] 페이지 상단에 카테고리 네비게이션 표시
- [ ] 각 카테고리 링크 클릭 시 해당 섹션으로 스크롤
- [ ] sticky navigation (스크롤 시 상단 고정)

---

## 3. 검증 및 검토

### Step 8: 최종 검증 (30분)

```bash
# 1. 개발 서버 실행
npm run dev

# 2. 브라우저에서 http://localhost:3000/components 접속

# 3. 각 컴포넌트 섹션 확인:
# - Button: 8개 variant 버튼 표시 및 클릭 동작
# - Card: 2개 카드 표시, 반응형 그리드 레이아웃
# - Input: 4개 입력 필드 표시 및 입력 동작
# - Dialog: 다이얼로그 열기/닫기 동작
# - Badge: 4개 variant 배지 표시
# - Avatar: 3개 아바타 표시 (이미지 + 폴백)
# - Separator: 구분선 3개 표시
# - Tabs: 탭 전환 동작 (3개 탭)

# 4. 반응형 확인:
# - 모바일 (< 768px): 1열 레이아웃
# - 태블릿 (768-1024px): 2열 레이아웃
# - 데스크톱 (> 1024px): 3열 레이아웃

# 5. 타입 체크
npm run type-check

# 6. 빌드 테스트
npm run build
```

**Exit Criteria**:
- [ ] /components 페이지 에러 없이 로드 (30초 이내)
- [ ] 8개 컴포넌트 섹션 모두 존재
- [ ] 각 컴포넌트 인터랙션 정상 동작
- [ ] 한글 UI 텍스트 (영어 텍스트 없음)
- [ ] 반응형 레이아웃 정상 동작
- [ ] npm run type-check: 0 에러
- [ ] npm run build: 성공

### Step 9: 검토 요청 (CLAUDE.md 원칙)

Phase P1은 검토 필수 Phase입니다. 완료 후 다음 프로세스를 따라 검토를 요청합니다:

```bash
# 1. Git commit 생성
git add .
git commit -m "Phase P1: 기본 컴포넌트 완료

- 컴포넌트 갤러리 페이지 생성 (/app/components/page.tsx)
- shadcn/ui 컴포넌트 8개 설치 및 등록
  - 핵심: Button, Card, Input, Dialog
  - 추가: Badge, Avatar, Separator, Tabs
- 각 컴포넌트 사용 예시 및 동작 확인 가능
- 한글 UI, 반응형 레이아웃 적용

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 2. 검토 요청 메시지
echo "
✅ Phase P1 완료 - 검토 요청

완료된 작업:
- ✅ US1: 컴포넌트 갤러리 페이지 구성 (/components)
- ✅ US2: 핵심 컴포넌트 설치 (Button, Card, Input, Dialog)
- ✅ US3: 추가 컴포넌트 설치 (Badge, Avatar, Separator, Tabs)
- ✅ US4: 카테고리 네비게이션 (선택적)

검토 방법:
1. npm run dev 실행
2. http://localhost:3000/components 접속
3. 각 컴포넌트 섹션 확인 및 인터랙션 테스트
4. 반응형 확인 (모바일/태블릿/데스크톱)

검토 포인트:
- [ ] 디자인 일관성 (shadcn/ui new-york 스타일)
- [ ] 인터랙션 동작 (클릭, 입력, 탭 전환 등)
- [ ] 한글 UI 텍스트
- [ ] 반응형 레이아웃

피드백 부탁드립니다!
"
```

---

## 4. 트러블슈팅

### 4.1 shadcn/ui 설치 에러

```bash
# components.json이 없는 경우
npx shadcn@latest init

# 버전 충돌 발생 시
rm -rf node_modules package-lock.json
npm install
```

### 4.2 Import 에러

```bash
# tsconfig.json의 paths 확인
cat tsconfig.json | grep -A 5 "paths"

# 예상 출력:
# "paths": {
#   "@/*": ["./*"]
# }
```

### 4.3 갤러리 페이지 404 에러

```bash
# app/components 디렉토리 확인
ls -la app/components/

# page.tsx 파일 존재 확인
test -f app/components/page.tsx && echo "OK" || echo "NOT FOUND"
```

---

## 5. 다음 단계

Phase P1 완료 및 검토 승인 후:

1. **Git 정리** (선택적):
```bash
# 불필요한 파일 제거
git clean -fd

# 최종 상태 확인
git status
```

2. **Phase P1 완료 보고**:
```
✅ Phase P1 완료 및 검토 승인

완료된 작업:
- ✅ 8개 shadcn/ui 컴포넌트 설치
- ✅ 컴포넌트 갤러리 페이지 구성
- ✅ 검토 완료 및 승인

다음 단계: Phase P2 (조합 컴포넌트) 시작
```

3. **Phase P2 시작**:
```bash
# Phase P2 feature 생성
/speckit.specify "Phase P2: 조합 컴포넌트 - 채팅 UI, 메모리 카드 구성"
```

---

**문서 버전**: 1.0
**작성일**: 2025-12-17
**참조 문서**:
- [spec.md](./spec.md) - Phase P1 specification
- [plan.md](./plan.md) - Implementation plan
- [001-project-execution-plan/contracts/review-templates.md](../001-project-execution-plan/contracts/review-templates.md) - 검토 템플릿
