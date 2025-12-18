"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2, Edit, Check, X } from "lucide-react"
import { usePersonaStore } from "@/stores/usePersonaStore"
import { Persona, PersonaIcon } from "@/types/persona"
import { PERSONA_ICON_OPTIONS, getPersonaIconComponent } from "@/lib/personaUtils"

export function PersonaManager() {
  const personas = usePersonaStore((state) => state.personas)
  const createPersona = usePersonaStore((state) => state.createPersona)
  const updatePersona = usePersonaStore((state) => state.updatePersona)
  const deletePersona = usePersonaStore((state) => state.deletePersona)
  const setDefaultPersona = usePersonaStore((state) => state.setDefaultPersona)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    systemPrompt: "",
    color: "#0ea5e9",
    icon: "user" as PersonaIcon,
  })

  const handleCreate = () => {
    if (!formData.name.trim()) return
    createPersona(formData.name, formData.description, formData.systemPrompt, {
      color: formData.color,
      icon: formData.icon,
    })
    setFormData({ name: "", description: "", systemPrompt: "", color: "#0ea5e9", icon: "user" })
    setIsCreating(false)
  }

  const handleUpdate = (id: string) => {
    if (!formData.name.trim()) return
    updatePersona(id, {
      name: formData.name,
      description: formData.description,
      systemPrompt: formData.systemPrompt,
      color: formData.color,
      icon: formData.icon,
    })
    setEditingId(null)
    setFormData({ name: "", description: "", systemPrompt: "", color: "#0ea5e9", icon: "user" })
  }

  const startEdit = (persona: Persona) => {
    setEditingId(persona.id)
    setFormData({
      name: persona.name,
      description: persona.description || "",
      systemPrompt: persona.systemPrompt,
      color: persona.color || "#0ea5e9",
      icon: persona.icon || "user",
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsCreating(false)
    setFormData({ name: "", description: "", systemPrompt: "", color: "#0ea5e9", icon: "user" })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">페르소나 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            AI 페르소나를 추가하고 관리합니다
          </p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            새 페르소나
          </Button>
        )}
      </div>

      {/* Create Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>새 페르소나 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="create-name">이름 *</Label>
              <Input
                id="create-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="페르소나 이름"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-description">설명</Label>
              <Input
                id="create-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="페르소나 설명"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-prompt">시스템 프롬프트 *</Label>
              <Textarea
                id="create-prompt"
                value={formData.systemPrompt}
                onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                placeholder="페르소나의 행동 방식을 정의하는 시스템 프롬프트"
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-icon">아이콘</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => setFormData({ ...formData, icon: value as PersonaIcon })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PERSONA_ICON_OPTIONS.map((option) => {
                    const IconComponent = getPersonaIconComponent(option.value)
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-color">색상</Label>
              <div className="flex gap-2">
                <Input
                  id="create-color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input value={formData.color} readOnly className="flex-1" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" onClick={cancelEdit}>
              <X className="h-4 w-4 mr-2" />
              취소
            </Button>
            <Button onClick={handleCreate} disabled={!formData.name.trim() || !formData.systemPrompt.trim()}>
              <Check className="h-4 w-4 mr-2" />
              생성
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Persona List */}
      <div className="grid gap-4">
        {personas.map((persona) => (
          <Card key={persona.id} className={persona.isDefault ? "border-primary" : ""}>
            {editingId === persona.id ? (
              <>
                <CardHeader>
                  <CardTitle>페르소나 수정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-name-${persona.id}`}>이름 *</Label>
                    <Input
                      id={`edit-name-${persona.id}`}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-description-${persona.id}`}>설명</Label>
                    <Input
                      id={`edit-description-${persona.id}`}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-prompt-${persona.id}`}>시스템 프롬프트 *</Label>
                    <Textarea
                      id={`edit-prompt-${persona.id}`}
                      value={formData.systemPrompt}
                      onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-icon-${persona.id}`}>아이콘</Label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value) => setFormData({ ...formData, icon: value as PersonaIcon })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PERSONA_ICON_OPTIONS.map((option) => {
                          const IconComponent = getPersonaIconComponent(option.value)
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`edit-color-${persona.id}`}>색상</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`edit-color-${persona.id}`}
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-20 h-10"
                      />
                      <Input value={formData.color} readOnly className="flex-1" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" onClick={cancelEdit}>
                    <X className="h-4 w-4 mr-2" />
                    취소
                  </Button>
                  <Button onClick={() => handleUpdate(persona.id)} disabled={!formData.name.trim() || !formData.systemPrompt.trim()}>
                    <Check className="h-4 w-4 mr-2" />
                    저장
                  </Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const IconComponent = getPersonaIconComponent(persona.icon)
                        return (
                          <Avatar className="h-10 w-10" style={{ backgroundColor: persona.color || "#0ea5e9" }}>
                            <AvatarFallback className="text-white" style={{ backgroundColor: persona.color || "#0ea5e9" }}>
                              <IconComponent className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                        )
                      })()}
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {persona.name}
                          {persona.isDefault && (
                            <span className="text-xs font-normal text-primary border border-primary px-2 py-0.5 rounded">
                              기본
                            </span>
                          )}
                        </CardTitle>
                        {persona.description && (
                          <CardDescription>{persona.description}</CardDescription>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(persona)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePersona(persona.id)}
                        disabled={persona.isDefault && personas.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {persona.systemPrompt}
                  </p>
                </CardContent>
                {!persona.isDefault && (
                  <CardFooter>
                    <Button variant="outline" size="sm" onClick={() => setDefaultPersona(persona.id)}>
                      기본으로 설정
                    </Button>
                  </CardFooter>
                )}
              </>
            )}
          </Card>
        ))}
      </div>

      {personas.length === 0 && !isCreating && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">페르소나가 없습니다</p>
            <Button onClick={() => setIsCreating(true)} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              첫 페르소나 추가
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
