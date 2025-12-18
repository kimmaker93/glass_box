# Tasks: Phase P0 프로젝트 설정

**Input**: Design documents from `/specs/002-phase-p0/`
**Prerequisites**: plan.md, spec.md, quickstart.md

**Tests**: N/A - Testing is explicitly Out of Scope for this Phase

**Organization**: Tasks are grouped by user story to enable independent implementation and verification of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Next.js App Router project structure
- Repository root: `/Users/gimsuhyeon/Documents/glass_box/`
- All folders created relative to repository root

---

## Phase 1: User Story 1 - 개발 환경 구축 (Priority: P1) 🎯

**Goal**: 필요한 모든 패키지가 설치되고 개발 서버가 정상 실행되어 즉시 개발 시작 가능

**Independent Test**: `npm install` → `npm run dev` → http://localhost:3000 접속 → Next.js 페이지 표시 확인

### Implementation for User Story 1

- [ ] T001 [US1] Install zustand package via npm install zustand
- [ ] T002 [US1] Install framer-motion package via npm install framer-motion
- [ ] T003 [US1] Install @dnd-kit packages via npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
- [ ] T004 [US1] Verify all packages installed by running npm list zustand framer-motion @dnd-kit/core
- [ ] T005 [US1] Add type-check script to package.json scripts section: "type-check": "tsc --noEmit"
- [ ] T006 [US1] Run npm run dev and verify development server starts on port 3000
- [ ] T007 [US1] Access http://localhost:3000 in browser and verify Next.js default page displays

**Checkpoint**: Development environment is ready - packages installed, dev server runs successfully

---

## Phase 2: User Story 2 - 프로젝트 구조 확립 (Priority: P1)

**Goal**: 명확한 폴더 구조를 통해 컴포넌트, 상태 관리, 타입 정의를 일관된 위치에 배치 가능

**Independent Test**: `ls -la` 명령으로 각 폴더(components/, stores/, hooks/, types/, data/) 존재 확인

### Implementation for User Story 2

- [ ] T008 [P] [US2] Create components/ folder with subfolders: mkdir -p components/{ui,common,chat,workspace,glass-box,layout}
- [ ] T009 [P] [US2] Create stores/ folder: mkdir -p stores
- [ ] T010 [P] [US2] Create hooks/ folder: mkdir -p hooks
- [ ] T011 [P] [US2] Create types/ folder: mkdir -p types
- [ ] T012 [P] [US2] Create data/ folder with subfolders: mkdir -p data/{scenarios,mock-data}
- [ ] T013 [US2] Verify components/ folder and 6 subfolders exist: ls -la components/
- [ ] T014 [US2] Verify stores/, hooks/, types/, data/ folders exist: ls -la stores/ hooks/ types/ data/
- [ ] T015 [US2] Verify data/scenarios/ and data/mock-data/ subfolders exist: ls -la data/

**Checkpoint**: Project structure is established - all required folders exist

---

## Phase 3: User Story 3 - 타입 안정성 확보 (Priority: P1)

**Goal**: 핵심 데이터 구조를 TypeScript 타입으로 정의하여 컴파일 타임에 타입 에러 방지

**Independent Test**: `npm run type-check` 실행 → 타입 에러 0건 확인

### Implementation for User Story 3

- [ ] T016 [P] [US3] Create types/message.ts with Message, ThinkingStep, ToolCall interfaces
- [ ] T017 [P] [US3] Create types/session.ts with Session interface
- [ ] T018 [P] [US3] Create types/workspace.ts with Workspace interface
- [ ] T019 [P] [US3] Create types/memory.ts with Memory interface
- [ ] T020 [P] [US3] Create types/persona.ts with Persona interface
- [ ] T021 [P] [US3] Create types/workflow.ts with Workflow and WorkflowStep interfaces
- [ ] T022 [P] [US3] Create types/plan.ts with Plan and PlanStep interfaces
- [ ] T023 [P] [US3] Create types/thought-step.ts with ThoughtStep interface
- [ ] T024 [P] [US3] Create types/scenario.ts with Scenario, ScenarioStep, ScenarioStepType definitions
- [ ] T025 [US3] Create types/index.ts with export statements for all type files
- [ ] T026 [US3] Run npm run type-check and verify 0 type errors
- [ ] T027 [US3] Test import from types/index.ts in a temporary file and verify IDE autocomplete works

