# Data Model: GLASSY 프로젝트

**Feature**: GLASSY 프로젝트 실행 계획
**Date**: 2025-12-17
**Purpose**: 핵심 데이터 모델 및 타입 정의

---

## 1. 핵심 엔티티 (Phase P0에서 정의할 타입)

### 1.1 Phase (개발 단계)

**파일**: `types/phase.ts`

**목적**: P0-P7 Phase 구조 및 메타데이터 정의

```typescript
export type PhaseId = 'P0' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7'

export interface Phase {
  id: PhaseId
  name: string
  description: string
  coreContent: string           // 핵심 내용
  reviewRequired: boolean       // 검토 필수 여부
  exitCriteria: string[]        // 완료 조건
  workScope: {
    files: number               // 예상 파일 수
    components: number          // 예상 컴포넌트 수
    estimatedDays: number       // 예상 작업 기간 (일)
  }
  dependencies: PhaseId[]       // 선행 Phase
  mappedFeatures: string[]      // 매핑된 기능 ID (F1-1, F5-2 등)
}
```

**검증 규칙**:
- Phase는 반드시 dependencies 순서대로 진행
- reviewRequired가 true인 Phase는 승인 전까지 다음 Phase 진행 불가

**관계**:
- Phase --[1:N]--> Feature (하나의 Phase는 여러 Feature를 포함)
- Phase --[1:N]--> Task (Phase 시작 시 동적 생성)

---

### 1.2 Feature (PRD 기능)

**파일**: `types/feature.ts`

**목적**: PRD v1.0의 F1-F5 기능 정의 및 Phase 매핑

```typescript
export type FeaturePriority = 'Must Have' | 'Should Have' | 'Nice to Have'
export type FeatureCategory = 'F1' | 'F2' | 'F3' | 'F4' | 'F5'

export interface Feature {
  id: string                    // 예: "F1-1", "F5-2-1"
  category: FeatureCategory     // F1: 인증, F2: 설정, F3: 워크스페이스, F4: GLASS_BOX, F5: 채팅
  name: string                  // 기능명
  description: string           // 설명
  priority: FeaturePriority     // 우선순위
  assignedPhase: PhaseId        // 할당된 Phase
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  dependencies: string[]        // 의존하는 Feature ID 목록
  acceptanceCriteria: string[]  // 완료 기준
}
```

**검증 규칙**:
- 모든 Feature는 반드시 하나의 Phase에 할당
- 'Must Have' 우선순위 기능은 초기 Phase(P0-P3)에 집중 배치
- dependencies에 명시된 Feature가 먼저 완료되어야 진행 가능

**관계**:
- Feature --[N:1]--> Phase (여러 Feature가 하나의 Phase에 속함)

**Feature-Phase 매핑 예시**:
```typescript
const featurePhaseMap: Record<string, PhaseId> = {
  'F1-1': 'P4',  // 로그인
  'F1-2': 'P4',  // 로그아웃
  'F5-1': 'P2',  // 기본 채팅 (컴포넌트)
  'F5-2': 'P2',  // 사고 과정 시각화 (컴포넌트)
  // ... (spec.md의 Feature-Phase 매핑 테이블 참조)
}
```

---

### 1.3 Task (Phase 내 세부 작업)

**파일**: `types/task.ts`

**목적**: Phase 시작 시 동적으로 생성되는 작업 단위

```typescript
export interface Task {
  id: string                    // 예: "P1-T001"
  phaseId: PhaseId              // 소속 Phase
  title: string                 // 작업 제목
  description: string           // 상세 설명
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  estimatedHours: number        // 예상 시간 (1-4시간 권장)
  actualHours?: number          // 실제 소요 시간
  dependencies: string[]        // 선행 Task ID 목록
  assignee?: string             // 담당자
  createdAt: string             // ISO 8601
  completedAt?: string          // ISO 8601
  notes?: string                // 특이사항
}
```

**검증 규칙**:
- Task는 1-4시간 내 완료 가능한 크기로 분해
- dependencies에 명시된 Task가 완료되어야 시작 가능
- 각 Task는 독립적으로 완료 가능해야 함 (원자성)

**관계**:
- Task --[N:1]--> Phase (여러 Task가 하나의 Phase에 속함)
- Task --[N:M]--> Task (Task 간 의존성)

