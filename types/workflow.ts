// 워크플로우 타입 정의
export interface Workflow {
  id: string
  name: string
  description?: string
  steps: WorkflowStep[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface WorkflowStep {
  id: string
  order: number
  type: 'prompt' | 'tool' | 'decision' | 'condition'
  config: Record<string, unknown>
}
