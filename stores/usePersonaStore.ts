import { create } from 'zustand'
import { Persona, PersonaIcon } from '@/types/persona'

interface PersonaStore {
  // State
  personas: Persona[]
  activePersonaId: string | null

  // Actions
  createPersona: (
    name: string,
    description: string,
    systemPrompt: string,
    options?: {
      avatar?: string
      color?: string
      icon?: PersonaIcon
      isDefault?: boolean
    }
  ) => string
  updatePersona: (
    id: string,
    updates: Partial<Omit<Persona, 'id' | 'createdAt'>>
  ) => void
  deletePersona: (id: string) => void
  setDefaultPersona: (id: string) => void
  setActivePersona: (id: string | null) => void

  // Queries
  getPersona: (id: string) => Persona | undefined
  getDefaultPersona: () => Persona | undefined
  getActivePersona: () => Persona | undefined

  // Storage
  loadFromStorage: () => void
  saveToStorage: () => void
}

const STORAGE_KEY = 'glassy-persona-store'

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Get current timestamp
const getTimestamp = () => new Date().toISOString()

export const usePersonaStore = create<PersonaStore>((set, get) => ({
  // Initial State
  personas: [],
  activePersonaId: null,

  // Actions
  createPersona: (name, description, systemPrompt, options = {}) => {
    const id = generateId()
    const now = getTimestamp()

    // If this is the first persona or explicitly set as default, make it default
    const isFirstPersona = get().personas.length === 0
    const isDefault = options.isDefault ?? isFirstPersona

    // If setting as default, unset other defaults
    if (isDefault) {
      set((state) => ({
        personas: state.personas.map((p) => ({ ...p, isDefault: false })),
      }))
    }

    const newPersona: Persona = {
      id,
      name,
      description,
      systemPrompt,
      avatar: options.avatar,
      color: options.color,
      icon: options.icon,
      isDefault,
      createdAt: now,
      updatedAt: now,
    }

    set((state) => ({
      personas: [...state.personas, newPersona],
    }))
    get().saveToStorage()
    return id
  },

  updatePersona: (id, updates) => {
    set((state) => ({
      personas: state.personas.map((persona) =>
        persona.id === id
          ? { ...persona, ...updates, updatedAt: getTimestamp() }
          : persona
      ),
    }))
    get().saveToStorage()
  },

  deletePersona: (id) => {
    const state = get()
    const personaToDelete = state.personas.find((p) => p.id === id)

    // Cannot delete default persona if it's the only one
    if (personaToDelete?.isDefault && state.personas.length === 1) {
      console.warn('Cannot delete the only default persona')
      return
    }

    set((state) => {
      const remainingPersonas = state.personas.filter((p) => p.id !== id)

      // If deleted persona was default, set first remaining as default
      if (personaToDelete?.isDefault && remainingPersonas.length > 0) {
        remainingPersonas[0].isDefault = true
      }

      return {
        personas: remainingPersonas,
        activePersonaId: state.activePersonaId === id ? null : state.activePersonaId,
      }
    })
    get().saveToStorage()
  },

  setDefaultPersona: (id) => {
    set((state) => ({
      personas: state.personas.map((persona) => ({
        ...persona,
        isDefault: persona.id === id,
        updatedAt: persona.id === id ? getTimestamp() : persona.updatedAt,
      })),
    }))
    get().saveToStorage()
  },

  setActivePersona: (id) => {
    set({ activePersonaId: id })
    get().saveToStorage()
  },

  // Queries
  getPersona: (id) => {
    return get().personas.find((persona) => persona.id === id)
  },

  getDefaultPersona: () => {
    return get().personas.find((persona) => persona.isDefault)
  },

  getActivePersona: () => {
    const state = get()
    if (state.activePersonaId) {
      return state.personas.find((persona) => persona.id === state.activePersonaId)
    }
    return state.personas.find((persona) => persona.isDefault)
  },

  // Storage
  loadFromStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        set({
          personas: data.personas || [],
          activePersonaId: data.activePersonaId || null,
        })
      }
    } catch (error) {
      console.error('Failed to load persona store from storage:', error)
    }
  },

  saveToStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const state = get()
      const data = {
        personas: state.personas,
        activePersonaId: state.activePersonaId,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save persona store to storage:', error)
    }
  },
}))

// Auto-load from storage on mount
if (typeof window !== 'undefined') {
  usePersonaStore.getState().loadFromStorage()
}
