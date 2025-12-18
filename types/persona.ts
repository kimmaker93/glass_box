// 페르소나 아이콘 타입 (8개 프리셋)
export type PersonaIcon =
  | 'user'           // 일반 사용자
  | 'briefcase'      // 비즈니스/전문가
  | 'graduation-cap' // 교육자/학생
  | 'code'           // 개발자
  | 'palette'        // 디자이너/크리에이티브
  | 'file-text'      // 작가/컨텐츠 제작자
  | 'users'          // 팀/협업
  | 'bot'            // AI/봇

// 페르소나 타입 정의
export interface Persona {
  id: string
  name: string
  description: string
  systemPrompt: string
  avatar?: string
  color?: string
  icon?: PersonaIcon
  isDefault: boolean
  createdAt: string
  updatedAt: string
}
