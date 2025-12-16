# Phase Execution Protocol

**Version**: 1.0
**Date**: 2025-12-17
**Purpose**: Phase 진행 프로토콜 정의

---

## 1. Phase 진행 프로토콜 개요

모든 Phase는 다음 7단계 프로토콜을 따라 진행됩니다:

```
1. [시작] Phase 시작 알림
     ↓
2. [작업] Task별 순차 진행
     ↓
3. [등록] 컴포넌트 갤러리 등록 (해당 시)
     ↓
4. [보고] Phase 완료 보고
     ↓
5. [검토] 검토 요청 (검토 필수 Phase만)
     ↓
6. [승인] 사용자 승인 대기
     ↓
7. [진행] 다음 Phase 진행
```

---

## 2. 단계별 상세 프로토콜

### 2.1 [시작] Phase 시작 알림

**입력**:
- `phaseId: PhaseId`
- `initiatedBy: string` (사용자 또는 자동)

**전제 조건**:
```typescript
// 1. 선행 Phase가 모두 완료되었는가?
const canStart = canStartPhase(phaseId, checkpoints)

// 2. 검토 필수 Phase의 경우 이전 Phase가 승인되었는가?
const prevPhaseApproved = checkPreviousPhaseApproval(phaseId)
```

**출력 (사용자에게 표시)**:
```markdown
## 🚀 Phase [ID] 시작

### Phase 정보
- 이름: [Phase 이름]
- 목표: [Phase 목표]
- 예상 기간: [N]일
- 검토 필수: [예/아니오]

### 작업 범위
- 예상 파일 수: [N]개
- 예상 컴포넌트 수: [N]개
- 매핑된 기능: [Feature ID 목록]

### 완료 조건
- [ ] [Exit Criteria 1]
- [ ] [Exit Criteria 2]
- ...

### 다음 단계
Task 목록을 생성하고 순차적으로 진행합니다.
```

**예시 (Phase P1 시작)**:
```markdown
## 🚀 Phase P1 시작

### Phase 정보
- 이름: 기본 컴포넌트
- 목표: shadcn/ui 기반 기본 UI 컴포넌트 설치 및 커스터마이징
- 예상 기간: 2일
- 검토 필수: 예

### 작업 범위
- 예상 파일 수: 15개
- 예상 컴포넌트 수: 10개
- 매핑된 기능: 없음 (기본 UI 구성 요소)

### 완료 조건
- [ ] 최소 10개 shadcn 컴포넌트 설치
- [ ] 컴포넌트 갤러리 페이지 접근 가능
- [ ] 모든 컴포넌트 스토리북 스타일로 갤러리에 표시

### 다음 단계
Task 목록을 생성하고 순차적으로 진행합니다.
```

---

### 2.2 [작업] Task별 순차 진행

**입력**:
- `tasks: Task[]` (해당 Phase의 Task 목록)

**진행 규칙**:
```typescript
// 1. Task 의존성 확인
for (const task of tasks) {
  if (canStartTask(task, tasks)) {
    // Task 시작
    task.status = 'in-progress'
    // ... 작업 수행
    task.status = 'completed'
    task.completedAt = new Date().toISOString()
  } else {
    // 선행 Task 완료 대기
    task.status = 'blocked'
  }
}

// 2. Task 완료 후 즉시 체크박스 업데이트
updateTaskStatus(task.id, 'completed')
```

**출력 (Task 시작 시)**:
```markdown
### Task [ID] 시작: [Task 제목]
예상 시간: [N]시간
의존성: [선행 Task ID 목록 또는 "없음"]
```

**출력 (Task 완료 시)**:
```markdown
✅ Task [ID] 완료: [Task 제목]
실제 소요 시간: [N]시간
생성/수정된 파일: [파일 경로 목록]
```

**예시**:
```markdown
### Task P1-T001 시작: shadcn/ui button 컴포넌트 설치
예상 시간: 0.5시간
의존성: 없음

✅ Task P1-T001 완료: shadcn/ui button 컴포넌트 설치
실제 소요 시간: 0.3시간
생성/수정된 파일:
- components/ui/button.tsx
```

