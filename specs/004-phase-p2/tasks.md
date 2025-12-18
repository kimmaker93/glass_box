# Tasks: Phase P2 조합 컴포넌트

**Input**: Design documents from `/specs/004-phase-p2/`
**Prerequisites**: plan.md ✅, spec.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Not requested - manual testing via component gallery page

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- **Next.js 16 App Router**: `app/` for pages, `components/` for components, `types/` for TypeScript interfaces
- All paths are relative to repository root: `/Users/gimsuhyeon/Documents/glass_box`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify Phase P0/P1 completion and create directory structure

- [ ] T001 Verify Phase P0 completion (package.json has zustand, framer-motion, @dnd-kit installed)
- [ ] T002 Verify Phase P1 completion (components/ui/ has shadcn components, app/components/page.tsx exists)
- [ ] T003 [P] Create components/chat directory for chat components
- [ ] T004 [P] Create components/glass-box directory for GLASS_BOX components
- [ ] T005 [P] Create components/common directory for shared components
- [ ] T006 [P] Create data directory for dummy data (if not exists)

**Checkpoint**: Directory structure ready - component implementation can begin

---

## Phase 2: Type Definitions (Foundational)

**Purpose**: Create TypeScript interfaces that all components depend on

**⚠️ CRITICAL**: No component implementation can begin until this phase is complete

- [ ] T007 [P] Create types/message.ts with UserMessageProps and AIMessageProps interfaces
- [ ] T008 [P] Create types/thinking.ts with ThinkingStepStatus, ThinkingStep, ThinkingProcessProps interfaces
- [ ] T009 [P] Create types/memory.ts with MemoryCardProps and SearchResultCardProps interfaces
- [ ] T010 [P] Create types/plan.ts with PlanStepStatus, PlanStepProps, PlanCardProps interfaces
- [ ] T011 Run `npm run type-check` to verify all types compile without errors

**Checkpoint**: All types defined - component implementation can now begin in parallel

---

## Phase 3: User Story 1 - 채팅 메시지 컴포넌트 구현 (Priority: P1) 🎯 MVP

**Goal**: UserMessage와 AIMessage 컴포넌트를 구현하고 갤러리에 등록하여 개발자가 시각적으로 검증할 수 있도록 함

**Independent Test**: npm run dev → http://localhost:3000/components 접속 → "채팅 메시지" 섹션 확인 → UserMessage와 AIMessage 예시 확인 → 저장 버튼 클릭 테스트

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create components/chat/UserMessage.tsx with UserMessageProps interface (오른쪽 정렬 레이아웃)
- [ ] T013 [P] [US1] Create components/chat/AIMessage.tsx with AIMessageProps interface (왼쪽 정렬, Avatar, 저장 버튼)
- [ ] T014 [US1] Add "use client" directive to AIMessage.tsx (useState for save button)
- [ ] T015 [US1] Import shadcn/ui Avatar component in AIMessage.tsx (from @/components/ui/avatar)
- [ ] T016 [US1] Import shadcn/ui Button component in AIMessage.tsx (from @/components/ui/button)
- [ ] T017 [US1] Import lucide-react Bookmark icon for save button in AIMessage.tsx
- [ ] T018 [US1] Add "채팅 메시지 (UserMessage, AIMessage)" to components array in app/components/page.tsx
- [ ] T019 [US1] Add "chat-message" section to app/components/page.tsx with component imports
- [ ] T020 [US1] Add UserMessage example (content: "안녕하세요, Phase P2 작업을 시작합니다.", timestamp: "방금 전")
- [ ] T021 [US1] Add AIMessage example (personaName: "시니어 개발자", personaInitials: "SD", content: "Phase P2에서는 8개의 조합 컴포넌트를 구현합니다.")
- [ ] T022 [US1] Add long text UserMessage example to test line wrapping
- [ ] T023 [US1] Test responsive layout on mobile (< 768px) - verify messages stack properly
- [ ] T024 [US1] Test responsive layout on tablet (768-1024px)
- [ ] T025 [US1] Test responsive layout on desktop (> 1024px)
- [ ] T026 [US1] Test save button interaction - verify button state changes and visual feedback
- [ ] T027 [US1] Run `npm run type-check` to verify US1 components compile
- [ ] T028 [US1] Run `npm run dev` and verify "채팅 메시지" section displays correctly

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently at /components

---

## Phase 4: User Story 2 - 사고 과정 컴포넌트 구현 (Priority: P1)

