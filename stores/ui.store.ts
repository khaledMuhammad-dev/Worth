import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

interface Modal {
  id: string
  isOpen: boolean
  data?: unknown
}

interface UIState {
  sidebarCollapsed: boolean
  mobileSidebarOpen: boolean
  toasts: Toast[]
  modals: Record<string, Modal>
  isPageLoading: boolean
  unsavedChanges: Record<string, boolean>
}

interface UIActions {
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleMobileSidebar: () => void
  setMobileSidebarOpen: (open: boolean) => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  openModal: (id: string, data?: unknown) => void
  closeModal: (id: string) => void
  setPageLoading: (loading: boolean) => void
  setUnsavedChanges: (key: string, hasChanges: boolean) => void
}

export const useUIStore = create<UIState & UIActions>()(
  immer((set) => ({
    sidebarCollapsed: false,
    mobileSidebarOpen: false,
    toasts: [],
    modals: {},
    isPageLoading: false,
    unsavedChanges: {},

    toggleSidebar: () =>
      set((state) => {
        state.sidebarCollapsed = !state.sidebarCollapsed
      }),

    setSidebarCollapsed: (collapsed) =>
      set((state) => {
        state.sidebarCollapsed = collapsed
      }),

    toggleMobileSidebar: () =>
      set((state) => {
        state.mobileSidebarOpen = !state.mobileSidebarOpen
      }),

    setMobileSidebarOpen: (open) =>
      set((state) => {
        state.mobileSidebarOpen = open
      }),

    addToast: (toast) =>
      set((state) => {
        const id = `toast-${Date.now()}-${Math.random()}`
        state.toasts.push({ ...toast, id })
        setTimeout(() => {
          useUIStore.getState().removeToast(id)
        }, toast.duration ?? 4000)
      }),

    removeToast: (id) =>
      set((state) => {
        state.toasts = state.toasts.filter((t) => t.id !== id)
      }),

    openModal: (id, data) =>
      set((state) => {
        state.modals[id] = { id, isOpen: true, data }
      }),

    closeModal: (id) =>
      set((state) => {
        if (state.modals[id]) {
          state.modals[id].isOpen = false
        }
      }),

    setPageLoading: (loading) =>
      set((state) => {
        state.isPageLoading = loading
      }),

    setUnsavedChanges: (key, hasChanges) =>
      set((state) => {
        state.unsavedChanges[key] = hasChanges
      }),
  }))
)

export const useSidebarCollapsed = () =>
  useUIStore((s) => s.sidebarCollapsed)
export const useMobileSidebarOpen = () =>
  useUIStore((s) => s.mobileSidebarOpen)
export const useToasts = () =>
  useUIStore((s) => s.toasts)
export const useAddToast = () =>
  useUIStore((s) => s.addToast)
export const useModal = (id: string) =>
  useUIStore((s) => s.modals[id])
export const useUnsavedChanges = (key: string) =>
  useUIStore((s) => s.unsavedChanges[key])