---

### 2.3 [등록] 컴포넌트 갤러리 등록

**적용 Phase**: P1, P2, P3 (컴포넌트 작업 Phase)

**입력**:
- `component: Component` (등록할 컴포넌트)
- `galleryPath: string` (갤러리 페이지 경로)

**등록 규칙**:
```typescript
// 1. 컴포넌트 갤러리 페이지에 등록
// app/components/page.tsx에 새 섹션 추가

// 2. 컴포넌트 정보 기록
interface GalleryEntry {
  id: string                // 컴포넌트 ID
  name: string              // 컴포넌트 이름
  category: string          // 카테고리 (기본/조합/레이아웃)
  description: string       // 설명
  filePath: string          // 파일 경로
  props?: PropDefinition[]  // Props 정의
  variants?: string[]       // 변형 목록
}
```

**출력**:
```markdown
### 📋 컴포넌트 갤러리 등록

등록된 컴포넌트:
- [컴포넌트명]: [설명]
  - 파일: [파일 경로]
  - 갤러리: http://localhost:3000/components#[컴포넌트ID]
```

**예시**:
```markdown
### 📋 컴포넌트 갤러리 등록

등록된 컴포넌트:
- Button: shadcn/ui 버튼 컴포넌트
  - 파일: components/ui/button.tsx
  - 갤러리: http://localhost:3000/components#button

- Card: shadcn/ui 카드 컴포넌트
  - 파일: components/ui/card.tsx
  - 갤러리: http://localhost:3000/components#card
```

---

### 2.4 [보고] Phase 완료 보고

**입력**:
- `phaseId: PhaseId`
- `tasks: Task[]` (완료된 Task 목록)
- `artifacts: Artifact[]` (생성된 산출물)

**완료 조건 검증**:
```typescript
// 1. 모든 Task가 완료되었는가?
const allTasksCompleted = tasks.every(t => t.status === 'completed')

// 2. Exit Criteria를 만족하는가?
const exitCriteriaMet = checkExitCriteria(phaseId)

// 3. TypeScript 에러가 없는가?
const typeCheckPassed = await runTypeCheck()
```

**출력 템플릿**:
```markdown
## ✅ Phase [ID] 완료 보고

### 완료된 작업
- Task [ID]: [작업 내용] (소요 시간: [N]시간)
- Task [ID]: [작업 내용] (소요 시간: [N]시간)
- ...

총 작업 시간: [N]시간 (예상: [M]시간)

### 생성/수정된 파일
- [파일 경로 1]
- [파일 경로 2]
- ...

총 [N]개 파일

### 컴포넌트 갤러리 등록 (해당 시)
- [컴포넌트명 1] - [설명]
- [컴포넌트명 2] - [설명]
- ...

갤러리 URL: http://localhost:3000/components

### 완료 조건 검증
- [✅/❌] [Exit Criteria 1]
- [✅/❌] [Exit Criteria 2]
- ...

### 다음 단계
- [검토 필수] 검토 요청 → Phase [다음 Phase ID]
- [검토 불필요] Phase [다음 Phase ID] 진행

### 검토 필요 여부
[예/아니오]
```

---

### 2.5 [검토] 검토 요청

**적용 Phase**: P1, P2, P3, P6, P7 (reviewRequired: true)

**입력**:
- `phaseId: PhaseId`
- `checkpoint: Checkpoint` (생성된 체크포인트)

**검토 요청 템플릿**:
```markdown
## 🔍 Phase [ID] 검토 요청

### 검토 대상
- Phase: [ID] - [이름]
- 컴포넌트/기능: [목록]

### 확인 방법
1. 개발 서버 실행: `npm run dev`
2. 컴포넌트 갤러리 접속: `http://localhost:3000/components`
   (또는 해당 기능 URL)
3. 각 컴포넌트/기능 동작 확인

### 검토 포인트
- [ ] [검토 항목 1]
- [ ] [검토 항목 2]
- [ ] [검토 항목 3]

### 완료 조건 충족 여부
- [✅/❌] [Exit Criteria 1]
- [✅/❌] [Exit Criteria 2]
- ...

