"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ThinkingProcessProps } from "@/types/thinking"
import { Loader2, CheckCircle2, Clock } from "lucide-react"

export function ThinkingProcess({
  steps,
  defaultOpen = false,
  headerText = "🤔 생각하는 중..."
}: ThinkingProcessProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? "thinking" : undefined}>
      <AccordionItem value="thinking">
        <AccordionTrigger>{headerText}</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.id} className="flex gap-3 items-start">
                {getStatusIcon(step.status)}
                <div>
                  <p className="text-sm font-medium">{step.title}</p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
