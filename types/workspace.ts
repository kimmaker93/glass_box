// 워크스페이스 타입 정의
export interface Workspace {
  id: string
  name: string
  description?: string
  sessions: string[] // Session ID 목록
  color?: string
  icon?: string
  createdAt: string
  updatedAt: string
}
