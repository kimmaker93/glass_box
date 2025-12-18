"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { PersonaManager } from "@/components/settings/PersonaManager"
import { WorkflowManager } from "@/components/settings/WorkflowManager"
import { MemoryManager } from "@/components/settings/MemoryManager"

export default function SettingsPage() {
  const router = useRouter()

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 border-b flex items-center px-4 gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">설정</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="persona" className="h-full flex flex-col">
          <div className="border-b px-6 pt-4">
            <TabsList className="w-full max-w-3xl">
              <TabsTrigger value="persona" className="flex-1">
                페르소나
              </TabsTrigger>
              <TabsTrigger value="workflow" className="flex-1">
                워크플로우
              </TabsTrigger>
              <TabsTrigger value="memory" className="flex-1">
                저장된 기억
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto p-6">
              <TabsContent value="persona" className="mt-0">
                <PersonaManager />
              </TabsContent>

              <TabsContent value="workflow" className="mt-0">
                <WorkflowManager />
              </TabsContent>

              <TabsContent value="memory" className="mt-0">
                <MemoryManager />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
