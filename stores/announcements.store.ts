import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface AnnouncementsState {
  dismissedIds: string[]
  currentAnnouncementId: string | null
}

interface AnnouncementsActions {
  dismissAnnouncement: (id: string) => void
  setCurrentAnnouncement: (id: string | null) => void
  resetDismissed: () => void
}

export const useAnnouncementsStore = create<
  AnnouncementsState & AnnouncementsActions
>()(
  persist(
    immer((set) => ({
      dismissedIds: [],
      currentAnnouncementId: null,

      dismissAnnouncement: (id) =>
        set((state) => {
          if (!state.dismissedIds.includes(id)) {
            state.dismissedIds.push(id)
          }
          state.currentAnnouncementId = null
        }),

      setCurrentAnnouncement: (id) =>
        set((state) => {
          state.currentAnnouncementId = id
        }),

      resetDismissed: () =>
        set((state) => {
          state.dismissedIds = []
        }),
    })),
    {
      name: 'worth-announcements',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
