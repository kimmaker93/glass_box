# Implementation Plan: Phase P1 기본 컴포넌트

**Branch**: `003-phase-p1` | **Date**: 2025-12-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-phase-p1/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Phase P1은 GLASSY 프로젝트의 기본 UI 컴포넌트 라이브러리를 구축하는 단계입니다. shadcn/ui 기반 8개 핵심 컴포넌트(Button, Card, Input, Dialog, Badge, Avatar, Separator, Tabs)를 설치하고, /components 페이지에 컴포넌트 갤러리를 구성하여 모든 컴포넌트를 중앙에서 관리하고 테스트할 수 있도록 합니다.

주요 작업:
1. **컴포넌트 갤러리 페이지**: /app/components/page.tsx 생성 - 모든 컴포넌트를 시각적으로 확인하고 인터랙션 테스트 가능
2. **핵심 컴포넌트 설치 (US2)**: Button, Card, Input, Dialog - Phase P2 이후 조합 컴포넌트 개발의 기반
3. **추가 컴포넌트 설치 (US3)**: Badge, Avatar, Separator, Tabs - 채팅 UI, 워크스페이스 UI 구성에 필요
4. **네비게이션 개선 (US4)**: 카테고리 네비게이션, 검색 기능 - 컴포넌트 탐색 효율성 향상

이 Phase는 검토 필수 Phase이며, 완료 후 사용자 검토 및 승인을 받아야 Phase P2 (조합 컴포넌트)로 진행 가능합니다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.2.1, Next.js 16.0.10 (App Router)
**Primary Dependencies**:
- **UI Framework**: shadcn/ui (new-york style), Radix UI, Tailwind CSS 4
- **Icons**: lucide-react
- **Already Installed**: zustand, framer-motion, @dnd-kit (Phase P0)
- **To Install**: 없음 (shadcn/ui 컴포넌트는 CLI로 개별 설치)

**Storage**: N/A (Phase P1은 UI 컴포넌트 설치만, 상태 관리는 Phase P4)
**Testing**: N/A (테스트는 Out of Scope, 수동 검토로 대체)
**Target Platform**: Web (Next.js SSR/CSR, 반응형 - 모바일/태블릿/데스크톱)
**Project Type**: Web application (frontend only - Next.js App Router)

**Performance Goals**:
- 갤러리 페이지 로드: 30초 이내
- 갤러리 페이지 컴포넌트 목록 확인: 5초 이내
- 60fps 애니메이션 (Framer Motion 사용 시)

**Constraints**:
- 백엔드 없음 (클라이언트 전용 갤러리 페이지)
- 갤러리 페이지는 정적 페이지 (서버 API 호출 없음)
- 한글 UI 텍스트 필수 (CLAUDE.md 언어 규칙)
- 컴포넌트 중앙 관리 필수 (CLAUDE.md 원칙)

**Scale/Scope**:
- 8개 shadcn/ui 컴포넌트 설치 (Button, Card, Input, Dialog, Badge, Avatar, Separator, Tabs)
- 1개 갤러리 페이지 (/app/components/page.tsx)
- 4개 User Stories (US1-US4)
- 예상 작업 시간: 2-3일 (컴포넌트 설치 + 갤러리 페이지 구성 + 검토)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: ✅ PASS

이 Phase는 CLAUDE.md에 정의된 프로젝트 원칙을 준수합니다:

| 원칙 | 적용 내용 | 상태 |
|------|----------|------|
| **Phase 경계 준수** | Phase P1 작업만 수행, 완료 후 검토 및 승인 대기 | ✅ |
| **디자인 검토 필수** | Phase P1은 검토 필수 Phase - 완료 후 /components 페이지에서 검토 | ✅ |
| **임의 결정 금지** | 모든 컴포넌트는 spec.md에 명시됨 (Button, Card, Input, Dialog, Badge, Avatar, Separator, Tabs) | ✅ |
| **언어 규칙** | 갤러리 페이지 UI 텍스트 한글, 코드/변수명 영어 | ✅ |
| **shadcn/ui 우선** | 모든 UI 컴포넌트는 shadcn/ui 기반, 직접 스타일링 최소화 | ✅ |
| **컴포넌트 중앙 관리** | 모든 컴포넌트는 /app/components/page.tsx 갤러리에 등록 필수 | ✅ |

