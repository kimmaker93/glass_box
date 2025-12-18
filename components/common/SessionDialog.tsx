"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSessionStore } from "@/stores/useSessionStore"

interface SessionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (workspaceId: string, name: string) => void
  defaultWorkspaceId?: string
}

export function SessionDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultWorkspaceId,
}: SessionDialogProps) {
  const workspaces = useSessionStore((state) => state.workspaces)
  const [name, setName] = useState("")
  const [workspaceId, setWorkspaceId] = useState(defaultWorkspaceId || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !workspaceId) return

    onSubmit(workspaceId, name.trim())

    // Reset form
    setName("")
    setWorkspaceId(defaultWorkspaceId || "")
    onOpenChange(false)
  }

  const handleCancel = () => {
    setName("")
    setWorkspaceId(defaultWorkspaceId || "")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>새 대화 시작</DialogTitle>
            <DialogDescription>
              새로운 대화를 시작합니다. 워크스페이스를 선택하고 대화 제목을 입력하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="workspace">워크스페이스 *</Label>
              <Select value={workspaceId} onValueChange={setWorkspaceId}>
                <SelectTrigger id="workspace">
                  <SelectValue placeholder="워크스페이스를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {workspaces.map((workspace) => (
                    <SelectItem key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="session-name">대화 제목 *</Label>
              <Input
                id="session-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="대화 제목을 입력하세요"
                autoFocus={!!workspaceId}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" disabled={!name.trim() || !workspaceId}>
              시작
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