### 피드백 요청 사항
- [구체적인 질문 또는 확인 필요 사항]

### 산출물
- Git Commit: [commit hash]
- 스크린샷: [경로 또는 첨부]
- 갤러리 URL: http://localhost:3000/components
```

**예시 (Phase P1 검토 요청)**:
```markdown
## 🔍 Phase P1 검토 요청

### 검토 대상
- Phase: P1 - 기본 컴포넌트
- 컴포넌트: button, card, dialog, input, textarea, badge, accordion, toast, dropdown-menu, avatar, scroll-area

### 확인 방법
1. 개발 서버 실행: `npm run dev`
2. 컴포넌트 갤러리 접속: `http://localhost:3000/components`
3. 각 컴포넌트 동작 확인

### 검토 포인트
- [ ] 디자인 일관성 (new-york 스타일 적용)
- [ ] 인터랙션 동작 (hover, click, focus)
- [ ] 반응형 대응 (모바일/태블릿/데스크톱)
- [ ] 접근성 (키보드 네비게이션)

### 완료 조건 충족 여부
- ✅ 최소 10개 shadcn 컴포넌트 설치
- ✅ 컴포넌트 갤러리 페이지 접근 가능
- ✅ 모든 컴포넌트 스토리북 스타일로 갤러리에 표시

### 피드백 요청 사항
- 컴포넌트 스타일이 프로젝트 디자인에 부합하는가?
- 추가로 설치해야 할 컴포넌트가 있는가?

### 산출물
- Git Commit: abc123def
- 갤러리 URL: http://localhost:3000/components
```

---

### 2.6 [승인] 사용자 승인 대기

**입력**:
- `checkpoint: Checkpoint` (검토 요청된 체크포인트)

**승인 옵션**:
1. **승인 (Approved)**: 다음 Phase 진행
2. **거부 (Rejected)**: 수정 요청
3. **수정 후 재검토 (Revising)**: 피드백 반영 후 재제출

**승인 프로세스**:
```typescript
// 1. 사용자 피드백 수집
const feedback = getUserFeedback()

// 2. 승인/거부/수정 결정
if (feedback.decision === 'approved') {
  checkpoint.reviewStatus = 'approved'
  checkpoint.approvedAt = new Date().toISOString()
  // 다음 Phase 진행
} else if (feedback.decision === 'rejected') {
  checkpoint.reviewStatus = 'rejected'
  checkpoint.feedback = feedback.comments
  // 수정 작업 시작
} else if (feedback.decision === 'revising') {
  checkpoint.reviewStatus = 'revising'
  checkpoint.revisionNotes = feedback.revisionNotes
  // 수정 작업 진행 후 재검토
}
```

**출력 (승인 시)**:
```markdown
## ✅ Phase [ID] 승인

검토 의견: [피드백]
승인 일시: [ISO 8601]

다음 Phase [다음 Phase ID]를 시작합니다.
```

**출력 (거부 시)**:
```markdown
## ❌ Phase [ID] 거부

검토 의견: [피드백]
수정 필요 사항:
- [수정 항목 1]
- [수정 항목 2]
- ...

수정 후 재검토를 요청해 주세요.
```

---

### 2.7 [진행] 다음 Phase 진행

**입력**:
- `currentPhaseId: PhaseId`
- `checkpoint: Checkpoint` (승인된 체크포인트)

**전제 조건**:
```typescript
// 1. 현재 Phase가 완료되었는가?
const currentPhaseCompleted = checkpoint.completedAt !== undefined

// 2. 검토가 승인되었는가? (검토 필수 Phase의 경우)
const reviewApproved = checkpoint.reviewStatus === 'approved' ||
                       checkpoint.reviewStatus === 'not-required'

// 3. 다음 Phase가 존재하는가?
const nextPhaseExists = getNextPhase(currentPhaseId) !== null
```

**출력**:
```markdown
## 🎯 다음 Phase 진행

현재 Phase: [ID] - [이름] (완료)
다음 Phase: [다음 Phase ID] - [다음 Phase 이름]