**특이사항**:
- Phase P1은 검토 필수 Phase로, 완료 후 갤러리 페이지(/components)를 통한 시각적 검토 필수
- 검토 템플릿은 001-project-execution-plan/contracts/review-templates.md 참조
- 컴포넌트 추가 시 반드시 갤러리 페이지에도 등록하여 중앙 관리 원칙 준수
- 이 Phase 완료 후 즉시 다음 Phase 진행 불가 - 검토 및 승인 필요

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
│   ├── components/                # [P1에서 생성]
│   │   └── page.tsx               # ★ 컴포넌트 갤러리 페이지 (US1)
│   └── login/
│       └── page.tsx               # 로그인 페이지
│
├── components/                    # [P0에서 생성]
│   ├── ui/                        # shadcn/ui 컴포넌트 (P1에서 설치)
│   │   ├── button.tsx             # ★ US2: 핵심 컴포넌트
│   │   ├── card.tsx               # ★ US2: 핵심 컴포넌트
│   │   ├── input.tsx              # ★ US2: 핵심 컴포넌트
│   │   ├── dialog.tsx             # ★ US2: 핵심 컴포넌트
│   │   ├── badge.tsx              # ★ US3: 추가 컴포넌트
│   │   ├── avatar.tsx             # ★ US3: 추가 컴포넌트
│   │   ├── separator.tsx          # ★ US3: 추가 컴포넌트
│   │   ├── tabs.tsx               # ★ US3: 추가 컴포넌트
│   │   └── [기존 53개 컴포넌트]   # Phase P0에서 이미 설치된 컴포넌트들
│   ├── common/                    # 공통 커스텀 컴포넌트 (P2 이후)
│   ├── chat/                      # 채팅 관련 컴포넌트 (P2 이후)
│   ├── workspace/                 # 워크스페이스 관련 컴포넌트 (P2 이후)
│   ├── glass-box/                 # GLASS_BOX 패널 컴포넌트 (P2 이후)
│   └── layout/                    # 레이아웃 컴포넌트 (P3 이후)
│
├── lib/
│   └── utils.ts                   # 유틸리티 함수 (shadcn용 cn 함수 포함)
│
├── stores/                        # Zustand 상태 관리 (P4에서 구현)
├── hooks/                         # 커스텀 훅 (P5 이후)
├── types/                         # TypeScript 타입 정의 (P0에서 생성)
├── data/                          # 더미 데이터, 시나리오 (P5 이후)
│
├── public/                        # 정적 파일
├── components.json                # shadcn/ui 설정
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── CLAUDE.md                      # 프로젝트 헌법
```

**Structure Decision**:

Phase P1은 Next.js 16 App Router 구조 내에서 **UI 컴포넌트 레이어**를 구축합니다:

1. **/app/components/page.tsx** (새로 생성):
   - 컴포넌트 갤러리 페이지
   - 모든 설치된 shadcn/ui 컴포넌트를 import하여 렌더링
   - 각 컴포넌트의 동작 예시 포함

2. **/components/ui/** (8개 컴포넌트 추가):
   - shadcn/ui CLI로 자동 생성됨 (`npx shadcn@latest add [컴포넌트명]`)
   - US2: Button, Card, Input, Dialog (P1 우선순위)
   - US3: Badge, Avatar, Separator, Tabs (P2 우선순위)
   - 기존 53개 컴포넌트는 그대로 유지 (Phase P0에서 이미 설치)

3. **기타 폴더** (Phase P1에서는 사용 안 함):
   - components/common, chat, workspace 등은 Phase P2-P3에서 사용
   - stores/, hooks/ 등은 Phase P4-P5에서 사용

**Phase P1 범위**:
- **생성**: /app/components/page.tsx (1개 파일)
- **설치**: components/ui/ 내 8개 컴포넌트
- **수정**: 없음 (기존 파일 수정 없음)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

N/A - Constitution Check 통과, 위반 사항 없음

---

## Phase 0 & 1 Execution Summary

### Phase 0: Research & Technical Context Resolution

**Status**: ✅ SKIPPED (No research needed)

Phase P1 기본 컴포넌트 설치는 잘 정립된 패턴이므로 추가 기술 연구가 불필요합니다:

- **shadcn/ui 컴포넌트**: 공식 문서화된 설치 방법 (`npx shadcn@latest add [컴포넌트명]`)
- **컴포넌트 갤러리**: Next.js App Router 페이지 구조 활용
- **반응형 디자인**: Tailwind CSS 4 반응형 유틸리티 사용
- **한글 UI**: 직접 한글 텍스트 작성

모든 기술 스택은 Phase P0 및 001-project-execution-plan에서 이미 결정되었으므로, 바로 Phase 1 (Design & Contracts) 진행합니다.

### Phase 1: Design & Contracts

**Status**: ✅ COMPLETED

**Completed Artifacts**:
1. ✅ **quickstart.md**: Phase P1 구현 가이드
   - shadcn/ui 컴포넌트 설치 방법 (8개 컴포넌트)
   - 갤러리 페이지 구현 가이드 (/app/components/page.tsx)
   - 각 User Story별 구현 순서
   - 검증 방법 및 검토 요청 프로세스

**Design Decisions**:
- **No data-model.md**: Phase P1은 UI 컴포넌트 설치로 데이터 모델 불필요
- **No contracts/**: API 엔드포인트나 서버 컴포넌트가 없으므로 생략
- **Quickstart-first approach**: 단계별 실행 가능한 가이드 제공 (shadcn CLI 명령, 갤러리 페이지 코드)

**Component Gallery Design**:
- **페이지 레이아웃**: 제목 + 컴포넌트 섹션 목록 (US1)
- **컴포넌트 섹션**: 컴포넌트명(한글) + 설명 + 사용 예시 (실제 렌더링)
- **네비게이션** (US4): 상단 카테고리 링크 + 검색 기능 (선택적)
- **반응형**: Tailwind CSS grid/flex 활용

---

## Next Steps

이 implementation plan은 **Phase 2 (Tasks 생성)** 준비가 완료되었습니다.

### Immediate Next Actions:

1. **현재 상태 확인**:
   ```bash
   git branch  # 현재 branch: 003-phase-p1
   ls -la specs/003-phase-p1/
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
3. 각 User Story 완료 후 /components 페이지에서 확인
4. Phase P1 완료 보고 및 검토 요청
5. 검토 승인 후 Phase P2 (조합 컴포넌트) 시작

---

## Plan Completeness Check

✅ **Summary**: 작성 완료
✅ **Technical Context**: 모든 항목 명확히 정의됨
✅ **Constitution Check**: PASS (CLAUDE.md 원칙 준수)
✅ **Project Structure**: Next.js App Router 구조 정의
✅ **Complexity Tracking**: N/A (위반 사항 없음)
✅ **Phase 0**: SKIPPED (연구 불필요)
✅ **Phase 1**: 완료 (quickstart.md)

---

**Plan Version**: 1.0
**Status**: Ready for Phase 2 (Tasks) or Implementation
**Created**: 2025-12-17
**Last Updated**: 2025-12-17
