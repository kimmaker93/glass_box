# Feature Specification: Phase P0 프로젝트 설정

**Feature Branch**: `002-phase-p0`
**Created**: 2025-12-17
**Status**: Draft
**Input**: User description: "Phase P0: 프로젝트 설정 - 패키지 설치, 폴더 구조 생성, 타입 정의"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 개발 환경 구축 (Priority: P1)

개발자가 GLASSY 프로젝트를 시작하기 위해 필요한 모든 패키지가 설치되고, 개발 서버가 정상적으로 실행되어 즉시 개발을 시작할 수 있다.

**Why this priority**: 프로젝트의 모든 후속 작업(컴포넌트 개발, 상태 관리 등)은 이 환경 설정이 완료되어야만 진행 가능. 가장 기본적이고 필수적인 선행 작업.

**Independent Test**: `npm install` 실행 → `npm run dev` 실행 → 브라우저에서 localhost:3000 접속 → 기본 Next.js 페이지 표시 확인

**Acceptance Scenarios**:

1. **Given** package.json에 필요한 패키지가 명시된 상태, **When** npm install 실행, **Then** 에러 없이 모든 패키지 설치 완료
2. **Given** 패키지 설치가 완료된 상태, **When** npm run dev 실행, **Then** 개발 서버가 포트 3000에서 정상 실행
3. **Given** 개발 서버가 실행 중인 상태, **When** 브라우저에서 http://localhost:3000 접속, **Then** Next.js 기본 페이지 표시

---

### User Story 2 - 프로젝트 구조 확립 (Priority: P1)

개발자가 명확한 폴더 구조를 통해 컴포넌트, 상태 관리, 타입 정의 등을 일관된 위치에 배치할 수 있다.

**Why this priority**: 일관된 폴더 구조 없이는 파일을 어디에 생성할지 매번 결정해야 하고, 팀원 간 혼란 발생. 초기에 명확한 구조를 확립하면 이후 개발 속도 향상.

**Independent Test**: 각 폴더(components/, stores/, hooks/, types/, data/)의 존재 여부를 `ls -la` 명령으로 확인

**Acceptance Scenarios**:

1. **Given** 프로젝트 루트 디렉토리, **When** 폴더 구조 생성 스크립트 실행, **Then** components/ 폴더와 하위 폴더(ui, common, chat, workspace, glass-box, layout)가 생성됨
2. **Given** 프로젝트 루트 디렉토리, **When** 폴더 구조 생성 완료, **Then** stores/, hooks/, types/, data/ 폴더가 모두 존재
3. **Given** 폴더 구조가 생성된 상태, **When** 개발자가 새 컴포넌트 생성 시, **Then** 명확한 위치(예: components/chat/)를 알 수 있음

---

### User Story 3 - 타입 안정성 확보 (Priority: P1)

개발자가 프로젝트의 핵심 데이터 구조(Message, Session, Workspace 등)를 TypeScript 타입으로 정의하여 컴파일 타임에 타입 에러를 방지할 수 있다.

**Why this priority**: 타입 정의 없이 개발 시작하면 런타임 에러 발생 가능성 높고, 리팩토링 어려움. 초기에 타입을 명확히 정의하면 개발 중 자동 완성과 타입 검사로 생산성 향상.

**Independent Test**: `npm run type-check` (또는 `npx tsc --noEmit`) 실행 → 타입 에러 0건 확인

**Acceptance Scenarios**:

1. **Given** types/ 폴더가 생성된 상태, **When** 8개 타입 정의 파일(message.ts, session.ts 등) 생성, **Then** 각 파일에 기본 interface 정의가 포함됨
2. **Given** 타입 정의 파일이 생성된 상태, **When** npx tsc --noEmit 실행, **Then** 타입 에러가 없음 (0 errors)
3. **Given** 타입 정의가 완료된 상태, **When** 다른 파일에서 import 시도, **Then** IDE 자동 완성이 정상 동작

---

### User Story 4 - 빌드 성공 검증 (Priority: P2)

개발자가 프로젝트 설정이 올바르게 완료되었는지 빌드 명령으로 검증할 수 있다.

**Why this priority**: 개발 서버는 실행되지만 프로덕션 빌드가 실패하는 경우를 조기에 발견. P2인 이유는 개발 진행에 즉각적으로 필요하지는 않지만, 초기 검증으로 유용.

**Independent Test**: `npm run build` 실행 → 빌드 성공 확인 → `npm run start` 실행 → 프로덕션 서버 정상 동작 확인

**Acceptance Scenarios**:

1. **Given** 패키지 설치와 타입 정의가 완료된 상태, **When** npm run build 실행, **Then** 빌드 에러 없이 .next/ 폴더 생성
2. **Given** 빌드가 완료된 상태, **When** npm run start 실행, **Then** 프로덕션 서버가 포트 3000에서 실행
3. **Given** 프로덕션 서버가 실행 중, **When** 브라우저에서 접속, **Then** 페이지가 정상 표시

---

### Edge Cases

