import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Palette,
  FileText,
  Users,
  Bot,
  LucideIcon,
} from 'lucide-react'
import { PersonaIcon } from '@/types/persona'

// PersonaIcon 문자열을 lucide-react Icon 컴포넌트로 변환
export function getPersonaIconComponent(icon?: PersonaIcon): LucideIcon {
  if (!icon) return User

  const iconMap: Record<PersonaIcon, LucideIcon> = {
    'user': User,
    'briefcase': Briefcase,
    'graduation-cap': GraduationCap,
    'code': Code,
    'palette': Palette,
    'file-text': FileText,
    'users': Users,
    'bot': Bot,
  }

  return iconMap[icon] || User
}

// 아이콘 프리셋 목록 (UI에서 선택 가능)
export const PERSONA_ICON_OPTIONS: { value: PersonaIcon; label: string }[] = [
  { value: 'user', label: '일반 사용자' },
  { value: 'briefcase', label: '비즈니스/전문가' },
  { value: 'graduation-cap', label: '교육자/학생' },
  { value: 'code', label: '개발자' },
  { value: 'palette', label: '디자이너' },
  { value: 'file-text', label: '작가' },
  { value: 'users', label: '팀/협업' },
  { value: 'bot', label: 'AI/봇' },
]
