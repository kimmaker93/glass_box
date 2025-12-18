# Feature Specification: GLASSY 프로젝트 실행 계획

**Feature Branch**: `001-project-execution-plan`
**Created**: 2025-12-16
**Status**: Draft
**Input**: User description: "PRD와 CLAUDE.md를 기반으로 한 GLASSY 프로젝트 실행 계획 구체화"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Phase 기반 개발 로드맵 수립 (Priority: P1)

개발팀이 GLASSY 프로젝트를 시작할 때, 명확한 Phase별 개발 계획과 우선순위를 이해하고 순차적으로 구현할 수 있다.

**Why this priority**: 전체 프로젝트의 개발 방향과 순서를 결정하는 가장 기본적인 계획. 이것 없이는 무엇을 먼저 개발해야 할지 판단 불가능.

**Independent Test**: Phase 문서를 읽고 각 Phase의 목표, 작업 범위, 완료 조건을 명확히 설명할 수 있는지 확인

**Acceptance Scenarios**:

1. **Given** Phase 구조 문서가 작성된 상태, **When** P0-P7 각 Phase 문서를 확인, **Then** 각 Phase의 목표, 작업 내용, 완료 기준이 명확히 기술되어 있음
2. **Given** Phase 의존성 그래프가 정의된 상태, **When** 특정 Phase 시작 전, **Then** 선행 Phase가 완료되었는지 검증 가능
3. **Given** 모든 Phase가 정의된 상태, **When** 우선순위 순으로 정렬, **Then** P0 → P1 → P2 → P3 → P4 → P5 → P6 → P7 순서로 진행 경로 명확

---

### User Story 2 - 기능-Phase 매핑 (Priority: P1)

개발자가 PRD의 각 기능(F1-F5)을 어느 Phase에서 구현해야 하는지 명확히 알고 작업할 수 있다.

**Why this priority**: PRD의 기능들이 Phase에 매핑되지 않으면 개발 순서와 범위를 결정할 수 없음.

**Independent Test**: PRD의 특정 기능 ID(예: F5-2-1)를 제시하면 해당 기능이 어느 Phase에 속하는지 즉시 확인 가능

**Acceptance Scenarios**:

1. **Given** 기능-Phase 매핑 테이블이 작성된 상태, **When** PRD의 F1-F5 기능 확인, **Then** 각 기능이 P0-P7 중 하나의 Phase에 명확히 할당되어 있음
2. **Given** Phase P1 작업 시작, **When** 해당 Phase의 작업 범위 확인, **Then** P1에 할당된 기능 목록과 우선순위가 명시되어 있음
3. **Given** 기능 우선순위가 정의된 상태, **When** 높음(Must Have) 기능 필터링, **Then** 초기 Phase(P0-P3)에 집중 배치되어 있음

---

### User Story 3 - Phase별 검토 및 승인 프로세스 (Priority: P2)

개발팀이 각 Phase 완료 후 검토가 필요한지 판단하고, 필요 시 검토 및 승인 프로세스를 따를 수 있다.

**Why this priority**: 품질 관리와 이해관계자 동의를 위해 필요하지만, 모든 Phase에 적용되는 것은 아니므로 P2.

**Independent Test**: 특정 Phase 완료 후 검토 필요 여부를 문서에서 즉시 확인 가능

**Acceptance Scenarios**:

1. **Given** Phase 검토 요구사항이 정의된 상태, **When** P1 (기본 컴포넌트) 완료, **Then** 검토 필수 플래그가 "✅"로 표시되어 검토 요청 프로세스 진행
2. **Given** Phase 검토 요구사항이 정의된 상태, **When** P0 (프로젝트 설정) 완료, **Then** 검토 필수 플래그가 "❌"로 표시되어 바로 다음 Phase 진행 가능
3. **Given** 검토 프로세스 문서가 작성된 상태, **When** 검토 필수 Phase 완료, **Then** 검토 템플릿, 확인 방법, 승인 기준이 명시되어 있음

---

### User Story 4 - 개발 진행 상황 추적 (Priority: P2)

프로젝트 관리자가 현재 어느 Phase를 진행 중이며, 전체 진행률이 어느 정도인지 파악할 수 있다.

**Why this priority**: 프로젝트 모니터링에 유용하지만 개발 자체를 막지는 않으므로 P2.

