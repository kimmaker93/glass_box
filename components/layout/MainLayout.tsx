"use client"

import { Header } from "./Header"
import { WorkspacePanel } from "./WorkspacePanel"
import { ChatPanel } from "./ChatPanel"
import { GlassBoxPanel } from "./GlassBoxPanel"
import { useSettingsStore } from "@/stores/useSettingsStore"
import { useSessionStore } from "@/stores/useSessionStore"

export function MainLayout() {
  const showWorkspace = useSettingsStore((state) => state.settings.showWorkspace)
  const showGlassBox = useSettingsStore((state) => state.settings.showGlassBox)
  const toggleWorkspace = useSettingsStore((state) => state.toggleWorkspace)
  const toggleGlassBox = useSettingsStore((state) => state.toggleGlassBox)
  const setActiveSession = useSessionStore((state) => state.setActiveSession)

  const handleLogoClick = () => {
    setActiveSession(null)
  }

  return (
    <div className="h-screen flex flex-col">
      <Header onLogoClick={handleLogoClick} />
      <div className="flex-1 flex overflow-hidden">
        {/* 워크스페이스 패널 - 데스크톱에서만 표시 */}
        <div className={`
          hidden lg:flex flex-col
          ${showWorkspace ? 'w-[280px]' : 'w-0'}
          transition-all duration-300 ease-in-out
          border-r overflow-hidden
        `}>
          {showWorkspace && <WorkspacePanel onToggle={toggleWorkspace} />}
        </div>

        {/* 중앙 채팅 패널 */}
        <div className="flex-1 flex flex-col">
          <ChatPanel
            showWorkspace={showWorkspace}
            showGlassBox={showGlassBox}
            onToggleWorkspace={toggleWorkspace}
            onToggleGlassBox={toggleGlassBox}
          />
        </div>

        {/* GLASS_BOX 패널 - 데스크톱에서만 표시 */}
        <div className={`
          hidden lg:flex flex-col
          ${showGlassBox ? 'w-[320px]' : 'w-0'}
          transition-all duration-300 ease-in-out
          border-l overflow-hidden
        `}>
          {showGlassBox && <GlassBoxPanel onToggle={toggleGlassBox} />}
        </div>
      </div>
    </div>
  )
}
