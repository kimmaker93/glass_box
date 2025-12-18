// 계획 타입 정의

// ============================================================================
// Data Model Types (Phase P0/P1)
// ============================================================================

export interface Plan {
  id: string
  messageId: string
  title: string
  description?: string
  steps: PlanStep[]
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface PlanStep {
  id: string
  order: number
  title: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed' | 'skipped'
  result?: string
}

// ============================================================================
// Component Props Types (Phase P2)
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

  /** 단계 추가 버튼 클릭 핸들러 (optional) */
  onAddStep?: () => void;

  /** 로딩 상태 (실행 중 표시용, optional) */
  isExecuting?: boolean;
}
