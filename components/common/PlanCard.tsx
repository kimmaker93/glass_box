"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlanCardProps } from "@/types/plan"
import { PlanStep } from "./PlanStep"
import { Play, Loader2, Plus } from "lucide-react"

export function PlanCard({
  title,
  description,
  steps,
  executeEnabled = true,
  onExecute,
  onAddStep,
  isExecuting = false
}: PlanCardProps) {
  const selectedCount = steps.filter(step => step.isSelected).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {onAddStep && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAddStep}
              className="flex-shrink-0"
            >
              <Plus className="h-4 w-4 mr-1" />
              단계 추가
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-6">
          {steps.map((step) => (
            <PlanStep key={step.id} {...step} />
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {selectedCount}개 단계 선택됨 / 총 {steps.length}개
          </p>
          <Button
            onClick={onExecute}
            disabled={!executeEnabled || selectedCount === 0 || isExecuting}
          >
            {isExecuting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                실행 중...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                실행
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
