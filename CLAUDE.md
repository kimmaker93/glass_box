# CLAUDE.md - GLASSY 프로젝트 헌법

> 이 문서는 AI 코딩 어시스턴트가 반드시 준수해야 하는 핵심 원칙입니다.
> 모든 작업 전 이 문서를 참조하고, 원칙을 위반하는 작업은 수행하지 마세요.

---

## 🎯 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **제품명** | GLASSY |
| **프로젝트 경로** | `/Users/gimsuhyeon/Documents/glass_box` |
| **기술 스택** | Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui (new-york), Zustand |
| **개발 방식** | 바이브 코딩 (Vibe Coding) |

---

## ⛔ 절대 원칙 (CRITICAL RULES)

```
┌─────────────────────────────────────────────────────────────────┐
│  🚫 이 원칙들은 어떤 상황에서도 위반할 수 없습니다                    │
└─────────────────────────────────────────────────────────────────┘
```

### 1. Phase 경계 준수
- **현재 Phase에서 지정된 작업만** 수행한다
- Phase 완료 후 **반드시 사용자에게 보고**하고 승인을 받는다
- **Phase 순서를 건너뛰지 않는다**
- 다음 Phase로 자의적으로 진행하지 않는다

### 2. 디자인 검토 필수
- 디자인 컴포넌트 작업 완료 후 **반드시 검토 과정**을 거친다
- 검토 승인 전까지 다음 작업으로 진행하지 않는다
- 검토 요청 시 **컴포넌트 중앙 관리 페이지**에서 확인 가능하도록 한다

### 3. 임의 결정 금지
- 불명확한 사항은 **임의로 결정하지 않고 질문**한다
- 명세에 없는 기능을 추가하지 않는다
- 기존 코드를 삭제/수정할 때는 반드시 사유를 설명한다

### 4. 언어 규칙
- **GLASSY** (제품명), **GLASS_BOX** (우측 패널명)을 제외한 모든 텍스트는 **한글** 사용
- 코드 내 주석, 변수명, 함수명은 영어 사용 가능
- UI에 표시되는 텍스트, 문서, 설명은 한글 사용

---

## 🔧 기술 원칙

### shadcn/ui 사용 원칙

```
┌─────────────────────────────────────────────────────────────────┐
│  모든 UI 컴포넌트는 shadcn/ui를 기반으로 구현한다                   │
└─────────────────────────────────────────────────────────────────┘
```

**현재 설정 상태:**
- shadcn/ui 초기화 완료
- 스타일: `new-york`
- 베이스 컬러: `sky`
- 아이콘: `lucide-react`

**컴포넌트 설치 방법:**
```bash
# shadcn MCP 사용
npx shadcn@latest add [컴포넌트명]

# 예시
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

**원칙:**
1. 기본 컴포넌트는 shadcn MCP로 설치
2. 커스터마이징 시 `components/ui/` 파일 직접 수정
3. 프로젝트 전용 컴포넌트는 별도 폴더에 생성
4. 직접 스타일링 최소화 - shadcn 컴포넌트 우선 사용

### 추가 설치 필요 패키지

```bash
# 상태 관리
npm install zustand

# 애니메이션
npm install framer-motion

# 드래그 앤 드롭
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### 컴포넌트 중앙 관리

1. **컴포넌트 갤러리 페이지**: `/app/components/page.tsx`
2. 모든 디자인 컴포넌트는 이 페이지에 등록되어야 함
3. 새 컴포넌트 추가 시 **반드시 갤러리 페이지에 추가**
4. 검토자는 이 페이지에서 모든 컴포넌트 확인 가능

```
컴포넌트 추가 작업 순서:
1. shadcn MCP로 기본 컴포넌트 설치
2. 필요 시 커스텀 컴포넌트 생성
3. 컴포넌트 갤러리 페이지에 등록
4. 검토 요청
5. 검토 승인 후 다음 작업 진행
```

---

## 📁 디렉토리 구조

