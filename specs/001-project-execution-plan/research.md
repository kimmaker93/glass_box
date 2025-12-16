# Research: GLASSY 프로젝트 기술 스택

**Feature**: GLASSY 프로젝트 실행 계획
**Date**: 2025-12-17
**Purpose**: Technical Context의 NEEDS CLARIFICATION 항목 해결 및 핵심 기술 스택 결정

---

## 1. Zustand 상태 관리

### 결정 (Decision)
- **설치 명령**: `npm install zustand`
- **Store 구조**: 개별 Store 패턴 (6개 독립 Store)
- **Middleware**: persist (localStorage), devtools (개발 중)
- **TypeScript**: First-class 지원

### 근거 (Rationale)

**왜 Zustand를 선택했는가:**
- 경량 (약 1KB), 최소한의 보일러플레이트
- React 19 완벽 호환 (hooks 기반)
- Next.js 16 App Router 지원 (클라이언트 컴포넌트)
- localStorage 영속화 내장 middleware
- TypeScript 네이티브 지원

**왜 개별 Store 패턴인가:**
- 6개 Store (session, message, memory, persona, workflow, settings)가 명확히 분리됨
- 각 Store의 책임과 생명주기가 다름 (session은 자주 변경, settings는 드물게 변경)
- Slice 패턴은 Store가 서로 의존적이거나 공유 로직이 많을 때 유리하나, 본 프로젝트는 독립적
- 코드 가독성과 유지보수성 향상

### 구현 패턴

**기본 Store 구조:**
```typescript
// stores/useSessionStore.ts
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface SessionState {
  sessions: Session[]
  workspaces: Workspace[]
  activeSessionId: string | null

  // Actions
  createSession: (workspaceId: string, name: string) => void
  deleteSession: (sessionId: string) => void
  setActiveSession: (sessionId: string) => void
}

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        sessions: [],
        workspaces: [],
        activeSessionId: null,

        createSession: (workspaceId, name) => set((state) => ({
          sessions: [...state.sessions, {
            id: generateId(),
            workspaceId,
            name,
            createdAt: new Date().toISOString()
          }]
        })),

        deleteSession: (sessionId) => set((state) => ({
          sessions: state.sessions.filter(s => s.id !== sessionId)
        })),

        setActiveSession: (sessionId) => set({ activeSessionId: sessionId })
      }),
      {
        name: 'session-storage',
        partialize: (state) => ({
          sessions: state.sessions,
          workspaces: state.workspaces
        })
      }
    ),
    { name: 'SessionStore' }
  )
)
```

**localStorage Key 네이밍:**
- `session-storage` (useSessionStore)
- `message-storage` (useMessageStore)
- `memory-storage` (useMemoryStore)
- `persona-storage` (usePersonaStore)
- `workflow-storage` (useWorkflowStore)
- `settings-storage` (useSettingsStore)

### 고려한 대안 (Alternatives Considered)

| 대안 | 장점 | 단점 | 왜 선택하지 않았는가 |
|------|------|------|---------------------|
| Redux Toolkit | 강력한 DevTools, 많은 생태계 | 보일러플레이트 많음, 학습 곡선 | 프로젝트 규모 대비 과도함 |
| Jotai | 원자적 상태 관리, 유연함 | 분산된 상태 관리, 파악 어려움 | Store 구조가 명확한 경우 불필요 |
| Context API + useReducer | 추가 라이브러리 불필요 | 성능 문제, 영속화 수동 구현 | 복잡도 증가, 개발 속도 저하 |

**Zustand가 최적인 이유:**
- 프로젝트 규모(중소형)에 적합
- CLAUDE.md 원칙(단순함 우선)과 일치
- Phase P4에서 빠른 구현 가능
- localStorage 영속화 간단

---

## 2. Framer Motion 애니메이션

### 결정 (Decision)
- **설치 명령**: `npm install framer-motion`
- **App Router 설정**: `'use client'` directive 필수
- **성능 목표**: 60fps, transform/opacity 우선 사용
- **접근성**: `useReducedMotion` 구현

