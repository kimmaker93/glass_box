# Implementation Plan: Phase P2 조합 컴포넌트

**Branch**: `004-phase-p2` | **Date**: 2025-12-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-phase-p2/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

**Primary Requirement**: 8개의 조합 컴포넌트(UserMessage, AIMessage, ThinkingProcess, MemoryCard, SearchResultCard, PlanCard, PlanStep)를 shadcn/ui 기반으로 구현하고 컴포넌트 갤러리에 등록하여 개발자가 시각적으로 검증할 수 있도록 함.

**Technical Approach**:
- shadcn/ui 기본 컴포넌트(Card, Button, Badge, Avatar, Accordion, Checkbox 등)를 확장하여 커스텀 컴포넌트 생성
- TypeScript 인터페이스로 Props 타입 정의
- components/ 하위 디렉토리(chat/, glass-box/, common/)에 기능별 분류하여 배치
- app/components/page.tsx의 갤러리 페이지에 섹션별로 등록
- 로컬 상태(useState) 기반 인터랙션 구현 (전역 상태 관리는 Phase P4에서)

## Technical Context

**Language/Version**: TypeScript 5.x (tsconfig.json 기준)
**Primary Dependencies**:
  - Next.js 16.0.10 (App Router)
  - React 19.2.1
  - shadcn/ui (new-york style)
  - Tailwind CSS 4
  - lucide-react (아이콘)

**Storage**: N/A (클라이언트 전용, 더미 데이터 사용)
**Testing**: 수동 테스트 (컴포넌트 갤러리 페이지 통해 시각적 검증), npm run type-check, npm run build
**Target Platform**: Web (브라우저), 반응형 (모바일/태블릿/데스크톱)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**:
  - 각 컴포넌트 섹션 5초 이내 로드/렌더링
  - 인터랙티브 요소 200ms 이내 시각적 피드백
  - 검색 기능 3초 이내 결과 표시

**Constraints**:
  - CLAUDE.md 원칙 준수 (한글 UI 텍스트, shadcn/ui 기반, Phase 경계 준수)
  - TypeScript 컴파일 오류 0건
  - 프로덕션 빌드 성공 필수
  - 컴포넌트 갤러리 등록 필수 (검토 필수 Phase)

**Scale/Scope**:
  - 8개 컴포넌트 (UserMessage, AIMessage, ThinkingProcess, MemoryCard, SearchResultCard, PlanCard, PlanStep, 갤러리 통합)
  - 5개 User Stories (US1-US5)
  - 39개 Functional Requirements
  - 예상 구현 시간: 6-7시간

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Phase 경계 준수
- **Status**: PASS
- **Check**: Phase P2는 Phase P1(기본 컴포넌트 설치) 완료 후 진행
- **Verification**: Phase P1 완료 및 승인됨 (2025-12-17)
- **Next Phase Approval**: Phase P2 완료 후 사용자 승인 필요

### ✅ 디자인 검토 필수
- **Status**: PASS (검토 대기)
- **Check**: Phase P2는 검토 필수 Phase
- **Verification**: 모든 컴포넌트는 app/components/page.tsx 갤러리에 등록
- **Review Process**: Phase P2 완료 후 사용자가 http://localhost:3000/components에서 검증

### ✅ 임의 결정 금지
- **Status**: PASS
- **Check**: spec.md에 모든 요구사항 명시, 가정(Assumptions) 문서화
- **Unclear Items**: 없음 (모든 요구사항 구체적으로 정의됨)
- **Documented Assumptions**: 8개 가정 (컴포넌트 분류, 상태 관리, 더미 데이터 등)

### ✅ 언어 규칙
- **Status**: PASS
- **Check**: 모든 UI 텍스트 한글 (GLASSY, GLASS_BOX 제외)
- **Verification**: FR-006, FR-020, FR-029, FR-039에 명시
- **Examples**: "저장", "수정", "삭제", "생각하는 중", "실행" 등

### ✅ shadcn/ui 사용 원칙
- **Status**: PASS
- **Check**: 모든 컴포넌트는 shadcn/ui 기반으로 구현
- **Base Components**: Card, Button, Badge, Avatar, Accordion, Checkbox, Separator
- **Customization**: components/chat/, components/glass-box/, components/common/에서 확장
- **Verification**: FR-035 명시

