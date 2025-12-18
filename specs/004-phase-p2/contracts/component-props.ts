/**
 * Phase P2 조합 컴포넌트 TypeScript 인터페이스
 *
 * 이 파일은 구현 시 types/ 디렉토리로 분할되어 배치됩니다:
 * - types/message.ts: UserMessageProps, AIMessageProps
 * - types/thinking.ts: ThinkingStepStatus, ThinkingStep, ThinkingProcessProps
 * - types/memory.ts: MemoryCardProps, SearchResultCardProps
 * - types/plan.ts: PlanStepStatus, PlanStepProps, PlanCardProps
 *
 * @created 2025-12-17
 * @feature Phase P2 조합 컴포넌트
 */

// ============================================================================
// Message Types (types/message.ts)
// ============================================================================

/**
 * 사용자 메시지 컴포넌트 Props
 *
 * @example
 * ```tsx
 * <UserMessage
 *   content="안녕하세요"
 *   timestamp="방금 전"
 * />
 * ```
 */
export interface UserMessageProps {
  /** 메시지 내용 */
  content: string;

  /** 전송 시간 (한글 상대 시간 형식: "방금 전", "5분 전", "오늘 오후 2:30") */
  timestamp: string;

  /** 메시지 고유 ID (optional, 실제 구현 시 사용) */
  id?: string;
}

/**
 * AI 응답 메시지 컴포넌트 Props
 *
 * @example
 * ```tsx
 * <AIMessage
 *   content="답변 내용"
 *   timestamp="1분 전"
 *   personaName="시니어 개발자"
 *   personaInitials="SD"
 *   onSave={() => console.log('저장')}
 * />
 * ```
 */
export interface AIMessageProps {
  /** 메시지 내용 */
  content: string;

  /** 전송 시간 (한글 상대 시간 형식) */
  timestamp: string;

  /** 페르소나 이름 (예: "시니어 개발자", "프로덕트 매니저") */
  personaName: string;

  /** 페르소나 아바타 이니셜 (Avatar Fallback용, 예: "SD", "PM") */
  personaInitials: string;

  /** 페르소나 테마 컬러 (optional, 예: "#3b82f6") */
  personaColor?: string;

  /** 저장 여부 (optional, 실제 구현 시 사용) */
  isSaved?: boolean;

  /** 메시지 고유 ID (optional) */
  id?: string;

  /** 저장 버튼 클릭 핸들러 (optional) */
  onSave?: () => void;
}

// ============================================================================
// Thinking Types (types/thinking.ts)
// ============================================================================

/**
 * 사고 단계 상태
 *
 * - `pending`: 대기 중 (⏳ 아이콘, 회색)
 * - `in-progress`: 진행 중 (⚙️ 아이콘, 파란색)
 * - `completed`: 완료 (✅ 아이콘, 초록색)
 */
export type ThinkingStepStatus = 'pending' | 'in-progress' | 'completed';

/**
 * 단일 사고 단계 데이터
 *
 * @example
 * ```typescript
 * const step: ThinkingStep = {
 *   id: "step-1",
 *   title: "사용자 의도 분석 중...",
 *   description: "입력된 질문의 핵심 의도를 파악합니다",
 *   status: "completed",
 *   order: 1
 * }
 * ```
 */
export interface ThinkingStep {
  /** 단계 고유 ID */
  id: string;

  /** 단계 제목 (예: "사용자 의도 분석 중...") */
  title: string;

  /** 단계 설명 (optional, 예: "입력된 질문의 핵심 의도를 파악합니다") */
  description?: string;

  /** 단계 상태 */
  status: ThinkingStepStatus;

  /** 단계 순서 (1부터 시작) */
  order: number;
}

/**
 * 사고 과정 컴포넌트 Props
 *
 * @example
 * ```tsx
 * <ThinkingProcess
 *   steps={[
 *     { id: "1", title: "의도 분석 중...", status: "completed", order: 1 },
 *     { id: "2", title: "기억 검색 중...", status: "in-progress", order: 2 }
 *   ]}
 *   defaultOpen={false}
 * />
 * ```
 */
export interface ThinkingProcessProps {
  /** 사고 단계 목록 */
  steps: ThinkingStep[];

  /** 아코디언 기본 펼침 여부 (optional, 기본값: false) */
  defaultOpen?: boolean;

  /** 아코디언 헤더 텍스트 (optional, 기본값: "🤔 생각하는 중...") */
  headerText?: string;
}

// ============================================================================
// Memory Types (types/memory.ts)
// ============================================================================

