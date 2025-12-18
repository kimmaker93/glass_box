"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, Edit, Check, X, Tag as TagIcon } from "lucide-react"
import { useMemoryStore } from "@/stores/useMemoryStore"
import { Memory, MemoryCategory } from "@/types/memory"

const CATEGORY_OPTIONS: { value: MemoryCategory; label: string }[] = [
  { value: 'important', label: '중요 정보' },
  { value: 'reference', label: '참고 자료' },
  { value: 'idea', label: '아이디어' },
  { value: 'todo', label: '할 일' },
  { value: 'fact', label: '사실 정보' },
  { value: 'other', label: '기타' },
]

export function MemoryManager() {
  const allMemories = useMemoryStore((state) => state.memories)
  const addMemory = useMemoryStore((state) => state.addMemory)
  const updateMemory = useMemoryStore((state) => state.updateMemory)
  const deleteMemory = useMemoryStore((state) => state.deleteMemory)

  // Filter saved memories in the component to avoid infinite loop
  const memories = allMemories.filter((m) => m.type === 'saved')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: undefined as MemoryCategory | undefined,
    tags: "" as string,
  })

  const handleCreate = () => {
    if (!formData.title.trim() || !formData.content.trim()) return

    const tags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    addMemory('saved', formData.title, formData.content, {
      category: formData.category,
      tags: tags.length > 0 ? tags : undefined,
    })

    setFormData({ title: "", content: "", category: undefined, tags: "" })
    setIsCreating(false)
  }

  const handleUpdate = (id: string) => {
    if (!formData.title.trim() || !formData.content.trim()) return

    const tags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    updateMemory(id, {
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: tags.length > 0 ? tags : undefined,
    })

    setEditingId(null)
    setFormData({ title: "", content: "", category: undefined, tags: "" })
  }

  const startEdit = (memory: Memory) => {
    setEditingId(memory.id)
    setFormData({
      title: memory.title,
      content: memory.content,
      category: memory.category,
      tags: memory.tags?.join(', ') || "",
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsCreating(false)
    setFormData({ title: "", content: "", category: undefined, tags: "" })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">저장된 기억</h2>
          <p className="text-sm text-muted-foreground mt-1">
            중요한 정보를 저장하고 관리합니다
          </p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            새 기억 추가
          </Button>
        )}
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>새 기억 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="create-title">제목 *</Label>
              <Input
                id="create-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="기억의 제목"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-content">내용 *</Label>
              <Textarea
                id="create-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="저장할 내용을 입력하세요"
                rows={6}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-category">카테고리</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as MemoryCategory })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택 (선택사항)" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-tags">태그</Label>
              <Input
                id="create-tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="태그를 쉼표로 구분하여 입력 (예: React, TypeScript)"
              />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" onClick={cancelEdit}>
              <X className="h-4 w-4 mr-2" />
              취소
            </Button>
            <Button onClick={handleCreate} disabled={!formData.title.trim() || !formData.content.trim()}>
              <Check className="h-4 w-4 mr-2" />
              생성
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Memory List */}
      <div className="grid gap-4">
        {memories.map((memory) => (
          <Card key={memory.id}>
            {editingId === memory.id ? (
              <>
                <CardHeader>
                  <CardTitle>기억 수정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-title-${memory.id}`}>제목 *</Label>
                    <Input
                      id={`edit-title-${memory.id}`}
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-content-${memory.id}`}>내용 *</Label>
                    <Textarea
                      id={`edit-content-${memory.id}`}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-category-${memory.id}`}>카테고리</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value as MemoryCategory })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리 선택 (선택사항)" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-tags-${memory.id}`}>태그</Label>
                    <Input
                      id={`edit-tags-${memory.id}`}
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="태그를 쉼표로 구분하여 입력"
                    />
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" onClick={cancelEdit}>
                    <X className="h-4 w-4 mr-2" />
                    취소
                  </Button>
                  <Button onClick={() => handleUpdate(memory.id)} disabled={!formData.title.trim() || !formData.content.trim()}>
                    <Check className="h-4 w-4 mr-2" />
                    저장
                  </Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 flex-wrap">
                        {memory.title}
                        {memory.category && (
                          <Badge variant="secondary">
                            {CATEGORY_OPTIONS.find((c) => c.value === memory.category)?.label}
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {formatDate(memory.createdAt)}
                        {memory.updatedAt && memory.updatedAt !== memory.createdAt && (
                          <span className="ml-2">(수정됨)</span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(memory)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMemory(memory.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{memory.content}</p>
                  {memory.tags && memory.tags.length > 0 && (
                    <div className="flex items-center gap-2 mt-4">
                      <TagIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <div className="flex flex-wrap gap-1">
                        {memory.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>

      {memories.length === 0 && !isCreating && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">저장된 기억이 없습니다</p>
            <Button onClick={() => setIsCreating(true)} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              첫 기억 추가
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
