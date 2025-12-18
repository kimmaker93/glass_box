import { create } from 'zustand'
import { Memory, MemoryType, MemoryCategory } from '@/types/memory'

interface MemoryStore {
  // State
  memories: Memory[]

  // Actions
  addMemory: (
    type: MemoryType,
    title: string,
    content: string,
    options?: {
      sessionId?: string
      messageId?: string
      source?: string
      category?: MemoryCategory
      relevance?: number
      tags?: string[]
    }
  ) => string
  updateMemory: (
    id: string,
    updates: Partial<Omit<Memory, 'id' | 'createdAt'>>
  ) => void
  deleteMemory: (id: string) => void

  // Tag Management
  addTag: (memoryId: string, tag: string) => void
  removeTag: (memoryId: string, tag: string) => void

  // Queries
  getMemory: (id: string) => Memory | undefined
  getSessionMemories: (sessionId: string) => Memory[]
  getMemoriesByType: (type: Memory['type']) => Memory[]
  getMemoriesByTag: (tag: string) => Memory[]
  searchMemories: (query: string) => Memory[]
  clearSessionMemories: (sessionId: string) => void

  // Storage
  loadFromStorage: () => void
  saveToStorage: () => void
}

const STORAGE_KEY = 'glassy-memory-store'

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Get current timestamp
const getTimestamp = () => new Date().toISOString()

export const useMemoryStore = create<MemoryStore>((set, get) => ({
  // Initial State
  memories: [],

  // Actions
  addMemory: (type, title, content, options = {}) => {
    const id = generateId()
    const now = getTimestamp()
    const newMemory: Memory = {
      id,
      type,
      title,
      content,
      sessionId: options.sessionId,
      messageId: options.messageId,
      source: options.source,
      category: options.category,
      relevance: options.relevance,
      tags: options.tags,
      createdAt: now,
      updatedAt: now,
    }

    set((state) => ({
      memories: [...state.memories, newMemory],
    }))
    get().saveToStorage()
    return id
  },

  updateMemory: (id, updates) => {
    set((state) => ({
      memories: state.memories.map((memory) =>
        memory.id === id
          ? { ...memory, ...updates, updatedAt: getTimestamp() }
          : memory
      ),
    }))
    get().saveToStorage()
  },

  deleteMemory: (id) => {
    set((state) => ({
      memories: state.memories.filter((m) => m.id !== id),
    }))
    get().saveToStorage()
  },

  // Tag Management
  addTag: (memoryId, tag) => {
    set((state) => ({
      memories: state.memories.map((memory) =>
        memory.id === memoryId
          ? {
              ...memory,
              tags: [...(memory.tags || []), tag],
            }
          : memory
      ),
    }))
    get().saveToStorage()
  },

  removeTag: (memoryId, tag) => {
    set((state) => ({
      memories: state.memories.map((memory) =>
        memory.id === memoryId
          ? {
              ...memory,
              tags: (memory.tags || []).filter((t) => t !== tag),
            }
          : memory
      ),
    }))
    get().saveToStorage()
  },

  // Queries
  getMemory: (id) => {
    return get().memories.find((memory) => memory.id === id)
  },

  getSessionMemories: (sessionId) => {
    return get()
      .memories.filter((memory) => memory.sessionId === sessionId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  getMemoriesByType: (type) => {
    return get()
      .memories.filter((memory) => memory.type === type)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  getMemoriesByTag: (tag) => {
    return get()
      .memories.filter((memory) => memory.tags?.includes(tag))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  searchMemories: (query) => {
    const lowercaseQuery = query.toLowerCase()
    return get()
      .memories.filter(
        (memory) =>
          memory.title.toLowerCase().includes(lowercaseQuery) ||
          memory.content.toLowerCase().includes(lowercaseQuery) ||
          memory.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
      )
      .sort((a, b) => {
        // Sort by relevance if available, otherwise by date
        if (a.relevance !== undefined && b.relevance !== undefined) {
          return b.relevance - a.relevance
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  },

  clearSessionMemories: (sessionId) => {
    set((state) => ({
      memories: state.memories.filter((m) => m.sessionId !== sessionId),
    }))
    get().saveToStorage()
  },

  // Storage
  loadFromStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        set({
          memories: data.memories || [],
        })
      }
    } catch (error) {
      console.error('Failed to load memory store from storage:', error)
    }
  },

  saveToStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const state = get()
      const data = {
        memories: state.memories,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save memory store to storage:', error)
    }
  },
}))

// Auto-load from storage on mount
if (typeof window !== 'undefined') {
  useMemoryStore.getState().loadFromStorage()
}
