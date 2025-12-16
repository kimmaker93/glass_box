// 메시지 타입 정의
import type { Plan } from './plan'

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
