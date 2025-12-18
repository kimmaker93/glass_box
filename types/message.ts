// 메시지 타입 정의
import type { Plan } from './plan'
import type { PersonaIcon } from './persona'

// ============================================================================
// Data Model Types (Phase P0/P1)
// ============================================================================

export interface Message {
  id: string
  sessionId: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  thinkingProcess?: ThinkingStep[]
  plan?: Plan
  toolCalls?: ToolCall[]
  confidence?: number
}

export interface ThinkingStep {
  id: string
  type: 'thinking' | 'searching' | 'planning' | 'analyzing'
  content: string
  duration?: number
}

export interface ToolCall {
  id: string
  name: string
  arguments: Record<string, unknown>
  result?: unknown
}

// ============================================================================
// Component Props Types (Phase P2)
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

  /** 페르소나 아이콘 (optional) */
  personaIcon?: PersonaIcon;

  /** 저장 여부 (optional, 실제 구현 시 사용) */
  isSaved?: boolean;

  /** 메시지 고유 ID (optional) */
  id?: string;

  /** 저장 버튼 클릭 핸들러 (optional) */
  onSave?: () => void;
}
