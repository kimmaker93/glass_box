// 시나리오 타입 정의

/**
 * 시나리오 단계 타입
 *
 * - user_input: 사용자 입력 시뮬레이션
 * - ai_thinking: AI 사고 과정 표시
 * - ai_planning: 계획 수립 단계
 * - ai_searching: 검색 수행 단계
 * - ai_response: AI 응답 표시
 * - tool_call: 도구 호출 실행
 * - memory_update: 메모리 업데이트
 */
export type ScenarioStepType =
  | 'user_input'
  | 'ai_thinking'
  | 'ai_planning'
  | 'ai_searching'
  | 'ai_response'
  | 'tool_call'
  | 'memory_update'

/**
 * 시나리오 단계
 */
export interface ScenarioStep {
  /** 단계 고유 ID */
  id: string

  /** 실행 순서 */
  order: number

  /** 단계 타입 */
  type: ScenarioStepType

  /** 다음 단계 실행까지 지연 시간 (ms) */
  delay: number

  /** 단계별 데이터 */
  data: ScenarioStepData
}

/**
 * 시나리오 단계별 데이터 타입
 */
export type ScenarioStepData =
  | UserInputData
  | AIThinkingData
  | AIPlanningData
  | AISearchingData
  | AIResponseData
  | ToolCallData
  | MemoryUpdateData

/**
 * 사용자 입력 데이터
 */
export interface UserInputData {
  type: 'user_input'
  content: string
  timestamp?: string
}

/**
 * AI 사고 과정 데이터
 */
export interface AIThinkingData {
  type: 'ai_thinking'
  steps: {
    id: string
    content: string
    duration?: number
  }[]
}

/**
 * AI 계획 수립 데이터
 */
export interface AIPlanningData {
  type: 'ai_planning'
  title: string
  description?: string
  steps: {
    id: string
    title: string
    description?: string
  }[]
}

/**
 * AI 검색 수행 데이터
 */
export interface AISearchingData {
  type: 'ai_searching'
  query: string
  results: {
    id: string
    title: string
    source: string
    url: string
    summary: string
  }[]
}

/**
 * AI 응답 데이터
 */
export interface AIResponseData {
  type: 'ai_response'
  content: string
  personaName: string
  personaInitials: string
  personaColor?: string
  timestamp?: string
}

/**
 * 도구 호출 데이터
 */
export interface ToolCallData {
  type: 'tool_call'
  toolName: string
  arguments: Record<string, unknown>
  result?: unknown
}

/**
 * 메모리 업데이트 데이터
 */
export interface MemoryUpdateData {
  type: 'memory_update'
  memoryType: 'saved' | 'retrieved' | 'web'
  title: string
  content: string
  tags?: string[]
}

/**
 * 시나리오
 */
export interface Scenario {
  /** 시나리오 고유 ID */
  id: string

  /** 시나리오 이름 */
  name: string

  /** 시나리오 설명 */
  description: string

  /** 시나리오 단계 목록 */
  steps: ScenarioStep[]

  /** 생성일 */
  createdAt: string

  /** 메타데이터 (선택적) */
  metadata?: {
    author?: string
    tags?: string[]
    difficulty?: 'easy' | 'medium' | 'hard'
  }
}

/**
 * 시나리오 실행 상태
 */
export interface ScenarioExecutionState {
  /** 실행 중인 시나리오 ID */
  scenarioId: string | null

  /** 현재 단계 인덱스 */
  currentStepIndex: number

  /** 실행 상태 */
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error'

  /** 실행 중 생성된 ID 매핑 (시나리오 데이터 -> 실제 생성된 ID) */
  idMapping: Record<string, string>

  /** 에러 정보 */
  error?: {
    step: number
    message: string
  }
}
