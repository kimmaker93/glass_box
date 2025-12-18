"use client"

import { memo } from "react"
import { UserMessageProps } from "@/types/message"
import { motion } from "framer-motion"

export const UserMessage = memo(function UserMessage({ content, timestamp }: UserMessageProps) {
  return (
    <motion.div
      className="flex justify-end mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-[80%]">
        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2">
          <p className="text-sm">{content}</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-right">{timestamp}</p>
      </div>
    </motion.div>
  )
})
