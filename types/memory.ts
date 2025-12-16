// 메모리 타입 정의
export interface Memory {
  id: string
  type: 'saved' | 'retrieved' | 'web'
  title: string
  content: string
  source?: string
  relevance?: number
  sessionId: string
  messageId?: string
  createdAt: string
  tags?: string[]
}