**Task 예시 (Phase P1)**:
```typescript
const p1Tasks: Task[] = [
  {
    id: 'P1-T001',
    phaseId: 'P1',
    title: 'shadcn/ui button 컴포넌트 설치',
    description: 'npx shadcn@latest add button 실행 및 검증',
    status: 'pending',
    estimatedHours: 0.5,
    dependencies: [],
    createdAt: '2025-12-17T00:00:00Z'
  },
  {
    id: 'P1-T002',
    phaseId: 'P1',
    title: 'shadcn/ui card 컴포넌트 설치',
    description: 'npx shadcn@latest add card 실행 및 검증',
    status: 'pending',
    estimatedHours: 0.5,
    dependencies: [],
    createdAt: '2025-12-17T00:00:00Z'
  },
  // ... 총 10+ 컴포넌트 설치 Task
]
```

---

### 1.4 Checkpoint (Phase 완료 체크포인트)

**파일**: `types/checkpoint.ts`

**목적**: Phase 완료 및 검토 상태 추적

```typescript
export type ReviewStatus = 'not-required' | 'pending' | 'approved' | 'rejected' | 'revising'

export interface Checkpoint {
  id: string                    // 예: "CP-P1"
  phaseId: PhaseId              // 대상 Phase
  completedAt?: string          // 완료 일시 (ISO 8601)
  reviewStatus: ReviewStatus    // 검토 상태
  reviewer?: string             // 검토자
  reviewedAt?: string           // 검토 일시 (ISO 8601)
  approvedAt?: string           // 승인 일시 (ISO 8601)
  feedback?: string             // 검토 피드백
  revisionNotes?: string        // 수정 사항
  artifacts: {                  // 검증 대상
    galleryUrl?: string         // 컴포넌트 갤러리 URL
    commitHash?: string         // Git commit hash
    screenshots?: string[]      // 스크린샷 경로
  }
}
```

**검증 규칙**:
- reviewRequired가 true인 Phase는 reviewStatus가 'approved'여야 다음 Phase 진행
- Checkpoint는 Phase 완료 후 자동 생성
- 검토 필수 Phase(P1, P2, P3, P6, P7)는 artifacts 필수

**관계**:
- Checkpoint --[1:1]--> Phase (각 Phase는 하나의 Checkpoint를 가짐)

**Checkpoint 워크플로우**:
```
Phase 완료 → Checkpoint 생성 (status: pending)
  ↓ (reviewRequired: false)
  └→ status: not-required → 다음 Phase 진행

  ↓ (reviewRequired: true)
  └→ status: pending → 검토 요청
      ↓
      ├→ status: approved → 다음 Phase 진행
      └→ status: rejected → status: revising → 수정 후 재검토
```

---

## 2. 데이터 검증 규칙 (Validation Rules)

### 2.1 Phase 진행 제약 조건

```typescript
// Phase 진행 가능 여부 검증
function canStartPhase(phaseId: PhaseId, checkpoints: Checkpoint[]): boolean {
  const phase = phases.find(p => p.id === phaseId)

  // 선행 Phase가 모두 완료되었는지 확인
  for (const depPhaseId of phase.dependencies) {
    const checkpoint = checkpoints.find(cp => cp.phaseId === depPhaseId)

    if (!checkpoint) {
      return false // Checkpoint 미생성
    }

    if (checkpoint.reviewStatus === 'rejected' || checkpoint.reviewStatus === 'revising') {
      return false // 검토 거부 또는 수정 중
    }

    const depPhase = phases.find(p => p.id === depPhaseId)
    if (depPhase.reviewRequired && checkpoint.reviewStatus !== 'approved') {
      return false // 검토 필수인데 미승인
    }
  }

  return true
}
```

### 2.2 Feature 완료 조건

```typescript
// Feature 완료 여부 검증
function isFeatureCompleted(feature: Feature, tasks: Task[]): boolean {
  const featureTasks = tasks.filter(t =>
    t.description.includes(feature.id) ||
    t.notes?.includes(feature.id)
  )

  // 모든 관련 Task가 완료되어야 함
  return featureTasks.every(t => t.status === 'completed')
}
```

### 2.3 Task 시작 조건

```typescript
// Task 시작 가능 여부 검증
function canStartTask(task: Task, allTasks: Task[]): boolean {
  // 선행 Task가 모두 완료되었는지 확인
  return task.dependencies.every(depTaskId => {
    const depTask = allTasks.find(t => t.id === depTaskId)
    return depTask?.status === 'completed'
  })
}
```

---

## 3. 상태 전이 (State Transitions)

### 3.1 Phase 상태 전이

```
pending → in-progress → completed
    ↓                       ↓
  blocked ←─────────────────┘ (if dependency fails)
```

### 3.2 Task 상태 전이

```
pending → in-progress → completed
    ↓          ↓
  blocked ←────┘ (if dependency not met)
```

### 3.3 Checkpoint 검토 상태 전이

