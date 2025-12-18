# Quick Start: GLASSY 프로젝트 실행 계획

**Version**: 1.0
**Date**: 2025-12-17
**Purpose**: 빠른 시작 가이드 - Phase 실행 순서 및 핵심 명령어

---

## 1. 전체 Phase 순서

```
P0 (프로젝트 설정)
  ↓
P1 (기본 컴포넌트) ← 검토 필수 ✅
  ↓
P2 (조합 컴포넌트) ← 검토 필수 ✅
  ↓
P3 (레이아웃) ← 검토 필수 ✅
  ↓
P4 (상태 관리)
  ↓
P5 (시나리오 구조)
  ↓
P6 (통합) ← 검토 필수 ✅
  ↓
P7 (마무리) ← 검토 필수 ✅
  ↓
🎉 프로젝트 완료
```

**총 예상 기간**: 17일 (실제 작업 4-6시간/일 기준)

---

## 2. Phase P0: 프로젝트 설정 (1일)

### 2.1 패키지 설치

```bash
# 1. 현재 패키지 확인
npm list --depth=0

# 2. 추가 패키지 설치
npm install zustand                                    # 상태 관리
npm install framer-motion                              # 애니메이션
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities  # 드래그 앤 드롭

# 3. 설치 확인
npm list zustand framer-motion @dnd-kit/core
```

### 2.2 폴더 구조 생성

```bash
# 폴더 생성
mkdir -p components/{ui,common,chat,workspace,glass-box,layout}
mkdir -p stores hooks types data/{scenarios,mock-data}

# 확인
ls -la components/ stores/ hooks/ types/ data/
```

### 2.3 타입 정의 파일 생성

```bash
# types/ 폴더에 8개 타입 정의 파일 생성
touch types/message.ts
touch types/session.ts
touch types/workspace.ts
touch types/memory.ts
touch types/persona.ts
touch types/workflow.ts
touch types/plan.ts
touch types/thought-step.ts
touch types/scenario.ts
touch types/index.ts

# 확인
ls -la types/
```

### 2.4 완료 확인

```bash
# 타입 체크
npm run type-check  # 또는 npx tsc --noEmit

# 개발 서버 실행
npm run dev

# 빌드 테스트
npm run build
```

**Exit Criteria**:
- [ ] npm install 에러 없이 완료
- [ ] npm run dev 정상 실행
- [ ] npm run type-check 에러 0건
- [ ] 8개 핵심 폴더 존재
- [ ] 9개 타입 정의 파일 존재

---

## 3. Phase P1: 기본 컴포넌트 (2일) ← 검토 필수

### 3.1 shadcn/ui 컴포넌트 설치

```bash
# 기본 컴포넌트 설치 (순차 실행)
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add badge
npx shadcn@latest add accordion
npx shadcn@latest add toast
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
npx shadcn@latest add scroll-area

# 확인
ls -la components/ui/
```

### 3.2 컴포넌트 갤러리 페이지 생성

```bash
# 갤러리 페이지 생성
touch app/components/page.tsx

# 개발 서버 실행 후 접속
npm run dev
# http://localhost:3000/components
```

### 3.3 검토 요청

```bash
# Git commit
git add .
git commit -m "Phase P1: 기본 컴포넌트 완료

- shadcn/ui 컴포넌트 11개 설치
- 컴포넌트 갤러리 페이지 구성

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 검토 요청
echo "Phase P1 검토 요청: http://localhost:3000/components"
```

**Exit Criteria**:
- [ ] 최소 10개 shadcn 컴포넌트 설치
- [ ] 컴포넌트 갤러리 페이지 접근 가능
- [ ] 모든 컴포넌트 스토리북 스타일로 갤러리에 표시

**검토 포인트**:
- 디자인 일관성, 인터랙션 동작, 반응형 대응

---

## 4. Phase P2: 조합 컴포넌트 (3일) ← 검토 필수

### 4.1 컴포넌트 파일 생성

```bash
# 채팅 컴포넌트
touch components/chat/MessageInput.tsx
touch components/chat/MessageList.tsx
touch components/chat/MessageBubble.tsx

# GLASS_BOX 컴포넌트
touch components/glass-box/ThinkingAccordion.tsx
touch components/glass-box/PlanCard.tsx
touch components/glass-box/MemoryCard.tsx

# 공통 컴포넌트
touch components/common/PersonaSelector.tsx

# 확인
ls -la components/chat/ components/glass-box/ components/common/
```

### 4.2 타입 정의 구현

```bash
# types/ 파일 구현
# (각 파일에 interface 및 type 정의 작성)

# 타입 체크
npm run type-check
```

### 4.3 갤러리에 등록

```bash
# app/components/page.tsx에 조합 컴포넌트 섹션 추가

# 확인
npm run dev
# http://localhost:3000/components
```

**Exit Criteria**:
- [ ] 5개 이상 조합 컴포넌트 완성
- [ ] 각 컴포넌트 props 타입 정의 완료
- [ ] 갤러리에 등록 및 인터랙션 테스트 통과

---

## 5. Phase P3: 레이아웃 (2일) ← 검토 필수