**Goal**: ThinkingProcess 아코디언 컴포넌트를 구현하고 갤러리에 등록하여 AI 사고 과정 시각화를 검증할 수 있도록 함

**Independent Test**: /components 접속 → "사고 과정" 섹션 확인 → 아코디언 클릭하여 펼침/접힘 테스트 → 각 단계의 상태 아이콘 확인

### Implementation for User Story 2

- [ ] T029 [US2] Verify Accordion component exists in components/ui/accordion.tsx (installed in Phase P1)
- [ ] T030 [US2] Create components/chat/ThinkingProcess.tsx with ThinkingProcessProps interface
- [ ] T031 [US2] Add "use client" directive to ThinkingProcess.tsx (Accordion requires client component)
- [ ] T032 [US2] Import Accordion, AccordionContent, AccordionItem, AccordionTrigger from @/components/ui/accordion
- [ ] T033 [US2] Import lucide-react icons (Loader2, CheckCircle2, Clock) for status icons
- [ ] T034 [US2] Implement getStatusIcon function to map status to icon (pending: Clock, in-progress: Loader2 with spin, completed: CheckCircle2)
- [ ] T035 [US2] Implement accordion with defaultValue based on defaultOpen prop
- [ ] T036 [US2] Map steps array to accordion content with status icons
- [ ] T037 [US2] Add "사고 과정 (ThinkingProcess)" to components array in app/components/page.tsx
- [ ] T038 [US2] Add "thinking-process" section to app/components/page.tsx with component import
- [ ] T039 [US2] Add ThinkingProcess example with 3 steps (의도 분석: completed, 기억 검색: in-progress, 답변 구조화: pending)
- [ ] T040 [US2] Add step descriptions to example (optional description field)
- [ ] T041 [US2] Test accordion expand/collapse animation
- [ ] T042 [US2] Test status icon colors and animations (spinner for in-progress)
- [ ] T043 [US2] Test with empty steps array to verify graceful handling
- [ ] T044 [US2] Run `npm run type-check` to verify US2 components compile
- [ ] T045 [US2] Run `npm run dev` and verify "사고 과정" section displays correctly

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - 메모리 카드 컴포넌트 구현 (Priority: P2)

**Goal**: MemoryCard와 SearchResultCard 컴포넌트를 구현하고 갤러리에 등록하여 메모리 관리 UI를 검증할 수 있도록 함

**Independent Test**: /components 접속 → "메모리 카드" 섹션 확인 → MemoryCard의 수정/삭제 버튼 클릭 → SearchResultCard의 체크박스 선택/해제 → URL 클릭 테스트

### Implementation for User Story 3

- [ ] T046 [P] [US3] Create components/glass-box/MemoryCard.tsx with MemoryCardProps interface
- [ ] T047 [P] [US3] Create components/glass-box/SearchResultCard.tsx with SearchResultCardProps interface
- [ ] T048 [US3] Add "use client" directive to both components (Button onClick, Checkbox state)
- [ ] T049 [US3] Import Card, CardHeader, CardTitle, CardDescription, CardContent from @/components/ui/card in MemoryCard
- [ ] T050 [US3] Import Button from @/components/ui/button in MemoryCard
- [ ] T051 [US3] Import lucide-react icons (Edit, Trash2) for MemoryCard buttons
- [ ] T052 [US3] Implement MemoryCard layout (title, summary, createdAt, edit/delete buttons)
- [ ] T053 [US3] Import Card, Checkbox from shadcn/ui in SearchResultCard
- [ ] T054 [US3] Import useState from react in SearchResultCard for checkbox state
- [ ] T055 [US3] Implement SearchResultCard layout (checkbox, title, source, URL as link, summary)
- [ ] T056 [US3] Style URL as clickable link with underline and color (className: "text-primary underline")
- [ ] T057 [US3] Add "메모리 카드 (MemoryCard, SearchResultCard)" to components array in app/components/page.tsx
- [ ] T058 [US3] Add "memory-card" section to app/components/page.tsx with component imports
- [ ] T059 [US3] Add MemoryCard example (title: "Phase P1 완료 내용", summary: "shadcn/ui 기본 컴포넌트 8개 설치...", createdAt: "2025년 12월 17일")
- [ ] T060 [US3] Add SearchResultCard example (title: "Next.js App Router 공식 문서", source: "Next.js 공식 문서", url: "https://nextjs.org/docs/app", isSelected: true)
- [ ] T061 [US3] Add second MemoryCard with longer summary to test text wrapping
- [ ] T062 [US3] Test MemoryCard edit button click - verify visual feedback (button hover, active states)
- [ ] T063 [US3] Test MemoryCard delete button click - verify visual feedback
- [ ] T064 [US3] Test SearchResultCard checkbox toggle - verify state changes
- [ ] T065 [US3] Test SearchResultCard URL click - verify link styling (underline, color)
- [ ] T066 [US3] Test responsive layout for both cards on mobile/tablet/desktop
- [ ] T067 [US3] Run `npm run type-check` to verify US3 components compile
- [ ] T068 [US3] Run `npm run dev` and verify "메모리 카드" section displays correctly

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - 계획 카드 컴포넌트 구현 (Priority: P2)

