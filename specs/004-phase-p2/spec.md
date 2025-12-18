# Feature Specification: Phase P2 조합 컴포넌트

**Feature Branch**: `004-phase-p2`
**Created**: 2025-12-17
**Status**: Draft
**Input**: User description: "Phase P2: 조합 컴포넌트 - 채팅 메시지 컴포넌트(UserMessage, AIMessage, ThinkingProcess), 메모리 카드 컴포넌트(MemoryCard, SearchResultCard), 계획 카드 컴포넌트(PlanCard, PlanStep)를 구현하여 컴포넌트 갤러리에 등록. shadcn/ui 기반으로 확장. 한글 UI 텍스트 사용. 검토 필수 Phase."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 채팅 메시지 컴포넌트 구현 (Priority: P1) 🎯 MVP

개발자가 사용자 메시지(UserMessage)와 AI 응답 메시지(AIMessage) 컴포넌트를 갤러리 페이지에서 확인하고, 각 컴포넌트의 레이아웃과 스타일을 검증할 수 있다.

**Why this priority**: 채팅 기능은 GLASSY의 핵심이며, 모든 대화 인터페이스의 기반이 되는 컴포넌트. Phase P3 레이아웃 구현을 위해 반드시 필요함.

**Independent Test**: npm run dev → /components 접속 → "채팅 메시지" 섹션 확인 → UserMessage와 AIMessage 예시 확인 → 각 컴포넌트의 시각적 레이아웃 검증

**Acceptance Scenarios**:

1. **Given** 컴포넌트 갤러리 페이지가 로드된 상태, **When** "채팅 메시지" 섹션으로 스크롤, **Then** UserMessage 컴포넌트 예시가 표시됨 (텍스트, 타임스탬프 포함)
2. **Given** "채팅 메시지" 섹션이 표시된 상태, **When** AIMessage 컴포넌트 확인, **Then** 페르소나 아바타, 이름, 메시지 내용, 타임스탬프, 저장 버튼이 표시됨
3. **Given** AIMessage 컴포넌트가 표시된 상태, **When** 저장 버튼 클릭, **Then** 시각적 피드백(버튼 상태 변경) 표시됨
4. **Given** 채팅 메시지 컴포넌트들이 표시된 상태, **When** 반응형 테스트 (모바일, 태블릿, 데스크톱), **Then** 각 화면 크기에서 적절하게 레이아웃됨

---

### User Story 2 - 사고 과정 컴포넌트 구현 (Priority: P1)

개발자가 AI의 사고 과정을 시각화하는 ThinkingProcess 컴포넌트를 갤러리에서 확인하고, 아코디언 펼침/접힘 동작과 단계별 표시를 테스트할 수 있다.

**Why this priority**: GLASSY의 핵심 차별점인 "투명성(Transparency)"을 구현하는 필수 컴포넌트. AI가 어떻게 생각하는지 보여주는 핵심 UI.

**Independent Test**: /components 접속 → "사고 과정" 섹션 확인 → 아코디언 클릭하여 펼침/접힘 테스트 → 각 사고 단계의 상태 아이콘 확인

**Acceptance Scenarios**:

1. **Given** 컴포넌트 갤러리 로드 상태, **When** "사고 과정" 섹션으로 이동, **Then** ThinkingProcess 컴포넌트가 아코디언 형태로 표시됨 (헤더: "🤔 생각하는 중...")
2. **Given** ThinkingProcess 아코디언이 접힌 상태, **When** 헤더 클릭, **Then** 아코디언이 펼쳐지며 사고 단계 목록이 표시됨
3. **Given** 사고 단계 목록이 표시된 상태, **When** 각 단계 확인, **Then** 단계 제목, 설명, 상태 아이콘(대기/진행중/완료)이 표시됨
4. **Given** 아코디언이 펼쳐진 상태, **When** 헤더 다시 클릭, **Then** 아코디언이 접힘

---

### User Story 3 - 메모리 카드 컴포넌트 구현 (Priority: P2)

개발자가 저장된 기억(MemoryCard)과 검색 결과(SearchResultCard) 컴포넌트를 갤러리에서 확인하고, 각 카드의 편집/삭제 인터랙션을 테스트할 수 있다.

