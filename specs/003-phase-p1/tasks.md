# Tasks: Phase P1 기본 컴포넌트

**Input**: Design documents from `/specs/003-phase-p1/`
**Prerequisites**: plan.md ✅, spec.md ✅, quickstart.md ✅

**Tests**: Not requested - manual testing via component gallery page

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Next.js 16 App Router**: `app/` for pages, `components/` for components
- All paths are relative to repository root: `/Users/gimsuhyeon/Documents/glass_box`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify Phase P0 completion and prerequisites

- [ ] T001 Verify Phase P0 completion (package.json has zustand, framer-motion, @dnd-kit installed)
- [ ] T002 Verify shadcn/ui initialization (components.json exists at repository root)
- [ ] T003 Verify folder structure (components/ui/, app/, lib/utils.ts exist)

**Checkpoint**: Prerequisites verified - component installation can begin

---

## Phase 2: User Story 1 - 컴포넌트 갤러리 페이지 구성 (Priority: P1) 🎯 MVP

**Goal**: 개발자가 /components 페이지에서 모든 shadcn/ui 컴포넌트를 확인하고 테스트할 수 있는 갤러리 페이지 구축

**Independent Test**: `npm run dev` → http://localhost:3000/components 접속 → 갤러리 페이지 표시 확인 → 컴포넌트 섹션 존재 확인

### Implementation for User Story 1