### 근거 (Rationale)

**왜 Framer Motion인가:**
- React 19 완벽 호환
- Next.js App Router 공식 지원
- 선언적 API, 직관적인 사용성
- Layout animations 내장 (3-Panel 레이아웃에 최적)
- 60fps 성능 보장 (GPU 가속 활용)

**핵심 패턴:**

**1. AnimatePresence (페이지 전환, 리스트 항목):**
```typescript
'use client'

import { AnimatePresence, motion } from 'framer-motion'

export function MessageList({ messages }: Props) {
  return (
    <AnimatePresence mode="popLayout">
      {messages.map(msg => (
        <motion.div
          key={msg.id}
          layout="position"  // 성능 최적화
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          {msg.content}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
```

**2. LayoutGroup (3-Panel 레이아웃):**
```typescript
'use client'

import { LayoutGroup, motion } from 'framer-motion'

export function ThreePanelLayout() {
  return (
    <LayoutGroup>
      <motion.aside layout className="workspace-panel">
        워크스페이스
      </motion.aside>
      <motion.main layout className="chat-panel">
        채팅
      </motion.main>
      <motion.aside layout className="glass-box-panel">
        GLASS_BOX
      </motion.aside>
    </LayoutGroup>
  )
}
```

**3. Spring Physics (자연스러운 애니메이션):**
```typescript
const spring = {
  type: "spring",
  damping: 25,
  stiffness: 300
}

<motion.div
  animate={{ x: isOpen ? 0 : -320 }}
  transition={spring}
>
  Panel Content
</motion.div>
```

**4. Stagger Animation (리스트 순차 표시):**
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.li key={item.id} variants={item}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

### GLASSY 프로젝트 적용 (Phase P7)

| 컴포넌트 | 애니메이션 패턴 | 성능 고려사항 |
|----------|---------------|--------------|
| 3-Panel Layout | LayoutGroup + layout prop | transform 사용 |
| Message List | AnimatePresence + stagger | layout="position" |
| GLASS_BOX Panel | Slide-in + spring | opacity + transform |
| Session List | Layout animations + DnD | useReducedMotion |
| Thinking Accordion | Expand/collapse | height 대신 scale 사용 |
| Typing Indicator | Keyframe loop | will-change: transform |

### 고려한 대안 (Alternatives Considered)

| 대안 | 장점 | 단점 | 왜 선택하지 않았는가 |
|------|------|------|---------------------|
| CSS Animations | 추가 라이브러리 불필요 | 상태 기반 애니메이션 복잡 | React 상태와 통합 어려움 |
| React Spring | 물리 기반 애니메이션 강력 | API 복잡, 학습 곡선 | Layout animations 부재 |
| GSAP | 최고 성능, 풍부한 기능 | 유료 플러그인, React 통합 수동 | 프로젝트 규모 대비 과도 |

---

## 3. @dnd-kit 드래그 앤 드롭

### 결정 (Decision)
- **설치 명령**:
  ```bash
  npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
  ```
- **센서**: PointerSensor, TouchSensor, KeyboardSensor
- **패턴**: Single DndContext + Multiple SortableContext
- **접근성**: 완전한 키보드 네비게이션 + 스크린 리더 지원

### 근거 (Rationale)

**왜 @dnd-kit인가:**
- React 19, Next.js 16 완벽 호환
- 터치 디바이스 네이티브 지원
- 접근성 built-in (WCAG 2.1 AA 준수)
- shadcn/ui와 통합 용이
- 성능 최적화 (CSS Transform 사용)

**핵심 구현 패턴:**

**1. 기본 Sortable 리스트 (세션 정렬):**
```typescript
'use client'

import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <button {...attributes} {...listeners} className="drag-handle">
        ⋮⋮
      </button>
      {children}
    </div>
  )
}

export function SessionList({ sessions, onReorder }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px 이동 후 드래그 시작 (클릭과 구분)
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 250ms 롱프레스 후 드래그
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sessions}
        strategy={verticalListSortingStrategy}
      >
        {sessions.map(session => (
          <SortableItem key={session.id} id={session.id}>
            <SessionCard session={session} />
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  )
}
```

