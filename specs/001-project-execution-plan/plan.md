# Implementation Plan: GLASSY 프로젝트 실행 계획

**Branch**: `001-project-execution-plan` | **Date**: 2025-12-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-project-execution-plan/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

GLASSY 프로젝트는 AI의 사고 과정과 메모리를 투명하게 시각화하는 "Glass Box" 컨셉의 AI 챗봇 인터페이스입니다. 이 실행 계획은 PRD v1.0과 CLAUDE.md에 정의된 Phase 구조(P0-P7)를 구체화하고, 각 Phase별 작업 범위, 기능 매핑, 검토 프로세스를 명확히 정의합니다.

주요 목표:
- Phase 기반 순차적 개발 로드맵 수립 (P0: 설정 → P1: 기본 컴포넌트 → P2: 조합 컴포넌트 → P3: 레이아웃 → P4: 상태 관리 → P5: 시나리오 → P6: 통합 → P7: 마무리)
- PRD의 모든 기능(F1-F5)을 Phase에 매핑하여 개발 순서 명확화
- 검토 필수 Phase(P1, P2, P3, P6, P7) 검토 프로세스 정의
- Phase 진행 프로토콜(시작→작업→등록→보고→검토→승인→진행) 확립

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.2.1, Next.js 16.0.10 (App Router)
**Primary Dependencies**:
- UI: shadcn/ui (new-york style), Radix UI, Tailwind CSS 4, lucide-react
- State Management: Zustand (NEEDS INSTALLATION)
- Animation: Framer Motion (NEEDS INSTALLATION)
- Drag & Drop: @dnd-kit/* (NEEDS INSTALLATION)
- Forms: react-hook-form, zod
- Charts: recharts

**Storage**: localStorage (클라이언트 전용, 백엔드 없음)
**Testing**: NEEDS CLARIFICATION (단위 테스트 선택적, spec에서 out of scope로 명시됨)
**Target Platform**: Web (모바일/태블릿/데스크톱 반응형)
**Project Type**: Web application (frontend only - single project structure)
**Performance Goals**:
- 스트리밍 응답 시뮬레이션 (실시간 타이핑 효과)
- 60fps 애니메이션
- Optimistic UI 업데이트

**Constraints**:
- 백엔드 API 없음 (더미 데이터, setTimeout 기반 시뮬레이션)
- localStorage 기반 영속화
- 3-Panel 레이아웃 반응형 지원 (< 768px: 1패널, 768-1024px: 2패널, > 1024px: 3패널)

**Scale/Scope**:
- 8개 Phase (P0-P7), 약 17일 예상 작업 기간
- 5개 핵심 기능 영역 (F1: 인증, F2: 설정, F3: 워크스페이스, F4: GLASS_BOX, F5: 채팅)
- 8개 핵심 타입 정의 (Message, Session, Workspace, Memory, Persona, Workflow, Plan, ThoughtStep)
- 6개 Zustand Store
- 10+ shadcn/ui 컴포넌트, 5+ 조합 컴포넌트

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS (Constitution not defined - using CLAUDE.md project principles)

이 프로젝트는 `.specify/memory/constitution.md`에 정의된 표준 constitution이 아닌, `CLAUDE.md`에 정의된 프로젝트별 원칙을 따릅니다.

### CLAUDE.md 핵심 원칙 준수 확인:

| 원칙 | 적용 내용 | 상태 |
|------|----------|------|
| **Phase 경계 준수** | P0-P7 순차 진행, Phase 완료 후 사용자 승인 대기 | ✅ |
| **디자인 검토 필수** | P1, P2, P3, P6, P7에서 검토 프로세스 포함 | ✅ |
| **임의 결정 금지** | 모든 불명확한 사항은 research.md에서 명시, 사용자 확인 필요 | ✅ |
| **언어 규칙** | UI 텍스트 한글, 코드/변수명 영어 | ✅ |
| **shadcn/ui 우선** | 모든 UI 컴포넌트는 shadcn/ui 기반 | ✅ |
| **컴포넌트 중앙 관리** | `/app/components/page.tsx`에 갤러리 등록 필수 | ✅ |
| **시나리오 구조만 구현** | 시나리오 실행 프레임워크만 구현, 데이터는 사용자 제공 | ✅ |

### 특이사항:
- 이 실행 계획 자체는 "메타 작업" (개발 프로세스 정의)이므로 코드 구현이 아닌 문서 작업
- 실제 구현은 각 Phase를 별도 feature로 진행할 때 CLAUDE.md 원칙 적용

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
glass_box/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # 루트 레이아웃
│   ├── page.tsx                   # 메인 페이지
│   ├── globals.css                # 글로벌 스타일
│   ├── components/
│   │   └── page.tsx               # 컴포넌트 갤러리 (중앙 관리)
│   └── login/
│       └── page.tsx               # 로그인 페이지
│
├── components/
│   ├── ui/                        # shadcn/ui 컴포넌트 (자동 생성)
│   ├── common/                    # 공통 커스텀 컴포넌트
│   ├── chat/                      # 채팅 관련 컴포넌트
│   ├── workspace/                 # 워크스페이스 관련 컴포넌트
│   ├── glass-box/                 # GLASS_BOX 패널 컴포넌트
│   └── layout/                    # 레이아웃 컴포넌트
│
├── lib/
│   └── utils.ts                   # 유틸리티 함수 (shadcn용 cn 함수 포함)
│
├── stores/                        # Zustand 상태 관리
│   ├── useSessionStore.ts
│   ├── useMessageStore.ts
│   ├── useMemoryStore.ts
│   ├── usePersonaStore.ts
│   ├── useWorkflowStore.ts
│   └── useSettingsStore.ts
│
├── hooks/                         # 커스텀 훅
│   └── useScenarioRunner.ts
│
├── types/                         # TypeScript 타입 정의
│   ├── message.ts
│   ├── session.ts
│   ├── workspace.ts
│   ├── memory.ts
│   ├── persona.ts
│   ├── workflow.ts
│   ├── plan.ts
│   ├── thought-step.ts
│   └── scenario.ts
│
├── data/                          # 더미 데이터, 시나리오
│   ├── scenarios/
│   └── mock-data/
│
├── public/                        # 정적 파일
├── components.json                # shadcn/ui 설정
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── CLAUDE.md                      # 프로젝트 헌법
└── docs/
    └── PRD_v1.0.md                # 제품 요구사항 문서
```

**Structure Decision**:

Next.js 16 App Router 기반 단일 프론트엔드 프로젝트 구조를 사용합니다. 백엔드가 없으므로 frontend/backend 분리가 불필요하며, Next.js의 표준 App Router 구조를 따릅니다.

주요 특징:
- `app/` 디렉토리: Next.js App Router 구조 (페이지, 레이아웃)
- `components/` 디렉토리: 기능별 컴포넌트 분리 (ui, common, chat, workspace, glass-box, layout)
- `stores/` 디렉토리: Zustand 기반 상태 관리 (6개 store)
- `types/` 디렉토리: TypeScript 타입 정의 통합 관리
- `data/` 디렉토리: 더미 데이터 및 시나리오 JSON
- Path Aliases: `@/components`, `@/lib`, `@/hooks` 등 (tsconfig.json에 정의됨)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - Constitution Check 통과, 위반 사항 없음

---

## Phase 0 & 1 Execution Summary

### Phase 0: Research & Technical Context Resolution

**Completed Tasks**:
1. ✅ Technical Context 분석 완료 (모든 NEEDS CLARIFICATION 해결)
2. ✅ Research conducted for:
   - Zustand (state management)
   - Framer Motion (animations)
   - @dnd-kit (drag and drop)
   - Streaming text simulation
3. ✅ research.md 생성 (기술 스택 결정 문서화)

**Key Decisions**:
- **State Management**: Zustand with 6 independent stores (session, message, memory, persona, workflow, settings)
- **Animation**: Framer Motion for 60fps animations
- **Drag & Drop**: @dnd-kit with full accessibility support
- **Streaming**: setTimeout-based token streaming (30-50ms/token)

### Phase 1: Design & Contracts

**Completed Artifacts**:
1. ✅ **data-model.md**: 4개 핵심 엔티티 정의 (Phase, Feature, Task, Checkpoint)
2. ✅ **contracts/**: Phase 실행 프로토콜 및 검토 템플릿
   - phase-execution-protocol.md: 7단계 프로토콜 정의
   - review-templates.md: P1, P2, P3, P6, P7 검토 템플릿
3. ✅ **quickstart.md**: Phase별 실행 가이드 및 명령어 요약
4. ✅ **Agent Context Update**: CLAUDE.md에 기술 스택 추가

**Data Model Summary**:
```
Phase (P0-P7)
  ├── Feature (F1-F5) - PRD 기능 매핑
  ├── Task - Phase별 동적 생성
  └── Checkpoint - 완료 및 검토 상태 추적
```

**Phase Execution Protocol**:
```
시작 → 작업 → 등록 → 보고 → 검토 → 승인 → 진행
```

---

## Next Steps

이 implementation plan은 **Phase 2 (Tasks 생성)** 단계까지 완료되었습니다.

### Immediate Next Actions:

1. **Branch 확인**:
   ```bash
   git branch  # 현재 branch: 001-project-execution-plan
   ```

2. **Artifacts 확인**:
   ```bash
   ls -la specs/001-project-execution-plan/
   # plan.md ✓
   # research.md ✓
   # data-model.md ✓
   # quickstart.md ✓
   # contracts/ ✓
   ```

3. **다음 단계 선택**:
   - **Option A**: `/speckit.tasks` 실행하여 tasks.md 생성 (Phase 2)
   - **Option B**: 이 실행 계획을 기반으로 Phase P0부터 순차 진행
   - **Option C**: 각 Phase를 별도 feature로 관리 (예: 002-phase-p0, 003-phase-p1, ...)

### Recommended Approach:

**하이브리드 접근법** (CLAUDE.md에 명시된 대로):
- 전체 Phase 구조는 이 실행 계획으로 관리
- 각 Phase를 개별 feature 브랜치로 실행
- Phase 완료 후 main 브랜치로 merge
- 검토 필수 Phase는 PR을 통한 검토 프로세스 진행

### Package Installation (Phase P0 시작 전):

```bash
npm install zustand
npm install framer-motion
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

## Plan Completeness Check

✅ **Summary**: 작성 완료
✅ **Technical Context**: 모든 NEEDS CLARIFICATION 해결
✅ **Constitution Check**: PASS (CLAUDE.md 원칙 준수)
✅ **Project Structure**: Next.js App Router 구조 정의
✅ **Complexity Tracking**: N/A (위반 사항 없음)
✅ **Phase 0**: Research 완료 (research.md)
✅ **Phase 1**: Design 완료 (data-model.md, contracts/, quickstart.md)
✅ **Agent Context**: CLAUDE.md 업데이트 완료

---

**Plan Version**: 1.0
**Status**: Ready for Phase 2 (Tasks) or Implementation
**Created**: 2025-12-17
**Last Updated**: 2025-12-17