**Independent Test**: Phase 체크리스트를 확인하여 완료된 Phase와 진행 중인 Phase를 즉시 식별 가능

**Acceptance Scenarios**:

1. **Given** Phase 추적 문서가 작성된 상태, **When** P2 작업 완료, **Then** P2의 완료 체크박스가 체크되고 타임스탬프 기록
2. **Given** 전체 Phase 목록이 있는 상태, **When** 진행 상황 계산, **Then** (완료된 Phase 수 / 전체 Phase 수) * 100 = 진행률% 산출 가능
3. **Given** Phase별 예상 기간이 정의된 상태, **When** 특정 Phase 지연 발생, **Then** 전체 프로젝트 타임라인 영향 분석 가능

---

### User Story 5 - Phase별 Task 분해 (Priority: P3)

개발자가 각 Phase를 더 작은 Task 단위로 분해하여 일일 작업 계획을 수립할 수 있다.

**Why this priority**: 세부 작업 계획은 Phase 진행 중 동적으로 조정 가능하므로 P3.

**Independent Test**: 특정 Phase(예: P1)의 Task 목록을 확인하여 각 Task의 완료 조건이 명확한지 검증

**Acceptance Scenarios**:

1. **Given** Phase P1이 시작된 상태, **When** Task 분해 문서 작성, **Then** P1의 Task 목록이 독립적으로 완료 가능한 단위로 나뉘어 있음
2. **Given** Task별 예상 시간이 정의된 상태, **When** Task 할당, **Then** 각 Task가 1-4시간 내 완료 가능한 크기로 분해되어 있음
3. **Given** Task 의존성이 정의된 상태, **When** Task 순서 결정, **Then** 선행 Task 완료 후에만 후행 Task 시작 가능

---

### Edge Cases

- Phase 진행 중 요구사항 변경 발생 시 어떻게 처리하는가?
- 특정 Phase가 예상보다 오래 걸릴 경우 다음 Phase는 어떻게 조정하는가?
- 검토 과정에서 재작업이 필요한 경우 Phase를 되돌아가는가?
- Phase 건너뛰기 요청이 있을 경우 어떻게 대응하는가?
- 여러 Phase를 병렬로 진행해야 하는 상황이 발생하면 어떻게 하는가?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 시스템은 반드시 P0부터 P7까지 8개의 Phase를 정의해야 함
- **FR-002**: 각 Phase는 반드시 고유 ID, 이름, 핵심 내용, 검토 필수 여부를 포함해야 함
- **FR-003**: Phase 간 의존성이 반드시 명시되어야 함 (P0 → P1 → P2 순서)
- **FR-004**: PRD의 모든 기능(F1-F5)이 반드시 Phase에 매핑되어야 함
- **FR-005**: 검토 필수 Phase(P1, P2, P3, P6, P7)는 반드시 검토 템플릿과 승인 기준을 포함해야 함
- **FR-006**: 각 Phase는 반드시 완료 조건(Exit Criteria)을 명시해야 함
- **FR-007**: Phase별 우선순위(높음/중간/낮음 기능 분포)가 반드시 정의되어야 함
- **FR-008**: 각 Phase는 반드시 예상 작업 범위(파일 수, 컴포넌트 수 등)를 포함해야 함
- **FR-009**: Phase 진행 프로토콜(시작→작업→등록→보고→검토→승인→진행)이 반드시 문서화되어야 함
- **FR-010**: 각 Phase는 반드시 선행 Phase 완료 후에만 시작 가능해야 함

### Key Entities

- **Phase**: 개발 단계 단위 (P0-P7)
  - ID, 이름, 설명, 검토 필수 여부, 완료 조건, 작업 범위

- **Feature**: PRD 기능 (F1-F5)
  - 기능 ID, 기능명, 우선순위, 할당된 Phase

- **Task**: Phase 내 세부 작업 (Phase 시작 시 동적 생성)
  - Task ID, 제목, 설명, 예상 시간, 의존성, 완료 여부

