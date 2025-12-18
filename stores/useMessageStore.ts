import { create } from 'zustand'
import { Message, ThinkingStep, ToolCall } from '@/types/message'
import { Plan } from '@/types/plan'

interface MessageStore {
  // State
  messages: Message[]

  // Actions
  addMessage: (
    sessionId: string,
    role: 'user' | 'assistant',
    content: string
  ) => string
  updateMessage: (
    id: string,
    updates: Partial<Omit<Message, 'id' | 'sessionId' | 'timestamp'>>
  ) => void
  deleteMessage: (id: string) => void

  // Specific Updates
  addThinkingStep: (messageId: string, step: ThinkingStep) => void
  setPlan: (messageId: string, plan: Plan) => void
  addToolCall: (messageId: string, toolCall: ToolCall) => void
  setConfidence: (messageId: string, confidence: number) => void

  // Queries
  getSessionMessages: (sessionId: string) => Message[]
  getMessage: (id: string) => Message | undefined
  clearSessionMessages: (sessionId: string) => void

  // Storage
  loadFromStorage: () => void
  saveToStorage: () => void
}

const STORAGE_KEY = 'glassy-message-store'

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Get current timestamp
const getTimestamp = () => new Date().toISOString()

export const useMessageStore = create<MessageStore>((set, get) => ({
  // Initial State
  messages: [],

  // Actions
  addMessage: (sessionId, role, content) => {
    const id = generateId()
    const newMessage: Message = {
      id,
      sessionId,
      role,
      content,
      timestamp: getTimestamp(),
    }

    set((state) => ({
      messages: [...state.messages, newMessage],
    }))
    get().saveToStorage()
    return id
  },

  updateMessage: (id, updates) => {
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === id ? { ...message, ...updates } : message
      ),
    }))
    get().saveToStorage()
  },

  deleteMessage: (id) => {
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== id),
    }))
    get().saveToStorage()
  },

  // Specific Updates
  addThinkingStep: (messageId, step) => {
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              thinkingProcess: [...(message.thinkingProcess || []), step],
            }
          : message
      ),
    }))
    get().saveToStorage()
  },

  setPlan: (messageId, plan) => {
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId ? { ...message, plan } : message
      ),
    }))
    get().saveToStorage()
  },

  addToolCall: (messageId, toolCall) => {
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              toolCalls: [...(message.toolCalls || []), toolCall],
            }
          : message
      ),
    }))
    get().saveToStorage()
  },

  setConfidence: (messageId, confidence) => {
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === messageId ? { ...message, confidence } : message
      ),
    }))
    get().saveToStorage()
  },

  // Queries
  getSessionMessages: (sessionId) => {
    return get()
      .messages.filter((message) => message.sessionId === sessionId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  },

  getMessage: (id) => {
    return get().messages.find((message) => message.id === id)
  },

  clearSessionMessages: (sessionId) => {
    set((state) => ({
      messages: state.messages.filter((m) => m.sessionId !== sessionId),
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
          messages: data.messages || [],
        })
      }
    } catch (error) {
      console.error('Failed to load message store from storage:', error)
    }
  },

  saveToStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const state = get()
      const data = {
        messages: state.messages,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save message store to storage:', error)
    }
  },
}))

// Auto-load from storage on mount
if (typeof window !== 'undefined') {
  useMessageStore.getState().loadFromStorage()
}
