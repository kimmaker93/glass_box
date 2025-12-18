# Implementation Plan: Phase P0 프로젝트 설정

**Branch**: `002-phase-p0` | **Date**: 2025-12-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-phase-p0/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Phase P0는 GLASSY 프로젝트의 기반을 구축하는 초기 설정 단계입니다. 개발자가 즉시 개발을 시작할 수 있도록 필요한 모든 패키지를 설치하고, 일관된 폴더 구조를 생성하며, TypeScript 타입 정의를 통해 타입 안정성을 확보합니다.

주요 작업:
1. **패키지 설치**: zustand (상태 관리), framer-motion (애니메이션), @dnd-kit (드래그 앤 드롭) 설치
2. **폴더 구조 생성**: components/, stores/, hooks/, types/, data/ 및 하위 폴더 생성
3. **타입 정의**: 9개 핵심 타입 파일 생성 (Message, Session, Workspace, Memory, Persona, Workflow, Plan, ThoughtStep, Scenario)
4. **검증**: npm run dev, npm run type-check, npm run build 모두 성공 확인

이 Phase는 검토가 필요하지 않으며, 완료 후 즉시 Phase P1 (기본 컴포넌트)로 진행 가능합니다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.2.1, Next.js 16.0.10 (App Router)
**Primary Dependencies**:
- **Already Installed**: shadcn/ui, Radix UI, Tailwind CSS 4, lucide-react, react-hook-form, zod, recharts, next-themes
- **To Install**: zustand, framer-motion, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities

**Storage**: localStorage (클라이언트 전용, Phase P4에서 구현)
**Testing**: N/A (단위 테스트는 Out of Scope)
**Target Platform**: Web (Next.js SSR/CSR)
**Project Type**: Web application (frontend only - Next.js App Router)

**Performance Goals**:
- npm install: 5분 이내 완료 (정상 네트워크 환경)
- npm run dev: 30초 이내 서버 응답
- npm run build: 에러 없이 성공

**Constraints**:
- Node.js 18+ 필수 (Next.js 16 요구사항)
- 백엔드 없음 (클라이언트 전용)
- 기존 Next.js 프로젝트 기반 (create-next-app으로 이미 생성됨)

**Scale/Scope**:
- 5개 패키지 설치
- 8개 핵심 폴더 생성 (components + 하위 6개, stores, hooks, types, data)
- 9개 타입 정의 파일
- 예상 작업 시간: 1일 (4-6시간)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS

이 Phase는 CLAUDE.md에 정의된 프로젝트 원칙을 준수합니다:

| 원칙 | 적용 내용 | 상태 |
|------|----------|------|
| **Phase 경계 준수** | Phase P0 작업만 수행, 완료 후 보고 | ✅ |
| **임의 결정 금지** | 모든 결정 사항은 001-project-execution-plan의 research.md에서 이미 결정됨 | ✅ |
| **shadcn/ui 우선** | Phase P0는 설정 단계로 UI 작업 없음 | ✅ (N/A) |
| **언어 규칙** | 코드 주석/변수명 영어, 문서 한글 | ✅ |