**2. 중첩 드래그 (워크스페이스 간 세션 이동):**
```typescript
<DndContext onDragEnd={handleWorkspaceDrag}>
  {workspaces.map(workspace => (
    <Droppable key={workspace.id} id={workspace.id}>
      <SortableContext items={getSessionsByWorkspace(workspace.id)}>
        {sessions.map(session => (
          <SortableItem key={session.id} id={session.id}>
            <SessionCard session={session} />
          </SortableItem>
        ))}
      </SortableContext>
    </Droppable>
  ))}
</DndContext>
```

**3. 접근성 구현:**
```typescript
const announcements = {
  onDragStart({ active }) {
    return `${active.data.current.name} 세션을 선택했습니다`
  },
  onDragOver({ active, over }) {
    if (over) {
      return `${active.data.current.name} 세션을 ${over.data.current.name} 위로 이동 중입니다`
    }
    return `드롭 가능한 영역에서 벗어났습니다`
  },
  onDragEnd({ active, over }) {
    if (over) {
      return `${active.data.current.name} 세션을 ${over.data.current.name} 위치로 이동했습니다`
    }
    return `${active.data.current.name} 세션을 원래 위치로 되돌렸습니다`
  },
}

<DndContext accessibility={{ announcements }}>
  {/* ... */}
</DndContext>
```

### GLASSY 프로젝트 적용 (Phase P7)

| 기능 | 구현 패턴 | 우선순위 |
|------|----------|---------|
| 세션 순서 변경 | Sortable (단일 워크스페이스 내) | P7 (중간) |
| 세션 이동 | Droppable (워크스페이스 간) | P7 (중간) |
| 계획 스텝 순서 변경 | Sortable (GLASS_BOX 내) | P7 (낮음) |
| 드래그 핸들 | Drag handle button | P7 (높음, UX) |
| 터치 지원 | TouchSensor + activationConstraint | P7 (높음) |
| 키보드 지원 | KeyboardSensor + announcements | P7 (높음, 접근성) |

### 고려한 대안 (Alternatives Considered)

| 대안 | 장점 | 단점 | 왜 선택하지 않았는가 |
|------|------|------|---------------------|
| react-beautiful-dnd | 성숙한 라이브러리 | React 18 이하, 유지보수 중단 | React 19 미지원 |
| react-dnd | 매우 유연함 | 복잡한 API, 터치 지원 약함 | 학습 곡선 높음, 접근성 수동 구현 |
| HTML5 Drag & Drop API | 표준 API | 터치 미지원, 접근성 없음 | 모바일 지원 필수 |

---

## 4. 스트리밍 응답 시뮬레이션

### 결정 (Decision)
- **방법**: setTimeout 기반 토큰(단어) 단위 스트리밍
- **속도**: 30-50ms per token (자연스러운 읽기 속도)
- **마크다운**: 완전한 청크 단위로 파싱 (실시간 파싱 지양)
- **제어**: pause, resume, skipToEnd 기능 제공

### 근거 (Rationale)

**왜 setTimeout인가:**
- requestAnimationFrame은 렌더링 프레임(16.67ms)에 맞춰 실행되어 제어 어려움
- setTimeout은 원하는 속도(30-50ms)로 정확히 제어 가능
- ChatGPT, Claude 등 실제 서비스도 setTimeout 패턴 사용
- 60fps 애니메이션과 독립적으로 실행 가능

**왜 토큰(단어) 단위인가:**
| 방식 | 장점 | 단점 | 선택 이유 |
|------|------|------|----------|
| Character-by-character | 가장 자연스러움 | 매우 느림, 마크다운 파싱 복잡 | 사용자 경험 저하 |
| **Token (단어)** | **속도와 자연스러움 균형** | **토큰 분리 로직 필요** | **최적 선택** |
| Chunk (문장) | 빠름 | 부자연스러움 | 스트리밍 느낌 약함 |