**Checkpoint**: Type safety is established - all core types defined, type checking passes with 0 errors

---

## Phase 4: User Story 4 - 빌드 성공 검증 (Priority: P2)

**Goal**: 프로젝트 설정이 올바르게 완료되었는지 빌드 명령으로 검증

**Independent Test**: `npm run build` → 빌드 성공 → `npm run start` → 프로덕션 서버 정상 동작 확인

### Implementation for User Story 4

- [ ] T028 [US4] Run npm run build and verify build completes without errors
- [ ] T029 [US4] Verify .next/ folder is created after build: ls -la .next/
- [ ] T030 [US4] Run npm run start and verify production server starts on port 3000
- [ ] T031 [US4] Access http://localhost:3000 in browser and verify page displays correctly
- [ ] T032 [US4] Stop production server (Ctrl+C)

**Checkpoint**: Build verification complete - production build succeeds, production server runs correctly

---

## Phase 5: Final Validation & Documentation

**Purpose**: Verify all exit criteria and prepare for Phase P1

- [ ] T033 Verify all 8 core folders exist (components/ + 6 subfolders, stores/, hooks/, types/, data/ + 2 subfolders)
- [ ] T034 Verify all 10 type files exist in types/ folder (9 type files + index.ts)
- [ ] T035 Verify each type file contains at least 1 interface definition (not empty files)
- [ ] T036 Run npm run dev and verify 0 errors, server responds within 30 seconds
- [ ] T037 Run npm run type-check and verify 0 type errors
- [ ] T038 Run npm run build and verify build succeeds
- [ ] T039 Verify package.json contains zustand, framer-motion, @dnd-kit/* in dependencies
- [ ] T040 Verify package.json contains "type-check": "tsc --noEmit" in scripts section
- [ ] T041 Create git commit with message: "Phase P0: 프로젝트 설정 완료"

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (US1)**: No dependencies - can start immediately
- **Phase 2 (US2)**: Can start in parallel with Phase 1 (different operations)
- **Phase 3 (US3)**: Depends on Phase 2 (types/ folder must exist) and Phase 1 (packages for type checking)
- **Phase 4 (US4)**: Depends on Phase 1 and Phase 3 (build needs packages and types)
- **Phase 5 (Final)**: Depends on all previous phases

### User Story Dependencies

- **User Story 1 (P1)**: Independent - package installation
- **User Story 2 (P1)**: Independent - folder creation
- **User Story 3 (P1)**: Depends on US2 (folders) and US1 (packages) - type definitions
- **User Story 4 (P2)**: Depends on US1 and US3 - build verification

### Within Each User Story

**US1 Tasks**:
- T001-T003 can run sequentially or as a single npm install command
- T004 depends on T001-T003
- T005 is independent (editing package.json)
- T006-T007 depend on T001-T003, T005

**US2 Tasks**:
- T008-T012 can all run in parallel (marked [P])
- T013-T015 are verification tasks, depend on T008-T012

**US3 Tasks**:
- T016-T024 can all run in parallel (marked [P]) - creating different type files
- T025 depends on T016-T024 (must import from created files)
- T026-T027 depend on T025

**US4 Tasks**:
- T028-T032 must run sequentially (build → verify → start → access → stop)

### Parallel Opportunities

**Maximum Parallelism**:
```bash
# Can run these together after starting:
T001: "npm install zustand"
T002: "npm install framer-motion"
T003: "npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities"

# Alternative: Single command
npm install zustand framer-motion @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Can run all folder creation in parallel:
mkdir -p components/{ui,common,chat,workspace,glass-box,layout}
mkdir -p stores hooks types data/{scenarios,mock-data}

# Can create all type files in parallel after types/ folder exists:
T016-T024: Create all 9 type files simultaneously
```

**Realistic Execution**: Most tasks will run sequentially due to natural dependencies, but folder creation (US2) can happen in parallel with package installation (US1).

---

## Parallel Example: Type Files Creation (US3)

```bash
# All type file creation tasks can launch together:
Task T016: "Create types/message.ts with Message, ThinkingStep, ToolCall interfaces"
Task T017: "Create types/session.ts with Session interface"
Task T018: "Create types/workspace.ts with Workspace interface"
Task T019: "Create types/memory.ts with Memory interface"
Task T020: "Create types/persona.ts with Persona interface"
Task T021: "Create types/workflow.ts with Workflow and WorkflowStep interfaces"
Task T022: "Create types/plan.ts with Plan and PlanStep interfaces"
Task T023: "Create types/thought-step.ts with ThoughtStep interface"
Task T024: "Create types/scenario.ts with Scenario, ScenarioStep, ScenarioStepType definitions"
```

---

## Implementation Strategy

### Sequential Execution (Recommended for Phase P0)

1. **Start with US1** (Package Installation):
   - Install all packages
   - Add type-check script
   - Verify dev server runs
   - **VALIDATE**: Dev server accessible at localhost:3000

2. **Proceed to US2** (Folder Structure):
   - Create all folders with single commands
   - Verify folders exist
   - **VALIDATE**: All 8 core folders present

3. **Implement US3** (Type Definitions):
   - Create all 9 type files (can be done in parallel)
   - Create index.ts
   - Run type-check
   - **VALIDATE**: 0 type errors

4. **Complete US4** (Build Verification):
   - Run production build
   - Start production server
   - Verify server works
   - **VALIDATE**: Production build succeeds

5. **Final Phase**:
   - Run all exit criteria checks
   - Create git commit
   - **VALIDATE**: All exit criteria pass

### Using quickstart.md

Phase P0 has a comprehensive quickstart.md guide. You can:

1. Follow quickstart.md steps directly (Step 1-5)
2. Use tasks.md for detailed tracking
3. Cross-reference: quickstart.md Step 3.2 contains full TypeScript interface code for all type files

---

## Exit Criteria (from spec.md)

All tasks complete when these criteria are met:

- ✅ **SC-001**: `npm install` completes within 5 minutes (normal network)
- ✅ **SC-002**: `npm run dev` responds at localhost:3000 within 30 seconds
- ✅ **SC-003**: `npm run type-check` shows 0 type errors
- ✅ **SC-004**: 8 core folders exist (components/ + 6 subfolders, stores/, hooks/, types/, data/ + 2 subfolders)
- ✅ **SC-005**: 9 type files in types/ folder, each with at least 1 interface
- ✅ **SC-006**: `npm run build` succeeds and creates .next/ folder
- ✅ **SC-007**: package.json, tsconfig.json, CLAUDE.md exist and are valid

---

## Notes

- [P] tasks = different files/operations, can run in parallel
- [Story] label (US1-US4) maps task to specific user story
- No tests required - testing is Out of Scope for Phase P0
- Refer to quickstart.md for complete TypeScript interface definitions
- Phase P0 is NOT a review-required phase - can proceed to Phase P1 immediately after completion
- Type definitions are "scaffolding only" - will be expanded in later Phases

---

## Task Count Summary

- **Total Tasks**: 41
- **User Story 1 (P1)**: 7 tasks (package installation, dev server verification)
- **User Story 2 (P1)**: 8 tasks (folder structure creation)
- **User Story 3 (P1)**: 12 tasks (type definitions)
- **User Story 4 (P2)**: 5 tasks (build verification)
- **Final Validation**: 9 tasks (exit criteria checks, git commit)

**Parallel Opportunities**:
- Folder creation: 5 tasks (T008-T012)
- Type file creation: 9 tasks (T016-T024)
- Total parallelizable: 14 tasks

**Suggested MVP Scope**: User Stories 1-3 (P1 priorities) = Essential project setup. User Story 4 (P2) can be deferred if needed, but recommended for early validation.