```
not-required (reviewRequired: false)

pending → approved (review pass)
    ↓
    └→ rejected → revising → pending (resubmit)
```

---

## 4. 데이터 관계 다이어그램

```
Phase (1) ──[has]──> (N) Feature
  │                      │
  │                      └──[assigned to]──> (1) Phase
  │
  ├──[has]──> (N) Task
  │                │
  │                └──[depends on]──> (N) Task
  │
  └──[has]──> (1) Checkpoint
                   │
                   └──[reviews]──> (1) Phase
```

---

## 5. TypeScript 스키마 (Phase P0에서 구현)

### 디렉토리 구조
```
types/
├── phase.ts           # Phase 타입
├── feature.ts         # Feature 타입
├── task.ts            # Task 타입
├── checkpoint.ts      # Checkpoint 타입
└── index.ts           # 통합 export
```

### types/index.ts
```typescript
export * from './phase'
export * from './feature'
export * from './task'
export * from './checkpoint'

// 헬퍼 함수
export { canStartPhase, isFeatureCompleted, canStartTask } from './validators'
```

---

## 6. 초기 데이터 (Phase P0에서 생성)

### data/phases.json
```json
[
  {
    "id": "P0",
    "name": "프로젝트 설정",
    "description": "개발 환경 및 기반 구조 구축",
    "coreContent": "패키지 설치, 폴더 구조 생성, 타입 정의",
    "reviewRequired": false,
    "exitCriteria": [
      "npm install 에러 없이 완료",
      "npm run dev 정상 실행",
      "npm run type-check 에러 0건",
      "8개 핵심 폴더 존재",
      "8개 타입 정의 파일 존재"
    ],
    "workScope": {
      "files": 15,
      "components": 0,
      "estimatedDays": 1
    },
    "dependencies": [],
    "mappedFeatures": []
  },
  // ... P1-P7 정의 (spec.md 참조)
]
```

### data/features.json
```json
[
  {
    "id": "F1-1",
    "category": "F1",
    "name": "로그인",
    "description": "이메일로 로그인 (더미 인증)",
    "priority": "Must Have",
    "assignedPhase": "P4",
    "status": "pending",
    "dependencies": [],
    "acceptanceCriteria": [
      "이메일 입력 폼 표시",
      "로그인 버튼 클릭 시 인증 상태 변경",
      "localStorage에 인증 정보 저장",
      "로그인 후 메인 페이지로 리다이렉트"
    ]
  },
  // ... F1-2 ~ F5-9 정의 (spec.md Feature-Phase 매핑 테이블 참조)
]
```

---

## 7. 데이터 마이그레이션 전략

### 버전 관리
```typescript
export interface DataModelVersion {
  version: string           // 예: "1.0.0"
  migratedAt: string       // ISO 8601
  changes: string[]        // 변경 사항
}

// 향후 데이터 모델 변경 시 마이그레이션 함수 정의
export function migratePhaseData(oldData: any, targetVersion: string): Phase[] {
  // 마이그레이션 로직
}
```

### localStorage 키 관리
```
glassy-phases           # Phase 메타데이터
glassy-features         # Feature 목록
glassy-tasks            # Task 목록 (Phase별 동적 생성)
glassy-checkpoints      # Checkpoint 상태
glassy-data-version     # 데이터 모델 버전
```

---

## 8. 확장성 고려사항

### 8.1 Phase 추가 시나리오
프로젝트 진행 중 새로운 Phase(예: P8-테스트)가 추가될 경우:
```typescript
// 1. PhaseId 타입 확장
export type PhaseId = 'P0' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8'

// 2. data/phases.json에 P8 추가
// 3. dependencies에 P7 명시
// 4. Feature 재매핑 (필요 시)
```

### 8.2 Feature 우선순위 변경
PRD 기능 우선순위가 변경될 경우:
```typescript
// 1. data/features.json에서 priority 수정
// 2. assignedPhase 재조정 (높음 → 초기 Phase로 이동)
// 3. Task 재생성 (Phase 시작 시)
```

---

## 9. 데이터 무결성 체크리스트

Phase P0 완료 시 확인:
- [ ] 모든 타입 정의 파일 생성 완료 (types/*.ts)
- [ ] Phase 의존성 사이클 없음
- [ ] 모든 Feature가 Phase에 할당됨
- [ ] 검토 필수 Phase(P1, P2, P3, P6, P7) 플래그 정확
- [ ] exitCriteria가 검증 가능한 형태
- [ ] TypeScript 타입 에러 0건

---

**문서 버전**: v1.0
**작성일**: 2025-12-17
**다음 단계**: Phase 1 - API 계약 정의 (contracts/)
