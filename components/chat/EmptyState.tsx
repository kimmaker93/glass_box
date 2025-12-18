"use client"

import { ReactNode } from "react"
import { MessageSquare, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface EmptyStateProps {
  variant: 'no-session' | 'no-messages'
  children?: ReactNode
}

/**
 * 빈 화면 컴포넌트
 *
 * 용도:
 * - variant='no-session': 세션이 선택되지 않은 상태
 * - variant='no-messages': 세션은 있지만 메시지가 없는 상태
 *
 * 확장성:
 * - children prop으로 커스텀 컨텐츠 추가 가능
 * - 추후 이미지, 버튼, 가이드 카드 등 삽입 예정
 */
export function EmptyState({ variant, children }: EmptyStateProps) {
  if (variant === 'no-session') {
    return (
      <motion.div
        className="h-full flex flex-col items-center justify-center bg-slate-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 로고 영역 */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Sparkles className="h-12 w-12 text-primary animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            GLASSY
          </h1>
        </motion.div>

        {/* 메시지 영역 */}
        <motion.div
          className="text-center space-y-3 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xl text-muted-foreground">
            투명한 AI와 함께하는 대화
          </p>
          <p className="text-sm text-muted-foreground">
            좌측에서 세션을 선택하거나 새 대화를 시작하세요
          </p>
        </motion.div>

        {/* 확장 가능한 컨텐츠 영역 */}
        {children && (
          <motion.div
            className="mt-8 w-full max-w-4xl px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    )
  }

  if (variant === 'no-messages') {
    return (
      <motion.div
        className="h-full flex flex-col items-center justify-center bg-slate-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 아이콘 */}
        <motion.div
          className="mb-6 p-4 rounded-full bg-primary/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MessageSquare className="h-12 w-12 text-primary" />
        </motion.div>

        {/* 메시지 */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold">새로운 대화를 시작하세요</h3>
          <p className="text-sm text-muted-foreground">
            메시지를 입력하여 대화를 시작하세요
          </p>
        </motion.div>

        {/* 확장 가능한 컨텐츠 영역 */}
        {children && (
          <motion.div
            className="mt-8 w-full max-w-4xl px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    )
  }

  return null
}