- **Checkpoint**: Phase 완료 체크포인트
  - Phase ID, 완료 일시, 검토 상태, 승인자

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 8개 Phase(P0-P7) 모두가 명확한 목표와 작업 범위를 가지고 문서화됨
- **SC-002**: PRD의 100% 기능(F1-F5의 모든 하위 기능)이 Phase에 매핑됨
- **SC-003**: 개발자가 Phase 문서를 읽고 10분 이내에 현재 작업해야 할 Phase와 Task를 식별 가능
- **SC-004**: 검토 필수 Phase가 5개(P1, P2, P3, P6, P7)로 명확히 정의되고 각각 검토 템플릿 보유
- **SC-005**: Phase 진행 프로토콜 7단계(시작→작업→등록→보고→검토→승인→진행)가 CLAUDE.md에 문서화됨
- **SC-006**: 각 Phase의 완료 조건이 검증 가능한 형태(체크리스트, 테스트 케이스 등)로 정의됨

## Phase 구조 정의

### Phase P0: 프로젝트 설정
- **목표**: 개발 환경 및 기반 구조 구축
- **작업 범위**:
  - 패키지 설치 (zustand, framer-motion, @dnd-kit)
  - 폴더 구조 생성 (components/, stores/, hooks/, types/, data/)
  - 타입 정의 (Message, Session, Workspace, Memory, Persona, Workflow, Plan, ThoughtStep)
- **완료 조건**:
  - `npm install` 에러 없이 완료
  - `npm run dev` 정상 실행
  - `npm run type-check` 에러 0건
  - 8개 핵심 폴더 존재
  - 8개 타입 정의 파일 존재
- **검토 필수**: ❌
- **매핑 기능**: 없음 (인프라 작업)

---

### Phase P1: 기본 컴포넌트
- **목표**: shadcn/ui 기반 기본 UI 컴포넌트 설치 및 커스터마이징
- **작업 범위**:
  - shadcn/ui 컴포넌트 설치 (button, card, dialog, input, textarea, badge, accordion, toast, dropdown-menu, avatar, scroll-area)
  - 공통 컴포넌트 커스터마이징
  - 컴포넌트 갤러리 페이지 구성
- **완료 조건**:
  - 최소 10개 shadcn 컴포넌트 설치
  - 컴포넌트 갤러리 페이지 접근 가능
  - 모든 컴포넌트 스토리북 스타일로 갤러리에 표시
- **검토 필수**: ✅
- **매핑 기능**: 없음 (기본 UI 구성 요소)

---

### Phase P2: 조합 컴포넌트
- **목표**: 채팅, 메모리, 페르소나 관련 복합 컴포넌트 구현
- **작업 범위**:
  - F5-1: 메시지 입력/출력 컴포넌트 (MessageInput, MessageList, MessageBubble)
  - F5-2: 사고 과정 아코디언 컴포넌트 (ThinkingAccordion)
  - F5-4: 계획 카드 컴포넌트 (PlanCard)
  - F4-2: 메모리 카드 컴포넌트 (MemoryCard)
  - F5-8: 페르소나 선택 드롭다운 (PersonaSelector)
- **완료 조건**:
  - 5개 이상 조합 컴포넌트 완성
  - 각 컴포넌트 props 타입 정의 완료
  - 갤러리에 등록 및 인터랙션 테스트 통과
- **검토 필수**: ✅
- **매핑 기능**: F5-1, F5-2, F5-4, F4-2, F5-8

---

### Phase P3: 레이아웃
- **목표**: 3-Panel 레이아웃 구조 구현 및 반응형 대응
- **작업 범위**:
  - 헤더 레이아웃 (로고, 페르소나 선택, 설정, 사용자)
  - 좌측 패널: 워크스페이스 (280px 고정)
  - 중앙 패널: GLASSY 채팅 (flex: 1)
  - 우측 패널: GLASS_BOX (320px 고정)
  - 반응형 레이아웃 (< 768px: 단일 패널, 768-1024px: 2패널, > 1024px: 3패널)
- **완료 조건**:
  - 3-Panel 레이아웃 화면 표시
  - 패널 크기 조정 가능
  - 반응형 브레이크포인트 동작 확인
  - 패널 접기/펼치기 기능 동작
- **검토 필수**: ✅
- **매핑 기능**: F3 (워크스페이스 UI), F4 (GLASS_BOX UI), F5 (채팅 UI)

---

