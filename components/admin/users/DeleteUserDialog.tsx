'use client'

import { useDeleteUser } from '@/hooks/mutations/useDeleteUser'

interface DeleteUserDialogProps {
  uid: string
  displayName: string
  onClose: () => void
}

export function DeleteUserDialog({ uid, displayName, onClose }: DeleteUserDialogProps) {
  const deleteUser = useDeleteUser()

  const handleConfirm = async () => {
    await deleteUser.mutateAsync(uid)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-xl p-6 w-full max-w-sm dark:bg-sop-surface shadow-sop-card">
        <h2 className="text-lg font-semibold mb-2 dark:text-sop-foreground">Delete User</h2>
        <p className="text-sm dark:text-sop-muted mb-6">
          Are you sure you want to delete{' '}
          <span className="font-medium dark:text-sop-foreground">{displayName}</span>?
          This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm dark:bg-sop-bg dark:text-sop-muted
              dark:hover:text-sop-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={deleteUser.isPending}
            className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white
              hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {deleteUser.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
