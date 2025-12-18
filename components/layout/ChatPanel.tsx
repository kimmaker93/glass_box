"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Send,
  PanelLeftOpen,
  PanelRightOpen,
  Plus,
  Paperclip,
  FolderOpen,
  Search,
  ChevronDown,
} from "lucide-react"
import { UserMessage } from "@/components/chat/UserMessage"
import { AIMessage } from "@/components/chat/AIMessage"
import { EmptyState } from "@/components/chat/EmptyState"
import { useSessionStore } from "@/stores/useSessionStore"
import { useMessageStore } from "@/stores/useMessageStore"
import { usePersonaStore } from "@/stores/usePersonaStore"
import { getPersonaIconComponent } from "@/lib/personaUtils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ChatPanelProps {
  showWorkspace: boolean;
  showGlassBox: boolean;
  onToggleWorkspace?: () => void;
  onToggleGlassBox?: () => void;
}

export function ChatPanel({
  showWorkspace,
  showGlassBox,
  onToggleWorkspace,
  onToggleGlassBox
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("")
  const [isComposing, setIsComposing] = useState(false)
  const [autoSearch, setAutoSearch] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const activeSessionId = useSessionStore((state) => state.activeSessionId)
  const activeSession = useSessionStore((state) =>
    state.sessions.find((s) => s.id === activeSessionId)
  )
  const workspaces = useSessionStore((state) => state.workspaces)
  const createWorkspace = useSessionStore((state) => state.createWorkspace)
  const createSession = useSessionStore((state) => state.createSession)
  const setActiveSession = useSessionStore((state) => state.setActiveSession)
  const getSessionMessages = useMessageStore((state) => state.getSessionMessages)
  const addMessage = useMessageStore((state) => state.addMessage)
  const personas = usePersonaStore((state) => state.personas)
  const activePersona = usePersonaStore((state) => state.getActivePersona())
  const setActivePersona = usePersonaStore((state) => state.setActivePersona)

  const messages = activeSessionId ? getSessionMessages(activeSessionId) : []

  // 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (scrollRef.current && messages.length > 0) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages])

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return

    // 세션이 없으면 자동 생성
    let sessionId = activeSessionId
    if (!sessionId) {
      // 워크스페이스가 없으면 먼저 생성
      let workspaceId = workspaces.length > 0 ? workspaces[0].id : createWorkspace("일반 대화")
      sessionId = createSession(workspaceId, "새 대화")
      setActiveSession(sessionId)
    }

    addMessage(sessionId, 'user', inputValue.trim())
    setInputValue("")
  }, [inputValue, activeSessionId, workspaces, createWorkspace, createSession, setActiveSession, addMessage])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault()
      handleSendMessage()
    }
  }, [isComposing, handleSendMessage])

  const personaName = activePersona?.name || '페르소나 없음'
  const personaColor = activePersona?.color || '#0ea5e9'
  const PersonaIconComponent = getPersonaIconComponent(activePersona?.icon)

  // 페르소나 색상을 연하게 변환 (10% 투명도)
  const backgroundColor = `${personaColor}10`

  return (
    <div className="flex flex-col h-full">
      {/* 채팅 헤더 */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-background">
        <div className="flex items-center gap-2">
          {!showWorkspace && onToggleWorkspace && (
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden lg:flex" onClick={onToggleWorkspace}>
              <PanelLeftOpen className="h-4 w-4" />
            </Button>
          )}
          <h2 className="font-semibold">{activeSession?.name || '세션을 선택하세요'}</h2>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-2">
                <Avatar className="h-6 w-6 mr-2" style={{ backgroundColor: personaColor }} suppressHydrationWarning>
                  <AvatarFallback className="text-white" style={{ backgroundColor: personaColor }} suppressHydrationWarning>
                    <PersonaIconComponent className="h-3.5 w-3.5" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground" suppressHydrationWarning>{personaName}</span>
                <ChevronDown className="h-4 w-4 ml-1 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {personas.length === 0 ? (
                <DropdownMenuItem disabled>페르소나가 없습니다</DropdownMenuItem>
              ) : (
                personas.map((persona) => {
                  const Icon = getPersonaIconComponent(persona.icon)
                  return (
                    <DropdownMenuItem
                      key={persona.id}
                      onClick={() => setActivePersona(persona.id)}
                    >
                      <Avatar className="h-5 w-5 mr-2" style={{ backgroundColor: persona.color || '#0ea5e9' }}>
                        <AvatarFallback className="text-white" style={{ backgroundColor: persona.color || '#0ea5e9' }}>
                          <Icon className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      {persona.name}
                    </DropdownMenuItem>
                  )
                })
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-2 px-2 py-1 rounded-md border bg-background/50">
            <Switch
              id="auto-search"
              checked={autoSearch}
              onCheckedChange={setAutoSearch}
              className="data-[state=checked]:bg-primary"
            />
            <Label htmlFor="auto-search" className="text-xs text-muted-foreground cursor-pointer">
              자동탐색
            </Label>
          </div>
          {!showGlassBox && onToggleGlassBox && (
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden lg:flex" onClick={onToggleGlassBox}>
              <PanelRightOpen className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-hidden" style={messages.length > 0 ? { backgroundColor } : undefined}>
        {!activeSession ? (
          <EmptyState variant="no-session" />
        ) : messages.length === 0 ? (
          <EmptyState variant="no-messages" />
        ) : (
          <ScrollArea className="h-full">
            <div className="px-6 py-4 space-y-4 max-w-4xl mx-auto" ref={scrollRef}>
              {messages.map((message) => {
                const timestamp = new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })

                return message.role === "user" ? (
                  <UserMessage
                    key={message.id}
                    content={message.content}
                    timestamp={timestamp}
                  />
                ) : (
                  <AIMessage
                    key={message.id}
                    content={message.content}
                    timestamp={timestamp}
                    personaName={personaName}
                    personaInitials={''}
                    personaColor={personaColor}
                    personaIcon={activePersona?.icon}
                  />
                )
              })}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="px-4 pt-4 pb-8 bg-background/80 backdrop-blur-sm">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 flex-shrink-0"
                disabled={!activeSessionId}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start">
              <DropdownMenuItem>
                <Paperclip className="h-4 w-4 mr-2" />
                파일 또는 사진 추가
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FolderOpen className="h-4 w-4 mr-2" />
                프로젝트에 추가
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Search className="h-4 w-4 mr-2" />
                웹 검색
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder="메시지를 입력하세요..."
              className="h-11"
              disabled={!activeSessionId}
            />
          </div>

          <Button
            size="icon"
            className="h-11 w-11 flex-shrink-0"
            onClick={handleSendMessage}
            disabled={!activeSessionId || !inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
