# Quick Start Guide: Phase P2 조합 컴포넌트

**Feature**: Phase P2 조합 컴포넌트
**Created**: 2025-12-17
**Estimated Time**: 6-7시간
**Prerequisites**: Phase P0, P1 완료

## Overview

이 가이드는 Phase P2 조합 컴포넌트 구현을 빠르게 시작할 수 있도록 단계별 지침을 제공합니다.

---

## Prerequisites

### ✅ Completed Phases

- **Phase P0**: 프로젝트 설정 (패키지 설치, 폴더 구조)
- **Phase P1**: 기본 컴포넌트 설치 (shadcn/ui 55개 컴포넌트)

### ✅ Verification

```bash
# Phase P0 확인
ls -la components/ui/  # shadcn/ui 컴포넌트 존재 확인

# Phase P1 확인
ls -la app/components/page.tsx  # 갤러리 페이지 존재 확인

# 의존성 확인
npm list zustand framer-motion @dnd-kit/core
```

---

## Environment Setup

### 1. Branch Checkout

```bash
# 이미 004-phase-p2 브랜치에 있어야 함
git branch  # 현재 브랜치 확인
# * 004-phase-p2 여야 함

# 만약 다른 브랜치라면
git checkout 004-phase-p2
```

### 2. Install Dependencies (if needed)

```bash
# 이미 Phase P0에서 설치 완료했으나, 확인 차원에서 재실행
npm install
```

### 3. Start Development Server

```bash
npm run dev

# 브라우저에서 열기
# http://localhost:3000/components
```

---

## Implementation Steps

### Step 0: Create Directory Structure

```bash
# components/ 하위 폴더 생성
mkdir -p components/chat
mkdir -p components/glass-box
mkdir -p components/common

# types/ 폴더 생성 (이미 존재하면 스킵)
mkdir -p types

# data/ 폴더 생성 (더미 데이터용)
mkdir -p data
```

---

### Step 1: Type Definitions

**Priority**: P1 (모든 컴포넌트의 기반)

#### 1.1 Create Message Types

```bash
# types/message.ts 생성
```

```typescript
// types/message.ts
export interface UserMessageProps {
  content: string;
  timestamp: string;
  id?: string;
}

export interface AIMessageProps {
  content: string;
  timestamp: string;
  personaName: string;
  personaInitials: string;
  personaColor?: string;
  isSaved?: boolean;
  id?: string;
  onSave?: () => void;
}
```

#### 1.2 Create Thinking Types

```bash
# types/thinking.ts 생성
```

```typescript
// types/thinking.ts
export type ThinkingStepStatus = 'pending' | 'in-progress' | 'completed';

export interface ThinkingStep {
  id: string;
  title: string;
  description?: string;
  status: ThinkingStepStatus;
  order: number;
}

export interface ThinkingProcessProps {
  steps: ThinkingStep[];
  defaultOpen?: boolean;
  headerText?: string;
}
```

#### 1.3 Create Memory Types

```bash
# types/memory.ts 생성
```

```typescript
// types/memory.ts
export interface MemoryCardProps {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface SearchResultCardProps {
  id: string;
  title: string;
  source: string;
  url: string;
  summary: string;
  isSelected: boolean;
  onToggle?: (selected: boolean) => void;
}
```

#### 1.4 Create Plan Types

```bash
# types/plan.ts 생성
```

```typescript
// types/plan.ts
export type PlanStepStatus = 'pending' | 'in-progress' | 'completed' | 'skipped';

export interface PlanStepProps {
  id: string;
  order: number;
  title: string;
  description?: string;
  status: PlanStepStatus;
  isSelected: boolean;
  onToggle?: (selected: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  draggable?: boolean;
}

export interface PlanCardProps {
  id: string;
  title: string;
  description?: string;
  steps: PlanStepProps[];
  executeEnabled?: boolean;
  onExecute?: () => void;
  isExecuting?: boolean;
}
```

**Verification**:
```bash
npm run type-check  # TypeScript 컴파일 에러 없어야 함
```

---

### Step 2: Chat Message Components (User Story 1 - P1)

**Priority**: P1 MVP

#### 2.1 UserMessage Component

```bash
# components/chat/UserMessage.tsx 생성
```

