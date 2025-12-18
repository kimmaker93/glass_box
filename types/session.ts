// 세션 타입 정의
export interface Session {
  id: string
  workspaceId: string
  name: string
  personaId?: string
  messages: string[] // Message ID 목록
  createdAt: string
  updatedAt: string
  archivedAt?: string
}
