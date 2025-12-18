import { create } from 'zustand'
import { Session } from '@/types/session'
import { Workspace } from '@/types/workspace'

interface SessionStore {
  // State
  workspaces: Workspace[]
  sessions: Session[]
  activeWorkspaceId: string | null
  activeSessionId: string | null

  // Workspace Actions
  createWorkspace: (name: string, description?: string, color?: string, icon?: string) => string
  updateWorkspace: (id: string, updates: Partial<Omit<Workspace, 'id' | 'sessions' | 'createdAt'>>) => void
  deleteWorkspace: (id: string) => void
  setActiveWorkspace: (id: string | null) => void
  reorderWorkspaces: (workspaceIds: string[]) => void

  // Session Actions
  createSession: (workspaceId: string, name: string, personaId?: string) => string
  updateSession: (id: string, updates: Partial<Omit<Session, 'id' | 'messages' | 'createdAt'>>) => void
  deleteSession: (id: string) => void
  archiveSession: (id: string) => void
  setActiveSession: (id: string | null) => void
  moveSession: (sessionId: string, targetWorkspaceId: string) => void
  reorderSessions: (workspaceId: string, sessionIds: string[]) => void

  // Utility
  getWorkspaceSessions: (workspaceId: string) => Session[]
  loadFromStorage: () => void
  saveToStorage: () => void
}

const STORAGE_KEY = 'glassy-session-store'

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Get current timestamp
const getTimestamp = () => new Date().toISOString()

export const useSessionStore = create<SessionStore>((set, get) => ({
  // Initial State
  workspaces: [],
  sessions: [],
  activeWorkspaceId: null,
  activeSessionId: null,

  // Workspace Actions
  createWorkspace: (name, description, color, icon) => {
    const id = generateId()
    const now = getTimestamp()
    const newWorkspace: Workspace = {
      id,
      name,
      description,
      color,
      icon,
      sessions: [],
      createdAt: now,
      updatedAt: now,
    }

    set((state) => ({
      workspaces: [...state.workspaces, newWorkspace],
    }))
    get().saveToStorage()
    return id
  },

  updateWorkspace: (id, updates) => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === id
          ? { ...workspace, ...updates, updatedAt: getTimestamp() }
          : workspace
      ),
    }))
    get().saveToStorage()
  },

  deleteWorkspace: (id) => {
    const state = get()
    // Delete all sessions in this workspace
    const sessionsToDelete = state.sessions.filter((s) => s.workspaceId === id)
    sessionsToDelete.forEach((session) => {
      state.deleteSession(session.id)
    })

    set((state) => ({
      workspaces: state.workspaces.filter((w) => w.id !== id),
      activeWorkspaceId: state.activeWorkspaceId === id ? null : state.activeWorkspaceId,
    }))
    get().saveToStorage()
  },

  setActiveWorkspace: (id) => {
    set({ activeWorkspaceId: id })
  },

  reorderWorkspaces: (workspaceIds) => {
    const state = get()
    const workspacesMap = new Map(state.workspaces.map((w) => [w.id, w]))
    const reorderedWorkspaces = workspaceIds
      .map((id) => workspacesMap.get(id))
      .filter((w): w is Workspace => w !== undefined)

    set({ workspaces: reorderedWorkspaces })
    get().saveToStorage()
  },

  // Session Actions
  createSession: (workspaceId, name, personaId) => {
    const id = generateId()
    const now = getTimestamp()
    const newSession: Session = {
      id,
      workspaceId,
      name,
      personaId,
      messages: [],
      createdAt: now,
      updatedAt: now,
    }

    set((state) => ({
      sessions: [...state.sessions, newSession],
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              sessions: [...workspace.sessions, id],
              updatedAt: getTimestamp(),
            }
          : workspace
      ),
    }))
    get().saveToStorage()
    return id
  },

  updateSession: (id, updates) => {
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id
          ? { ...session, ...updates, updatedAt: getTimestamp() }
          : session
      ),
    }))
    get().saveToStorage()
  },

  deleteSession: (id) => {
    const state = get()
    const session = state.sessions.find((s) => s.id === id)

    if (session) {
      set((state) => ({
        sessions: state.sessions.filter((s) => s.id !== id),
        workspaces: state.workspaces.map((workspace) =>
          workspace.id === session.workspaceId
            ? {
                ...workspace,
                sessions: workspace.sessions.filter((sid) => sid !== id),
                updatedAt: getTimestamp(),
              }
            : workspace
        ),
        activeSessionId: state.activeSessionId === id ? null : state.activeSessionId,
      }))
      get().saveToStorage()
    }
  },

  archiveSession: (id) => {
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id
          ? { ...session, archivedAt: getTimestamp(), updatedAt: getTimestamp() }
          : session
      ),
    }))
    get().saveToStorage()
  },

  setActiveSession: (id) => {
    set({ activeSessionId: id })
  },

  moveSession: (sessionId, targetWorkspaceId) => {
    const state = get()
    const session = state.sessions.find((s) => s.id === sessionId)
    if (!session) return

    const sourceWorkspaceId = session.workspaceId

    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId
          ? { ...s, workspaceId: targetWorkspaceId, updatedAt: getTimestamp() }
          : s
      ),
      workspaces: state.workspaces.map((workspace) => {
        if (workspace.id === sourceWorkspaceId) {
          // Remove from source
          return {
            ...workspace,
            sessions: workspace.sessions.filter((sid) => sid !== sessionId),
            updatedAt: getTimestamp(),
          }
        } else if (workspace.id === targetWorkspaceId) {
          // Add to target
          return {
            ...workspace,
            sessions: [...workspace.sessions, sessionId],
            updatedAt: getTimestamp(),
          }
        }
        return workspace
      }),
    }))
    get().saveToStorage()
  },

  reorderSessions: (workspaceId, sessionIds) => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === workspaceId
          ? {
              ...workspace,
              sessions: sessionIds,
              updatedAt: getTimestamp(),
            }
          : workspace
      ),
    }))
    get().saveToStorage()
  },

  // Utility
  getWorkspaceSessions: (workspaceId) => {
    return get().sessions.filter((session) => session.workspaceId === workspaceId)
  },

  loadFromStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        set({
          workspaces: data.workspaces || [],
          sessions: data.sessions || [],
          activeWorkspaceId: data.activeWorkspaceId || null,
          activeSessionId: data.activeSessionId || null,
        })
      }
    } catch (error) {
      console.error('Failed to load session store from storage:', error)
    }
  },

  saveToStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const state = get()
      const data = {
        workspaces: state.workspaces,
        sessions: state.sessions,
        activeWorkspaceId: state.activeWorkspaceId,
        activeSessionId: state.activeSessionId,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save session store to storage:', error)
    }
  },
}))

// Auto-load from storage on mount
if (typeof window !== 'undefined') {
  useSessionStore.getState().loadFromStorage()
}
