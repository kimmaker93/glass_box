"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { MemoryCard } from "@/components/glass-box/MemoryCard"
import { SearchResultCard } from "@/components/glass-box/SearchResultCard"
import { PanelRightClose } from "lucide-react"
import { useMemoryStore } from "@/stores/useMemoryStore"
import { useSessionStore } from "@/stores/useSessionStore"

interface GlassBoxPanelProps {
  onToggle?: () => void;
}

export function GlassBoxPanel({ onToggle }: GlassBoxPanelProps) {
  const activeSessionId = useSessionStore((state) => state.activeSessionId)
  const getSessionMemories = useMemoryStore((state) => state.getSessionMemories)
  const getMemoriesByType = useMemoryStore((state) => state.getMemoriesByType)
  const deleteMemory = useMemoryStore((state) => state.deleteMemory)

  // 활성 세션의 저장된 메모리
  const savedMemories = activeSessionId
    ? getSessionMemories(activeSessionId).filter((m) => m.type === 'saved')
    : []

  // 전체 검색 결과 (web 타입)
  const webMemories = getMemoriesByType('web')

  return (
    <div className="flex flex-col h-full bg-muted/30">
      {/* 헤더 */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="font-semibold">GLASS_BOX</h2>
            <p className="text-xs text-muted-foreground mt-1">
              AI의 사고 과정과 메모리를 투명하게
            </p>
          </div>
          {onToggle && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggle}>
              <PanelRightClose className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* 컨텐츠 */}
      <Tabs defaultValue="memory" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="memory" className="flex-1">저장된 기억</TabsTrigger>
            <TabsTrigger value="search" className="flex-1">검색 결과</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="memory" className="p-4 mt-0 space-y-3">
            {savedMemories.length === 0 ? (
              <div className="text-center text-xs text-muted-foreground p-4">
                저장된 기억이 없습니다
              </div>
            ) : (
              savedMemories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  id={memory.id}
                  title={memory.title}
                  summary={memory.content}
                  createdAt={new Date(memory.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  onEdit={() => console.log('수정:', memory.id)}
                  onDelete={() => deleteMemory(memory.id)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="search" className="p-4 mt-0 space-y-2">
            {webMemories.length === 0 ? (
              <div className="text-center text-xs text-muted-foreground p-4">
                검색 결과가 없습니다
              </div>
            ) : (
              webMemories.map((memory) => (
                <SearchResultCard
                  key={memory.id}
                  id={memory.id}
                  title={memory.title}
                  source={memory.source || '알 수 없음'}
                  url={memory.source || '#'}
                  summary={memory.content}
                  isSelected={false}
                  onToggle={(selected) => console.log('선택:', selected, memory.id)}
                />
              ))
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
