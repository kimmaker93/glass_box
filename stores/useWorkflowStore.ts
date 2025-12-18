import { create } from 'zustand'
import { Workflow, WorkflowStep } from '@/types/workflow'

interface WorkflowStore {
  // State
  workflows: Workflow[]
  activeWorkflowId: string | null

  // Workflow Actions
  createWorkflow: (name: string, description?: string) => string
  updateWorkflow: (
    id: string,
    updates: Partial<Omit<Workflow, 'id' | 'steps' | 'createdAt'>>
  ) => void
  deleteWorkflow: (id: string) => void
  setActiveWorkflow: (id: string | null) => void
  toggleWorkflowActive: (id: string) => void

  // Step Actions
  addStep: (
    workflowId: string,
    type: WorkflowStep['type'],
    config: Record<string, unknown>
  ) => string
  updateStep: (
    workflowId: string,
    stepId: string,
    updates: Partial<Omit<WorkflowStep, 'id'>>
  ) => void
  deleteStep: (workflowId: string, stepId: string) => void
  reorderSteps: (workflowId: string, stepIds: string[]) => void

  // Queries
  getWorkflow: (id: string) => Workflow | undefined
  getActiveWorkflow: () => Workflow | undefined
  getActiveWorkflows: () => Workflow[]

  // Storage
  loadFromStorage: () => void
  saveToStorage: () => void
}

const STORAGE_KEY = 'glassy-workflow-store'

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Get current timestamp
const getTimestamp = () => new Date().toISOString()

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  // Initial State
  workflows: [],
  activeWorkflowId: null,

  // Workflow Actions
  createWorkflow: (name, description) => {
    const id = generateId()
    const now = getTimestamp()
    const newWorkflow: Workflow = {
      id,
      name,
      description,
      steps: [],
      isActive: false,
      createdAt: now,
      updatedAt: now,
    }

    set((state) => ({
      workflows: [...state.workflows, newWorkflow],
    }))
    get().saveToStorage()
    return id
  },

  updateWorkflow: (id, updates) => {
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === id
          ? { ...workflow, ...updates, updatedAt: getTimestamp() }
          : workflow
      ),
    }))
    get().saveToStorage()
  },

  deleteWorkflow: (id) => {
    set((state) => ({
      workflows: state.workflows.filter((w) => w.id !== id),
      activeWorkflowId: state.activeWorkflowId === id ? null : state.activeWorkflowId,
    }))
    get().saveToStorage()
  },

  setActiveWorkflow: (id) => {
    set({ activeWorkflowId: id })
    get().saveToStorage()
  },

  toggleWorkflowActive: (id) => {
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === id
          ? {
              ...workflow,
              isActive: !workflow.isActive,
              updatedAt: getTimestamp(),
            }
          : workflow
      ),
    }))
    get().saveToStorage()
  },

  // Step Actions
  addStep: (workflowId, type, config) => {
    const stepId = generateId()
    const state = get()
    const workflow = state.workflows.find((w) => w.id === workflowId)

    if (!workflow) {
      console.error(`Workflow ${workflowId} not found`)
      return stepId
    }

    const newStep: WorkflowStep = {
      id: stepId,
      order: workflow.steps.length + 1,
      type,
      config,
    }

    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === workflowId
          ? {
              ...w,
              steps: [...w.steps, newStep],
              updatedAt: getTimestamp(),
            }
          : w
      ),
    }))
    get().saveToStorage()
    return stepId
  },

  updateStep: (workflowId, stepId, updates) => {
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              steps: workflow.steps.map((step) =>
                step.id === stepId ? { ...step, ...updates } : step
              ),
              updatedAt: getTimestamp(),
            }
          : workflow
      ),
    }))
    get().saveToStorage()
  },

  deleteStep: (workflowId, stepId) => {
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === workflowId
          ? {
              ...workflow,
              steps: workflow.steps
                .filter((step) => step.id !== stepId)
                .map((step, index) => ({ ...step, order: index + 1 })),
              updatedAt: getTimestamp(),
            }
          : workflow
      ),
    }))
    get().saveToStorage()
  },

  reorderSteps: (workflowId, stepIds) => {
    set((state) => ({
      workflows: state.workflows.map((workflow) => {
        if (workflow.id !== workflowId) return workflow

        const stepsMap = new Map(workflow.steps.map((step) => [step.id, step]))
        const reorderedSteps = stepIds
          .map((id) => stepsMap.get(id))
          .filter((step): step is WorkflowStep => step !== undefined)
          .map((step, index) => ({ ...step, order: index + 1 }))

        return {
          ...workflow,
          steps: reorderedSteps,
          updatedAt: getTimestamp(),
        }
      }),
    }))
    get().saveToStorage()
  },

  // Queries
  getWorkflow: (id) => {
    return get().workflows.find((workflow) => workflow.id === id)
  },

  getActiveWorkflow: () => {
    const state = get()
    if (state.activeWorkflowId) {
      return state.workflows.find((w) => w.id === state.activeWorkflowId)
    }
    return undefined
  },

  getActiveWorkflows: () => {
    return get().workflows.filter((workflow) => workflow.isActive)
  },

  // Storage
  loadFromStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        set({
          workflows: data.workflows || [],
          activeWorkflowId: data.activeWorkflowId || null,
        })
      }
    } catch (error) {
      console.error('Failed to load workflow store from storage:', error)
    }
  },

  saveToStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const state = get()
      const data = {
        workflows: state.workflows,
        activeWorkflowId: state.activeWorkflowId,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save workflow store to storage:', error)
    }
  },
}))

// Auto-load from storage on mount
if (typeof window !== 'undefined') {
  useWorkflowStore.getState().loadFromStorage()
}
