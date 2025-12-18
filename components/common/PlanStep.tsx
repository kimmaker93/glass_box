"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { PlanStepProps } from "@/types/plan"
import { Pencil, Trash2 } from "lucide-react"

export function PlanStep({
  order,
  title,
  description,
  status,
  isSelected,
  onToggle,
  onEdit,
  onDelete,
  draggable = true
}: PlanStepProps) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-md border transition-colors ${
      isSelected ? "border-primary bg-primary/5" : "border-border hover:bg-accent/50"
    }`}>
      <Checkbox
        checked={isSelected}
        onCheckedChange={(checked) => onToggle?.(checked === true)}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm leading-tight">{title}</h4>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex gap-1 flex-shrink-0">
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
  )
}
