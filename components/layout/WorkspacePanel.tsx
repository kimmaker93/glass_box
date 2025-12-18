"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, MessageSquare, PanelLeftClose, GripVertical } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSessionStore } from "@/stores/useSessionStore"
import { WorkspaceDialog } from "@/components/common/WorkspaceDialog"
import { SessionDialog } from "@/components/common/SessionDialog"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface WorkspacePanelProps {
  onToggle?: () => void;
}

// Sortable Workspace Item
function SortableWorkspace({
  workspace,
  workspaceSessions,
  expandedFolders,
  activeSessionId,
  onToggleFolder,
  onSessionClick,
}: {
  workspace: { id: string; name: string }
  workspaceSessions: { id: string; name: string }[]
  expandedFolders: Set<string>
  activeSessionId: string | null
  onToggleFolder: (id: string) => void
  onSessionClick: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: workspace.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="mb-1">
      {/* 폴더 (워크스페이스) */}
      <div className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent transition-colors flex items-center gap-2">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <button
          onClick={() => onToggleFolder(workspace.id)}
          className="flex items-center gap-2 flex-1 min-w-0"
        >
          <ChevronRight
            className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
              expandedFolders.has(workspace.id) ? 'rotate-90' : ''
            }`}
          />
          <span className="text-xs font-medium text-muted-foreground">
            {workspace.name}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            {workspaceSessions.length}
          </span>
        </button>
      </div>

      {/* 세션들 with Drag & Drop */}
      {expandedFolders.has(workspace.id) && workspaceSessions.length > 0 && (
        <div className="ml-4 mt-1 space-y-0.5">
          <SortableContext
            items={workspaceSessions.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {workspaceSessions.map((session) => (
              <SortableSession
                key={session.id}
                session={session}
                isActive={activeSessionId === session.id}
                onClick={() => onSessionClick(session.id)}
              />
            ))}
          </SortableContext>
        </div>
      )}
    </div>
  )
}

// Sortable Session Item
function SortableSession({
  session,
  isActive,
  onClick,
}: {
  session: { id: string; name: string }
  isActive: boolean
  onClick: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: session.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`w-full text-left px-2 py-1.5 rounded-md transition-colors flex items-center gap-2 ${
        isActive ? 'bg-primary/10 text-primary' : 'hover:bg-accent'
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <button onClick={onClick} className="flex items-center gap-2 flex-1 min-w-0">
        <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="text-xs truncate flex-1">{session.name}</span>
      </button>
    </div>
  )
}

export function WorkspacePanel({ onToggle }: WorkspacePanelProps) {
  const workspaces = useSessionStore((state) => state.workspaces)
  const sessions = useSessionStore((state) => state.sessions)
  const activeSessionId = useSessionStore((state) => state.activeSessionId)
  const createWorkspace = useSessionStore((state) => state.createWorkspace)
  const createSession = useSessionStore((state) => state.createSession)
  const setActiveSession = useSessionStore((state) => state.setActiveSession)
  const moveSession = useSessionStore((state) => state.moveSession)
  const reorderSessions = useSessionStore((state) => state.reorderSessions)
  const reorderWorkspaces = useSessionStore((state) => state.reorderWorkspaces)

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(workspaces.map((w) => w.id))
  )
  const [workspaceDialogOpen, setWorkspaceDialogOpen] = useState(false)
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const handleCreateWorkspace = (name: string, description?: string) => {
    const id = createWorkspace(name, description)
    setExpandedFolders((prev) => new Set([...prev, id]))
  }

  const handleSessionClick = (sessionId: string) => {
    setActiveSession(sessionId)
  }

  const handleCreateSession = (workspaceId: string, name: string) => {
    const sessionId = createSession(workspaceId, name)
    setActiveSession(sessionId)
    setExpandedFolders((prev) => new Set([...prev, workspaceId]))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const activeId = active.id as string
    const overId = over.id as string

    // Check if dragging workspace
    const activeWorkspace = workspaces.find((w) => w.id === activeId)
    if (activeWorkspace) {
      const overWorkspace = workspaces.find((w) => w.id === overId)
      if (overWorkspace) {
        // Reordering workspaces
        const oldIndex = workspaces.findIndex((w) => w.id === activeId)
        const newIndex = workspaces.findIndex((w) => w.id === overId)

        const newOrder = [...workspaces.map((w) => w.id)]
        newOrder.splice(oldIndex, 1)
        newOrder.splice(newIndex, 0, activeId)

        reorderWorkspaces(newOrder)
        return
      }
    }

    // Check if dragging session
    const activeSession = sessions.find((s) => s.id === activeId)
    if (activeSession) {
      const overSession = sessions.find((s) => s.id === overId)
      const overWorkspace = workspaces.find((w) => w.id === overId)

      if (overSession) {
        // Reordering within same workspace or moving to different workspace
        if (activeSession.workspaceId === overSession.workspaceId) {
          const workspace = workspaces.find((w) => w.id === activeSession.workspaceId)
          if (!workspace) return

          const oldIndex = workspace.sessions.indexOf(activeId)
          const newIndex = workspace.sessions.indexOf(overId)

          const newOrder = [...workspace.sessions]
          newOrder.splice(oldIndex, 1)
          newOrder.splice(newIndex, 0, activeId)

          reorderSessions(workspace.id, newOrder)
        } else {
          // Moving to different workspace
          moveSession(activeId, overSession.workspaceId)
        }
      } else if (overWorkspace) {
        // Dropped on workspace (not on a session)
        // Move session to the end of the target workspace
        moveSession(activeId, overWorkspace.id)
      }
    }
  }

  return (
    <div className="flex flex-col h-full bg-muted/30">
      {/* 헤더 */}
      <div className="p-4 border-b space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">워크스페이스</h2>
          {onToggle && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onToggle}>
              <PanelLeftClose className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        <Button
          variant="default"
          size="sm"
          className="w-full h-9 text-sm"
          onClick={() => setSessionDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          새 대화
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full h-9 text-sm"
          onClick={() => setWorkspaceDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          워크스페이스 추가
        </Button>
      </div>

      {/* 세션 목록 - 계층 구조 with Drag & Drop */}
      <ScrollArea className="flex-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="p-2">
            {workspaces.length === 0 ? (
              <div className="text-center text-xs text-muted-foreground p-4">
                워크스페이스를 추가해주세요
              </div>
            ) : (
              <SortableContext
                items={workspaces.map((w) => w.id)}
                strategy={verticalListSortingStrategy}
              >
                {workspaces.map((workspace) => {
                  const workspaceSessions = sessions.filter((s) => s.workspaceId === workspace.id)
                  return (
                    <SortableWorkspace
                      key={workspace.id}
                      workspace={workspace}
                      workspaceSessions={workspaceSessions}
                      expandedFolders={expandedFolders}
                      activeSessionId={activeSessionId}
                      onToggleFolder={toggleFolder}
                      onSessionClick={handleSessionClick}
                    />
                  )
                })}
              </SortableContext>
            )}
          </div>
        </DndContext>
      </ScrollArea>

      {/* Dialogs */}
      <WorkspaceDialog
        open={workspaceDialogOpen}
        onOpenChange={setWorkspaceDialogOpen}
        onSubmit={handleCreateWorkspace}
      />
      <SessionDialog
        open={sessionDialogOpen}
        onOpenChange={setSessionDialogOpen}
        onSubmit={handleCreateSession}
        defaultWorkspaceId={workspaces.length > 0 ? workspaces[0].id : undefined}
      />
    </div>
  )
}
