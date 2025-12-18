# Data Model: Phase P2 조합 컴포넌트

**Feature**: Phase P2 조합 컴포넌트
**Created**: 2025-12-17
**Purpose**: TypeScript 타입 정의 및 컴포넌트 Props 인터페이스 설계

## Overview

Phase P2에서 구현할 8개 조합 컴포넌트의 데이터 구조를 정의합니다. 모든 타입은 TypeScript 인터페이스로 작성되며, types/ 디렉토리에서 중앙 집중 관리됩니다.

---

## 1. Message Types (types/message.ts)

### UserMessageProps

**Purpose**: 사용자 메시지 컴포넌트 Props

```typescript
export interface UserMessageProps {
  /** 메시지 내용 */
  content: string;

  /** 전송 시간 (한글 상대 시간 형식: "방금 전", "5분 전", "오늘 오후 2:30") */
  timestamp: string;

  /** 메시지 고유 ID (optional, 실제 구현 시 사용) */
  id?: string;
}
```

**Validation Rules**:
- `content`: 필수, 빈 문자열 불가
- `timestamp`: 필수, 한글 형식

**Example**:
```typescript
const example: UserMessageProps = {
  content: "안녕하세요, Phase P2 작업을 시작합니다.",
  timestamp: "방금 전"
}
```

---

### AIMessageProps

**Purpose**: AI 응답 메시지 컴포넌트 Props

```typescript
export interface AIMessageProps {
  /** 메시지 내용 */
  content: string;

  /** 전송 시간 (한글 상대 시간 형식) */
  timestamp: string;

  /** 페르소나 이름 (예: "시니어 개발자", "프로덕트 매니저") */
  personaName: string;

  /** 페르소나 아바타 이니셜 (Avatar Fallback용, 예: "SD", "PM") */
  personaInitials: string;

  /** 페르소나 테마 컬러 (optional, 예: "#3b82f6") */
  personaColor?: string;

  /** 저장 여부 (optional, 실제 구현 시 사용) */
  isSaved?: boolean;

  /** 메시지 고유 ID (optional) */
  id?: string;

  /** 저장 버튼 클릭 핸들러 (optional) */
  onSave?: () => void;
}
```

**Validation Rules**:
- `content`: 필수, 빈 문자열 불가
- `timestamp`: 필수, 한글 형식
- `personaName`: 필수
- `personaInitials`: 필수, 1-3자 권장

**Example**:
```typescript
const example: AIMessageProps = {
  content: "Phase P2에서는 8개의 조합 컴포넌트를 구현합니다.",
  timestamp: "1분 전",
  personaName: "시니어 개발자",
  personaInitials: "SD",
  personaColor: "#3b82f6",
  isSaved: false
}
```

---

## 2. Thinking Types (types/thinking.ts)

### ThinkingStepStatus

**Purpose**: 사고 단계 상태

```typescript
export type ThinkingStepStatus = 'pending' | 'in-progress' | 'completed';
```

**Values**:
- `pending`: 대기 중 (⏳ 아이콘, 회색)
- `in-progress`: 진행 중 (⚙️ 아이콘, 파란색)
- `completed`: 완료 (✅ 아이콘, 초록색)

---

### ThinkingStep

**Purpose**: 단일 사고 단계 데이터

```typescript
export interface ThinkingStep {
  /** 단계 고유 ID */
  id: string;

  /** 단계 제목 (예: "사용자 의도 분석 중...") */
  title: string;

  /** 단계 설명 (optional, 예: "입력된 질문의 핵심 의도를 파악합니다") */
  description?: string;

  /** 단계 상태 */
  status: ThinkingStepStatus;

  /** 단계 순서 (1부터 시작) */
  order: number;
}
```

**Validation Rules**:
- `title`: 필수, "...중" 형식 권장
- `status`: 필수, ThinkingStepStatus enum 값
- `order`: 필수, 양수

**Example**:
```typescript
const step: ThinkingStep = {
  id: "step-1",
  title: "사용자 의도 분석 중...",
  description: "입력된 질문의 핵심 의도를 파악합니다",
  status: "completed",
  order: 1
}
```

---

### ThinkingProcessProps

**Purpose**: 사고 과정 컴포넌트 Props

```typescript
export interface ThinkingProcessProps {
  /** 사고 단계 목록 */
  steps: ThinkingStep[];

  /** 아코디언 기본 펼침 여부 (optional, 기본값: false) */
  defaultOpen?: boolean;

  /** 아코디언 헤더 텍스트 (optional, 기본값: "🤔 생각하는 중...") */
  headerText?: string;
}
```

