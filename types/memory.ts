// 메모리 타입 정의

// ============================================================================
// Data Model Types (Phase P0/P1)
// ============================================================================

/**
 * 기억 타입
 * - saved: 사용자가 저장한 기억 (대화 또는 수동)
 * - retrieved: 검색/조회된 기억
 * - web: 웹 검색 결과
 */
export type MemoryType = 'saved' | 'retrieved' | 'web'

/**
 * 기억 카테고리 (선택사항)
 */
export type MemoryCategory =
  | 'important'    // 중요 정보
  | 'reference'    // 참고 자료
  | 'idea'         // 아이디어
  | 'todo'         // 할 일
  | 'fact'         // 사실 정보
  | 'other'        // 기타

export interface Memory {
  id: string
  type: MemoryType
  title: string
  content: string
  source?: string              // 출처 (웹 URL, 문서명 등)
  category?: MemoryCategory    // 카테고리
  relevance?: number           // 관련성 점수 (0-1)
  sessionId?: string           // 세션 ID (대화에서 저장된 경우)
  messageId?: string           // 메시지 ID (대화에서 저장된 경우)
  createdAt: string
  updatedAt?: string           // 수정 시간
  tags?: string[]              // 태그
}

// ============================================================================
// Component Props Types (Phase P2)
// ============================================================================

/**
 * 저장된 기억 카드 컴포넌트 Props
 *
 * @example
 * ```tsx
 * <MemoryCard
 *   id="mem-1"
 *   title="Phase P1 완료 내용"
 *   summary="shadcn/ui 기본 컴포넌트 8개 설치 완료"
 *   createdAt="2025년 12월 17일"
 *   onEdit={() => console.log('수정')}
 *   onDelete={() => console.log('삭제')}
 * />
 * ```
 */
export interface MemoryCardProps {
  /** 기억 고유 ID */
  id: string;

  /** 기억 제목 */
  title: string;

  /** 기억 요약 (최대 2-3줄 권장) */
  summary: string;

  /** 생성일 (한글 형식: "2025년 12월 17일") */
  createdAt: string;

  /** 수정 버튼 클릭 핸들러 (optional) */
  onEdit?: () => void;

  /** 삭제 버튼 클릭 핸들러 (optional) */
  onDelete?: () => void;
}

/**
 * 검색 결과 카드 컴포넌트 Props
 *
 * @example
 * ```tsx
 * <SearchResultCard
 *   id="search-1"
 *   title="Next.js App Router 공식 문서"
 *   source="Next.js 공식 문서"
 *   url="https://nextjs.org/docs/app"
 *   summary="Next.js 16 App Router는..."
 *   isSelected={true}
 *   onToggle={(selected) => console.log(selected)}
 * />
 * ```
 */
export interface SearchResultCardProps {
  /** 검색 결과 고유 ID */
  id: string;

  /** 문서 제목 */
  title: string;

  /** 출처 (예: "Wikipedia", "공식 문서") */
  source: string;

  /** 문서 URL */
  url: string;

  /** 문서 요약 (최대 3-4줄 권장) */
  summary: string;

  /** 선택 여부 */
  isSelected: boolean;

  /** 체크박스 변경 핸들러 (optional) */
  onToggle?: (selected: boolean) => void;
}
