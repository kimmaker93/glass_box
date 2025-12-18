// 설정 타입 정의

export interface Settings {
  // 외관
  theme: 'light' | 'dark' | 'system'

  // UI
  showGlassBox: boolean
  showWorkspace: boolean
  compactMode: boolean

  // 기능
  autoSave: boolean
  saveHistory: boolean

  // 알림
  enableNotifications: boolean
  soundEnabled: boolean

  // 개인정보
  dataCollection: boolean

  // 고급
  debugMode: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  showGlassBox: true,
  showWorkspace: true,
  compactMode: false,
  autoSave: true,
  saveHistory: true,
  enableNotifications: true,
  soundEnabled: false,
  dataCollection: false,
  debugMode: false,
}