### Phase P4: 상태 관리
- **목표**: Zustand Store 구현 및 데이터 플로우 설계
- **작업 범위**:
  - useSessionStore: 세션/워크스페이스 관리
  - useMessageStore: 메시지 히스토리 관리
  - useMemoryStore: 메모리(saved/retrieved/web) 관리
  - usePersonaStore: 페르소나 관리
  - useWorkflowStore: 워크플로우 관리
  - useSettingsStore: 전역 설정 관리
- **완료 조건**:
  - 6개 Store 파일 생성
  - 각 Store에 CRUD 액션 구현
  - localStorage 영속화 적용
  - TypeScript 타입 에러 0건
- **검토 필수**: ❌
- **매핑 기능**: F1 (인증 상태), F2 (설정), F3 (워크스페이스), F4 (메모리), F5 (채팅)

---

### Phase P5: 시나리오 구조
- **목표**: 시나리오 실행 프레임워크 구현 (데이터는 사용자 입력)
- **작업 범위**:
  - 시나리오 타입 정의 (Scenario, ScenarioStep, ScenarioStepType)
  - useScenarioRunner 훅 구현
  - 시나리오 로더 (JSON 파일 로드)
  - Mock AI 응답 생성기 (setTimeout + 스트리밍)
- **완료 조건**:
  - 시나리오 실행 훅 동작
  - 스트리밍 응답 시뮬레이션 성공
  - 사고 과정, 계획 수립, 도구 호출 단계 표시 가능
  - 더미 시나리오 1개 실행 성공
- **검토 필수**: ❌
- **매핑 기능**: F5-2 (사고 과정), F5-4 (계획), F5-5 (도구 사용)

---

### Phase P6: 통합
- **목표**: 컴포넌트와 Store 연결, 전체 플로우 구현
- **작업 범위**:
  - 워크스페이스 패널 + useSessionStore 연결
  - 채팅 패널 + useMessageStore 연결
  - GLASS_BOX 패널 + useMemoryStore 연결
  - 페르소나 선택 + usePersonaStore 연결
  - 설정 모달 + useSettingsStore 연결
  - 전체 사용자 플로우 테스트
- **완료 조건**:
  - 모든 패널이 Store와 연결되어 동작
  - 세션 생성 → 메시지 전송 → 응답 수신 플로우 성공
  - 메모리 저장 → GLASS_BOX 표시 플로우 성공
  - 페르소나 변경 시 UI 업데이트 성공
- **검토 필수**: ✅
- **매핑 기능**: F1-F5 전체 통합

---

### Phase P7: 마무리
- **목표**: 애니메이션, 반응형, 최종 마무리
- **작업 범위**:
  - framer-motion 애니메이션 적용 (페이드, 슬라이드)
  - 반응형 최적화 (모바일, 태블릿, 데스크톱)
  - 드래그 앤 드롭 (세션 이동, 계획 순서 변경)
  - 접근성 (키보드 네비게이션, aria-label)
  - 성능 최적화 (스트리밍, Optimistic UI)
- **완료 조건**:
  - 주요 인터랙션에 애니메이션 적용
  - 3가지 화면 크기에서 정상 동작
  - 드래그 앤 드롭 동작 확인
  - 접근성 점수 80% 이상
- **검토 필수**: ✅
- **매핑 기능**: F5-8-4 (전환 애니메이션), F3-10 (DnD), 비기능 요구사항

---

## Feature-Phase 매핑 테이블