### 5.1 레이아웃 컴포넌트 생성

```bash
# 레이아웃 컴포넌트
touch components/layout/Header.tsx
touch components/layout/WorkspacePanel.tsx
touch components/layout/ChatPanel.tsx
touch components/layout/GlassBoxPanel.tsx
touch components/layout/ResponsiveLayout.tsx

# 확인
ls -la components/layout/
```

### 5.2 루트 레이아웃 수정

```bash
# app/layout.tsx 수정
# (3-Panel 레이아웃 적용)

# 확인
npm run dev
# http://localhost:3000
```

### 5.3 반응형 테스트

```bash
# 개발자 도구 (F12) → Device Toolbar
# 화면 크기 조정:
# - < 768px (모바일)
# - 768-1024px (태블릿)
# - > 1024px (데스크톱)
```

**Exit Criteria**:
- [ ] 3-Panel 레이아웃 화면 표시
- [ ] 패널 크기 조정 가능
- [ ] 반응형 브레이크포인트 동작 확인
- [ ] 패널 접기/펼치기 기능 동작

---

## 6. Phase P4: 상태 관리 (2일)

### 6.1 Store 파일 생성

```bash
# Zustand Store 파일 생성
touch stores/useSessionStore.ts
touch stores/useMessageStore.ts
touch stores/useMemoryStore.ts
touch stores/usePersonaStore.ts
touch stores/useWorkflowStore.ts
touch stores/useSettingsStore.ts

# 확인
ls -la stores/
```

### 6.2 Store 구현

```typescript
// 각 Store 파일에 create<State>() 구현
// persist middleware 적용
// localStorage 영속화 설정
```

### 6.3 완료 확인

```bash
# 타입 체크
npm run type-check

# 개발 서버 실행
npm run dev

# localStorage 확인 (개발자 도구 → Application → Local Storage)
# session-storage, message-storage, memory-storage, persona-storage, workflow-storage, settings-storage
```

**Exit Criteria**:
- [ ] 6개 Store 파일 생성
- [ ] 각 Store에 CRUD 액션 구현
- [ ] localStorage 영속화 적용
- [ ] TypeScript 타입 에러 0건

---

## 7. Phase P5: 시나리오 구조 (2일)

### 7.1 시나리오 타입 및 훅 생성

```bash
# 시나리오 관련 파일
touch types/scenario.ts
touch hooks/useScenarioRunner.ts
touch hooks/useStreamingText.ts

# 더미 시나리오 데이터
touch data/scenarios/demo-scenario.json

# 확인
ls -la hooks/ data/scenarios/
```

### 7.2 시나리오 실행 테스트

```bash
# 개발 서버 실행
npm run dev

# 더미 시나리오 실행
# (ChatPanel에서 시나리오 로드 버튼 클릭)
```

**Exit Criteria**:
- [ ] 시나리오 실행 훅 동작
- [ ] 스트리밍 응답 시뮬레이션 성공
- [ ] 사고 과정, 계획 수립, 도구 호출 단계 표시 가능
- [ ] 더미 시나리오 1개 실행 성공

---

## 8. Phase P6: 통합 (3일) ← 검토 필수

### 8.1 Store-Component 연결

```bash
# 각 패널 컴포넌트에 Store 연결
# - WorkspacePanel → useSessionStore
# - ChatPanel → useMessageStore
# - GlassBoxPanel → useMemoryStore
# - PersonaSelector → usePersonaStore
# - Settings Modal → useSettingsStore
```

### 8.2 사용자 플로우 테스트

```bash
# 개발 서버 실행
npm run dev

# 테스트 시나리오:
# 1. 세션 생성 → 메시지 전송 → 응답 수신
# 2. 메모리 저장 → GLASS_BOX 표시
# 3. 페르소나 변경 → UI 업데이트
# 4. 페이지 새로고침 → 상태 유지
```

**Exit Criteria**:
- [ ] 모든 패널이 Store와 연결되어 동작
- [ ] 세션 생성 → 메시지 전송 → 응답 수신 플로우 성공
- [ ] 메모리 저장 → GLASS_BOX 표시 플로우 성공
- [ ] 페르소나 변경 시 UI 업데이트 성공

---

## 9. Phase P7: 마무리 (2일) ← 검토 필수

### 9.1 애니메이션 적용

```bash
# Framer Motion 애니메이션 적용
# - 메시지 목록 (AnimatePresence)
# - 패널 슬라이드 (motion.div)
# - Accordion 펼침/접힘 (layout prop)
# - 페이지 전환 (App Router template.tsx)
```

### 9.2 드래그 앤 드롭 구현

```bash
# @dnd-kit 드래그 앤 드롭 적용
# - 세션 순서 변경 (SortableContext)
# - 세션 워크스페이스 간 이동 (Droppable)
# - 터치 지원 (TouchSensor)
# - 키보드 지원 (KeyboardSensor)
```

### 9.3 접근성 구현

```bash
# 접근성 개선
# - 키보드 네비게이션 (Tab, Enter, Space, Escape)
# - ARIA 레이블 (aria-label, aria-describedby)
# - Focus 관리 (focus-visible, outline)
# - 스크린 리더 지원 (announcements)
```