- npm install 중 네트워크 에러 발생 시 어떻게 복구하는가?
- 이미 일부 폴더가 존재하는 상태에서 폴더 생성 스크립트 실행 시 충돌 발생하는가?
- package.json의 버전 충돌(예: React 19와 호환되지 않는 라이브러리) 발생 시 어떻게 해결하는가?
- TypeScript 설정(tsconfig.json)이 누락되거나 잘못된 경우 어떻게 감지하는가?
- Node.js 버전이 요구사항을 충족하지 않을 경우 명확한 에러 메시지를 제공하는가?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 시스템은 반드시 zustand, framer-motion, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities 패키지를 설치해야 함
- **FR-002**: 시스템은 반드시 components/ 폴더와 6개 하위 폴더(ui, common, chat, workspace, glass-box, layout)를 생성해야 함
- **FR-003**: 시스템은 반드시 stores/, hooks/, types/, data/ 폴더를 생성해야 함
- **FR-004**: 시스템은 반드시 types/ 폴더에 9개 타입 정의 파일을 생성해야 함 (message.ts, session.ts, workspace.ts, memory.ts, persona.ts, workflow.ts, plan.ts, thought-step.ts, scenario.ts)
- **FR-005**: 각 타입 정의 파일은 반드시 기본 interface를 포함해야 함 (빈 파일이 아님)
- **FR-006**: 시스템은 반드시 types/index.ts 파일을 생성하여 모든 타입을 export 해야 함
- **FR-007**: npm run dev 실행 시 개발 서버가 정상 실행되어야 함
- **FR-008**: npm run type-check (또는 npx tsc --noEmit) 실행 시 타입 에러가 0건이어야 함
- **FR-009**: npm run build 실행 시 빌드가 성공해야 함
- **FR-010**: 생성된 폴더 구조는 CLAUDE.md에 정의된 표준 구조와 일치해야 함

### Key Entities

- **Package Dependencies**: 프로젝트가 의존하는 외부 라이브러리 (zustand, framer-motion, @dnd-kit 등)
  - 속성: 패키지명, 버전, 설치 위치(dependencies vs devDependencies)
  - 관계: package.json에 명시되고 node_modules/에 설치됨

- **Folder Structure**: 프로젝트 파일 조직 구조
  - 속성: 폴더명, 경로, 목적
  - 관계: 계층적 구조 (components/ → ui/, chat/ 등)

- **Type Definition**: TypeScript 타입 정의
  - 속성: 타입명, 파일명, interface 내용
  - 관계: types/index.ts를 통해 중앙 집중식 export

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 개발자가 `npm install` 실행 후 5분 이내에 모든 패키지 설치 완료 (정상 네트워크 환경 기준)
- **SC-002**: `npm run dev` 실행 시 30초 이내에 개발 서버가 http://localhost:3000에서 응답
- **SC-003**: `npm run type-check` 실행 시 타입 에러 0건 출력
- **SC-004**: 8개 핵심 폴더(components/, stores/, hooks/, types/, data/ 및 components 하위 6개)가 모두 생성됨
- **SC-005**: 9개 타입 정의 파일이 types/ 폴더에 존재하고, 각 파일이 최소 1개 이상의 interface를 포함
- **SC-006**: `npm run build` 실행 시 빌드 성공하고 .next/ 폴더 생성
- **SC-007**: 프로젝트 루트에 CLAUDE.md, package.json, tsconfig.json이 존재하고 내용이 유효함

## Assumptions

- Node.js 18 이상이 설치되어 있음 (Next.js 16 요구사항)
- npm 또는 yarn이 설치되어 있음
- 인터넷 연결이 가능하여 npm 패키지 다운로드 가능
- Next.js 16 프로젝트가 이미 초기화되어 있음 (create-next-app으로 생성된 상태)
- Git이 설치되어 있고, 프로젝트가 Git 저장소로 초기화되어 있음
- CLAUDE.md 파일이 이미 존재하고 프로젝트 헌법이 정의되어 있음

## Out of Scope

- 실제 컴포넌트 구현 (Phase P1 이후 작업)
- Store 구현 (Phase P4 작업)
- 시나리오 데이터 작성 (Phase P5 작업)
- 테스트 코드 작성 (선택적, 명시적으로 Out of Scope)
- CI/CD 파이프라인 설정
- Docker 또는 배포 환경 설정
- 환경 변수 설정 (.env 파일 등)

## Dependencies

- 선행 작업: 001-project-execution-plan 완료 (Phase 구조 정의)
- 외부 의존성: npm 레지스트리 접근 가능
- 내부 의존성: CLAUDE.md 파일 존재
- 후속 작업: Phase P1 (기본 컴포넌트) 시작 가능

## Notes

- 이 Phase는 "검토 필수" Phase가 아니므로 완료 후 즉시 Phase P1로 진행 가능
- 타입 정의는 초기 뼈대만 작성하고, 각 Phase에서 점진적으로 확장 예정
- data/ 폴더의 scenarios/ 및 mock-data/ 하위 폴더도 Phase P0에서 생성하지만, 실제 데이터는 Phase P5에서 작성
- 폴더 생성은 mkdir -p 명령으로 한 번에 처리 가능
- package.json에 type-check 스크립트가 없을 경우 추가 필요: `"type-check": "tsc --noEmit"`