### 구현 패턴

**1. useStreamingText 커스텀 훅:**
```typescript
// hooks/useStreamingText.ts
import { useState, useEffect, useRef } from 'react'

interface StreamingOptions {
  speed?: number;           // ms per token (default: 30)
  chunkSize?: number;       // tokens per update (default: 1)
  onComplete?: () => void;
  autoStart?: boolean;
}

export const useStreamingText = (
  fullText: string,
  options: StreamingOptions = {}
) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isActive, setIsActive] = useState(options.autoStart ?? true)
  const currentIndexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // 토큰 분리 (단어 + 구두점)
  const tokens = useRef(
    fullText.match(/\S+|\s+/g) || []
  )

  useEffect(() => {
    if (!isActive) return

    const stream = () => {
      const nextIndex = Math.min(
        currentIndexRef.current + (options.chunkSize ?? 1),
        tokens.current.length
      )

      setDisplayedText(tokens.current.slice(0, nextIndex).join(''))
      currentIndexRef.current = nextIndex

      if (nextIndex < tokens.current.length) {
        timeoutRef.current = setTimeout(stream, options.speed ?? 30)
      } else {
        setIsActive(false)
        options.onComplete?.()
      }
    }

    stream()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isActive, fullText, options])

  const pause = () => setIsActive(false)
  const resume = () => setIsActive(true)
  const skipToEnd = () => {
    setDisplayedText(fullText)
    setIsActive(false)
    currentIndexRef.current = tokens.current.length
  }

  return {
    displayedText,
    isActive,
    progress: tokens.current.length > 0
      ? currentIndexRef.current / tokens.current.length
      : 0,
    pause,
    resume,
    skipToEnd
  }
}
```

**2. 사용 예시 (MessageBubble 컴포넌트):**
```typescript
'use client'

import { useStreamingText } from '@/hooks/useStreamingText'
import ReactMarkdown from 'react-markdown'

export function MessageBubble({ content, isStreaming }: Props) {
  const {
    displayedText,
    isActive,
    skipToEnd
  } = useStreamingText(content, {
    speed: 30,
    autoStart: isStreaming
  })

  return (
    <div className="message-bubble">
      <ReactMarkdown>
        {isStreaming ? displayedText : content}
      </ReactMarkdown>
      {isActive && (
        <button onClick={skipToEnd}>
          건너뛰기
        </button>
      )}
    </div>
  )
}
```

**3. 시나리오 실행기 통합:**
```typescript
// hooks/useScenarioRunner.ts
import { useStreamingText } from './useStreamingText'

export function useScenarioRunner(scenario: Scenario) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = scenario.steps[currentStep]

  const {
    displayedText,
    isActive
  } = useStreamingText(step.data.content, {
    speed: 30,
    onComplete: () => {
      // 다음 스텝으로 이동
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, step.delay)
    }
  })

  return {
    currentStep: step,
    displayedText,
    isStreaming: isActive
  }
}
```

### 성능 최적화

**1. 컴포넌트 분리 (리렌더링 최소화):**
```typescript
// ❌ 나쁜 예: 전체 메시지 리스트 리렌더링
function MessageList({ messages }) {
  return messages.map(msg => (
    <MessageBubble key={msg.id} {...msg} />
  ))
}

// ✅ 좋은 예: 스트리밍 중인 메시지만 분리
function MessageList({ messages }) {
  const streamingMessage = messages.find(m => m.isStreaming)
  const staticMessages = messages.filter(m => !m.isStreaming)

  return (
    <>
      {staticMessages.map(msg => (
        <StaticMessageBubble key={msg.id} {...msg} />
      ))}
      {streamingMessage && (
        <StreamingMessageBubble {...streamingMessage} />
      )}
    </>
  )
}
```