### 9.4 최종 점검

```bash
# 빌드 테스트
npm run build
npm run start

# Lighthouse 테스트 (개발자 도구 → Lighthouse)
# - Performance: 80 이상
# - Accessibility: 80 이상
```

**Exit Criteria**:
- [ ] 주요 인터랙션에 애니메이션 적용
- [ ] 3가지 화면 크기에서 정상 동작
- [ ] 드래그 앤 드롭 동작 확인
- [ ] 접근성 점수 80% 이상

---

## 10. 핵심 명령어 요약

### 10.1 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 타입 체크
npm run type-check
# 또는
npx tsc --noEmit

# 린트
npm run lint

# 빌드
npm run build

# 빌드 후 실행
npm run start
```

### 10.2 Git 명령어

```bash
# 변경 사항 확인
git status
git diff

# Phase 완료 후 커밋
git add .
git commit -m "Phase P[N]: [Phase 이름] 완료

[작업 내용 요약]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# 푸시 (선택적)
git push origin [branch-name]
```

### 10.3 패키지 관리

```bash
# 패키지 목록 확인
npm list --depth=0

# 특정 패키지 버전 확인
npm list zustand framer-motion @dnd-kit/core

# 패키지 업데이트
npm update

# 패키지 제거
npm uninstall [package-name]
```

---

## 11. 트러블슈팅

### 11.1 TypeScript 에러

```bash
# 타입 체크
npm run type-check

# 타입 정의 누락 시
npm install --save-dev @types/[package-name]

# 타입 캐시 클리어
rm -rf .next
npm run dev
```

### 11.2 빌드 에러

```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install

# .next 캐시 클리어
rm -rf .next
npm run build
```

### 11.3 shadcn/ui 설치 문제

```bash
# components.json 확인
cat components.json

# shadcn CLI 재실행
npx shadcn@latest init

# 개별 컴포넌트 재설치
npx shadcn@latest add [component-name]
```

### 11.4 localStorage 관련

```bash
# 개발자 도구 (F12) → Application → Local Storage
# → localStorage 항목 확인/삭제

# 또는 코드에서 초기화
localStorage.clear()
```

---

## 12. Phase별 체크리스트

### Phase P0
- [ ] zustand 설치
- [ ] framer-motion 설치
- [ ] @dnd-kit/* 설치
- [ ] 폴더 구조 생성
- [ ] 타입 정의 파일 생성
- [ ] npm run dev 정상 실행
- [ ] npm run type-check 에러 0건

### Phase P1 (검토 필수)
- [ ] shadcn/ui 컴포넌트 10개 이상 설치
- [ ] 컴포넌트 갤러리 페이지 생성
- [ ] 갤러리에 모든 컴포넌트 표시
- [ ] 검토 요청 및 승인

### Phase P2 (검토 필수)
- [ ] 조합 컴포넌트 5개 이상 생성
- [ ] props 타입 정의 완료
- [ ] 갤러리에 등록
- [ ] 검토 요청 및 승인

### Phase P3 (검토 필수)
- [ ] 레이아웃 컴포넌트 생성
- [ ] 3-Panel 레이아웃 구현
- [ ] 반응형 테스트 (3가지 화면 크기)
- [ ] 검토 요청 및 승인

### Phase P4
- [ ] 6개 Store 파일 생성
- [ ] CRUD 액션 구현
- [ ] localStorage 영속화 적용
- [ ] 타입 에러 0건

### Phase P5
- [ ] 시나리오 타입 정의
- [ ] useScenarioRunner 훅 구현
- [ ] useStreamingText 훅 구현
- [ ] 더미 시나리오 실행 성공

### Phase P6 (검토 필수)
- [ ] Store-Component 연결
- [ ] 사용자 플로우 테스트
- [ ] localStorage 영속화 확인
- [ ] 검토 요청 및 승인

### Phase P7 (검토 필수)
- [ ] 애니메이션 적용
- [ ] 드래그 앤 드롭 구현
- [ ] 접근성 구현
- [ ] Lighthouse 점수 80 이상
- [ ] 검토 요청 및 승인

---

## 13. 다음 단계

Phase P0-P7 완료 후:

1. **프로젝트 완료 보고**
   - 모든 Phase 완료 확인
   - 최종 체크리스트 검증
   - 산출물 정리

2. **배포 준비 (선택적)**
   - Vercel/Netlify 배포 설정
   - 환경 변수 설정
   - 도메인 연결

3. **문서화 (선택적)**
   - README.md 작성
   - 사용자 가이드 작성
   - API 문서 작성 (필요 시)

---

**문서 버전**: 1.0
**작성일**: 2025-12-17
**참조 문서**:
- [research.md](./research.md) - 기술 스택 조사
- [data-model.md](./data-model.md) - 데이터 모델 정의
- [contracts/phase-execution-protocol.md](./contracts/phase-execution-protocol.md) - Phase 실행 프로토콜
- [contracts/review-templates.md](./contracts/review-templates.md) - 검토 템플릿