**Template**:
```typescript
import { UserMessageProps } from "@/types/message"

export function UserMessage({ content, timestamp }: UserMessageProps) {
  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-[80%]">
        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2">
          <p className="text-sm">{content}</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-right">{timestamp}</p>
      </div>
    </div>
  )
}
```

#### 2.2 AIMessage Component

```bash
# components/chat/AIMessage.tsx 생성
```

**Template**:
```typescript
"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AIMessageProps } from "@/types/message"
import { Bookmark } from "lucide-react"

export function AIMessage({
  content,
  timestamp,
  personaName,
  personaInitials,
  isSaved = false,
  onSave
}: AIMessageProps) {
  const [saved, setSaved] = useState(isSaved)

  const handleSave = () => {
    setSaved(!saved)
    onSave?.()
  }

  return (
    <div className="flex gap-3 mb-4">
      <Avatar>
        <AvatarFallback>{personaInitials}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{personaName}</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div className="bg-muted rounded-lg px-4 py-2">
          <p className="text-sm">{content}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-2"
          onClick={handleSave}
        >
          <Bookmark className={saved ? "fill-current" : ""} />
          {saved ? "저장됨" : "저장"}
        </Button>
      </div>
    </div>
  )
}
```

#### 2.3 Register to Gallery

```typescript
// app/components/page.tsx에 추가
import { UserMessage } from "@/components/chat/UserMessage"
import { AIMessage } from "@/components/chat/AIMessage"

// components 배열에 추가
const components = [
  // ... 기존 Phase P1 컴포넌트들
  { id: "chat-message", name: "채팅 메시지 (UserMessage, AIMessage)" },
]

// 섹션 추가
{shouldShow("chat-message") && <section id="chat-message">
  <h2 className="text-3xl font-semibold mb-4">채팅 메시지</h2>
  <p className="text-muted-foreground mb-6">
    사용자와 AI의 대화 메시지를 표시하는 컴포넌트
  </p>
  <div className="space-y-6 p-6 border rounded-lg">
    <UserMessage
      content="안녕하세요, Phase P2 작업을 시작합니다."
      timestamp="방금 전"
    />
    <AIMessage
      content="네, Phase P2에서는 8개의 조합 컴포넌트를 구현합니다."
      timestamp="1분 전"
      personaName="시니어 개발자"
      personaInitials="SD"
    />
  </div>
</section>}
```

**Verification**:
```bash
npm run dev
# http://localhost:3000/components 접속
# "채팅 메시지" 섹션 확인
```

---

### Step 3: Thinking Process Component (User Story 2 - P1)

**Priority**: P1

#### 3.1 ThinkingProcess Component

```bash
# components/chat/ThinkingProcess.tsx 생성
```

**Template**:
```typescript
"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ThinkingProcessProps } from "@/types/thinking"
import { Loader2, CheckCircle2, Clock } from "lucide-react"

export function ThinkingProcess({
  steps,
  defaultOpen = false,
  headerText = "🤔 생각하는 중..."
}: ThinkingProcessProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? "thinking" : undefined}>
      <AccordionItem value="thinking">
        <AccordionTrigger>{headerText}</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.id} className="flex gap-3 items-start">
                {getStatusIcon(step.status)}
                <div>
                  <p className="text-sm font-medium">{step.title}</p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

#### 3.2 Register to Gallery

```typescript
// app/components/page.tsx에 섹션 추가
import { ThinkingProcess } from "@/components/chat/ThinkingProcess"

