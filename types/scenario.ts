// 시나리오 타입 정의
export interface Scenario {
  id: string
  name: string
  description: string
  steps: ScenarioStep[]
  createdAt: string
}

export interface ScenarioStep {
  id: string
  order: number
  type: 'user_input' | 'ai_thinking' | 'ai_planning' | 'ai_searching' | 'ai_response' | 'tool_call' | 'memory_update'
  delay: number // ms
  data: Record<string, unknown>
}

export type ScenarioStepType =
  | 'user_input'
  | 'ai_thinking'
  | 'ai_planning'
  | 'ai_searching'
  | 'ai_response'
  | 'tool_call'
  | 'memory_update'