**Why this priority**: GLASS_BOX 패널(Phase P3)의 핵심 구성 요소. 메모리 관리 기능의 기반이 되지만, 채팅보다는 우선순위가 낮음.

**Independent Test**: /components 접속 → "메모리 카드" 섹션 확인 → MemoryCard의 수정/삭제 버튼 클릭 테스트 → SearchResultCard의 체크박스 선택/해제 테스트

**Acceptance Scenarios**:

1. **Given** 컴포넌트 갤러리 로드 상태, **When** "메모리 카드" 섹션으로 이동, **Then** MemoryCard 예시가 표시됨 (제목, 요약, 생성일, 수정/삭제 버튼)
2. **Given** MemoryCard가 표시된 상태, **When** 수정 버튼 클릭, **Then** 버튼에 시각적 피드백 표시됨
3. **Given** MemoryCard가 표시된 상태, **When** 삭제 버튼 클릭, **Then** 버튼에 시각적 피드백 표시됨
4. **Given** "메모리 카드" 섹션에서, **When** SearchResultCard 확인, **Then** 체크박스, 제목, 출처, URL, 요약이 표시됨
5. **Given** SearchResultCard가 표시된 상태, **When** 체크박스 클릭, **Then** 체크 상태가 토글됨
6. **Given** SearchResultCard가 표시된 상태, **When** URL 클릭, **Then** 링크 스타일(밑줄, 색상)이 적용됨

---

### User Story 4 - 계획 카드 컴포넌트 구현 (Priority: P2)

개발자가 AI의 실행 계획을 표시하는 PlanCard와 각 단계(PlanStep) 컴포넌트를 갤러리에서 확인하고, 단계 선택/해제, 수정, 삭제, 순서 변경 인터랙션을 테스트할 수 있다.

**Why this priority**: 복잡한 요청 처리 시 사용되는 고급 기능. MVP에는 필수가 아니지만, 투명성 강화를 위해 중요함.

**Independent Test**: /components 접속 → "계획 카드" 섹션 확인 → PlanStep의 체크박스, 수정, 삭제 버튼 테스트 → 드래그 핸들 시각적 확인

**Acceptance Scenarios**:

1. **Given** 컴포넌트 갤러리 로드 상태, **When** "계획 카드" 섹션으로 이동, **Then** PlanCard 컴포넌트가 표시됨 (제목, 설명, 실행 버튼)
2. **Given** PlanCard가 표시된 상태, **When** PlanStep 목록 확인, **Then** 각 단계에 체크박스, 순서 번호, 제목, 설명, 상태 뱃지, 수정/삭제 버튼이 표시됨
3. **Given** PlanStep이 표시된 상태, **When** 체크박스 클릭, **Then** 체크 상태가 토글됨
4. **Given** PlanStep이 표시된 상태, **When** 수정 버튼 클릭, **Then** 버튼에 시각적 피드백 표시됨
5. **Given** PlanStep이 표시된 상태, **When** 삭제 버튼 클릭, **Then** 버튼에 시각적 피드백 표시됨
6. **Given** PlanCard가 표시된 상태, **When** "실행" 버튼 클릭, **Then** 버튼 상태 변경 (비활성화 또는 로딩 상태)
7. **Given** PlanStep 목록이 표시된 상태, **When** 드래그 핸들 확인, **Then** 드래그 가능한 시각적 표시(아이콘)가 있음

---

### User Story 5 - 컴포넌트 갤러리 통합 및 검증 (Priority: P3)

개발자가 모든 Phase P2 컴포넌트를 컴포넌트 갤러리 페이지에서 한눈에 확인하고, 검색 기능을 통해 특정 컴포넌트를 빠르게 찾을 수 있다.

**Why this priority**: 컴포넌트 관리 및 문서화를 위한 통합 작업. 모든 개별 컴포넌트가 완성된 후 진행.

**Independent Test**: /components 접속 → 검색창에 "메시지" 입력 → 채팅 메시지 컴포넌트만 표시되는지 확인 → 검색창 초기화 → 모든 Phase P2 컴포넌트 섹션 확인