[시작] 프로토콜로 돌아가 Phase [다음 Phase ID]를 시작합니다.
```

---

## 3. Phase별 검토 기준

### 3.1 Phase P1: 기본 컴포넌트

**검토 포인트**:
- [ ] shadcn/ui 컴포넌트가 정상 설치되었는가?
- [ ] 컴포넌트 갤러리에 모든 컴포넌트가 표시되는가?
- [ ] new-york 스타일이 일관되게 적용되었는가?
- [ ] 컴포넌트 인터랙션이 정상 동작하는가?

**승인 기준**:
- 최소 10개 컴포넌트 설치
- 갤러리 페이지 정상 접근
- TypeScript 에러 0건

---

### 3.2 Phase P2: 조합 컴포넌트

**검토 포인트**:
- [ ] 조합 컴포넌트가 기본 컴포넌트를 올바르게 사용하는가?
- [ ] props 타입이 명확히 정의되었는가?
- [ ] 컴포넌트 간 일관성이 유지되는가?
- [ ] 갤러리에서 인터랙션 테스트가 가능한가?

**승인 기준**:
- 5개 이상 조합 컴포넌트 완성
- 모든 props 타입 정의 완료
- 갤러리 등록 및 인터랙션 테스트 통과

---

### 3.3 Phase P3: 레이아웃

**검토 포인트**:
- [ ] 3-Panel 레이아웃이 정상 표시되는가?
- [ ] 패널 크기 조정이 가능한가?
- [ ] 반응형 브레이크포인트가 올바르게 동작하는가?
- [ ] 패널 접기/펼치기 기능이 정상 동작하는가?

**승인 기준**:
- 3-Panel 레이아웃 화면 표시
- 반응형 테스트 (< 768px, 768-1024px, > 1024px)
- 패널 조작 기능 동작 확인

---

### 3.4 Phase P6: 통합

**검토 포인트**:
- [ ] 모든 패널이 Store와 연결되어 동작하는가?
- [ ] 세션 생성 → 메시지 전송 → 응답 수신 플로우가 성공하는가?
- [ ] 메모리 저장 → GLASS_BOX 표시 플로우가 성공하는가?
- [ ] 페르소나 변경 시 UI가 업데이트되는가?

**승인 기준**:
- 전체 사용자 플로우 테스트 통과
- 모든 Store-Component 연결 동작 확인

---

### 3.5 Phase P7: 마무리

**검토 포인트**:
- [ ] 주요 인터랙션에 애니메이션이 적용되었는가?
- [ ] 3가지 화면 크기에서 정상 동작하는가?
- [ ] 드래그 앤 드롭이 정상 동작하는가?
- [ ] 접근성 기준을 충족하는가?

**승인 기준**:
- 애니메이션 적용 (60fps)
- 반응형 동작 확인 (모바일/태블릿/데스크톱)
- 드래그 앤 드롭 동작 확인
- 접근성 점수 80% 이상

---

## 4. 예외 처리

### 4.1 Phase 진행 중 요구사항 변경

**프로토콜**:
1. 현재 작업 중단
2. 변경 요구사항 문서화
3. Feature/Task 재조정
4. Phase 재시작 또는 계속 진행 결정
5. 사용자 승인 후 진행

### 4.2 Phase 예상 기간 초과

**프로토콜**:
1. 지연 원인 분석
2. 남은 작업 재평가
3. Task 우선순위 조정
4. 일정 조정안 제시
5. 사용자 승인 후 진행

### 4.3 검토 거부 후 재작업

**프로토콜**:
1. 피드백 분석
2. 수정 Task 목록 생성
3. 수정 작업 진행 (Phase 내에서)
4. 재검토 요청
5. 승인 후 다음 Phase 진행

### 4.4 Phase 건너뛰기 요청

**프로토콜**:
1. **원칙적으로 거부** (CLAUDE.md 절대 원칙)
2. 요청 이유 확인
3. 대안 제시 (Task 범위 축소, 최소 요구사항 충족 등)
4. 불가피한 경우에만 예외 승인 (문서화 필수)

---

**문서 버전**: 1.0
**작성일**: 2025-12-17
**다음 문서**: Phase별 검토 템플릿