**Validation Rules**:
- `steps`: 필수, 최소 1개 이상
- `steps`는 `order` 기준 정렬 권장

**Example**:
```typescript
const process: ThinkingProcessProps = {
  steps: [
    { id: "1", title: "의도 분석 중...", status: "completed", order: 1 },
    { id: "2", title: "기억 검색 중...", status: "in-progress", order: 2 },
    { id: "3", title: "답변 구조화 중...", status: "pending", order: 3 }
  ],
  defaultOpen: false,
  headerText: "🤔 생각하는 중..."
}
```

---

## 3. Memory Types (types/memory.ts)

### MemoryCardProps

**Purpose**: 저장된 기억 카드 컴포넌트 Props

```typescript
export interface MemoryCardProps {
  /** 기억 고유 ID */
  id: string;

  /** 기억 제목 */
  title: string;

  /** 기억 요약 (최대 2-3줄 권장) */
  summary: string;

  /** 생성일 (한글 형식: "2025년 12월 17일") */
  createdAt: string;

  /** 수정 버튼 클릭 핸들러 (optional) */
  onEdit?: () => void;

  /** 삭제 버튼 클릭 핸들러 (optional) */
  onDelete?: () => void;
}
```

**Validation Rules**:
- `title`: 필수, 1-100자 권장
- `summary`: 필수, 1-200자 권장
- `createdAt`: 필수, 한글 날짜 형식

**Example**:
```typescript
const memory: MemoryCardProps = {
  id: "mem-1",
  title: "Phase P1 완료 내용",
  summary: "shadcn/ui 기본 컴포넌트 8개 설치 및 갤러리 등록 완료. Button, Card, Input, Dialog, Badge, Avatar, Separator, Tabs 구현.",
  createdAt: "2025년 12월 17일"
}
```

---

### SearchResultCardProps

**Purpose**: 검색 결과 카드 컴포넌트 Props

```typescript
export interface SearchResultCardProps {
  /** 검색 결과 고유 ID */
  id: string;

  /** 문서 제목 */
  title: string;

  /** 출처 (예: "Wikipedia", "공식 문서") */
  source: string;

  /** 문서 URL */
  url: string;

  /** 문서 요약 (최대 3-4줄 권장) */
  summary: string;

  /** 선택 여부 */
  isSelected: boolean;

  /** 체크박스 변경 핸들러 (optional) */
  onToggle?: (selected: boolean) => void;
}
```

**Validation Rules**:
- `title`: 필수
- `url`: 필수, 유효한 URL 형식
- `source`: 필수
- `summary`: 필수, 1-300자 권장
- `isSelected`: 필수, boolean

**Example**:
```typescript
const result: SearchResultCardProps = {
  id: "search-1",
  title: "Next.js App Router 공식 문서",
  source: "Next.js 공식 문서",
  url: "https://nextjs.org/docs/app",
  summary: "Next.js 16 App Router는 파일 시스템 기반 라우팅을 제공하며, Server Components를 기본으로 사용합니다.",
  isSelected: true
}
```

---

## 4. Plan Types (types/plan.ts)

### PlanStepStatus

**Purpose**: 계획 단계 상태

```typescript
export type PlanStepStatus = 'pending' | 'in-progress' | 'completed' | 'skipped';
```

**Values**:
- `pending`: 대기 (Badge variant: default, 회색)
- `in-progress`: 진행중 (Badge variant: secondary, 파란색)
- `completed`: 완료 (Badge variant: success, 초록색)
- `skipped`: 건너뜀 (Badge variant: outline, 회색 테두리)

---

### PlanStepProps

**Purpose**: 계획 단계 컴포넌트 Props

```typescript
export interface PlanStepProps {
  /** 단계 고유 ID */
  id: string;

  /** 단계 순서 번호 (1부터 시작) */
  order: number;

  /** 단계 제목 */
  title: string;

  /** 단계 설명 (optional) */
  description?: string;

  /** 단계 상태 */
  status: PlanStepStatus;

  /** 선택 여부 (실행할 단계 선택용) */
  isSelected: boolean;

  /** 체크박스 변경 핸들러 (optional) */
  onToggle?: (selected: boolean) => void;

  /** 수정 버튼 클릭 핸들러 (optional) */
  onEdit?: () => void;

  /** 삭제 버튼 클릭 핸들러 (optional) */
  onDelete?: () => void;

  /** 드래그 가능 여부 (optional, 기본값: true) */
  draggable?: boolean;
}
```