**Acceptance Scenarios**:

1. **Given** 컴포넌트 갤러리 페이지 로드 상태, **When** 네비게이션 바 확인, **Then** Phase P2 컴포넌트 링크들이 추가됨 (채팅 메시지, 사고 과정, 메모리 카드, 계획 카드)
2. **Given** 갤러리 페이지가 표시된 상태, **When** 검색창에 "채팅" 입력, **Then** 채팅 관련 컴포넌트만 필터링되어 표시됨
3. **Given** 갤러리 페이지가 표시된 상태, **When** 모든 Phase P2 컴포넌트 섹션 확인, **Then** 각 섹션이 올바른 순서로 표시됨 (채팅 메시지 → 사고 과정 → 메모리 카드 → 계획 카드)
4. **Given** 갤러리 페이지가 표시된 상태, **When** "맨 위로" 버튼 클릭, **Then** 페이지 상단으로 스무스 스크롤됨

---

### Edge Cases

- **긴 텍스트 처리**: UserMessage나 AIMessage에 매우 긴 텍스트가 있을 때 어떻게 표시되는가? (줄바꿈, 스크롤, 말줄임표 등)
- **빈 상태 처리**: 사고 과정 단계가 없을 때, 메모리 카드가 없을 때, 계획 단계가 없을 때 어떻게 표시되는가?
- **특수 문자**: 메시지 내용에 마크다운, HTML, 이모지가 포함될 때 어떻게 렌더링되는가?
- **동시 인터랙션**: 사용자가 여러 PlanStep의 체크박스를 빠르게 클릭할 때 상태가 정확하게 업데이트되는가?
- **접근성**: 키보드만으로 모든 인터랙션(버튼 클릭, 아코디언 토글, 체크박스 선택)이 가능한가?

## Requirements *(mandatory)*

### Functional Requirements

#### 채팅 메시지 컴포넌트 (UserMessage, AIMessage)

- **FR-001**: UserMessage 컴포넌트는 사용자 메시지 텍스트, 전송 시간을 표시해야 함
- **FR-002**: UserMessage 컴포넌트는 오른쪽 정렬 레이아웃을 가져야 함 (채팅 UI 관례)
- **FR-003**: AIMessage 컴포넌트는 페르소나 아바타, 페르소나 이름, 메시지 내용, 전송 시간, 저장 버튼을 표시해야 함
- **FR-004**: AIMessage 컴포넌트는 왼쪽 정렬 레이아웃을 가져야 함 (채팅 UI 관례)
- **FR-005**: AIMessage의 저장 버튼 클릭 시 시각적 피드백(버튼 상태 변경)을 제공해야 함
- **FR-006**: 메시지 컴포넌트는 한글 UI 텍스트를 사용해야 함 (예: "저장", "전송됨")

#### 사고 과정 컴포넌트 (ThinkingProcess)

- **FR-007**: ThinkingProcess 컴포넌트는 아코디언 형태로 구현되어야 함 (shadcn/ui Accordion 사용)
- **FR-008**: 아코디언 헤더는 "🤔 생각하는 중..." 텍스트와 펼침/접힘 아이콘을 표시해야 함
- **FR-009**: 아코디언 내부에는 사고 단계 목록이 표시되어야 함
- **FR-010**: 각 사고 단계는 제목, 설명, 상태 아이콘(대기/진행중/완료)을 포함해야 함
- **FR-011**: 사고 단계의 상태 아이콘은 시각적으로 구분 가능해야 함 (색상, 아이콘 종류)
- **FR-012**: 아코디언 클릭 시 펼침/접힘 애니메이션이 부드럽게 동작해야 함

#### 메모리 카드 컴포넌트 (MemoryCard, SearchResultCard)

