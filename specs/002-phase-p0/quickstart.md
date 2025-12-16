# Quick Start: Phase P0 프로젝트 설정

**Feature**: Phase P0 프로젝트 설정
**Date**: 2025-12-17
**Purpose**: 빠른 시작 가이드 - Phase P0 작업 순서 및 명령어

---

## 1. Phase P0 개요

**목표**: 개발 환경 및 기반 구조 구축
**예상 시간**: 1일 (4-6시간)
**검토 필수**: ❌

---

## 2. 작업 순서

### Step 1: 패키지 설치 (30분)

```bash
# 1. 현재 디렉토리 확인
pwd
# /Users/gimsuhyeon/Documents/glass_box

# 2. 기존 패키지 확인
npm list --depth=0

# 3. 필수 패키지 설치
npm install zustand
npm install framer-motion
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# 4. 설치 확인
npm list zustand framer-motion @dnd-kit/core
```

**완료 기준**:
- [ ] zustand, framer-motion, @dnd-kit/* 설치 완료
- [ ] npm install 에러 없음

---

### Step 2: 폴더 구조 생성 (15분)

```bash
# 1. components 폴더 및 하위 폴더 생성
mkdir -p components/{ui,common,chat,workspace,glass-box,layout}

# 2. 기타 핵심 폴더 생성
mkdir -p stores hooks types data/{scenarios,mock-data}

# 3. 생성 확인
ls -la components/
ls -la stores/ hooks/ types/ data/
```

**완료 기준**:
- [ ] components/ 폴더와 하위 6개 폴더 존재
- [ ] stores/, hooks/, types/, data/ 폴더 존재
- [ ] data/scenarios/, data/mock-data/ 하위 폴더 존재

---

### Step 3: 타입 정의 파일 생성 (2-3시간)

#### 3.1 타입 파일 생성

```bash
# types/ 폴더에 9개 타입 파일 생성
touch types/message.ts
touch types/session.ts
touch types/workspace.ts
touch types/memory.ts
touch types/persona.ts
touch types/workflow.ts
touch types/plan.ts
touch types/thought-step.ts
touch types/scenario.ts
touch types/index.ts

# 확인
ls -la types/
```

#### 3.2 각 타입 파일에 기본 interface 작성

**types/message.ts:**
```typescript
// 메시지 타입 정의
export interface Message {
  id: string
  sessionId: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  thinkingProcess?: ThinkingStep[]
  plan?: Plan
  toolCalls?: ToolCall[]
  confidence?: number
}

export interface ThinkingStep {
  id: string
  type: 'thinking' | 'searching' | 'planning' | 'analyzing'
  content: string
  duration?: number
}

export interface ToolCall {
  id: string
  name: string
  arguments: Record<string, unknown>
  result?: unknown
}
```

**types/session.ts:**
```typescript
// 세션 타입 정의
export interface Session {
  id: string
  workspaceId: string
  name: string
  personaId?: string
  messages: string[] // Message ID 목록
  createdAt: string
  updatedAt: string
  archivedAt?: string
}
```

**types/workspace.ts:**
```typescript
// 워크스페이스 타입 정의
export interface Workspace {
  id: string
  name: string
  description?: string
  sessions: string[] // Session ID 목록
  color?: string
  icon?: string
  createdAt: string
  updatedAt: string
}
```

**types/memory.ts:**
```typescript
// 메모리 타입 정의
export interface Memory {
  id: string
  type: 'saved' | 'retrieved' | 'web'
  title: string
  content: string
  source?: string
  relevance?: number
  sessionId: string
  messageId?: string
  createdAt: string
  tags?: string[]
}
```

**types/persona.ts:**
```typescript
// 페르소나 타입 정의
export interface Persona {
  id: string
  name: string
  description: string
  systemPrompt: string
  avatar?: string
  color?: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}
```

**types/workflow.ts:**
```typescript
// 워크플로우 타입 정의
export interface Workflow {
  id: string
  name: string
  description?: string
  steps: WorkflowStep[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface WorkflowStep {
  id: string
  order: number
  type: 'prompt' | 'tool' | 'decision' | 'condition'
  config: Record<string, unknown>
}
```

**types/plan.ts:**
```typescript
// 계획 타입 정의
export interface Plan {
  id: string
  messageId: string
  title: string
  description?: string
  steps: PlanStep[]
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface PlanStep {
  id: string
  order: number
  title: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed' | 'skipped'
  result?: string
}
```

**types/thought-step.ts:**
```typescript
// 사고 과정 타입 정의
export interface ThoughtStep {
  id: string
  type: 'observation' | 'reasoning' | 'conclusion' | 'question'
  content: string
  confidence?: number
  relatedMemories?: string[] // Memory ID 목록
  timestamp: string
}
```

**types/scenario.ts:**
```typescript
// 시나리오 타입 정의
export interface Scenario {
  id: string
  name: string
  description: string
  steps: ScenarioStep[]
  createdAt: string
}

export interface ScenarioStep {
  id: string
  order: number
  type: 'user_input' | 'ai_thinking' | 'ai_planning' | 'ai_searching' | 'ai_response' | 'tool_call' | 'memory_update'
  delay: number // ms
  data: Record<string, unknown>
}

export type ScenarioStepType =
  | 'user_input'
  | 'ai_thinking'
  | 'ai_planning'
  | 'ai_searching'
  | 'ai_response'
  | 'tool_call'
  | 'memory_update'
```

**types/index.ts:**
```typescript
// 모든 타입 통합 export
export * from './message'
export * from './session'
export * from './workspace'
export * from './memory'
export * from './persona'
export * from './workflow'
export * from './plan'
export * from './thought-step'
export * from './scenario'
```

**완료 기준**:
- [ ] 9개 타입 파일 생성 완료
- [ ] 각 파일에 최소 1개 이상의 interface 정의
- [ ] types/index.ts에서 모든 타입 export

---

### Step 4: package.json 스크립트 추가 (5분)

```bash
# package.json 확인
cat package.json | grep '"type-check"'

# 없으면 추가 필요 (수동 편집 또는 아래 명령 사용)
```

**package.json에 추가할 스크립트**:
```json
{
  "scripts": {
    "type-check": "tsc --noEmit"
  }
}
```

**완료 기준**:
- [ ] package.json에 type-check 스크립트 존재

---

### Step 5: 검증 (30분)

```bash
# 1. 타입 체크
npm run type-check
# 또는
npx tsc --noEmit

# 예상 출력: (에러 없음)

# 2. 개발 서버 실행
npm run dev

# 예상 출력:
# ▲ Next.js 16.0.10
# - Local: http://localhost:3000
# ✓ Ready in 2.5s

# 3. 브라우저에서 확인
# http://localhost:3000 접속 → Next.js 페이지 표시

# 4. 개발 서버 중지 (Ctrl+C)

# 5. 빌드 테스트
npm run build

# 예상 출력:
# ✓ Compiled successfully
# ...

# 6. 프로덕션 서버 실행
npm run start

# 예상 출력:
# ▲ Next.js 16.0.10
# - Local: http://localhost:3000

# 7. 프로덕션 서버 중지 (Ctrl+C)
```

**완료 기준**:
- [ ] npm run type-check: 에러 0건
- [ ] npm run dev: 정상 실행
- [ ] http://localhost:3000: 페이지 표시
- [ ] npm run build: 빌드 성공
- [ ] npm run start: 프로덕션 서버 정상 실행

---

## 3. Exit Criteria 체크리스트

**Phase P0 완료 조건**:

- [ ] npm install 에러 없이 완료
- [ ] npm run dev 정상 실행
- [ ] npm run type-check 에러 0건
- [ ] 8개 핵심 폴더 존재
  - [ ] components/ (+ 하위 6개)
  - [ ] stores/
  - [ ] hooks/
  - [ ] types/
  - [ ] data/ (+ 하위 2개)
- [ ] 9개 타입 정의 파일 존재
  - [ ] types/message.ts
  - [ ] types/session.ts
  - [ ] types/workspace.ts
  - [ ] types/memory.ts
  - [ ] types/persona.ts
  - [ ] types/workflow.ts
  - [ ] types/plan.ts
  - [ ] types/thought-step.ts
  - [ ] types/scenario.ts
  - [ ] types/index.ts
- [ ] npm run build 성공

---

## 4. 트러블슈팅

### 4.1 npm install 에러

```bash
# 캐시 클리어 후 재설치
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### 4.2 TypeScript 에러

```bash
# tsconfig.json 확인
cat tsconfig.json

# 타입 정의 확인
ls -la types/

# 각 파일 내용 확인
cat types/message.ts
```

### 4.3 빌드 에러

```bash
# .next 캐시 클리어
rm -rf .next
npm run build
```

### 4.4 Node.js 버전 확인

```bash
# Node.js 버전 확인 (18 이상 필요)
node --version

# npm 버전 확인
npm --version
```

---

## 5. 다음 단계

Phase P0 완료 후:

1. **Git Commit**:
```bash
git add .
git commit -m "Phase P0: 프로젝트 설정 완료

- 패키지 설치: zustand, framer-motion, @dnd-kit
- 폴더 구조 생성: components/, stores/, hooks/, types/, data/
- 타입 정의: 9개 핵심 타입 파일 생성

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

2. **Phase P0 완료 보고**:
```
✅ Phase P0 완료

완료된 작업:
- ✅ 5개 패키지 설치 완료
- ✅ 8개 핵심 폴더 생성
- ✅ 9개 타입 정의 파일 생성
- ✅ npm run dev, type-check, build 모두 성공

다음 단계: Phase P1 (기본 컴포넌트) 시작
```

3. **Phase P1 시작**:
```bash
# Phase P1 feature 생성
/speckit.specify "Phase P1: 기본 컴포넌트 - shadcn/ui 컴포넌트 설치 및 갤러리 구성"
```

---

**문서 버전**: 1.0
**작성일**: 2025-12-17
**참조 문서**:
- [spec.md](./spec.md) - Phase P0 specification
- [plan.md](./plan.md) - Implementation plan
- [001-project-execution-plan/quickstart.md](../001-project-execution-plan/quickstart.md) - 전체 Phase 가이드