### ✅ 컴포넌트 중앙 관리
- **Status**: PASS
- **Check**: 모든 컴포넌트는 갤러리 페이지에 등록
- **Gallery Page**: app/components/page.tsx
- **Verification**: FR-030, FR-031, FR-032에 명시
- **Registration**: 각 컴포넌트 섹션에 제목, 설명, 예시 포함

### 🔍 Re-check After Phase 1 Design

**Status**: ✅ PASS

#### TypeScript 인터페이스 검증
- ✅ data-model.md 작성 완료 (8개 타입 정의)
- ✅ contracts/component-props.ts 작성 완료 (모든 Props 인터페이스 정의)
- ✅ 타입 구조가 spec.md의 Key Entities와 일치
- ✅ validation rules 명시됨

#### 컴포넌트 파일 구조 검증
- ✅ components/chat/ (UserMessage, AIMessage, ThinkingProcess)
- ✅ components/glass-box/ (MemoryCard, SearchResultCard)
- ✅ components/common/ (PlanCard, PlanStep)
- ✅ types/ (message.ts, thinking.ts, memory.ts, plan.ts)
- ✅ CLAUDE.md 디렉토리 구조와 일치

#### 한글 UI 텍스트 검증
- ✅ 모든 Props 인터페이스에 한글 주석 포함
- ✅ quickstart.md의 예시 코드에 한글 텍스트 사용 ("저장", "수정", "삭제" 등)
- ✅ data-model.md의 validation rules에 한글 형식 명시
- ✅ GLASSY, GLASS_BOX 외 모든 UI 텍스트 한글

**Final Verdict**: Constitution Check PASS - Phase 1 설계 완료, 구현 준비 완료

## Project Structure

### Documentation (this feature)

```text
specs/004-phase-p2/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (not needed - no NEEDS CLARIFICATION)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (TypeScript interfaces)
│   └── component-props.ts
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── components/
│   └── page.tsx         # 컴포넌트 갤러리 (Phase P2 섹션 추가)
├── layout.tsx
├── page.tsx
└── globals.css

components/
├── ui/                  # shadcn/ui 기본 컴포넌트 (Phase P1에서 설치)
│   ├── accordion.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── checkbox.tsx
│   └── separator.tsx
│
├── chat/                # 채팅 관련 조합 컴포넌트 (Phase P2 신규)
│   ├── UserMessage.tsx
│   ├── AIMessage.tsx
│   └── ThinkingProcess.tsx
│
├── glass-box/           # GLASS_BOX 패널 관련 조합 컴포넌트 (Phase P2 신규)
│   ├── MemoryCard.tsx
│   └── SearchResultCard.tsx
│
└── common/              # 공통 조합 컴포넌트 (Phase P2 신규)
    ├── PlanCard.tsx
    └── PlanStep.tsx

types/                   # TypeScript 타입 정의 (Phase P2 신규)
├── message.ts           # Message, UserMessage, AIMessage 타입
├── thinking.ts          # ThinkingStep, ThinkingProcess 타입
├── memory.ts            # Memory, SearchResult 타입
└── plan.ts              # PlanStep, PlanCard 타입

lib/
└── utils.ts             # shadcn/ui cn() 유틸리티 (Phase P1)

data/                    # 더미 데이터 (Phase P2 신규)
└── dummy-components.ts  # 갤러리 예시용 더미 데이터

public/
└── (정적 파일)

.next/                   # Next.js 빌드 출력
node_modules/            # 의존성
```

**Structure Decision**: Next.js App Router 기반 Web Application 구조 선택
- **Rationale**: GLASSY는 클라이언트 전용 웹 애플리케이션이므로 backend/ 불필요
- **Component Organization**: 기능별 폴더 분류 (chat/, glass-box/, common/)로 Phase P3 이후 확장성 확보
- **Type-safe**: types/ 폴더에서 중앙 집중식 타입 관리
- **Gallery-driven Development**: app/components/page.tsx를 중심으로 컴포넌트 개발 및 검증

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - Constitution Check 모든 항목 PASS, 위반 사항 없음