- **FR-013**: MemoryCard는 기억 제목, 요약 텍스트, 생성일, 수정 버튼, 삭제 버튼을 표시해야 함
- **FR-014**: MemoryCard는 Card 컴포넌트(shadcn/ui)를 기반으로 구현되어야 함
- **FR-015**: MemoryCard의 수정/삭제 버튼은 클릭 시 시각적 피드백을 제공해야 함
- **FR-016**: SearchResultCard는 체크박스, 제목, 출처, URL, 요약을 표시해야 함
- **FR-017**: SearchResultCard는 Card 컴포넌트(shadcn/ui)를 기반으로 구현되어야 함
- **FR-018**: SearchResultCard의 체크박스는 선택/해제 토글이 가능해야 함
- **FR-019**: SearchResultCard의 URL은 클릭 가능한 링크로 표시되어야 함 (밑줄, 색상 구분)
- **FR-020**: 메모리 카드 컴포넌트는 한글 UI 텍스트를 사용해야 함 (예: "수정", "삭제", "출처")

#### 계획 카드 컴포넌트 (PlanCard, PlanStep)

- **FR-021**: PlanCard는 계획 제목, 설명, 실행 버튼, PlanStep 목록을 표시해야 함
- **FR-022**: PlanCard는 Card 컴포넌트(shadcn/ui)를 기반으로 구현되어야 함
- **FR-023**: PlanStep은 체크박스, 순서 번호, 제목, 설명, 상태 뱃지, 수정 버튼, 삭제 버튼, 드래그 핸들을 표시해야 함
- **FR-024**: PlanStep의 체크박스는 선택/해제 토글이 가능해야 함
- **FR-025**: PlanStep의 상태 뱃지는 "대기", "진행중", "완료", "건너뜀" 상태를 시각적으로 구분해야 함 (Badge 컴포넌트 variant 활용)
- **FR-026**: PlanStep의 수정/삭제 버튼은 클릭 시 시각적 피드백을 제공해야 함
- **FR-027**: PlanStep의 드래그 핸들은 시각적으로 식별 가능해야 함 (아이콘 표시)
- **FR-028**: PlanCard의 실행 버튼은 클릭 시 상태 변경(비활성화 또는 로딩)을 표시해야 함
- **FR-029**: 계획 카드 컴포넌트는 한글 UI 텍스트를 사용해야 함 (예: "실행", "수정", "삭제", "단계")

#### 컴포넌트 갤러리 통합

- **FR-030**: 모든 Phase P2 컴포넌트는 app/components/page.tsx의 컴포넌트 갤러리에 등록되어야 함
- **FR-031**: 각 컴포넌트 섹션은 제목, 설명, 예시 코드를 포함해야 함
- **FR-032**: 컴포넌트 갤러리의 네비게이션 바는 Phase P2 컴포넌트 링크를 포함해야 함
- **FR-033**: 컴포넌트 갤러리의 검색 기능은 Phase P2 컴포넌트도 필터링해야 함
- **FR-034**: 갤러리 페이지는 반응형으로 동작해야 함 (모바일, 태블릿, 데스크톱)

#### 기술 요구사항

- **FR-035**: 모든 컴포넌트는 shadcn/ui 컴포넌트를 기반으로 확장되어야 함
- **FR-036**: 모든 컴포넌트는 TypeScript로 작성되어야 함
- **FR-037**: 모든 컴포넌트는 "use client" 지시문이 필요한 경우에만 사용해야 함 (인터랙티브 컴포넌트)
- **FR-038**: 컴포넌트 파일은 components/ 디렉토리의 적절한 하위 폴더에 생성되어야 함 (chat/, glass-box/, common/)
- **FR-039**: 모든 UI 텍스트는 한글로 작성되어야 함 (GLASSY, GLASS_BOX 제외)

### Key Entities

#### Message (메시지)
- 사용자 또는 AI가 전송한 채팅 메시지
- 주요 속성: 발신자 타입(사용자/AI), 내용, 타임스탬프, 페르소나 정보(AI 메시지의 경우)
- 관계: AI 메시지는 ThinkingProcess, PlanCard와 연관될 수 있음

#### ThinkingStep (사고 단계)
- AI의 사고 과정 중 하나의 단계
- 주요 속성: 제목, 설명, 상태(대기/진행중/완료), 순서
- 관계: ThinkingProcess는 여러 ThinkingStep을 포함

#### Memory (기억)
- 저장된 AI 응답 또는 참조된 정보
- 주요 속성: 제목, 요약, 내용, 생성일, 수정일, 범위(전역/로컬), 편집 가능 여부
- 관계: Message와 연관될 수 있음