**2. 마크다운 파싱 최적화:**
```typescript
// ❌ 나쁜 예: 매 토큰마다 파싱
<ReactMarkdown>{displayedText}</ReactMarkdown>

// ✅ 좋은 예: 완전한 문장/블록 단위로 파싱
const [parsedChunks, setParsedChunks] = useState([])

useEffect(() => {
  // 완전한 단락을 감지하면 파싱
  const paragraphs = displayedText.split('\n\n')
  if (paragraphs.length > parsedChunks.length) {
    setParsedChunks(paragraphs.slice(0, -1)) // 마지막 제외 (불완전)
  }
}, [displayedText])

return (
  <>
    {parsedChunks.map((chunk, i) => (
      <ReactMarkdown key={i}>{chunk}</ReactMarkdown>
    ))}
    <span>{currentUnparsedText}</span> {/* Raw text */}
  </>
)
```

### GLASSY 프로젝트 적용 (Phase P5)

| 컴포넌트 | 스트리밍 적용 | 성능 목표 |
|----------|-------------|----------|
| AI 응답 메시지 | useStreamingText (30ms/token) | 60fps 유지 |
| 사고 과정 (Thinking) | useStreamingText (20ms/token, 빠르게) | 즉시 표시 |
| 계획 수립 (Plan) | useStreamingText (50ms/token, 천천히) | 읽기 편한 속도 |
| 도구 호출 결과 | 즉시 표시 (스트리밍 없음) | N/A |
| 시나리오 실행 | useScenarioRunner 통합 | 단계별 딜레이 |

### 고려한 대안 (Alternatives Considered)

| 대안 | 장점 | 단점 | 왜 선택하지 않았는가 |
|------|------|------|---------------------|
| requestAnimationFrame | 부드러운 애니메이션 | 속도 제어 어려움 (16.67ms 고정) | 읽기 속도 부자연스러움 |
| Web Workers | 메인 스레드 차단 방지 | 복잡도 증가, 오버킬 | setTimeout으로 충분 |
| Server-Sent Events | 실제 스트리밍 패턴 | 백엔드 필요, 프로젝트 범위 초과 | 클라이언트 전용 프로젝트 |
| WebSocket | 양방향 통신 | 백엔드 필요, 과도한 복잡도 | 클라이언트 전용 프로젝트 |

---

## 5. 테스팅 전략

### 결정 (Decision)
- **테스트 프레임워크**: 단위 테스트 선택적 (Out of Scope)
- **수동 테스트**: 컴포넌트 갤러리 기반 검증
- **검증 방법**: Phase별 검토 프로세스

### 근거 (Rationale)

spec.md의 "Out of Scope" 섹션에서 명시:
> 단위 테스트 작성 (선택적)

**프로젝트 특성:**
- 프로토타입/데모 성격
- 백엔드 없는 클라이언트 전용
- 더미 데이터 기반 시나리오

**검증 전략:**
1. **컴포넌트 갤러리** (`/app/components/page.tsx`)
   - 모든 컴포넌트 시각적 검증
   - props 변형 테스트
   - 인터랙션 동작 확인

2. **Phase별 검토 프로세스**
   - P1, P2, P3, P6, P7: 검토 필수
   - 사용자 승인 후 다음 Phase 진행

3. **브라우저 테스트**
   - Chrome, Safari, Firefox
   - 모바일: iOS Safari, Android Chrome
   - 반응형 테스트: < 768px, 768-1024px, > 1024px

### 추후 고려 (Future Consideration)

프로젝트가 프로덕션으로 발전 시:
```bash
# 추천 테스트 스택
npm install -D vitest @testing-library/react @testing-library/user-event
npm install -D @testing-library/jest-dom happy-dom
npm install -D @playwright/test  # E2E
```

---

## 6. 추가 패키지 설치 계획

### Phase P0에서 설치할 패키지