**특이사항**:
- Phase P0는 프로젝트 설정 단계로, UI 컴포넌트 작업 없음
- 타입 정의는 기본 뼈대만 생성하고, 각 Phase에서 점진적으로 확장
- 검토 필수 Phase가 아니므로 완료 후 즉시 다음 Phase 진행 가능

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
├── components/                    # [P0에서 생성]
│   ├── ui/                        # shadcn/ui 컴포넌트 (P1에서 설치)
│   ├── common/                    # 공통 커스텀 컴포넌트 (P2 이후)
│   ├── chat/                      # 채팅 관련 컴포넌트 (P2 이후)
│   ├── workspace/                 # 워크스페이스 관련 컴포넌트 (P2 이후)
│   ├── glass-box/                 # GLASS_BOX 패널 컴포넌트 (P2 이후)
│   └── layout/                    # 레이아웃 컴포넌트 (P3 이후)
│
├── lib/
│   └── utils.ts                   # 유틸리티 함수 (shadcn용 cn 함수 포함)
│
├── stores/                        # [P0에서 생성] Zustand 상태 관리 (P4에서 구현)
│   ├── useSessionStore.ts
│   ├── useMessageStore.ts
│   ├── useMemoryStore.ts
│   ├── usePersonaStore.ts
│   ├── useWorkflowStore.ts
│   └── useSettingsStore.ts
│
├── hooks/                         # [P0에서 생성] 커스텀 훅 (P5 이후)
│   └── useScenarioRunner.ts
│
├── types/                         # [P0에서 생성] TypeScript 타입 정의
│   ├── message.ts                 # Message, ThinkingStep, ToolCall
│   ├── session.ts                 # Session
│   ├── workspace.ts               # Workspace
│   ├── memory.ts                  # Memory
│   ├── persona.ts                 # Persona
│   ├── workflow.ts                # Workflow, WorkflowStep
│   ├── plan.ts                    # Plan, PlanStep
│   ├── thought-step.ts            # ThoughtStep
│   ├── scenario.ts                # Scenario, ScenarioStep, ScenarioStepType
│   └── index.ts                   # 모든 타입 통합 export
│
├── data/                          # [P0에서 생성] 더미 데이터, 시나리오
│   ├── scenarios/                 # 시나리오 JSON (P5에서 작성)
│   └── mock-data/                 # 더미 데이터 (P4-P5에서 작성)
│
├── public/                        # 정적 파일
├── components.json                # shadcn/ui 설정
├── package.json                   # [P0에서 수정] zustand, framer-motion, @dnd-kit 추가
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── CLAUDE.md                      # 프로젝트 헌법
```

**Structure Decision**:

Phase P0는 Next.js 16 App Router 기반 프로젝트의 **기반 구조를 생성**하는 단계입니다. 이 Phase에서는:

1. **폴더 생성**: components/, stores/, hooks/, types/, data/ 및 하위 폴더
2. **패키지 설치**: zustand, framer-motion, @dnd-kit/* (package.json 수정)
3. **타입 정의**: 9개 TypeScript interface 파일 작성 (types/ 디렉토리)

실제 컴포넌트, Store, 훅 구현은 후속 Phase(P1-P7)에서 진행되며, Phase P0는 "빈 폴더"와 "타입 뼈대"만 생성하여 이후 개발의 토대를 마련합니다.

이 구조는 CLAUDE.md에 정의된 표준 디렉토리 구조와 일치하며, 001-project-execution-plan의 research.md에서 결정된 기술 스택(Zustand, Framer Motion, @dnd-kit)을 반영합니다.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - Constitution Check 통과, 위반 사항 없음

---

## Phase 0 & 1 Execution Summary

### Phase 0: Research & Technical Context Resolution

**Status**: ✅ SKIPPED (Already completed in 001-project-execution-plan)

Phase P0 프로젝트 설정은 단순 환경 구축 작업이므로 추가 기술 연구가 불필요합니다. 모든 기술 스택 결정은 이미 001-project-execution-plan/research.md에서 완료되었습니다:

- **Zustand**: 6개 독립 Store 패턴
- **Framer Motion**: 60fps 애니메이션, AnimatePresence
- **@dnd-kit**: 접근성 지원 드래그 앤 드롭
- **Streaming Simulation**: setTimeout 기반 토큰 스트리밍 (30-50ms/token)

### Phase 1: Design & Contracts

**Status**: ✅ COMPLETED

**Completed Artifacts**:
1. ✅ **quickstart.md**: Phase P0 구현 가이드 (Step 1-5)
   - Step 1: 패키지 설치 (zustand, framer-motion, @dnd-kit/*)
   - Step 2: 폴더 구조 생성 (components/, stores/, hooks/, types/, data/)
   - Step 3: 타입 정의 파일 생성 (9개 TypeScript interface)
   - Step 4: package.json 스크립트 추가 (type-check)
   - Step 5: 검증 (npm run dev, type-check, build)

2. ✅ **Type Definitions**: 완전한 TypeScript interface 정의
   - types/message.ts: Message, ThinkingStep, ToolCall
   - types/session.ts: Session
   - types/workspace.ts: Workspace
   - types/memory.ts: Memory
   - types/persona.ts: Persona
   - types/workflow.ts: Workflow, WorkflowStep
   - types/plan.ts: Plan, PlanStep
   - types/thought-step.ts: ThoughtStep
   - types/scenario.ts: Scenario, ScenarioStep, ScenarioStepType
   - types/index.ts: 통합 export

**Design Decisions**:
- **No data-model.md**: Phase P0는 설정 작업으로 데이터 모델 설계 불필요
- **No contracts/**: API 계약이나 컴포넌트 인터페이스가 없으므로 생략
- **Quickstart-first approach**: 즉시 실행 가능한 단계별 가이드 제공

---

## Next Steps

이 implementation plan은 **Phase 2 (Tasks 생성)** 준비가 완료되었습니다.

### Immediate Next Actions:

1. **현재 상태 확인**:
   ```bash
   git branch  # 현재 branch: 002-phase-p0
   ls -la specs/002-phase-p0/
   # spec.md ✓
   # plan.md ✓ (this file)
   # quickstart.md ✓
   # checklists/requirements.md ✓
   ```

2. **다음 단계 선택**:
   - **Option A**: `/speckit.tasks` 실행하여 tasks.md 생성 (Phase 2)
   - **Option B**: quickstart.md를 따라 직접 구현 시작
   - **Option C**: 검토 후 구현 시작 결정

### Recommended Workflow:

**Option A 추천** (Speckit 워크플로우 완료):
```bash
/speckit.tasks
```

이후 구현 프로세스:
1. `/speckit.tasks` 실행 → tasks.md 생성
2. quickstart.md 참조하여 Task별 구현
3. Exit Criteria 체크리스트 확인
4. Phase P0 완료 보고
5. Phase P1 (기본 컴포넌트) 시작

---

## Plan Completeness Check

✅ **Summary**: 작성 완료
✅ **Technical Context**: 모든 항목 명확히 정의됨
✅ **Constitution Check**: PASS (CLAUDE.md 원칙 준수)
✅ **Project Structure**: Next.js App Router 구조 정의
✅ **Complexity Tracking**: N/A (위반 사항 없음)
✅ **Phase 0**: SKIPPED (001에서 완료됨)
✅ **Phase 1**: 완료 (quickstart.md, TypeScript interfaces)

---

**Plan Version**: 1.0
**Status**: Ready for Phase 2 (Tasks) or Implementation
**Created**: 2025-12-17
**Last Updated**: 2025-12-17
