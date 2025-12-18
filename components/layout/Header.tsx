"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Settings, LogOut, Menu, PanelLeft, PanelRight, Sparkles } from "lucide-react"
import { WorkspacePanel } from "./WorkspacePanel"
import { GlassBoxPanel } from "./GlassBoxPanel"
import { useRouter } from "next/navigation"

interface HeaderProps {
  onLogoClick?: () => void
}

export function Header({ onLogoClick }: HeaderProps) {
  const router = useRouter()
  const [showWorkspaceSheet, setShowWorkspaceSheet] = useState(false)
  const [showGlassBoxSheet, setShowGlassBoxSheet] = useState(false)

  const handleLogout = () => {
    if (confirm("로그아웃하시겠습니까?\n\n모든 데이터는 유지되며, 페이지가 새로고침됩니다.")) {
      // Note: 실제 인증 시스템 구현 시 인증 토큰만 제거하도록 변경 필요
      // 현재는 데이터 유지를 위해 localStorage.clear() 대신 reload만 수행
      window.location.reload()
    }
  }

  return (
    <>
      <header className="h-14 border-b bg-background flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* 로고 - 클릭 시 홈 화면으로 이동 */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <div className="text-xl font-bold bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
              GLASSY
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* 모바일 메뉴 버튼 - 우측 배치 */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 lg:hidden"
            onClick={() => setShowWorkspaceSheet(true)}
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 lg:hidden"
            onClick={() => setShowGlassBoxSheet(true)}
          >
            <PanelRight className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>

      {/* 모바일 워크스페이스 패널 */}
      <Sheet open={showWorkspaceSheet} onOpenChange={setShowWorkspaceSheet}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <WorkspacePanel />
        </SheetContent>
      </Sheet>

      {/* 모바일 GLASS_BOX 패널 */}
      <Sheet open={showGlassBoxSheet} onOpenChange={setShowGlassBoxSheet}>
        <SheetContent side="right" className="p-0 w-[320px]">
          <GlassBoxPanel />
        </SheetContent>
      </Sheet>
    </>
  )
}