**Goal**: PlanCard와 PlanStep 컴포넌트를 구현하고 갤러리에 등록하여 AI 실행 계획 UI를 검증할 수 있도록 함

**Independent Test**: /components 접속 → "계획 카드" 섹션 확인 → PlanStep 체크박스 토글 → 수정/삭제 버튼 클릭 → 실행 버튼 상태 변경 확인 → 드래그 핸들 시각적 확인

### Implementation for User Story 4

- [ ] T069 [P] [US4] Create components/common/PlanStep.tsx with PlanStepProps interface
- [ ] T070 [P] [US4] Create components/common/PlanCard.tsx with PlanCardProps interface
- [ ] T071 [US4] Add "use client" directive to both components (Checkbox, Button interactions)
- [ ] T072 [US4] Import Checkbox from @/components/ui/checkbox in PlanStep
- [ ] T073 [US4] Import Badge from @/components/ui/badge in PlanStep
- [ ] T074 [US4] Import Button from @/components/ui/button in PlanStep
- [ ] T075 [US4] Import lucide-react icons (GripVertical, Edit, Trash2) for PlanStep
- [ ] T076 [US4] Implement getBadgeVariant function to map status to Badge variant (pending: default, in-progress: secondary, completed: success, skipped: outline)
- [ ] T077 [US4] Implement PlanStep layout (drag handle, checkbox, order number, title, description, status badge, edit/delete buttons)
- [ ] T078 [US4] Import Card, CardHeader, CardTitle, CardDescription, CardContent from @/components/ui/card in PlanCard
- [ ] T079 [US4] Import Button from @/components/ui/button in PlanCard
- [ ] T080 [US4] Import PlanStep component in PlanCard
- [ ] T081 [US4] Implement PlanCard layout (title, description, steps list, execute button)
- [ ] T082 [US4] Add execute button with loading state (disabled when isExecuting: true)
- [ ] T083 [US4] Map steps array to PlanStep components
- [ ] T084 [US4] Add "계획 카드 (PlanCard, PlanStep)" to components array in app/components/page.tsx
- [ ] T085 [US4] Add "plan-card" section to app/components/page.tsx with component imports
- [ ] T086 [US4] Create dummy plan data with 3 steps (타입 정의: pending, 컴포넌트 구현: pending, 갤러리 등록: pending)
- [ ] T087 [US4] Add PlanCard example with title: "Phase P2 구현 계획", description: "조합 컴포넌트 구현을 위한 단계별 작업"
- [ ] T088 [US4] Test PlanStep checkbox toggle - verify state changes
- [ ] T089 [US4] Test PlanStep edit button click - verify visual feedback
- [ ] T090 [US4] Test PlanStep delete button click - verify visual feedback
- [ ] T091 [US4] Test status badge colors (pending: gray, in-progress: blue, completed: green, skipped: gray outline)
- [ ] T092 [US4] Test execute button click - verify state changes (disabled state)
- [ ] T093 [US4] Test drag handle visibility (GripVertical icon should be visible)
- [ ] T094 [US4] Test responsive layout for PlanCard and PlanStep on mobile/tablet/desktop
- [ ] T095 [US4] Run `npm run type-check` to verify US4 components compile
- [ ] T096 [US4] Run `npm run dev` and verify "계획 카드" section displays correctly

**Checkpoint**: All 4 primary user stories (US1-US4) should now be independently functional

---

## Phase 7: User Story 5 - 컴포넌트 갤러리 통합 및 검증 (Priority: P3)

**Goal**: 모든 Phase P2 컴포넌트를 갤러리에 통합하고 검색/네비게이션 기능을 검증하여 완전한 컴포넌트 라이브러리를 구축함