```
glass_box/
├── app/
│   ├── layout.tsx                  # 루트 레이아웃
│   ├── page.tsx                    # 메인 페이지
│   ├── globals.css                 # 글로벌 스타일
│   ├── components/
│   │   └── page.tsx                # 🎨 컴포넌트 갤러리 (중앙 관리)
│   └── login/
│       └── page.tsx                # 로그인 페이지
│
├── components/
│   ├── ui/                         # shadcn/ui 컴포넌트 (자동 생성)
│   ├── common/                     # 공통 커스텀 컴포넌트
│   ├── chat/                       # 채팅 관련 컴포넌트
│   ├── workspace/                  # 워크스페이스 관련 컴포넌트
│   ├── glass-box/                  # GLASS_BOX 패널 컴포넌트
│   └── layout/                     # 레이아웃 컴포넌트
│
├── lib/
│   └── utils.ts                    # 유틸리티 함수 (shadcn용 cn 함수 포함)
│
├── stores/                         # Zustand 상태 관리
├── hooks/                          # 커스텀 훅
├── types/                          # TypeScript 타입 정의
├── data/                           # 더미 데이터, 시나리오
│
├── public/                         # 정적 파일
├── components.json                 # shadcn/ui 설정
└── 기타 설정 파일들
```

### 경로 별칭 (Path Aliases)

```typescript
// tsconfig.json에 설정됨
"@/components"  → components/
"@/components/ui" → components/ui/
"@/lib"         → lib/
"@/hooks"       → hooks/
```

### 파일 생성 규칙

1. **컴포넌트 파일**: `컴포넌트명.tsx` (PascalCase)
2. **타입 파일**: `types/` 폴더에 통합 관리
3. **Store 파일**: `stores/use[Store명].ts` (camelCase)
4. **훅 파일**: `hooks/use[훅명].ts` (camelCase)

---

## 🔄 개발 Phase 구조

### Phase 개요

| Phase | 이름 | 핵심 내용 | 검토 필수 |
|-------|------|----------|----------|
| **P0** | 프로젝트 설정 | 패키지 설치, 폴더 구조, 타입 정의 | ❌ |
| **P1** | 기본 컴포넌트 | shadcn 컴포넌트 설치 및 확장 | ✅ |
| **P2** | 조합 컴포넌트 | 채팅, 메모리 관련 컴포넌트 | ✅ |
| **P3** | 레이아웃 | 3-Panel 레이아웃 구성 | ✅ |
| **P4** | 상태 관리 | Zustand Store 구현 | ❌ |
| **P5** | 시나리오 구조 | 시나리오 실행 프레임워크 | ❌ |
| **P6** | 통합 | 컴포넌트-Store 연결 | ✅ |
| **P7** | 마무리 | 애니메이션, 반응형 | ✅ |

### Phase 진행 프로토콜

```
┌─────────────────────────────────────────────────────────────────┐
│  모든 Phase는 아래 프로토콜을 따른다                                │
└─────────────────────────────────────────────────────────────────┘

1. [시작] Phase 시작을 사용자에게 알림
2. [작업] Task별 순차 진행
3. [등록] 컴포넌트는 갤러리 페이지에 등록
4. [보고] Phase 완료 보고
5. [검토] 검토 필수 Phase는 검토 요청
6. [승인] 사용자 승인 대기
7. [진행] 승인 후 다음 Phase 진행
```

---

## 🎬 시나리오 시스템

### 시나리오 구조 원칙

```
┌─────────────────────────────────────────────────────────────────┐
│  시나리오는 구조만 설계하고, 실제 내용은 사용자가 입력한다            │
└─────────────────────────────────────────────────────────────────┘
```

1. **시나리오 실행 프레임워크**만 구현
2. 시나리오 데이터는 **사용자 입력**으로 주입
3. UI 완성 후 시나리오 작업 진행

### 시나리오 타입 정의