**Validation Rules**:
- `title`: 필수
- `order`: 필수, 양수
- `status`: 필수, PlanStepStatus enum 값
- `isSelected`: 필수, boolean

**Example**:
```typescript
const step: PlanStepProps = {
  id: "plan-step-1",
  order: 1,
  title: "타입 정의 생성",
  description: "types/ 디렉토리에 TypeScript 인터페이스 정의",
  status: "pending",
  isSelected: true,
  draggable: true
}
```

---

### PlanCardProps

**Purpose**: 계획 카드 컴포넌트 Props

```typescript
export interface PlanCardProps {
  /** 계획 고유 ID */
  id: string;

  /** 계획 제목 */
  title: string;

  /** 계획 설명 (optional) */
  description?: string;

  /** 계획 단계 목록 */
  steps: PlanStepProps[];

  /** 실행 버튼 활성화 여부 (optional, 기본값: true) */
  executeEnabled?: boolean;

  /** 실행 버튼 클릭 핸들러 (optional) */
  onExecute?: () => void;

  /** 로딩 상태 (실행 중 표시용, optional) */
  isExecuting?: boolean;
}
```

**Validation Rules**:
- `title`: 필수
- `steps`: 필수, 최소 1개 이상
- `steps`는 `order` 기준 정렬 권장

**Example**:
```typescript
const plan: PlanCardProps = {
  id: "plan-1",
  title: "Phase P2 구현 계획",
  description: "조합 컴포넌트 구현을 위한 단계별 작업",
  steps: [
    { id: "1", order: 1, title: "타입 정의", status: "pending", isSelected: true },
    { id: "2", order: 2, title: "컴포넌트 구현", status: "pending", isSelected: true },
    { id: "3", order: 3, title: "갤러리 등록", status: "pending", isSelected: true }
  ],
  executeEnabled: true,
  isExecuting: false
}
```

---

## Type Exports Structure

각 타입 파일의 export 구조:

### types/message.ts
```typescript
export interface UserMessageProps { ... }
export interface AIMessageProps { ... }
```

### types/thinking.ts
```typescript
export type ThinkingStepStatus = 'pending' | 'in-progress' | 'completed';
export interface ThinkingStep { ... }
export interface ThinkingProcessProps { ... }
```

### types/memory.ts
```typescript
export interface MemoryCardProps { ... }
export interface SearchResultCardProps { ... }
```

### types/plan.ts
```typescript
export type PlanStepStatus = 'pending' | 'in-progress' | 'completed' | 'skipped';
export interface PlanStepProps { ... }
export interface PlanCardProps { ... }
```

---

## Relationships

```
AIMessage
  └─ may reference → ThinkingProcess
  └─ may reference → PlanCard

MemoryCard
  └─ created from → AIMessage (저장 기능)

SearchResultCard
  └─ may be attached to → AIMessage

PlanCard
  └─ contains many → PlanStep
  └─ may be attached to → AIMessage

ThinkingProcess
  └─ contains many → ThinkingStep
  └─ belongs to → AIMessage
```

---

## State Transitions

### ThinkingStepStatus
```
pending → in-progress → completed
```

### PlanStepStatus
```
pending → in-progress → completed
pending → skipped (사용자가 선택 해제)
```

---

## Validation Summary

| Type | Required Fields | Optional Fields | Constraints |
|------|----------------|-----------------|-------------|
| UserMessageProps | content, timestamp | id | content 빈 문자열 불가 |
| AIMessageProps | content, timestamp, personaName, personaInitials | personaColor, isSaved, id, onSave | personaInitials 1-3자 |
| ThinkingStep | id, title, status, order | description | order > 0 |
| ThinkingProcessProps | steps | defaultOpen, headerText | steps.length ≥ 1 |
| MemoryCardProps | id, title, summary, createdAt | onEdit, onDelete | title 1-100자, summary 1-200자 |
| SearchResultCardProps | id, title, source, url, summary, isSelected | onToggle | url 유효한 형식 |
| PlanStepProps | id, order, title, status, isSelected | description, handlers, draggable | order > 0 |
| PlanCardProps | id, title, steps | description, executeEnabled, onExecute, isExecuting | steps.length ≥ 1 |

---

**Generated**: 2025-12-17
**Status**: Ready for implementation