#### SearchResult (검색 결과)
- 웹 검색 또는 RAG 검색 결과
- 주요 속성: 제목, 출처, URL, 요약, 선택 상태
- 관계: Message와 연관될 수 있음

#### PlanStep (계획 단계)
- 실행 계획의 하나의 단계
- 주요 속성: 순서, 제목, 설명, 상태(대기/진행중/완료/건너뜀), 선택 상태
- 관계: PlanCard는 여러 PlanStep을 포함

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 개발자가 컴포넌트 갤러리 페이지에서 모든 Phase P2 컴포넌트(8개)를 확인할 수 있음
- **SC-002**: 각 컴포넌트 섹션은 5초 이내에 로드되고 렌더링됨
- **SC-003**: 모든 인터랙티브 요소(버튼, 체크박스, 아코디언)가 클릭 시 200ms 이내에 시각적 피드백을 제공함
- **SC-004**: TypeScript 컴파일 오류 0건 (npm run type-check 통과)
- **SC-005**: 프로덕션 빌드 성공 (npm run build 통과)
- **SC-006**: 컴포넌트 갤러리 페이지는 모바일(< 768px), 태블릿(768-1024px), 데스크톱(> 1024px) 모든 화면 크기에서 올바르게 표시됨
- **SC-007**: 모든 UI 텍스트가 한글로 표시됨 (GLASSY, GLASS_BOX 제외)
- **SC-008**: 개발자가 검색 기능을 사용하여 특정 컴포넌트를 3초 이내에 찾을 수 있음
- **SC-009**: 모든 컴포넌트가 shadcn/ui 스타일 가이드(new-york)를 따름
- **SC-010**: 각 컴포넌트는 독립적으로 테스트 가능하며, 컴포넌트 갤러리에서 동작 확인 가능함

## Assumptions

1. **컴포넌트 분류**: 채팅 관련 컴포넌트는 components/chat/, 메모리/검색 관련은 components/glass-box/, 공통은 components/common/에 배치
2. **상태 관리**: 컴포넌트 갤러리에서는 로컬 상태(useState)만 사용하며, Zustand는 사용하지 않음 (실제 통합은 Phase P4-P6에서 진행)
3. **더미 데이터**: 모든 컴포넌트는 하드코딩된 예시 데이터를 사용하여 시각적 검증에 집중
4. **드래그 앤 드롭**: PlanStep의 드래그 기능은 시각적 표시(핸들 아이콘)만 구현하고, 실제 드래그 로직은 Phase P6에서 구현
5. **타임스탬프 형식**: "방금 전", "5분 전", "오늘 오후 2:30" 등 한글 상대 시간 형식 사용
6. **페르소나 아바타**: 기본 아바타는 shadcn/ui Avatar 컴포넌트의 Fallback(이니셜) 사용
7. **마크다운 렌더링**: 메시지 내용에 마크다운이 있을 경우 일반 텍스트로 표시 (마크다운 파싱은 Phase P5에서 구현)
8. **접근성**: 기본적인 시맨틱 HTML과 ARIA 레이블은 적용하되, 전체 접근성 감사는 Phase P7에서 진행

## Dependencies

- **Phase P0**: 프로젝트 설정 완료 (패키지 설치, 폴더 구조)
- **Phase P1**: 기본 컴포넌트 설치 완료 (Button, Card, Input, Badge, Avatar, Separator, Tabs, Accordion 등)
- **컴포넌트 갤러리**: app/components/page.tsx 존재 및 Phase P1 패턴 확립

## Out of Scope

- 실제 백엔드 API 연동
- Zustand를 사용한 전역 상태 관리 (Phase P4)
- 실제 드래그 앤 드롭 기능 구현 (Phase P6)
- 마크다운 렌더링 (Phase P5)
- 애니메이션 및 전환 효과 (Phase P7)
- 실제 저장/삭제/수정 기능 구현 (Phase P6)
- 전체 접근성 감사 및 개선 (Phase P7)
- 시나리오 실행 로직 (Phase P5-P6)