```bash
# 상태 관리
npm install zustand

# 애니메이션
npm install framer-motion

# 드래그 앤 드롭
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

### 이미 설치된 패키지 (확인 완료)

✅ shadcn/ui components (Radix UI 기반)
✅ Tailwind CSS 4
✅ lucide-react (아이콘)
✅ react-hook-form + zod (폼 검증)
✅ recharts (차트, GLASS_BOX 메트릭스용)
✅ next-themes (다크 모드, Phase P7)

---

## 7. 최종 기술 스택 요약

| 카테고리 | 기술 | 버전 | 용도 |
|---------|------|------|------|
| **Core** | Next.js | 16.0.10 | App Router, SSR |
| | React | 19.2.1 | UI 라이브러리 |
| | TypeScript | 5.x | 타입 안정성 |
| **UI** | shadcn/ui | latest | 컴포넌트 라이브러리 |
| | Tailwind CSS | 4 | 스타일링 |
| | Radix UI | latest | Headless UI (shadcn 내부) |
| | lucide-react | 0.561.0 | 아이콘 |
| **State** | Zustand | latest | 상태 관리 (6개 store) |
| **Animation** | Framer Motion | latest | 60fps 애니메이션 |
| **DnD** | @dnd-kit | latest | 드래그 앤 드롭 |
| **Forms** | react-hook-form | 7.68.0 | 폼 관리 |
| | zod | 4.2.1 | 스키마 검증 |
| **Charts** | recharts | 2.15.4 | 메트릭스 차트 |
| **Theming** | next-themes | 0.4.6 | 다크 모드 |

---

## 8. Phase별 기술 적용 계획

| Phase | 적용 기술 | 작업 내용 |
|-------|----------|----------|
| **P0** | TypeScript, 폴더 구조 | 패키지 설치, 타입 정의 |
| **P1** | shadcn/ui | 기본 컴포넌트 설치 |
| **P2** | shadcn/ui, TypeScript | 조합 컴포넌트 구현 |
| **P3** | Tailwind CSS, 반응형 | 3-Panel 레이아웃 |
| **P4** | Zustand | 6개 Store + localStorage |
| **P5** | useStreamingText | 시나리오 프레임워크 |
| **P6** | 통합 | Store ↔ Component 연결 |
| **P7** | Framer Motion, @dnd-kit | 애니메이션, DnD, 접근성 |

---

## 9. 리스크 및 완화 전략

| 리스크 | 영향도 | 확률 | 완화 전략 |
|--------|--------|------|----------|
| React 19 호환성 문제 | 높음 | 낮음 | 모든 라이브러리 React 19 공식 지원 확인 완료 |
| App Router 마이그레이션 | 중간 | 낮음 | Next.js 16 App Router 네이티브 프로젝트 |
| 성능 문제 (60fps) | 중간 | 중간 | transform/opacity 우선, layout 최소화, useReducedMotion |
| localStorage 용량 제한 | 낮음 | 중간 | partialize로 필수 데이터만 저장, 5MB 제한 모니터링 |
| 터치 디바이스 DnD 버그 | 중간 | 중간 | @dnd-kit TouchSensor + activationConstraint 사용 |
| 마크다운 파싱 성능 | 낮음 | 낮음 | 청크 단위 파싱, 불완전 텍스트는 raw 표시 |

---

## 10. 참고 자료

**공식 문서:**
- Zustand: https://docs.pmnd.rs/zustand
- Framer Motion: https://www.framer.com/motion/
- @dnd-kit: https://docs.dndkit.com
- shadcn/ui: https://ui.shadcn.com
- Next.js App Router: https://nextjs.org/docs/app

**검증 완료 사항:**
- ✅ 모든 선택 기술이 React 19, Next.js 16 호환
- ✅ TypeScript First-class 지원
- ✅ Phase 구조에 맞는 점진적 도입 가능
- ✅ CLAUDE.md 원칙 준수 (단순함, 검증된 기술)
- ✅ 백엔드 없는 클라이언트 전용 프로젝트에 최적

---

**문서 버전**: v1.0
**작성일**: 2025-12-17
**다음 단계**: Phase 1 - data-model.md 작성
