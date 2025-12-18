"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, Check, X, Power } from "lucide-react"
import { useWorkflowStore } from "@/stores/useWorkflowStore"
import { Workflow } from "@/types/workflow"

export function WorkflowManager() {
  const workflows = useWorkflowStore((state) => state.workflows)
  const createWorkflow = useWorkflowStore((state) => state.createWorkflow)
  const updateWorkflow = useWorkflowStore((state) => state.updateWorkflow)
  const deleteWorkflow = useWorkflowStore((state) => state.deleteWorkflow)
  const toggleWorkflowActive = useWorkflowStore((state) => state.toggleWorkflowActive)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const handleCreate = () => {
    if (!formData.name.trim()) return
    createWorkflow(formData.name, formData.description)
    setFormData({ name: "", description: "" })
    setIsCreating(false)
  }

  const handleUpdate = (id: string) => {
    if (!formData.name.trim()) return
    updateWorkflow(id, {
      name: formData.name,
      description: formData.description,
    })
    setEditingId(null)
    setFormData({ name: "", description: "" })
  }

  const startEdit = (workflow: Workflow) => {
    setEditingId(workflow.id)
    setFormData({
      name: workflow.name,
      description: workflow.description || "",
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsCreating(false)
    setFormData({ name: "", description: "" })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">워크플로우 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            AI 워크플로우를 추가하고 관리합니다
          </p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            새 워크플로우
          </Button>
        )}
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>새 워크플로우 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="create-name">이름 *</Label>
              <Input
                id="create-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="워크플로우 이름"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-description">설명</Label>
              <Textarea
                id="create-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="워크플로우 설명"
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" onClick={cancelEdit}>
              <X className="h-4 w-4 mr-2" />
              취소
            </Button>
            <Button onClick={handleCreate} disabled={!formData.name.trim()}>
              <Check className="h-4 w-4 mr-2" />
              생성
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Workflow List */}
      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            {editingId === workflow.id ? (
              <>
                <CardHeader>
                  <CardTitle>워크플로우 수정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-name-${workflow.id}`}>이름 *</Label>
                    <Input
                      id={`edit-name-${workflow.id}`}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-description-${workflow.id}`}>설명</Label>
                    <Textarea
                      id={`edit-description-${workflow.id}`}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" onClick={cancelEdit}>
                    <X className="h-4 w-4 mr-2" />
                    취소
                  </Button>
                  <Button onClick={() => handleUpdate(workflow.id)} disabled={!formData.name.trim()}>
                    <Check className="h-4 w-4 mr-2" />
                    저장
                  </Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {workflow.name}
                        {workflow.isActive && (
                          <Badge variant="default">활성</Badge>
                        )}
                      </CardTitle>
                      {workflow.description && (
                        <CardDescription className="mt-1">{workflow.description}</CardDescription>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleWorkflowActive(workflow.id)}
                        title={workflow.isActive ? "비활성화" : "활성화"}
                      >
                        <Power className={`h-4 w-4 ${workflow.isActive ? "text-primary" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => startEdit(workflow)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteWorkflow(workflow.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p>단계: {workflow.steps.length}개</p>
                    <p className="text-xs mt-1">
                      생성일: {new Date(workflow.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>

      {workflows.length === 0 && !isCreating && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">워크플로우가 없습니다</p>
            <Button onClick={() => setIsCreating(true)} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              첫 워크플로우 추가
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