**Independent Test**: /components 접속 → 검색창에 "메시지" 입력 → 채팅 메시지만 필터링 확인 → 네비게이션 링크 클릭하여 섹션 이동 → "맨 위로" 버튼 테스트

### Implementation for User Story 5

- [ ] T097 [US5] Verify all Phase P2 components are added to components array in app/components/page.tsx (chat-message, thinking-process, memory-card, plan-card)
- [ ] T098 [US5] Update navigation filter to include Phase P2 components in filteredComponents
- [ ] T099 [US5] Test search functionality with "채팅" - verify only chat-message section shows
- [ ] T100 [US5] Test search functionality with "메모리" - verify only memory-card section shows
- [ ] T101 [US5] Test search functionality with "계획" - verify only plan-card section shows
- [ ] T102 [US5] Test navigation links - verify clicking navigates to correct section (smooth scroll)
- [ ] T103 [US5] Test "맨 위로" button - verify smooth scroll to top
- [ ] T104 [US5] Verify all section IDs match navigation href anchors (id="chat-message", etc.)
- [ ] T105 [US5] Test search clear - verify all sections reappear when search is empty
- [ ] T106 [US5] Test responsive navigation on mobile - verify navigation wraps properly
- [ ] T107 [US5] Verify all UI text is in Korean (except GLASSY, GLASS_BOX)
- [ ] T108 [US5] Run `npm run type-check` to verify entire gallery page compiles
- [ ] T109 [US5] Run `npm run dev` and verify all Phase P2 sections display in correct order

**Checkpoint**: Gallery integration complete - all Phase P2 components accessible and searchable

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, responsive design testing, and production readiness

- [ ] T110 [P] Test gallery page on Chrome, Firefox, Safari browsers
- [ ] T111 [P] Test all Phase P2 components on mobile viewport (< 768px) - verify no horizontal scroll
- [ ] T112 [P] Test all Phase P2 components on tablet viewport (768-1024px)
- [ ] T113 [P] Test all Phase P2 components on desktop viewport (> 1024px)
- [ ] T114 Verify all interactive elements have visual feedback (hover, active, focus states)
- [ ] T115 Test keyboard navigation for all interactive elements (Tab, Enter, Space)
- [ ] T116 Verify all buttons have appropriate ARIA labels for accessibility
- [ ] T117 Test with long text content in all components (verify no layout breaks)
- [ ] T118 Test with empty/null values to ensure graceful handling
- [ ] T119 Verify all timestamps use Korean format ("방금 전", "5분 전", etc.)
- [ ] T120 Run `npm run type-check` to verify zero TypeScript errors
- [ ] T121 Run `npm run build` to verify production build succeeds
- [ ] T122 Test production build with `npm run start` to verify all components work
- [ ] T123 Verify gallery page loads within 5 seconds (SC-002 from spec.md)
- [ ] T124 Verify interactive feedback within 200ms (SC-003 from spec.md)
- [ ] T125 Verify all Phase P2 components follow shadcn/ui new-york style
- [ ] T126 Verify CLAUDE.md compliance (한글 UI, shadcn/ui 기반, 갤러리 등록)
- [ ] T127 Create dummy data file data/dummy-components.ts with all example data (optional, for code organization)
- [ ] T128 Run quickstart.md validation checklist (all items checked)

**Checkpoint**: Phase P2 complete and ready for review

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - verify prerequisites first
- **Type Definitions (Phase 2)**: Depends on Setup - BLOCKS all component implementation
- **User Story 1 (Phase 3)**: Depends on Type Definitions - can start after Phase 2 completes
- **User Story 2 (Phase 4)**: Depends on Type Definitions - can run in parallel with US1
- **User Story 3 (Phase 5)**: Depends on Type Definitions - can run in parallel with US1, US2
- **User Story 4 (Phase 6)**: Depends on Type Definitions - can run in parallel with US1, US2, US3
- **User Story 5 (Phase 7)**: Depends on US1, US2, US3, US4 completion - integration phase
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent - implements chat message components
- **User Story 2 (P1)**: Independent - implements thinking process component
- **User Story 3 (P2)**: Independent - implements memory card components
- **User Story 4 (P2)**: Independent - implements plan card components
- **User Story 5 (P3)**: Depends on US1-US4 - integrates all components into gallery

### Within Each User Story

**User Story 1**:
- T012-T013 can run in parallel [P] (different files)
- T014-T017 sequential (same file modifications)
- T018-T022 sequential (gallery page updates)
- T023-T026 can run in parallel [P] (different viewports)

