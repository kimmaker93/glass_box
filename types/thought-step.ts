// 사고 과정 타입 정의
export interface ThoughtStep {
  id: string
  type: 'observation' | 'reasoning' | 'conclusion' | 'question'
  content: string
  confidence?: number
  relatedMemories?: string[] // Memory ID 목록
  timestamp: string
}