| Feature ID | 기능명 | 우선순위 | Phase | 비고 |
|-----------|-------|---------|-------|------|
| F1-1 | 로그인 | 높음 | P4 | Store 구현 시 포함 |
| F1-2 | 로그아웃 | 높음 | P4 | Store 구현 시 포함 |
| F1-3 | 인증 상태 유지 | 중간 | P4 | localStorage 영속화 |
| F2-1-1 | 페르소나 목록 조회 | 높음 | P4 | usePersonaStore |
| F2-1-2 | 페르소나 생성 | 높음 | P6 | 설정 모달 구현 |
| F2-1-3 | 페르소나 수정 | 중간 | P6 | 설정 모달 구현 |
| F2-1-4 | 페르소나 삭제 | 중간 | P6 | 설정 모달 구현 |
| F2-2 | 워크플로우 관리 | 중간 | P6 | 설정 모달 구현 |
| F2-3 | GLASS_BOX 설정 | 중간 | P6 | 설정 모달 구현 |
| F3-1 | 새 채팅 | 높음 | P6 | 워크스페이스 통합 |
| F3-2 | 세션 목록 | 높음 | P6 | 워크스페이스 통합 |
| F3-3 | 세션 선택 | 높음 | P6 | 워크스페이스 통합 |
| F3-4 | 세션 이름 변경 | 중간 | P6 | 워크스페이스 통합 |
| F3-5 | 세션 삭제 | 중간 | P6 | 워크스페이스 통합 |
| F3-6 | 워크스페이스 생성 | 중간 | P6 | 워크스페이스 통합 |
| F3-7~9, 11 | 워크스페이스 관리 | 낮음 | P7 | 드래그앤드롭 포함 |
| F3-10 | 세션 이동 (DnD) | 중간 | P7 | @dnd-kit 구현 |
| F4-1 | 컨텍스트 범위 설정 | 높음 | P3 | 레이아웃 시 UI 구성 |
| F4-2-1 | 저장된 기억 목록 | 높음 | P2 | MemoryCard 컴포넌트 |
| F4-2-2~3 | 기억 수정/삭제 | 중간 | P6 | Store 연결 |
| F4-3-1 | 참조 기억 목록 | 높음 | P2 | MemoryCard 컴포넌트 |
| F4-3-2 | 참조 하이라이트 | 중간 | P6 | 인터랙션 구현 |
| F4-4 | 웹 검색 결과 관리 | 높음/중간 | P6 | Store 연결 |
| F4-5-1 | 패널 토글 | 낮음 | P7 | 반응형 최적화 |
| F5-1 | 기본 채팅 | 높음 | P2, P6 | 컴포넌트(P2), 통합(P6) |
| F5-2 | 사고 과정 시각화 | 높음/중간 | P2, P5 | 컴포넌트(P2), 시나리오(P5) |
| F5-3 | 신뢰도 표시 | 중간/낮음 | P7 | 마무리 작업 |
| F5-4 | 계획 수립 | 높음/중간 | P2, P5, P7 | 컴포넌트(P2), 시나리오(P5), DnD(P7) |
| F5-5 | 도구 사용 표시 | 높음/중간 | P5 | 시나리오 프레임워크 |
| F5-6 | 검색 결과 표시 | 높음/중간 | P6 | Store 연결 |
| F5-7 | 메모리 인용 | 높음/중간 | P6 | 인터랙션 구현 |
| F5-8 | 페르소나 전환 | 높음/낮음 | P2, P4, P7 | 컴포넌트(P2), Store(P4), 애니메이션(P7) |
| F5-9 | 답변 저장 | 높음/중간 | P6 | Store 연결 |

---

## Assumptions

- Phase는 반드시 P0부터 순차적으로 진행
- 검토 필수 Phase는 승인 전까지 다음 Phase 진행 불가
- Phase별 예상 기간: P0 (1일), P1 (2일), P2 (3일), P3 (2일), P4 (2일), P5 (2일), P6 (3일), P7 (2일) - 총 17일
- 1일 = 실제 작업 4-6시간 기준
- 검토 및 수정 기간은 별도 (Phase당 0.5-1일)

## Out of Scope

- 백엔드 API 구현
- 실제 AI 모델 연동
- 프로덕션 배포 설정
- CI/CD 파이프라인
- 단위 테스트 작성 (선택적)
- 문서화 (API 문서, 사용자 가이드 등)

## Dependencies

- 선행 작업: PRD v1.0 완료, CLAUDE.md 작성 완료
- 외부 의존성: shadcn/ui, zustand, framer-motion, @dnd-kit
- 팀 의존성: 검토자 지정 및 승인 프로세스 합의

## Notes

- 이 문서는 전체 프로젝트의 "실행 계획"을 구체화한 것으로, 각 Phase별로 별도의 상세 spec이 필요할 수 있음
- Phase P0-P7은 speckit의 개별 feature로 관리 가능 (예: 001-phase-p0, 002-phase-p1, ...)
- 하이브리드 접근: Phase 구조를 유지하면서 각 Phase를 feature 브랜치로 관리
- 우선순위 조정 가능: 프로젝트 진행 중 PRD 기능 우선순위 변경 시 Phase 매핑도 조정 필요
