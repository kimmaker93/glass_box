"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { SearchResultCardProps } from "@/types/memory"
import { ExternalLink } from "lucide-react"

export function SearchResultCard({
  title,
  source,
  url,
  summary,
  isSelected,
  onToggle
}: SearchResultCardProps) {
  return (
    <Card className={`p-3 transition-colors ${isSelected ? "border-primary bg-primary/5" : "hover:bg-accent/50"}`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onToggle?.(checked === true)}
          className="mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-sm leading-tight line-clamp-1">{title}</h3>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{source}</p>
          {summary && (
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{summary}</p>
          )}
        </div>
      </div>
    </Card>
  )
}