**User Story 2**:
- T029-T036 sequential (building ThinkingProcess component)
- T037-T040 sequential (gallery page updates)
- T041-T043 can run in parallel [P] (independent tests)

**User Story 3**:
- T046-T047 can run in parallel [P] (different files)
- T048-T056 sequential (component implementations)
- T057-T061 sequential (gallery page updates)
- T062-T066 can run in parallel [P] (independent tests)

**User Story 4**:
- T069-T070 can run in parallel [P] (different files)
- T071-T083 sequential (component implementations)
- T084-T087 sequential (gallery page updates)
- T088-T094 can run in parallel [P] (independent tests)

**User Story 5**:
- All tasks sequential (integration work)

**Polish**:
- T110-T113 can run in parallel [P] (different browsers/viewports)

### Parallel Opportunities

**Within Type Definitions Phase**:
```bash
# Launch all 4 type file creations together:
npm run task T007  # types/message.ts
npm run task T008  # types/thinking.ts
npm run task T009  # types/memory.ts
npm run task T010  # types/plan.ts
```

**After Type Definitions Phase - User Stories Can Run In Parallel**:
```bash
# Different developers can work on different user stories simultaneously:
Developer A: User Story 1 (T012-T028) - Chat messages
Developer B: User Story 2 (T029-T045) - Thinking process
Developer C: User Story 3 (T046-T068) - Memory cards
Developer D: User Story 4 (T069-T096) - Plan cards
```

**Within User Story 1**:
```bash
# Component creation (parallel):
T012  # UserMessage.tsx
T013  # AIMessage.tsx

# Responsive testing (parallel):
T023  # Mobile
T024  # Tablet
T025  # Desktop
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup (T001-T006) - verify prerequisites
2. Complete Phase 2: Type Definitions (T007-T011) - foundation for all components
3. Complete Phase 3: User Story 1 (T012-T028) - chat message components
4. Complete Phase 4: User Story 2 (T029-T045) - thinking process component
5. **STOP and VALIDATE**: Test gallery at http://localhost:3000/components
6. Request Phase P2 MVP review before continuing to US3-US5

### Incremental Delivery

1. Setup + Type Definitions → Foundation ready
2. Add User Story 1 → Test independently → Review checkpoint
3. Add User Story 2 → Test independently → Review checkpoint (MVP complete!)
4. Add User Story 3 → Test independently → Review checkpoint
5. Add User Story 4 → Test independently → Review checkpoint
6. Add User Story 5 → Integration complete → Final review
7. Polish Phase → Production ready
8. Each story adds value without breaking previous functionality

### Sequential Execution (Single Developer)

**Recommended order**:
1. Phase 1: Setup verification (10 minutes)
2. Phase 2: Type definitions (30 minutes)
3. Phase 3: US1 - Chat messages (1.5 hours)
4. Phase 4: US2 - Thinking process (1 hour)
5. Phase 5: US3 - Memory cards (1.5 hours)
6. Phase 6: US4 - Plan cards (2 hours)
7. Phase 7: US5 - Integration (30 minutes)
8. Phase 8: Polish (30 minutes)

**Total estimated time**: ~7.5 hours

---

## Notes

- [P] tasks = different files or independent operations, can run in parallel
- [Story] label maps task to specific user story (US1, US2, US3, US4, US5)
- Each user story should be independently testable via gallery page
- All components must use shadcn/ui as base (Card, Button, Badge, Avatar, Accordion, Checkbox)
- All UI text must be in Korean (GLASSY, GLASS_BOX 제외)
- TypeScript compilation must pass at each checkpoint
- Production build must succeed before final review
- After Phase 8 completion, request Phase P2 review using CLAUDE.md review protocol
- Phase P2 is a **review-required Phase** - cannot proceed to Phase P3 without user approval
- Gallery page URL: http://localhost:3000/components
- Avoid: English UI text, non-shadcn components, missing gallery registration, skipping type definitions

---

**Generated**: 2025-12-17
**Status**: Ready for implementation
**Branch**: 004-phase-p2
**Total Tasks**: 128 tasks across 8 phases
**Parallel Opportunities**: 18 tasks can run in parallel (marked with [P])
**User Stories**: 5 stories (US1-US5) organized by priority (P1, P2, P3)
**MVP Scope**: Phase 1-4 (Setup + Types + US1 + US2) = ~3 hours
**Full Implementation**: Phase 1-8 = ~7.5 hours