```typescript
// types/scenario.ts
interface Scenario {
  id: string;
  name: string;
  description: string;
  steps: ScenarioStep[];
}

interface ScenarioStep {
  id: string;
  order: number;
  type: ScenarioStepType;
  delay: number;  // ms
  data: Record<string, unknown>;
}

type ScenarioStepType = 
  | 'user_input'      // 사용자 입력
  | 'ai_thinking'     // AI 사고 과정
  | 'ai_planning'     // 계획 수립
  | 'ai_searching'    // 검색 수행
  | 'ai_response'     // AI 응답
  | 'tool_call'       // 도구 호출
  | 'memory_update';  // 메모리 업데이트
```

### 시나리오 작업 순서

```
1. 시나리오 실행 구조(useScenarioRunner) 구현
2. 시나리오 타입 정의
3. 시나리오 로더 구현
4. UI 완성 후 사용자가 시나리오 데이터 입력
5. 시나리오별 테스트
```

---

## ✅ 작업 체크리스트 템플릿

### Task 시작 전
```markdown
[ ] 현재 Phase가 올바른가?
[ ] 이전 Phase가 승인되었는가?
[ ] 작업할 파일 목록을 확인했는가?
[ ] 경계 규칙을 확인했는가?
```

### Task 완료 후
```markdown
[ ] 완료 조건을 충족했는가?
[ ] TypeScript 에러가 없는가?
[ ] 컴포넌트를 갤러리에 등록했는가?
[ ] 기존 기능이 깨지지 않았는가?
```

### Phase 완료 후
```markdown
[ ] 모든 Task가 완료되었는가?
[ ] 사용자에게 완료 보고를 했는가?
[ ] (검토 필수 Phase) 검토 요청을 했는가?
[ ] 사용자 승인을 받았는가?
```

---

## 🚨 금지 행위

1. ❌ Phase 순서 건너뛰기
2. ❌ 검토 과정 건너뛰기
3. ❌ 컴포넌트 갤러리 등록 누락
4. ❌ 명세에 없는 기능 임의 추가
5. ❌ 기존 코드 무단 삭제/대규모 수정
6. ❌ 사용자 승인 없이 다음 단계 진행
7. ❌ GLASSY, GLASS_BOX 외 영어 UI 텍스트 사용
8. ❌ shadcn/ui 외 UI 라이브러리 임의 도입
9. ❌ 시나리오 데이터 임의 작성 (구조만 설계)

---

## 📝 보고 템플릿

### Phase 완료 보고
```markdown
## ✅ Phase [N] 완료 보고

### 완료된 작업
- Task ID: 작업 내용

### 생성/수정된 파일
- 파일 경로

### 컴포넌트 갤러리 등록
- [컴포넌트명] - 설명

### 다음 단계
- Phase [N+1] 진행 예정

### 검토 필요 여부
- [예/아니오]
```

### 검토 요청
```markdown
## 🔍 검토 요청

### 검토 대상
- Phase: [N]
- 컴포넌트: [목록]

### 확인 방법
1. 개발 서버 실행: `npm run dev`
2. 컴포넌트 갤러리 접속: `http://localhost:3000/components`
3. 각 컴포넌트 동작 확인

### 검토 포인트
- [ ] 디자인 일관성
- [ ] 인터랙션 동작
- [ ] 반응형 대응

### 피드백 요청 사항
- (구체적인 질문)
```

---

## 🔗 참조 문서

| 문서 | 경로 | 설명 |
|------|------|------|
| 기능 정의 | 'PRD_v1.0.md' | 기능 상세 |
| 타입 정의 | `types/` | TypeScript 타입 |

---

**문서 버전**: v1.1  
**최종 수정일**: 2025.12.16  
**작성자**: CTO

## Active Technologies
- TypeScript 5.x, React 19.2.1, Next.js 16.0.10 (App Router) (001-project-execution-plan)
- localStorage (클라이언트 전용, 백엔드 없음) (001-project-execution-plan)
- TypeScript 5.x (tsconfig.json 기준) (004-phase-p2)
- N/A (클라이언트 전용, 더미 데이터 사용) (004-phase-p2)

## Recent Changes
- 001-project-execution-plan: Added TypeScript 5.x, React 19.2.1, Next.js 16.0.10 (App Router)