{shouldShow("thinking-process") && <section id="thinking-process">
  <h2 className="text-3xl font-semibold mb-4">사고 과정</h2>
  <p className="text-muted-foreground mb-6">
    AI의 사고 과정을 단계별로 시각화하는 아코디언 컴포넌트
  </p>
  <div className="p-6 border rounded-lg">
    <ThinkingProcess
      steps={[
        { id: "1", title: "사용자 의도 분석 중...", status: "completed", order: 1 },
        { id: "2", title: "관련 기억 검색 중...", status: "in-progress", order: 2 },
        { id: "3", title: "답변 구조화 중...", status: "pending", order: 3 }
      ]}
    />
  </div>
</section>}
```

---

### Step 4: Memory Card Components (User Story 3 - P2)

**Priority**: P2

#### 4.1 MemoryCard Component

```bash
# components/glass-box/MemoryCard.tsx 생성
```

**Template**: See contracts/component-props.ts for interface

#### 4.2 SearchResultCard Component

```bash
# components/glass-box/SearchResultCard.tsx 생성
```

**Template**: See contracts/component-props.ts for interface

---

### Step 5: Plan Components (User Story 4 - P2)

**Priority**: P2

#### 5.1 PlanStep Component

```bash
# components/common/PlanStep.tsx 생성
```

#### 5.2 PlanCard Component

```bash
# components/common/PlanCard.tsx 생성
```

---

### Step 6: Integration & Verification (User Story 5 - P3)

**Priority**: P3

#### 6.1 Update Navigation

```typescript
// app/components/page.tsx
const components = [
  // ... Phase P1
  { id: "chat-message", name: "채팅 메시지" },
  { id: "thinking-process", name: "사고 과정" },
  { id: "memory-card", name: "메모리 카드" },
  { id: "plan-card", name: "계획 카드" },
]
```

#### 6.2 Test All Components

```bash
npm run type-check
npm run build
npm run dev

# 브라우저 테스트
# - 각 컴포넌트 섹션 표시 확인
# - 인터랙션 동작 확인 (버튼, 체크박스, 아코디언)
# - 검색 기능 테스트
# - 반응형 확인 (모바일/태블릿/데스크톱)
```

---

## Validation Checklist

### Type Check
- [ ] `npm run type-check` 통과
- [ ] TypeScript 컴파일 오류 0건

### Build Check
- [ ] `npm run build` 성공
- [ ] 프로덕션 빌드 에러 없음

### Component Gallery
- [ ] `/components` 페이지 접속 가능
- [ ] 8개 컴포넌트 모두 표시
- [ ] 검색 기능 동작
- [ ] 네비게이션 링크 동작

### User Story Verification
- [ ] US1: UserMessage, AIMessage 표시 및 저장 버튼 동작
- [ ] US2: ThinkingProcess 아코디언 펼침/접힘 동작
- [ ] US3: MemoryCard, SearchResultCard 버튼 및 체크박스 동작
- [ ] US4: PlanCard, PlanStep 모든 인터랙션 동작
- [ ] US5: 전체 통합 및 검색 기능 동작

### CLAUDE.md Compliance
- [ ] 모든 UI 텍스트 한글 (GLASSY, GLASS_BOX 제외)
- [ ] shadcn/ui 기반 구현
- [ ] 컴포넌트 갤러리 등록
- [ ] Phase P1 의존성 확인

---

## Common Issues & Solutions

### Issue 1: TypeScript Import Error

```
Error: Cannot find module '@/types/message'
```

**Solution**:
```bash
# tsconfig.json에서 paths 확인
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue 2: shadcn Component Not Found

```
Error: Module not found: @/components/ui/accordion
```

**Solution**:
```bash
# Accordion 컴포넌트 설치 (Phase P1에서 이미 설치되어 있어야 함)
npx shadcn@latest add accordion
```

### Issue 3: Gallery Page Not Showing Components

**Solution**:
1. `shouldShow()` 함수 확인
2. `components` 배열에 컴포넌트 ID 추가 확인
3. 섹션 ID가 컴포넌트 ID와 일치하는지 확인

---

## Next Steps

Phase P2 완료 후:

1. **검토 요청**:
   - 사용자에게 http://localhost:3000/components 검토 요청
   - 모든 컴포넌트 동작 검증

2. **Phase P3 준비**:
   - Phase P2 승인 후 Phase P3 (레이아웃) 진행
   - 3-Panel 레이아웃 구성 시작

---

## Reference

- **Spec**: [spec.md](./spec.md)
- **Plan**: [plan.md](./plan.md)
- **Data Model**: [data-model.md](./data-model.md)
- **Contracts**: [contracts/component-props.ts](./contracts/component-props.ts)
- **CLAUDE.md**: 프로젝트 헌법 문서
- **PRD**: docs/PRD_v1.0.md

---

**Created**: 2025-12-17
**Status**: Ready to use
