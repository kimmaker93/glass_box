// 페르소나 타입 정의
export interface Persona {
  id: string
  name: string
  description: string
  systemPrompt: string
  avatar?: string
  color?: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}