- [ ] T004 [US1] Create app/components directory if not exists
- [ ] T005 [US1] Create gallery page skeleton with basic layout in app/components/page.tsx
- [ ] T006 [US1] Add page title "컴포넌트 갤러리" and container structure to app/components/page.tsx
- [ ] T007 [US1] Add responsive layout grid using Tailwind CSS to app/components/page.tsx
- [ ] T008 [US1] Test gallery page renders without errors (npm run dev → http://localhost:3000/components)

**Checkpoint**: Gallery page is accessible at /components with basic structure

---

## Phase 3: User Story 2 - 기본 UI 컴포넌트 설치 및 등록 (Priority: P1)

**Goal**: Button, Card, Input, Dialog 컴포넌트를 설치하고 갤러리에 등록하여 즉시 사용 가능한 상태로 만들기

**Independent Test**: /components 페이지 접속 → Button, Card, Input, Dialog 섹션 확인 → 각 컴포넌트 동작 테스트

### Implementation for User Story 2

- [ ] T009 [P] [US2] Install Button component using `npx shadcn@latest add button` (creates components/ui/button.tsx)
- [ ] T010 [P] [US2] Install Card component using `npx shadcn@latest add card` (creates components/ui/card.tsx)
- [ ] T011 [P] [US2] Install Input component using `npx shadcn@latest add input` (creates components/ui/input.tsx)
- [ ] T012 [P] [US2] Install Dialog component using `npx shadcn@latest add dialog` (creates components/ui/dialog.tsx)
- [ ] T013 [US2] Add Button section with examples to app/components/page.tsx (import Button from @/components/ui/button)
- [ ] T014 [US2] Add Card section with examples to app/components/page.tsx (import Card components)
- [ ] T015 [US2] Add Input section with examples to app/components/page.tsx (import Input)
- [ ] T016 [US2] Add Dialog section with interactive open/close example to app/components/page.tsx (useState for dialog state)
- [ ] T017 [US2] Add "use client" directive to app/components/page.tsx if interactive components require it
- [ ] T018 [US2] Test all US2 components render and interact correctly (button clicks, dialog opens/closes, input accepts text)

**Checkpoint**: Button, Card, Input, Dialog components installed and working in gallery

---

## Phase 4: User Story 3 - 추가 필수 컴포넌트 설치 및 등록 (Priority: P2)

**Goal**: Badge, Avatar, Separator, Tabs 컴포넌트를 설치하고 갤러리에 등록하여 컴포넌트 라이브러리 확장

**Independent Test**: /components 페이지 접속 → Badge, Avatar, Separator, Tabs 섹션 확인 → 각 컴포넌트 시각적 확인 및 동작 테스트

### Implementation for User Story 3

- [ ] T019 [P] [US3] Install Badge component using `npx shadcn@latest add badge` (creates components/ui/badge.tsx)
- [ ] T020 [P] [US3] Install Avatar component using `npx shadcn@latest add avatar` (creates components/ui/avatar.tsx)
- [ ] T021 [P] [US3] Install Separator component using `npx shadcn@latest add separator` (creates components/ui/separator.tsx)
- [ ] T022 [P] [US3] Install Tabs component using `npx shadcn@latest add tabs` (creates components/ui/tabs.tsx)
- [ ] T023 [US3] Add Badge section with variant examples to app/components/page.tsx (import Badge)
- [ ] T024 [US3] Add Avatar section with examples to app/components/page.tsx (import Avatar, AvatarImage, AvatarFallback)
- [ ] T025 [US3] Add Separator section with examples to app/components/page.tsx (import Separator)
- [ ] T026 [US3] Add Tabs section with interactive tab switching example to app/components/page.tsx (import Tabs components)
- [ ] T027 [US3] Test all US3 components render correctly (tabs switch, separator displays, badge variants show, avatar renders)

**Checkpoint**: All 8 components (US2 + US3) installed and working in gallery

---

## Phase 5: User Story 4 - 갤러리 페이지 레이아웃 및 네비게이션 개선 (Priority: P3)

**Goal**: 카테고리별 네비게이션과 검색 기능을 추가하여 컴포넌트 탐색 효율성 향상

**Independent Test**: /components 페이지 접속 → 카테고리 네비게이션 클릭하여 섹션 스크롤 → 검색창에 "button" 입력하여 필터링 테스트

### Implementation for User Story 4

- [ ] T028 [US4] Add category navigation component at top of app/components/page.tsx (links to each component section)
- [ ] T029 [US4] Implement scroll-to-section functionality for navigation links in app/components/page.tsx
- [ ] T030 [US4] Add search input component at top of app/components/page.tsx (useState for search term)
- [ ] T031 [US4] Implement component filtering logic based on search term in app/components/page.tsx
- [ ] T032 [US4] Add "맨 위로" (back to top) button that appears on scroll in app/components/page.tsx
- [ ] T033 [US4] Implement scroll-to-top functionality for "맨 위로" button in app/components/page.tsx
- [ ] T034 [US4] Add section IDs for anchor navigation in app/components/page.tsx (id="button", id="card", etc.)
- [ ] T035 [US4] Test navigation clicks scroll to correct sections
- [ ] T036 [US4] Test search filtering shows/hides relevant components
- [ ] T037 [US4] Test "맨 위로" button appears and scrolls to top

**Checkpoint**: Gallery page has full navigation and search capabilities

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, responsive design testing, and documentation

- [ ] T038 [P] Test gallery page on mobile viewport (< 768px) - verify responsive layout
- [ ] T039 [P] Test gallery page on tablet viewport (768-1024px) - verify responsive layout
- [ ] T040 [P] Test gallery page on desktop viewport (> 1024px) - verify responsive layout
- [ ] T041 Verify all UI text in gallery is in Korean (컴포넌트 갤러리, 버튼, 카드 등)
- [ ] T042 Run type check: `npm run type-check` - verify no TypeScript errors
- [ ] T043 Run build: `npm run build` - verify production build succeeds
- [ ] T044 Verify all component sections follow CLAUDE.md principles (한글 UI 텍스트, shadcn/ui 기반)
- [ ] T045 Verify gallery page loads within 30 seconds (SC-004 from spec.md)
- [ ] T046 Verify component list visible within 5 seconds of page load (SC-001 from spec.md)
- [ ] T047 Test all 8 components are interactive (buttons click, dialogs open, inputs accept text, tabs switch)
- [ ] T048 Run quickstart.md validation steps (Section 9: Validation)

**Checkpoint**: Phase P1 complete and ready for review

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - verify prerequisites first
- **User Story 1 (Phase 2)**: Depends on Setup - creates gallery page structure
- **User Story 2 (Phase 3)**: Depends on US1 - adds components to existing gallery
- **User Story 3 (Phase 4)**: Depends on US2 - extends component collection
- **User Story 4 (Phase 5)**: Depends on US2 and US3 - adds navigation after all components exist
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent - creates gallery page foundation
- **User Story 2 (P1)**: Depends on US1 (gallery page must exist) - installs 4 core components
- **User Story 3 (P2)**: Depends on US2 (gallery structure exists) - installs 4 additional components
- **User Story 4 (P3)**: Depends on US2 and US3 (all components installed) - adds navigation/search

### Within Each User Story

**User Story 1**:
- T004-T007 can run sequentially (creating page structure)
- T008 depends on T004-T007 completion

**User Story 2**:
- T009-T012 (component installations) can run in parallel [P]
- T013-T017 depend on T009-T012 (must have components before adding to gallery)
- T018 depends on all previous tasks

**User Story 3**:
- T019-T022 (component installations) can run in parallel [P]
- T023-T026 depend on T019-T022 (must have components before adding to gallery)
- T027 depends on all previous tasks

**User Story 4**:
- All tasks T028-T037 are sequential (each builds on previous)
- Must wait for US2 and US3 to complete first

### Parallel Opportunities

**Within User Story 2**:
```bash
# Launch all 4 component installations together:
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

**Within User Story 3**:
```bash
# Launch all 4 component installations together:
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add separator
npx shadcn@latest add tabs
```

**Within Polish Phase**:
- T038-T040 (responsive testing) can run in parallel [P]

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup (T001-T003) - verify prerequisites
2. Complete Phase 2: User Story 1 (T004-T008) - create gallery page
3. Complete Phase 3: User Story 2 (T009-T018) - install core 4 components
4. **STOP and VALIDATE**: Test gallery independently at http://localhost:3000/components
5. Request Phase P1 MVP review before continuing to US3

### Incremental Delivery

1. MVP (US1 + US2) → Gallery with 4 core components → Review
2. Add User Story 3 → Gallery with 8 components → Review
3. Add User Story 4 → Gallery with navigation/search → Final Review
4. Each story adds value without breaking previous functionality

### Sequential Execution (Single Developer)

**Recommended order**:
1. Phase 1: Setup verification (5 minutes)
2. Phase 2: US1 - Gallery structure (30 minutes)
3. Phase 3: US2 - Core components (60 minutes)
4. Phase 4: US3 - Additional components (45 minutes)
5. Phase 5: US4 - Navigation/search (60 minutes)
6. Phase 6: Polish & validation (30 minutes)

**Total estimated time**: ~4 hours

---

## Notes

- [P] tasks = different files or independent operations, can run in parallel
- [Story] label maps task to specific user story (US1, US2, US3, US4)
- Each user story should be independently testable via gallery page
- shadcn/ui components auto-generate in components/ui/ - do not create manually
- All gallery page updates go to app/components/page.tsx - single file for entire gallery
- Korean UI text required per CLAUDE.md (컴포넌트 갤러리, 버튼, 카드, 입력, 다이얼로그, etc.)
- Gallery page must use "use client" directive for interactive components (Dialog, Tabs)
- After Phase 6 completion, request Phase P1 review using template from 001-project-execution-plan/contracts/review-templates.md
- Phase P1 is a **review-required Phase** - cannot proceed to Phase P2 without user approval

---

**Generated**: 2025-12-17
**Status**: Ready for implementation
**Branch**: 003-phase-p1
**Total Tasks**: 48 tasks across 6 phases