/**
 * 저장된 기억 카드 컴포넌트 Props
 *
 * @example
 * ```tsx
 * <MemoryCard
 *   id="mem-1"
 *   title="Phase P1 완료 내용"
 *   summary="shadcn/ui 기본 컴포넌트 8개 설치 완료"
 *   createdAt="2025년 12월 17일"
 *   onEdit={() => console.log('수정')}
 *   onDelete={() => console.log('삭제')}
 * />
 * ```
 */
export interface MemoryCardProps {
  /** 기억 고유 ID */
  id: string;

  /** 기억 제목 */
  title: string;

  /** 기억 요약 (최대 2-3줄 권장) */
  summary: string;

  /** 생성일 (한글 형식: "2025년 12월 17일") */
  createdAt: string;

  /** 수정 버튼 클릭 핸들러 (optional) */
  onEdit?: () => void;

  /** 삭제 버튼 클릭 핸들러 (optional) */
  onDelete?: () => void;
}

/**
 * 검색 결과 카드 컴포넌트 Props
 *
 * @example
 * ```tsx
 * <SearchResultCard
 *   id="search-1"
 *   title="Next.js App Router 공식 문서"
 *   source="Next.js 공식 문서"
 *   url="https://nextjs.org/docs/app"
 *   summary="Next.js 16 App Router는..."
 *   isSelected={true}
 *   onToggle={(selected) => console.log(selected)}
 * />
 * ```
 */
export interface SearchResultCardProps {
  /** 검색 결과 고유 ID */
  id: string;

  /** 문서 제목 */
  title: string;

  /** 출처 (예: "Wikipedia", "공식 문서") */
  source: string;

  /** 문서 URL */
  url: string;

  /** 문서 요약 (최대 3-4줄 권장) */
  summary: string;

  /** 선택 여부 */
  isSelected: boolean;

  /** 체크박스 변경 핸들러 (optional) */
  onToggle?: (selected: boolean) => void;
}

// ============================================================================
// Plan Types (types/plan.ts)
// ============================================================================

/**
 * 계획 단계 상태
 *
 * - `pending`: 대기 (Badge variant: default, 회색)
 * - `in-progress`: 진행중 (Badge variant: secondary, 파란색)
 * - `completed`: 완료 (Badge variant: success, 초록색)
 * - `skipped`: 건너뜀 (Badge variant: outline, 회색 테두리)
 */
export type PlanStepStatus = 'pending' | 'in-progress' | 'completed' | 'skipped';

/**
 * 계획 단계 컴포넌트 Props
 *
 * @example
 * ```tsx
 * <PlanStep
 *   id="plan-step-1"
 *   order={1}
 *   title="타입 정의 생성"
 *   description="types/ 디렉토리에 인터페이스 정의"
 *   status="pending"
 *   isSelected={true}
 *   onEdit={() => console.log('수정')}
 * />
 * ```
 */
export interface PlanStepProps {
  /** 단계 고유 ID */
  id: string;

  /** 단계 순서 번호 (1부터 시작) */
  order: number;

  /** 단계 제목 */
  title: string;

  /** 단계 설명 (optional) */
  description?: string;

  /** 단계 상태 */
  status: PlanStepStatus;

  /** 선택 여부 (실행할 단계 선택용) */
  isSelected: boolean;

  /** 체크박스 변경 핸들러 (optional) */
  onToggle?: (selected: boolean) => void;

  /** 수정 버튼 클릭 핸들러 (optional) */
  onEdit?: () => void;

  /** 삭제 버튼 클릭 핸들러 (optional) */
  onDelete?: () => void;

  /** 드래그 가능 여부 (optional, 기본값: true) */
  draggable?: boolean;
}

/**
 * 계획 카드 컴포넌트 Props
 *
 * @example
 * ```tsx
 * <PlanCard
 *   id="plan-1"
 *   title="Phase P2 구현 계획"
 *   description="조합 컴포넌트 구현"
 *   steps={[
 *     { id: "1", order: 1, title: "타입 정의", status: "pending", isSelected: true },
 *     { id: "2", order: 2, title: "컴포넌트 구현", status: "pending", isSelected: true }
 *   ]}
 *   onExecute={() => console.log('실행')}
 * />
 * ```
 */
export interface PlanCardProps {
  /** 계획 고유 ID */
  id: string;

  /** 계획 제목 */
  title: string;

  /** 계획 설명 (optional) */
  description?: string;

  /** 계획 단계 목록 */
  steps: PlanStepProps[];

  /** 실행 버튼 활성화 여부 (optional, 기본값: true) */
  executeEnabled?: boolean;

  /** 실행 버튼 클릭 핸들러 (optional) */
  onExecute?: () => void;

  /** 로딩 상태 (실행 중 표시용, optional) */
  isExecuting?: boolean;
}
