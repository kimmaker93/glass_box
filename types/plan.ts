// 계획 타입 정의
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
