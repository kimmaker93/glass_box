"use client"

import { useState, memo } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AIMessageProps } from "@/types/message"
import { ThumbsUp, ThumbsDown, RotateCw, Copy, Bookmark, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { getPersonaIconComponent } from "@/lib/personaUtils"

export const AIMessage = memo(function AIMessage({
  content,
  timestamp,
  personaName,
  personaInitials,
  personaColor,
  personaIcon,
  isSaved = false,
  onSave
}: AIMessageProps) {
  const PersonaIconComponent = getPersonaIconComponent(personaIcon)
  const [liked, setLiked] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(isSaved)

  const handleLike = () => {
    setLiked(liked === true ? null : true)
  }

  const handleDislike = () => {
    setLiked(liked === false ? null : false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    setSaved(!saved)
    onSave?.()
  }

  return (
    <motion.div
      className="flex gap-3 mb-6 py-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar className="h-8 w-8" style={{ backgroundColor: personaColor || '#0ea5e9' }}>
        <AvatarFallback className="text-white" style={{ backgroundColor: personaColor || '#0ea5e9' }}>
          <PersonaIconComponent className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-3">
        <div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleLike}
          >
            <ThumbsUp className={`h-4 w-4 ${liked === true ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleDislike}
          >
            <ThumbsDown className={`h-4 w-4 ${liked === false ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => window.location.reload()}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
          >
            <Copy className={`h-4 w-4 ${copied ? "text-green-600" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleSave}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
})
