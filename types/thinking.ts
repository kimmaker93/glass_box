/**
 * Thinking Types
 *
 * AI 사고 과정 시각화 컴포넌트의 타입 정의
 */

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
