"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MemoryCardProps } from "@/types/memory"
import { Pencil, Trash2 } from "lucide-react"

export function MemoryCard({
  title,
  summary,
  createdAt,
  onEdit,
  onDelete
}: MemoryCardProps) {
  return (
    <Card className="p-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold leading-tight line-clamp-1">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{createdAt}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0 ml-2">
          {onEdit && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onDelete}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-3">{summary}</p>
    </Card>
  )
}
