import { create } from 'zustand'
import { Settings, DEFAULT_SETTINGS } from '@/types/settings'

interface SettingsStore {
  // State
  settings: Settings

  // Actions
  updateSettings: (updates: Partial<Settings>) => void
  resetSettings: () => void
  toggleTheme: () => void
  toggleGlassBox: () => void
  toggleWorkspace: () => void
  toggleAutoSave: () => void

  // Storage
  loadFromStorage: () => void
  saveToStorage: () => void
}

const STORAGE_KEY = 'glassy-settings-store'

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  // Initial State
  settings: DEFAULT_SETTINGS,

  // Actions
  updateSettings: (updates) => {
    set((state) => ({
      settings: { ...state.settings, ...updates },
    }))
    get().saveToStorage()
  },

  resetSettings: () => {
    set({ settings: DEFAULT_SETTINGS })
    get().saveToStorage()
  },

  toggleTheme: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        theme:
          state.settings.theme === 'light'
            ? 'dark'
            : state.settings.theme === 'dark'
            ? 'system'
            : 'light',
      },
    }))
    get().saveToStorage()
  },

  toggleGlassBox: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        showGlassBox: !state.settings.showGlassBox,
      },
    }))
    get().saveToStorage()
  },

  toggleWorkspace: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        showWorkspace: !state.settings.showWorkspace,
      },
    }))
    get().saveToStorage()
  },

  toggleAutoSave: () => {
    set((state) => ({
      settings: {
        ...state.settings,
        autoSave: !state.settings.autoSave,
      },
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
          settings: { ...DEFAULT_SETTINGS, ...data.settings },
        })
      }
    } catch (error) {
      console.error('Failed to load settings store from storage:', error)
    }
  },

  saveToStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const state = get()
      const data = {
        settings: state.settings,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save settings store to storage:', error)
    }
  },
}))

// Auto-load from storage on mount
if (typeof window !== 'undefined') {
  useSettingsStore.getState().loadFromStorage()
}
